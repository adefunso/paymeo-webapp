
import PrivacyPageClient from "./page.client";

export const metadata = {
  title: "Privacy Policy",
  description: "Read Paymeo's Privacy Policy. Learn how we collect, use, and protect your personal information in compliance with Nigeria's NDPA.",
  openGraph: {
    title: "Privacy Policy",
    description: "Read Paymeo's Privacy Policy. Learn how we collect, use, and protect your personal information.",
  },
}

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}