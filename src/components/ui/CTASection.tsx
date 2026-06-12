'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 md:py-48">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <div className="cta-content">
          {/* Signal icon */}
          <div className="flex items-end justify-center gap-[2px] mb-8 h-8">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="w-[2px] rounded-full"
                style={{
                  height: `${6 + Math.abs(Math.sin(i * 0.5)) * 22}px`,
                  backgroundColor: i % 3 === 0 ? 'var(--amber)' : 'var(--signal)',
                  opacity: 0.6 + (i % 3) * 0.15,
                }}
              />
            ))}
          </div>

          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.05]">
            Transmit your signal.
          </h2>
          <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-light-muted mt-4">
            Manteis Recordings accepts demos from artists pushing into uncharted frequency
          </p>

          <div className="mt-10">
            <a
              href="mailto:demo@manteisrecordings.com"
              className="inline-block font-mono text-[11px] tracking-[0.2em] uppercase px-8 py-4 border border-signal text-signal btn-snap hover:bg-signal hover:text-void transition-colors duration-300"
            >
              Submit Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
