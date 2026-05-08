import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Služby — Ing. Pavel Smolík",
  description:
    "Projekční činnost, inženýrská činnost, koordinátor BOZP a provádění staveb. Kompletní stavební inženýring v Plzni.",
}

export default function SluzbyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
