# Paymeo Deployment Guide

## 🚀 Quick Deploy to Vercel

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/paymeo)

### Option 2: Manual Deploy

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel --prod
```

## 📋 Pre-Deployment Checklist

### Environment Variables
Set these in your Vercel dashboard or `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://paymeo.co
NEXT_PUBLIC_APP_NAME=Paymeo
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-verification-code
NEXT_PUBLIC_BING_VERIFICATION=your-verification-code
```

### Domain Configuration

1. **Add Custom Domain**
   - Go to Vercel Dashboard → Your Project → Settings → Domains
   - Add `paymeo.co` and `www.paymeo.co`

2. **DNS Configuration**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **SSL Certificate**
   - Automatically provisioned by Vercel
   - Force HTTPS enabled by default

## 🔍 Post-Deployment SEO Setup

### 1. Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://paymeo.co`
3. Verify ownership using HTML tag method
4. Submit sitemap: `https://paymeo.co/sitemap.xml`
5. Request indexing for homepage

### 2. Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add site: `https://paymeo.co`
3. Verify ownership
4. Submit sitemap: `https://paymeo.co/sitemap.xml`

### 3. Google Analytics

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to environment variables
4. Implement tracking (see Analytics section)

### 4. Google Tag Manager (Optional)

1. Create container at [tagmanager.google.com](https://tagmanager.google.com)
2. Get Container ID (GTM-XXXXXXX)
3. Add to environment variables
4. Configure tags for conversion tracking

## 📊 Analytics Implementation

Create `/app/analytics.tsx`:

```tsx
"use client";

import Script from 'next/script';

export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <>
      {/* Google Analytics */}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}

      {/* Google Tag Manager */}
      {gtmId && (
        <>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}
    </>
  );
}
```

Then add to `/app/layout.tsx`:
```tsx
import Analytics from './analytics';

// In body:
<body>
  <Analytics />
  {children}
</body>
```

## 🎯 Performance Optimization

### Vercel Configuration

Create `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-DNS-Prefetch-Control",
          "value": "on"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "origin-when-cross-origin"
        }
      ]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*).png",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Image Optimization

All images are automatically optimized by Next.js:
- WebP format conversion
- Responsive sizes
- Lazy loading
- Blur placeholders

## 🔒 Security Headers

Add to `next.config.js`:
```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}
```

## 📱 PWA Setup (Optional)

The app is PWA-ready. To enable full PWA features:

1. Add service worker
2. Configure caching strategy
3. Add offline fallback page
4. Test with Lighthouse

## 🧪 Testing Before Launch

### 1. Lighthouse Audit
```bash
npm run build
npm run start
# Run Lighthouse in Chrome DevTools
```

Target Scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### 2. Mobile Testing
- Test on real devices
- Use Chrome DevTools device emulation
- Test touch interactions
- Verify viewport meta tag

### 3. SEO Testing
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Schema Markup Validator](https://validator.schema.org/)

### 4. Load Testing
- Test page load speed
- Check Core Web Vitals
- Monitor Time to Interactive (TTI)

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}
          vercel-args: '--prod'
```

## 📈 Monitoring

### 1. Vercel Analytics
- Automatically enabled
- Monitor real user metrics
- Track Web Vitals

### 2. Error Tracking
Consider adding:
- Sentry for error tracking
- LogRocket for session replay

### 3. Uptime Monitoring
- UptimeRobot
- Pingdom
- StatusCake

## 🎉 Launch Checklist

- [ ] Domain configured and verified
- [ ] SSL certificate active
- [ ] Environment variables set
- [ ] Google Search Console verified
- [ ] Bing Webmaster Tools verified
- [ ] Sitemap submitted
- [ ] Analytics configured
- [ ] robots.txt accessible
- [ ] Lighthouse score > 90
- [ ] Mobile responsive tested
- [ ] Forms working
- [ ] All links functional
- [ ] 404 page configured
- [ ] Favicon and icons present
- [ ] Social share images working
- [ ] Meta tags verified
- [ ] Schema markup validated

## 🚨 Troubleshooting

### Build Failures
```bash
# Clear cache
rm -rf .next
npm run build
```

### Deployment Issues
- Check Vercel logs
- Verify environment variables
- Check build output

### SEO Issues
- Wait 24-48 hours for indexing
- Check robots.txt
- Verify sitemap accessibility
- Check Search Console for errors

## 📞 Support

For deployment issues:
- Vercel Support: support@vercel.com
- Documentation: https://nextjs.org/docs

---

**Deployment Date**: _____________________  
**Deployed By**: _____________________  
**Version**: 1.0.0
