'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
  ClipboardList,
  Warehouse,
  Package,
  Truck,
  BarChart3,
  TrendingUp,
} from 'lucide-react'

// 6 sequential stations — the full fulfilment lifecycle.
const stations = [
  { id: 'onboard', label: 'Onboard', sub: 'Marketplace setup & SKUs', icon: ClipboardList, xPct: 6, yPct: 50 },
  { id: 'intake', label: 'Intake', sub: 'Warehouse receipt & inspection', icon: Warehouse, xPct: 23.6, yPct: 25 },
  { id: 'process', label: 'Process', sub: 'Pick, pack, label & dispatch', icon: Package, xPct: 41.2, yPct: 60 },
  { id: 'ship', label: 'Ship', sub: 'Courier & last-mile', icon: Truck, xPct: 58.8, yPct: 30 },
  { id: 'report', label: 'Report', sub: 'Stock, sales & returns', icon: BarChart3, xPct: 76.4, yPct: 55 },
  { id: 'scale', label: 'Scale', sub: 'Infrastructure that grows', icon: TrendingUp, xPct: 94, yPct: 35 },
]

const CYCLE_MS = 15000
const VIEWBOX_W = 1000
const VIEWBOX_H = 500

// Mobile snake layout: 3 stations on top (L→R), 3 on bottom (R→L), closed loop.
const MOBILE_VIEWBOX_W = 1000
const MOBILE_VIEWBOX_H = 600
const mobilePositions = [
  { xPct: 16, yPct: 24 }, // 01 top-left
  { xPct: 50, yPct: 24 }, // 02 top-middle
  { xPct: 84, yPct: 24 }, // 03 top-right
  { xPct: 84, yPct: 76 }, // 04 bottom-right
  { xPct: 50, yPct: 76 }, // 05 bottom-middle
  { xPct: 16, yPct: 76 }, // 06 bottom-left
]

export default function EcommerceServices() {
  const ref = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const truckRef = useRef<SVGGElement>(null)
  const pathMobileRef = useRef<SVGPathElement>(null)
  const truckMobileRef = useRef<SVGGElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeIdx, setActiveIdx] = useState(0)

  const pts = stations.map((s) => ({
    x: (s.xPct / 100) * VIEWBOX_W,
    y: (s.yPct / 100) * VIEWBOX_H,
  }))
  const pathD = (() => {
    let d = `M ${pts[0].x} ${pts[0].y}`
    for (let i = 1; i < pts.length; i++) {
      const p0 = pts[i - 1]
      const p1 = pts[i]
      const cpx1 = p0.x + (p1.x - p0.x) * 0.5
      const cpy1 = p0.y
      const cpx2 = p1.x - (p1.x - p0.x) * 0.5
      const cpy2 = p1.y
      d += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${p1.x} ${p1.y}`
    }
    return d
  })()

  // Mobile snake path — open road from station 01 → 06 with gentle undulations
  const mobilePts = mobilePositions.map((p) => ({
    x: (p.xPct / 100) * MOBILE_VIEWBOX_W,
    y: (p.yPct / 100) * MOBILE_VIEWBOX_H,
  }))
  const mobilePathD = (() => {
    const [p0, p1, p2, p3, p4, p5] = mobilePts
    const BULGE = 60 // how far the snake body wobbles between stations on a same row
    return [
      `M ${p0.x} ${p0.y}`,
      // 01 → 02: undulate UP (curve dips above the row, back down)
      `C ${p0.x + 80} ${p0.y - BULGE}, ${p1.x - 80} ${p1.y - BULGE}, ${p1.x} ${p1.y}`,
      // 02 → 03: undulate DOWN
      `C ${p1.x + 80} ${p1.y + BULGE}, ${p2.x - 80} ${p2.y + BULGE}, ${p2.x} ${p2.y}`,
      // 03 → 04: big U-turn on the right side, dropping from top row to bottom row
      `C ${MOBILE_VIEWBOX_W - 20} ${p2.y + 80}, ${MOBILE_VIEWBOX_W - 20} ${p3.y - 80}, ${p3.x} ${p3.y}`,
      // 04 → 05: undulate UP (curve rises above the row going left)
      `C ${p3.x - 80} ${p3.y - BULGE}, ${p4.x + 80} ${p4.y - BULGE}, ${p4.x} ${p4.y}`,
      // 05 → 06: undulate DOWN
      `C ${p4.x - 80} ${p4.y + BULGE}, ${p5.x + 80} ${p5.y + BULGE}, ${p5.x} ${p5.y}`,
    ].join(' ')
  })()

  // Drive truck + active station from a single rAF loop so they're always synced.
  useEffect(() => {
    if (!isInView) return
    let rafId: number | null = null
    let startTime: number | null = null
    let pathLen = 0
    let currentIdx = -1

    const tick = (now: number) => {
      if (startTime === null) startTime = now
      const elapsed = (now - startTime) % CYCLE_MS
      const progress = elapsed / CYCLE_MS

      // Pick whichever SVG is currently visible (desktop OR mobile).
      // getTotalLength() returns > 0 even when the SVG's parent is display:none,
      // so we check the actual rendered SVG width instead.
      const pathD = pathRef.current
      const truckD = truckRef.current
      const pathM = pathMobileRef.current
      const truckM = truckMobileRef.current

      const svgD = pathD?.ownerSVGElement
      const svgM = pathM?.ownerSVGElement
      const desktopWidth = svgD?.getBoundingClientRect().width ?? 0
      const mobileWidth = svgM?.getBoundingClientRect().width ?? 0

      let activePath: SVGPathElement | null = null
      let activeTruck: SVGGElement | null = null
      let activePts: { x: number; y: number }[] | null = null
      let truckScale = 1

      if (desktopWidth > 0 && pathD && truckD) {
        activePath = pathD
        activeTruck = truckD
        activePts = pts
        pathLen = pathD.getTotalLength()
        truckScale = 1
      } else if (mobileWidth > 0 && pathM && truckM) {
        activePath = pathM
        activeTruck = truckM
        activePts = mobilePts
        pathLen = pathM.getTotalLength()
        // Mobile container is much narrower than desktop — scale truck up so it stays visible
        truckScale = 2.6
      }

      if (activePath && activeTruck && activePts) {
        const dist = progress * pathLen
        const p = activePath.getPointAtLength(dist)
        // Look further ahead so direction is stable through tiny curvature noise
        const aheadDist = Math.min(dist + 30, pathLen - 0.01)
        const ahead = activePath.getPointAtLength(aheadDist)
        const dx = ahead.x - p.x
        const dy = ahead.y - p.y
        // Tilt represents slope only (clamped) — independent of left/right direction.
        // Mirror horizontally for leftward motion so the truck stays right-side-up.
        const rawTilt = (Math.atan2(dy, Math.abs(dx)) * 180) / Math.PI
        const tiltDeg = Math.max(-22, Math.min(22, rawTilt))
        const sx = dx < 0 ? -truckScale : truckScale
        activeTruck.setAttribute(
          'transform',
          `translate(${p.x}, ${p.y}) scale(${sx}, ${truckScale}) rotate(${tiltDeg})`
        )

        // Active station = nearest to the truck's current position
        let nearestIdx = 0
        let nearestDist = Infinity
        for (let i = 0; i < activePts.length; i++) {
          const dx = p.x - activePts[i].x
          const dy = p.y - activePts[i].y
          const d2 = dx * dx + dy * dy
          if (d2 < nearestDist) {
            nearestDist = d2
            nearestIdx = i
          }
        }
        if (nearestIdx !== currentIdx) {
          currentIdx = nearestIdx
          setActiveIdx(nearestIdx)
        }
      } else {
        // Both SVGs hidden (rare) — fall back to time-based cycle
        const idx = Math.floor(progress * stations.length) % stations.length
        if (idx !== currentIdx) {
          currentIdx = idx
          setActiveIdx(idx)
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  return (
    <section
      id="ecommerce"
      ref={ref}
      className="relative pt-24 pb-16 overflow-hidden bg-brand-navy text-white"
    >
      {/* Background — radial orange glow + faint dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(242,107,31,0.18),transparent_55%)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 4px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-brand-orange" />
          <span className="text-brand-orange text-sm font-body tracking-widest uppercase font-medium">
            E-Commerce Suite
          </span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-8 gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-700 leading-tight max-w-xl text-white"
          >
            From listing to{' '}
            <span className="text-brand-orange">last-mile dispatch</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-white/60 max-w-sm leading-relaxed"
          >
&ldquo;Six operational stages from marketplace onboarding to scaling, with your volume handled in one pipeline.&rdquo;
          </motion.p>
        </div>

        {/* THE PIPELINE — desktop only */}
        <div className="relative w-full hidden md:block" style={{ aspectRatio: '1000 / 280' }}>
          <svg
            viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            <defs>
              <linearGradient id="path-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F26B1F" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#F26B1F" stopOpacity="1" />
                <stop offset="100%" stopColor="#F26B1F" stopOpacity="0.15" />
              </linearGradient>
              <filter id="pkg-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Dim static path */}
            <path
              ref={pathRef}
              id="pipeline-path"
              d={pathD}
              fill="none"
              stroke="#F26B1F"
              strokeOpacity="0.18"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />

            {/* Flowing dashed path */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="url(#path-grad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="6 14"
              vectorEffect="non-scaling-stroke"
              animate={{ strokeDashoffset: [0, -40] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />

            {/* Particle bursts on activeIdx change */}
            {[0, 1, 2, 3, 4, 5].map((p) => {
              const seed = (activeIdx * 17 + p * 53) % 100
              const dx = ((seed * 9.7) % 80) - 40
              const dy = -30 - ((seed * 3.3) % 50)
              return (
                <motion.circle
                  key={`particle-${activeIdx}-${p}`}
                  cx={pts[activeIdx].x}
                  cy={pts[activeIdx].y}
                  r="2.5"
                  fill="#F26B1F"
                  initial={{ opacity: 0.9, cx: pts[activeIdx].x, cy: pts[activeIdx].y }}
                  animate={{
                    opacity: 0,
                    cx: pts[activeIdx].x + dx,
                    cy: pts[activeIdx].y + dy,
                  }}
                  transition={{ duration: 1.8, ease: 'easeOut', delay: 0.2 }}
                />
              )
            })}

            {/* Delivery truck — driven by rAF along the path; active station glow synced via nearest-station lookup */}
            <g ref={truckRef} filter="url(#pkg-glow)">
              {/* Wheel shadow on the road */}
              <ellipse cx="-2" cy="11" rx="18" ry="2.2" fill="rgba(0,0,0,0.45)" />

              {/* Cargo container */}
              <rect x="-18" y="-11" width="20" height="15" rx="1.5" fill="#F26B1F" />
              <line x1="-13" y1="-11" x2="-13" y2="4" stroke="rgba(0,0,0,0.18)" strokeWidth="0.4" />
              <line x1="-8" y1="-11" x2="-8" y2="4" stroke="rgba(0,0,0,0.18)" strokeWidth="0.4" />
              <line x1="-3" y1="-11" x2="-3" y2="4" stroke="rgba(0,0,0,0.18)" strokeWidth="0.4" />
              <rect x="-18" y="-3" width="20" height="1.2" fill="rgba(255,255,255,0.45)" />
              <text
                x="-8"
                y="1.5"
                textAnchor="middle"
                fontSize="7.5"
                fill="white"
                fontWeight="800"
                fontFamily="sans-serif"
              >
                A
              </text>

              {/* Cab */}
              <path d="M 2 -5 L 11 -5 L 14 -1 L 14 4 L 2 4 Z" fill="#F26B1F" />
              <path d="M 4 -3 L 10 -3 L 12 0 L 12 1.4 L 4 1.4 Z" fill="rgba(11,27,43,0.85)" />
              <circle cx="13" cy="2.5" r="0.7" fill="rgba(255,238,180,0.95)" />

              {/* Wheels */}
              <circle cx="-12" cy="6" r="2.8" fill="#0B1B2B" />
              <circle cx="-12" cy="6" r="1.1" fill="rgba(255,255,255,0.35)" />
              <circle cx="9" cy="6" r="2.8" fill="#0B1B2B" />
              <circle cx="9" cy="6" r="1.1" fill="rgba(255,255,255,0.35)" />
            </g>
          </svg>

          {/* HTML overlay — 6 station nodes */}
          {stations.map((s, i) => {
            const isActive = activeIdx === i
            const Icon = s.icon
            return (
              <div
                key={s.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                style={{
                  left: `${s.xPct}%`,
                  top: `${s.yPct}%`,
                }}
              >
                <div className="relative flex flex-col items-center gap-3">
                  {isActive && (
                    <span className="absolute -inset-1 rounded-full bg-brand-orange/25 animate-ping pointer-events-none" />
                  )}
                  <motion.div
                    animate={{ scale: isActive ? 1.18 : 1 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center backdrop-blur-sm transition-colors ${
                      isActive
                        ? 'bg-brand-orange border-brand-orange shadow-[0_0_36px_rgba(242,107,31,0.55)]'
                        : 'bg-brand-navy-dark/85 border-brand-orange/35'
                    }`}
                  >
                    <Icon size={22} className={isActive ? 'text-white' : 'text-brand-orange/85'} />
                    <span
                      className={`absolute -top-1 -right-1 text-[10px] font-display font-700 rounded-full w-5 h-5 flex items-center justify-center border ${
                        isActive
                          ? 'bg-white text-brand-orange border-white'
                          : 'bg-brand-navy-dark text-brand-orange/70 border-brand-orange/30'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </motion.div>
                  <div className="text-center">
                    <motion.div
                      animate={{ color: isActive ? '#F26B1F' : '#FFFFFF' }}
                      className="font-display font-700 text-sm md:text-base uppercase tracking-widest"
                    >
                      {s.label}
                    </motion.div>
                    <div className="font-body text-[11px] md:text-xs text-white/55 mt-1 max-w-[130px] mx-auto leading-tight">
                      {s.sub}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile snake pipeline — 3 on top L→R, 3 on bottom R→L, looping */}
        <div className="md:hidden relative w-full" style={{ aspectRatio: '1000 / 600' }}>
          <svg
            viewBox={`0 0 ${MOBILE_VIEWBOX_W} ${MOBILE_VIEWBOX_H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            <defs>
              <linearGradient id="path-grad-m" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F26B1F" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#F26B1F" stopOpacity="1" />
                <stop offset="100%" stopColor="#F26B1F" stopOpacity="0.2" />
              </linearGradient>
              <filter id="pkg-glow-m" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Static dim path */}
            <path
              ref={pathMobileRef}
              d={mobilePathD}
              fill="none"
              stroke="#F26B1F"
              strokeOpacity="0.18"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />

            {/* Flowing dashed path */}
            <motion.path
              d={mobilePathD}
              fill="none"
              stroke="url(#path-grad-m)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="6 14"
              vectorEffect="non-scaling-stroke"
              animate={{ strokeDashoffset: [0, -40] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />

            {/* Truck for mobile path */}
            <g ref={truckMobileRef} filter="url(#pkg-glow-m)">
              <ellipse cx="-2" cy="11" rx="18" ry="2.2" fill="rgba(0,0,0,0.45)" />
              <rect x="-18" y="-11" width="20" height="15" rx="1.5" fill="#F26B1F" />
              <line x1="-13" y1="-11" x2="-13" y2="4" stroke="rgba(0,0,0,0.18)" strokeWidth="0.4" />
              <line x1="-8" y1="-11" x2="-8" y2="4" stroke="rgba(0,0,0,0.18)" strokeWidth="0.4" />
              <line x1="-3" y1="-11" x2="-3" y2="4" stroke="rgba(0,0,0,0.18)" strokeWidth="0.4" />
              <rect x="-18" y="-3" width="20" height="1.2" fill="rgba(255,255,255,0.45)" />
              <text
                x="-8"
                y="1.5"
                textAnchor="middle"
                fontSize="7.5"
                fill="white"
                fontWeight="800"
                fontFamily="sans-serif"
              >
                A
              </text>
              <path d="M 2 -5 L 11 -5 L 14 -1 L 14 4 L 2 4 Z" fill="#F26B1F" />
              <path d="M 4 -3 L 10 -3 L 12 0 L 12 1.4 L 4 1.4 Z" fill="rgba(11,27,43,0.85)" />
              <circle cx="13" cy="2.5" r="0.7" fill="rgba(255,238,180,0.95)" />
              <circle cx="-12" cy="6" r="2.8" fill="#0B1B2B" />
              <circle cx="-12" cy="6" r="1.1" fill="rgba(255,255,255,0.35)" />
              <circle cx="9" cy="6" r="2.8" fill="#0B1B2B" />
              <circle cx="9" cy="6" r="1.1" fill="rgba(255,255,255,0.35)" />
            </g>
          </svg>

          {/* HTML overlay — 6 station nodes positioned on the snake */}
          {mobilePositions.map((pos, i) => {
            const s = stations[i]
            const isActive = activeIdx === i
            const Icon = s.icon
            return (
              <div
                key={s.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ left: `${pos.xPct}%`, top: `${pos.yPct}%` }}
              >
                <div className="relative flex flex-col items-center gap-2">
                  {isActive && (
                    <span className="absolute -inset-1 rounded-full bg-brand-orange/25 animate-ping pointer-events-none" />
                  )}
                  <motion.div
                    animate={{ scale: isActive ? 1.15 : 1 }}
                    transition={{ duration: 0.35 }}
                    className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-brand-orange border-brand-orange shadow-[0_0_28px_rgba(242,107,31,0.55)]'
                        : 'bg-brand-navy-dark/85 border-brand-orange/35'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-white' : 'text-brand-orange/85'} />
                    <span
                      className={`absolute -top-1 -right-1 text-[9px] font-display font-700 rounded-full w-4 h-4 flex items-center justify-center border ${
                        isActive
                          ? 'bg-white text-brand-orange border-white'
                          : 'bg-brand-navy-dark text-brand-orange/70 border-brand-orange/30'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </motion.div>
                  <div className="text-center">
                    <motion.div
                      animate={{ color: isActive ? '#F26B1F' : '#FFFFFF' }}
                      className="font-display font-700 text-[11px] uppercase tracking-widest leading-tight"
                    >
                      {s.label}
                    </motion.div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
