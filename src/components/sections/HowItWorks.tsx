'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const steps = [
  { number: '01', title: 'Onboarding & Setup', desc: 'Onboard products to marketplaces; set up SKUs and listings.' },
  { number: '02', title: 'Inventory Intake', desc: 'Ship inventory to our warehouse; we receive and inspect.' },
  { number: '03', title: 'Order Processing', desc: 'Pick, pack, label, and dispatch every incoming order.' },
  { number: '04', title: 'Logistics Management', desc: 'Courier integration, shipment tracking, returns.' },
  { number: '05', title: 'Reporting & Insights', desc: 'Periodic reports on stock, sales, returns, replenishment.' },
  { number: '06', title: 'Scale Together', desc: 'Infrastructure scales as your order volume grows.' },
]

const HIGHLIGHT_DURATION_MS = 1300
const PATH_DRAW_DELAY_MS = 2200

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeStep, setActiveStep] = useState<number>(-1)

  useEffect(() => {
    if (!isInView) return

    let intervalId: ReturnType<typeof setInterval> | undefined

    const startDelay = setTimeout(() => {
      let i = 0
      setActiveStep(0)
      intervalId = setInterval(() => {
        i = (i + 1) % steps.length
        setActiveStep(i)
      }, HIGHLIGHT_DURATION_MS)
    }, PATH_DRAW_DELAY_MS)

    return () => {
      clearTimeout(startDelay)
      if (intervalId !== undefined) clearInterval(intervalId)
    }
  }, [isInView])

  return (
    <section id="how-it-works" ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-b from-brand-cream to-white">
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-brand-orange" />
          <span className="text-brand-orange text-sm font-body tracking-widest uppercase font-medium">Our Fulfilment Process</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-700 leading-tight mb-20 max-w-xl text-brand-navy"
        >
          Six steps from{' '}
          <span className="text-brand-orange">onboarding to dispatch.</span>
        </motion.h2>

        {/* Desktop: horizontal workflow with sequential step highlight */}
        <div className="hidden md:block relative">
          {/* Dashed line behind nodes — static after initial draw */}
          <div className="absolute top-0 left-0 right-0 h-20 flex items-center pointer-events-none">
            <svg className="w-full" viewBox="0 0 100 6" preserveAspectRatio="none">
              <motion.path
                d="M 4 3 L 96 3"
                stroke="#F26B1F"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeLinecap="round"
                fill="none"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0.5 }}
                animate={isInView ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0 }}
                transition={{ pathLength: { duration: 2, ease: 'easeInOut' } }}
              />
            </svg>
          </div>

          <div className="grid grid-cols-6 gap-4 relative">
            {steps.map((step, i) => {
              const isActive = activeStep === i
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20, scale: 0.85 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.3 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{
                      backgroundColor: isActive ? '#F26B1F' : '#0B1B2B',
                      scale: isActive ? 1.12 : 1,
                      boxShadow: isActive
                        ? '0 0 0 6px rgba(242, 107, 31, 0.12), 0 10px 28px -6px rgba(242, 107, 31, 0.5)'
                        : '0 4px 24px -8px rgba(11, 27, 43, 0.08)',
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="relative w-20 h-20 mx-auto mb-6 rounded-full text-white flex items-center justify-center font-display text-2xl font-extrabold border-4 border-white z-10"
                  >
                    {step.number}
                  </motion.div>
                  <motion.h3
                    animate={{ color: isActive ? '#C8501A' : '#0B1B2B' }}
                    transition={{ duration: 0.4 }}
                    className="font-display text-base font-600 mb-2 leading-tight"
                  >
                    {step.title}
                  </motion.h3>
                  <p className="font-body text-xs text-brand-muted leading-relaxed">{step.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile: vertical workflow with same active-step highlight */}
        <div className="md:hidden space-y-0">
          {steps.map((step, i) => {
            const isActive = activeStep === i
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5"
              >
                <div className="flex flex-col items-center shrink-0">
                  <motion.div
                    animate={{
                      backgroundColor: isActive ? '#F26B1F' : '#0B1B2B',
                      scale: isActive ? 1.1 : 1,
                      boxShadow: isActive
                        ? '0 0 0 4px rgba(242, 107, 31, 0.12), 0 6px 20px -4px rgba(242, 107, 31, 0.45)'
                        : '0 4px 12px -4px rgba(11, 27, 43, 0.08)',
                    }}
                    transition={{ duration: 0.4 }}
                    className="w-14 h-14 rounded-full text-white flex items-center justify-center font-display text-lg font-extrabold border-2 border-white"
                  >
                    {step.number}
                  </motion.div>
                  {i < steps.length - 1 && (
                    <div
                      className="w-px flex-1 min-h-12 mt-2"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(to bottom, #F26B1F 0, #F26B1F 4px, transparent 4px, transparent 8px)',
                      }}
                    />
                  )}
                </div>
                <div className="flex-1 pt-2 pb-8">
                  <motion.h3
                    animate={{ color: isActive ? '#C8501A' : '#0B1B2B' }}
                    transition={{ duration: 0.4 }}
                    className="font-display text-lg font-600 mb-2"
                  >
                    {step.title}
                  </motion.h3>
                  <p className="font-body text-sm text-brand-muted leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
