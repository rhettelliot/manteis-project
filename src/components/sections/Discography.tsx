'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { revealOnEnter } from '@/lib/reveal'
import { releases } from '@/lib/releases'

export function Discography() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const disposers: Array<() => void> = []
    ;(async () => {
      disposers.push(await revealOnEnter(root.querySelectorAll('.featured-release'), { y: 80, duration: 1 }))
      disposers.push(await revealOnEnter(root.querySelectorAll('.catalog-card'), { y: 50, duration: 0.7, stagger: 0.1 }))
    })()
    return () => disposers.forEach((d) => d())
  }, [])

  const latest = releases[0]
  const catalog = releases.slice(1)

  return (
    <section ref={sectionRef} id="discography" className="py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="section-label mb-20">Discography /</div>

        {/* Featured — Latest Release */}
        <div className="featured-release group mb-32">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            {/* Cover */}
            <a
              href={latest.hyperfollow}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Listen to ${latest.title} (opens in new tab)`}
              className="relative block w-full md:w-1/2 aspect-square overflow-hidden"
              style={{ border: `1px solid var(--edge-faint)` }}
            >
              <Image
                src={latest.coverArt}
                alt={`${latest.title} cover art`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Badge */}
              <div className="absolute top-4 left-4 font-mono text-[9px] tracking-[0.15em] uppercase bg-void/70 backdrop-blur-sm px-2 py-1 border border-edge-faint text-signal">
                Latest
              </div>
            </a>

            {/* Info */}
            <div className="flex-1 py-4 md:py-12">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4 text-signal">
                {latest.catalogNumber} · {latest.year}
              </div>
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-[-0.03em] mb-4">
                {latest.title}
              </h2>
              <p className="font-body text-lg md:text-xl text-light-dim leading-relaxed mb-8 max-w-md">
                {latest.tagline}
              </p>

              <div className="flex items-center gap-4">
                <a
                  href={latest.hyperfollow}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-[11px] tracking-[0.15em] uppercase px-6 py-3 border border-signal text-signal btn-snap hover:bg-signal hover:text-void transition-colors duration-300"
                >
                  Listen Now
                </a>
                <a
                  href={latest.spotify}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-[10px] tracking-[0.1em] text-light-muted hover:text-signal transition-colors duration-300"
                >
                  Spotify →
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="divider-edge mb-24" />

        {/* Catalog grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {catalog.map((release) => (
            <a
              key={release.id}
              href={release.hyperfollow}
              target="_blank"
              rel="noreferrer noopener"
              className="catalog-card group block"
            >
              {/* Cover */}
              <div
                className="relative aspect-square overflow-hidden mb-4"
                style={{ border: `1px solid var(--edge-faint)` }}
              >
                <Image
                  src={release.coverArt}
                  alt={`${release.title} cover art`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.65)' }}
                >
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase px-4 py-2 border border-signal text-signal">
                    Listen
                  </span>
                </div>
                {/* Catalog number */}
                <div className="absolute top-3 left-3 font-mono text-[9px] tracking-[0.15em] uppercase text-light/60 bg-void/70 backdrop-blur-sm px-2 py-1 border border-edge-faint">
                  {release.catalogNumber}
                </div>
              </div>

              {/* Info */}
              <div className="px-1">
                <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-signal">
                  {release.year}
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold tracking-[-0.02em] text-light group-hover:text-signal transition-colors duration-300 mt-1">
                  {release.title}
                </h3>
                <p className="font-body text-sm text-light-muted mt-2 leading-relaxed">
                  {release.tagline}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="divider-edge max-w-5xl mx-auto mt-32" />
    </section>
  )
}