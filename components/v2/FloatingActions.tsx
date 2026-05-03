"use client"
import { useEffect, useState } from "react"

/** Two persistent floating actions:
 *  1) Vertical "Poptejte nás" tab anchored to the right edge — opens LeadModal
 *  2) Scroll-to-top circle in the bottom-right corner, appears after the user
 *     scrolls past the hero. Mobile-friendly hit areas (≥44px), keyboard-
 *     focusable, hides itself when the LeadModal is open. */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Hide our buttons when the LeadModal is open (it freezes body scroll).
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setModalOpen(getComputedStyle(document.body).overflow === "hidden")
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] })
    return () => observer.disconnect()
  }, [])

  if (modalOpen) return null

  return (
    <>
      <button
        type="button"
        className="fab-cta"
        data-lead="audit"
        aria-label="Poptat audit zdarma"
      >
        <span className="fab-cta-ico" aria-hidden="true">
          {/* Document with arrow — "submit inquiry / get a quote", not chat */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="9" y1="13" x2="15" y2="13"/>
            <line x1="9" y1="17" x2="13" y2="17"/>
          </svg>
        </span>
        <span className="fab-cta-text">Poptat audit <strong>zdarma</strong></span>
        <span className="fab-cta-arrow" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </span>
      </button>

      <button
        type="button"
        className={`fab-top ${showTop ? "is-visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Nahoru"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
      </button>
    </>
  )
}
