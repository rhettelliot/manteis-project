'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const titleLines = ['The', 'Manteis', 'Project']

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>('.hero-line')
      const frame = gsap.utils.toArray<HTMLElement>('.hero-frame')
      const marks = gsap.utils.toArray<HTMLElement>('.hero-mark')

      if (reduced) {
        gsap.set([lines, marks, subRef.current], { opacity: 1, y: 0 })
        gsap.set(frame, { scaleX: 1, scaleY: 1, opacity: 1 })
        return
      }

      const tl = gsap.timeline({ delay: 0.2 })

      // Structural frame draws in first — the architecture assembles
      tl.fromTo(
        '.hero-frame-h',
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1.1, ease: 'power4.inOut', stagger: 0.08 }
      )
      tl.fromTo(
        '.hero-frame-v',
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 1.1, ease: 'power4.inOut', stagger: 0.08 },
        '<'
      )

      // Title lines rise out of the structure
      tl.fromTo(
        lines,
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12 },
        '-=0.6'
      )

      // Telemetry marks and subtitle settle last
      tl.fromTo(
        marks,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.06 },
        '-=0.5'
      )
      tl.fromTo(
        subRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      )

      // Scroll indicator idle drift
      gsap.to(indicatorRef.current, {
        y: 8,
        duration: 1.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      // Parallax on scroll — title recedes into the void
      gsap.to(titleRef.current, {
        y: -80,
        opacity: 0.4,
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
      aria-label="The Manteis Project"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Structural frame — edges, not boxes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="hero-frame hero-frame-h absolute top-[18%] left-[8%] right-[8%] h-px origin-left bg-edge-faint" />
        <div className="hero-frame hero-frame-h absolute bottom-[18%] left-[8%] right-[8%] h-px origin-right bg-edge-faint" />
        <div className="hero-frame hero-frame-v absolute left-[8%] top-[18%] bottom-[18%] w-px origin-top bg-edge-ghost" />
        <div className="hero-frame hero-frame-v absolute right-[8%] top-[18%] bottom-[18%] w-px origin-bottom bg-edge-ghost" />
      </div>

      {/* Telemetry markers */}
      <div className="hero-mark absolute top-[20%] left-[8%] pl-4 font-mono text-[9px] tracking-[0.2em] text-light-muted">
        SIG/7C3AED
      </div>
      <div className="hero-mark absolute top-[20%] right-[8%] pr-4 font-mono text-[9px] tracking-[0.2em] text-signal">
        ● CARRIER LOCKED
      </div>
      <div className="hero-mark absolute bottom-[20%] left-[8%] pl-4 font-mono text-[9px] tracking-[0.2em] text-light-muted">
        MR-004 → MR-008
      </div>
      <div className="hero-mark absolute bottom-[20%] right-[8%] pr-4 font-mono text-[9px] tracking-[0.2em] text-light-muted">
        AMBIENT / QUANTUM ARCHITECTURE
      </div>

      {/* Main title — each line masked and revealed */}
      <div ref={titleRef} className="relative z-10 text-center px-6">
        <h1 className="font-display text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-[-0.04em] leading-[0.88]">
          {titleLines.map((line) => (
            <span key={line} className="block overflow-hidden">
              <span
                className={`hero-line block will-change-transform ${line === 'Manteis' ? 'text-signal' : ''}`}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>
      </div>

      {/* Subtitle */}
      <div ref={subRef} className="relative z-10 mt-8 text-center">
        <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-light-muted">
          Signal Architecture
        </p>
        <div className="mt-4 signal-line w-24 mx-auto" />
      </div>

      {/* Scroll indicator */}
      <div
        ref={indicatorRef}
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-light-muted">
          Scroll
        </span>
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none" className="text-light-muted">
          <path d="M6 4 L6 16 M2 12 L6 16 L10 12" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
    </section>
  )
}
