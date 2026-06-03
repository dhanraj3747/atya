'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Handshake } from 'lucide-react'

export default function Commitment() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="commitment" ref={ref} className="relative py-32 overflow-hidden bg-brand-navy">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-brand-orange/10 rounded-full blur-[140px]" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex w-14 h-14 rounded-2xl bg-brand-orange/20 border border-brand-orange/40 items-center justify-center mb-8"
        >
          <Handshake size={24} className="text-brand-orange-light" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-brand-orange" />
          <span className="text-brand-orange-light text-sm font-body tracking-widest uppercase font-medium">Our Commitment</span>
          <div className="w-8 h-px bg-brand-orange" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-3xl md:text-4xl font-700 leading-tight mb-8 text-balance text-white"
        >
          More than a service provider {' '}
          <span className="text-brand-orange-light">a reliable business partner.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-body text-white/75 text-lg leading-relaxed max-w-2xl mx-auto"
        >
          We believe efficient backend operations are the foundation for your success.
          By aligning with our clients&rsquo; growth goals, we ensure flexibility, transparency,
          and professionalism at every step.
        </motion.p>
      </div>
    </section>
  )
}
