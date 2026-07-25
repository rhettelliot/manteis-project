'use client'

import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/motion'
import { releases } from '@/lib/releases'

const GRID_SIZE = 12

export function ChromaGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)
  const [mouse, setMouse] = useState({ x: 50, y: 50 })

  useEffect(() => {
    if (prefersReducedMotion()) {
      setEntered(true)
      return
    }
    const el = ref.current
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
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const handleMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  const cells = Array.from({ length: GRID_SIZE }).map((_, i) => {
    const release = releases[i % releases.length]
    const delay = `${i * -0.7}s`
    return (
      <div
        key={i}
        className="chroma-cell aspect-square"
        style={{ animationDelay: delay }}
      >
        <div className="chroma-cell-inner relative flex items-center justify-center overflow-hidden">
          {/* Subtle cover thumbnail */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 grayscale hover:grayscale-0 transition-all duration-700"
            style={{ backgroundImage: `url(${release.coverArt})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-signal/10 via-transparent to-cream/[0.07]" />
          <div className="relative z-10 text-center px-2">
            <span className="block font-mono text-[9px] tracking-[0.15em] uppercase text-light-muted opacity-60">
              SIG.{String(i + 1).padStart(2, '0')}
            </span>
            <span className="block font-mono text-[10px] tracking-[0.1em] uppercase text-signal mt-1 truncate">
              {release.catalogNumber}
            </span>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div
      ref={ref}
      className={`relative border border-edge-faint transition-opacity duration-1000 ${entered ? 'opacity-100' : 'opacity-0'}`}
      aria-hidden="true"
      onMouseMove={handleMove}
      onMouseLeave={() => setMouse({ x: 50, y: 50 })}
    >
      {/* Cursor-following violet-cream radial */}
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-all duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, rgba(159,103,245,0.22), rgba(253,252,220,0.04) 45%, transparent 70%)`,
        }}
      />
      <div className="chroma-grid relative z-10">{cells}</div>
    </div>
  )
}
