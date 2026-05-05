"use client"
import { useEffect, useMemo, useState } from "react"
import { ArrowRight, ClockIcon } from "./shared"

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now())
  const d = Math.floor(ms / 86400000)
  const h = Math.floor((ms % 86400000) / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return { d, h, m, s }
}

export function BlogOffer() {
  const target = useMemo(() => {
    const d = new Date()
    return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59)
  }, [])
  const [t, setT] = useState(() => diff(target))
  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])
  const { d, h, m, s } = t
  return (
    <div className="blog-offer">
      <div className="bo-tag">
        <ClockIcon size={14} /> Časově omezená nabídka
      </div>
      <div className="bo-title">
        Audit digitálního marketingu <span>zdarma</span>
      </div>
      <div className="bo-desc">Pro nové klienty do konce měsíce. Bez závazku, výstup do 10 dní.</div>
      <div className="bo-countdown">
        <div className="bo-cell">
          <div className="bo-num">{String(d).padStart(2, "0")}</div>
          <div className="bo-lbl">dnů</div>
        </div>
        <div className="bo-cell">
          <div className="bo-num">{String(h).padStart(2, "0")}</div>
          <div className="bo-lbl">hodin</div>
        </div>
        <div className="bo-cell">
          <div className="bo-num">{String(m).padStart(2, "0")}</div>
          <div className="bo-lbl">minut</div>
        </div>
        <div className="bo-cell">
          <div className="bo-num">{String(s).padStart(2, "0")}</div>
          <div className="bo-lbl">sekund</div>
        </div>
      </div>
      <a href="#" data-lead="audit" className="bo-cta">
        Chci audit zdarma <ArrowRight size={16} />
      </a>
    </div>
  )
}
