import PricingClient from "@/components/PricingClient";
import imgPaymeoLogoWhite2 from "@/public/assets/paymeologowhite.png";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paymeo Pricing – Simple, Transparent Plans for Businesses",
  description: "Start for free, or scale with powerful AI-driven commerce tools for your business.",
  alternates: {
    canonical: "https://paymeo.co/pricing",
  },
  openGraph: {
    title: "Paymeo Pricing – Simple, Transparent Plans for Businesses",
    description: "Start for free, or scale with powerful AI-driven commerce tools for your business.",
    url: "https://paymeo.co/pricing",
    siteName: "Paymeo",
    images: [
      {
        url: "https://res.cloudinary.com/diml8ljwa/image/upload/v1762045743/Screenshot_394_vkowf7.png", // 👈 replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Paymeo Pricing Overview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paymeo Pricing – Simple, Transparent Plans for Businesses",
    description: "Start for free, or scale with powerful AI-driven commerce tools for your business.",
    images: ["https://res.cloudinary.com/diml8ljwa/image/upload/v1762045743/Screenshot_394_vkowf7.png"], // same as OG image
  },
};

export default function PricingPage() {
  return <PricingClient imgPaymeoLogoWhite2={imgPaymeoLogoWhite2} />;
}
