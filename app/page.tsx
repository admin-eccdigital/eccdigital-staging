import { Nav } from "@/components/v2/Nav"
import { Hero } from "@/components/v2/Hero"
import { About } from "@/components/v2/About"
import { Services } from "@/components/v2/Services"
import { Portfolio } from "@/components/v2/Portfolio"
import { ToolsCanvas } from "@/components/v2/ToolsCanvas"
import { Blog } from "@/components/v2/Blog"
import { CTA } from "@/components/v2/CTA"
import { Footer } from "@/components/v2/Footer"
import { LeadModal } from "@/components/v2/LeadModal"

export default function HomePage() {
  return (
    <>
      <div className="bg-aurora">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
        <div className="blob b4" />
      </div>
      <Nav />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <ToolsCanvas />
      <Blog />
      <CTA />
      <Footer />
      <LeadModal />
    </>
  )
}
