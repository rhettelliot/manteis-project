'use client'

import { useEffect, useRef } from 'react'
import { revealOnEnter } from '@/lib/reveal'

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const disposers: Array<() => void> = []
    ;(async () => {
      disposers.push(await revealOnEnter(root.querySelectorAll('.cta-content'), { y: 40, duration: 0.8 }))
    })()
    return () => disposers.forEach((d) => d())
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
