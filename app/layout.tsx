import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sri Hanuman Mandir Thatpally | Donate for Temple Reconstruction",
  description:
    "Support the sacred reconstruction of Sri Hanuman Mandir in Thatpally village. Your generous donations help preserve our spiritual heritage.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/15.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/15.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico", // ✅ REQUIRED FOR BROWSER DETECTION
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}

