'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Send, CheckCircle, ChevronDown, Check } from 'lucide-react'

type FormData = {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}

const serviceOptions = [
  {
    value: 'ecommerce',
    label: 'E-Commerce Solutions',
    desc: 'Marketplace, warehousing & fulfilment',
  },
  {
    value: 'hr',
    label: 'HR Solutions',
    desc: 'Recruitment & employee lifecycle',
  },
  {
    value: 'both',
    label: 'Both',
    desc: 'Full back-end operations partner',
  },
]

function ServiceSelect({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const selected = serviceOptions.find((o) => o.value === value)

  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onEsc)
    }
  }, [open])

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-3 bg-brand-cream/50 border rounded-xl px-3 py-2.5 font-body text-sm transition-all ${
          open
            ? 'border-brand-orange shadow-[0_0_0_3px_rgba(242,107,31,0.10)]'
            : 'border-brand-line hover:border-brand-orange/40'
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex flex-col items-start gap-0.5 min-w-0 py-0.5">
          {selected ? (
            <>
              <span className="font-display text-sm font-700 text-brand-navy leading-tight truncate">
                {selected.label}
              </span>
              <span className="text-[11px] text-brand-muted leading-tight truncate">
                {selected.desc}
              </span>
            </>
          ) : (
            <span className="text-brand-muted/80">Select a service</span>
          )}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
          className="shrink-0"
        >
          <ChevronDown size={18} className="text-brand-muted" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute z-30 left-0 right-0 mt-2 bg-white border border-brand-line rounded-xl shadow-[0_18px_40px_-12px_rgba(11,27,43,0.18)] overflow-hidden"
            role="listbox"
          >
            {serviceOptions.map((opt, i) => {
              const isActive = opt.value === value
              return (
                <motion.button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value)
                    setOpen(false)
                  }}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.25 }}
                  role="option"
                  aria-selected={isActive}
                  className={`group w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    isActive ? 'bg-brand-orange/8' : 'hover:bg-brand-cream'
                  }`}
                >
                  <span className="flex-1 min-w-0">
                    <div
                      className={`font-display text-sm font-700 leading-tight ${
                        isActive ? 'text-brand-orange-dark' : 'text-brand-navy'
                      }`}
                    >
                      {opt.label}
                    </div>
                    <div className="text-xs text-brand-muted mt-0.5 leading-tight">
                      {opt.desc}
                    </div>
                  </span>
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isActive
                        ? 'bg-brand-orange text-white scale-100'
                        : 'bg-transparent text-transparent scale-75 border border-brand-line'
                    }`}
                  >
                    <Check size={12} strokeWidth={3} />
                  </span>
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ defaultValues: { service: '' } })

  const onSubmit = async (data: FormData) => {
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error || 'Failed to submit')
      }
      setSubmitted(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? `${err.message} You can also reach us at info@atyaebizsolutions.com.`
          : 'Something went wrong. Please email info@atyaebizsolutions.com directly.'
      )
    }
  }

  return (
    <section id="contact" ref={ref} className="relative py-32 overflow-hidden bg-white">
      <div className="absolute left-1/2 top-1/4 -translate-x-1/2 w-96 h-96 bg-brand-orange/6 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-brand-orange" />
          <span className="text-brand-orange text-sm font-body tracking-widest uppercase font-medium">Get In Touch</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-700 leading-tight mb-6 text-brand-navy"
            >
              Ready to scale?{' '}
              <span className="text-brand-orange">Let&rsquo;s talk.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-brand-muted leading-relaxed mb-10"
            >
              Tell us about your brand and what you need. We&rsquo;ll get back to you within 24 hours
              with a tailored plan to help you scale efficiently.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              {[
                { label: 'Email', value: 'info@atyaebizsolutions.com', href: 'mailto:info@atyaebizsolutions.com' },
                { label: '', value: 'atyaebiz@gmail.com', href: 'mailto:atyaebiz@gmail.com' },
                { label: 'Phone', value: '+91 75440 00929', href: 'tel:+917544000929' },
                { label: '', value: '+91 93414 56513', href: 'tel:+919341456513' },
                { label: '', value: '+91 80735 16150', href: 'tel:+918073516150' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="font-body text-brand-muted text-xs w-12 uppercase tracking-wider font-medium">{item.label}</span>
                  <a href={item.href} className="font-body text-brand-navy hover:text-brand-orange transition-colors text-sm">
                    {item.value}
                  </a>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative group"
          >
            {/* Iridescent halo — visible on hover */}
            <div className="pointer-events-none absolute -inset-[3px] rounded-[1.1rem] bg-[conic-gradient(from_120deg_at_50%_50%,#F26B1F,#F4B400,#9B59F5,#F58A4B,#F26B1F)] blur-[12px] opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
            {/* Sharper gradient border ring just behind the card */}
            <div className="pointer-events-none absolute -inset-px rounded-[1.1rem] bg-[conic-gradient(from_120deg_at_50%_50%,#F26B1F,#F4B400,#9B59F5,#F58A4B,#F26B1F)] opacity-0 group-hover:opacity-80 transition-opacity duration-500" />

            {submitted ? (
              <div className="relative card-paper rounded-2xl p-10 text-center">
                <CheckCircle size={48} className="text-brand-orange mx-auto mb-4" />
                <h3 className="font-display text-2xl font-700 text-brand-navy mb-3">Message Received!</h3>
                <p className="font-body text-brand-muted">We&rsquo;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="relative card-paper rounded-2xl p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-body text-xs text-brand-muted uppercase tracking-wider mb-2 block font-medium">Name *</label>
                    <input
                      {...register('name', { required: true })}
                      placeholder="Your name"
                      className={`w-full bg-brand-cream/50 border ${errors.name ? 'border-red-500/60' : 'border-brand-line'} rounded-xl px-4 py-3 font-body text-brand-navy text-sm placeholder-brand-muted/60 focus:outline-none focus:border-brand-orange transition-colors`}
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-brand-muted uppercase tracking-wider mb-2 block font-medium">Email *</label>
                    <input
                      {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                      placeholder="your@email.com"
                      className={`w-full bg-brand-cream/50 border ${errors.email ? 'border-red-500/60' : 'border-brand-line'} rounded-xl px-4 py-3 font-body text-brand-navy text-sm placeholder-brand-muted/60 focus:outline-none focus:border-brand-orange transition-colors`}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-body text-xs text-brand-muted uppercase tracking-wider mb-2 block font-medium">Phone</label>
                    <input
                      {...register('phone')}
                      placeholder="+91 00000 00000"
                      className="w-full bg-brand-cream/50 border border-brand-line rounded-xl px-4 py-3 font-body text-brand-navy text-sm placeholder-brand-muted/60 focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-brand-muted uppercase tracking-wider mb-2 block font-medium">Company</label>
                    <input
                      {...register('company')}
                      placeholder="Your brand / company"
                      className="w-full bg-brand-cream/50 border border-brand-line rounded-xl px-4 py-3 font-body text-brand-navy text-sm placeholder-brand-muted/60 focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-body text-xs text-brand-muted uppercase tracking-wider mb-2 block font-medium">Service Needed</label>
                  <Controller
                    control={control}
                    name="service"
                    render={({ field }) => (
                      <ServiceSelect value={field.value} onChange={field.onChange} />
                    )}
                  />
                </div>

                <div>
                  <label className="font-body text-xs text-brand-muted uppercase tracking-wider mb-2 block font-medium">Message</label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    placeholder="Tell us about your brand and what you need..."
                    className="w-full bg-brand-cream/50 border border-brand-line rounded-xl px-4 py-3 font-body text-brand-navy text-sm placeholder-brand-muted/60 focus:outline-none focus:border-brand-orange transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-brand-orange text-white font-body font-500 hover:bg-brand-orange-dark transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </button>

                {error && (
                  <p className="font-body text-red-500 text-sm leading-relaxed" role="alert">
                    {error}
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
