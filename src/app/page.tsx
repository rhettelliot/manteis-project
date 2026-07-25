'use client'

import { Navigation } from '@/components/layout/Navigation'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { KineticMarquee } from '@/components/animation/KineticMarquee'
import { Hero } from '@/components/animation/Hero'
import { SignalData } from '@/components/sections/SignalData'
import { StickyReleaseStack } from '@/components/sections/StickyReleaseStack'
import { Statement } from '@/components/sections/Statement'
import { CTASection } from '@/components/ui/CTASection'
import { Footer } from '@/components/layout/Footer'
import { releases } from '@/lib/releases'

export default function Home() {
  return (
    <SmoothScroll>
      <header>
        <Navigation />
      </header>
      <main id="main-content" tabIndex={-1}>
        <Hero />

        <SignalData />

        <section id="discography" className="relative py-24 md:py-32" aria-label="Discography">
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
        </section>

        <KineticMarquee />

        <Statement />

        <CTASection />
      </main>

      <Footer />
    </SmoothScroll>
  )
}
