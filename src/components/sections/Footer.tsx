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
    { label: 'Locations', href: '#locations' },
  ],
  Contact: [
    { label: 'info@atyaebizsolutions.com', href: 'mailto:info@atyaebizsolutions.com' },
    { label: 'atyaebiz@gmail.com', href: 'mailto:atyaebiz@gmail.com' },
    { label: '+91 75440 00929', href: 'tel:+917544000929' },
    { label: '+91 93414 56513', href: 'tel:+919341456513' },
    { label: '+91 80735 16150', href: 'tel:+918073516150' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative bg-brand-navy text-white pt-16 pb-8 overflow-hidden">
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-brand-orange/8 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-lg overflow-hidden border border-white/15 bg-white">
                <Image src="/images/logo.jpeg" alt="Atya" width={44} height={44} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-display font-700 text-white text-lg leading-none block">Atya</span>
                <span className="text-white/50 text-xs font-body tracking-widest uppercase">Ebiz Solutions</span>
              </div>
            </div>
            <p className="font-body text-white/60 text-sm leading-relaxed mb-6">
              Your trusted back-end operations partner for e-commerce and HR — enabling you to scale without the complexity.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="font-display text-sm font-600 text-white uppercase tracking-widest mb-5">{section}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.href + item.label}>
                    <a
                      href={item.href}
                      className="font-body text-white/55 text-sm hover:text-brand-orange-light transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-white/40 text-xs">
            © {new Date().getFullYear()} Atya Ebiz Solutions LLP. All rights reserved.
          </p>
          <p className="font-body text-white/40 text-xs">
            Bengaluru • Gurugram • India
          </p>
        </div>
      </div>
    </footer>
  )
}
