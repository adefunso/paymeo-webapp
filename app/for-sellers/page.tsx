
import ForSellersPageClient from "./page.client";

export const metadata = {
  title: "For Sellers",
  description: "Receive shopping requests. Sell 24/7 with AI. List your products once. AI negotiates while you sleep. Escrow protection. Instant payouts. Join thousands of sellers on Paymeo.",
  openGraph: {
    title: "Paymeo | For Sellers",
    description: "Receive shopping requests. Sell 24/7 with AI. List your products once. AI negotiates while you sleep. Escrow protection. Instant payouts.",
  },
}

export default function ForSellersPage() {
  return <ForSellersPageClient />;
}