'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { revealOnEnter } from '@/lib/reveal'
import { releases } from '@/lib/releases'

interface TiltCardProps {
  release: (typeof releases)[0]
  index: number
  className?: string
}

function TiltCard({ release, index, className = '' }: TiltCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)')

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotateX = (0.5 - y) * 8
    const rotateY = (x - 0.5) * 8
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`)
  }

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)')
  }

  return (
    <a
      ref={cardRef}
      href={release.hyperfollow}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`Listen to ${release.title} (opens in new tab)`}
      className={`bento-card group relative block overflow-hidden bg-void-raised border border-edge-faint ${className}`}
      style={{
        transform,
        transition: 'transform 0.2s ease-out, border-color 0.3s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-index={index}
    >
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={release.coverArt}
          alt={`${release.title} cover art`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)',
          }}
        />
      </div>

      <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
          <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-light/70 bg-void/60 backdrop-blur-sm px-2 py-1 border border-edge-faint">
            {release.catalogNumber}
          </span>
          <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-light/50">
            {release.year}
          </span>
        </div>

        <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.03em] text-light leading-[0.95]">
            {release.title}
          </h3>
          <p className="font-body text-sm text-light-dim mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-[85%]">
            {release.tagline}
          </p>
          <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-signal border border-signal px-2 py-1">
              Listen
            </span>
            <span className="font-mono text-[9px] tracking-[0.1em] text-light-muted">
              {release.trackCount} TRK
            </span>
          </div>
        </div>
      </div>
    </a>
  )
}

export function Discography() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const disposers: Array<() => void> = []
    ;(async () => {
      disposers.push(await revealOnEnter(root.querySelectorAll('.bento-label'), { y: 30, duration: 0.7 }))
      disposers.push(
        await revealOnEnter(root.querySelectorAll('.bento-card'), {
          y: 60,
          duration: 0.8,
          stagger: 0.1,
        })
      )
    })()
    return () => disposers.forEach((d) => d())
  }, [])

  return (
    <section ref={sectionRef} id="discography" className="relative py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20">
          <div className="bento-label">
            <div className="section-label mb-4">Releases /</div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[0.9]">
              Signal
              <span className="text-signal"> Architecture</span>
            </h2>
          </div>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-light-muted mt-4 md:mt-0 md:text-right max-w-xs">
            Four transmissions from the Manteis Project frequency range
          </p>
        </div>

        {/* Bento grid for releases */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-5 auto-rows-[280px] md:auto-rows-[320px]">
          <TiltCard release={releases[0]} index={0} className="md:col-span-2 md:row-span-2"
          />
          <TiltCard release={releases[1]} index={1} className=""
          />
          <TiltCard release={releases[2]} index={2} className=""
          />
          <TiltCard release={releases[3]} index={3} className="md:col-span-2"
          />
        </div>
      </div>

      <div className="divider-edge max-w-5xl mx-auto mt-32" />
    </section>
  )
}
