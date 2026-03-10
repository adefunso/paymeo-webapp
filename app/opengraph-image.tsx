import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Paymeo - Find What You Need. Get Paid For What You Deliver.'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  // Use your static image
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://www.paymeo.co/og-image.png" // Replace with your actual URL
          alt="Paymeo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}