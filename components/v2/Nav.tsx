"use client"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, MenuIcon, XIcon } from "./shared"

const LOGO = "/eccdigital-staging/images/ecc-digital-logo.png"

export function Nav() {
  const [hide, setHide] = useState(false)
  const [shrink, setShrink] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setShrink(y > 40)
      if (y < 80) {
        setHide(false)
        lastY.current = y
        return
      }
      if (y > lastY.current + 6) setHide(true)
      else if (y < lastY.current - 6) setHide(false)
      lastY.current = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  const items = [
    { name: "Služby", href: "#nastroje" },
    { name: "Reference", href: "#reference" },
    { name: "O nás", href: "#o-nas" },
    { name: "Blog", href: "#blog" },
    { name: "Banner Generator", href: "/eccdigital-staging/banner-generator/", external: true },
  ]
  const go = (href: string, external?: boolean) => {
    setOpen(false)
    if (external) {
      window.location.href = href
      return
    }
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  return (
    <>
      <div className="nav-wrap" data-hide={hide && !open ? "1" : "0"} data-shrink={shrink ? "1" : "0"}>
        <div className="nav">
          <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} alt="ECC Digital" width={176} height={40} fetchPriority="high" decoding="async" />
          </div>
          <div className="nav-links">
            {items.map((i) => (
              <button key={i.href} className="nav-link" onClick={() => go(i.href, i.external)}>
                {i.name}
              </button>
            ))}
          </div>
          <a className="nav-phone" href="tel:+420724443968" aria-label="Zavolejte nám">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>724 443 968</span>
          </a>
          <button className="nav-cta" data-lead="audit">
            <span className="cta-label">Audit zdarma</span>
            <ArrowRight size={14} />
          </button>
          <button className="nav-burger" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      <div className="mobile-menu" data-open={open ? "1" : "0"}>
        {items.map((i) => (
          <a
            key={i.href}
            onClick={(e) => {
              e.preventDefault()
              go(i.href, i.external)
            }}
            href={i.href}
            className={i.external ? "is-external" : ""}
          >
            <span>{i.name}</span>
            {i.external ? (
              // External / new page — diagonal arrow signals "leaves current page"
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-label="Otevře novou stránku"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            ) : null}
          </a>
        ))}
        <a
          href="#"
          data-lead="audit"
          className="mobile-menu-cta"
        >
          Audit zdarma
          <ArrowRight size={14} />
        </a>
      </div>
    </>
  )
}
