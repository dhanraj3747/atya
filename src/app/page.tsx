'use client'

import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import StatsRow from '@/components/sections/StatsRow'
import WhoWeAre from '@/components/sections/WhoWeAre'
import EcommerceServices from '@/components/sections/EcommerceServices'
import HRServices from '@/components/sections/HRServices'
import WhyUs from '@/components/sections/WhyUs'
import Clients from '@/components/sections/Clients'
import Leadership from '@/components/sections/Leadership'
import Locations from '@/components/sections/Locations'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <StatsRow />
      <WhoWeAre />
      <EcommerceServices />
      <HRServices />
      <WhyUs />
      <Clients />
      <Leadership />
      <Locations />
      <Contact />
      <Footer />
    </main>
  )
}
