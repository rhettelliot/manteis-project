'use client'

import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/motion'
import { releases } from '@/lib/releases'

export function KineticMarquee() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

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

  const titles = releases.map((r) => r.title)
  const items = titles.map((term, i) => (
    <span
      key={`${term}-${i}`}
      className="inline-flex items-center gap-6 md:gap-10 mx-6 md:mx-10 font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] text-transparent cursor-default transition-all duration-300 hover:text-signal"
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="kinetic-marquee"
        style={{
          animationPlayState: hovered ? 'paused' : 'running',
          animationDuration: hovered ? '60s' : '28s',
        }}
      >
        {items}
        {items}
        {items}
        {items}
      </div>
    </div>
  )
}
