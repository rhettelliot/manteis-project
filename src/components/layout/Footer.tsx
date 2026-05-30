export function Footer() {
  return (
    <footer className="py-16 md:py-24 border-t border-edge-faint">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          {/* Left — identity */}
          <div>
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
          <div className="flex flex-col items-start md:items-end gap-3">
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-light-muted mb-1">
              Stream
            </span>
            <a
              href="https://open.spotify.com/artist/6fM3YHsrFIvL0VBeNxHSF5"
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-[11px] tracking-[0.1em] text-light-muted hover:text-signal transition-colors duration-300"
            >
              Spotify
            </a>
            <a
              href="https://music.apple.com/us/artist/the-manteis-project/1581998562"
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-[11px] tracking-[0.1em] text-light-muted hover:text-signal transition-colors duration-300"
            >
              Apple Music
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-edge-faint flex flex-col md:flex-row justify-between items-center gap-2">
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