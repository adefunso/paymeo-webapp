"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, FileText, Shield, Wallet, Users, ShoppingBag, Bot, AlertCircle, Scale, Clock, ArrowUp, MessageCircle, Gavel, Eye, Lock } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import imgPaymeoLogoWhite2 from "@/public/assets/paymeologowhite.png";

export default function TermsPageClient() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <Nav
        imgPaymeoLogoWhite2={imgPaymeoLogoWhite2}
        activeTab="business"
        setActiveTab={() => {}}
        setIsProfileOpen={() => {}}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#1e5aff]/10 rounded-full px-4 py-2 mb-6">
            <FileText className="w-4 h-4 text-[#1e5aff]" />
            <span className="text-sm font-medium text-[#1e5aff]">Legal Document</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600">Version 2.0 | Last Updated: April 26, 2026</p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-28 bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#1e5aff]" />
                Contents
              </h3>
              <nav className="space-y-2 text-sm">
                <NavItem href="#section-1" title="1. Introduction" />
                <NavItem href="#section-2" title="2. About Paymeo" />
                <NavItem href="#section-3" title="3. Eligibility & Account" />
                <NavItem href="#section-4" title="4. Paymeo Wallet (Self-Kolo)" />
                <NavItem href="#section-5" title="5. Transaction Types" />
                <NavItem href="#section-6" title="6. Bounties (User-to-User)" />
                <NavItem href="#section-7" title="7. Shopper-to-Seller" />
                <NavItem href="#section-8" title="8. Seller Terms" />
                <NavItem href="#section-9" title="9. Shopper Terms" />
                <NavItem href="#section-10" title="10. AI Features" />
                <NavItem href="#section-11" title="11. Return & Refund" />
                <NavItem href="#section-12" title="12. Prohibited Items" />
                <NavItem href="#section-13" title="13. Community Standards" />
                <NavItem href="#section-14" title="14. Transaction Chats & Bounty Logistics" />
                <NavItem href="#section-15" title="15. Shopper-to-Seller Escrow & Disputes" />
                <NavItem href="#section-16" title="16. Fees & Payments" />
                <NavItem href="#section-17" title="17. User Content" />
                <NavItem href="#section-18" title="18. Dispute Resolution" />
                <NavItem href="#section-19" title="19. Limitation of Liability" />
                <NavItem href="#section-20" title="20. Disclaimer" />
                <NavItem href="#section-21" title="21. Indemnification" />
                <NavItem href="#section-22" title="22. Law Enforcement Cooperation" />
                <NavItem href="#section-23" title="23. Termination" />
                <NavItem href="#section-24" title="24. General Provisions" />
                <NavItem href="#section-25" title="25. Contact" />
              </nav>
              <button
                onClick={scrollToTop}
                className="mt-6 w-full flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-[#1e5aff] transition-colors pt-4 border-t border-gray-200"
              >
                <ArrowUp className="w-3 h-3" />
                Back to top
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-8">
            {/* Section 1 */}
            <Section id="section-1" title="1. Introduction" icon={FileText}>
              <h3 className="text-blue-700 leading-relaxed font-bold">Thank you for using Paymeo!</h3>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Service ("Terms") govern your use of the Paymeo website (paymeo.co), 
                mobile application, and related services (collectively, the "Platform"). Paymeo is a product of{" "}
                <strong>Meo Technologies Ltd.</strong> (RC No. 8967784), a company registered in Nigeria with offices at{" "}
                <strong>27/29, Biaduo Street, Keffi-Ikoyi, Lagos, Nigeria</strong> ("Paymeo," "we," "us," or "our").
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                By accessing or using the Platform, you agree to be bound by these Terms, our Privacy Policy, and all 
                other policies referenced herein. If you do not agree, please do not use the Platform.
              </p>
            </Section>

            {/* Section 2 */}
            <Section id="section-2" title="2. About Paymeo" icon={ShoppingBag}>
              <p className="text-gray-700 leading-relaxed">
                Paymeo is an AI-powered marketplace for intent-driven social commerce — connecting shoppers to local 
                sellers who deliver. The Platform allows:
              </p>
              <ul className="mt-3 space-y-2 text-gray-700">
                <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-[#1e5aff] mt-0.5 shrink-0" />Shoppers to find what they need, receive offers and recommendations, and pay securely</li>
                <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-[#1e5aff] mt-0.5 shrink-0" />Sellers to list products, receive AI-negotiated offers, and get paid</li>
                <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-[#1e5aff] mt-0.5 shrink-0" />Users to earn bounties by helping others find items and make recommendations</li>
              </ul>
              <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Paymeo is a facilitator and does not take ownership of any goods sold through 
                  the Platform. We provide a marketplace, payment processing, and communication tools. The actual contract 
                  of sale is directly between the Shopper and the Seller.
                </p>
              </div>
            </Section>

            {/* Section 3 */}
            <Section id="section-3" title="3. Eligibility & Account Registration" icon={Users}>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">3.1 Age Requirement</h4>
                  <p className="text-gray-700">You must be at least 18 years old to create an account on Paymeo.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">3.2 Account Creation</h4>
                  <p className="text-gray-700">You must provide accurate, complete, and current information including your name, email address, and phone number.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">3.3 Account Security</h4>
                  <p className="text-gray-700">You are responsible for maintaining the confidentiality of your login credentials. Notify us immediately of unauthorized use at company@paymeo.co.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">3.4 Verification (Wallet Setup)</h4>
                  <p className="text-gray-700">To activate your Paymeo wallet, you must complete identity verification using Dojah, including your BVN or NIN. This is a one-time requirement for wallet functionality.</p>
                </div>
              </div>
            </Section>

            {/* Section 4 - Self-Kolo */}
            <Section id="section-4" title="4. Paymeo Wallet (Self-Kolo)" icon={Wallet}>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">4.1 Wallet Overview</h4>
                  <p className="text-gray-700">Your Paymeo Wallet, powered by Paystack, allows you to fund your account, pay for items, receive payments, tips, and bounties.</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    4.2 Self-Custodied Model ("Self-Kolo")
                  </h4>
                  <p className="text-blue-700 text-sm">
                    Funds remain in your control until you personally initiate a "Release" or "Payout." Paymeo does NOT hold, 
                    manage, or have access to your funds in a centralized account and cannot "force" a payout or refund.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">4.3 Funding Your Wallet</h4>
                  <p className="text-gray-700">You may fund your Wallet using card payments or bank transfers via Paystack.</p>
                </div>
              </div>
            </Section>

            {/* Section 5 - Transaction Types Table */}
            <Section id="section-5" title="5. Transaction Types" icon={Scale}>
              <p className="text-gray-700 mb-4">Paymeo supports three distinct types of transactions:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-3 text-left font-semibold">Transaction Type</th>
                      <th className="border p-3 text-left font-semibold">Escrow?</th>
                      <th className="border p-3 text-left font-semibold">Paymeo's Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="border p-3"><strong>Bounties (User-to-User)</strong><br /><span className="text-xs text-gray-500">Recommendations</span></td>
                      <td className="border p-3">No (Self-Kolo)</td>
                      <td className="border p-3">No dispute resolution - communication pipe only</td>
                    </tr>
                    <tr className="border-b">
                      <td className="border p-3"><strong>Shop Ask (Shopper-to-Seller)</strong><br /><span className="text-xs text-gray-500">Direct request</span></td>
                      <td className="border p-3">Yes</td>
                      <td className="border p-3">Formal mediator & escrow holder</td>
                    </tr>
                    <tr>
                      <td className="border p-3"><strong>Discover Purchases</strong><br /><span className="text-xs text-gray-500">Browse & buy</span></td>
                      <td className="border p-3">Yes</td>
                      <td className="border p-3">Formal mediator & escrow holder</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            {/* Section 6 - Bounties */}
            <Section id="section-6" title="6. Bounties (User-to-User Recommendations)" icon={Users}>
              <div className="space-y-3">
                <p className="text-gray-700">Users can post requests ("Bounties") asking for recommendations. Other users ("Responders") can reply with helpful information.</p>
                <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-1">6.2 No Escrow for Bounties</h4>
                  <p className="text-red-700 text-sm">Funds for Bounties are NOT held in escrow. Payments are processed through the Self-Kolo wallet model.</p>
                </div>
                <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-1">6.3 No Dispute Resolution for Bounties</h4>
                  <p className="text-red-700 text-sm">Paymeo does NOT offer dispute resolution for User-to-User Bounties. Any disagreement must be resolved directly between users.</p>
                </div>
                <p className="text-gray-700">Paymeo provides Transaction Chats to facilitate communication but does not review chat transcripts for dispute resolution purposes.</p>
              </div>
            </Section>

            {/* Section 7 - Shopper-to-Seller */}
            <Section id="section-7" title="7. Shopper-to-Seller Transactions" icon={ShoppingBag}>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">7.2 The Escrow Process</h4>
                  <p className="text-gray-700">When a Shopper pays for goods, Paymeo securely holds the funds in escrow until the Shopper confirms receipt or the auto-release period expires.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">7.6 Auto-Release</h4>
                  <p className="text-gray-700">If the Shopper does not confirm receipt or file a dispute within <strong>seven (7) calendar days</strong> of delivery verification, funds auto-release to the Seller.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">7.8 Paymeo as Arbiter</h4>
                  <p className="text-gray-700">Unlike bounties, Paymeo acts as a formal mediator for Shopper-to-Seller disputes, reviewing chat logs, photos, and tracking information to make a final binding decision.</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-sm text-green-800">By using Paymeo's shopping features, both Shoppers and Sellers agree to abide by Paymeo's final decision regarding escrowed funds.</p>
                </div>
              </div>
            </Section>

            {/* Section 8 - Seller Terms */}
            <Section id="section-8" title="8. Seller Terms" icon={StoreIcon}>
              <div className="space-y-3">
                <p className="text-gray-700"><strong>8.2 Seller Fees:</strong> Sellers pay 3-5% commission per transaction, OR subscribe to a monthly/annual plan (see <a href="https://paymeo.co/pricing" className="text-blue-500 font-bold">paymeo.co/pricing</a>) for 0% commission.</p>
                <p className="text-gray-700"><strong>8.5 AI Negotiation:</strong> Sellers may enable Paymeo's AI to negotiate within price parameters they set. Sellers remain responsible for all offers accepted by the AI.</p>
                <p className="text-gray-700"><strong>8.7 Seller Verification:</strong> Paymeo may require Sellers to provide additional verification before activating selling privileges.</p>
              </div>
            </Section>

            {/* Section 9 - Shopper Terms */}
            <Section id="section-9" title="9. Shopper Terms" icon={Users}>
              <div className="space-y-3">
                <p className="text-gray-700"><strong>9.1 Making a Purchase:</strong> Funds are held in escrow until you confirm receipt or the auto-release period expires.</p>
                <p className="text-gray-700"><strong>9.3 Posting Requests:</strong> You may add a "bounty" to incentivize faster responses. Any bounty offered is a binding commitment.</p>
                <p className="text-gray-700"><strong>9.4 Tipping:</strong> Tips are final and non-refundable.</p>
              </div>
            </Section>

            {/* Section 10 - AI Features */}
            <Section id="section-10" title="10. AI Features" icon={Bot}>
              <div className="space-y-3">
                <p className="text-gray-700"><strong>10.1 AI Negotiation:</strong> Paymeo's AI acts based on parameters set by Sellers.</p>
                <p className="text-gray-700"><strong>10.2 Limitation of Liability:</strong> Paymeo is not liable for any offer made by AI acting within Seller-set parameters.</p>
                <p className="text-gray-700"><strong>10.3 No Legal Advice:</strong> Paymeo's AI does not provide legal, financial, or professional advice.</p>
              </div>
            </Section>

            {/* Section 11 - Return & Refund */}
            <Section id="section-11" title="11. Return & Refund Policy" icon={AlertCircle}>
              <div className="p-4 bg-gray-100 rounded-xl mb-4">
                <p className="font-semibold text-gray-900">11.1 General Rule: All Sales Final</p>
                <p className="text-gray-700 text-sm mt-1">All sales completed on Paymeo are final unless the item is fraudulent or materially not as described.</p>
              </div>
              <div className="space-y-3">
                <p className="text-gray-700"><strong>Refunds available for:</strong> Non-delivery, counterfeit/fraudulent items, materially different items.</p>
                <p className="text-gray-700"><strong>Refunds NOT available for:</strong> Buyer's remorse, minor differences, damage after delivery, delayed delivery, bounties/recommendations.</p>
                <p className="text-gray-700"><strong>Return Process:</strong> Shopper files dispute within 7 days → Paymeo reviews → If approved, return arranged between parties → Refund issued.</p>
              </div>
            </Section>

            {/* Section 12 - Prohibited Items */}
            <Section id="section-12" title="12. Prohibited Items" icon={AlertCircle}>
              <div className="space-y-3">
                <p className="text-gray-700">The following items may NOT be sold on Paymeo: illegal drugs, weapons, stolen goods, counterfeit products, live animals, human remains, hazardous materials.</p>
                <p className="text-gray-700">Prohibited activities include: off-platform transactions, fake accounts, fraud, harassment, false information.</p>
                <p className="text-gray-700">Violations may result in listing removal, fund freezing, account termination, or reporting to law enforcement.</p>
              </div>
            </Section>

            {/* Section 13 - Community Standards & Content Moderation (UPDATED with political content) */}
            <Section id="section-13" title="13. Community Standards & Content Moderation" icon={Shield}>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">13.1 Universal Application</h4>
                  <p className="text-gray-700">
                    These standards apply to all user-generated content on Paymeo, including but not limited to: general feed posts, 
                    Bounty-attached requests ("Bounties"), Shop Asks, comments, and Transaction Chats. Paymeo maintains a zero-tolerance 
                    policy for content that threatens user safety, national stability, or violates Nigerian Law.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">13.2 Prohibited Content & Bounties</h4>
                  <p className="text-gray-700 mb-2">You are strictly prohibited from posting, soliciting, or rewarding any content related to:</p>
                  <ul className="space-y-1 text-gray-700 list-disc list-inside ml-2">
                    <li><strong>Personal Harassment:</strong> Bounties or posts intended to locate, track, dox, or issue "wanted" notices for private individuals.</li>
                    <li><strong>Violence & Harm:</strong> Any request for physical harm, stalking, or incitement to violence against any person or group.</li>
                    <li><strong>Regulated Goods:</strong> Sale or solicitation of narcotics, firearms, ammunition, or counterfeit currency.</li>
                    <li><strong>Illegal Services:</strong> Bounties for hacking, currency manipulation (outside CBN guidelines), or unauthorized lending.</li>
                    <li><strong>Indecency:</strong> Obscene, pornographic, or religiously offensive material.</li>
                    <li>
                      <strong>Political Content:</strong> The following political activities and content are strictly prohibited:
                      <ul className="space-y-1 text-gray-700 list-disc list-inside ml-6 mt-1">
                        <li>Hate speech directed at political figures, parties, or ethnic/political affiliations</li>
                        <li>Incitement to violence against government institutions, law enforcement, or political opponents</li>
                        <li>Content that threatens national security, unity, or territorial integrity of Nigeria</li>
                        <li>Bounties for "wanted" notices or targeting of political opponents, activists, or public officials</li>
                        <li>False information intended to disrupt elections, incite public unrest, or undermine democratic processes</li>
                        <li>Calls for secession, coup d'état, or unconstitutional changes to government</li>
                        <li>Promotion of terrorist organizations, insurgent groups, or any entity advocating political violence</li>
                        <li>Harassment, doxxing, or coordinated attacks on political figures, candidates, or their supporters</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">13.3 Automated & Community Moderation</h4>
                  <p className="text-gray-700">Paymeo utilizes AI-driven keyword filtering and sentiment analysis to flag prohibited content. We reserve the right to:</p>
                  <ul className="space-y-1 text-gray-700 list-disc list-inside ml-2 mt-2">
                    <li><strong>Pre-screen:</strong> Block posts containing blacklisted terms before they appear.</li>
                    <li><strong>Shadow-ban:</strong> Automatically hide posts that receive multiple community "Reports" pending manual review.</li>
                    <li><strong>Remove:</strong> Delete any content deemed a violation of these terms without prior notice.</li>
                    <li><strong>Report:</strong> Flag serious violations (especially political violence or national security threats) to relevant law enforcement agencies.</li>
                  </ul>
                </div>
              </div>
            </Section>

            {/* Section 14 - Transaction Chats & Bounty Logistics */}
            <Section id="section-14" title="14. Transaction Chats & Bounty Logistics" icon={MessageCircle}>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">14.1 The Bounty-to-Chat "Bridge"</h4>
                  <p className="text-gray-700">
                    To ensure transaction clarity and reduce feed clutter, Authors of Bounty posts may activate a Transaction Chat with a Responder.
                  </p>
                  <ul className="space-y-1 text-gray-700 list-disc list-inside ml-2 mt-2">
                    <li><strong>Waiver of Tips:</strong> For Bounties exceeding ₦5,000, the requirement for a "New Chat Tip" is waived. The Bounty serves as the authorization to open a private dialogue.</li>
                    <li><strong>Contextual UI:</strong> Based on the post category (e.g., Shopping vs. Service), the chat interface may adapt to include specific tools (e.g., photo proofs, waybill uploads, or milestone checklists).</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">14.2 The Self-Kolo Model (Liability Waiver)</h4>
                  <p className="text-blue-700 text-sm">
                    Paymeo utilizes a self-custody ("Self-Kolo") mechanism for User-to-User Bounties.
                  </p>
                  <ul className="space-y-1 text-blue-700 text-sm list-disc list-inside ml-2 mt-2">
                    <li><strong>Author Control:</strong> Funds are locked in the Author's own wallet and released only by the Author's manual confirmation.</li>
                    <li><strong>No Arbitration:</strong> For peer-to-peer Bounties, Paymeo acts solely as a communication pipe. We do not offer dispute resolution or mediation for Bounties. The Author is solely responsible for vetting the recommendation before releasing funds.</li>
                  </ul>
                </div>
              </div>
            </Section>

            {/* Section 15 - Shopper-to-Seller Escrow & Disputes */}
            <Section id="section-15" title="15. Shopper-to-Seller Escrow & Disputes" icon={Gavel}>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">15.1 Escrow Protection</h4>
                  <p className="text-gray-700">
                    For transactions involving the purchase of physical goods through the "Shop Asks" feature or "Discover" marketplace, 
                    Paymeo acts as a Marketplace Facilitator. Funds are held in a secure Escrow Kolo until delivery is confirmed by 
                    the Shopper or the 48-hour auto-release period expires.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">15.2 Mandatory Dispute Resolution</h4>
                  <p className="text-gray-700">
                    In the event of non-delivery or defective goods, Shoppers must initiate a Dispute within the Transaction Chat.
                  </p>
                  <ul className="space-y-1 text-gray-700 list-disc list-inside ml-2 mt-2">
                    <li><strong>Review of Logs:</strong> Paymeo reserves the right to review Chat logs and media (photos/waybills) to adjudicate the dispute.</li>
                    <li><strong>Final Decision:</strong> By using the Shopping feature, both parties agree to abide by Paymeo's final determination regarding refunds or payouts.</li>
                  </ul>
                </div>
              </div>
            </Section>

            {/* Section 16 - Fees */}
            <Section id="section-16" title="16. Fees & Payments" icon={Wallet}>
              <p className="text-gray-700">All fees are disclosed on the Platform. Your continued use after fee changes constitutes acceptance. You are responsible for all applicable taxes. Payments processed by Paystack - Paymeo is not responsible for Paystack's services.</p>
            </Section>

            {/* Section 17 - User Content */}
            <Section id="section-17" title="17. User Content" icon={FileText}>
              <p className="text-gray-700">You retain ownership of content you post. By posting, you grant Paymeo a worldwide, royalty-free license to use your content to operate the Platform. Paymeo reserves the right to remove objectionable content.</p>
            </Section>

            {/* Section 18 - Dispute Resolution */}
            <Section id="section-18" title="18. Dispute Resolution" icon={Scale}>
              <div className="space-y-3">
                <p className="text-gray-700"><strong>Bounties:</strong> No formal dispute resolution. Users resolve directly.</p>
                <p className="text-gray-700"><strong>Shopper-to-Seller:</strong> Formal mediation by Paymeo. Decision is final and binding.</p>
                <p className="text-gray-700"><strong>Disputes with Paymeo:</strong> Attempt informal resolution → then binding arbitration in Lagos, Nigeria.</p>
              </div>
            </Section>

            {/* Section 19 - Limitation of Liability */}
            <Section id="section-19" title="19. Limitation of Liability" icon={AlertCircle}>
              <div className="p-4 bg-yellow-50 rounded-xl">
                <p className="text-yellow-800 text-sm">
                  Paymeo is not liable for any losses, damages, or injuries resulting from recommendations, product quality, 
                  delivery, or user interactions. Liability strictly limited to technical functionality of the Platform. 
                  For escrow transactions, liability limited to the value of funds held in that specific escrow Kolo.
                </p>
              </div>
            </Section>

            {/* Section 20 - Disclaimer */}
            <Section id="section-20" title="20. Disclaimer of Warranties" icon={Shield}>
              <p className="text-gray-700">The Platform is provided "AS IS" without warranties. Paymeo does not warrant uninterrupted service, accuracy of recommendations, or that transactions will complete as expected.</p>
            </Section>

            {/* Section 21 - Indemnification */}
            <Section id="section-21" title="21. Indemnification" icon={Shield}>
              <p className="text-gray-700">You agree to indemnify Meo Technologies Ltd. from any claims arising from your use of the Platform, violations of these Terms, or disputes with other users.</p>
            </Section>

            {/* Section 22 - Law Enforcement Cooperation */}
            <Section id="section-22" title="22. Law Enforcement Cooperation" icon={Eye}>
              <div className="p-4 bg-gray-100 rounded-xl">
                <p className="text-gray-700">
                  Paymeo complies with the Cybercrimes Act and NDPR. We will cooperate with the Nigeria Police Force (NPF), 
                  EFCC, and other authorized bodies by providing transaction logs and user identity data (KYC) when a valid 
                  legal warrant is presented regarding criminal bounties or fraudulent activity.
                </p>
              </div>
            </Section>

            {/* Section 23 - Termination */}
            <Section id="section-23" title="23. Termination" icon={AlertCircle}>
              <p className="text-gray-700">You may delete your account at any time. Paymeo may suspend or terminate accounts for violations. Upon termination, pending transactions may be cancelled or completed at Paymeo's discretion.</p>
            </Section>

            {/* Section 24 - General */}
            <Section id="section-24" title="24. General Provisions" icon={FileText}>
              <div className="space-y-2 text-gray-700">
                <p><strong>Governing Law:</strong> Laws of the Federal Republic of Nigeria.</p>
                <p><strong>Amendments:</strong> Paymeo may update Terms at any time. Continued use constitutes acceptance.</p>
                <p><strong>Severability:</strong> If any provision is invalid, remaining provisions remain in force.</p>
              </div>
            </Section>

            {/* Section 25 - Contact */}
            <Section id="section-25" title="25. Contact Us" icon={Users}>
              <div className="p-4 bg-gray-100 rounded-xl">
                <p className="font-semibold">Meo Technologies Ltd.</p>
                <p className="text-gray-600 text-sm">27/29, Biaduo Street, Keffi-Ikoyi, Lagos, Nigeria</p>
                <p className="text-gray-600 text-sm mt-1">Email: company@paymeo.co</p>
              </div>
            </Section>

            {/* Footer note */}
            <div className="pt-8 text-center text-gray-400 text-xs border-t border-gray-200">
              <p>Paymeo is a product of Meo Technologies Ltd. (RC No. 8967784)</p>
              <p className="mt-1">Last Updated: April 24, 2026</p>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// Helper Components
function Section({ id, title, icon: Icon, children }: { id: string; title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-4 pb-2 border-b border-gray-200">
        <div className="w-8 h-8 bg-[#1e5aff]/10 rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 text-[#1e5aff]" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function NavItem({ href, title }: { href: string; title: string }) {
  return (
    <Link href={href} className="block py-1.5 text-gray-600 hover:text-[#1e5aff] transition-colors text-sm">
      {title}
    </Link>
  );
}

// Custom icon components
function StoreIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="M3 9 5 3h14l2 6" />
      <path d="M12 9v6" />
      <path d="M9 12h6" />
    </svg>
  );
}