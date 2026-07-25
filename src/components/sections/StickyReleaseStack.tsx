'use client'

import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/motion'
import { Release } from '@/lib/releases'
import { MagneticCard } from '@/components/animation/MagneticCard'

interface StickyReleaseStackProps {
  releases: Release[]
}

export function StickyReleaseStack({ releases }: StickyReleaseStackProps) {
  const stackRef = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setEntered(true)
      return
    }
    const el = stackRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setEntered(true)
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -10% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={stackRef}
      className={`sticky-stack space-y-8 transition-opacity duration-1000 ${entered ? 'opacity-100' : 'opacity-0'}`}
    >
      {releases.map((release, i) => (
        <MagneticCard key={release.id} release={release} index={i} total={releases.length} />
      ))}
    </div>
  )
}
