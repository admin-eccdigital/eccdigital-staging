import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Nav } from "@/components/v2/Nav"
import { Footer } from "@/components/v2/Footer"
import { LeadModal } from "@/components/v2/LeadModal"
import { FloatingActions } from "@/components/v2/FloatingActions"
import { CookieBar } from "@/components/v2/CookieBar"
import { ArrowRight } from "@/components/v2/shared"
import { BlogCard } from "@/components/v2/Blog"
import {
  getAllPosts,
  getPostBySlug,
  formatCzechDate,
  BASE_PATH,
} from "@/lib/blog"

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: "Článek nenalezen — ECC Digital" }
  return {
    title: `${post.title} — ECC Digital`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: post.imageUrl ? [{ url: post.imageUrl }] : undefined,
    },
  }
}

const AUTHOR_PHOTOS: Record<string, string> = {
  "Petr Štěpán": `${BASE_PATH}/images/team/petr-stepan-circle.webp`,
}

export default async function BlogArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  const all = await getAllPosts()
  const sameCat = all.filter(
    (p) => p.slug !== post.slug && p.category === post.category,
  )
  const others = all.filter((p) => p.slug !== post.slug)
  const related = (sameCat.length >= 1 ? sameCat : others).slice(0, 3)

  const authorPhoto = post.author ? AUTHOR_PHOTOS[post.author.name] : undefined

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: post.imageUrl,
    author: post.author
      ? { "@type": "Person", name: post.author.name }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "ECC Digital",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.url,
    },
  }

  return (
    <>
      <div className="bg-aurora">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
        <div className="blob b4" />
      </div>
      <Nav />
      <main className="blog-article-page">
        <article>
          <header className="article-hero">
            <div className="container article-hero-inner">
              <a className="article-back" href={`${BASE_PATH}/blog/`}>
                ← Zpět na blog
              </a>
              <div className="article-cat">{post.category}</div>
              <h1 className="article-title">{post.title}</h1>
              <div className="article-meta">
                {post.author ? (
                  <span className="article-author">
                    {authorPhoto ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        className="article-author-photo"
                        src={authorPhoto}
                        alt={post.author.name}
                        width={36}
                        height={36}
                      />
                    ) : null}
                    <span>
                      <strong>{post.author.name}</strong>
                      {post.author.title ? (
                        <span className="article-author-title">
                          {post.author.title}
                        </span>
                      ) : null}
                    </span>
                  </span>
                ) : null}
                <span className="dot-sep" />
                <span>{formatCzechDate(post.date)}</span>
                <span className="dot-sep" />
                <span>{post.readingMinutes} min čtení</span>
              </div>
            </div>
          </header>

          {post.imageUrl ? (
            <div className="article-image-wrap">
              <div className="container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="article-image"
                  src={post.imageUrl}
                  alt={post.title}
                />
              </div>
            </div>
          ) : null}

          <div className="container">
            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </div>
        </article>

        {related.length > 0 ? (
          <section className="light light--tight blog-related">
            <div className="container">
              <h2 className="h2">
                Související <span className="accent">články</span>
              </h2>
              <div className="blog-grid">
                {related.map((p) => (
                  <BlogCard key={p.slug} p={p} />
                ))}
              </div>
              <div className="blog-viewall">
                <a className="blog-viewall-link" href={`${BASE_PATH}/blog/`}>
                  Zobrazit všechny články <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
      <LeadModal />
      <FloatingActions />
      <CookieBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
