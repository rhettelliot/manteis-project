'use client'

import { useEffect, useState } from 'react'
import { Gatekeeper } from '@/components/layout/Gatekeeper'
import { Navigation } from '@/components/layout/Navigation'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { ParticleVortex } from '@/components/animation/ParticleVortex'
import { FloatingParticles } from '@/components/animation/FloatingParticles'
import { ScrollProgressPath } from '@/components/animation/ScrollProgressPath'
import { ScrollStrobe } from '@/components/animation/ScrollStrobe'
import { DepthFog, MistReveal } from '@/components/animation/DepthFog'
import { KineticMarquee } from '@/components/animation/KineticMarquee'
import { ChromaGrid } from '@/components/animation/ChromaGrid'
import { CurtainReveal } from '@/components/animation/CurtainReveal'
import { Hero } from '@/components/animation/Hero'
import { SignalData } from '@/components/sections/SignalData'
import { StickyReleaseStack } from '@/components/sections/StickyReleaseStack'
import { Statement } from '@/components/sections/Statement'
import { CTASection } from '@/components/ui/CTASection'
import { Footer } from '@/components/layout/Footer'
import { releases } from '@/lib/releases'

export default function Home() {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const wasEntered = sessionStorage.getItem('tmp-entered') === 'true'
    setEntered(wasEntered)

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
          <ParticleVortex />
          <FloatingParticles />
          <ScrollStrobe />
          <ScrollProgressPath />
          <header>
            <Navigation />
          </header>
          <main id="main-content" tabIndex={-1}>
            <Hero />

            <section className="relative" aria-hidden="true">
              <DepthFog />
              <MistReveal />
            </section>

            <CurtainReveal id="signal" ariaLabel="Signal data" className="relative">
              <SignalData />
            </CurtainReveal>

            <CurtainReveal id="discography" ariaLabel="Discography" className="relative py-24 md:py-32" delay={100}>
              <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24">
                  <div>
                    <div className="section-label mb-4">Releases /</div>
                    <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[0.9]">
                      Signal
                      <span className="text-signal"> Architecture</span>
                    </h2>
                  </div>
                  <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-light-muted mt-4 md:mt-0 md:text-right max-w-xs">
                    Four transmissions from the Manteis Project frequency range
                  </p>
                </div>

                <StickyReleaseStack releases={releases} />
              </div>
            </CurtainReveal>

            <KineticMarquee />

            <section className="relative py-24 md:py-32" aria-hidden="true">
              <div className="max-w-4xl mx-auto px-6 md:px-12">
                <ChromaGrid />
              </div>
            </section>

            <CurtainReveal id="statement" ariaLabel="Statement" className="relative">
              <Statement />
            </CurtainReveal>

            <CurtainReveal className="relative" delay={150}>
              <CTASection />
            </CurtainReveal>
          </main>

          <CurtainReveal className="relative" delay={200}>
            <Footer />
          </CurtainReveal>
        </SmoothScroll>
      )}
    </>
  )
}
