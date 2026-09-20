import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playfair_Display, Caveat, Space_Grotesk, Newsreader } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { getSiteUrl } from '@/lib/site-url'
import './globals.css'

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const atlasPlayfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-atlas-playfair",
  display: "swap",
});

const atlasCaveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-atlas-caveat",
  display: "swap",
});

const atlasGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-atlas-grotesk",
  display: "swap",
});

const atlasNewsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-atlas-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: 'Wander — Explore the world beyond the obvious',
    template: '%s — Wander',
  },
  description: 'Interactive 3D globe travel discovery. Explore destinations worldwide with immersive visuals and detailed insights.',
  metadataBase: new URL(getSiteUrl()),
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`bg-atlas-bg ${geist.variable} ${geistMono.variable} ${atlasPlayfair.variable} ${atlasCaveat.variable} ${atlasGrotesk.variable} ${atlasNewsreader.variable}`}
    >
      <body className="font-sans antialiased bg-atlas-bg">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
