'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export function Gatekeeper() {
  const [entered, setEntered] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('tmp-entered') === 'true'
    }
    return false
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const waveRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (entered) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Signal line draws across
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: 'power4.inOut' }
      )

      // Title reveal — split by lines
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )

      // Tagline fade
      tl.fromTo(
        tagRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )

      // Waveform bars stagger in
      if (waveRef.current) {
        const bars = waveRef.current.children
        tl.fromTo(
          bars,
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
          '-=0.3'
        )
      }

      // Enter button
      tl.fromTo(
        btnRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      )
    }, containerRef)

    return () => ctx.revert()
  }, [entered])

  if (entered) return null

  const handleEnter = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.02,
      duration: 0.6,
      ease: 'power2.in',
      onComplete: () => {
        sessionStorage.setItem('tmp-entered', 'true')
        window.dispatchEvent(new Event('tmp-enter'))
        setEntered(true)
      },
    })
  }

  // Magnetic hover for button
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(btn, { x: x * 0.15, y: y * 0.15, duration: 0.3, ease: 'power2.out' })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
  }

  return (
    <div
      ref={containerRef}
      data-gate=""
      className="fixed inset-0 z-50 bg-void flex flex-col items-center justify-center"
    >
      {/* Signal line across center */}
      <div
        ref={lineRef}
        className="absolute top-1/2 left-0 right-0 h-px origin-left"
        style={{ background: 'linear-gradient(90deg, transparent, #007AFF, transparent)' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Waveform bars */}
        <div ref={waveRef} className="flex items-end justify-center gap-[3px] mb-8 h-8">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="waveform-bar"
              style={{
                height: `${8 + Math.random() * 24}px`,
                animationDelay: `${i * 0.06}s`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        <div ref={titleRef} className="opacity-0">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] leading-[0.9]">
            The Manteis
          </h1>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[-0.04em] leading-[0.9] text-signal">
            Project
          </h1>
        </div>

        <p
          ref={tagRef}
          className="opacity-0 font-mono text-[11px] tracking-[0.3em] uppercase text-light-muted mt-6"
        >
          Ambient · Experimental · Signal
        </p>

        <button
          ref={btnRef}
          onClick={handleEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="opacity-0 mt-10 font-mono text-[11px] tracking-[0.2em] uppercase px-8 py-3 border border-signal text-signal btn-snap hover:bg-signal hover:text-void transition-colors duration-300"
        >
          Enter Signal
        </button>
      </div>

      {/* Corner data markers */}
      <div className="absolute top-6 left-6 font-mono text-[9px] tracking-[0.15em] text-light-muted">
        TMP/001
      </div>
      <div className="absolute top-6 right-6 font-mono text-[9px] tracking-[0.15em] text-signal opacity-40">
        ● LIVE
      </div>
      <div className="absolute bottom-6 left-6 font-mono text-[9px] tracking-[0.15em] text-light-muted">
        MR-004 → MR-008
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[9px] tracking-[0.15em] text-light-muted">
        48°N 122°W
      </div>
    </div>
  )
}