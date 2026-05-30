'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title split animation
      const tl = gsap.timeline({ delay: 0.3 })

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' }
      )

      tl.fromTo(
        subRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      )

      // Scroll indicator
      gsap.to(indicatorRef.current, {
        y: 8,
        duration: 1.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      // Parallax on scroll
      gsap.to(titleRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Radial glow — signal blue core with amber warmth */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(0,122,255,0.08) 0%, rgba(229,160,11,0.03) 40%, transparent 70%)',
          }}
        />
      </div>

      {/* Corner frequency markers */}
      <div className="absolute top-24 left-8 md:left-12 font-mono text-[9px] tracking-[0.15em] text-light-muted">
        440Hz / 60BPM
      </div>
      <div className="absolute top-24 right-8 md:right-12 font-mono text-[9px] tracking-[0.15em] text-signal opacity-40">
        PROCESSING
      </div>

      {/* Main title */}
      <div ref={titleRef} className="relative z-10 text-center px-6">
        <h1 className="font-display text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-[-0.04em] leading-[0.88]">
          <span className="block">The</span>
          <span className="block text-signal">Manteis</span>
          <span className="block">Project</span>
        </h1>
      </div>

      {/* Subtitle */}
      <div ref={subRef} className="relative z-10 mt-8 text-center">
        <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-light-muted">
          Ambient · Experimental · Signal Architecture
        </p>
        <div className="mt-4 signal-line w-24 mx-auto" />
      </div>

      {/* Scroll indicator */}
      <div
        ref={indicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-light-muted">
          Scroll
        </span>
        <svg
          width="12"
          height="20"
          viewBox="0 0 12 20"
          fill="none"
          className="text-light-muted"
        >
          <path
            d="M6 4 L6 16 M2 12 L6 16 L10 12"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>
    </section>
  )
}