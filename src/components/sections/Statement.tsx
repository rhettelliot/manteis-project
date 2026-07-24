'use client'

import { useEffect, useRef } from 'react'
import { revealOnEnter } from '@/lib/reveal'
import { releases } from '@/lib/releases'

const manifesto = [
  'Sound is architecture.',
  'Frequencies are blueprints for worlds.',
  'Ambient is not background — it is foundation.',
  'Every signal carries a structure.',
  'We process the noise into form.',
  'The Manteis Project is the intersection',
  'of data, frequency, and presence.',
]

export function Statement() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const disposers: Array<() => void> = []
    ;(async () => {
      disposers.push(await revealOnEnter(root.querySelectorAll('.manifesto-line'), { y: 40, duration: 0.7, stagger: 0.04 }))
      disposers.push(await revealOnEnter(root.querySelectorAll('.statement-end'), { y: 24, duration: 0.6 }))
    })()
    return () => disposers.forEach((d) => d())
  }, [])

  return (
    <section ref={sectionRef} id="statement" className="relative py-32 md:py-48">
      {/* Parallel line pattern overlay */}
      <div className="parallel-lines absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <div className="section-label mb-20">Statement /</div>

        <div className="space-y-6 md:space-y-8">
          {manifesto.map((line, i) => (
            <p
              key={i}
              className={`manifesto-line font-display text-2xl md:text-4xl lg:text-5xl leading-[1.15] tracking-[-0.02em] ${
                i === manifesto.length - 1
                  ? 'font-bold text-signal'
                  : i === manifesto.length - 2
                    ? 'text-cream-dim'
                    : 'text-cream'
              }`}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Technical metadata strip */}
        <div className="statement-end mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {releases.map((r) => (
            <div key={r.id} className="mono-strip">
              <span className="block text-cream-muted">{r.catalogNumber}</span>
              <span className="block text-cream-dim">{r.frequency} · {r.duration}</span>
            </div>
          ))}
        </div>

        {/* Closing signal line */}
        <div className="statement-end mt-16 signal-line w-32" />
      </div>
    </section>
  )
}
