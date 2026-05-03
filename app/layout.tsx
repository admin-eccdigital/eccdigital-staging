import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { StructuredData } from "@/components/v2/StructuredData"
import "./globals.css"
import "./styles/colors_and_type.css"
import "./styles/homepage.css"
import "./styles/v2-extras.css"
import "./styles/lead-modal.css"

export const metadata: Metadata = {
  title: "ECC Digital — Strategický partner pro digitální projekty",
  description:
    "Česká digitální agentura. Správa Meta, Google Ads, Sklik, srovnávačů. Tvorba webů a e-shopů.",
  icons: {
    icon: "/eccdigital-staging/images/favicon-light.png",
  },
}

const accentRootStyle = `
:root {
  --accent: oklch(0.72 0.18 30);
  --accent-2: oklch(0.78 0.15 50);
  --accent-soft: oklch(0.95 0.04 45);
  --accent-soft-bd: oklch(0.88 0.08 40);
  --accent-text: oklch(0.45 0.15 30);
  --accent-intensity: 1;
  --hero-h1-weight: 700;
}
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="cs" className={`dark ${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: accentRootStyle }} />
        <StructuredData />
      </head>
      <body>{children}</body>
    </html>
  )
}
