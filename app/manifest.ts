import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Paymeo: Find, Sell, Get Paid, Shop & Connect',
    short_name: 'Paymeo',
    description: "Use Paymeo to post what you need. AI connects you to local sellers, handles negotiations. Get recommendations. Shop, Sell, & Pay securely. Tip friends, get paid helping others, and connect around things you love. Use Paymeo today.",
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
