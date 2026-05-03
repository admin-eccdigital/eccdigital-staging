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
            <img src={LOGO} alt="ECC Digital" />
          </div>
          <div className="nav-links">
            {items.map((i) => (
              <button key={i.href} className="nav-link" onClick={() => go(i.href, i.external)}>
                {i.name}
              </button>
            ))}
          </div>
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
          >
            {i.name}
            <ArrowRight size={14} />
          </a>
        ))}
        <a
          href="#"
          data-lead="audit"
          style={{
            background: "linear-gradient(90deg,var(--accent),var(--accent-2))",
            color: "#fff",
            fontWeight: 600,
            marginTop: 8,
          }}
        >
          Audit zdarma
          <ArrowRight size={14} />
        </a>
      </div>
    </>
  )
}
