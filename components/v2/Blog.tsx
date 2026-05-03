"use client"
import { useEffect, useMemo, useState } from "react"
import { ArrowRight, ClockIcon, Reveal } from "./shared"

type Post = {
  slug: string
  cat: string
  date: string
  read: string
  title: string
  desc: string
  palette: [string, string]
  image: string
}

const POSTS: Post[] = [
  {
    slug: "claude-v-pcc-reportingu",
    cat: "AI",
    date: "28. 4. 2026",
    read: "6 min",
    title: "Jak používáme Claude v každodenním PPC reportingu",
    desc: "Konkrétní use-case: od přípravy zadání pro klienta po automatickou analýzu výkonu kampaní napříč platformami.",
    palette: ["oklch(0.66 0.18 320)", "oklch(0.78 0.14 290)"],
    image: "/eccdigital-staging/images/blog/claude-ppc-reporting.webp",
  },
  {
    slug: "audit-jako-prvni-krok",
    cat: "Strategie",
    date: "14. 4. 2026",
    read: "8 min",
    title: "Audit jako první krok. Proč nikdy nezačínáme reklamou.",
    desc: "Než zapneme kampaně, vždy se nejprve díváme na data, web a celý zákaznický cyklus. Vysvětlujeme proč.",
    palette: ["oklch(0.70 0.16 145)", "oklch(0.82 0.12 130)"],
    image: "/eccdigital-staging/images/blog/audit-prvni-krok.webp",
  },
  {
    slug: "klimahome-pripadovka",
    cat: "Případovka",
    date: "2. 4. 2026",
    read: "5 min",
    title: "Klimahome — od nuly k stabilnímu přílivu poptávek",
    desc: "Jak jsme za rok postavili web, výkonnostní strategii a vyladili příliv poptávek pro instalátora tepelných čerpadel.",
    palette: ["oklch(0.72 0.14 230)", "oklch(0.85 0.10 200)"],
    image: "/eccdigital-staging/images/blog/klimahome-pripadovka.webp",
  },
]

function BlogCard({ p }: { p: Post }) {
  const grad = `linear-gradient(135deg, ${p.palette[0]}, ${p.palette[1]})`
  return (
    <a className="blog-card" href={`/eccdigital-staging/blog/article/?slug=${p.slug}`}>
      <div
        className="blog-thumb"
        style={{
          backgroundImage: `url(${p.image}), ${grad}`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <span className="blog-cat">{p.cat}</span>
      </div>
      <div className="blog-body">
        <div className="blog-meta">
          <span>{p.date}</span>
          <span className="dot-sep" />
          <span>{p.read} čtení</span>
        </div>
        <h3>{p.title}</h3>
        <p>{p.desc}</p>
        <div className="blog-arrow">
          Přečíst článek <ArrowRight size={14} />
        </div>
      </div>
    </a>
  )
}

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now())
  const d = Math.floor(ms / 86400000)
  const h = Math.floor((ms % 86400000) / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return { d, h, m, s }
}

function useCountdown(target: Date) {
  const [t, setT] = useState(() => diff(target))
  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])
  return t
}

export function Blog() {
  const target = useMemo(() => {
    const d = new Date()
    return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59)
  }, [])
  const { d, h, m, s } = useCountdown(target)
  return (
    <section id="blog" className="light light--tight blog-sec">
      <div className="container">
        <div className="blog-head">
          <Reveal>
            <div>
              <div className="eyebrow">
                <span className="num">05</span>
                <span className="dot" />
                Blog &amp; novinky
              </div>
              <h2 className="h2">
                Co u nás <span className="accent">právě řešíme</span>
              </h2>
              <p className="lead-light">
                Případovky, postupy a praktické zkušenosti z agenturní praxe — bez marketingových frází.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="blog-offer">
              <div className="bo-tag">
                <ClockIcon size={14} /> Časově omezená nabídka
              </div>
              <div className="bo-title">
                Audit digitálního marketingu <span>zdarma</span>
              </div>
              <div className="bo-desc">Pro nové klienty do konce měsíce. Bez závazku, výstup do 10 dní.</div>
              <div className="bo-countdown">
                <div className="bo-cell">
                  <div className="bo-num">{String(d).padStart(2, "0")}</div>
                  <div className="bo-lbl">dnů</div>
                </div>
                <div className="bo-cell">
                  <div className="bo-num">{String(h).padStart(2, "0")}</div>
                  <div className="bo-lbl">hodin</div>
                </div>
                <div className="bo-cell">
                  <div className="bo-num">{String(m).padStart(2, "0")}</div>
                  <div className="bo-lbl">minut</div>
                </div>
                <div className="bo-cell">
                  <div className="bo-num">{String(s).padStart(2, "0")}</div>
                  <div className="bo-lbl">sekund</div>
                </div>
              </div>
              <a href="#" data-lead="audit" className="bo-cta">
                Chci audit zdarma <ArrowRight size={16} />
              </a>
            </div>
          </Reveal>
        </div>
        <div className="blog-grid">
          {POSTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <BlogCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
