import MarketPlace from "@/components/MarketPlace";
import imgPaymeoLogoWhite2 from "@/public/assets/paymeologowhite.png";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paymeo Marketplace – Discover and Shop from Growing Businesses",
  description:
    "Explore listings from Paymeo-powered businesses. Discover unique products and services before we launch the personal side of our platform.",
  alternates: {
    canonical: "https://paymeo.co/marketplace",
  },
  openGraph: {
    title: "Paymeo Marketplace – Discover and Shop from Growing Businesses",
    description:
      "Explore listings from Paymeo-powered businesses. Discover unique products and services before we launch the personal side of our platform.",
    url: "https://paymeo.co/marketplace",
    siteName: "Paymeo",
    images: [
      {
        url: "https://res.cloudinary.com/diml8ljwa/image/upload/v1762613401/paymeomarketplace-min_wymdfp.png",
        width: 1200,
        height: 630,
        alt: "Paymeo Marketplace Overview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paymeo Marketplace – Discover and Shop from Growing Businesses",
    description:
      "Explore listings from Paymeo-powered businesses. Discover unique products and services before we launch the personal side of our platform.",
    images: [
      "https://res.cloudinary.com/diml8ljwa/image/upload/v1762613401/paymeomarketplace-min_wymdfp.png",
    ],
  },
};

export default function MarketplacePage() {
  return <MarketPlace imgPaymeoLogoWhite2={imgPaymeoLogoWhite2} />;
}
