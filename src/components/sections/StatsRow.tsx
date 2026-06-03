'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Warehouse, Package, Truck, Users } from 'lucide-react'
import ShuffleText from '@/components/ui/ShuffleText'

const stats = [
  {
    icon: Warehouse,
    value: '2+',
    label: 'Warehouse Hubs',
    description: 'Strategically located in Bengaluru and Gurugram',
  },
  {
    icon: Package,
    value: 'FIFO',
    label: 'Inventory Method',
    description: 'FIFO-driven inventory management',
  },
  {
    icon: Truck,
    value: 'Pan-India',
    label: 'Dispatch Reach',
    description: 'Fast and reliable delivery across 29,000+ pin codes',
  },
  {
    icon: Users,
    value: '5+',
    label: 'Active Clients',
    description: 'Trusted by growing brands across India',
  },
]

export default function StatsRow() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-16 overflow-hidden bg-brand-cream border-y border-brand-line">
      {/* Subtle dot-grid backdrop — adds visual texture behind the stats */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(rgba(15, 23, 42, 0.08) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          maskImage:
            'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 75%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:divide-x divide-brand-line">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center px-6 py-4"
              >
                <Icon className="w-10 h-10 mx-auto mb-4 text-brand-orange" strokeWidth={1.5} />
                <div className="font-display text-3xl md:text-4xl font-extrabold text-brand-navy mb-2">
                  <ShuffleText value={stat.value} delay={300 + i * 120} duration={600} />
                </div>
                <div className="w-8 h-px bg-brand-orange mx-auto mb-2" />
                <div className="font-body text-xs text-brand-muted tracking-widest uppercase font-semibold mb-2">
                  {stat.label}
                </div>
                <p className="font-body text-sm text-brand-muted leading-snug max-w-[14rem] mx-auto">
                  {stat.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
