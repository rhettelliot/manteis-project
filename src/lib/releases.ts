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
  duration?: string
  frequency?: string
  tracks?: { title: string; duration: string; frequency: string }[]
}

export const releases: Release[] = [
  {
    id: 'mr008',
    catalogNumber: 'MR-005',
    title: 'Violet Cirrus',
    year: '2024',
    trackCount: 3,
    coverArt: '/covers/TMP_VC.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/themanteisproject/violet-cirrus',
    spotify: 'https://open.spotify.com/album/4MdDdEioXQ41lbk6X0Nycy',
    tagline: 'Stratospheric drift through ultraviolet corridors.',
    duration: '18:42',
    frequency: '432 Hz',
    tracks: [
      { title: 'Cirrus I', duration: '6:14', frequency: '432 Hz' },
      { title: 'Cirrus II', duration: '5:58', frequency: '440 Hz' },
      { title: 'Cirrus III', duration: '6:30', frequency: '432 Hz' },
    ],
  },
  {
    id: 'mr006',
    catalogNumber: 'MR-004',
    title: 'The Source',
    year: '2024',
    trackCount: 20,
    coverArt: '/covers/MP_The_Source.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/themanteisproject/the-source',
    spotify: 'https://open.spotify.com/album/443nEtoaElHaWhQFAXaazV',
    tagline: 'Return to origin. The frequency beneath all frequencies.',
    duration: '74:18',
    frequency: '528 Hz',
    tracks: [
      { title: 'Origin Signal', duration: '4:12', frequency: '528 Hz' },
      { title: 'Subfrequency', duration: '3:45', frequency: '174 Hz' },
      { title: 'Carrier Wave', duration: '4:02', frequency: '440 Hz' },
      { title: 'Deep Field', duration: '5:11', frequency: '432 Hz' },
    ],
  },
  {
    id: 'mr005',
    catalogNumber: 'MR-003',
    title: 'Continuous',
    year: '2024',
    trackCount: 5,
    coverArt: '/covers/MP_Continuous.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/themanteisproject/continuous',
    spotify: 'https://open.spotify.com/album/73eKYvDhEq9bQ9gjI8VZ8a',
    tagline: 'The sound that never stops becoming itself.',
    duration: '42:07',
    frequency: '440 Hz',
    tracks: [
      { title: 'Continuous I', duration: '8:24', frequency: '440 Hz' },
      { title: 'Continuous II', duration: '7:50', frequency: '432 Hz' },
      { title: 'Continuous III', duration: '9:12', frequency: '440 Hz' },
      { title: 'Continuous IV', duration: '8:30', frequency: '528 Hz' },
      { title: 'Continuous V', duration: '8:11', frequency: '432 Hz' },
    ],
  },
  {
    id: 'mr004',
    catalogNumber: 'MR-001',
    title: 'Foundations',
    year: '2024',
    trackCount: 4,
    coverArt: '/covers/MP_Foundations.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/themanteisproject/foundations',
    spotify: 'https://open.spotify.com/album/0OS6JdgHjDKPJEbgXArA8L',
    tagline: 'What is built on sound cannot collapse.',
    duration: '28:33',
    frequency: '174 Hz',
    tracks: [
      { title: 'Foundation', duration: '7:12', frequency: '174 Hz' },
      { title: 'Pillar', duration: '6:48', frequency: '432 Hz' },
      { title: 'Anchor', duration: '7:05', frequency: '440 Hz' },
      { title: 'Bedrock', duration: '7:28', frequency: '528 Hz' },
    ],
  },
]

export const ARTIST_URL = 'https://themanteisproject.com'
export const SPOTIFY_ARTIST = 'https://open.spotify.com/artist/6fM3YHsrFIvL0VBeNxHSF5'
export const APPLE_MUSIC_ARTIST = 'https://music.apple.com/us/artist/the-manteis-project/1581998562'
export const LABEL_URL = 'https://www.manteisrecordings.com'
