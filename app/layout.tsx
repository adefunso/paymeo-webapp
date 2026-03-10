import type { Metadata } from 'next'
import '../styles/globals.css'
import JsonLd from '../components/JsonLd'
import { Manrope } from "next/font/google";
import localFont from "next/font/local";


const paymeoSans = localFont({
  src: [
    {
      path: "../public/fonts/PaymeoSans-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/PaymeoSans-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/PaymeoSans-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-paymeo-sans",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://paymeo.co'),
  title: {
    default: 'Paymeo - Find What You Need. Get Paid For What You Deliver.',
    template: '%s | Paymeo'
  },
  description: 'Sell 24/7 with AI. Find what you need. Pay Securely. Tip people, and get Paid For what you deliver.',
  keywords: [
    'social commerce',
    'intent-driven commerce',
    'AI-Powered Marketplace',
    'online marketplace',
    'social networking',
    'peer-to-peer payments',
    'buy and sell online',
    'connect with sellers',
    'social shopping',
    'community marketplace',
    'Paymeo'
  ],
  authors: [{ name: 'Paymeo' }],
  creator: 'Paymeo',
  publisher: 'Paymeo',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://paymeo.co',
    title: 'Paymeo - Find What You Need. Get Paid For What You Deliver.',
    description: 'Sell 24/7 with AI. Find what you need. Pay securely. Tip people, and get Paid For what you deliver.',
    siteName: 'Paymeo',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Paymeo - Find What You Need. Get Paid For What You Deliver.',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paymeo - Find What You Need. Get Paid For What You Deliver.',
    description: 'Sell 24/7 with AI, Find what you need. Pay securely. Tip people, and get Paid For what you deliver.',
    images: ['/og-image.png'],
    creator: '@paymeo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://paymeo.co',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Paymeo',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={paymeoSans.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <JsonLd />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
