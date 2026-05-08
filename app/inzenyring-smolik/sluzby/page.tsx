"use client"

import { PageShell, T, SectionLabel, useFadeUp } from "../_components/shared"

const categories = [
  {
    n: "01",
    title: "Projekční činnost",
    subtitle: "Kompletní projektová dokumentace pozemních a inženýrských staveb",
    items: [
      "Architektonické, dispoziční a objemové studie",
      "Dokumentace zaměření skutečného stávajícího stavu",
      "Projektová dokumentace pro územní a stavební řízení",
      "Projektová dokumentace pro výběr zhotovitele",
      "Prováděcí projektová dokumentace",
      "Dokumentace skutečného provedení stavby",
    ],
  },
  {
    n: "02",
    title: "Inženýrská činnost",
    subtitle: "Inženýrská činnost ve stavebnictví",
    items: [
      "Zajištění podkladů pro výběrové řízení na provedení stavby",
      "Zajištění výběrového řízení na provedení stavby vč. vyhodnocení",
      "Zajištění stavebního ohlášení nebo stavebního povolení",
      "Výkon funkce stavebního dozoru pro investory a ostatní zhotovitele staveb",
      "Zajištění podkladů pro kolaudační řízení vč. kolaudačního řízení",
      "Ostatní inženýrská činnost v procesu stavebnictví",
    ],
  },
  {
    n: "03",
    title: "Koordinátor BOZP",
    subtitle: "Bezpečnost a ochrana zdraví při práci na staveništi",
    items: [
      "Provádění plánů a ostatních podkladů BOZP",
      "Provádění výkonu funkce koordinátora BOZP na staveništi",
      "Kontrola podkladů a realizace z hlediska BOZP",
    ],
  },
  {
    n: "04",
    title: "Provádění staveb",
    subtitle: "Kompletní realizace staveb pozemního a inženýrského stavitelství",
    items: [
      "Zajištění kompletní a komplexní realizace staveb pozemního stavitelství a inženýrských staveb — bytové, občanské, administrativní, průmyslové vč. potřebných inženýrských sítí, komunikací, zpevněných a parkovacích ploch vč. terénních úprav",
      "Opravy, údržba a rekonstrukce stávajících objektů",
      "Renovace panelových budov, zateplení fasád a střech a komplexní revitalizace starého bytového fondu",
    ],
  },
]

export default function SluzbyPage() {
  const ref = useFadeUp()

  return (
    <PageShell>
      {/* Page hero */}
      <section
        style={{
          padding: "64px 56px 48px",
          maxWidth: 1440,
          margin: "0 auto",
          borderBottom: `1px solid ${T.bone}`,
          position: "relative",
          overflow: "hidden",
        }}
        className="smolik-section-pad"
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(${T.steel}0d 1px, transparent 1px), linear-gradient(90deg, ${T.steel}0d 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative" }}>
          <SectionLabel label="SLUŽBY" />
          <h1
            style={{
              fontFamily: T.display,
              fontWeight: 700,
              fontSize: 56,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              margin: "16px 0 0",
              color: T.ink,
            }}
            className="smolik-h1"
          >
            Kompletní stavební
            <br />
            inženýring<span style={{ color: T.steel }}>.</span>
          </h1>
          <p
            style={{
              fontFamily: T.body,
              fontSize: 16,
              lineHeight: 1.6,
              color: T.slate,
              marginTop: 20,
              maxWidth: 560,
            }}
          >
            Zajišťujeme kompletní projekční a inženýrskou činnost, činnosti
            koordinátora BOZP, zajištění i stavební realizace.
          </p>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 12,
              color: T.fog,
              marginTop: 16,
              letterSpacing: "0.08em",
            }}
          >
            Člen ČKAIT — č. autorizace 0200244
          </div>
        </div>
      </section>

      {/* Services detail */}
      <section
        ref={ref}
        style={{
          padding: "56px 56px",
          maxWidth: 1440,
          margin: "0 auto",
        }}
        className="smolik-section-pad"
      >
        {categories.map((cat, ci) => (
          <div
            key={cat.n}
            data-fade
            style={{
              display: "grid",
              gridTemplateColumns: "240px 1fr",
              gap: 48,
              padding: "48px 0",
              borderTop: ci === 0 ? "none" : `1px solid ${T.bone}`,
            }}
            className="smolik-sidebar-grid"
          >
            <div>
              <span
                style={{
                  fontFamily: T.mono,
                  fontSize: 13,
                  color: T.steel,
                  letterSpacing: "0.08em",
                }}
              >
                —{cat.n}
              </span>
            </div>
            <div>
              <h2
                style={{
                  fontFamily: T.display,
                  fontWeight: 600,
                  fontSize: 28,
                  letterSpacing: "-0.02em",
                  margin: 0,
                  color: T.ink,
                }}
              >
                {cat.title}
              </h2>
              <p
                style={{
                  fontFamily: T.body,
                  fontSize: 14,
                  color: T.slate,
                  marginTop: 8,
                  marginBottom: 24,
                }}
              >
                {cat.subtitle}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                {cat.items.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: 16,
                      padding: "12px 0",
                      borderTop: `1px solid ${T.bone}`,
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: T.ink,
                      fontFamily: T.body,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: T.mono,
                        fontSize: 11,
                        color: T.fog,
                        flexShrink: 0,
                        marginTop: 3,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  )
}
