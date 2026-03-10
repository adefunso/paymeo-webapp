"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, 
  ArrowUp,
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
  CheckCircle2,
  Sparkles,
  DollarSign,
  Clock,
  Headphones,
  Store,
  Target,
  Heart,
  Package,
  Wifi,
  Smartphone
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";
import imgPaymeoLogoWhite2 from "@/public/assets/paymeologowhite.png";
import img1 from "@/public/assets/1358c3ba35bdc98636a5ef3762c21e31cbb88101.png";
import img2 from "@/public/assets/c84cb53a7a4ab50359323f283c7dd65e84d3da6a.png";
import img4 from "@/public/assets/5aa1fa68211c63081166829f4977597c21ba8a26.png";
import img6 from "@/public/assets/435b9331e24bd7e0d6eaba49dc951f5f0ebdac7f.png";

export default function BecomeSellerPage() {
  const [activeTab, setActiveTab] = useState<"personal" | "business">("business");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    {
      icon: <Camera className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Snap to List",
      description: "Snap photos of your products. Our AI auto-generates listings instantly. No technical skills needed."
    },
    {
      icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "24/7 AI Agent",
      description: "Your AI assistant negotiates with customers, answers questions, and closes sales—even while you sleep."
    },
    {
      icon: <Bell className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Real-Time Requests",
      description: "Get notified when shoppers post requests for products you sell. Respond first, win the sale."
    },
    {
      icon: <QrCode className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "QR Code Storefront",
      description: "Place QR at your stall. Walk-in customers scan, browse with AI, and buy—even when you're busy."
    },
    {
      icon: <LinkIcon className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Shareable Store Link",
      description: "Get a unique store link to share on social media, WhatsApp, or anywhere customers are."
    },
    {
      icon: <CreditCard className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Escrow Payments",
      description: "Funds held securely until customer confirms pickup. No scams. No chargebacks."
    },
    {
      icon: <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "WhatsApp Integration",
      description: "Receive customer requests directly in WhatsApp. Respond where you're already active."
    },
    {
      icon: <BarChart className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Sales Analytics",
      description: "Track your sales, popular products, and customer activity—all in one simple dashboard."
    },
    {
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Sell 24/7",
      description: "Your stall never closes. Keep selling even when you're home, sleeping, or restocking."
    },
    {
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Group Sales",
      description: "When shoppers create Co-Pay groups, you sell more at once. Bulk orders = bigger revenue."
    },
    {
      icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Bounty Scouts",
      description: "Scouts earn bounties finding items for shoppers. They'll bring customers to your stall."
    },
    {
      icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Verified Badge",
      description: "Get verified as a real stall. Build trust with shoppers who can visit you in person."
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Snap & Set Up",
      description: "Take photos of your products. Set your prices and minimums. Your AI storefront is ready in minutes.",
      tags: ["Camera upload", "Price floor settings", "Wallet connection"]
    },
    {
      number: "2",
      title: "AI Sells 24/7",
      description: "Your AI agent handles customer requests, negotiates within your rules, and closes sales—even while you sleep.",
      tags: ["Automated negotiation", "WhatsApp integration", "24/7 availability"]
    },
    {
      number: "3",
      title: "Get Paid & Receive Tips",
      description: "Funds go into escrow. When customer confirms pickup, money releases to your wallet. Customers can tip you for exceptional service.",
      tags: ["Escrow protection", "Receive tips", "Instant withdrawals"]
    },
    {
      number: "4",
      title: "Grow with Scouts & Referrals",
      description: "Scouts bring customers to your stall. You pay only when they deliver. Refer other sellers and earn commissions.",
      tags: ["Scout network", "Seller referrals", "Sales analytics"]
    }
  ];

  const testimonials = [
    {
      name: "Ekenne",
      role: "Electronics Seller, Computer Village",
      content: "I was serving a customer when my AI sold ₦15,000 worth of goods to someone online. I didn't even know it happened until I got the notification.",
      image: img6
    },
    {
      name: "Funke",
      role: "Fashion Designer, Balogun",
      content: "The QR code at my stall is magic. When I'm busy, customers just scan and my AI handles them. I've stopped losing sales during rush hour.",
      image: img4
    },
    {
      name: "Emeka",
      role: "Grocer, Alaba",
      content: "I get requests on WhatsApp. I reply once and my AI handles the rest. It's like having an extra staff for free.",
      image: img2
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden" ref={containerRef}>
      {/* Navigation */}
      <Nav
        imgPaymeoLogoWhite2={imgPaymeoLogoWhite2}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsProfileOpen={setIsProfileOpen}
      />

      {/* Hero Section */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-[#1e5aff]/5 via-transparent to-[#1e5aff]/5"
      >
        {/* Decorative circles */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-20 right-0 w-96 h-96 bg-[#1e5aff]/10 rounded-full blur-3xl"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute bottom-20 left-0 w-80 h-80 bg-[#1e5aff]/10 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-[#1e5aff]/10 rounded-full px-4 py-2 mb-6"
              >
                <Store className="w-4 h-4 text-[#1e5aff]" />
                <span className="text-sm font-medium text-[#1e5aff]">Become a Seller</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
              >
                Sell even when
                <span className="text-[#1e5aff] block mt-2">you&apos;re busy.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 mb-8 max-w-lg"
              >
                Join hundreds of sellers who never miss a sale. Your AI handles customers 24/7 while you focus on what matters.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button 
                  size="lg" 
                  className="bg-[#1e5aff] hover:bg-[#1e5aff]/90 text-white rounded-full px-8"
                  onClick={() => window.location.href = "https://web.paymeo.co"}
                >
                  Start Selling Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full px-8"
                  onClick={() => scrollToSection("how-it-works")}
                >
                  Learn More
                </Button>
              </motion.div>

              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-4 mt-8"
              >
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                    <Image src={img6} alt="Seller" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                    <Image src={img4} alt="Seller" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                    <Image src={img2} alt="Seller" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                    <Image src={img1} alt="Seller" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">200+ sellers</span> already earning
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-white border border-gray-200 shadow-2xl">
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#1e5aff] mb-1">₦10M+</div>
                      <div className="text-sm text-gray-600">Sales Processed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#1e5aff] mb-1">24/7</div>
                      <div className="text-sm text-gray-600">AI Selling</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#1e5aff] mb-1">98%</div>
                      <div className="text-sm text-gray-600">Satisfaction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#1e5aff] mb-1">200+</div>
                      <div className="text-sm text-gray-600">Active Sellers</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-gray-600">Free to start</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-gray-600">Pay only when you sell</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-gray-600">Flexible Subscription Plans</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* =========================================================
          WHY SELLERS CHOOSE PAYMEO - NEW SECTION (Whatnot Style)
      ========================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Discover why sellers are choosing Paymeo
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Make More */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#1e5aff]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-[#1e5aff]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Make more selling your way</h3>
              <p className="text-gray-600">
                Your AI sells 24/7 — even while you sleep, eat, or serve other customers. Sellers make sales around the clock, not just when they&apos;re live or available.
              </p>
            </motion.div>

            {/* Reach Audience */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#1e5aff]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-[#1e5aff]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Reach local buyers ready to buy</h3>
              <p className="text-gray-600">
                Connect with shoppers in your market who post exactly what they&apos;re looking for. No browsing — they come to you with intent to buy.
              </p>
            </motion.div>

            {/* Easy Tools */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#1e5aff]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-8 h-8 text-[#1e5aff]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">We make it easy</h3>
              <p className="text-gray-600">
                Snap photos, set prices — done. Our AI handles negotiations, escrow handles payments, and scouts bring customers. You just confirm sales.
              </p>
            </motion.div>

            {/* Sell with Joy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#1e5aff]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-[#1e5aff]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sell with joy</h3>
              <p className="text-gray-600">
                No more losing customers when you&apos;re busy. Your AI handles the stress. You focus on what you love — your products and your people.
              </p>
            </motion.div>
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500"
          >
           
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Pay only when you sell</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#1e5aff]/10 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-[#1e5aff]" />
              <span className="text-sm font-medium text-[#1e5aff]">Simple Process</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              How it works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in minutes. Start selling in seconds.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-[#1e5aff]/10 absolute -top-4 left-0">
                  {step.number}
                </div>
                <div className="relative z-10 pt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {step.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-[#1e5aff]/5 text-[#1e5aff] px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#1e5aff]/10 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#1e5aff]" />
              <span className="text-sm font-medium text-[#1e5aff]">Everything You Need</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Powerful tools for sellers
            </h2>
            <p className="text-xl text-gray-600">
              From AI selling to secure payments — all in one place.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-[#1e5aff]/10 rounded-xl flex items-center justify-center text-[#1e5aff] mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#1e5aff]/10 rounded-full px-4 py-2 mb-6">
              <Users className="w-4 h-4 text-[#1e5aff]" />
              <span className="text-sm font-medium text-[#1e5aff]">Success Stories</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              What sellers say
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from real sellers using Paymeo.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600">&quot;{testimonial.content}&quot;</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

   {/* FAQ Section */}
<section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
  <div className="max-w-4xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <div className="inline-flex items-center gap-2 bg-[#1e5aff]/10 rounded-full px-4 py-2 mb-6">
        <Headphones className="w-4 h-4 text-[#1e5aff]" />
        <span className="text-sm font-medium text-[#1e5aff]">FAQ</span>
      </div>
      <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
        Common questions
      </h2>
      <p className="text-xl text-gray-600">
        Everything you need to know about selling on Paymeo.
      </p>
    </motion.div>

    <div className="space-y-4">
      {[
        {
          q: "How do I start selling?",
          a: "Download the app, snap photos of your products, set your prices, and your AI storefront is ready in minutes. Add your bank details to your wallet and you're good to go."
        },
        {
          q: "What are the fees?",
          a: "Paymeo offers two ways to sell: Pay-as-you-go with a small transaction fee (1.5% - 3.5%) per sale, or subscribe to one of our monthly plans and pay zero transaction fees. Choose what works best for your business."
        },
        {
          q: "How does the AI agent work?",
          a: "Your AI agent handles customer requests 24/7. It negotiates within your price rules, answers questions, and closes sales—even while you sleep."
        },
        {
          q: "When do I get paid?",
          a: "Funds go into escrow when a customer pays. Once they confirm pickup, money releases to your wallet. You can withdraw to your bank anytime."
        },
        {
          q: "Do I need a smartphone?",
          a: "Yes, any Android or iPhone works. The app is designed to be simple—snap photos, set prices, and let the AI do the rest."
        }
      ].map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
          <p className="text-gray-600">{faq.a}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1e5aff] to-[#0d3bb8]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to start selling?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of sellers who never miss a sale. Your first customer is waiting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-[#1e5aff] hover:bg-gray-100 rounded-full px-8"
                onClick={() => window.location.href = "https://web.paymeo.co"}
              >
                Create Your Store
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white bg-black text-white hover:bg-white/10 hover:text-white rounded-full px-8"
                onClick={() => window.location.href = "/for-shoppers"}
              >
                Learn About Shopping
              </Button>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Flexible Subscription Plans</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}