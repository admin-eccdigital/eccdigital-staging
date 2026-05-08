import type React from "react"
import type { Metadata } from "next"
import "./smolik.css"

export const metadata: Metadata = {
  title: "Ing. Pavel Smolík — Kompletní stavební inženýring",
  description:
    "Autorizovaný inženýr ČKAIT. Inženýrská činnost, stavební dozor, projektová příprava a konzultace. Plzeň a Plzeňský kraj.",
  icons: {
    icon: "/eccdigital-staging/inzenyring-smolik/favicon.svg",
  },
}

export default function SmolikLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  )
}
