import type { Metadata } from "next"
import { Nav } from "@/components/v2/Nav"
import { Footer } from "@/components/v2/Footer"
import { LeadModal } from "@/components/v2/LeadModal"
import { FloatingActions } from "@/components/v2/FloatingActions"
import { CookieBar } from "@/components/v2/CookieBar"
import { BlogFilter } from "@/components/v2/BlogFilter"
import { getAllPosts, getCategories } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog — ECC Digital",
  description:
    "Případovky, postupy a praktické zkušenosti z agenturní praxe. Strategie, AI v marketingu a reálné výsledky bez marketingových frází.",
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts()
  const categories = await getCategories()
  return (
    <>
      <div className="bg-aurora">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
        <div className="blob b4" />
      </div>
      <Nav />
      <main className="blog-listing-page">
        <section className="light light--tight">
          <div className="container">
            <header className="blog-listing-head">
              <div className="eyebrow">
                <span className="num">·</span>
                <span className="dot" />
                Blog · novinky
              </div>
              <h1 className="h2">
                Co u nás <span className="accent">právě řešíme</span>
              </h1>
              <p className="lead-light">
                Případovky, postupy a praktické zkušenosti z agenturní praxe — bez marketingových frází.
              </p>
            </header>
            <BlogFilter posts={posts} categories={categories} />
          </div>
        </section>
      </main>
      <Footer />
      <LeadModal />
      <FloatingActions />
      <CookieBar />
    </>
  )
}
