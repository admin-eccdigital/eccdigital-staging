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
        className="fab-side"
        data-lead="audit"
        aria-label="Poptejte nás"
      >
        <span className="fab-side-pulse" aria-hidden="true" />
        <span className="fab-side-text">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
          <span>Poptejte nás zdarma</span>
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
