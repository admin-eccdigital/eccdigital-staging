"use client"

import { useEffect, useRef } from "react"
import "./smolik.css"

const BASE = "/eccdigital-staging/inzenyring-smolik"

const T = {
  ink: "#0a0d12",
  graphite: "#1d2128",
  slate: "#3a3f48",
  fog: "#a3a8af",
  paper: "#f4f2ed",
  bone: "#e8e5dd",
  steel: "#2f5d8a",
  signal: "#d97044",
  display: '"Space Grotesk", sans-serif',
  body: '"IBM Plex Sans", sans-serif',
  mono: '"IBM Plex Mono", monospace',
}

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

function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const children = el.querySelectorAll<HTMLElement>("[data-fade]")
    children.forEach((c) => {
      c.style.opacity = "0"
      c.style.transform = "translateY(8px)"
      c.style.transition =
        "opacity 400ms cubic-bezier(0.2,0.8,0.2,1), transform 400ms cubic-bezier(0.2,0.8,0.2,1)"
    })
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const target = e.target as HTMLElement
            target.style.opacity = "1"
            target.style.transform = "translateY(0)"
            io.unobserve(target)
          }
        })
      },
      { threshold: 0.15 }
    )
    children.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [])
  return ref
}

function Nav() {
  const scroll = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(244,242,237,0.9)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: `1px solid ${T.bone}`,
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 56px",
        }}
        className="smolik-nav-inner"
      >
        {/* Inline wordmark */}
        <a
          href="#"
          onClick={scroll("hero")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            color: T.ink,
          }}
        >
          <span
            style={{
              fontFamily: T.display,
              fontWeight: 700,
              fontSize: 26,
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
            }}
          >
            SMOLÍK
          </span>
          <span
            style={{
              width: 1,
              height: 20,
              background: T.ink,
              opacity: 0.35,
            }}
          />
          <span
            style={{
              fontFamily: T.mono,
              fontWeight: 500,
              fontSize: 4.7,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: T.steel,
              lineHeight: 1.3,
            }}
          >
            Stavební
            <br />
            inženýring
          </span>
        </a>
        <nav style={{ display: "flex", gap: 32 }} className="smolik-nav-links">
          {[
            ["Služby", "sluzby"],
            ["Reference", "reference"],
            ["O mně", "kvalifikace"],
            ["Kontakt", "kontakt"],
          ].map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={scroll(id)}
              className="smolik-nav-link"
              style={{
                color: T.ink,
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 500,
                fontFamily: T.body,
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

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
        <span
          style={{
            fontFamily: T.mono,
            fontSize: 11,
            letterSpacing: "0.18em",
            color: T.steel,
          }}
        >
          —01 ČINNOST
        </span>
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
        <span
          style={{
            fontFamily: T.mono,
            fontSize: 11,
            letterSpacing: "0.18em",
            color: T.steel,
          }}
        >
          —02 REFERENCE
        </span>
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
        <span
          style={{
            fontFamily: T.mono,
            fontSize: 11,
            letterSpacing: "0.18em",
            color: T.steel,
          }}
        >
          —03 KVALIFIKACE
        </span>
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
          <li>Působnost — Plzeň a Plzeňský kraj</li>
        </ul>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section
      id="kontakt"
      style={{
        padding: "56px 56px 40px",
        background: T.ink,
        color: T.paper,
      }}
      className="smolik-section-pad"
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "240px 1fr 1fr",
            gap: 48,
          }}
          className="smolik-contact-grid"
        >
          <span
            style={{
              fontFamily: T.mono,
              fontSize: 11,
              letterSpacing: "0.18em",
              color: T.steel,
            }}
          >
            —04 KONTAKT
          </span>
          <div
            style={{
              fontSize: 15,
              lineHeight: 1.75,
              fontFamily: T.body,
            }}
          >
            <div
              style={{
                fontFamily: T.display,
                fontWeight: 600,
                fontSize: 22,
                letterSpacing: "-0.02em",
                marginBottom: 8,
              }}
            >
              Ing. Pavel Smolík
            </div>
            <div style={{ color: "rgba(255,255,255,0.65)" }}>
              Popelnicová 1218/61
              <br />
              312 00 Plzeň
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                marginTop: 14,
                fontSize: 13,
              }}
            >
              Kancelář — Alej Svobody 56, 323 00 Plzeň
            </div>
          </div>
          <div
            style={{
              fontSize: 15,
              lineHeight: 1.75,
              fontFamily: T.body,
            }}
          >
            <a
              href="tel:+420602260119"
              style={{
                fontFamily: T.mono,
                fontSize: 16,
                color: T.paper,
                textDecoration: "none",
              }}
              className="smolik-link"
            >
              +420 602 260 119
            </a>
            <br />
            <a
              href="mailto:smolik.inzenyring@seznam.cz"
              style={{
                fontFamily: T.mono,
                fontSize: 14,
                color: T.steel,
                textDecoration: "none",
                marginTop: 4,
                display: "inline-block",
              }}
              className="smolik-link"
            >
              smolik.inzenyring@seznam.cz
            </a>
            <div
              style={{
                marginTop: 20,
                fontFamily: T.mono,
                fontSize: 12,
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.7,
              }}
            >
              IČ: 114 12 658
              <br />
              DIČ: CZ5705150165
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 64,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,0.12)",
            fontFamily: T.mono,
            fontSize: 11,
            letterSpacing: "0.16em",
            color: "rgba(255,255,255,0.45)",
          }}
          className="smolik-footer"
        >
          <span>© 2025 ING. PAVEL SMOLÍK</span>
          <span>PLZEŇ · CZ</span>
        </div>
      </div>
    </section>
  )
}

export default function SmolikPage() {
  return (
    <div
      style={{
        background: T.paper,
        color: T.ink,
        fontFamily: T.body,
        minHeight: "100vh",
      }}
    >
      <Nav />
      <Hero />
      <Services />
      <References />
      <Qualifications />
      <Contact />
    </div>
  )
}
