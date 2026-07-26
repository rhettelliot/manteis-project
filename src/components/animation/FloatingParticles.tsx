'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

const SIGNAL = 'rgba(159, 103, 245,'
const CREAM = 'rgba(253, 252, 220,'
const CONNECT_DISTANCE = 160
const ATTRACTION_RADIUS = 240

interface Particle {
  x: number
  y: number
  originX: number
  originY: number
  size: number
  vx: number
  vy: number
  opacity: number
  phase: number
  driftSpeed: number
}

/**
 * Cursor-reactive particle field.
 * Particles drift toward the cursor when close, spring back to origin,
 * and connect with faint threads. Creates a living violet constellation
 * that reacts to the visitor's pointer.
 */
export function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)
  const mouseRef = useRef({ x: -9999, y: -9999, active: false })
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    if (prefersReducedMotion()) return

    let width = window.innerWidth
    let height = window.innerHeight

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initParticles()
    }

    const count = Math.min(Math.max(Math.floor((width * height) / 25000), 36), 90)

    const initParticles = () => {
      particlesRef.current = Array.from({ length: count }, () => {
        const x = Math.random() * width
        const y = Math.random() * height
        return {
          x,
          y,
          originX: x,
          originY: y,
          size: 1 + Math.random() * 2.2,
          vx: 0,
          vy: 0,
          opacity: 0.08 + Math.random() * 0.16,
          phase: Math.random() * Math.PI * 2,
          driftSpeed: 0.2 + Math.random() * 0.3,
        }
      })
    }

    const onMove = (e: PointerEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      mouseRef.current.active = true
    }

    const onLeave = () => {
      mouseRef.current.active = false
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      const mouse = mouseRef.current
      const t = performance.now() * 0.001
      const particles = particlesRef.current

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.phase += 0.008

        // Ambient organic drift
        const driftX = Math.sin(t * p.driftSpeed + p.originY * 0.01) * 0.25
        const driftY = Math.cos(t * p.driftSpeed * 0.7 + p.originX * 0.01) * 0.2

        // Cursor attraction
        let ax = driftX
        let ay = driftY
        if (mouse.active) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < ATTRACTION_RADIUS && dist > 4) {
            const force = (1 - dist / ATTRACTION_RADIUS) * 0.75
            ax += (dx / dist) * force
            ay += (dy / dist) * force
          }
        }

        // Spring back to origin
        ax += (p.originX - p.x) * 0.015
        ay += (p.originY - p.y) * 0.015

        p.vx += ax
        p.vy += ay
        p.vx *= 0.94
        p.vy *= 0.94
        p.x += p.vx
        p.y += p.vy

        const flicker = 0.7 + Math.sin(p.phase * 1.4) * 0.3
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${SIGNAL} ${p.opacity * flicker})`
        ctx.fill()
      }

      // Constellation threads
      for (let i = 0; i < particles.length; i++) {
        let connections = 0
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DISTANCE && connections < 3) {
            connections++
            const alpha = 0.04 * (1 - dist / CONNECT_DISTANCE)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `${CREAM} ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  )
}
