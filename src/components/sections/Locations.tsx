'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import DottedMap from 'dotted-map'

// Two layered dotted maps with the same region + height so their coordinate systems
// align: surrounding countries as faint context, India rendered prominently on top.
const MAP_OPTIONS = {
  height: 50,
  grid: 'diagonal' as const,
  region: { lat: { min: 6, max: 37 }, lng: { min: 62, max: 98 } },
}

const contextMap = new DottedMap({
  ...MAP_OPTIONS,
  countries: ['PAK', 'AFG', 'NPL', 'BTN', 'BGD', 'LKA', 'MMR', 'THA'],
})

const indiaMap = new DottedMap({
  ...MAP_OPTIONS,
  countries: ['IND'],
})

const contextSvg = contextMap.getSVG({
  radius: 0.26,
  color: '#0B1B2B',
  shape: 'circle',
  backgroundColor: 'transparent',
})

const indiaSvg = indiaMap.getSVG({
  radius: 0.28,
  color: '#0B1B2B',
  shape: 'circle',
  backgroundColor: 'transparent',
})

const { width: MAP_W, height: MAP_H } = indiaMap.image

type City = {
  lat: number
  lng: number
  label: string
  hub?: boolean
  role?: string
  address?: string
}

const cities: Record<string, City> = {
  bengaluru: {
    lat: 12.9716,
    lng: 77.5946,
    label: 'Bengaluru',
    hub: true,
    role: 'Registered Office',
    address: 'Survey No. 133/2, V Begur Hobli, Mylasandra, Begur, Bengaluru South, Bengaluru, Karnataka, India, 560068',
  },
  gurugram: {
    lat: 28.4595,
    lng: 77.0266,
    label: 'Gurugram',
    hub: true,
    role: 'North India Hub',
    address: 'Khewat No. 424, Mustil No. 13, Killa No. 22/2, Village Kankrola, PO Bhangrola, Gurugram, Haryana, India, 122505',
  },
  mumbai: { lat: 19.076, lng: 72.8777, label: 'Mumbai' },
  delhi: { lat: 28.7041, lng: 77.1025, label: 'Delhi' },
  chennai: { lat: 13.0827, lng: 80.2707, label: 'Chennai' },
  kolkata: { lat: 22.5726, lng: 88.3639, label: 'Kolkata' },
  hyderabad: { lat: 17.385, lng: 78.4867, label: 'Hyderabad' },
  pune: { lat: 18.5204, lng: 73.8567, label: 'Pune' },
  ahmedabad: { lat: 23.0225, lng: 72.5714, label: 'Ahmedabad' },
}

type Position = City & { key: string; x: number; y: number }

const positions: Record<string, Position> = Object.fromEntries(
  Object.entries(cities).map(([key, c]) => {
    const pin = indiaMap.getPin({ lat: c.lat, lng: c.lng })
    return [key, { ...c, key, x: pin?.x ?? 0, y: pin?.y ?? 0 }]
  })
)

const arcs: Array<{ from: keyof typeof positions; to: keyof typeof positions }> = [
  { from: 'gurugram', to: 'delhi' },
  { from: 'gurugram', to: 'ahmedabad' },
  { from: 'gurugram', to: 'kolkata' },
  { from: 'gurugram', to: 'bengaluru' },
  { from: 'bengaluru', to: 'mumbai' },
  { from: 'bengaluru', to: 'pune' },
  { from: 'bengaluru', to: 'hyderabad' },
  { from: 'bengaluru', to: 'chennai' },
]

const curvedPath = (a: Position, b: Position) => {
  const midX = (a.x + b.x) / 2
  const dx = b.x - a.x
  const dy = b.y - a.y
  const dist = Math.sqrt(dx * dx + dy * dy)
  const midY = Math.min(a.y, b.y) - dist * 0.35
  return `M ${a.x},${a.y} Q ${midX},${midY} ${b.x},${b.y}`
}

const contextDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(contextSvg)}`
const indiaDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(indiaSvg)}`

const MAX_MAP_HEIGHT = 460
const MAX_MAP_WIDTH = Math.round((MAX_MAP_HEIGHT * MAP_W) / MAP_H)

export default function Locations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeHub, setActiveHub] = useState<string | null>(null)

  const hubs = Object.values(positions).filter((p) => p.hub)
  const destinations = Object.values(positions).filter((p) => !p.hub)

  const hubOpacity = (k: string) => (!activeHub || k === activeHub ? 1 : 0.18)
  const destOpacity = (_destKey: string) => 1

  const renderedArcs = activeHub
    ? Object.keys(positions)
        .filter((k) => k !== activeHub)
        .map((to) => ({ from: activeHub as keyof typeof positions, to: to as keyof typeof positions }))
    : arcs

  return (
    <section id="locations" ref={ref} className="relative py-24 overflow-hidden bg-brand-cream">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Heading + Hub Cards */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-px bg-brand-blue" />
              <span className="text-brand-blue text-sm font-body tracking-widest uppercase font-medium">Our Locations</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-700 leading-tight mb-6 text-brand-navy"
            >
              Strategically placed{' '}
              <span className="text-brand-sky">across India.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-body text-brand-muted leading-relaxed mb-8 max-w-md"
            >
              Two operational hubs in the North and South, with a dispatch reach across 29,000+ PIN codes through our partner logistics network.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {hubs.map((h) => {
                const isActive = activeHub === h.key
                return (
                  <div
                    key={h.label}
                    onMouseEnter={() => setActiveHub(h.key)}
                    onMouseLeave={() => setActiveHub(null)}
                    className="relative cursor-pointer group"
                  >
                    {/* Refined Signature Blue & Sky Halo Gradient Ring */}
                    <div
                      className={`pointer-events-none absolute -inset-[3px] rounded-2xl bg-[conic-gradient(from_120deg_at_50%_50%,#1d4ed8,#38bdf8,#1d4ed8)] blur-[10px] transition-opacity duration-500 ${
                        isActive ? 'opacity-60' : 'opacity-0 group-hover:opacity-30'
                      }`}
                    />
                    {/* Crisp border overlay ring */}
                    <div
                      className={`pointer-events-none absolute -inset-px rounded-2xl bg-[conic-gradient(from_120deg_at_50%_50%,#1d4ed8,#38bdf8,#1d4ed8)] transition-opacity duration-500 ${
                        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                      }`}
                    />

                    {/* Actual Card Surface */}
                    <div
                      className={`relative flex flex-col p-5 rounded-2xl border bg-brand-paper transition-all duration-300 ${
                        isActive
                          ? 'border-transparent -translate-y-0.5'
                          : 'border-brand-line'
                      }`}
                    >
                      <h3 className="font-display text-lg font-700 text-brand-navy leading-tight mb-1">{h.label}</h3>
                      <p className="font-body text-[11px] text-brand-blue uppercase tracking-widest font-medium mb-3">{h.role}</p>
                      {h.address && (
                        <p className="font-body text-sm text-brand-muted leading-relaxed flex-1">{h.address}</p>
                      )}
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${h.lat},${h.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 mt-3 text-xs font-body font-medium text-brand-blue hover:text-brand-sky transition-colors self-start"
                      >
                        View on Google Maps
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          </div>

          {/* Right: Connectivity Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full mx-auto"
            style={{ aspectRatio: `${MAP_W}/${MAP_H}`, maxWidth: `${MAX_MAP_WIDTH}px` }}
          >
            {/* Layer 1: Faint surrounding countries */}
            <img
              src={contextDataUri}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-15"
              draggable={false}
            />

            {/* Layer 2: India — prominent, clean baseline */}
            <img
              src={indiaDataUri}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-35"
              draggable={false}
            />

            {/* Arcs & Nodes SVG Layer */}
            <svg
              viewBox={`0 0 ${MAP_W} ${MAP_H}`}
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <defs>
                <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0" />
                  <stop offset="50%" stopColor="#1d4ed8" stopOpacity="1" />
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
                </linearGradient>
              </defs>

              <AnimatePresence mode="popLayout">
                {renderedArcs.map((arc, i) => {
                  const from = positions[arc.from]
                  const to = positions[arc.to]
                  return (
                    <motion.path
                      key={`${arc.from}-${arc.to}`}
                      d={curvedPath(from, to)}
                      fill="none"
                      stroke="url(#arc-gradient)"
                      strokeWidth={0.14}
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        pathLength: { duration: 0.9, delay: i * 0.06, ease: 'easeOut' },
                        opacity: { duration: 0.3 },
                      }}
                    />
                  )
                })}
              </AnimatePresence>

              {/* Destination pins — softly blinking blue */}
              {destinations.map((d, i) => (
                <g
                  key={d.label}
                  opacity={destOpacity(d.key)}
                  style={{ transition: 'opacity 0.35s ease' }}
                >
                  <circle cx={d.x} cy={d.y} r={0.35} fill="#1d4ed8" opacity={0.3}>
                    <animate attributeName="r" from="0.35" to="1.6" dur="2.6s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.35" to="0" dur="2.6s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                  </circle>
                  <circle cx={d.x} cy={d.y} r={0.35} fill="#1d4ed8">
                    <animate attributeName="opacity" values="1;0.55;1" dur="1.8s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
                  </circle>
                </g>
              ))}

              {/* Hub pins — premium blue double-ring radar pings */}
              {hubs.map((h, i) => {
                const isActive = activeHub === h.key
                return (
                  <g
                    key={h.label}
                    opacity={hubOpacity(h.key)}
                    style={{ transition: 'opacity 0.35s ease' }}
                  >
                    {/* Outer ring */}
                    <circle cx={h.x} cy={h.y} r={0.7} fill="none" stroke="#1d4ed8" strokeWidth={isActive ? 0.18 : 0.12} opacity={0.6}>
                      <animate attributeName="r" from="0.7" to={isActive ? '3.8' : '3.2'} dur="2.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" from={isActive ? '0.7' : '0.55'} to="0" dur="2.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                    </circle>
                    {/* Inner ring */}
                    <circle cx={h.x} cy={h.y} r={0.7} fill="none" stroke="#1d4ed8" strokeWidth={isActive ? 0.22 : 0.15} opacity={0.8}>
                      <animate attributeName="r" from="0.7" to={isActive ? '2.4' : '2.0'} dur="2.6s" begin={`${0.65 + i * 0.4}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" from={isActive ? '0.9' : '0.75'} to="0" dur="2.6s" begin={`${0.65 + i * 0.4}s`} repeatCount="indefinite" />
                    </circle>
                    {/* Core dot */}
                    <circle
                      cx={h.x}
                      cy={h.y}
                      r={isActive ? 0.95 : 0.65}
                      fill="#1d4ed8"
                      style={{ transition: 'r 0.3s ease' }}
                    >
                      <animate attributeName="opacity" values="1;0.7;1" dur="1.6s" repeatCount="indefinite" />
                    </circle>
                    {/* Core contrast highlight anchor */}
                    <circle cx={h.x} cy={h.y} r={isActive ? 0.28 : 0.18} fill="#FAF8F4" opacity={0.95} style={{ transition: 'r 0.3s ease' }} />
                  </g>
                )
              })}
            </svg>

          </motion.div>
        </div>
      </div>
    </section>
  )
}