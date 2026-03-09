import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Paymeo | The AI-Powered Marketplace for Local Sellers and Shoppers.',
    short_name: 'Paymeo',
    description: 'Sell 24/7 with AI. Find what you need, pay friends, tip helpful people, and get paid for what you deliver.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e5aff',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
