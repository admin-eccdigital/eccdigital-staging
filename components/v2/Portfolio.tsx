"use client"
import { Reveal } from "./shared"

type Project = {
  name: string
  tag: string
  desc: string
  services: string[]
  palette: [string, string]
  image?: string
  url?: string
}

const PROJECTS: Project[] = [
  {
    name: "Klimahome",
    tag: "Tepelná čerpadla",
    desc: "Web, výkonnostní kampaně a strategie pro instalátora tepelných čerpadel.",
    services: ["Web", "PPC", "Strategie"],
    palette: ["oklch(0.72 0.14 230)", "oklch(0.85 0.10 200)"],
    image: "/eccdigital-staging/images/portfolio/klimahome-cz.jpg",
    url: "https://klimahome.cz",
  },
  {
    name: "Escoflooring",
    tag: "Decospan · NL",
    desc: "Trojjazyčný web ve spolupráci s nizozemským studiem pro mezinárodní brand.",
    services: ["Web", "3 jazyky", "Mezinárodní"],
    palette: ["oklch(0.55 0.10 60)", "oklch(0.72 0.12 50)"],
    image: "/eccdigital-staging/images/portfolio/escoflooring-com.jpg",
    url: "https://escoflooring.com",
  },
  {
    name: "Marcsis",
    tag: "Online marketing",
    desc: "Web a kompletní řízení online marketingu — od strategie po reporting.",
    services: ["Web", "PPC", "Analytika"],
    palette: ["oklch(0.65 0.18 350)", "oklch(0.78 0.14 320)"],
  },
  {
    name: "Florea.cz",
    tag: "E-commerce",
    desc: "PPC kampaně a řízení online marketingu pro český e-shop.",
    services: ["PPC", "Srovnávače", "Reporting"],
    palette: ["oklch(0.70 0.16 145)", "oklch(0.82 0.12 130)"],
    image: "/eccdigital-staging/images/portfolio/florea-cz.jpg",
    url: "https://florea.cz",
  },
  {
    name: "Profikas.cz",
    tag: "B2B služby",
    desc: "Cesta od tvorby webu k celostátním zakázkám — kompletní digitální růst.",
    services: ["Web", "Strategie", "PPC"],
    palette: ["oklch(0.60 0.15 30)", "oklch(0.75 0.13 50)"],
    image: "/eccdigital-staging/images/portfolio/profikas-cz.jpg",
    url: "https://profikas.cz",
  },
  {
    name: "Dovolená Zadar",
    tag: "Hotelový řetězec · HR",
    desc: "Landing page pro hotelový řetězec v Chorvatsku — vícejazyčná konverze.",
    services: ["Landing page", "Mezinárodní"],
    palette: ["oklch(0.68 0.14 250)", "oklch(0.80 0.11 220)"],
    image: "/eccdigital-staging/images/portfolio/dovolena-zadar-cz.jpg",
    url: "https://dovolena-zadar.cz",
  },
]

function CaseTile({ p }: { p: Project }) {
  const grad = `linear-gradient(135deg, ${p.palette[0]}, ${p.palette[1]})`
  const thumbStyle = p.image
    ? {
        backgroundImage: `url(${p.image})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }
    : { background: grad }
  return (
    <div className="case-card">
      <div className="case-thumb" style={thumbStyle}>
        {!p.image && <div className="case-thumb-grid" />}
        {!p.image && (
          <div className="case-thumb-mark">{p.name.split(/[ .]/)[0].slice(0, 4)}</div>
        )}
      </div>
      <div className="case-body">
        <div className="case-tag">{p.tag}</div>
        <h3>{p.name}</h3>
        <p>{p.desc}</p>
        <div className="case-chips">
          {p.services.map((s) => (
            <span key={s} className="case-chip">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Portfolio() {
  return (
    <section id="reference" className="light light--tight">
      <div className="container">
        <Reveal className="section-head">
          <div className="eyebrow">
            <span className="num">03</span>
            <span className="dot" />
            Vybrané reference
          </div>
          <h2 className="h2">
            Projekty, na kterých <span className="accent">stavíme důvěru</span>
          </h2>
          <p className="lead-light">
            Pracujeme s českými i mezinárodními značkami. Od instalatérů po hotelové řetězce — pojítko je dlouhodobá
            spolupráce.
          </p>
        </Reveal>
        <div className="case-grid">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 60}>
              <CaseTile p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
