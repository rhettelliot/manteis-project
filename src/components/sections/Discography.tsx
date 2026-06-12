'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

interface Release {
  id: string
  catalogNumber: string
  title: string
  year: string
  coverArt: string
  hyperfollow: string
  spotify: string
  accentColor: string
  tagline: string
}

const releases: Release[] = [
  {
    id: 'mr008',
    catalogNumber: 'MR-008',
    title: 'Violet Cirrus',
    year: '2024',
    coverArt: '/covers/TMP_VC.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/themanteisproject/violet-cirrus',
    spotify: 'https://open.spotify.com/album/4MdDdEioXQ41lbk6X0Nycy',
    accentColor: '#7B2FBE',
    tagline: 'Stratospheric drift through ultraviolet corridors',
  },
  {
    id: 'mr006',
    catalogNumber: 'MR-006',
    title: 'The Source',
    year: '2024',
    coverArt: '/covers/MP_The_Source.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/themanteisproject/the-source',
    spotify: 'https://open.spotify.com/album/443nEtoaElHaWhQFAXaazV',
    accentColor: '#00C9A7',
    tagline: 'Return to origin. The frequency beneath all frequencies.',
  },
  {
    id: 'mr005',
    catalogNumber: 'MR-005',
    title: 'Continuous',
    year: '2024',
    coverArt: '/covers/MP_Continuous.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/themanteisproject/continuous',
    spotify: 'https://open.spotify.com/album/73eKYvDhEq9bQ9gjI8VZ8a',
    accentColor: '#3B82F6',
    tagline: 'The sound that never stops becoming itself.',
  },
  {
    id: 'mr004',
    catalogNumber: 'MR-004',
    title: 'Foundations',
    year: '2023',
    coverArt: '/covers/MP_Foundations.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/themanteisproject/foundations',
    spotify: 'https://open.spotify.com/album/0OS6JdgHjDKPJEbgXArA8L',
    accentColor: '#EAB308',
    tagline: 'What is built on sound cannot collapse.',
  },
]

export function Discography() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Latest release entrance
      gsap.from('.featured-release', {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.featured-release',
          start: 'top 85%',
          once: true,
        },
      })

      // Catalog cards stagger
      gsap.utils.toArray<HTMLElement>('.catalog-card').forEach((card, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true,
          },
          delay: i * 0.1,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const latest = releases[0]
  const catalog = releases.slice(1)

  return (
    <section ref={sectionRef} id="discography" className="py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="section-label mb-20">Discography /</div>

        {/* Featured — Latest Release */}
        <a
          href={latest.hyperfollow}
          target="_blank"
          rel="noreferrer noopener"
          className="featured-release group block mb-32"
        >
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            {/* Cover */}
            <div
              className="relative w-full md:w-1/2 aspect-square overflow-hidden"
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
              {/* Accent wash on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${latest.accentColor}15 0%, transparent 60%)`,
                }}
              />
              {/* Badge */}
              <div className="absolute top-4 left-4 font-mono text-[9px] tracking-[0.15em] uppercase bg-void/70 backdrop-blur-sm px-2 py-1 border border-edge-faint text-signal">
                Latest
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 py-4 md:py-12">
              <div
                className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4"
                style={{ color: latest.accentColor }}
              >
                {latest.catalogNumber} · {latest.year}
              </div>
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-[-0.03em] mb-4">
                {latest.title}
              </h2>
              <p className="font-body text-lg md:text-xl text-light-dim leading-relaxed mb-8 max-w-md">
                {latest.tagline}
              </p>

              <div className="flex items-center gap-4">
                <div
                  className="font-mono text-[11px] tracking-[0.15em] uppercase px-6 py-3 border btn-snap"
                  style={{
                    borderColor: latest.accentColor,
                    color: latest.accentColor,
                  }}
                >
                  Listen Now
                </div>
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
        </a>

        <div className="divider-glow mb-24" />

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
                  style={{
                    background: `linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 100%)`,
                  }}
                >
                  <span
                    className="font-mono text-[11px] tracking-[0.2em] uppercase px-4 py-2 border"
                    style={{ borderColor: release.accentColor, color: release.accentColor }}
                  >
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
                <div
                  className="font-mono text-[9px] tracking-[0.15em] uppercase"
                  style={{ color: release.accentColor }}
                >
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

      <div className="divider-glow max-w-5xl mx-auto mt-32" />
    </section>
  )
}