import PricingClient from "@/components/PricingClient";
import imgPaymeoLogoWhite2 from "@/public/assets/paymeologowhite.png";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paymeo Pricing – Simple, Transparent Plans for Sellers",
  description: "Sell on Paymeo with zero upfront cost. Choose pay-as-you-go (3-5% commission) or subscription plans (0% commission). Free for shoppers. No hidden fees.",
  alternates: {
    canonical: "https://paymeo.co/pricing",
  },
  openGraph: {
    title: "Paymeo Pricing – Simple, Transparent Plans for Sellers",
    description: "Sell on Paymeo with zero upfront cost. Choose pay-as-you-go (3-5% commission) or subscription plans (0% commission). Free for shoppers. No hidden fees.",
    url: "https://paymeo.co/pricing",
    siteName: "Paymeo",
    images: [
      {
        url: "https://paymeo.co/opengraph-image.jpg", // 👈 replace with your actual OG image
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
    title: "Paymeo Pricing – Simple, Transparent Plans for Sellers",
    description: "Sell on Paymeo with zero upfront cost. Choose pay-as-you-go (3-5% commission) or subscription plans (0% commission). Free for shoppers. No hidden fees.",
    images: ["https://paymeo.co/opengraph-image.jpg"], // same as OG image
  },
};

export default function PricingPage() {
  return <PricingClient imgPaymeoLogoWhite2={imgPaymeoLogoWhite2} />;
}
