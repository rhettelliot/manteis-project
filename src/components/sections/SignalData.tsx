'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const frequencies = [
  { label: '440', value: 440, unit: 'Hz', color: '#007AFF' },
  { label: '60', value: 60, unit: 'BPM', color: '#E5A00B' },
  { label: '4', value: 4, unit: 'RELEASES', color: '#007AFF' },
  { label: '∞', value: 0, unit: 'SIGNALS', color: '#E5A00B' },
]

export function SignalData() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.data-cell', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
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
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-edge-faint">
          {frequencies.map((freq) => (
            <div
              key={freq.label}
              className="data-cell bg-void p-6 md:p-10 flex flex-col items-center justify-center text-center"
            >
              <div
                className="font-mono text-4xl md:text-5xl font-bold tracking-[-0.03em]"
                style={{ color: freq.color }}
              >
                {freq.label}
              </div>
              <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-light-muted mt-2">
                {freq.unit}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}