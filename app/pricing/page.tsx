import PricingClient from "@/components/PricingClient";
import imgPaymeoLogoWhite2 from "@/public/assets/paymeologowhite.png";

export const metadata = {
  title: "Paymeo Pricing – Simple, Transparent Plans for Businesses",
  description: "Discover Paymeo’s flexible pricing plans that scale with your business.",
  alternates: {
    canonical: "https://paymeo.co/pricing",
  },
};

export default function PricingPage() {
  return <PricingClient imgPaymeoLogoWhite2={imgPaymeoLogoWhite2} />;
}
