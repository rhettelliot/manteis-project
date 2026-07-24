'use client'

import { useEffect, useState } from 'react'
import { Gatekeeper } from '@/components/layout/Gatekeeper'
import { Navigation } from '@/components/layout/Navigation'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { FloatingParticles } from '@/components/animation/FloatingParticles'
import { ScrollProgressPath } from '@/components/animation/ScrollProgressPath'
import { Hero } from '@/components/animation/Hero'
import { Discography } from '@/components/sections/Discography'
import { SignalData } from '@/components/sections/SignalData'
import { Statement } from '@/components/sections/Statement'
import { CTASection } from '@/components/ui/CTASection'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    // Check if user already entered in this session
    const wasEntered = sessionStorage.getItem('tmp-entered') === 'true'
    setEntered(wasEntered)

    // Listen for the gatekeeper to finish
    const handleEnter = () => {
      sessionStorage.setItem('tmp-entered', 'true')
      setEntered(true)
    }

    window.addEventListener('tmp-enter', handleEnter)
    return () => window.removeEventListener('tmp-enter', handleEnter)
  }, [])

  return (
    <>
      <Gatekeeper />
      {entered && (
        <SmoothScroll>
          <FloatingParticles />
          <ScrollProgressPath />
          <header>
            <Navigation />
          </header>
          <main id="main-content" tabIndex={-1}>
            <Hero />
            <SignalData />
            <Discography />
            <Statement />
            <CTASection />
          </main>
          <Footer />
        </SmoothScroll>
      )}
    </>
  )
}