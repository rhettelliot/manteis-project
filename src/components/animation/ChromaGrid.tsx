'use client'

import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

const COUNT = 9

export function ChromaGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)

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

  return (
    <div
      ref={ref}
      className={`chroma-grid border border-edge-faint transition-opacity duration-1000 ${entered ? 'opacity-100' : 'opacity-0'}`}
      aria-hidden="true"
    >
      {Array.from({ length: COUNT }).map((_, i) => (
        <div
          key={i}
          className="chroma-cell aspect-square"
          style={{ animationDelay: `${i * -1.1}s` }}
        >
          <div className="chroma-cell-inner flex items-center justify-center">
            <span
              className="font-mono text-[10px] tracking-[0.15em] uppercase text-light-muted"
              style={{ opacity: 0.25 + (i % 4) * 0.15 }}
            >
              SIG.{String(i + 1).padStart(2, '0')}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
