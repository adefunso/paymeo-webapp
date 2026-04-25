
import ForShoppersPageClient from "./page.client";

export const metadata = {
  title: "For Shoppers",
  description: "Find exactly what you need. Post requests, get community recommendations, receive AI-matched offers from local sellers, pay securely, get paid helping others, and tip helpful people.",
  openGraph: {
    title: "Paymeo | For Shoppers",
    description: "Stop searching. Start finding. Post what you need. Your community sends recommendations. AI connects you to sellers. Pay securely. Get paid helping others.",
    images: ["https://paymeo.co/opengraph-image.jpg"],
  },
}

export default function ForShoppersPage() {
  return <ForShoppersPageClient />;
}