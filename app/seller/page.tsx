"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, 
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
  Headphones,
  Store,
  Target,
  Heart,
  Smartphone,
  MapPin,
  Navigation
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import imgPaymeoLogoWhite2 from "@/public/assets/paymeologowhite.png";
import img1 from "@/public/assets/1358c3ba35bdc98636a5ef3762c21e31cbb88101.png";
import img2 from "@/public/assets/c84cb53a7a4ab50359323f283c7dd65e84d3da6a.png";
import img4 from "@/public/assets/5aa1fa68211c63081166829f4977597c21ba8a26.png";
import img6 from "@/public/assets/435b9331e24bd7e0d6eaba49dc951f5f0ebdac7f.png";

// Types for Pinterest Hero Component
interface PinterestHeroProps {
  heroOpacity: MotionValue<number>;
  heroScale: MotionValue<number>;
  img1: StaticImageData;
  img2: StaticImageData;
  img4: StaticImageData;
  img6: StaticImageData;
  scrollToSection: (id: string) => void;
}

interface RotatingStat {
  title: string;
  label: string;
  image: StaticImageData;
  cloudinaryImage: string;
  color: string;
}

// Types for features
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
  tags: string[];
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: StaticImageData;
}

interface FAQ {
  q: string;
  a: string;
}

// Pinterest Hero Component
const PinterestHero = ({ heroOpacity, heroScale, img1, img2, img4, img6, scrollToSection }: PinterestHeroProps) => {
  const [index, setIndex] = useState<number>(0);

  // Create the stats array inside the component - it won't change after initial render
  const rotatingStats: RotatingStat[] = [
    {
      title: "₦10M+",
      label: "Sales Processed",
      image: img6,
      cloudinaryImage: "https://res.cloudinary.com/diml8ljwa/image/upload/v1776943256/ilse-orsel-GPJMHiQUUpo-unsplash_cyp8xu.jpg",
      color: "#1e5aff"
    },
    {
      title: "24/7",
      label: "AI Selling",
      image: img4,
      cloudinaryImage: "https://res.cloudinary.com/diml8ljwa/image/upload/v1776945045/sincerely-media-Dk4l4CMnWC0-unsplash_lndewj.jpg",
      color: "#eab308"
    },
    {
      title: "200+",
      label: "Active Sellers",
      image: img2,
      cloudinaryImage: "https://res.cloudinary.com/diml8ljwa/image/upload/v1776943256/kevin-turcios-fY11qin5kIs-unsplash_jary87.jpg",
      color: "#1e5aff"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingStats.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [rotatingStats.length]);

  return (
    <motion.section
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="relative min-h-[90vh] flex items-center pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white"
    >
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4">
          
          {/* LEFT CONTENT - Pinterest Style Center-Left */}
          <div className="w-full lg:w-[52%] text-center lg:text-left mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-[#1e5aff]/10 rounded-full px-3 py-1.5 mb-6"
            >
              <Store className="w-3.5 h-3.5 text-[#1e5aff]" />
              <span className="text-xs font-medium text-[#1e5aff]">Become a Seller</span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-[1.2] mb-6">
              Sell even when <br />
              <span style={{ color: rotatingStats[index].color }} className="transition-colors duration-500">
                {index === 0 ? "you're busy." : index === 1 ? "you're sleeping." : "you're away."}
              </span>
            </h1>

            {/* Pinterest-style Pagination Dots */}
            <div className="flex justify-center lg:justify-start gap-1.5 mb-6">
              {rotatingStats.map((_, i) => (
                <div 
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'bg-gray-800 w-5' : 'bg-gray-300 w-2'}`}
                />
              ))}
            </div>

            <motion.div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
              <Button
                size="default"
                className="bg-[#1e5aff] hover:bg-[#1e5aff]/90 text-white rounded-full px-8 h-11 text-base font-semibold"
                onClick={() => window.location.href = "https://web.paymeo.co"}
              >
                Join Paymeo for free
              </Button>
              <Button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-gray-900 bg-white hover:bg-white underline font-medium hover:underline text-sm"
              >
                See how it works
              </Button>
            </motion.div>
          </div>

          {/* RIGHT CONTENT - The Pinterest "Floating Stack" Animation */}
          <div className="w-full lg:w-[40%] relative h-[320px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: -20 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="relative w-[220px] h-[280px] sm:w-[260px] sm:h-[340px]"
              >
                {/* Background Large Card */}
                <div className="absolute inset-0 bg-gray-100 rounded-[32px] overflow-hidden">
                  <Image 
                    src={rotatingStats[index].image} 
                    alt="Seller background" 
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>

                {/* Overlapping Floating Card */}
                <motion.div
                  initial={{ x: 30, y: 40, rotate: 5 }}
                  animate={{ x: 15, y: 25, rotate: -2 }}
                  className="absolute -bottom-6 -right-6 w-48 bg-white p-4 rounded-[24px] shadow-2xl border border-gray-100 z-20"
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="text-2xl font-bold text-[#1e5aff]">{rotatingStats[index].title}</div>
                    <div className="text-sm text-gray-600 font-medium">{rotatingStats[index].label}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex -space-x-2">
                        {[img1, img2, img4].map((img, i) => (
                          <div key={i} className="w-5 h-5 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                            <Image src={img} alt="user" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">98% Satisfied</span>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Pinterest Icon/Badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute -top-4 -right-4 w-12 h-12 bg-[#1e5aff] rounded-xl flex items-center justify-center shadow-lg transform rotate-12 z-20"
                >
                  <CheckCircle2 className="text-white w-6 h-6" />
                </motion.div>

                {/* Cloudinary Image Card */}
                <motion.div
                  initial={{ opacity: 0, x: 80, y: -40, rotate: 15 }}
                  animate={{ opacity: 1, x: -30, y: -50, rotate: -12 }}
                  exit={{ opacity: 0, x: -60, y: -80, rotate: -20 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute w-40 bg-white rounded-3xl overflow-hidden border-4 border-white z-30 mt-10"
                >
                  <Image 
                    src={rotatingStats[index].cloudinaryImage} 
                    alt="Market scene"
                    width={160}
                    height={160}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
            
            {/* Pause/Play visual cue */}
            <div className="absolute bottom-2 right-4 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center z-40">
              <div className="w-0.5 h-2 bg-gray-400 rounded-full mx-[1px]" />
              <div className="w-0.5 h-2 bg-gray-400 rounded-full mx-[1px]" />
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export const metadata = {
  title: "Become a Seller | Paymeo",
  description: "Receive shopping requests. Sell 24/7 with AI. List your products once. AI negotiates while you sleep. Escrow protection. Instant payouts. Join thousands of sellers on Paymeo.",
  openGraph: {
    title: "Become a Seller | Paymeo",
    description: "Receive shopping requests. Sell 24/7 with AI. List your products once. AI negotiates while you sleep. Escrow protection. Instant payouts.",
  },
}

export default function BecomeSellerPage() {
  const [activeTab, setActiveTab] = useState<"personal" | "business">("business");
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features: Feature[] = [
    {
      icon: React.createElement(Camera, { className: "w-6 h-6 sm:w-8 sm:h-8" }),
      title: "Snap to List",
      description: "Snap photos of your products. Our AI auto-generates listings instantly. No technical skills needed."
    },
    {
      icon: React.createElement(Zap, { className: "w-6 h-6 sm:w-8 sm:h-8" }),
      title: "24/7 AI Agent",
      description: "Your AI assistant negotiates with customers, answers questions, and closes sales—even while you sleep."
    },
    {
      icon: React.createElement(Bell, { className: "w-6 h-6 sm:w-8 sm:h-8" }),
      title: "Real-Time Requests",
      description: "Get notified when shoppers post requests for products you sell. Respond first, win the sale."
    },
    {
      icon: React.createElement(QrCode, { className: "w-6 h-6 sm:w-8 sm:h-8" }),
      title: "QR Code Storefront",
      description: "Place QR at your stall. Walk-in customers scan, browse with AI, and buy—even when you're busy."
    },
    {
      icon: React.createElement(LinkIcon, { className: "w-6 h-6 sm:w-8 sm:h-8" }),
      title: "Shareable Store Link",
      description: "Get a unique store link to share on social media, WhatsApp, or anywhere customers are."
    },
    {
      icon: React.createElement(CreditCard, { className: "w-6 h-6 sm:w-8 sm:h-8" }),
      title: "Escrow Payments",
      description: "Funds held securely until customer confirms pickup. No scams. No chargebacks."
    },
    {
      icon: React.createElement(MessageCircle, { className: "w-6 h-6 sm:w-8 sm:h-8" }),
      title: "WhatsApp Integration",
      description: "Receive customer requests directly in WhatsApp. Respond where you're already active."
    },
    {
      icon: React.createElement(BarChart, { className: "w-6 h-6 sm:w-8 sm:h-8" }),
      title: "Sales Analytics",
      description: "Track your sales, popular products, and customer activity—all in one simple dashboard."
    },
    {
      icon: React.createElement(Globe, { className: "w-6 h-6 sm:w-8 sm:h-8" }),
      title: "Sell 24/7",
      description: "Your stall never closes. Keep selling even when you're home, sleeping, or restocking."
    },
    {
      icon: React.createElement(Users, { className: "w-6 h-6 sm:w-8 sm:h-8" }),
      title: "Group Sales",
      description: "When shoppers create Co-Pay groups, you sell more at once. Bulk orders = bigger revenue."
    },
    {
      icon: React.createElement(TrendingUp, { className: "w-6 h-6 sm:w-8 sm:h-8" }),
      title: "Bounty Scouts",
      description: "Scouts earn bounties finding items for shoppers. They'll bring customers to your stall."
    },
    {
      icon: React.createElement(Shield, { className: "w-6 h-6 sm:w-8 sm:h-8" }),
      title: "Verified Badge",
      description: "Get verified as a real stall. Build trust with shoppers who can visit you in person."
    },
    {
      icon: React.createElement(MessageCircle, { className: "w-6 h-6 sm:w-8 sm:h-8" }),
      title: "Multi-Channel Requests",
      description: "Receive shopping requests in your existing channels like WhatsApp. Respond with offers and get matched with ready-to-buy shoppers instantly."
    },
    {
      icon: React.createElement(Navigation, { className: "w-6 h-6 sm:w-8 sm:h-8" }),
      title: "Live Location Sharing",
      description: "Share your stall's location so shoppers get real-time directions maps—works perfectly even in busy local markets."
    }
  ];

  const steps: Step[] = [
    {
      number: "1",
      title: "Snap & Set Up",
      description: "Take photos of your products. Set your prices and minimums. Your AI storefront is ready in minutes.",
      tags: ["Camera upload", "Price floor settings", "Wallet connection"]
    },
    {
      number: "2",
      title: "Connect Your Channels",
      description: "Link your WhatsApp or other channels. Receive shopping requests directly where you already chat with customers.",
      tags: ["WhatsApp integration", "Channel linking", "Real-time requests"]
    },
    {
      number: "3",
      title: "AI Sells 24/7",
      description: "Your AI agent handles customer requests, negotiates within your rules, and closes sales—even while you sleep.",
      tags: ["Automated negotiation", "Instant responses", "24/7 availability"]
    },
    {
      number: "4",
      title: "Share Location & Get Paid",
      description: "Share your stall location for real-time directions. Funds go into escrow. When customer confirms pickup, money releases to your wallet.",
      tags: ["Live location", "Escrow protection", "Instant withdrawals"]
    }
  ];

  const testimonials: Testimonial[] = [
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

  const faqs: FAQ[] = [
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
    },
    {
      q: "How does location sharing work in busy markets?",
      a: "You share your exact stall location once. Shoppers get real-time directions using GPS and market landmarks. The map guides them right to your stall—even in complex markets like Computer Village or Balogun."
    },
    {
      q: "Can I use Paymeo without WhatsApp?",
      a: "Yes! While WhatsApp integration is a key feature, you can also receive requests and manage sales directly in the Paymeo app."
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

      {/* Hero Section - Pinterest Style */}
      <PinterestHero 
        heroOpacity={heroOpacity}
        heroScale={heroScale}
        img1={img1}
        img2={img2}
        img4={img4}
        img6={img6}
        scrollToSection={scrollToSection}
      />

      {/* WHY SELLERS CHOOSE PAYMEO SECTION */}
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

      {/* How Channel Matching Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#1e5aff]/10 rounded-full px-4 py-2 mb-6">
                <MessageCircle className="w-4 h-4 text-[#1e5aff]" />
                <span className="text-sm font-medium text-[#1e5aff]">Seamless Integration</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Sell where you already chat
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Paymeo allows sellers to receive shopping requests in their existing channels like WhatsApp. Respond with your offers and get instantly matched with a shopper who&apos;s ready to buy.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600">No need to learn new apps — work from WhatsApp or your preferred channels</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600">AI helps craft competitive offers that get matched faster</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600">Real-time matching with shoppers actively looking to buy</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">WhatsApp Request</p>
                    <p className="text-sm text-gray-500">Incoming shopping request</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-700">🛍️ <strong>Buyer request:</strong> Looking for iPhone 12, good condition. Budget ₦250k</p>
                </div>
                <div className="bg-[#1e5aff]/5 rounded-lg p-4 border border-[#1e5aff]/20">
                  <p className="text-sm text-[#1e5aff] font-medium mb-2">✨ AI Suggested Offer:</p>
                  <p className="text-gray-700">iPhone 12, 128GB, like new - ₦245,000</p>
                  <Button className="mt-3 bg-[#1e5aff] text-white rounded-full text-sm px-4 py-2 h-auto">
                    Send Offer & Match
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Sharing Feature */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="bg-gray-900 rounded-2xl p-4 shadow-2xl">
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Navigation className="w-5 h-5 text-[#1e5aff]" />
                    <span className="text-white font-medium">Real-time Directions</span>
                  </div>
                  <div className="bg-gray-700 rounded-lg h-48 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-[#1e5aff] mx-auto mb-2" />
                      <p className="text-gray-300 text-sm">Live map to Funke&apos;s Stall</p>
                      <p className="text-gray-400 text-xs mt-1">Balogun Market, Lagos</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                    <span>📍 5 min away</span>
                    <span>🚶 350m walk</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 bg-[#1e5aff]/10 rounded-full px-4 py-2 mb-6">
                <MapPin className="w-4 h-4 text-[#1e5aff]" />
                <span className="text-sm font-medium text-[#1e5aff]">Find Me Easily</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Share your stall&apos;s location
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Let shoppers get real-time directions to your stall. Works perfectly even in busy local markets where finding a specific seller can be challenging.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600">Shoppers get turn-by-turn directions to your exact stall location</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600">Works in complex markets like Computer Village, Balogun, Alaba</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600">Update your location anytime if you move stalls</span>
                </li>
              </ul>
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-800">
                  💡 <span className="font-medium">Pro tip:</span> Sellers who share their location get 3x more pickups. Shoppers love knowing exactly where to go!
                </p>
              </div>
            </motion.div>
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
            {faqs.map((faq, index) => (
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