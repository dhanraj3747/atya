'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { UserSearch, ClipboardList, BookOpen, Target, Network, ArrowRight } from 'lucide-react'

type Service = {
  icon: typeof ClipboardList
  title: string
  desc: string
  tag: string
}

const services: Service[] = [
  {
    icon: UserSearch,
    title: 'Recruitment & Talent Acquisition',
    desc: 'End-to-end recruitment across entry-level, mid-level, leadership, and specialized roles. Sourcing, screening, interview coordination, offer management, and joining follow-up.',
    tag: 'Hiring',
  },
  {
    icon: ClipboardList,
    title: 'HR Operations & Employee Lifecycle',
    desc: 'Structured HR processes: onboarding, documentation, attendance, leave tracking, MIS reporting, and exit formalities.',
    tag: 'Operations',
  },
  {
    icon: BookOpen,
    title: 'Policies, Documentation & Compliance',
    desc: 'HR policies, employee handbooks, code of conduct, leave policies, and performance documentation.',
    tag: 'Compliance',
  },
  {
    icon: Target,
    title: 'Performance Management',
    desc: 'KPI/KRA frameworks, appraisal systems, role structures, reporting hierarchies, and workforce planning.',
    tag: 'Performance',
  },
  {
    icon: Network,
    title: 'Scalable HR Infrastructure',
    desc: 'As your organization grows, we scale HR systems, hiring processes, and people management frameworks.',
    tag: 'Strategy',
  },
]

const CYCLE_MS = 3800
const POST_CLICK_PAUSE_MS = 8000

export default function HRServices() {
  const [activeIdx, setActiveIdx] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const scheduleNext = (delayMs: number) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setActiveIdx((i) => (i + 1) % services.length)
      scheduleNext(CYCLE_MS)
    }, delayMs)
  }

  useEffect(() => {
    if (!isInView) return
    scheduleNext(CYCLE_MS)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  const selectIdx = (idx: number) => {
    setActiveIdx(idx)
    scheduleNext(POST_CLICK_PAUSE_MS)
  }

  const active = services[activeIdx]
  const ActiveIcon = active.icon

  const [hasSwiped, setHasSwiped] = useState(false)

  const handleSwipeEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const offsetX = info.offset.x
    const velocityX = info.velocity.x
    if (offsetX < -60 || velocityX < -500) {
      selectIdx((activeIdx + 1) % services.length)
      setHasSwiped(true)
    } else if (offsetX > 60 || velocityX > 500) {
      selectIdx((activeIdx - 1 + services.length) % services.length)
      setHasSwiped(true)
    }
  }

  return (
    <section id="hr" ref={ref} className="relative py-28 overflow-hidden bg-brand-cream">
      {/* Dynamic background wave — painted with high-end brand cyan line tracking */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
        style={{
          maskImage:
            'linear-gradient(to right, black 0%, black 48%, transparent 64%, transparent 88%, black 98%)',
          WebkitMaskImage:
            'linear-gradient(to right, black 0%, black 48%, transparent 64%, transparent 88%, black 98%)',
        }}
      >
        <motion.path
          d="M -60 760 C 180 620 380 800 580 700 C 780 600 900 560 1100 480 C 1280 410 1400 320 1500 240"
          stroke="#00E5FF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.4"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2.4, ease: 'easeInOut', delay: 0.4 }}
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section label identifier */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-[2px] bg-brand-blue" />
          <span className="text-brand-blue text-sm font-body tracking-widest uppercase font-bold">
            HR Suite
          </span>
        </motion.div>

        {/* Headline section */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-extrabold leading-tight max-w-xl text-brand-navy"
          >
            Build a team that{' '}
            <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">scales with you.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-brand-muted max-w-sm leading-relaxed"
          >
            &ldquo;From your first hire to your hundredth, we handle the people-ops so you can lead with clarity.&rdquo;
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          {/* LEFT SIDE: Interactive 3D Card Engine */}
          <div className="lg:col-span-7 relative" style={{ perspective: '1500px' }}>
            <div className="relative h-[460px]">
              {/* Back shadows/ghost frames */}
              <div
                className="absolute inset-0 rounded-3xl bg-brand-navy/10"
                style={{ transform: 'translate(24px, 22px) rotate(-2.5deg)' }}
              />
              <div
                className="absolute inset-0 rounded-3xl bg-brand-navy/25"
                style={{ transform: 'translate(12px, 11px) rotate(-1.2deg)' }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, rotateY: -15, x: 30, scale: 0.95 }}
                  animate={{ opacity: 1, rotateY: 0, x: 0, scale: 1 }}
                  exit={{ opacity: 0, rotateY: 15, x: -30, scale: 0.95 }}
                  transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.3}
                  onDragEnd={handleSwipeEnd}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="absolute inset-0 rounded-3xl bg-brand-navy text-white shadow-2xl overflow-hidden p-10 md:p-12 flex flex-col touch-pan-y border border-white/5"
                >
                  {/* Watermark Service Background Icon — set to crisp matching Cyan layout */}
                  <ActiveIcon
                    size={340}
                    strokeWidth={0.5}
                    className="absolute -right-12 -bottom-16 text-brand-cyan opacity-[0.08] pointer-events-none"
                  />

                  {/* Core branding radial mesh light accents */}
                  <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-brand-blue/20 blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-brand-cyan/10 blur-3xl pointer-events-none" />

                  {/* Textured graph grid */}
                  <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />

                  {/* Dynamic Card Internal Text Content */}
                  <div className="relative flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-7 text-brand-cyan">
                      <span className="font-display text-5xl font-extrabold tabular-nums leading-none">
                        {String(activeIdx + 1).padStart(2, '0')}
                      </span>
                      <span className="w-10 h-[2px] bg-brand-cyan/30" />
                      <span className="text-xs font-body font-bold tracking-widest uppercase text-brand-cyan/90">
                        {active.tag}
                      </span>
                    </div>

                    <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 leading-tight max-w-xl">
                      {active.title}
                    </h3>
                    <p className="font-body text-white/80 leading-relaxed text-base max-w-lg flex-1">
                      {active.desc}
                    </p>

                    {/* Progress navigation dot nodes inside the viewport frame */}
                    <div className="flex items-center gap-2.5 pt-8">
                      {services.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => selectIdx(i)}
                          aria-label={`Show service ${i + 1}`}
                          className="h-1.5 rounded-full cursor-pointer transition-all duration-300"
                          style={{
                            width: activeIdx === i ? '32px' : '6px',
                            backgroundColor: activeIdx === i ? '#00E5FF' : 'rgba(255,255,255,0.25)'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile swipe context hints */}
            <AnimatePresence>
              {!hasSwiped && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.4 }}
                  className="lg:hidden mt-6 flex items-center justify-center gap-3 text-brand-muted"
                >
                  <motion.span
                    animate={{ x: [-4, 0, -4] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-brand-cyan font-bold"
                  >
                    ←
                  </motion.span>
                  <span className="font-body text-xs uppercase tracking-widest font-semibold">
                    Swipe to explore
                  </span>
                  <motion.span
                    animate={{ x: [4, 0, 4] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-brand-cyan font-bold"
                  >
                    →
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE: Interactive Menu Sidebar Link Items */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-center pl-4">
            {services.map((s, i) => {
              const isActive = activeIdx === i
              return (
                <button
                  key={s.title}
                  onClick={() => selectIdx(i)}
                  className="text-left group py-5 relative"
                >
                  <div className="flex items-center gap-5">
                    <motion.span
                      animate={{
                        color: isActive ? '#00E5FF' : '#9AA3AD',
                      }}
                      transition={{ duration: 0.3 }}
                      className="font-display text-[11px] font-bold tracking-widest tabular-nums shrink-0"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </motion.span>
                    <div className="flex-1 min-w-0">
                      <motion.div
                        animate={{
                          color: isActive ? '#003399' : 'rgba(11,27,43,0.45)',
                          x: isActive ? 6 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="font-display text-lg md:text-xl font-bold leading-tight"
                      >
                        {s.title}
                      </motion.div>
                    </div>
                    <motion.span
                      animate={{
                        opacity: isActive ? 1 : 0,
                        x: isActive ? 0 : -8,
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-brand-cyan shrink-0"
                    >
                      <ArrowRight size={18} className="stroke-[2.5]" />
                    </motion.span>
                  </div>

                  {/* Horizontal dividers — fixed underline tracking to display brand-cyan on action */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-brand-line" />
                  <motion.div
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-cyan origin-left"
                  />
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}