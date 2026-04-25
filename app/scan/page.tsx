
import ScanPageClient from "./page.client";

export const metadata = {
  title: "Scan to Shop",
  description: "Scan QR codes at local stalls. Browse products instantly. Pay securely. Get directions to the seller. No app download required for basic scanning.",
  openGraph: {
    title: "Paymeo | Scan to Shop",
    description: "Scan QR codes at local markets. Browse seller products. Pay securely. Get real-time directions to their stall.",
    images: ["https://paymeo.co/opengraph-image.jpg"],
  },
}

export default function ScanPage() {
  return <ScanPageClient />;
}