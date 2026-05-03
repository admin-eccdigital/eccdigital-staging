"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import { Reveal } from "./shared"

type Cat = { id: string; label: string; color: string; tools: string[] }

const TOOL_CATEGORIES: Cat[] = [
  {
    id: "ads",
    label: "Výkonnostní reklama",
    color: "oklch(0.72 0.16 35)",
    tools: ["Facebook Ads", "Instagram Ads", "Google Ads", "Sklik", "Microsoft Ads", "TikTok Ads", "LinkedIn Ads", "Meta Business"],
  },
  { id: "ana", label: "Analytika", color: "oklch(0.70 0.12 230)", tools: ["GA4", "Looker Studio", "GTM", "Search Console", "Collabim"] },
  { id: "web", label: "Weby", color: "oklch(0.72 0.10 160)", tools: ["WordPress", "WooCommerce", "Shoptet", "Next.js"] },
  { id: "feed", label: "Srovnávače", color: "oklch(0.78 0.12 75)", tools: ["Heureka", "Zboží.cz"] },
  { id: "ai", label: "AI", color: "oklch(0.72 0.10 300)", tools: ["Claude", "Claude Design", "ChatGPT", "Gemini", "Midjourney"] },
  {
    id: "team",
    label: "Spolupráce & kreativa",
    color: "oklch(0.78 0.04 250)",
    tools: ["Freelo", "Miro", "Notion", "Adobe Illustrator", "Google Workspace"],
  },
]

type Bubble = {
  name: string
  cat: string
  color: string
  r: number
  x: number
  y: number
  vx: number
  vy: number
  phaseX: number
  phaseY: number
  freqX: number
  freqY: number
  ampX: number
  ampY: number
}

function withAlpha(oklch: string, a: number) {
  if (oklch.startsWith("oklch(")) return oklch.replace(/\)$/, ` / ${a})`)
  return oklch
}
function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(" ")
  const lines: string[] = []
  let cur = ""
  for (const w of words) {
    const test = cur ? cur + " " + w : w
    if (ctx.measureText(test).width > maxWidth && cur) {
      lines.push(cur)
      cur = w
    } else cur = test
  }
  if (cur) lines.push(cur)
  const startY = y - ((lines.length - 1) * lineHeight) / 2
  lines.forEach((l, i) => ctx.fillText(l, x, startY + i * lineHeight))
}

export function ToolsCanvas() {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const bubblesRef = useRef<Bubble[]>([])
  const hoverRef = useRef<Bubble | null>(null)
  const mouseRef = useRef({ x: -9999, y: -9999, down: false })
  const rafRef = useRef<number | null>(null)
  const [hoverBubble, setHoverBubble] = useState<{ name: string; cat: string } | null>(null)
  const [activeCat, setActiveCat] = useState<string | null>(null)

  const allBubbles = useMemo(() => {
    const out: { name: string; cat: string; color: string; r: number }[] = []
    const SIZE_BOOST: Record<string, number> = {
      "Meta Business": 1.55,
      "Google Ads": 1.55,
      WordPress: 0.95,
      ChatGPT: 0.65,
      Freelo: 0.65,
      Miro: 0.65,
      "Search Console": 0.65,
    }
    TOOL_CATEGORIES.forEach((cat) => {
      cat.tools.forEach((t) => {
        const baseR = 38 + Math.min(28, t.length * 1.6)
        const r = baseR * (SIZE_BOOST[t] || 1)
        out.push({ name: t, cat: cat.id, color: cat.color, r })
      })
    })
    return out
  }, [])

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let W = 0,
      H = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      const rect = wrap!.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas!.width = W * dpr
      canvas!.height = H * dpr
      canvas!.style.width = W + "px"
      canvas!.style.height = H + "px"
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (!bubblesRef.current.length) {
        bubblesRef.current = allBubbles.map((b, i) => {
          const angle = (i / allBubbles.length) * Math.PI * 2
          const radius = Math.min(W, H) * 0.32
          return {
            ...b,
            x: W / 2 + Math.cos(angle) * radius * (0.5 + Math.random() * 0.5),
            y: H / 2 + Math.sin(angle) * radius * (0.5 + Math.random() * 0.5),
            vx: 0,
            vy: 0,
            phaseX: Math.random() * Math.PI * 2,
            phaseY: Math.random() * Math.PI * 2,
            freqX: 0.00025 + Math.random() * 0.00025,
            freqY: 0.00025 + Math.random() * 0.00025,
            ampX: 0.18 + Math.random() * 0.12,
            ampY: 0.18 + Math.random() * 0.12,
          }
        })
      } else {
        bubblesRef.current.forEach((b) => {
          b.x = Math.min(Math.max(b.r, b.x), W - b.r)
          b.y = Math.min(Math.max(b.r, b.y), H - b.r)
        })
      }
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }
    function onLeave() {
      mouseRef.current.x = -9999
      mouseRef.current.y = -9999
    }
    function onTouch(e: TouchEvent) {
      if (e.touches[0]) {
        const rect = canvas!.getBoundingClientRect()
        mouseRef.current.x = e.touches[0].clientX - rect.left
        mouseRef.current.y = e.touches[0].clientY - rect.top
      }
    }
    canvas.addEventListener("mousemove", onMove)
    canvas.addEventListener("mouseleave", onLeave)
    canvas.addEventListener("touchmove", onTouch, { passive: true })
    canvas.addEventListener("touchend", onLeave)

    function step(now: number) {
      const bs = bubblesRef.current
      const mx = mouseRef.current.x,
        my = mouseRef.current.y
      let hovered: Bubble | null = null

      for (let i = 0; i < bs.length; i++) {
        const b = bs[i]
        const tvx = Math.cos(now * b.freqX + b.phaseX) * b.ampX
        const tvy = Math.sin(now * b.freqY + b.phaseY) * b.ampY
        b.vx += (tvx - b.vx) * 0.04
        b.vy += (tvy - b.vy) * 0.04
        b.vx += (W / 2 - b.x) * 0.00004
        b.vy += (H / 2 - b.y) * 0.00004
        b.vx *= 0.96
        b.vy *= 0.96
      }

      for (let i = 0; i < bs.length; i++) {
        const b = bs[i]
        const dx = b.x - mx,
          dy = b.y - my
        const d = Math.hypot(dx, dy)
        if (d < b.r + 70 && d > 0.01) {
          const f = ((b.r + 70 - d) / (b.r + 70)) * 0.5
          b.vx += (dx / d) * f
          b.vy += (dy / d) * f
        }
      }

      for (let i = 0; i < bs.length; i++) {
        for (let j = i + 1; j < bs.length; j++) {
          const a = bs[i],
            c = bs[j]
          const dx = c.x - a.x,
            dy = c.y - a.y
          const dist = Math.hypot(dx, dy)
          const minD = a.r + c.r
          if (dist < minD && dist > 0.01) {
            const nx = dx / dist,
              ny = dy / dist
            const overlap = (minD - dist) * 0.5
            a.x -= nx * overlap
            a.y -= ny * overlap
            c.x += nx * overlap
            c.y += ny * overlap
            const av = a.vx * nx + a.vy * ny
            const cv = c.vx * nx + c.vy * ny
            const diff = cv - av
            a.vx += nx * diff
            a.vy += ny * diff
            c.vx -= nx * diff
            c.vy -= ny * diff
          }
        }
      }

      for (let i = 0; i < bs.length; i++) {
        const b = bs[i]
        b.x += b.vx
        b.y += b.vy
        if (b.x < b.r) {
          b.x = b.r
          b.vx *= -0.7
        }
        if (b.x > W - b.r) {
          b.x = W - b.r
          b.vx *= -0.7
        }
        if (b.y < b.r) {
          b.y = b.r
          b.vy *= -0.7
        }
        if (b.y > H - b.r) {
          b.y = H - b.r
          b.vy *= -0.7
        }
        const ddx = b.x - mx,
          ddy = b.y - my
        if (Math.hypot(ddx, ddy) < b.r) hovered = b
      }

      ctx!.clearRect(0, 0, W, H)
      for (let i = 0; i < bs.length; i++) {
        const b = bs[i]
        const dim = activeCat && b.cat !== activeCat
        const isHov = hovered === b
        const alpha = dim ? 0.22 : 1
        ctx!.globalAlpha = alpha

        if (isHov) {
          const glowR = b.r * 1.8
          const grad = ctx!.createRadialGradient(b.x, b.y, b.r * 0.6, b.x, b.y, glowR)
          grad.addColorStop(0, withAlpha(b.color, 0.3))
          grad.addColorStop(1, withAlpha(b.color, 0))
          ctx!.fillStyle = grad
          ctx!.beginPath()
          ctx!.arc(b.x, b.y, glowR, 0, Math.PI * 2)
          ctx!.fill()
        }

        const body = ctx!.createRadialGradient(b.x - b.r * 0.35, b.y - b.r * 0.45, b.r * 0.1, b.x, b.y, b.r)
        body.addColorStop(0, isHov ? "rgba(40,46,58,0.98)" : "rgba(28,32,42,0.95)")
        body.addColorStop(1, "rgba(15,18,24,0.95)")
        ctx!.fillStyle = body
        ctx!.beginPath()
        ctx!.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx!.fill()

        ctx!.strokeStyle = withAlpha(b.color, isHov ? 0.95 : 0.6)
        ctx!.lineWidth = isHov ? 1.8 : 1.2
        ctx!.beginPath()
        ctx!.arc(b.x, b.y, b.r - 1, 0, Math.PI * 2)
        ctx!.stroke()

        ctx!.fillStyle = withAlpha(b.color, isHov ? 1 : 0.85)
        ctx!.beginPath()
        ctx!.arc(b.x, b.y - b.r * 0.55, 3, 0, Math.PI * 2)
        ctx!.fill()

        ctx!.fillStyle = isHov ? "#fff" : "rgba(255,255,255,0.92)"
        ctx!.textAlign = "center"
        ctx!.textBaseline = "middle"
        const fs = Math.max(9, Math.min(18, b.r * 0.3))
        ctx!.font = `500 ${fs}px Geist, system-ui, sans-serif`
        wrapText(ctx!, b.name, b.x, b.y + b.r * 0.05, b.r * 1.6, fs * 1.15)
        ctx!.globalAlpha = 1
      }

      if (hovered !== hoverRef.current) {
        hoverRef.current = hovered
        setHoverBubble(hovered ? { name: hovered.name, cat: hovered.cat } : null)
        canvas!.style.cursor = hovered ? "pointer" : "default"
      }

      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      canvas.removeEventListener("mousemove", onMove)
      canvas.removeEventListener("mouseleave", onLeave)
      canvas.removeEventListener("touchmove", onTouch)
      canvas.removeEventListener("touchend", onLeave)
    }
  }, [allBubbles, activeCat])

  return (
    <section id="nastroje" className="tools-sec">
      <div className="testim-grid-bg" />
      <div className="container">
        <Reveal className="section-head">
          <div className="eyebrow-line">
            <span className="ln" />
            <span className="num">04</span>
            <span className="dot" />
            Služby a dovednosti
            <span className="ln" />
          </div>
          <h2 className="h2-light">
            S čím <em>pracujeme</em> každý den
          </h2>
          <p className="lead-on-dark">
            Reklamní platformy, analytika, weby, AI nástroje a kreativa — všechno pod jednou střechou. Najeďte myší pro
            detail.
          </p>
        </Reveal>
        <div className="tools-canvas-wrap" ref={wrapRef}>
          <canvas ref={canvasRef} />
          {hoverBubble && (
            <div className="tools-tooltip">
              <span
                className="tooltip-dot"
                style={{ background: TOOL_CATEGORIES.find((c) => c.id === hoverBubble.cat)?.color }}
              />
              <span className="tooltip-name">{hoverBubble.name}</span>
              <span className="tooltip-cat">{TOOL_CATEGORIES.find((c) => c.id === hoverBubble.cat)?.label}</span>
            </div>
          )}
        </div>
        <div className="tools-legend">
          {TOOL_CATEGORIES.map((c) => (
            <button
              key={c.id}
              className={"tools-legend-item " + (activeCat === c.id ? "is-active" : "")}
              onClick={() => setActiveCat(activeCat === c.id ? null : c.id)}
            >
              <span className="tl-dot" style={{ background: c.color }} />
              <span className="tl-label">{c.label}</span>
              <span className="tl-count">{c.tools.length}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
