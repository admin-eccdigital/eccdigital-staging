"use client"

import { Button } from "@/components/ui/button"
import RotatingText from "./RotatingText"

const ArrowRight = () => (
  <svg
    className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-hero">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 mt-12 animate-fade-in-badge">
          <span className="w-2 h-2 bg-white/60 rounded-full mr-2 animate-pulse"></span>
          Digitální agentura
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 animate-fade-in-heading">
          <span className="text-foreground">Pomáháme firmám</span>
          <br />
          <span className="text-foreground">v digitálním růstu</span>
        </h1>

        {/* Animated Rotating Text */}
        <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in-heading">
          <RotatingText
            texts={["Educate", "Create", "Care"]}
            mainClassName="px-3 sm:px-4 md:px-5 bg-white text-black overflow-hidden py-2 sm:py-2 md:py-3 justify-center rounded-lg shadow-lg text-2xl sm:text-3xl md:text-4xl font-bold"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-1 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Digital</span>
        </div>

        {/* Subheading */}
        <p className="text-base sm:text-xl md:text-2xl text-white text-balance max-w-sm sm:max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0 animate-fade-in-subheading font-light">
          Poskytujeme know-how a kompletní správu digitálního marketingu — od reklamy na sociálních sítích přes
          vyhledávače až po tvorbu webů a e-shopů.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 sm:mb-16 animate-fade-in-buttons">
          <Button
            size="lg"
            className="bg-white text-black rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-gray-50 hover:scale-105 hover:shadow-lg group cursor-pointer relative overflow-hidden"
            onClick={() => {
              const el = document.querySelector("#kontakt")
              if (el) el.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Začněme spolupracovat
            <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  )
}
