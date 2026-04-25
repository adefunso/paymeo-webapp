
import AboutPageClient from "./page.client";

export const metadata = {
  title: "About",
  description: "Paymeo is an AI-powered marketplace for intent-driven social commerce. We connect shoppers to local sellers through community recommendations, AI negotiation, and secure payments.",
  openGraph: {
    title: "Paymeo | About",
    description: "Learn about Paymeo's mission: connecting shoppers to local sellers through community, AI, and secure payments. Based in Lagos, Nigeria.",
    images: ["https://paymeo.co/opengraph-image.png"],
  },
}

export default function AboutPage() {
  return <AboutPageClient />;
}