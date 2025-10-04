import type { Metadata } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-base'
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-tech'
})

export const metadata: Metadata = {
  title: 'TradGen - Quantum Trading Technology',
  description: 'Neural networks reinventing financial markets',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="bg-deep-space text-white font-base">
        {children}
      </body>
    </html>
  )
}
