import type { Metadata, Viewport } from 'next'
import { Manrope, Inter } from 'next/font/google'
import SmoothScroll from '@/components/ui/SmoothScroll'
import '../styles/globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Atya Ebiz Solutions LLP | E-Commerce & HR Solutions',
  description: 'End-to-end e-commerce fulfilment, warehousing, and HR solutions for brands that want to scale fast without the backend complexity.',
  keywords: 'ecommerce solutions, warehousing bangalore, HR recruitment, order fulfilment india, atya ebiz',
  openGraph: {
    title: 'Atya Ebiz Solutions LLP',
    description: 'Scale your brand with expert e-commerce operations and HR solutions.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#FAF8F4',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="noise-bg antialiased font-body text-brand-ink bg-brand-cream">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
