'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

export function ScrollProgressPath() {
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const path = pathRef.current
    const svg = svgRef.current
    if (!path || !svg) return

    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      const draw = length * (1 - progress)
      path.style.strokeDashoffset = `${Math.max(0, draw)}`
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 pointer-events-none z-30 opacity-60">
      <svg
        ref={svgRef}
        className="w-full h-[6px]"
        preserveAspectRatio="none"
        viewBox="0 0 1200 6"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="scrollProgressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(159, 103, 245, 0)" />
            <stop offset="20%" stopColor="rgba(159, 103, 245, 0.8)" />
            <stop offset="80%" stopColor="rgba(159, 103, 245, 0.8)" />
            <stop offset="100%" stopColor="rgba(159, 103, 245, 0)" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d="M0,3 C300,3 300,3 600,3 S900,3 1200,3"
          fill="none"
          stroke="url(#scrollProgressGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}
