'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'

type ClientItem =
  | { type: 'logo'; name: string; logo: string; darkTile?: boolean }
  | { type: 'text'; name: string }

const clients: ClientItem[] = [
  { type: 'logo', name: 'Apollo', logo: '/images/Apollologo.png' },
  { type: 'logo', name: 'Iron Asylum', logo: '/images/Iron_Asylum_Logo__Gold_Silver-cropped_016e74d4-998f-4d04-a234-0e36ee073be1.svg' },
  { type: 'logo', name: 'Maxelon', logo: '/images/Maxelon-logo-2048x727.png', darkTile: true },
  { type: 'logo', name: 'Startek Aegis BPO', logo: '/images/clients/startek.png' },
  { type: 'logo', name: 'Grihveda', logo: '/images/Grihveda.jpeg' },
]

export default function Clients() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  
  // Track which item index is currently being hovered
  const [hoveredIdx, setHoveredIdx] = useState<string | null>(null)

  return (
    <section id="clients" ref={ref} className="relative pt-28 pb-20 overflow-hidden bg-brand-cream">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Eyebrow — Restored the decorative accent line and set to match Screenshot 2026-06-05 144759_3.png */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-brand-blue" />
          <span className="text-brand-blue text-xs md:text-sm font-body tracking-widest uppercase font-600">
            Our Esteemed Clients
          </span>
        </motion.div>

        {/* Headline — Splitting "leading brands" into Royal Blue and Sky Blue tokens */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-700 leading-tight mb-6 max-w-2xl text-brand-navy"
        >
          Trusted by{' '}
          <span className="text-brand-blue">leading </span>
          <span className="text-brand-sky">brands</span>{' '}
          across India.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-brand-muted leading-relaxed mb-12 max-w-3xl"
        >
          At Atya Ebiz Solutions LLP, we take pride in partnering with leading brands and organizations across
          warehousing operations, order fulfillment, logistics support, and business process services. Our
          commitment to operational excellence, timely execution, and customer-centric solutions has enabled us
          to build trusted long-term relationships with our clients.<br/><br/>

          Our services are designed to support growing businesses with efficient warehousing, inventory management, fulfillment operations, manpower support, and streamlined backend processes tailored to their operational requirements. With a focus on reliability, scalability, and process-driven execution, we continue to strengthen our presence as a dependable business solutions partner.
        </motion.p>
      </div>

      {/* Marquee strip — full width, no cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative overflow-hidden py-8 border-y border-brand-line bg-white"
      >
        {/* Fade edges so logos scroll cleanly in/out */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Added parent group to handle general strip interactions */}
        <div className="flex animate-marquee group/marquee" style={{ width: 'max-content' }}>
          {[0, 1].map((dup) =>
            clients.map((item, i) => {
              const uniqueId = `${dup}-${i}`
              const isAnyHovered = hoveredIdx !== null
              const isThisHovered = hoveredIdx === uniqueId

              return (
                <div
                  key={uniqueId}
                  className="shrink-0 w-44 h-20 mx-6 flex items-center justify-center"
                  onMouseEnter={() => setHoveredIdx(uniqueId)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {item.type === 'logo' ? (
                    <div
                      className={`relative w-full h-full transition-all duration-300 ease-out cursor-pointer ${
                        item.darkTile ? 'bg-brand-navy rounded-md px-3 py-2' : ''
                      }`}
                      style={{
                        transform: isThisHovered ? 'scale(1.06)' : 'scale(1)',
                        opacity: isThisHovered ? 1 : isAnyHovered ? 0.4 : 1,
                      }}
                    >
                      <Image src={item.logo} alt={item.name} fill style={{ objectFit: 'contain' }} sizes="176px" />
                    </div>
                  ) : (
                    <span 
                      className="font-display text-2xl font-700 text-brand-navy transition-all duration-300 ease-out cursor-pointer tracking-wide"
                      style={{
                        transform: isThisHovered ? 'scale(1.06)' : 'scale(1)',
                        opacity: isThisHovered ? 1 : isAnyHovered ? 0.4 : 1,
                      }}
                    >
                      {item.name}
                    </span>
                  )}
                </div>
              )
            })
          )}
        </div>
      </motion.div>
    </section>
  )
}