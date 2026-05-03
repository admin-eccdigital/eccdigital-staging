"use client"
import type { ReactNode } from "react"
import { ArrowRight, Reveal } from "./shared"

const SERVICES: { t: string; d: string; svg: ReactNode }[] = [
  {
    t: "Výkonnostní kampaně",
    d: "Meta, Google, Sklik, TikTok, LinkedIn, Microsoft a srovnávače. Správa rozpočtů, optimalizace a měřitelný výkon napříč platformami.",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
      </svg>
    ),
  },
  {
    t: "Tvorba webů a landing pages",
    d: "WordPress, Next.js, vlastní šablony. Stavíme firemní weby, vícejazyčné prezentace a výkonné landing pages pro výkonnostní kampaně.",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.11 0-2 .89-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 14H4V8h16v10z" />
      </svg>
    ),
  },
  {
    t: "Digitální strategie",
    d: "Audity, plány a roadmapy postavené na datech. Definujeme, kam směřujete a jak se tam dostanete.",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    t: "Analytika a měření",
    d: "GA4, GTM, server-side tracking, Looker Studio. Data, na kterých můžete stavět rozhodování.",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 22V8h4v14H3zm7 0V2h4v20h-4zm7 0v-9h4v9h-4z" />
      </svg>
    ),
  },
  {
    t: "Školení týmů",
    d: "Praktická školení pro vaše marketéry — výkonnostní reklama, analytika, využití AI v každodenní práci.",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
      </svg>
    ),
  },
  {
    t: "Konzultace",
    d: "Hodinové i dlouhodobé konzultace pro majitele a marketingové ředitele. Druhý názor, který se vyplatí.",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
      </svg>
    ),
  },
]

export function Services() {
  return (
    <section id="sluzby" className="light light--tight">
      <div className="container">
        <Reveal className="section-head">
          <div className="eyebrow">
            <span className="num">02</span>
            <span className="dot" />
            Co děláme
          </div>
          <h2 className="h2">
            Kompletní digitální marketing <span className="accent">pod jednou střechou</span>
          </h2>
          <p className="lead-light">
            Od strategie a výkonnostní reklamy přes weby a analytiku až po školení vašeho týmu. Vše propojeně, vše
            měřitelně.
          </p>
        </Reveal>
        <div className="svc-grid">
          {SERVICES.map((s, idx) => (
            <Reveal key={s.t} delay={idx * 70}>
              <div className="svc-card">
                <div className="svc-ic">{s.svg}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <div className="arrow">
                  Zjistit více <ArrowRight size={14} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
