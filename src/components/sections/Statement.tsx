'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.manifesto-line').forEach((line, i) => {
        gsap.from(line, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 88%',
            once: true,
          },
          delay: i * 0.04,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="statement" className="py-32 md:py-48">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="section-label mb-20">Statement /</div>

        <div className="space-y-6 md:space-y-8">
          {manifesto.map((line, i) => (
            <p
              key={i}
              className={`manifesto-line font-display text-2xl md:text-4xl lg:text-5xl leading-[1.15] tracking-[-0.02em] ${
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
        <div className="mt-16 signal-line w-32" />
      </div>
    </section>
  )
}