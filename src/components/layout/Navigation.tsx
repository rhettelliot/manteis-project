'use client'

import { useState } from 'react'

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { href: '#discography', label: 'Discography' },
    { href: '#statement', label: 'Statement' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-void/80 backdrop-blur-xl border-b border-edge-faint">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-display text-lg font-bold tracking-[-0.02em]">
          <span className="text-signal">TMP</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] tracking-[0.15em] uppercase text-light-muted hover:text-signal transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://distrokid.com/hyperfollow/themanteisproject/violet-cirrus"
            target="_blank"
            rel="noreferrer noopener"
            className="font-mono text-[11px] tracking-[0.15em] uppercase text-signal border border-signal px-4 py-2 btn-snap hover:bg-signal hover:text-void transition-colors duration-300"
          >
            Listen
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden font-mono text-[11px] tracking-[0.15em] uppercase text-light-muted"
        >
          {mobileOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-void/95 backdrop-blur-xl border-b border-edge-faint px-6 py-6 space-y-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block font-mono text-[12px] tracking-[0.15em] uppercase text-light-muted hover:text-signal transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://distrokid.com/hyperfollow/themanteisproject/violet-cirrus"
            target="_blank"
            rel="noreferrer noopener"
            className="block font-mono text-[12px] tracking-[0.15em] uppercase text-signal"
          >
            Listen →
          </a>
        </div>
      )}
    </nav>
  )
}