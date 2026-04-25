
import BecomeSellerPageClient from "./page.client";

export const metadata = {
  title: "Become a Seller",
  description: "Receive shopping requests. Sell 24/7 with AI. List your products once. AI negotiates while you sleep. Escrow protection. Instant payouts. Join thousands of sellers on Paymeo.",
  openGraph: {
    title: "Paymeo | Become a Seller",
    description: "Receive shopping requests. Sell 24/7 with AI. List your products once. AI negotiates while you sleep. Escrow protection. Instant payouts.",
    images: ["https://paymeo.co/opengraph-image.png"],
  },
}


export default function BecomeSellerPage() {
  return <BecomeSellerPageClient />;
}