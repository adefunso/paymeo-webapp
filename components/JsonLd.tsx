"use client";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Paymeo",
    "description": "Intent-driven social commerce platform that helps you discover anything, shop with confidence, pay friends and connect over the things you love.",
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
