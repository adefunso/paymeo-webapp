
import TermsPageClient from "./page.client";

export const metadata = {
  title: "Terms of Service",
  description: "Read Paymeo's Terms of Service. Learn about usage terms, payments, dispute resolution, wallet terms, seller fees, and your rights and obligations.",
  openGraph: {
    title: "Terms of Service",
    description: "Read Paymeo's Terms of Service. Learn about usage terms, payments, dispute resolution, wallet terms, seller fees, and your rights and obligations.",
  },
}

export default function TermsPage() {
  return <TermsPageClient />;
}