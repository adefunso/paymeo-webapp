"use client";

import React from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  Lock, 
  Eye, 
  Database, 
  Cookie, 
  Globe, 
  Mail, 
  Shield, 
  Users, 
  Wallet, 
  FileText, 
  AlertCircle, 
  ArrowUp,
  Building,
  Smartphone
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import imgPaymeoLogoWhite2 from "@/public/assets/paymeologowhite.png";

export const metadata = {
  title: "Privacy Policy | Paymeo",
  description: "Read Paymeo's Privacy Policy. Learn how we collect, use, and protect your personal information in compliance with Nigeria's NDPA.",
  openGraph: {
    title: "Privacy Policy | Paymeo",
    description: "Read Paymeo's Privacy Policy. Learn how we collect, use, and protect your personal information.",
  },
}

export default function PrivacyPage() {
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
            <Lock className="w-4 h-4 text-[#1e5aff]" />
            <span className="text-sm font-medium text-[#1e5aff]">Privacy & Security</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Version 1.0 | Effective: April 24, 2026</p>
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
                <NavItem href="#intro" title="1. Introduction" />
                <NavItem href="#collect" title="2. Information We Collect" />
                <NavItem href="#use" title="3. How We Use Your Information" />
                <NavItem href="#legal" title="4. Legal Basis (EEA Users)" />
                <NavItem href="#share" title="5. How We Share Your Information" />
                <NavItem href="#dojah" title="6. KYC & Dojah Verification" />
                <NavItem href="#retention" title="7. Data Retention" />
                <NavItem href="#rights" title="8. Your Privacy Rights" />
                <NavItem href="#cookies" title="9. Cookies & Tracking" />
                <NavItem href="#security" title="10. Data Security" />
                <NavItem href="#transfer" title="11. International Transfers" />
                <NavItem href="#children" title="12. Children's Privacy" />
                <NavItem href="#thirdparty" title="13. Third-Party Links" />
                <NavItem href="#changes" title="14. Changes to Policy" />
                <NavItem href="#contact" title="15. Contact Us" />
                <NavItem href="#complaints" title="16. Complaints" />
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
            <Section id="intro" title="1. Introduction" icon={Lock}>
              <p className="text-gray-700 leading-relaxed">
                <strong>Meo Technologies Ltd.</strong> (RC No. 8967784) ("Paymeo," "we," "us," or "our") respects your privacy 
                and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, 
                disclose, and safeguard your information when you use the Paymeo platform.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                By using Paymeo, you consent to the data practices described in this Privacy Policy.
              </p>
              <div className="mt-4 p-3 bg-gray-100 rounded-lg text-sm text-gray-600">
                <p><strong>Our Address:</strong> 27/29, Biaduo Street, Keffi-Ikoyi, Lagos, Nigeria</p>
                <p className="mt-1"><strong>Email:</strong> company@paymeo.co</p>
              </div>
            </Section>

            {/* Section 2 - Information Collection */}
            <Section id="collect" title="2. Information We Collect" icon={Database}>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">2.1 Information You Provide Directly</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead><tr className="bg-gray-100"><th className="border p-2 text-left">Category</th><th className="border p-2 text-left">Examples</th></tr></thead>
                      <tbody>
                        <tr><td className="border p-2">Account Information</td><td className="border p-2">Name, email, phone number, profile picture</td></tr>
                        <tr><td className="border p-2">Business Information</td><td className="border p-2">Business name, address, registration (Sellers)</td></tr>
                        <tr><td className="border p-2">KYC Information</td><td className="border p-2">BVN, NIN, government ID (for Wallet activation)</td></tr>
                        <tr><td className="border p-2">Transaction Information</td><td className="border p-2">Purchase history, sales history, offers</td></tr>
                        <tr><td className="border p-2">Communications</td><td className="border p-2">Messages, chat logs, support tickets</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">2.2 Information Collected Automatically</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead><tr className="bg-gray-100"><th className="border p-2 text-left">Category</th><th className="border p-2 text-left">Examples</th></tr></thead>
                      <tbody>
                        <tr><td className="border p-2">Device Information</td><td className="border p-2">IP address, device type, operating system</td></tr>
                        <tr><td className="border p-2">Usage Data</td><td className="border p-2">Pages visited, time spent, search queries</td></tr>
                        <tr><td className="border p-2">Location Data</td><td className="border p-2">Approximate location (IP), precise (if GPS enabled)</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">2.3 Information from Third Parties</h4>
                  <p className="text-gray-700">Paystack (payment confirmation), Dojah (KYC verification), Google (if you sign in).</p>
                </div>
              </div>
            </Section>

            {/* Section 3 - How We Use */}
            <Section id="use" title="3. How We Use Your Information" icon={Eye}>
              <div className="space-y-3">
                <p className="text-gray-700"><strong>To provide the Platform:</strong> Create accounts, process transactions, facilitate communication, enable escrow.</p>
                <p className="text-gray-700"><strong>To verify identity:</strong> KYC via Dojah before Wallet activation, fraud prevention.</p>
                <p className="text-gray-700"><strong>To improve the Platform:</strong> Analyze usage, debug issues, develop features, personalize experience.</p>
                <p className="text-gray-700"><strong>To communicate:</strong> Transaction notifications, customer support, marketing (opt-out available).</p>
                <p className="text-gray-700"><strong>For legal & security:</strong> Fraud detection, enforce Terms, comply with laws.</p>
              </div>
            </Section>

            {/* Section 4 - Legal Basis */}
            <Section id="legal" title="4. Legal Basis for Processing (EEA Users)" icon={Shield}>
              <p className="text-gray-700">If you are in the European Economic Area (EEA), we process your information based on: contractual necessity, legitimate interests, legal obligations, or consent (for marketing).</p>
            </Section>

            {/* Section 5 - Sharing */}
            <Section id="share" title="5. How We Share Your Information" icon={Users}>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">5.1 With Other Users</h4>
                  <p className="text-gray-700">Sellers see your name and delivery address. Shoppers see seller store information. Public posts are visible to everyone.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">5.2 With Service Providers</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead><tr className="bg-gray-100"><th className="border p-2">Provider</th><th className="border p-2">Purpose</th><th className="border p-2">Information Shared</th></tr></thead>
                      <tbody>
                        <tr><td className="border p-2">Paystack</td><td className="border p-2">Payment processing</td><td className="border p-2">Transaction amounts, payment details</td></tr>
                        <tr><td className="border p-2">Dojah</td><td className="border p-2">KYC verification</td><td className="border p-2">BVN, NIN, ID documents, photo</td></tr>
                        <tr><td className="border p-2">Cloud Hosting</td><td className="border p-2">Platform hosting</td><td className="border p-2">All Platform data</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="text-gray-700"><strong>5.3 For Legal Reasons:</strong> We may disclose information to comply with court orders, law enforcement requests, or to protect rights and safety.</p>
                <p className="text-gray-700"><strong>5.4 Business Transfers:</strong> If Paymeo is acquired or merges, your information may be transferred.</p>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                <p><strong>Note:</strong> We do not sell your personal data to third parties for marketing purposes.</p>
              </div>
            </Section>

            {/* Section 6 - Dojah KYC */}
            <Section id="dojah" title="6. KYC & Dojah Verification" icon={Wallet}>
              <div className="space-y-3">
                <p className="text-gray-700"><strong>When verification is required:</strong> Wallet activation, becoming a Seller, or reaching transaction thresholds.</p>
                <p className="text-gray-700"><strong>Information collected by Dojah:</strong> BVN, NIN, government-issued ID, facial recognition photo.</p>
                <p className="text-gray-700"><strong>How Dojah handles your data:</strong> Paymeo receives only the verification result and basic profile information — we do NOT store your BVN or NIN.</p>
                <div className="p-3 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-600">Dojah is an independent third-party. Their privacy policy governs their data handling.</p>
                </div>
              </div>
            </Section>

            {/* Section 7 - Retention */}
            <Section id="retention" title="7. Data Retention" icon={Database}>
              <p className="text-gray-700">We retain your information while your account is active and as needed to provide services. Specific retention periods:</p>
              <ul className="mt-3 space-y-1 text-gray-700">
                <li className="flex items-start gap-2"><ChevronRight className="w-3 h-3 text-[#1e5aff] mt-1" />Transaction records: 7 years (Nigerian tax law requirement)</li>
                <li className="flex items-start gap-2"><ChevronRight className="w-3 h-3 text-[#1e5aff] mt-1" />Chat logs: 2 years</li>
                <li className="flex items-start gap-2"><ChevronRight className="w-3 h-3 text-[#1e5aff] mt-1" />KYC records: 5 years after account closure</li>
                <li className="flex items-start gap-2"><ChevronRight className="w-3 h-3 text-[#1e5aff] mt-1" />Marketing preferences: Until you opt out</li>
              </ul>
            </Section>

            {/* Section 8 - Your Rights */}
            <Section id="rights" title="8. Your Privacy Rights" icon={Shield}>
              <p className="text-gray-700">Under the Nigeria Data Protection Act (NDPA) and NDPR, you have the right to:</p>
              <ul className="mt-3 space-y-1 text-gray-700">
                <li className="flex items-start gap-2"><ChevronRight className="w-3 h-3 text-[#1e5aff] mt-1" /><strong>Access:</strong> Request a copy of your personal information</li>
                <li className="flex items-start gap-2"><ChevronRight className="w-3 h-3 text-[#1e5aff] mt-1" /><strong>Correction:</strong> Correct inaccurate information</li>
                <li className="flex items-start gap-2"><ChevronRight className="w-3 h-3 text-[#1e5aff] mt-1" /><strong>Deletion:</strong> Request deletion (subject to legal retention)</li>
                <li className="flex items-start gap-2"><ChevronRight className="w-3 h-3 text-[#1e5aff] mt-1" /><strong>Object:</strong> Object to processing based on legitimate interests</li>
                <li className="flex items-start gap-2"><ChevronRight className="w-3 h-3 text-[#1e5aff] mt-1" /><strong>Complaint:</strong> Lodge a complaint with the NDPC</li>
              </ul>
              <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-700"><strong>To exercise your rights:</strong> Email company@paymeo.co. We respond within 30 days.</p>
              </div>
              <div className="mt-3">
                <p className="text-gray-700"><strong>Marketing opt-out:</strong> Click "unsubscribe" in marketing emails.</p>
                <p className="text-gray-700 mt-1"><strong>Location data:</strong> Disable GPS in device settings.</p>
                <p className="text-gray-700 mt-1"><strong>Cookies:</strong> Adjust browser settings.</p>
              </div>
            </Section>

            {/* Section 9 - Cookies */}
            <Section id="cookies" title="9. Cookies & Tracking Technologies" icon={Cookie}>
              <p className="text-gray-700">We use cookies for: essential functionality, remembering preferences, analytics, and fraud prevention.</p>
              <p className="text-gray-700 mt-2">You may disable cookies through browser settings, but some Platform features may not work properly.</p>
            </Section>

            {/* Section 10 - Security */}
            <Section id="security" title="10. Data Security" icon={Lock}>
              <p className="text-gray-700">We implement encryption (SSL/TLS), access controls, and regular security assessments. However, no internet transmission is 100% secure. We will notify you and authorities of breaches as required by law.</p>
            </Section>

            {/* Section 11 - International Transfers */}
            <Section id="transfer" title="11. International Data Transfers" icon={Globe}>
              <p className="text-gray-700">Your information may be transferred to Nigeria (our servers) and other countries where our service providers operate. We ensure adequate safeguards are in place.</p>
            </Section>

            {/* Section 12 - Children */}
            <Section id="children" title="12. Children's Privacy" icon={Users}>
              <p className="text-gray-700">Paymeo is not intended for children under 18. We do not knowingly collect information from anyone under 18. If we discover such data, we will delete it immediately.</p>
            </Section>

            {/* Section 13 - Third Party Links */}
            <Section id="thirdparty" title="13. Third-Party Links" icon={LinkIcon}>
              <p className="text-gray-700">The Platform may contain links to third-party websites (Paystack, Dojah). This Privacy Policy does not apply to those websites. Read their privacy policies separately.</p>
            </Section>

            {/* Section 14 - Changes */}
            <Section id="changes" title="14. Changes to This Privacy Policy" icon={FileText}>
              <p className="text-gray-700">We may update this policy. Material changes will be notified via email, in-app notice, or posting on the Platform. Continued use after changes constitutes acceptance.</p>
            </Section>

            {/* Section 15 - Contact */}
            <Section id="contact" title="15. Contact Us" icon={Mail}>
              <div className="p-4 bg-gray-100 rounded-xl">
                <p className="font-semibold">Meo Technologies Ltd.</p>
                <p className="text-gray-600 text-sm">27/29, Biaduo Street, Keffi-Ikoyi, Lagos, Nigeria</p>
                <p className="text-gray-600 text-sm mt-1">Email: <strong>company@paymeo.co</strong></p>
                <p className="text-gray-600 text-sm mt-1">Subject line: "Privacy Request" or "Attention: DPO" for Data Protection Officer</p>
              </div>
            </Section>

            {/* Section 16 - Complaints */}
            <Section id="complaints" title="16. Complaints" icon={AlertCircle}>
              <p className="text-gray-700">If you believe we have violated your privacy rights, you may lodge a complaint with:</p>
              <div className="mt-3 p-3 bg-gray-100 rounded-lg">
                <p className="font-semibold">Nigeria Data Protection Commission (NDPC)</p>
                <p className="text-sm text-gray-600">Website: ndpc.gov.ng</p>
              </div>
              <p className="text-gray-700 mt-3">We encourage you to contact us first so we can attempt to resolve your concern directly.</p>
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

function LinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}