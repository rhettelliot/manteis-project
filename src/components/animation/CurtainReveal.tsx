'use client'

import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

interface CurtainRevealProps {
  children: React.ReactNode
  className?: string
  id?: string
  ariaLabel?: string
  delay?: number
}

/**
 * Curtain reveal wrapper. Two dark panels sweep apart when the section
 * enters the viewport, revealing the content beneath.
 */
export function CurtainReveal({ children, className = '', id, ariaLabel, delay = 0 }: CurtainRevealProps) {
  const sectionRef = useRef<HTMLElement>(null)
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
            const t = setTimeout(() => setOpen(true), delay)
            io.unobserve(entry.target)
            return () => clearTimeout(t)
          }
        })
      },
      { threshold: 0.15, rootMargin: '-10% 0px -10% 0px' }
    )
    io.observe(root)
    return () => io.disconnect()
  }, [delay])

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-label={ariaLabel}
      className={`curtain-section relative ${className}`}
    >
      <div
        className={`curtain-panel curtain-panel-left ${open ? 'open' : ''}`}
        aria-hidden="true"
      />
      <div className={`curtain-panel ${open ? 'open' : ''}`} aria-hidden="true" />
      <div className="relative z-20">{children}</div>
    </section>
  )
}
