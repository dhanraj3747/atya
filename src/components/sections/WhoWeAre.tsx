'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const photos = [
  { src: '/images/warehouse-1.jpg', alt: 'Atya warehouse — inventory and storage' },
  { src: '/images/warehouse-2.jpg', alt: 'Atya warehouse — picking and packing' },
  { src: '/images/warehouse-3.jpg', alt: 'Atya warehouse — dispatch operations' },
  { src: '/images/Gurugram.jpeg', alt: 'Atya warehouse — Gurugram' },
]

const ROTATION_MS = 5000
const CROSSFADE_MS = 900

export default function WhoWeAre() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % photos.length)
    }, ROTATION_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="about" ref={ref} className="relative py-32 overflow-hidden bg-brand-cream">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section label — Swapped old orange for a crisp brand blue accent line */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-[2px] bg-brand-blue" />
          <span className="text-brand-blue text-sm font-body tracking-widest uppercase font-bold">
            Who We Are
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Content Text Area */}
          <div>
            {/* Headline — Swapped broken orange with a beautiful royal blue to electric cyan text gradient */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-brand-navy"
            >
              Your dedicated{' '}
              <span className="bg-gradient-to-r from-brand-blue via-brand-blue-light to-brand-cyan bg-clip-text text-transparent">
                back-end partner
              </span>{' '}
              for scaling brands.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-brand-muted text-lg leading-relaxed mb-6"
            >
              Atya Ebiz Solutions LLP is a specialized partner for e-commerce sellers and brands 
              offering end-to-end support from online onboarding to warehousing, inventory management, 
              order fulfilment, and logistics coordination. 
              We also provide strategic HR and recruitment services for growing organizations.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-body text-brand-muted leading-relaxed"
            >
              We act as a reliable backend operations arm so brands can avoid the complexity of 
              managing warehousing, inventory, dispatch, and marketplace compliance and focus 
              on product, marketing, and growth.
            </motion.p>
          </div>

          {/* Right Side: Auto-rotating warehouse photo stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-brand-line shadow-card bg-brand-navy/5"
          >
            {photos.map((photo, i) => (
              <motion.div
                key={photo.src}
                initial={false}
                animate={{ opacity: activeIndex === i ? 1 : 0 }}
                transition={{ duration: CROSSFADE_MS / 1000, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }} // Changed from 'contain' to fill out the beautiful container safely
                  priority={i === 0}
                />
              </motion.div>
            ))}

            {/* Pagination dot markers — Swapped orange for your signature logo colorway */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2.5 items-center bg-brand-navy/40 backdrop-blur-md px-3.5 py-2 rounded-full">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === i 
                      ? 'w-7 bg-brand-cyan' 
                      : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Show warehouse photo ${i + 1} of ${photos.length}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}