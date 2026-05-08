"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

export const BASE = "/eccdigital-staging/inzenyring-smolik"
export const ROUTE = "/inzenyring-smolik"

export const T = {
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

export function useFadeUp() {
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

export function Nav() {
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
        <Link
          href={`${ROUTE}/`}
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
        </Link>
        <nav style={{ display: "flex", gap: 32 }} className="smolik-nav-links">
          {[
            ["Služby", `${ROUTE}/sluzby/`],
            ["Reference", `${ROUTE}/reference/`],
            ["O mně", `${ROUTE}/#kvalifikace`],
            ["Kontakt", `${ROUTE}/#kontakt`],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
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
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export function Contact() {
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
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
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
            KONTAKT
          </span>
          <div
            style={{ fontSize: 15, lineHeight: 1.75, fontFamily: T.body }}
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
            <div style={{ color: "rgba(255,255,255,0.8)" }}>
              Popelnicová 1218/61
              <br />
              312 00 Plzeň
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.65)",
                marginTop: 14,
                fontSize: 13,
              }}
            >
              Kancelář — Alej Svobody 56, 323 00 Plzeň
            </div>
          </div>
          <div
            style={{ fontSize: 15, lineHeight: 1.75, fontFamily: T.body }}
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
                color: "#6ba3d6",
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
                color: "rgba(255,255,255,0.6)",
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
            color: "rgba(255,255,255,0.6)",
          }}
          className="smolik-footer"
        >
          <span>© {new Date().getFullYear()} ING. PAVEL SMOLÍK</span>
          <span>PLZEŇ · CZ</span>
        </div>
      </div>
    </section>
  )
}

export function PageShell({ children }: { children: React.ReactNode }) {
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
      {children}
      <Contact />
    </div>
  )
}

export function SectionLabel({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily: T.mono,
        fontSize: 11,
        letterSpacing: "0.18em",
        color: T.steel,
      }}
    >
      {label}
    </span>
  )
}

export function ButtonLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="smolik-btn"
      style={{
        background: T.ink,
        color: T.paper,
        fontFamily: T.body,
        fontSize: 13,
        fontWeight: 500,
        border: 0,
        padding: "14px 22px",
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        textDecoration: "none",
      }}
    >
      {children}
      <span style={{ fontFamily: T.mono, fontSize: 14 }}>→</span>
    </Link>
  )
}
