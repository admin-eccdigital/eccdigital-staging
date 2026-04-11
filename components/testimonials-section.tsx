"use client"

import { useEffect, useRef } from "react"
import { TestimonialsColumn } from "@/components/ui/testimonials-column"

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element")
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add("animate-fade-in-up")
              }, index * 300)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const testimonials = [
    {
      text: "Díky ECC Digital se nám podařilo zvýšit obrat e-shopu o 40 % za první čtvrtletí spolupráce. Kampaně na Googlu i Facebooku fungují skvěle.",
      name: "Jan Novák",
      role: "Majitel e-shopu",
    },
    {
      text: "Konečně máme přehled o tom, kam jdou naše peníze za reklamu. Reporty jsou jasné a výsledky mluví samy za sebe.",
      name: "Petra Dvořáková",
      role: "Marketing manažerka",
    },
    {
      text: "Nový web od ECC Digital předčil naše očekávání. Rychlý, moderní a zákazníci se v něm snadno orientují.",
      name: "Martin Svoboda",
      role: "Jednatel společnosti",
    },
    {
      text: "Spolupráce na správě srovnávačů nám přinesla výrazné navýšení konverzí z Heureky i Zboží.cz. Doporučuji.",
      name: "Lucie Králová",
      role: "Provozní ředitelka",
    },
    {
      text: "Oceňuji osobní přístup a rychlou komunikaci. Vždy mají řešení a reagují prakticky okamžitě.",
      name: "Tomáš Procházka",
      role: "Majitel firmy",
    },
    {
      text: "Po přechodu ke správě kampaní od ECC Digital jsme snížili náklady na akvizici zákazníka o třetinu.",
      name: "Kateřina Veselá",
      role: "E-commerce specialistka",
    },
  ]

  return (
    <section id="reference" ref={sectionRef} className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-32">
          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out inline-flex items-center gap-2 text-white/60 text-sm font-medium tracking-wider uppercase mb-6">
            <div className="w-8 h-px bg-white/30"></div>
            Reference
            <div className="w-8 h-px bg-white/30"></div>
          </div>
          <h2 className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight text-balance">
            Co říkají naši <span className="font-medium italic">klienti</span>
          </h2>
          <p className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Přečtěte si, jak pomáháme firmám růst v digitálním světě
          </p>
        </div>

        <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out relative flex justify-center items-center min-h-[600px] md:min-h-[800px] overflow-hidden">
          <div
            className="flex gap-8 max-w-6xl"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            <TestimonialsColumn testimonials={testimonials.slice(0, 3)} duration={15} className="flex-1" />
            <TestimonialsColumn
              testimonials={testimonials.slice(2, 5)}
              duration={12}
              className="flex-1 hidden md:block"
            />
            <TestimonialsColumn
              testimonials={testimonials.slice(1, 4)}
              duration={18}
              className="flex-1 hidden lg:block"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
