'use client'

import { useEffect, useRef } from 'react'
import { revealOnEnter } from '@/lib/reveal'
import { releases } from '@/lib/releases'

const totalTracks = releases.reduce((sum, r) => sum + r.trackCount, 0)

const readouts = [
  { label: 'Carrier', value: '440', unit: 'Hz', signal: true },
  { label: 'Tempo', value: '60', unit: 'BPM', signal: false },
  { label: 'Releases', value: String(releases.length).padStart(2, '0'), unit: 'CAT', signal: false },
  { label: 'Tracks', value: String(totalTracks), unit: 'TRK', signal: true },
]

const channels = [
  { label: 'CH 01 — Format', value: 'Ambient / Quantum Architecture' },
  { label: 'CH 02 — Catalog range', value: 'MR-001 → MR-005' },
  { label: 'CH 03 — Label', value: 'Manteis Recordings' },
  { label: 'CH 04 — Status', value: 'Transmitting', signal: true },
]

export function SignalData() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const disposers: Array<() => void> = []
    ;(async () => {
      disposers.push(await revealOnEnter(root.querySelectorAll('.data-cell'), { y: 30, duration: 0.6, stagger: 0.1 }))
      disposers.push(await revealOnEnter(root.querySelectorAll('.channel-row'), { y: 16, duration: 0.5, stagger: 0.08 }))
    })()
    return () => disposers.forEach((d) => d())
  }, [])

  return (
    <section ref={sectionRef} id="signal" className="relative py-24 md:py-40" aria-label="Signal data">
      {/* Parallel line pattern overlay */}
      <div className="parallel-lines absolute inset-0" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="section-label mb-16 text-cream">01 / Signal Data</div>

        {/* Primary readouts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-edge-faint border border-edge-faint">
          {readouts.map((r) => (
            <div key={r.label} className="data-cell bg-void p-6 md:p-10 flex flex-col justify-between min-h-[160px] md:min-h-[200px] stamp-texture">
              <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-cream-muted">
                {r.label}
              </div>
              <div className="mt-6">
                <span
                  className={`font-mono text-5xl md:text-6xl font-bold tracking-[-0.04em] ${
                    r.signal ? 'text-signal' : 'text-cream'
                  }`}
                >
                  {r.value}
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-cream-muted ml-2 align-super">
                  {r.unit}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Channel readout */}
        <div className="mt-16 max-w-2xl">
          {channels.map((ch) => (
            <div key={ch.label} className="channel-row mono-strip">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-muted">
                {ch.label}
              </span>
              <span
                className={`font-mono text-[11px] tracking-[0.1em] uppercase text-right ${
                  ch.signal ? 'text-signal' : 'text-cream-dim'
                }`}
              >
                {ch.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
