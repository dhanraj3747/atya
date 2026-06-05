'use client'

import Image from 'next/image'

const links = {
  Services: [
    { label: 'E-Commerce Onboarding', href: '#ecommerce' },
    { label: 'Warehousing', href: '#ecommerce' },
    { label: 'Order Fulfilment', href: '#ecommerce' },
    { label: 'HR Recruitment', href: '#hr' },
    { label: 'HR Operations', href: '#hr' },
  ],
  Company: [
    { label: 'About Us', href: '#about' },
    { label: 'How It Works', href: '#ecommerce' },
    { label: 'Why Partner With Us', href: '#why-us' },
    { label: 'Clients', href: '#clients' },
    { label: 'Locations', href: '#locations' },
  ],
  Contact: [
    { label: 'info@atyaebizsolutions.com', href: 'mailto:info@atyaebizsolutions.com' },
    { label: 'atyaebiz@gmail.com', href: 'mailto:atyaebiz@gmail.com' },
    { label: '+91 75440 00829', href: 'tel:+917544000829' },
    { label: '+91 93414 56513', href: 'tel:+919341456513' },
    { label: '+91 80735 16150', href: 'tel:+918073516150' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative bg-brand-navy text-white pt-16 pb-8 overflow-hidden">
      {/* Brand Alignment background glow */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/15 bg-white p-1.5 shadow-md shrink-0">
                <Image 
                  src="/images/logo.jpeg" 
                  alt="Atya Logo" 
                  width={56} 
                  height={56} 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-display font-700 text-white text-xl leading-none block tracking-wide">Atya</span>
                <span className="text-white/50 text-[11px] font-body tracking-widest uppercase block mt-1">Ebiz Solutions</span>
              </div>
            </div>
            
            {/* Tagline: Balanced combination mimicking the hero headline gradient */}
            <p className="font-body text-base font-600 text-white leading-snug mb-3">
              From warehouse to workforce,<br /> 
              <span className="bg-gradient-to-r from-brand-blue-light via-brand-cyan to-white bg-clip-text text-transparent font-700">
                we enable your growth!
              </span>
            </p>
            
            {/* Description Subtext */}
            <p className="font-body text-white/60 text-sm leading-relaxed">
              Your trusted back-end operations partner for e-commerce and HR solutions, enabling you to scale without the complexity.
            </p>
          </div>

          {/* Links Configuration */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="font-display text-sm font-600 text-white uppercase tracking-widest mb-5">{section}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.href + item.label}>
                    <a
                      href={item.href}
                      className="font-body text-white/55 text-sm hover:text-brand-sky transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-white/40 text-xs">
            © {new Date().getFullYear()} Atya Ebiz Solutions LLP. All rights reserved.
          </p>
          <p className="font-body text-white/40 text-xs tracking-wide">
            Bengaluru • Gurugram • India
          </p>
        </div>
      </div>
    </footer>
  )
}