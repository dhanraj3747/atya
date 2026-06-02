'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

// AI-generated hero photos. Each rotates in the carousel below.
const photos = [
  { src: '/images/hero-1.png', alt: 'Atya logistics operations' },
  { src: '/images/hero-2.png', alt: 'Atya warehouse and fulfilment' },
  { src: '/images/hero-3.png', alt: 'Atya order handling and dispatch' },
]

const PHOTO_DURATION_MS = 7000
const CROSSFADE_MS = 1400

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % photos.length)
    }, PHOTO_DURATION_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-brand-navy">
      {/* Crossfading photo stack */}
      {photos.map((photo, i) => (
        <motion.div
          key={photo.src}
          initial={false}
          animate={{
            opacity: activeIndex === i ? 1 : 0,
            scale: activeIndex === i ? 1.04 : 1,
          }}
          transition={{
            opacity: { duration: CROSSFADE_MS / 1000, ease: 'easeInOut' },
            scale: { duration: PHOTO_DURATION_MS / 1000, ease: 'linear' },
          }}
          className="absolute inset-0"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="100vw"
            priority={i === 0}
            className="object-cover object-[72%_center] md:object-center"
          />
        </motion.div>
      ))}

      {/* Mobile gradient — bottom-heavy so the photo is visible at the top, text legible at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark via-brand-navy-dark/80 to-transparent md:hidden" />
      {/* Desktop gradient — left-heavy so text sits on the dark side, photo shows on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-dark via-brand-navy/85 to-brand-navy/30 hidden md:block" />
      {/* Subtle top/bottom vignette for both */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/40 via-transparent to-brand-navy-dark/30 md:from-brand-navy-dark/90 md:to-brand-navy-dark/40" />
      <div className="absolute -top-32 -right-32 w-[42rem] h-[42rem] bg-brand-orange/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Content — pushed to bottom on mobile so photo is visible at top */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-16 min-h-screen flex flex-col justify-end md:justify-center">
        <div className="max-w-2xl">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6 text-balance text-white"
          >
            Scale Your Brand.{' '}
            <span className="text-brand-orange-light">Skip the Chaos.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-lg md:text-xl text-white/80 max-w-xl mb-10 leading-relaxed"
          >
            End-to-end e-commerce fulfilment, warehousing, and HR solutions —
            so you can focus on what matters most: growing your brand.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <a
              href="#contact"
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-orange text-white font-body font-medium text-base hover:bg-brand-orange-dark transition-all duration-200 shadow-lg shadow-brand-orange/30"
            >
              Start Your Journey
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#ecommerce"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/30 text-white font-body font-medium text-base hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
            >
              Explore Services
            </a>
          </motion.div>
        </div>
      </div>

      {/* Pagination dots — bottom-right, click to jump between photos */}
      <div className="absolute bottom-10 right-8 z-10 hidden md:flex gap-2 items-center">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              activeIndex === i ? 'w-10 bg-brand-orange' : 'w-5 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Show photo ${i + 1} of ${photos.length}`}
          />
        ))}
      </div>

    </section>
  )
}
