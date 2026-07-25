'use client'

import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

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
  const curtainRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setOpen(true)
      return
    }
    const root = sectionRef.current
    if (!root) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setOpen(true)
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.25, rootMargin: '-10% 0px -10% 0px' }
    )
    io.observe(root)
    return () => io.disconnect()
  }, [])

  // Stagger manifesto lines via CSS after curtain opens
  useEffect(() => {
    if (!open) return
    const root = sectionRef.current
    if (!root) return
    const lines = root.querySelectorAll('.manifesto-line')
    lines.forEach((line, i) => {
      ;(line as HTMLElement).style.transitionDelay = `${0.6 + i * 0.06}s`
    })
  }, [open])

  return (
    <section
      ref={sectionRef}
      id="statement"
      className="curtain-section relative py-32 md:py-48"
    >
      {/* Curtain panels */}
      <div
        ref={curtainRef}
        className={`curtain-panel curtain-panel-left ${open ? 'open' : ''}`}
        aria-hidden="true"
      />
      <div className={`curtain-panel ${open ? 'open' : ''}`} aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-20">
        <div className="section-label mb-20">Statement /</div>

        <div className="space-y-6 md:space-y-8">
          {manifesto.map((line, i) => (
            <p
              key={i}
              className={`manifesto-line font-display text-2xl md:text-4xl lg:text-5xl leading-[1.15] tracking-[-0.02em] transition-all duration-700 ease-out ${
                open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${
                i === manifesto.length - 1
                  ? 'font-bold text-signal'
                  : i === manifesto.length - 2
                    ? 'text-light-dim'
                    : 'text-light'
              }`}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Closing signal line */}
        <div className="statement-end mt-16 signal-line w-32" />
      </div>
    </section>
  )
}
