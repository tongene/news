import type { MetadataRoute } from 'next'
export default function manifest(): MetadataRoute.Manifest {
    return {
      name: 'Culturays',
      short_name: 'Culturays',
      description: 'This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world.',
      start_url: '/',
      display: 'standalone',
      background_color: '#fff',
      theme_color: '#fff',
      icons: [
        {
          src: '/favicon.ico',
          sizes:"16x16",
          type: 'image/x-icon',
        },
      ],
    }
  }