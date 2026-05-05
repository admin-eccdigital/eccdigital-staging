"use client"
import { useMemo, useState } from "react"
import { ArrowRight } from "./shared"
import { type Post } from "@/lib/blog"

function formatCzechDate(iso: string): string {
  if (!iso) return ""
  const [y, m, d] = iso.split("-")
  if (!y || !m || !d) return iso
  return `${parseInt(d, 10)}. ${parseInt(m, 10)}. ${y}`
}

export function BlogFilter({ posts, categories }: { posts: Post[]; categories: string[] }) {
  const [active, setActive] = useState<string>("Vše")
  const all = useMemo(() => ["Vše", ...categories], [categories])
  const filtered = active === "Vše" ? posts : posts.filter((p) => p.category === active)
  return (
    <>
      <div className="blog-filter-row" role="tablist" aria-label="Kategorie">
        {all.map((c) => (
          <button
            key={c}
            type="button"
            className={`blog-filter-pill${active === c ? " is-active" : ""}`}
            onClick={() => setActive(c)}
            aria-pressed={active === c}
          >
            {c}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="blog-empty">Pro vybranou kategorii zatím nemáme žádné články.</div>
      ) : (
        <div className="blog-grid">
          {filtered.map((p) => (
            <a key={p.slug} className="blog-card" href={p.url}>
              <div
                className="blog-thumb"
                style={{
                  backgroundImage: `url(${p.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <span className="blog-cat">{p.category}</span>
              </div>
              <div className="blog-body">
                <div className="blog-meta">
                  <span>{formatCzechDate(p.date)}</span>
                  <span className="dot-sep" />
                  <span>{p.readingMinutes} min čtení</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <div className="blog-arrow">
                  Přečíst článek <ArrowRight size={14} />
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </>
  )
}
