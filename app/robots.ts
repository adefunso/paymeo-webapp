

import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api', '/admin'], // Add paths you don't want indexed, e.g., ['/admin']
    },
    sitemap: 'https://paymeo.co/sitemap.xml',
  }
}