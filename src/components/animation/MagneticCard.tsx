'use client'

import { useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/motion'
import { Release } from '@/lib/releases'

interface MagneticCardProps {
  release: Release
  index: number
  total: number
}

export function MagneticCard({ release, index, total }: MagneticCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [border, setBorder] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMove = (e: React.MouseEvent) => {
    const card = cardRef.current
    const inner = innerRef.current
    if (!card || !inner) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2

    // Magnetic pull: card leans toward cursor
    const pullX = (x - cx) / cx
    const pullY = (y - cy) / cy
    const rotY = pullX * 14
    const rotX = -pullY * 14

    // Spotlight border position
    setBorder({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    })

    if (prefersReducedMotion()) return
    inner.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.015)`
    inner.style.transition = 'transform 0.15s ease-out'
  }

  const handleLeave = () => {
    const inner = innerRef.current
    if (!inner) return
    setBorder({ x: 50, y: 50, opacity: 0 })
    if (prefersReducedMotion()) return
    inner.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)'
    inner.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
  }

  return (
    <div
      ref={cardRef}
      className="sticky-stack-card relative w-full h-[80vh] md:h-[78vh] overflow-hidden"
      style={{ ['--stack-index' as string]: index }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Spotlight border layer */}
      <div
        className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
        style={{
          opacity: border.opacity,
          background: `radial-gradient(400px circle at ${border.x}% ${border.y}%, rgba(159,103,245,0.45), transparent 70%)`,
          mixBlendMode: 'screen',
        }}
      />

      {/* Base card with magnetic transform */}
      <div
        ref={innerRef}
        className="relative w-full h-full bg-void-raised border border-edge-faint overflow-hidden will-change-transform"
      >
        {/* Gradient border shimmer */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
          style={{
            background:
              'linear-gradient(110deg, transparent 35%, rgba(159,103,245,0.25) 50%, transparent 65%)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Card index */}
        <div className="absolute top-5 left-5 md:top-8 md:left-8 z-20">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal border border-signal/40 px-2 py-1 bg-void/60">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        {/* Background cover art */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
          style={{ backgroundImage: `url(${release.coverArt})` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.85) 100%)',
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-light/70">
                {release.catalogNumber}
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-light-muted">
                {release.year}
              </span>
            </div>
            <h3 className="font-display text-4xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] leading-[0.9] text-light">
              {release.title}
            </h3>
            <p className="font-body text-sm md:text-base text-light-dim mt-4 max-w-md">
              {release.tagline}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href={release.hyperfollow}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Listen to ${release.title} (opens in new tab)`}
                className="inline-block font-mono text-[11px] tracking-[0.15em] uppercase px-5 py-2.5 border border-signal text-signal btn-snap hover:bg-signal hover:text-void transition-colors duration-300"
              >
                Listen
              </a>
              <span className="font-mono text-[10px] tracking-[0.1em] text-light-muted">
                {release.trackCount} TRK
              </span>
            </div>
          </div>
        </div>

        {/* Stack shadow cast */}
        <div
          className="absolute -bottom-6 left-[5%] right-[5%] h-12 pointer-events-none opacity-50 blur-lg"
          style={{ background: 'rgba(159,103,245,0.2)' }}
        />
      </div>
    </div>
  )
}
