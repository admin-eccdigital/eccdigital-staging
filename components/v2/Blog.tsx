import { ArrowRight, Reveal } from "./shared"
import { BlogOffer } from "./BlogOffer"
import { getAllPosts, formatCzechDate, type Post } from "@/lib/blog"

export function BlogCard({ p }: { p: Post }) {
  return (
    <a className="blog-card" href={p.url}>
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
  )
}

export async function Blog() {
  const posts = (await getAllPosts()).slice(0, 3)
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
            <BlogOffer />
          </Reveal>
        </div>
        <div className="blog-grid">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <BlogCard p={p} />
            </Reveal>
          ))}
        </div>
        <div className="blog-viewall">
          <a className="blog-viewall-link" href="/eccdigital-staging/blog/">
            Zobrazit všechny články <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
