'use client'

import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
  Clock,
  Rocket,
  Sliders,
  Eye,
  MapPin,
  Brain,
  UserPlus,
  FileText,
  HeartHandshake,
} from 'lucide-react'

type Reason = {
  icon: typeof Clock
  title: string
  lead: string
  desc: string
  image?: string
}

const ecommReasons: Reason[] = [
  {
    icon: Clock,
    title: 'Cost & Time Efficiency',
    lead: 'Skip warehouse building completely:',
    desc: ' Instead of building your own warehouse or fulfilment infrastructure which demands capital, manpower, compliance  you gain a ready-to-use, professional setup.',
    image: '/images/EC1.png',
  },
  {
    icon: Rocket,
    title: 'Focus on Growth',
    lead: 'Hand off the backend:',
    desc: 'With backend logistics & operations managed by us, you can focus on product development, branding, marketing, and scaling sales.',
    image: '/images/EC2.png',
  },
  {
    icon: Sliders,
    title: 'Operational Flexibility',
    lead: 'Scale up or down on demand:',
    desc: ' Whether you are a small brand just starting, or a more established seller scaling up  we are equipped to handle varying volumes and help you adapt flexibly.',
    image: '/images/EC3.png',
  },
  {
    icon: Eye,
    title: 'Transparency & Professionalism',
    lead: 'Audit-ready operations:',
    desc: ' With clearly defined processes, stock tracking, order fulfilment protocols, and compliance adherence, your operations remain transparent and audit ready.',
    image: '/images/EC4.png', 
  },
  {
    icon: MapPin,
    title: 'Local Advantage',
    lead: 'Pan-India reach:',
    desc: ' Being based in Bengaluru and Gurugram, gives strategic advantage  good connectivity, access to courier services, relative proximity to many parts of southern, Northern  and pan-India supply chain routes  beneficial for timely dispatch and supply chain efficiency.',
    image: '/images/EC5.png',
  },
]

const hrReasons: Reason[] = [
  {
    icon: Brain,
    title: 'Specialized HR Expertise',
    lead: 'Built for growth-stage teams.',
    desc: 'Structured HR and recruitment solutions tailored for start-ups, B2C/D2C brands, SMEs, and growing organizations.',
    image: '/images/hr1.png',
  },
  {
    icon: UserPlus,
    title: 'Scalable Hiring Support',
    lead: 'From entry to executive.',
    desc: 'From your first hire to leadership recruitment, we help businesses attract and onboard the right talent efficiently and professionally.',
    image: '/images/hr2.png',
  },
  {
    icon: FileText,
    title: 'HR Process & Policy',
    lead: 'Structured systems from day one.',
    desc: 'We design and maintain compliance policies, onboarding processes, performance management frameworks, and employee documentation.',
    image: '/images/hr3.png',
  },
  {
    icon: HeartHandshake,
    title: 'Long-Term Partnership',
    lead: 'Beyond recruitment.',
    desc: 'We support employee lifecycle management, organizational development, and people-ops optimization for the long haul.',
    image: '/images/hr4.png', // If image_a8f6e8.jpg is used here, the filter below automatically recolors it
  },
]

const CYCLE_MS = 7000
const POST_CLICK_PAUSE_MS = 9000

type Audience = 'ecomm' | 'hr'

export default function WhyUs() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [audience, setAudience] = useState<Audience>('ecomm')
  const [activeIdx, setActiveIdx] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const reasons = audience === 'ecomm' ? ecommReasons : hrReasons

  const scheduleNext = (delay: number) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setActiveIdx((i) => (i + 1) % reasons.length)
      scheduleNext(CYCLE_MS)
    }, delay)
  }

  useEffect(() => {
    if (!isInView) return
    scheduleNext(CYCLE_MS)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isInView, audience])

  const selectAudience = (a: Audience) => {
    if (a === audience) return
    setAudience(a)
    setActiveIdx(0)
  }

  const selectIdx = (i: number) => {
    setActiveIdx(i)
    scheduleNext(POST_CLICK_PAUSE_MS)
  }

  const [hasSwiped, setHasSwiped] = useState(false)

  const handleSwipeEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    if (info.offset.x < -60 || info.velocity.x < -500) {
      selectIdx((activeIdx + 1) % reasons.length)
      setHasSwiped(true)
    } else if (info.offset.x > 60 || info.velocity.x > 500) {
      selectIdx((activeIdx - 1 + reasons.length) % reasons.length)
      setHasSwiped(true)
    }
  }

  const active = reasons[activeIdx]
  const ActiveIcon = active.icon

  // 3D mouse-tracking tilt for the left card
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springCfg = { stiffness: 220, damping: 22, mass: 0.6 }
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), springCfg)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), springCfg)
  const glareX = useTransform(mx, [-0.5, 0.5], ['20%', '80%'])
  const glareY = useTransform(my, [-0.5, 0.5], ['20%', '80%'])
  const glareBg = useMotionTemplate`radial-gradient(220px circle at ${glareX} ${glareY}, rgba(255,255,255,0.18), transparent 60%)`

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleCardMouseLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <section
      id="why-us"
      ref={ref}
      className="relative py-28 overflow-hidden bg-white"
    >
      {/* 
        SVG CSS Color Matrix Filter Matrix:
        Shifts warm orange channels directly into your brand's deep royal & vibrant sky blues 
      */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <filter id="brand-blue-recolor">
          <feColorMatrix
            type="matrix"
            values="0.1  0.0  0.0  0.0  0.0
                    0.3  0.5  0.0  0.0  0.0
                    0.8  0.6  1.0  0.0  0.0
                    0.0  0.0  0.0  1.0  0.0"
          />
        </filter>
      </svg>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-brand-blue" />
          <span className="text-brand-blue text-sm font-body tracking-widest uppercase font-medium">
            Why Partner With Us
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-700 leading-tight mb-10 max-w-2xl text-brand-navy"
        >
          Not just a vendor.{' '}
          <span className="text-brand-blue">A real </span>
          <span className="text-brand-sky">business partner.</span>
        </motion.h2>

        {/* Audience tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-14 inline-flex relative p-1.5 rounded-full bg-brand-cream border border-brand-line shadow-sm"
        >
          {(['ecomm', 'hr'] as const).map((a) => {
            const isActive = audience === a
            const label =
              a === 'ecomm'
                ? 'I run an E-Commerce Brand'
                : 'I lead a Growing Organization'
            return (
              <button
                key={a}
                onClick={() => selectAudience(a)}
                className={`relative z-10 px-5 md:px-7 py-2.5 rounded-full text-xs md:text-sm font-body font-600 transition-colors duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'text-brand-navy/60 hover:text-brand-navy'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="audience-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 bg-brand-blue rounded-full -z-10"
                  />
                )}
                {label}
              </button>
            )
          })}
        </motion.div>

        {/* SPLIT-SCREEN — left visual, right expandable list */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT: Visual Showcase with dynamic filter color maps */}
          <div className="relative lg:sticky lg:top-24">
            <div aria-hidden className="absolute -inset-14 lg:-inset-20 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(55%_55%_at_50%_45%,rgba(30,64,175,0.15),transparent_72%)] blur-2xl" />
              <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_35%_70%,rgba(2,132,199,0.1),transparent_75%)] blur-3xl" />
            </div>

            <div
              aria-hidden
              className="absolute left-[10%] right-[10%] -bottom-5 h-10 bg-brand-navy/40 blur-2xl rounded-[50%] opacity-70 pointer-events-none"
            />

            <div className="relative h-[380px] lg:h-[440px]" style={{ perspective: '1600px' }}>
              <div
                aria-hidden
                className="absolute inset-0 rounded-3xl bg-brand-navy/25 blur-md"
                style={{ transform: 'translate(20px, 24px) rotate(-1.2deg)' }}
              />

              <motion.div
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={handleSwipeEnd}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                className="relative w-full h-full rounded-3xl bg-brand-navy overflow-hidden flex items-center justify-center ring-1 ring-white/5 shadow-[0_40px_90px_-25px_rgba(11,27,43,0.55),0_18px_40px_-18px_rgba(11,27,43,0.35)] touch-pan-y"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-3xl pointer-events-none bg-[linear-gradient(135deg,rgba(255,255,255,0.10)_0%,transparent_38%,transparent_62%,rgba(0,0,0,0.22)_100%)]"
                />

                {!active.image && (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(6,182,212,0.20),transparent_60%)] pointer-events-none" />
                    <div
                      className="absolute inset-0 opacity-[0.08] pointer-events-none"
                      style={{
                        backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)',
                        backgroundSize: '26px 26px',
                      }}
                    />
                    <motion.div
                      animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.6, 0.4] }}
                      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute w-[280px] h-[280px] rounded-full border border-brand-blue-light/30"
                    />
                  </>
                )}

                {/* Active visual with dynamic asset recoloring applied */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${audience}-${activeIdx}`}
                    initial={{ opacity: 0, scale: 0.94, rotateY: -8 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 1.04, rotateY: 8 }}
                    transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
                    className="absolute inset-0 flex items-center justify-center select-none"
                    style={{ filter: 'url(#brand-blue-recolor)' }} // <-- Applied the SVG color matrix to turn orange highlights to your brand blues
                  >
                    {active.image ? (
                      <img
                        src={active.image}
                        alt={active.title}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    ) : (
                      <div className="relative">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-brand-blue flex items-center justify-center shadow-[0_0_80px_rgba(30,64,175,0.45)]">
                          <ActiveIcon size={68} className="text-white" strokeWidth={1.5} />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none rounded-3xl shadow-[inset_0_0_60px_18px_rgba(11,27,43,0.5)]"
                />

                <motion.div aria-hidden="true" style={{ background: glareBg }} className="pointer-events-none absolute inset-0 mix-blend-overlay" />
                <div aria-hidden className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </div>

          {/* RIGHT: Expandable Info List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={audience}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
              className="hidden lg:flex flex-col relative"
            >
              <div className="absolute left-0 top-0 bottom-0 w-px bg-brand-line" />

              {reasons.map((r, i) => {
                const isActive = activeIdx === i
                return (
                  <button
                    key={r.title}
                    onClick={() => selectIdx(i)}
                    className="text-left w-full py-5 relative pl-6 group transition-all duration-200"
                  >
                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scaleY: isActive ? 1 : 0.3,
                        backgroundColor: isActive ? '#0284C7' : '#E6E2DA'
                      }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="absolute left-[-1.5px] top-3 bottom-3 w-[3px] bg-brand-sky rounded-full shadow-[0_0_14px_rgba(2,132,199,0.5)] origin-center"
                    />

                    <div className="flex items-baseline gap-3 mb-1">
                      <motion.span
                        animate={{
                          opacity: isActive ? 1 : 0.7,
                          color: isActive ? '#0284C7' : '#5B6B7C',
                        }}
                        transition={{ duration: 0.3 }}
                        className="font-display text-[11px] font-700 tabular-nums tracking-widest shrink-0"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </motion.span>
                      
                      <motion.h3
                        animate={{ color: isActive ? '#0284C7' : '#475569' }}
                        transition={{ duration: 0.2 }}
                        className="font-display text-lg md:text-xl font-700 leading-tight"
                      >
                        {r.title}
                      </motion.h3>
                    </div>
                    
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                          className="overflow-hidden ml-7"
                        >
                          <p className="font-body text-sm md:text-base text-brand-navy/85 leading-relaxed mt-2 pb-1">
                            <span className="font-700 text-brand-blue">{r.lead}</span> {r.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}