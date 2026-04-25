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
    default: 'Paymeo: Find, Sell, Get Paid, Shop & Connect',
    template: '%s | Paymeo'
  },
  description: "Use Paymeo to post what you're looking for. Your community sends recommendations. AI connects you to local sellers. Shop & Sell smartly with AI that handles negotiations. Pay securely, tip helpful people, earn when you help others find what they need, and connect around things you love. Use Paymeo today.",
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
    title: 'Paymeo: Find, Sell, Get Paid, Shop & Connect',
    description: "Use Paymeo to post what you're looking for. Your community sends recommendations. AI connects you to local sellers. Shop & Sell smartly with AI that handles negotiations. Pay securely, tip helpful people, earn when you help others find what they need, and connect around things you love. Use Paymeo today.",
    siteName: 'Paymeo',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Paymeo: Find, Sell, Get Paid, Shop & Connect',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paymeo: Find, Sell, Get Paid, Shop & Connect',
    description: "Use Paymeo to post what you're looking for. Your community sends recommendations. AI connects you to local sellers. Shop & Sell smartly with AI that handles negotiations. Pay securely, tip helpful people, earn when you help others find what they need, and connect around things you love. Use Paymeo today.",
    images: ['/og-image.png'],
    creator: '@usepaymeo',
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
