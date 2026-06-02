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

  // Color tokens flip when scrolling onto the cream body background
  const wordmarkClr = scrolled ? 'text-brand-navy' : 'text-white'
  const subClr = scrolled ? 'text-brand-muted' : 'text-white/60'
  const linkClr = scrolled
    ? 'text-brand-navy/70 hover:text-brand-navy'
    : 'text-white/75 hover:text-white'
  const iconClr = scrolled ? 'text-brand-navy' : 'text-white'

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-brand-line shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-lg overflow-hidden border border-white/20 bg-white shrink-0">
              <Image
                src="/images/logo.jpeg"
                alt="Atya Ebiz Solutions"
                width={44}
                height={44}
                priority
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className={`font-display font-700 text-lg leading-none block transition-colors duration-300 ${wordmarkClr}`}>Atya</span>
              <span className={`text-xs font-body tracking-widest uppercase transition-colors duration-300 ${subClr}`}>Ebiz Solutions</span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-body text-sm transition-colors duration-200 relative group ${linkClr}`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-orange group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl bg-brand-orange text-white font-body font-500 text-sm hover:bg-brand-orange-dark transition-all duration-200"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden p-2 transition-colors duration-300 ${iconClr}`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-brand-cream flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 text-brand-navy">
              <X size={28} />
            </button>
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="font-display text-3xl font-700 text-brand-navy/80 hover:text-brand-navy transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-4 px-8 py-3 rounded-xl bg-brand-orange text-white font-body font-500"
            >
              Get Started
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
