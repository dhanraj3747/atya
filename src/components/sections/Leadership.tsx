'use client'

import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const directors = [
  {
    name: 'Akhil Raina',
    initials: 'AR',
    role: 'Founder & Director',
    image: null,
    bio: [
      'Akhil Raina is a seasoned e-commerce and category management leader with over 14 years of extensive experience across marketplaces, digital commerce, category growth, business operations, and strategic partnerships. As Founder Director of Atya Ebiz Solutions LLP, he brings deep expertise in building scalable e-commerce businesses, driving operational excellence, and delivering sustainable revenue growth across multiple industry segments.',
      'Over the course of his professional journey, Akhil has successfully led high-impact roles with leading organizations including Flipkart, HomeLane, and ShopX, as well as digital-first consumer brands. His expertise spans category management, marketplace operations, P&L ownership, quick-commerce expansion, vendor management, demand forecasting, and strategic growth execution.',
      'Before joining Atya Ebiz Solutions LLP, Akhil played a pivotal role in scaling e-commerce businesses from early growth stages into high-performing revenue engines. He has successfully led marketplace expansion initiatives across platforms such as Blinkit, Zepto, bigbasket, and Instamart while strengthening supply chain efficiencies, improving fill rates, and driving customer-centric operational models.',
      'At Atya Ebiz Solutions LLP, Akhil is focused on strengthening the company’s warehousing, order fulfilment, e-commerce operations, and business expansion initiatives. His vision is centered around building technology-driven, process-oriented, and scalable business solutions that support manufacturers, brands, and emerging businesses across India.',
      'Known for his analytical mindset, leadership capabilities, and execution-focused approach, Akhil continues to play a key role in driving innovation, operational efficiency, and long-term business growth for the organization.',
    ],
  },
  {
    name: 'Amarnath Rao',
    initials: 'AM',
    role: 'Director',
    image: '/images/Amarnath.jpeg',
    bio: [
      'Amarnath Rao is the Director of Atya Ebiz Solutions LLP, a company focused on warehousing operations, order fulfilment, logistics coordination, and integrated business support services. With more than 25 years of professional experience across telecom, utilities, BPO, infrastructure, FMCG, finance operations, and supply chain management, he brings a strong combination of operational expertise and strategic leadership to the organization.',
      'Throughout his career, Amarnath Rao has successfully managed large-scale billing operations, customer relationship management, credit control, collections, warehouse coordination, and process optimization initiatives. His extensive industry exposure has enabled him to build efficient operational systems that improve productivity, service quality, and customer satisfaction.',
      'Before leading Atya Ebiz Solutions LLP, he worked with leading organizations including Tata Steel Utilities & Infrastructure Services Ltd, Bharti Airtel, Dell International Services, and Siemens Energy Services, where he handled critical functions related to utilities billing, SAP IS-U implementation, customer operations, collections management, and business excellence initiatives.',
      'He has played a key role in establishing ISO-certified operational processes, implementing SAP IS-U and SAP S/4HANA systems, and managing these high-value corporate portfolios. Known for his structured leadership style, he has consistently demonstrated strengths in team management, SOP development, performance improvement, and operational compliance.',
      'At Atya Ebiz Solutions LLP, he is actively driving the company’s expansion in warehousing, logistics support, fulfilment services, and HR solutions. His vision is to create a reliable and scalable business ecosystem that combines operational efficiency, technology-driven processes, and customer-centric service delivery.',
    ],
  },
  {
    name: 'Ajay Vasant Takle',
    initials: 'AT',
    role: 'COO — HR Services',
    image: '/images/Ajay-pp.jpg',
    bio: [
      'Ajay Vasant Takle is a seasoned Human Resources, Administration, and Operations leader with nearly three decades of cross-industry experience spanning IT Services, Manufacturing, FMCG, Infrastructure, Real Estate, and Business Operations. Over the course of his career, he has successfully built and scaled HR and operational functions from the ground up while driving organizational transformation, operational excellence, and people-centric growth strategies.',
      'As the COO – HR Services at Atya Ebiz Solutions LLP, Ajay leads the company’s HR consulting, recruitment, and workforce planning initiatives. He works closely with startups, B2C/D2C brands, SMEs, and growing organizations to help them establish scalable HR systems, structured hiring processes, performance management frameworks, and efficient people operations aligned with business growth objectives.',
      'Known for his practical leadership approach and strong execution capability, Ajay has led large-scale HR transformation initiatives including HR digitalization, policy governance, talent acquisition, compensation structuring, compliance management, employee engagement, and multi-location administration management. He has consistently partnered with promoters, CXOs, and business leaders to align workforce strategy with operational and commercial priorities.',
      'Prior to joining Atya Ebiz Solutions LLP, Ajay held senior leadership positions across leading organizations, where he managed end-to-end HR operations, administration, facilities management, compliance frameworks, vendor governance, and organizational capability development.',
      'With a strong blend of strategic HR leadership and operational management expertise, Ajay brings a solution-oriented and business-focused perspective to organizational growth. His vision is to help businesses build sustainable, process-driven, and high-performing work environments that support long-term scalability and operational excellence.',
      'At Atya, he leads HR consulting, recruitment, and workforce planning by helping startups, B2C/D2C brands, SMEs, and growing organizations establish structured hiring, performance frameworks, and people operations that scale with the business.',
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
        {/* Eyebrow Label — Line added back with brand-blue color to match Screenshot 2026-06-05 144759_4.png */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-brand-blue" />
          <span className="text-brand-blue text-xs md:text-sm font-body tracking-widest uppercase font-semibold">
            Leadership
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          {/* Headline — Restored color using the multi-toned system from Screenshot 2026-06-05 144759_4.png */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-700 leading-tight max-w-2xl text-brand-navy"
          >
            The team <span className="text-brand-blue">building</span> <span className="text-brand-sky">Atya.</span>
          </motion.h2>

          {/* Counter + arrows */}
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
                className="w-11 h-11 rounded-full border border-brand-line bg-brand-navy text-white flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition-colors"
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
              {/* Decorative background blob accent */}
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none bg-brand-blue/10" />

              {/* Portrait Image or Initial-block dynamic stage */}
              <div className="relative md:col-span-4 flex flex-row md:flex-col items-center md:items-stretch gap-6">
                <div className="relative shrink-0 w-24 h-24 md:w-full md:h-auto md:aspect-square rounded-2xl overflow-hidden shadow-lg">
                  {director.image ? (
                    <Image
                      src={director.image}
                      alt={director.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 96px, (max-width: 1200px) 300px, 400px"
                      priority
                    />
                  ) : (
                    /* Initials Fallback Block */
                    <div className="w-full h-full flex items-center justify-center text-white font-display text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-brand-blue to-brand-navy shadow-brand-blue/20">
                      {director.initials}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-700 text-brand-navy leading-tight">
                    {director.name}
                  </h3>
                  <p className="font-body text-brand-blue text-xs mt-2 font-semibold uppercase tracking-widest">
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

          {/* Pagination dots */}
          <div className="hidden md:flex justify-center gap-2 mt-8">
            {directors.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Show leader ${i + 1} of ${directors.length}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i ? 'w-10 bg-brand-blue' : 'w-3 bg-brand-line hover:bg-brand-muted/40'
                }`}
              />
            ))}
          </div>

          {/* Mobile swipe hint */}
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
                  className="text-brand-blue font-700"
                >
                  &larr;
                </motion.span>
                <span className="font-body text-xs uppercase tracking-widest font-medium">
                  Swipe to explore
                </span>
                <motion.span
                  animate={{ x: [4, 0, 4] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-brand-blue font-700"
                >
                  &rarr;
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}