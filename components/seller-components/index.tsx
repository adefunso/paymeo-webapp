"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Camera,
  Zap,
  Bell,
  QrCode,
  Link as LinkIcon,
  CreditCard,
  MessageCircle,
  BarChart,
  Globe,
  Users,
  TrendingUp,
  Shield,
} from "lucide-react";

/* ---------------------------------------------------------
   Seller Features Component (Original Design Preserved)
--------------------------------------------------------- */
export function SellerFeatures() {
  const features = [
    {
      icon: <Camera className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Snap to List",
      description:
        "Snap photos of your products. Our AI auto-generates listings instantly. No technical skills needed.",
    },
    {
      icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "24/7 AI Agent",
      description:
        "Your AI assistant negotiates with customers, answers questions, and closes sales—even while you sleep.",
    },
    {
      icon: <Bell className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Real-Time Requests",
      description:
        "Get notified when shoppers post requests for products you sell. Respond first, win the sale.",
    },
    {
      icon: <QrCode className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "QR Code Storefront",
      description:
        "Place QR at your stall. Walk-in customers scan, browse with AI, and buy—even when you're busy.",
    },
    {
      icon: <LinkIcon className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Shareable Store Link",
      description:
        "Get a unique store link to share on social media, WhatsApp, or anywhere customers are.",
    },
    {
      icon: <CreditCard className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Escrow Payments",
      description:
        "Funds held securely until customer confirms pickup. No scams. No chargebacks.",
    },
    {
      icon: <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "WhatsApp Integration",
      description:
        "Receive customer requests directly in WhatsApp. Respond where you're already active.",
    },
    {
      icon: <BarChart className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Sales Analytics",
      description:
        "Track your sales, popular products, and customer activity—all in one simple dashboard.",
    },
    {
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Sell 24/7",
      description:
        "Your stall never closes. Keep selling even when you're home, sleeping, or restocking.",
    },
    {
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Group Sales",
      description:
        "When shoppers create Co-Pay groups, you sell more at once. Bulk orders = bigger revenue.",
    },
    {
      icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Bounty Scouts",
      description:
        "Scouts earn bounties finding items for shoppers. They'll bring customers to your stall.",
    },
    {
      icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Verified Badge",
      description:
        "Get verified as a real stall. Build trust with shoppers who can visit you in person.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: "easeOut",
          }}
          className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-[#c4d4ff] hover:shadow-xl transition-all"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1e5aff]/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4 text-[#1e5aff]">
            {feature.icon}
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2">
            {feature.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------
   Seller How It Works Component (Original Design Preserved)
--------------------------------------------------------- */
export function SellerHowItWorks() {
  return (
    <div className="space-y-8">
      {/* Step 1 */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-[#1e5aff] rounded-full flex items-center justify-center text-white font-bold shrink-0">
          1
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Snap & Set Up</h3>
          <p className="text-gray-600 mb-2">
            Take photos of your products. Set your prices and minimums. Your AI
            storefront is ready in minutes. Add your bank details to your wallet
            to receive payments instantly.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Camera upload
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Price floor settings
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Wallet connection
            </span>
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-[#1e5aff] rounded-full flex items-center justify-center text-white font-bold shrink-0">
          2
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">AI Sells 24/7</h3>
          <p className="text-gray-600 mb-2">
            Your AI agent handles customer requests, negotiates within your rules,
            and closes sales—even while you sleep. Receive customer inquiries via
            WhatsApp and respond once—your AI handles the rest.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Automated negotiation
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              WhatsApp integration
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              24/7 availability
            </span>
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-[#1e5aff] rounded-full flex items-center justify-center text-white font-bold shrink-0">
          3
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Get Paid & Receive Tips</h3>
          <p className="text-gray-600 mb-2">
            Funds go into escrow. When customer confirms pickup, money releases to
            your wallet. Customers can tip you for exceptional service. Withdraw to
            your bank anytime or keep funds in your wallet for purchases and transfers.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Escrow protection
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Receive tips
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Instant withdrawals
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Wallet balance
            </span>
          </div>
        </div>
      </div>

      {/* Step 4 */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-[#1e5aff] rounded-full flex items-center justify-center text-white font-bold shrink-0">
          4
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Grow with Scouts & Referrals</h3>
          <p className="text-gray-600 mb-2">
            Scouts bring customers to your stall. You pay only when they deliver.
            Refer other sellers and earn commissions on their sales. Track performance,
            popular products, and customer activity in your dashboard.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Scout network
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Seller referrals
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Sales analytics
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Performance tracking
            </span>
          </div>
        </div>
      </div>

      {/* Payment Summary Card */}
      <div className="mt-6 p-4 bg-gradient-to-r from-[#1e5aff]/5 to-[#1e5aff]/10 rounded-xl border border-[#1e5aff]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1e5aff] rounded-full flex items-center justify-center text-white font-bold shrink-0">
            ₦
          </div>
          <div>
            <p className="text-sm text-gray-500">Your Seller Wallet</p>
            <p className="text-lg font-semibold">
              Receive payments, collect tips, and withdraw—all in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Seller Testimonials Component
--------------------------------------------------------- */
export function SellerTestimonials() {
  const testimonials = [
    {
      name: "Ekenne",
      role: "Electronics Seller, Computer Village",
      content:
        "I was serving a customer when my AI sold ₦15,000 worth of goods to someone online. I didn't even know it happened until I got the notification.",
    },
    {
      name: "Funke",
      role: "Fashion Designer, Balogun",
      content:
        "The QR code at my stall is magic. When I'm busy, customers just scan and my AI handles them. I've stopped losing sales during rush hour.",
    },
    {
      name: "Emeka",
      role: "Grocer, Alaba",
      content:
        "I get requests on WhatsApp. I reply once and my AI handles the rest. It's like having an extra staff for free.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.5,
            delay: index * 0.15,
            ease: "easeOut",
          }}
        >
          <Card className="bg-white border border-[#c4d4ff] rounded-2xl h-full">
            <CardContent className="p-4 sm:p-6">
              <p className="text-sm text-gray-700 mb-4">
                &quot;{testimonial.content}&quot;
              </p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-xs text-gray-500">{testimonial.role}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}