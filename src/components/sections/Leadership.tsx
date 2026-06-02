'use client'

import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const directors = [
  {
    name: 'Akhil Raina',
    initials: 'AR',
    role: 'Founder Director',
    accent: 'orange' as const,
    bio: [
      'Akhil Raina is a seasoned e-commerce and category management leader with over 14 years of experience across marketplaces, digital commerce, category growth, and strategic partnerships — bringing deep expertise in building scalable e-commerce businesses and driving operational excellence.',
      'Previously, Akhil held high-impact roles at Flipkart, HomeLane, ShopX, and other digital-first consumer brands, where he led marketplace expansion across Blinkit, Zepto, BigBasket, and Instamart, strengthening supply chain efficiency and category P&L performance.',
      'At Atya, he is focused on building the warehousing, fulfilment, and e-commerce operations engine — with a vision of creating technology-driven, process-oriented business solutions for manufacturers, brands, and emerging businesses across India.',
    ],
  },
  {
    name: 'Amarnath Rao',
    initials: 'AM',
    role: 'Director',
    accent: 'navy' as const,
    bio: [
      'Amarnath Rao brings over 25 years of professional experience across telecom, utilities, BPO, infrastructure, FMCG, and supply chain management — combining deep operational expertise with strategic leadership across large-scale billing, collections, and warehouse coordination functions.',
      'He has worked with leading organizations including Tata Steel Utilities & Infrastructure Services, Bharti Airtel, Dell International Services, and Siemens Energy Services, where he led ISO-certified process design, SAP implementations, and high-value utility billing operations.',
      'At Atya, he is driving the company’s expansion in warehousing, logistics, fulfilment, and HR services — with a focus on building a reliable, scalable business ecosystem grounded in operational discipline and customer-centric delivery.',
    ],
  },
  {
    name: 'Ajay Vasant Takle',
    initials: 'AT',
    role: 'COO — HR Services',
    accent: 'orange' as const,
    bio: [
      'Ajay Vasant Takle is a seasoned HR, Administration, and Operations leader with nearly three decades of cross-industry experience spanning IT Services, Manufacturing, FMCG, Infrastructure, and Real Estate — with a track record of building and scaling HR functions from the ground up.',
      'In prior senior leadership roles, Ajay led HR digitalization, talent acquisition, compensation structuring, compliance, and multi-location administration — partnering directly with promoters and CXOs to align workforce strategy with commercial priorities.',
      'At Atya, he leads HR consulting, recruitment, and workforce planning — helping start-ups, D2C brands, and growing organizations establish structured hiring, performance frameworks, and people operations that scale with the business.',
    ],
  },
]

export default function Leadership() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [hasSwiped, setHasSwiped] = useState(false)

  const goTo = (next: number) => {
    setDirection(next > activeIndex ? 1 : -1)
    setActiveIndex((next + directors.length) % directors.length)
  }
  const next = () => goTo(activeIndex + 1)
  const prev = () => goTo(activeIndex - 1)

  const handleSwipeEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    if (info.offset.x < -60 || info.velocity.x < -500) {
      next()
      setHasSwiped(true)
    } else if (info.offset.x > 60 || info.velocity.x > 500) {
      prev()
      setHasSwiped(true)
    }
  }

  const director = directors[activeIndex]

  return (
    <section id="leadership" ref={ref} className="relative py-32 overflow-hidden bg-white">
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-brand-orange" />
          <span className="text-brand-orange text-sm font-body tracking-widest uppercase font-medium">Leadership</span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-700 leading-tight max-w-2xl text-brand-navy"
          >
            The team{' '}
            <span className="text-brand-orange">building Atya.</span>
          </motion.h2>

          {/* Counter + arrows on the same row as the heading — desktop only (mobile uses swipe + dots) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center gap-4"
          >
            <span className="font-display text-sm text-brand-muted tracking-widest">
              <span className="text-brand-navy font-700">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="mx-2 text-brand-line">/</span>
              {String(directors.length).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                aria-label="Previous leader"
                className="w-11 h-11 rounded-full border border-brand-line bg-white text-brand-navy flex items-center justify-center hover:bg-brand-navy hover:text-white hover:border-brand-navy transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                aria-label="Next leader"
                className="w-11 h-11 rounded-full border border-brand-line bg-brand-navy text-white flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Card stage */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.article
              key={director.name}
              custom={direction}
              initial={{ opacity: 0, x: direction === 0 ? 0 : direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={handleSwipeEnd}
              className="relative grid md:grid-cols-12 gap-10 p-8 md:p-12 rounded-3xl border border-brand-line bg-gradient-to-br from-white via-white to-brand-cream/60 shadow-card overflow-hidden touch-pan-y"
            >
              {/* Decorative blob accent */}
              <div
                className={`absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none ${
                  director.accent === 'orange' ? 'bg-brand-orange/15' : 'bg-brand-navy/15'
                }`}
              />

              {/* Portrait + name block */}
              <div className="relative md:col-span-4 flex md:flex-col items-start gap-6">
                <div
                  className={`shrink-0 w-24 h-24 md:w-36 md:h-36 rounded-2xl flex items-center justify-center text-white font-display text-3xl md:text-5xl font-extrabold tracking-tight shadow-lg ${
                    director.accent === 'orange'
                      ? 'bg-gradient-to-br from-brand-orange to-brand-orange-dark shadow-brand-orange/30'
                      : 'bg-gradient-to-br from-brand-navy to-brand-navy-dark shadow-brand-navy/30'
                  }`}
                >
                  {director.initials}
                </div>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-700 text-brand-navy leading-tight">
                    {director.name}
                  </h3>
                  <p className="font-body text-brand-orange-dark text-xs mt-2 font-medium uppercase tracking-widest">
                    {director.role}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <div className="relative md:col-span-8 space-y-4">
                {director.bio.map((paragraph, j) => (
                  <p
                    key={j}
                    className={`font-body leading-relaxed ${
                      j === 0 ? 'text-base text-brand-ink' : 'text-sm text-brand-muted'
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.article>
          </AnimatePresence>

          {/* Pagination dots — desktop only (mobile uses swipe + hint) */}
          <div className="hidden md:flex justify-center gap-2 mt-8">
            {directors.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Show leader ${i + 1} of ${directors.length}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i ? 'w-10 bg-brand-orange' : 'w-3 bg-brand-line hover:bg-brand-muted/40'
                }`}
              />
            ))}
          </div>

          {/* Mobile swipe hint — fades after first swipe */}
          <AnimatePresence>
            {!hasSwiped && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.4 }}
                className="md:hidden mt-5 flex items-center justify-center gap-3 text-brand-muted"
              >
                <motion.span
                  animate={{ x: [-4, 0, -4] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-brand-orange"
                >
                  ←
                </motion.span>
                <span className="font-body text-xs uppercase tracking-widest font-medium">
                  Swipe to explore
                </span>
                <motion.span
                  animate={{ x: [4, 0, 4] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-brand-orange"
                >
                  →
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
