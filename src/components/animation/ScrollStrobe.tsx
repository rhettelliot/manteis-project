'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * Scroll-speed synced purple strobe overlay.
 * A subtle violet flash fires on fast scroll deltas, creating a rhythmic
 * techno-strobe tied to the user's scroll velocity.
 */
export function ScrollStrobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)
  const intensityRef = useRef(0)
  const lastScrollRef = useRef(0)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onScroll = () => {
      const now = performance.now()
      const dt = Math.max(now - lastScrollRef.current, 1)
      lastScrollRef.current = now
      const speed = Math.abs(window.scrollY - (lastScrollRef.current ? lastScrollRef.current : window.scrollY)) / dt
      intensityRef.current = Math.min(intensityRef.current + speed * 0.18, 0.55)
    }

    const draw = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const intensity = intensityRef.current

      ctx.clearRect(0, 0, w, h)
      if (intensity > 0.005) {
        // Slight inverted-color / purple flash wash
        ctx.fillStyle = `rgba(159, 103, 245, ${intensity * 0.12})`
        ctx.fillRect(0, 0, w, h)

        // Thin horizontal scan-line strobes
        const y = (performance.now() * 0.05) % h
        ctx.fillStyle = `rgba(253, 252, 220, ${intensity * 0.06})`
        ctx.fillRect(0, y, w, 1)
      }

      intensityRef.current *= 0.92
      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-[9000]"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
