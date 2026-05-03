"use client"
import { useEffect, useState } from "react"

const STORAGE_KEY = "ecc-cookie-consent-v1"

type Consent = {
  necessary: true
  analytics: boolean
  marketing: boolean
  ts: number
}

declare global {
  interface Window {
    dataLayer?: any[]
    gtag?: (...args: any[]) => void
  }
}

function applyConsent(c: Consent) {
  // Google Consent Mode v2 — works whether or not GTM/GA is loaded yet.
  // When GA/GTM later boots, it will read these defaults.
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function gtag(..._args: any[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments as any)
  }
  ;(window as any).gtag = (window as any).gtag || gtag
  ;(window as any).gtag("consent", "update", {
    ad_storage: c.marketing ? "granted" : "denied",
    ad_user_data: c.marketing ? "granted" : "denied",
    ad_personalization: c.marketing ? "granted" : "denied",
    analytics_storage: c.analytics ? "granted" : "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  })
}

export function CookieBar() {
  const [open, setOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [marketing, setMarketing] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const c = JSON.parse(stored) as Consent
        applyConsent(c)
        return
      }
    } catch {}
    // Set default state (denied) per Consent Mode v2 best practice
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function gtag(..._args: any[]) {
        window.dataLayer!.push(arguments as any)
      }
      ;(window as any).gtag = (window as any).gtag || gtag
      ;(window as any).gtag("consent", "default", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
        functionality_storage: "granted",
        security_storage: "granted",
        wait_for_update: 500,
      })
    }
    setOpen(true)
  }, [])

  const save = (c: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(c))
    } catch {}
    applyConsent(c)
    setOpen(false)
    setShowSettings(false)
  }

  const acceptAll = () =>
    save({ necessary: true, analytics: true, marketing: true, ts: Date.now() })
  const rejectAll = () =>
    save({ necessary: true, analytics: false, marketing: false, ts: Date.now() })
  const saveCustom = () =>
    save({ necessary: true, analytics, marketing, ts: Date.now() })

  if (!open) return null

  return (
    <div className="cookiebar-wrap" role="dialog" aria-label="Souhlas s cookies" aria-live="polite">
      <div className="cookiebar">
        {!showSettings ? (
          <>
            <div className="cookiebar-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
                <path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M11 17v.01"/><path d="M7 14v.01"/>
              </svg>
            </div>
            <div className="cookiebar-body">
              <div className="cookiebar-title">Pomáhají nám sušenky</div>
              <p className="cookiebar-desc">
                Používáme cookies pro analytiku návštěvnosti a měření výkonu reklamy. Bez nich web funguje, jen přijdeme
                o data, ze kterých lépe vyhodnocujeme co děláme. <a href="#cookies-info">Více o cookies</a>.
              </p>
            </div>
            <div className="cookiebar-actions">
              <button className="cb-btn cb-btn--ghost" onClick={() => setShowSettings(true)}>
                Nastavit
              </button>
              <button className="cb-btn cb-btn--ghost" onClick={rejectAll}>
                Odmítnout
              </button>
              <button className="cb-btn cb-btn--primary" onClick={acceptAll}>
                Přijmout vše
              </button>
            </div>
          </>
        ) : (
          <div className="cookiebar-settings">
            <div className="cookiebar-title">Nastavení cookies</div>
            <p className="cookiebar-desc">
              Vyberte, které kategorie cookies můžeme používat. Volbu lze kdykoli změnit kliknutím na odkaz „Cookies"
              v patičce.
            </p>
            <div className="cb-row">
              <div>
                <strong>Nezbytné cookies</strong>
                <p>Zajišťují fungování webu (např. zapamatování souhlasu). Nelze vypnout.</p>
              </div>
              <span className="cb-toggle is-disabled" aria-hidden="true">
                <span className="cb-toggle-knob" />
              </span>
            </div>
            <div className="cb-row">
              <div>
                <strong>Analytické cookies</strong>
                <p>Anonymně měříme, jak web používáte (Google Analytics 4). Pomáhá nám web zlepšovat.</p>
              </div>
              <button
                className={`cb-toggle ${analytics ? "is-on" : ""}`}
                onClick={() => setAnalytics((a) => !a)}
                aria-pressed={analytics}
                aria-label="Analytické cookies"
              >
                <span className="cb-toggle-knob" />
              </button>
            </div>
            <div className="cb-row">
              <div>
                <strong>Marketingové cookies</strong>
                <p>Umožňují měření a optimalizaci našich reklam (Meta, Google Ads, Sklik).</p>
              </div>
              <button
                className={`cb-toggle ${marketing ? "is-on" : ""}`}
                onClick={() => setMarketing((m) => !m)}
                aria-pressed={marketing}
                aria-label="Marketingové cookies"
              >
                <span className="cb-toggle-knob" />
              </button>
            </div>
            <div className="cookiebar-actions">
              <button className="cb-btn cb-btn--ghost" onClick={() => setShowSettings(false)}>
                Zpět
              </button>
              <button className="cb-btn cb-btn--ghost" onClick={rejectAll}>
                Jen nezbytné
              </button>
              <button className="cb-btn cb-btn--primary" onClick={saveCustom}>
                Uložit volbu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
