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
      // Keep a stable reference: gsap.ticker.remove only removes the exact
      // function that was added, so an inline closure would leak the ticker
      // callback (and keep calling raf on a destroyed Lenis instance).
      const tick = (time: number) => { lenis.raf(time * 1000) }
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)

      cleanup = () => {
        gsap.ticker.remove(tick)
        lenis.destroy()
      }
    })()

    return () => cleanup?.()
  }, [])

  return <>{children}</>
}