
import PrivacyPageClient from "./page.client";

export const metadata = {
  title: "Privacy Policy",
  description: "Read Paymeo's Privacy Policy. Learn how we collect, use, and protect your personal information in compliance with Nigeria's NDPA.",
  openGraph: {
    title: "Paymeo | Privacy Policy",
    description: "Read Paymeo's Privacy Policy. Learn how we collect, use, and protect your personal information.",
    images: ["https://paymeo.co/opengraph-image.jpg"],
  },
}

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}