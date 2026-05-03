"use client"
import { useEffect, useState } from "react"
import { ArrowRight } from "./shared"

export function Hero() {
  const words = ["Educate", "Create", "Care"]
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % words.length), 2200)
    return () => clearInterval(t)
  }, [])
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-chip-row">
          <span className="hero-chip">
            <span className="hero-chip-rotor">
              {words.map((w, idx) => {
                const cls =
                  idx === i ? "is-active" : idx === (i - 1 + words.length) % words.length ? "is-prev" : ""
                return (
                  <span key={w} className={cls}>
                    {w}
                  </span>
                )
              })}
            </span>
          </span>
          <span className="hero-digital">Digital</span>
        </div>
        <h1>
          Pomáháme firmám
          <br />v <span className="accent">digitálním růstu</span>
        </h1>
        <p className="hero-lead">
          Jsme strategický partner českých B2B firem. Spojujeme výkonnostní kampaně, weby, analytiku a školení do jedné
          funkční strategie — nikoliv izolovaných služeb.
        </p>
        <div className="hero-ctarow">
          <a href="#" data-lead="audit" className="btn-primary">
            Začněte auditem zdarma <ArrowRight size={20} />
          </a>
          <a href="#" data-lead="konzultace" className="btn-ghost">
            Domluvit konzultaci
          </a>
        </div>
        <div className="hero-trust">
          <div className="hero-trust-label">Spravujeme rozpočty a kampaně na</div>
          <div className="hero-trust-row">
            <span>Meta</span>
            <span>Google</span>
            <span>Sklik</span>
            <span>TikTok</span>
            <span>LinkedIn</span>
            <span>Microsoft</span>
            <span>Heureka</span>
          </div>
        </div>
      </div>
    </section>
  )
}
