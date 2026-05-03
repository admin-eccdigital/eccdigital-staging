"use client"
import { ArrowRight, Reveal } from "./shared"

export function CTA() {
  return (
    <section id="kontakt" className="cta">
      <Reveal>
        <div className="cta-box">
          <div className="cta-eyebrow">
            <span className="num">06</span>
            <span className="dot" />
            Začněme spolu
          </div>
          <h3>
            Začněte <em>auditem nebo konzultací zdarma.</em>
          </h3>
          <p>
            Než cokoliv slíbíme, podíváme se, kde jste. Připravíme nezávazný výstup s konkrétními kroky pro váš digitální
            růst.
          </p>
          <div className="cta-row">
            <a href="#" data-lead="audit" className="btn-primary">
              Audit zdarma <ArrowRight size={20} />
            </a>
            <a href="#" data-lead="konzultace" className="btn-ghost">
              Konzultace zdarma
            </a>
          </div>
          <div className="cta-meta">
            <span>Odpovíme do 24 hodin</span>
            <span>Bez závazků</span>
            <span>Výstup do 10 dní</span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
