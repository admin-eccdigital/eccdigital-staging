"use client"
import { useEffect, useState } from "react"
import { ArrowRight, CheckIcon } from "./shared"

declare global {
  interface Window {
    openLeadForm?: (v?: string) => void
  }
}

export function LeadModal() {
  const [open, setOpen] = useState(false)
  const [variant, setVariant] = useState<"audit" | "konzultace">("audit")
  const [step, setStep] = useState<"form" | "sent">("form")
  const [data, setData] = useState({ name: "", email: "", phone: "", web: "" })
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState("")

  useEffect(() => {
    window.openLeadForm = (v = "audit") => {
      setVariant(v === "konzultace" ? "konzultace" : "audit")
      setStep("form")
      setErr("")
      setOpen(true)
    }
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null
      const el = target?.closest("[data-lead]") as HTMLElement | null
      if (!el) return
      e.preventDefault()
      window.openLeadForm?.(el.getAttribute("data-lead") || "audit")
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  if (!open) return null

  const isAudit = variant === "audit"
  const title = isAudit ? "Audit zdarma" : "Nezávazná konzultace"
  const eyebrow = isAudit ? "Bezplatný audit" : "30minutový hovor"
  const blurb = isAudit
    ? "Podíváme se na váš web, kampaně a měření. Výstup do 10 dní, bez závazku."
    : "Probereme vaši situaci a navrhneme další kroky. Bez prezentací, bez závazku."

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setErr("")
    if (!data.name.trim() || !data.email.trim()) {
      setErr("Vyplňte prosím jméno a e-mail.")
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      setErr("Zkontrolujte e-mailovou adresu.")
      return
    }
    setBusy(true)
    setTimeout(() => {
      setBusy(false)
      setStep("sent")
    }, 700)
  }

  return (
    <div className="lf-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}>
      <div className="lf-modal" role="dialog" aria-modal="true" aria-labelledby="lf-title">
        <button className="lf-close" onClick={() => setOpen(false)} aria-label="Zavřít">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="lf-side" aria-hidden="true">
          <div className="lf-side-bg" />
          <div className="lf-side-content">
            <div className="lf-eyebrow"><span className="lf-dot" />{eyebrow}</div>
            <div className="lf-side-title">Začněme <em>spolu.</em></div>
            <ul className="lf-bullets">
              <li><span className="lf-bi"><CheckIcon /></span>Odpovíme do 24 hodin</li>
              <li><span className="lf-bi"><CheckIcon /></span>Bez závazků a prezentací</li>
              <li><span className="lf-bi"><CheckIcon /></span>{isAudit ? "Výstup do 10 dní" : "Hovor do 3 dní"}</li>
            </ul>
            <div className="lf-trust">10+ let · 300+ projektů · 150+ klientů</div>
          </div>
        </div>

        <div className="lf-main">
          {step === "form" ? (
            <>
              <div className="lf-tabs" role="tablist">
                <button className={`lf-tab ${isAudit ? "is-active" : ""}`} onClick={() => setVariant("audit")} role="tab">Audit zdarma</button>
                <button className={`lf-tab ${!isAudit ? "is-active" : ""}`} onClick={() => setVariant("konzultace")} role="tab">Konzultace</button>
              </div>
              <h3 id="lf-title" className="lf-title">{title}</h3>
              <p className="lf-blurb">{blurb}</p>
              <form className="lf-form" onSubmit={submit} noValidate>
                <label className="lf-field">
                  <span>Jméno a příjmení <em>*</em></span>
                  <input type="text" autoFocus required value={data.name} onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))} placeholder="Jan Novák" />
                </label>
                <label className="lf-field">
                  <span>E-mail <em>*</em></span>
                  <input type="email" required value={data.email} onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))} placeholder="jan@firma.cz" />
                </label>
                <div className="lf-row2">
                  <label className="lf-field">
                    <span>Telefon</span>
                    <input type="tel" value={data.phone} onChange={(e) => setData((d) => ({ ...d, phone: e.target.value }))} placeholder="+420" />
                  </label>
                  <label className="lf-field">
                    <span>Web</span>
                    <input type="text" value={data.web} onChange={(e) => setData((d) => ({ ...d, web: e.target.value }))} placeholder="firma.cz" />
                  </label>
                </div>
                {err && <div className="lf-err">{err}</div>}
                <button className="lf-submit" type="submit" disabled={busy}>
                  {busy ? "Odesílám…" : isAudit ? "Chci audit zdarma" : "Domluvit konzultaci"}
                  <ArrowRight size={18} />
                </button>
                <div className="lf-fineprint">Odesláním souhlasíte se <a href="#">zpracováním údajů</a>. Žádné spamy.</div>
              </form>
            </>
          ) : (
            <div className="lf-sent">
              <div className="lf-sent-ico">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="lf-title">Děkujeme, {data.name.split(" ")[0] || "máme to"}!</h3>
              <p className="lf-blurb">Ozveme se vám během 24 hodin na <strong>{data.email}</strong>. Zatím se můžete podívat na naše <a href="#reference" onClick={() => setOpen(false)}>případové studie</a>.</p>
              <button className="lf-submit" type="button" onClick={() => setOpen(false)}>Zavřít</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
