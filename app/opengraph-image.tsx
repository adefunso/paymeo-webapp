import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Paymeo | AI-Powered Marketplace for Local Sellers and Shoppers.'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return await new ImageResponse(
    (
      <div
        style={{
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          background: 'linear-gradient(135deg, #1e5aff 0%, #0d3bb8 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          color: 'white',
          padding: '40px',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/* Decorative Circle (Bottom Right) */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            display: 'flex',
          }}
        />

        {/* Decorative Circle (Top Left) */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            zIndex: 10,
          }}
        >
          {/* Logo + Name */}
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
              width={120}
              height={120}
              style={{
                borderRadius: '28px',
                objectFit: 'contain',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
              }}
            />
            <div
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                letterSpacing: '-1px',
              }}
            >
              paymeo
            </div>
          </div>

          {/* Main Tagline */}
          <div
            style={{
              fontSize: '56px',
              fontWeight: 'bold',
              textAlign: 'center',
              maxWidth: '1000px',
              lineHeight: 1.2,
              marginBottom: '20px',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            }}
          >
            Shop, Sell, and Get Paid.
          </div>

        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}