"use client"

const LOGO = "/eccdigital-staging/images/ecc-digital-logo.png"

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="ECC Digital" width={176} height={40} loading="lazy" decoding="async" />
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
            <h4>Výkonnostní marketing</h4>
            <ul>
              <li><a href="#sluzby">Meta Ads (Facebook, Instagram)</a></li>
              <li><a href="#sluzby">Google Ads (Search, Performance Max)</a></li>
              <li><a href="#sluzby">Sklik a Seznam reklama</a></li>
              <li><a href="#sluzby">TikTok &amp; LinkedIn Ads</a></li>
              <li><a href="#sluzby">Microsoft Ads</a></li>
              <li><a href="#sluzby">Heureka, Zboží.cz a srovnávače</a></li>
              <li><a href="#sluzby">Analytika GA4 a server-side tracking</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Tvorba prezentací a obsahu</h4>
            <ul>
              <li><a href="#weby">Firemní weby (WordPress, Next.js)</a></li>
              <li><a href="#weby">E-shopy (WooCommerce, Shoptet)</a></li>
              <li><a href="#weby">Vícejazyčné weby a landing pages</a></li>
              <li><a href="#sluzby">PPC bannery a kreativy</a></li>
              <li><a href="#sluzby">Audity webů a UX</a></li>
              <li><a href="#sluzby">Reporting a Looker Studio</a></li>
              <li><a href="#sluzby">Školení marketingových týmů</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Kontakt</h4>
            <div className="footer-contact">
              <a href="tel:+420724443968">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +420 724 443 968
              </a>
              <a href="mailto:admin@eccdigital.cz">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                admin@eccdigital.cz
              </a>
              <a href="#kontakt">Audit nebo konzultace zdarma →</a>
            </div>
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
