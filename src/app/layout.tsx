import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import { releases, ARTIST_URL, SPOTIFY_ARTIST, APPLE_MUSIC_ARTIST, LABEL_URL } from '@/lib/releases'

// Antigravity OS: Space Grotesk serves as both --font-body and --font-display
// (single font family, weight-differentiated). JetBrains Mono for data.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '700'],
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Manteis Project — Signal Architecture',
  description:
    'Ambient / quantum architecture. Signal processing as sound architecture. Four releases on Manteis Recordings.',
  metadataBase: new URL(ARTIST_URL),
  keywords: ['ambient', 'quantum architecture', 'The Manteis Project', 'Manteis Recordings', 'electronic music'],
  openGraph: {
    title: 'The Manteis Project — Signal Architecture',
    description: 'Ambient / Quantum Architecture — Manteis Recordings',
    type: 'website',
    url: ARTIST_URL,
    siteName: 'The Manteis Project',
    images: [{ url: '/og.jpg', width: 1200, height: 1200, alt: 'The Manteis Project — Manteis Recordings' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Manteis Project — Signal Architecture',
    description: 'Ambient / Quantum Architecture — Manteis Recordings',
    images: [{ url: '/og.jpg', alt: 'The Manteis Project — Manteis Recordings' }],
  },
  alternates: {
    canonical: ARTIST_URL,
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${ARTIST_URL}/#website`,
      url: ARTIST_URL,
      name: 'The Manteis Project',
      inLanguage: 'en',
      publisher: { '@id': `${ARTIST_URL}/#artist` },
    },
    {
      '@type': 'MusicGroup',
      '@id': `${ARTIST_URL}/#artist`,
      name: 'The Manteis Project',
      url: ARTIST_URL,
      description:
        'Ambient / quantum architecture — signal processing as sound architecture. Four releases on Manteis Recordings.',
      image: `${ARTIST_URL}/og.jpg`,
      genre: ['Ambient', 'Electronic'],
      foundingLocation: {
        '@type': 'Place',
        name: 'Seattle, WA',
      },
      sameAs: [SPOTIFY_ARTIST, APPLE_MUSIC_ARTIST],
      recordLabel: {
        '@type': 'Organization',
        name: 'Manteis Recordings',
        url: LABEL_URL,
      },
    },
    ...releases.map((release) => ({
      '@type': 'MusicAlbum',
      '@id': `${ARTIST_URL}/#${release.id}`,
      name: release.title,
      datePublished: release.year,
      numTracks: release.trackCount,
      image: `${ARTIST_URL}${release.coverArt}`,
      url: release.spotify,
      sameAs: [release.spotify, release.hyperfollow],
      byArtist: { '@id': `${ARTIST_URL}/#artist` },
      albumProductionType: 'https://schema.org/StudioAlbum',
      albumReleaseType: 'https://schema.org/AlbumRelease',
    })),
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrains.variable}`}>
      <body className="bg-void text-light antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <noscript>
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000000', color: '#9F67F5', fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', textAlign: 'center', padding: 24 }}>
            The Manteis Project is an interactive experience — enable JavaScript to enter.
          </div>
        </noscript>
        <div className="noise-overlay" />
        <div className="scan-overlay" />
        {children}
        {/* Safety net: if IntersectionObserver never fires, force scroll-revealed content visible */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
  (function() {
    function sweep() {
      setTimeout(function() {
        var els = document.querySelectorAll('main [style*="opacity: 0"], main [style*="opacity:0"]');
        els.forEach(function(el) { el.style.opacity = '1'; el.style.transform = 'none'; });
      }, 4000);
    }
    sweep();
    window.addEventListener('tmp-enter', sweep);
  })();
`,
          }}
        />
      </body>
    </html>
  )
}