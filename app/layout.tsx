import type React from "react"
import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "MeuPetDoc - RG Exclusivo para Seu Pet",
  description: "Crie um RG exclusivo para seu pet em menos de 1 minuto! Documento personalizado e único.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={nunito.className}>{children}</body>
    </html>
  )
}
