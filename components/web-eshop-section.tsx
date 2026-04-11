"use client"

import { useEffect, useRef, useState } from "react"

export function WebEshopSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="weby" ref={sectionRef} className="relative z-10">
      <div className="bg-white pb-16 sm:pb-24 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div
            className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-sm font-medium mb-6">
              Weby & E-shopy
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 text-balance mb-4 sm:mb-6">
              Tvoříme weby, které{" "}
              <span className="bg-gradient-to-r from-slate-600 to-slate-400 bg-clip-text text-transparent">
                prodávají
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
              Moderní webové stránky a e-shopy na míru — rychlé, responzivní a optimalizované pro konverze.
            </p>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="rounded-2xl border border-slate-200 p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-slate-900 flex items-center justify-center text-white mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Webové stránky</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Firemní prezentace, landing pages a microsites. Vše s moderním designem, SEO optimalizací a mobilní responzivitou.
              </p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>Responzivní design</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>SEO optimalizace</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>Rychlé načítání</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-slate-900 flex items-center justify-center text-white mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">E-shopy</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Kompletní e-shopová řešení včetně napojení na platební brány, dopravce, účetní systémy a marketingové nástroje.
              </p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>Produktové feedy</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>Platební brány</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>Napojení na dopravce</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
