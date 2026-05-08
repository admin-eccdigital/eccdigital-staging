"use client"

import {
  PageShell,
  T,
  SectionLabel,
  ButtonLink,
  useFadeUp,
  BASE,
  ROUTE,
} from "./_components/shared"

const services = [
  {
    n: "01",
    t: "Inženýrská činnost",
    d: "Vyřízení územního rozhodnutí, stavebního povolení a kolaudace. Jednání s úřady a dotčenými orgány.",
  },
  {
    n: "02",
    t: "Stavební dozor",
    d: "Dohled nad průběhem stavby, kvalitou prací a dodržováním projektu.",
  },
  {
    n: "03",
    t: "Projektová příprava",
    d: "Studie a dokumentace ve spolupráci s ověřenými projektanty.",
  },
  {
    n: "04",
    t: "Konzultace",
    d: "Posouzení záměru, odhad rozsahu povolení, doporučení dalšího postupu.",
  },
]

const projects = [
  {
    title: "Stará varna Pilsner Urquell",
    kind: "Projekční činnost",
    loc: "Plzeň",
    img: `${BASE}/foto/stara-varna-01.jpg`,
  },
  {
    title: "Hotel U Zvonu",
    kind: "Stavební dozor",
    loc: "Plzeň",
    img: `${BASE}/foto/hotel-u-zvonu-01.jpg`,
  },
  {
    title: "Bytový dům — Šeříkova",
    kind: "Inženýring",
    loc: "Plzeň",
    img: `${BASE}/foto/serikova-01.jpg`,
  },
  {
    title: "Kroftovy domy",
    kind: "Rekonstrukce fasády",
    loc: "Plzeň",
    img: `${BASE}/foto/kroftovy-domy-01.jpg`,
  },
  {
    title: "Pivovarské muzeum",
    kind: "Stavební dozor",
    loc: "Plzeň",
    img: `${BASE}/foto/pivovarske-muzeum-01.jpg`,
  },
  {
    title: "Fasáda U tržiště",
    kind: "Projekční činnost",
    loc: "Plzeň",
    img: `${BASE}/foto/fasada-u-trziste-01.jpg`,
  },
]

function Hero() {
  return (
    <section
      id="hero"
      style={{
        padding: "64px 56px 56px",
        position: "relative",
        overflow: "hidden",
        borderBottom: `1px solid ${T.bone}`,
        maxWidth: 1440,
        margin: "0 auto",
      }}
      className="smolik-hero"
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
      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 48,
          alignItems: "end",
        }}
        className="smolik-hero-grid"
      >
        <div>
          <h1
            style={{
              fontFamily: T.display,
              fontWeight: 700,
              fontSize: 88,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              margin: 0,
              color: T.ink,
            }}
            className="smolik-h1"
          >
            Ing. Pavel
            <br />
            Smolík<span style={{ color: T.steel }}>.</span>
          </h1>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 13,
              letterSpacing: "0.16em",
              color: T.slate,
              textTransform: "uppercase",
              marginTop: 24,
            }}
          >
            Kompletní stavební inženýring
          </div>
        </div>
        <div
          style={{
            borderLeft: `1px solid ${T.bone}`,
            paddingLeft: 32,
          }}
          className="smolik-hero-right"
        >
          <div
            style={{
              fontFamily: T.mono,
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: T.steel,
            }}
          >
            Obor
          </div>
          <div
            style={{
              fontFamily: T.body,
              fontSize: 15,
              lineHeight: 1.7,
              color: T.slate,
              marginTop: 8,
            }}
          >
            Inženýrská činnost &middot; stavební dozor &middot; projektová
            příprava &middot; konzultace.
          </div>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 13,
              color: T.ink,
              marginTop: 20,
              lineHeight: 1.7,
            }}
          >
            +420 602 260 119
            <br />
            <a
              href="mailto:smolik.inzenyring@seznam.cz"
              style={{ color: T.steel, textDecoration: "none" }}
              className="smolik-link"
            >
              smolik.inzenyring@seznam.cz
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const ref = useFadeUp()
  return (
    <section
      id="sluzby"
      ref={ref}
      style={{
        padding: "56px 56px",
        maxWidth: 1440,
        margin: "0 auto",
      }}
      className="smolik-section-pad"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "240px 1fr",
          gap: 48,
        }}
        className="smolik-sidebar-grid"
      >
        <SectionLabel label="—01 ČINNOST" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {services.map((s, i) => (
            <div
              key={s.n}
              data-fade
              style={{
                display: "grid",
                gridTemplateColumns: "60px 1fr 2fr",
                gap: 28,
                padding: "22px 0",
                borderTop: i === 0 ? "none" : `1px solid ${T.bone}`,
              }}
              className="smolik-service-row"
            >
              <span
                style={{
                  fontFamily: T.mono,
                  fontSize: 13,
                  color: T.steel,
                  letterSpacing: "0.08em",
                }}
              >
                {s.n}
              </span>
              <h3
                style={{
                  fontFamily: T.display,
                  fontWeight: 600,
                  fontSize: 22,
                  letterSpacing: "-0.02em",
                  margin: 0,
                  color: T.ink,
                }}
              >
                {s.t}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: T.slate,
                  margin: 0,
                  fontFamily: T.body,
                }}
              >
                {s.d}
              </p>
            </div>
          ))}
          <div style={{ marginTop: 24 }}>
            <ButtonLink href={`${ROUTE}/sluzby/`}>
              Všechny činnosti
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}

function References() {
  const ref = useFadeUp()
  return (
    <section
      id="reference"
      ref={ref}
      style={{
        padding: "56px 56px",
        borderTop: `1px solid ${T.bone}`,
        maxWidth: 1440,
        margin: "0 auto",
      }}
      className="smolik-section-pad"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "240px 1fr",
          gap: 48,
          marginBottom: 32,
        }}
        className="smolik-sidebar-grid"
      >
        <SectionLabel label="—02 REFERENCE" />
        <span
          style={{
            fontFamily: T.mono,
            fontSize: 11,
            letterSpacing: "0.16em",
            color: T.fog,
            alignSelf: "center",
          }}
        >
          Výběr · {projects.length} z&nbsp;projektů
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
        className="smolik-projects-grid"
      >
        {projects.map((p) => (
          <div key={p.title} data-fade className="smolik-project-card">
            <div
              style={{
                position: "relative",
                aspectRatio: "4/3",
                background: T.bone,
                backgroundImage: `url(${p.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 12,
                  bottom: 10,
                  fontFamily: T.mono,
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.85)",
                  textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                }}
              >
                {p.loc}
              </span>
              <div className="smolik-card-overlay" />
            </div>
            <div
              style={{
                marginTop: 12,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 12,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: T.mono,
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    color: T.steel,
                    textTransform: "uppercase",
                  }}
                >
                  {p.kind}
                </div>
                <h3
                  style={{
                    fontFamily: T.display,
                    fontWeight: 600,
                    fontSize: 17,
                    letterSpacing: "-0.015em",
                    margin: "4px 0 0",
                    color: T.ink,
                  }}
                >
                  {p.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 32 }}>
        <ButtonLink href={`${ROUTE}/reference/`}>
          Více referencí
        </ButtonLink>
      </div>
    </section>
  )
}

function Qualifications() {
  const ref = useFadeUp()
  return (
    <section
      id="kvalifikace"
      ref={ref}
      style={{
        padding: "56px 56px",
        background: T.bone,
        borderTop: `1px solid ${T.bone}`,
      }}
      className="smolik-section-pad"
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "240px 1fr 1fr",
          gap: 48,
          alignItems: "start",
        }}
        className="smolik-qual-grid"
      >
        <SectionLabel label="—03 KVALIFIKACE" />
        <ul
          data-fade
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            fontSize: 14,
            lineHeight: 1.85,
            color: T.ink,
            fontFamily: T.body,
          }}
        >
          <li>Autorizovaný inženýr ČKAIT — pozemní stavby</li>
          <li>Číslo autorizace: 0200244</li>
          <li>Koordinátor BOZP na staveništi</li>
        </ul>
        <ul
          data-fade
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            fontSize: 14,
            lineHeight: 1.85,
            color: T.slate,
            fontFamily: T.body,
          }}
        >
          <li>ČVUT — fakulta stavební</li>
          <li>Praxe v oboru — přes 40 let</li>
          <li>Působnost — Plzeň a Praha</li>
        </ul>
      </div>
    </section>
  )
}

export default function SmolikPage() {
  return (
    <PageShell>
      <Hero />
      <Services />
      <References />
      <Qualifications />
    </PageShell>
  )
}
