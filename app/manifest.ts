import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Paymeo: Find, Sell, Get Paid, Shop & Connect',
    short_name: 'Paymeo',
    description: "Use Paymeo to post what you're looking for. Your community sends recommendations. AI connects you to local sellers. Shop & Sell smartly with AI that handles negotiations. Pay securely, tip helpful people, earn when you help others find what they need, and connect around things you love. Use Paymeo today.",
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
