'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

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

      {/* Lighting Masks & Overlay Vibe Layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark via-brand-navy-dark/85 to-transparent md:hidden" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-dark via-brand-navy/90 to-brand-navy/20 hidden md:block" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/50 via-transparent to-brand-navy-dark/40 md:from-brand-navy-dark/90 md:to-brand-navy-dark/40" />
      
      {/* Dynamic Ambient Blur Glow */}
      <div className="absolute -top-32 -right-32 w-[32rem] h-[32rem] md:w-[45rem] h-[45rem] bg-brand-cyan/10 rounded-full blur-[120px] md:blur-[160px] pointer-events-none" />

      {/* Main Content Area — Shifted up and centered flawlessly for mobile viewports */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 md:pt-36 pb-12 md:pb-20 min-h-screen flex flex-col justify-center">
        <div className="max-w-2xl lg:max-w-3xl">
          
          {/* Tagline Pre-header — Tightened spacing for improved mobile presentation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.0 }}
            className="inline-flex flex-col gap-1.5 mb-5 md:mb-7 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          >
            <span className="block font-body text-lg sm:text-xl md:text-xl font-black uppercase tracking-[0.1em] text-brand-cyan leading-tight">
              FROM WAREHOUSE TO WORKFORCE,
            </span>
            <span className="block font-body text-base sm:text-lg md:text-lg font-black md:font-semibold uppercase tracking-[0.08em] text-white md:text-white/70 leading-tight mt-0.5">
              WE ENABLE YOUR GROWTH!
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] sm:leading-[1.05] mb-5 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
          >
            Scale Your Brand.<br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-brand-blue-light via-brand-cyan to-white bg-clip-text text-transparent">
              Skip the Chaos.
            </span>
          </motion.h1>

          {/* Subheadline description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-base sm:text-lg md:text-xl text-white/90 md:text-white/85 max-w-xl mb-8 md:mb-10 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
          >
            End-to-end e-commerce fulfilment, warehousing, and HR solutions – 
            so you can focus on what matters most: growing your brand.
          </motion.p>

          {/* Responsive Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#contact"
              className="group flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-blue-dark to-brand-blue-light text-white font-body font-600 text-base shadow-lg shadow-brand-blue/30 hover:opacity-95 transition-all duration-200"
            >
              Start Your Journey
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#ecommerce"
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/25 text-white font-body font-500 text-base hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
            >
              Explore Services
            </a>
          </motion.div>
        </div>
      </div>

      {/* Pagination Dot Markers */}
      <div className="absolute bottom-10 right-8 z-10 hidden md:flex gap-2.5 items-center">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === i ? 'w-9 bg-brand-cyan' : 'w-4 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Show photo ${i + 1} of ${photos.length}`}
          />
        ))}
      </div>
    </section>
  )
}