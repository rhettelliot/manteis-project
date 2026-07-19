export interface Release {
  id: string
  catalogNumber: string
  title: string
  year: string
  trackCount: number
  coverArt: string
  hyperfollow: string
  spotify: string
  tagline: string
}

export const releases: Release[] = [
  {
    id: 'mr008',
    catalogNumber: 'MR-008',
    title: 'Violet Cirrus',
    year: '2024',
    trackCount: 3,
    coverArt: '/covers/TMP_VC.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/themanteisproject/violet-cirrus',
    spotify: 'https://open.spotify.com/album/4MdDdEioXQ41lbk6X0Nycy',
    tagline: 'Stratospheric drift through ultraviolet corridors.',
  },
  {
    id: 'mr006',
    catalogNumber: 'MR-006',
    title: 'The Source',
    year: '2024',
    trackCount: 20,
    coverArt: '/covers/MP_The_Source.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/themanteisproject/the-source',
    spotify: 'https://open.spotify.com/album/443nEtoaElHaWhQFAXaazV',
    tagline: 'Return to origin. The frequency beneath all frequencies.',
  },
  {
    id: 'mr005',
    catalogNumber: 'MR-005',
    title: 'Continuous',
    year: '2024',
    trackCount: 5,
    coverArt: '/covers/MP_Continuous.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/themanteisproject/continuous',
    spotify: 'https://open.spotify.com/album/73eKYvDhEq9bQ9gjI8VZ8a',
    tagline: 'The sound that never stops becoming itself.',
  },
  {
    id: 'mr004',
    catalogNumber: 'MR-004',
    title: 'Foundations',
    year: '2024',
    trackCount: 4,
    coverArt: '/covers/MP_Foundations.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/themanteisproject/foundations',
    spotify: 'https://open.spotify.com/album/0OS6JdgHjDKPJEbgXArA8L',
    tagline: 'What is built on sound cannot collapse.',
  },
]

export const ARTIST_URL = 'https://themanteisproject.com'
export const SPOTIFY_ARTIST = 'https://open.spotify.com/artist/6fM3YHsrFIvL0VBeNxHSF5'
export const APPLE_MUSIC_ARTIST = 'https://music.apple.com/us/artist/the-manteis-project/1581998562'
export const LABEL_URL = 'https://www.manteisrecordings.com'
