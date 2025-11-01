import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'Paymeo - Intent-Driven Social Commerce'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          margin: 0,
          fontFamily: 'Arial, Helvetica, sans-serif',
          background: 'linear-gradient(135deg, #1e5aff 0%, #0d3bb8 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          color: 'white',
          padding: '80px',
          boxSizing: 'border-box',
        }}
      >
        {/* Top Section: Logo + Name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          <img
            src="https://res.cloudinary.com/diml8ljwa/image/upload/v1761962049/paymeologowhite_ukabff.png"
            alt="Paymeo Logo"
            width={170}
            height={170}
            style={{
              borderRadius: '24px',
              objectFit: 'contain',
            }}
          />
          <div
            style={{
              fontSize: '100px',
              fontWeight: 'bold',
              marginTop: '-35px',
              marginLeft: '-30px',
            }}
          >
            paymeo
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '48px',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.3,
          }}
        >
          The Intent-Driven Social Commerce Platform
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
