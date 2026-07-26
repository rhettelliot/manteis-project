'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { revealOnEnter } from '@/lib/reveal'
import { releases } from '@/lib/releases'

interface TiltCardProps {
  release: (typeof releases)[0]
  index: number
  className?: string
  sizes?: string
}

function TiltCard({ release, index, className = '', sizes = '(max-width: 768px) 100vw, 33vw' }: TiltCardProps) {
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
      {/* Concentric frame tunnel overlay */}
      <div className="concentric-frame z-10" aria-hidden="true" />

      {/* Geometric diamond mask overlay */}
      <div
        className="absolute inset-0 z-20 pointer-events-none diamond-mask opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle, rgba(159,103,245,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={release.coverArt}
          alt={`${release.title} cover art`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          sizes={sizes}
        />
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)',
          }}
        />
      </div>

      {/* Massive catalog number as display art */}
      <div className="catalog-display absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 group-hover:opacity-20 transition-opacity duration-500">
        {release.catalogNumber}
      </div>

      <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between pointer-events-none z-30">
        <div className="flex justify-between items-start">
          <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-cream/70 bg-void/60 backdrop-blur-sm px-2 py-1 border border-cream/10 stamp-texture">
            {release.catalogNumber}
          </span>
          <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-cream-muted">
            {release.year}
          </span>
        </div>

        <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.03em] text-cream leading-[0.95]">
            {release.title}
          </h3>
          <p className="font-body text-sm text-cream-dim mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-[85%]">
            {release.tagline}
          </p>
          <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-signal border border-signal px-2 py-1">
              Listen
            </span>
            <span className="font-mono text-[9px] tracking-[0.1em] text-cream-muted">
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
  const orbitalRef = useRef<SVGSVGElement>(null)

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
      {/* Wireframe grid tunnel */}
      <div className="wireframe-tunnel absolute inset-0" aria-hidden="true" />

      {/* Orbital path curves connecting 4 releases */}
      <svg
        ref={orbitalRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path
          className="orbital-curve"
          d="M10,50 C30,10 70,10 90,50 S70,90 50,90 S10,70 10,50"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="orbital-curve"
          d="M5,50 C25,0 75,0 95,50 S75,100 50,100 S5,75 5,50"
          vectorEffect="non-scaling-stroke"
          style={{ opacity: 0.12 }}
        />
      </svg>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20">
          <div className="bento-label">
            <div className="section-label mb-4">Releases /</div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[0.9] text-cream">
              Signal
              <span className="text-signal"> Architecture</span>
            </h2>
          </div>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-cream-muted mt-4 md:mt-0 md:text-right max-w-xs">
            Four transmissions from the Manteis Project frequency range
          </p>
        </div>

        {/* Bento grid for releases */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-5 auto-rows-[280px] md:auto-rows-[320px]">
          <TiltCard release={releases[0]} index={0} className="md:col-span-2 md:row-span-2" sizes="(max-width: 768px) 100vw, 66vw" />
          <TiltCard release={releases[1]} index={1} sizes="(max-width: 768px) 100vw, 33vw" />
          <TiltCard release={releases[2]} index={2} sizes="(max-width: 768px) 100vw, 33vw" />
          <TiltCard release={releases[3]} index={3} className="md:col-span-2" sizes="(max-width: 768px) 100vw, 66vw" />
        </div>

        {/* Massive display catalog numbers strip */}
        <div className="mt-20 overflow-hidden border-y border-edge-faint py-6">
          <div className="flex gap-12 md:gap-24 animate-marquee whitespace-nowrap">
            {releases.map((r) => (
              <span key={r.id} className="font-mono text-[clamp(3rem,10vw,8rem)] font-bold tracking-[-0.04em] text-cream/10">
                {r.catalogNumber}
              </span>
            ))}
            {releases.map((r) => (
              <span key={`dup-${r.id}`} className="font-mono text-[clamp(3rem,10vw,8rem)] font-bold tracking-[-0.04em] text-cream/10">
                {r.catalogNumber}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="divider-edge max-w-5xl mx-auto mt-32" />
    </section>
  )
}
