'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

type ClientItem =
  | { type: 'logo'; name: string; logo: string; darkTile?: boolean }
  | { type: 'text'; name: string }

const clients: ClientItem[] = [
  { type: 'logo', name: 'Apollo', logo: '/images/Apollologo.png' },
  { type: 'logo', name: 'Iron Asylum', logo: '/images/Iron_Asylum_Logo__Gold_Silver-cropped_016e74d4-998f-4d04-a234-0e36ee073be1.svg' },
  { type: 'logo', name: 'Maxelon', logo: '/images/Maxelon-logo-2048x727.png', darkTile: true },
  { type: 'logo', name: 'Startek Aegis BPO', logo: '/images/clients/startek.png' },
  { type: 'text', name: 'Grihveda' },
]

export default function Clients() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="clients" ref={ref} className="relative pt-28 pb-20 overflow-hidden bg-brand-cream">
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-brand-orange" />
          <span className="text-brand-orange text-sm font-body tracking-widest uppercase font-medium">Our Esteemed Clients</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-700 leading-tight mb-6 max-w-2xl text-brand-navy"
        >
          Trusted by{' '}
          <span className="text-brand-orange">reputed brands</span>{' '}
          across India.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-brand-muted leading-relaxed mb-12 max-w-3xl"
        >
          At Atya Ebiz Solutions LLP, we take pride in partnering with reputed brands and organizations across
          warehousing operations, order fulfillment, logistics support, and business process services. Our
          commitment to operational excellence, timely execution, and customer-centric solutions has enabled us
          to build trusted long-term relationships with our clients.
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

        <div className="flex animate-marquee" style={{ width: 'max-content' }}>
          {[0, 1].map((dup) =>
            clients.map((item, i) => (
              <div
                key={`${dup}-${i}`}
                className="shrink-0 w-44 h-20 mx-6 flex items-center justify-center group"
              >
                {item.type === 'logo' ? (
                  <div
                    className={`relative w-full h-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition ${
                      item.darkTile ? 'bg-brand-navy rounded-md px-3 py-2' : ''
                    }`}
                  >
                    <Image src={item.logo} alt={item.name} fill style={{ objectFit: 'contain' }} sizes="176px" />
                  </div>
                ) : (
                  <span className="font-display text-2xl font-700 text-brand-navy/60 tracking-wide group-hover:text-brand-navy transition">
                    {item.name}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </motion.div>

    </section>
  )
}
