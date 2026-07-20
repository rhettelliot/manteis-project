import type { MetadataRoute } from 'next'
import { ARTIST_URL } from '@/lib/releases'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: ARTIST_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
