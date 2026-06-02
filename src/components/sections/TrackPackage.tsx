'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Search } from 'lucide-react'

export default function TrackPackage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [tracking, setTracking] = useState('')

  // Decorative — no real tracking integration yet. Wire to courier API later.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTracking('')
  }

  return (
    <section ref={ref} className="relative py-24 overflow-hidden bg-brand-navy">
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px]" />
      <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-brand-navy-light/30 rounded-full blur-[120px]" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-brand-orange" />
          <span className="text-brand-orange-light text-sm font-body tracking-widest uppercase font-medium">Track Your Package</span>
          <div className="w-8 h-px bg-brand-orange" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl md:text-4xl font-700 leading-tight mb-4 text-white"
        >
          Courier integration.{' '}
          <span className="text-brand-orange-light">Live shipment tracking.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-white/65 leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          We handle courier integration, scheduling pickups, tracking shipments, and returns processing — end to end.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={onSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto p-2 sm:p-1.5 sm:pl-2 rounded-full bg-white shadow-card"
        >
          <label htmlFor="tracking-id" className="sr-only">Tracking ID</label>
          <div className="flex-1 flex items-center gap-3 px-4">
            <Search size={18} className="text-brand-muted shrink-0" />
            <input
              id="tracking-id"
              type="text"
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              placeholder="Enter your tracking ID..."
              className="w-full bg-transparent py-3 font-body text-brand-navy text-sm placeholder-brand-muted/70 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-brand-orange text-white font-body font-medium text-sm hover:bg-brand-orange-dark transition-colors"
          >
            Track
          </button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-body text-white/40 text-xs mt-6"
        >
          Tracking portal integration coming soon. For now,{' '}
          <a href="#contact" className="text-brand-orange-light hover:text-brand-orange transition-colors">contact us directly</a>{' '}
          for shipment status.
        </motion.p>
      </div>
    </section>
  )
}
