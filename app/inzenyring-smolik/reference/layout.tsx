import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reference — Ing. Pavel Smolík",
  description:
    "Realizované zakázky: Hotel U Zvonu, Pivovarské muzeum, Stará varna Pilsner Urquell, bytové domy a další projekty v Plzni.",
}

export default function ReferenceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
