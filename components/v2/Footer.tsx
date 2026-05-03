"use client"

const LOGO = "/eccdigital-staging/images/ecc-digital-logo.png"

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="ECC Digital" />
          <p>Educate · Create · Care Digital — strategický partner pro váš digitální růst od roku 2015.</p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM8.34 17H5.67V9.5h2.67V17zM7 8.34a1.55 1.55 0 110-3.1 1.55 1.55 0 010 3.1zM18.34 17h-2.67v-3.84c0-.92-.02-2.1-1.28-2.1s-1.48 1-1.48 2.03V17h-2.67V9.5h2.56v1.03h.04c.36-.68 1.23-1.4 2.54-1.4 2.71 0 3.21 1.78 3.21 4.1V17z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-cols">
          <div className="footer-col">
            <h4>Služby</h4>
            <ul>
              <li><a href="#">Výkonnostní kampaně</a></li>
              <li><a href="#">Tvorba webů</a></li>
              <li><a href="#">Analytika</a></li>
              <li><a href="#">Strategie</a></li>
              <li><a href="#">Školení</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Reference</h4>
            <ul>
              <li><a href="#">Klimahome</a></li>
              <li><a href="#">Escoflooring</a></li>
              <li><a href="#">Marcsis</a></li>
              <li><a href="#">Florea.cz</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Firma</h4>
            <ul>
              <li><a href="#">O nás</a></li>
              <li><a href="#reference">Reference</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#kontakt">Kontakt</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} ECC Digital. Všechna práva vyhrazena.</span>
        <div style={{ display: "flex", gap: 18 }}>
          <a href="#">Zásady ochrany osobních údajů</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  )
}
