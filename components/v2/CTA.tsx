"use client"
import { ArrowRight, Reveal } from "./shared"

const PHOTO = "/eccdigital-staging/images/team/petr-stepan-circle.png"

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

          <div className="cta-contact">
            <div className="cta-contact-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={PHOTO} alt="Petr Štěpán" />
            </div>
            <div className="cta-contact-body">
              <div className="cta-contact-eyebrow">Volejte přímo</div>
              <div className="cta-contact-name">Ing. Petr Štěpán</div>
              <div className="cta-contact-role">Vedoucí výkonnostních kampaní a analytiky</div>
              <div className="cta-contact-links">
                <a href="tel:+420724443968" className="cta-contact-phone">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>+420 724 443 968</span>
                </a>
                <a href="mailto:admin@eccdigital.cz" className="cta-contact-email">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <span>admin@eccdigital.cz</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
