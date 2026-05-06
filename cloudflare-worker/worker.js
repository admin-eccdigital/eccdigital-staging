/**
 * Decap CMS OAuth proxy for ECC Digital
 *
 * Lives at https://decap-oauth.royal-silence-27df.workers.dev/
 *
 * What it does:
 *   GET /auth      → redirects the editor to GitHub's authorize screen
 *   GET /callback  → receives GitHub's code, exchanges it for an access
 *                    token, then posts the token back to the Decap CMS
 *                    window via postMessage.
 *
 * Required Worker environment secrets (set via dashboard or wrangler):
 *   GITHUB_CLIENT_ID      — public OAuth App ID from GitHub
 *   GITHUB_CLIENT_SECRET  — secret from GitHub OAuth App ("Generate a new
 *                           client secret"), kept ONLY here on Cloudflare
 *
 * Allowed origins (where /admin/ runs) — extend if you add a custom domain.
 */
const ALLOWED_ORIGINS = [
  "https://admin-eccdigital.github.io",
  "https://eccdigital.cz",
  "http://localhost:3000",
  "http://localhost:3003",
]

const SCOPE = "repo,user"

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const path = url.pathname.replace(/\/$/, "") || "/"

    // ─── Step 1: editor lands here from Decap ─────────────────────────────
    if (path === "/auth") {
      const state = crypto.randomUUID()
      const params = new URLSearchParams({
        client_id: env.GITHUB_CLIENT_ID,
        redirect_uri: `${url.origin}/callback`,
        scope: SCOPE,
        state,
      })
      return Response.redirect(
        `https://github.com/login/oauth/authorize?${params}`,
        302,
      )
    }

    // ─── Step 2: GitHub redirected back with ?code=… ──────────────────────
    if (path === "/callback") {
      const code = url.searchParams.get("code")
      if (!code) {
        return new Response("Missing 'code' param from GitHub", { status: 400 })
      }

      let tokenJson
      try {
        const tokenRes = await fetch(
          "https://github.com/login/oauth/access_token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              client_id: env.GITHUB_CLIENT_ID,
              client_secret: env.GITHUB_CLIENT_SECRET,
              code,
            }),
          },
        )
        tokenJson = await tokenRes.json()
      } catch (err) {
        return new Response("OAuth network error: " + err.message, {
          status: 502,
        })
      }

      if (tokenJson.error || !tokenJson.access_token) {
        return new Response(
          "OAuth exchange failed: " +
            (tokenJson.error_description || tokenJson.error || "unknown"),
          { status: 400 },
        )
      }

      // ─── Step 3: hand the token back to Decap via postMessage ───────────
      // This page is opened inside the popup that Decap launched. Decap
      // listens for `authorization:github:success:{token,…}` from the popup.
      const payload = {
        token: tokenJson.access_token,
        provider: "github",
      }
      const allowedOriginsJson = JSON.stringify(ALLOWED_ORIGINS)

      const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>Přihlášení dokončeno</title>
<style>body{font-family:system-ui;background:#0a0a0a;color:#e6edf3;text-align:center;padding:60px 24px}
a{color:#ff8a4d}</style>
</head><body>
<p>Přihlášení dokončeno. Pokud se tato karta sama nezavře, klikněte
   <a href="https://admin-eccdigital.github.io/eccdigital-staging/admin/">zde</a>.</p>
<script>
(function(){
  var ALLOWED = ${allowedOriginsJson};
  var data = ${JSON.stringify(payload)};
  function send(state, payload, origin){
    if (!window.opener) return;
    var msg = "authorization:github:" + state + ":" + JSON.stringify(payload);
    if (origin) {
      try { window.opener.postMessage(msg, origin); } catch(e){}
    } else {
      ALLOWED.forEach(function(o){ try { window.opener.postMessage(msg, o); } catch(e){} });
    }
  }

  // Decap protocol — popup-side:
  // 1) Tell opener "I'm here, ready to authorize" (first move).
  // 2) Opener replies "authorizing:github" with its origin (e.handshake).
  // 3) Reply with the actual token success payload to that origin.
  // We also fall back to broadcasting in case Decap version differs.
  function announce(){
    if (!window.opener) return false;
    ALLOWED.forEach(function(o){
      try { window.opener.postMessage("authorizing:github", o); } catch(e){}
    });
    return true;
  }

  window.addEventListener("message", function(e){
    if (e.data === "authorizing:github" && ALLOWED.indexOf(e.origin) > -1) {
      send("success", data, e.origin);
    }
  }, false);

  if (announce()) {
    // Belt-and-braces: blast the success payload on a short delay too —
    // some Decap versions don't bother sending the handshake reply.
    setTimeout(function(){ send("success", data); }, 500);
  } else {
    // No opener (popup blocker / direct navigation) — store token locally
    // so the editor can pick it up on return, then redirect back.
    try {
      window.localStorage.setItem("decap-cms-user",
        JSON.stringify({ token: data.token, backendName: "github" }));
    } catch(e){}
    window.location.replace(
      "https://admin-eccdigital.github.io/eccdigital-staging/admin/#token=" + data.token);
  }
}());
</script>
</body></html>`

      return new Response(html, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store",
        },
      })
    }

    // ─── Health check on the root path ────────────────────────────────────
    if (path === "/") {
      return new Response("Decap OAuth proxy for ECC Digital is running.", {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      })
    }

    return new Response("Not found", { status: 404 })
  },
}
