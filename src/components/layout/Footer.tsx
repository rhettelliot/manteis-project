'use client'

import { useEffect, useRef } from 'react'
import { revealOnEnter } from '@/lib/reveal'

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = footerRef.current
    if (!root) return
    const disposers: Array<() => void> = []
    ;(async () => {
      disposers.push(await revealOnEnter(root.querySelectorAll('.footer-identity'), { y: 30, duration: 0.6 }))
      disposers.push(await revealOnEnter(root.querySelectorAll('.footer-stream'), { y: 30, duration: 0.6, stagger: 0.08 }))
      disposers.push(await revealOnEnter(root.querySelectorAll('.footer-network'), { y: 20, duration: 0.5 }))
      disposers.push(await revealOnEnter(root.querySelectorAll('.footer-bottom'), { y: 16, duration: 0.5 }))
    })()
    return () => disposers.forEach((d) => d())
  }, [])

  return (
    <footer ref={footerRef} className="relative py-16 md:py-24 border-t border-edge-faint">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          {/* Left — identity */}
          <div className="footer-identity">
            <h3 className="font-display text-2xl font-bold tracking-[-0.02em]">
              The Manteis Project
            </h3>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-light-muted mt-2">
              Ambient · Experimental · Signal Architecture
            </p>
            <p className="font-mono text-[10px] tracking-[0.15em] text-light-muted mt-4">
              Seattle, WA · Manteis Recordings
            </p>
          </div>

          {/* Right — streaming */}
          <div className="footer-stream flex flex-col items-start md:items-end gap-3">
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-light-muted mb-1">
              Stream
            </span>
            <a
              href="https://open.spotify.com/artist/6fM3YHsrFIvL0VBeNxHSF5"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Listen to The Manteis Project on Spotify (opens in new tab)"
              className="font-mono text-[11px] tracking-[0.1em] text-light-muted hover:text-signal transition-colors duration-300"
            >
              Spotify
            </a>
            <a
              href="https://music.apple.com/us/artist/the-manteis-project/1581998562"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Listen to The Manteis Project on Apple Music (opens in new tab)"
              className="font-mono text-[11px] tracking-[0.1em] text-light-muted hover:text-signal transition-colors duration-300"
            >
              Apple Music
            </a>
          </div>
        </div>

        {/* Manteis Network — cross-site discovery */}
        <div className="footer-network mt-10 pt-8 border-t border-edge-faint flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-light-muted mb-1">
              Label
            </span>
            <a
              href="https://manteisrecordings.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Visit Manteis Recordings label hub (opens in new tab)"
              className="font-mono text-[11px] tracking-[0.1em] text-light-muted hover:text-signal transition-colors duration-300"
            >
              Manteis Recordings ↗
            </a>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-light-muted mb-1">
              Roster
            </span>
            <div className="flex flex-col md:items-end gap-1">
              <a href="https://redshiftmantra.vercel.app" target="_blank" rel="noreferrer noopener" aria-label="Visit Red Shift Mantra artist site (opens in new tab)" className="font-mono text-[11px] tracking-[0.1em] text-light-muted hover:text-signal transition-colors duration-300">Red Shift Mantra ↗</a>
              <a href="https://thesan-musique-site.vercel.app" target="_blank" rel="noreferrer noopener" aria-label="Visit Thesan Musique artist site (opens in new tab)" className="font-mono text-[11px] tracking-[0.1em] text-light-muted hover:text-signal transition-colors duration-300">Thesan Musique ↗</a>
              <a href="https://brindavan-gardens-site.vercel.app" target="_blank" rel="noreferrer noopener" aria-label="Visit Brindavan Gardens artist site (opens in new tab)" className="font-mono text-[11px] tracking-[0.1em] text-light-muted hover:text-signal transition-colors duration-300">Brindavan Gardens ↗</a>
              <a href="https://bethany-pritchett-site.vercel.app" target="_blank" rel="noreferrer noopener" aria-label="Visit Bethany Pritchett artist site (opens in new tab)" className="font-mono text-[11px] tracking-[0.1em] text-light-muted hover:text-signal transition-colors duration-300">Bethany Pritchett ↗</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom mt-12 pt-6 border-t border-edge-faint flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="font-mono text-[9px] tracking-[0.15em] text-light-muted">
            © {new Date().getFullYear()} The Manteis Project. All frequencies reserved.
          </p>
          <p className="font-mono text-[9px] tracking-[0.15em] text-light-muted">
            Manteis Recordings · MR-004 → MR-008
          </p>
        </div>
      </div>
    </footer>
  )
}