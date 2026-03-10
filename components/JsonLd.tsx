"use client";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Paymeo - Paymeo - Find What You Need. Get Paid For What You Deliver.",
    "description": 'Sell with AI. Find what you need. Pay friends, Tip people, and get Paid For what you deliver.',
    "url": "https://paymeo.co",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "operatingSystem": "Web, iOS, Android",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "50"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Paymeo",
      "url": "https://paymeo.co",
      "logo": {
        "@type": "ImageObject",
        "url": "https://paymeo.co/logo.png"
      },
      "sameAs": [
        "https://twitter.com/paymeo",
        "https://facebook.com/paymeo",
        "https://linkedin.com/company/paymeo"
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
