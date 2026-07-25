'use client'

import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * Scroll-driven purple depth fog.
 * Fades layers of violet mist into view as sections enter the viewport.
 */
export function DepthFog({ className = '' }: { className?: string }) {
  const fogRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(true)
      return
    }
    const el = fogRef.current
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
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={fogRef}
      className={`depth-fog ${visible ? 'visible' : ''} ${className}`}
      aria-hidden="true"
    />
  )
}

/**
 * Section reveal mist — a stronger purple band that scrubs in/out with scroll.
 */
export function MistReveal({ className = '' }: { className?: string }) {
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
          setVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.2, rootMargin: '-20% 0px -20% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`depth-fog-reveal ${visible ? 'visible' : ''} ${className}`}
      aria-hidden="true"
    />
  )
}
