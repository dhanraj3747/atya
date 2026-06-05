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

const stations = [
  { id: 'onboard', label: 'Onboard', sub: 'SKU mapping & integration', icon: ClipboardList, xPct: 6, yPct: 50 },
  { id: 'intake', label: 'Receive', sub: 'Inbound receipt  & GRN Creation', icon: Warehouse, xPct: 23.6, yPct: 25 },
  { id: 'process', label: 'Store', sub: 'bin allocation, Stock & inventory management', icon: Package, xPct: 41.2, yPct: 60 },
  { id: 'ship', label: 'Fulfill', sub: 'Order picking, packing, labeling & quality checks', icon: Truck, xPct: 58.8, yPct: 30 },
  { id: 'report', label: 'Dispatch', sub: 'Timely dispatch & shipment tracking', icon: BarChart3, xPct: 76.4, yPct: 55 },
  { 
    id: 'scale', 
    label: 'Report &\nScale', 
    sub: 'Performance review &\nbusiness growth', 
    icon: TrendingUp, 
    xPct: 94, 
    yPct: 35 
  },
]

const CYCLE_MS = 15000
const VIEWBOX_W = 1000
const VIEWBOX_H = 500

const MOBILE_VIEWBOX_W = 1000
const MOBILE_VIEWBOX_H = 600
const mobilePositions = [
  { xPct: 16, yPct: 24 },
  { xPct: 50, yPct: 24 },
  { xPct: 84, yPct: 24 },
  { xPct: 84, yPct: 76 },
  { xPct: 50, yPct: 76 },
  { xPct: 16, yPct: 76 },
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

  const mobilePts = mobilePositions.map((p) => ({
    x: (p.xPct / 100) * MOBILE_VIEWBOX_W,
    y: (p.yPct / 100) * MOBILE_VIEWBOX_H,
  }))
  const mobilePathD = (() => {
    const [p0, p1, p2, p3, p4, p5] = mobilePts
    const BULGE = 60
    return [
      `M ${p0.x} ${p0.y}`,
      `C ${p0.x + 80} ${p0.y - BULGE}, ${p1.x - 80} ${p1.y - BULGE}, ${p1.x} ${p1.y}`,
      `C ${p1.x + 80} ${p1.y + BULGE}, ${p2.x - 80} ${p2.y + BULGE}, ${p2.x} ${p2.y}`,
      `C ${MOBILE_VIEWBOX_W - 20} ${p2.y + 80}, ${MOBILE_VIEWBOX_W - 20} ${p3.y - 80}, ${p3.x} ${p3.y}`,
      `C ${p3.x - 80} ${p3.y - BULGE}, ${p4.x + 80} ${p4.y - BULGE}, ${p4.x} ${p4.y}`,
      `C ${p4.x - 80} ${p4.y + BULGE}, ${p5.x + 80} ${p5.y + BULGE}, ${p5.x} ${p5.y}`,
    ].join(' ')
  })()

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
        truckScale = 2.6
      }

      if (activePath && activeTruck && activePts) {
        const dist = progress * pathLen
        const p = activePath.getPointAtLength(dist)
        const aheadDist = Math.min(dist + 30, pathLen - 0.01)
        const ahead = activePath.getPointAtLength(aheadDist)
        const dx = ahead.x - p.x
        const dy = ahead.y - p.y
        const rawTilt = (Math.atan2(dy, Math.abs(dx)) * 180) / Math.PI
        const tiltDeg = Math.max(-22, Math.min(22, rawTilt))
        const sx = dx < 0 ? -truckScale : truckScale
        activeTruck.setAttribute(
          'transform',
          `translate(${p.x}, ${p.y}) scale(${sx}, ${truckScale}) rotate(${tiltDeg})`
        )

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
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [isInView])

  return (
    <section id="ecommerce" ref={ref} className="relative pt-24 pb-16 overflow-hidden bg-brand-navy text-white">
      {/* Brand background glow matching corporate identity */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(0,229,255,0.12),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header Title Section */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-brand-cyan" />
              <span className="text-brand-cyan text-sm font-body tracking-widest uppercase font-bold">E-Commerce Suite</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight max-w-xl text-white">
              From listing to <span className="bg-gradient-to-r from-brand-blue-light to-brand-cyan bg-clip-text text-transparent">last-mile dispatch</span>.
            </h2>
          </div>
          <p className="font-body text-white/60 max-w-sm leading-relaxed mb-2">
            &ldquo;A unified six-stage operational pipeline engineered to manage everything from initial channel onboarding to high-volume enterprise scaling.&rdquo;
          </p>
        </div>

        {/* DESKTOP PIPELINE */}
        <div className="relative w-full hidden md:block" style={{ aspectRatio: '1000 / 280' }}>
          <svg viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`} preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="path-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#00E5FF" stopOpacity="1" />
                <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Fixed pipeline path stroke array color matches brand core blue/cyan line */}
            <path ref={pathRef} id="pipeline-path" d={pathD} fill="none" stroke="#00E5FF" strokeOpacity="0.25" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            <motion.path d={pathD} fill="none" stroke="url(#path-grad)" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 14" vectorEffect="non-scaling-stroke" animate={{ strokeDashoffset: [0, -40] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} />
            
            {/* Logo-Aligned Fleet Truck Graphic */}
            <g ref={truckRef}>
              <ellipse cx="-2" cy="11" rx="18" ry="2.2" fill="rgba(0,0,0,0.5)" />
              <rect x="-18" y="-11" width="20" height="15" rx="1.5" fill="#003399" /> {/* Brand Royal Blue Body */}
              <text x="-8" y="1.5" textAnchor="middle" fontSize="7.5" fill="#00E5FF" fontWeight="900" fontFamily="sans-serif">A</text>
              <path d="M 2 -5 L 11 -5 L 14 -1 L 14 4 L 2 4 Z" fill="#00E5FF" /> {/* Brand Cyan Cab */}
              <path d="M 4 -3 L 10 -3 L 12 0 L 12 1.4 L 4 1.4 Z" fill="rgba(11,27,43,0.95)" />
              <circle cx="-12" cy="6" r="2.8" fill="#0B1B2B" /><circle cx="9" cy="6" r="2.8" fill="#0B1B2B" />
            </g>
          </svg>

          {/* HTML Overlay nodes */}
          {stations.map((s, i) => {
            const isActive = activeIdx === i
            const Icon = s.icon
            return (
              <div
                key={s.id}
                className="absolute z-10 flex flex-col items-center select-none"
                style={{
                  left: `${s.xPct}%`,
                  top: `${s.yPct}%`,
                  transform: 'translate(-50%, -1.75rem)'
                }}
              >
                {/* Icon Container */}
                <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
                  {isActive && <span className="absolute -inset-1 rounded-full bg-brand-cyan/30 animate-ping pointer-events-none" />}
                  <motion.div
                    animate={{ scale: isActive ? 1.15 : 1 }}
                    className={`relative w-full h-full rounded-full border-2 flex items-center justify-center backdrop-blur-sm transition-colors ${
                      isActive ? 'bg-brand-cyan border-brand-cyan shadow-[0_0_36px_rgba(0,229,255,0.65)]' : 'bg-brand-navy-dark/90 border-brand-cyan/30'
                    }`}
                  >
                    <Icon size={22} className={isActive ? 'text-brand-navy font-bold' : 'text-brand-cyan/80'} />
                    <span className={`absolute -top-1 -right-1 text-[10px] font-display font-bold rounded-full w-5 h-5 flex items-center justify-center border ${isActive ? 'bg-white text-brand-navy border-white' : 'bg-brand-navy-dark text-brand-cyan/80 border-brand-cyan/30'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </motion.div>
                </div>

                {/* Text Content Block Container */}
                <div className="text-center mt-2.5 w-[160px]">
                  <motion.div
                    animate={{ color: isActive ? '#00E5FF' : '#FFFFFF' }}
                    className="font-display font-bold text-sm md:text-base uppercase tracking-widest whitespace-pre-line leading-tight"
                  >
                    {s.label}
                  </motion.div>
                  <div className="font-body text-[11px] md:text-xs text-white/55 mt-1 leading-normal whitespace-pre-line px-1">
                    {s.sub}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* MOBILE SNAKE PIPELINE */}
        <div className="md:hidden relative w-full" style={{ aspectRatio: '1000 / 600' }}>
          <svg viewBox={`0 0 ${MOBILE_VIEWBOX_W} ${MOBILE_VIEWBOX_H}`} preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <path ref={pathMobileRef} d={mobilePathD} fill="none" stroke="#00E5FF" strokeOpacity="0.25" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            <motion.path d={mobilePathD} fill="none" stroke="url(#path-grad)" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 14" vectorEffect="non-scaling-stroke" animate={{ strokeDashoffset: [0, -40] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} />
            <g ref={truckMobileRef}>
              <rect x="-18" y="-11" width="20" height="15" rx="1.5" fill="#003399" />
              <path d="M 2 -5 L 11 -5 L 14 -1 L 14 4 L 2 4 Z" fill="#00E5FF" />
            </g>
          </svg>

          {/* Mobile Overlay nodes */}
          {mobilePositions.map((pos, i) => {
            const s = stations[i]
            const isActive = activeIdx === i
            const Icon = s.icon
            return (
              <div
                key={s.id}
                className="absolute z-10 flex flex-col items-center"
                style={{ 
                  left: `${pos.xPct}%`, 
                  top: `${pos.yPct}%`,
                  transform: 'translate(-50%, -1.35rem)'
                }}
              >
                <div className="relative w-12 h-12 flex items-center justify-center">
                  {isActive && <span className="absolute -inset-1 rounded-full bg-brand-cyan/30 animate-ping pointer-events-none" />}
                  <motion.div
                    animate={{ scale: isActive ? 1.12 : 1 }}
                    className={`relative w-full h-full rounded-full border-2 flex items-center justify-center transition-colors ${
                      isActive ? 'bg-brand-cyan border-brand-cyan shadow-[0_0_28px_rgba(0,229,255,0.65)]' : 'bg-brand-navy-dark/90 border-brand-cyan/30'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-brand-navy font-bold' : 'text-brand-cyan/80'} />
                    <span className={`absolute -top-1 -right-1 text-[9px] font-display font-bold rounded-full w-4 h-4 flex items-center justify-center border ${isActive ? 'bg-white text-brand-navy border-white' : 'bg-brand-navy-dark text-brand-cyan/80 border-brand-cyan/30'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </motion.div>
                </div>

                <div className="text-center mt-2 w-[120px]">
                  <motion.div
                    animate={{ color: isActive ? '#00E5FF' : '#FFFFFF' }}
                    className="font-display font-bold text-[11px] uppercase tracking-widest leading-tight whitespace-pre-line"
                  >
                    {s.label}
                  </motion.div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}