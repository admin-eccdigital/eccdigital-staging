"use client"
import { ArrowRight } from "./shared"

const PILLARS = ["Educate", "Create", "Care"]

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-pillars" aria-label="Educate · Create · Care Digital">
          {PILLARS.map((w, idx) => (
            <span key={w} className="hp-word">
              <span className="hp-init">{w[0]}</span>
              <span className="hp-rest">{w.slice(1)}</span>
              {idx < PILLARS.length - 1 && <span className="hp-sep" aria-hidden="true">·</span>}
            </span>
          ))}
          <span className="hp-suffix">Digital</span>
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
