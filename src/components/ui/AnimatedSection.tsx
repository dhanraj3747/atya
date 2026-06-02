'use client'

import { useRef, ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function AnimatedSection({ children, className = '', delay = 0 }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
