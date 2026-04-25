
import FAQPageClient from "./page.client";

export const metadata = {
  title: "FAQ",
  description: "Get answers to common questions about Paymeo. Learn how posting requests works, payments, seller fees, wallet setup, bounties, and more.",
  openGraph: {
    title: "Paymeo | FAQ",
    description: "Frequently asked questions about Paymeo. Everything you need to know about shopping, selling, payments, AI, and earning bounties.",
    images: ["https://paymeo.co/opengraph-image.png"],
  },
}

export default function FAQPage() {
  return <FAQPageClient />;
}