'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { prefersReducedMotion } from '@/lib/motion'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    let cleanup: (() => void) | undefined

    ;(async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      gsap.registerPlugin(ScrollTrigger)

      const lenis = new Lenis({ lerp: 0.07, smoothWheel: true })
      lenisRef.current = lenis

      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((time) => { lenis.raf(time * 1000) })
      gsap.ticker.lagSmoothing(0)

      cleanup = () => {
        lenis.destroy()
        gsap.ticker.remove(lenis.raf)
      }
    })()

    return () => cleanup?.()
  }, [])

  return <>{children}</>
}