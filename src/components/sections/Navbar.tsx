'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'E-Commerce', href: '#ecommerce' },
  { label: 'HR Solutions', href: '#hr' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Clients', href: '#clients' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Color tokens flip when scrolling onto the light body background
  const wordmarkClr = scrolled ? 'text-brand-navy' : 'text-white'
  const subClr = scrolled ? 'text-brand-muted' : 'text-brand-cyan'
  const linkClr = scrolled
    ? 'text-brand-navy/70 hover:text-brand-blue font-semibold'
    : 'text-white/80 hover:text-white font-medium'
  const iconClr = scrolled ? 'text-brand-navy' : 'text-white'

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-brand-line shadow-md py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo Branding — Enlarged & Highly Legible */}
          <a href="#" className="flex items-center gap-3.5 group shrink-0">
            <div className="w-12 h-12 md:w-14 md:h-14 overflow-hidden rounded-md bg-white p-0.5 transition-transform duration-300 group-hover:scale-105 shadow-sm">
              <Image
                src="/images/logo.jpeg"
                alt="Atya Ebiz Solutions"
                width={56}
                height={56}
                priority
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-display font-800 text-xl md:text-2xl tracking-wide leading-none transition-colors duration-300 ${wordmarkClr}`}>
                Atya
              </span>
              <span className={`text-[10px] md:text-xs font-body font-700 tracking-[0.18em] uppercase transition-colors duration-300 mt-1 leading-none ${subClr}`}>
                Ebiz Solutions
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-body text-[15px] transition-colors duration-200 relative group py-1 ${linkClr}`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-cyan group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue-dark to-brand-blue-light text-white font-body font-600 text-sm tracking-wide shadow-md shadow-brand-blue/20 hover:opacity-95 hover:shadow-lg transition-all duration-200"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-300 focus:outline-none z-50 ${
              menuOpen ? 'text-white' : iconClr
            }`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Navigation Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            /* OPTIMIZED: Changed pt-32 to pt-24. This pulls "About" up slightly higher for a clean, non-overlapping gap */
            className="fixed inset-0 z-40 bg-brand-navy flex flex-col justify-start px-6 pt-24 pb-8 lg:hidden overflow-y-auto"
          >
            {/* Subtle radial ambient shine inside mobile drawer view */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(6,182,212,0.08),transparent_65%)] pointer-events-none" />

            {/* Links Block — Pure padding alignment, entirely avoiding margin collisions */}
            <div className="flex flex-col gap-4 relative z-10 pt-0 text-center">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="font-display text-2xl font-bold text-white/95 hover:text-brand-cyan transition-colors py-2"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            
            {/* Action CTA Button Container */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="w-full relative z-10 mt-8 pb-4"
            >
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center py-4 rounded-xl bg-gradient-to-r from-brand-blue-dark to-brand-blue-light text-white font-body font-semibold text-base shadow-xl shadow-brand-blue-dark/20 active:scale-[0.99] transition-transform"
              >
                Get Started
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}