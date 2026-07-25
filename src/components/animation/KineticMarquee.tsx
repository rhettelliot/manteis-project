'use client'

import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

const TERMS = ['REVERB', 'DRONE', 'TEXTURE', 'ATMOSPHERE', 'QUANTUM', 'SIGNAL']

export function KineticMarquee() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const items = TERMS.map((term, i) => (
    <span
      key={`${term}-${i}`}
      className="inline-flex items-center gap-6 md:gap-10 mx-6 md:mx-10 font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] text-transparent"
      style={{
        WebkitTextStroke: '1px rgba(159, 103, 245, 0.55)',
      }}
    >
      {term}
      <span className="w-2 h-2 bg-signal/60 inline-block" aria-hidden="true" />
    </span>
  ))

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden py-12 md:py-20 border-y border-edge-faint transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}
      aria-hidden="true"
    >
      <div className="kinetic-marquee">
        {items}
        {items}
      </div>
    </div>
  )
}
