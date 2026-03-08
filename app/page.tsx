"use client";

import { useState, useEffect, useRef, RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  RiFacebookFill, 
  RiInstagramLine, 
  RiTwitterXLine, 
  RiTiktokFill, 
  RiLinkedinFill 
} from "react-icons/ri";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Network,
  User,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Mail,
  Sparkles,
  Camera,
  MessageCircle,
  MapPin,
  CreditCard,
  Bell,
  Share2,
  QrCode,
  Zap,
  Globe,
  Smartphone,
  Users,
  TrendingUp,
  Clock,
  Shield,
  BarChart,
  DollarSign,
  Headphones,
  Store,
  Link as LinkIcon,
} from "lucide-react";

import imgPaymeoLogoWhite2 from "../public/assets/paymeologowhite.png";
import img1 from "../public/assets/1358c3ba35bdc98636a5ef3762c21e31cbb88101.png";
import img2 from "../public/assets/c84cb53a7a4ab50359323f283c7dd65e84d3da6a.png";
import img4 from "../public/assets/5aa1fa68211c63081166829f4977597c21ba8a26.png";
import img6 from "../public/assets/435b9331e24bd7e0d6eaba49dc951f5f0ebdac7f.png";
import imgSilhouetteIphoneMockup1 from "../public/assets/18040d272bf0c0c62958ea00b31aec963eea79a8.png";
import FaqSection from "../components/FaqSection";
import router from "next/router";
import WaitlistDialog from "@/components/WaitlistDialog";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";

// Type definitions for our custom hooks
interface UseInViewportReturn {
  ref: RefObject<HTMLElement | null>;
  isInView: boolean;
}

interface IntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

/* ---------------------------------------------------------
   Custom Hook: Use Intersection Observer
   - Detects when elements enter/leave viewport
   - Used for lazy loading videos and animations
--------------------------------------------------------- */
function useInViewport(options: IntersectionObserverOptions = {}): UseInViewportReturn {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return { ref, isInView };
}

/* ---------------------------------------------------------
   Optimized Video Component
   - Only plays when in viewport
   - Pauses when out of viewport
--------------------------------------------------------- */
interface LazyVideoProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  [key: string]: unknown;
}

function LazyVideo({ 
  src, 
  className, 
  autoPlay = true, 
  loop = true, 
  muted = true, 
  playsInline = true, 
  ...props 
}: LazyVideoProps) {
  const { ref, isInView } = useInViewport();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.play().catch((e: Error) => console.log("Video play failed:", e));
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <div ref={ref as RefObject<HTMLDivElement>} className="w-full h-full">
      <video
        ref={videoRef}
        src={src}
        className={className}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        {...props}
      />
    </div>
  );
}

/* ---------------------------------------------------------
   Profile slide-in modal (Framer Motion)
   - Slides in from the right
   - Shows different content for personal vs business tabs
   - Can trigger the waitlist dialog by calling `openWaitlist()`
--------------------------------------------------------- */
function ProfileSlideIn({
  open,
  onClose,
  activeTab,
  openWaitlist,
}: {
  open: boolean;
  onClose: () => void;
  activeTab: "personal" | "business";
  openWaitlist: () => void;
}) {
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  return (
   <AnimatePresence>
  {open && (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Main Slide-in Panel */}
      <motion.aside
        className={`
          fixed top-5 xl:right-5 bottom-5 z-60
          w-[100%] mx-auto sm:w-[85%] md:w-[75%] lg:w-[60%] xl:w-[50%]
          bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col
        `}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
        aria-modal="true"
        role="dialog"
      >
        {/* Background image for Personal */}
        {activeTab === "personal" && (
          <div className="absolute inset-0 z-0">
            <Image
              src="https://res.cloudinary.com/diml8ljwa/image/upload/v1761920085/moving_ph5o3h.png"
              alt="Background"
              fill
              className="object-cover opacity-10"
              priority
            />
          </div>
        )}
         {/* Mobile App Badge */}
         <div className="flex justify-between">
<div className="mt-6 sm:mt-10 flex justify-center md:justify-start ml-4 sm:ml-6">
    <span className="bg-black/70 text-[10px] sm:text-[12px] text-white hover:bg-black/70 px-2 sm:px-3 py-1 sm:py-2 rounded-[20px] border-0">
      MOBILE APP COMING SOON!
    </span>
  </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 sm:top-7 right-4 sm:right-7 z-20 p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
        </button>

         </div>
  

        {/* Content */}
        <div className="relative z-10 flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto flex flex-col justify-center items-center text-center">
          {/* Header */}
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1e5aff] rounded-[14px] flex items-center justify-center mb-3 sm:mb-4">
              <Image
                src={imgPaymeoLogoWhite2}
                alt="Paymeo"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
            </div>
          </div>

          {/* PERSONAL TAB */}
          {activeTab === "personal" ? (
            <>
              <h4 className="text-xl sm:text-2xl font-semibold mb-3">
                Be the first to experience Paymeo Personal
              </h4>
              <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8 max-w-md">
                &quot;We&apos;re shipping the personal web & mobile experience soon. Join the waitlist and get early access.&quot;
              </p>
              <div className="space-y-3 w-full sm:w-[80%] md:w-[60%]">
                <button
                  className="w-full h-10 sm:h-12 rounded-[14px] bg-[#1e5aff] text-white flex items-center justify-center gap-2 font-medium shadow-md hover:bg-[#1746cc] transition-colors text-sm sm:text-base"
                  onClick={() => {
                    openWaitlist();
                    onClose();
                  }}
                  
                >
                  Join the Waitlist
                  <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 rotate-45" />
                </button>
              </div>
            </>
          ) : (
            /* BUSINESS TAB */
            <>
              <h4 className="text-xl sm:text-2xl font-semibold mb-3">
                Get your Paymeo Business Account
              </h4>
              <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8 max-w-md">
                &quot;Sell across your existing channels with 24/7 Sales AI Agents — never lose a sale, even while you sleep. Manage payments, inventory, and shipments all in one place. Unlock demand-driven social commerce and 10x your sales process — right from your pocket.&quot;
              </p>

              <div className="flex flex-col gap-3 w-full sm:w-[80%] md:w-[60%]">
                <Link href="https://web.paymeo.co" className="w-full">
                  <div className="block w-full text-center h-10 sm:h-12 rounded-[14px] bg-[#1e5aff] text-white leading-[40px] sm:leading-[48px] hover:bg-[#1746cc] transition-colors text-sm sm:text-base">
                    Create an Account
                  </div>
                </Link>

                <Link href="https://web.paymeo.co" className="w-full">
                  <div className="block w-full text-center h-10 sm:h-12 rounded-[14px] border border-[#1e5aff] text-[#1e5aff] leading-[40px] sm:leading-[48px] hover:bg-[#1e5aff]/10 transition-colors text-sm sm:text-base">
                    Log In
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
       <div className="p-3 sm:p-4 text-center text-xs sm:text-sm text-gray-400 border-t border-gray-100">
  &copy; {new Date().getFullYear()} Paymeo. All rights reserved.
</div>
      </motion.aside>
    </>
  )}
</AnimatePresence>

  );
}

/* ---------------------------------------------------------
   Seller Features Component
   - Displays all seller-specific features
--------------------------------------------------------- */
function SellerFeatures() {
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
      icon: <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "WhatsApp Integration",
      description: "Receive customer requests directly in WhatsApp. Respond where you're already active."
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
      icon: <Bell className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Real-Time Requests",
      description: "Get notified when shoppers post requests for products you sell. Respond first, win the sale."
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-[#c4d4ff] hover:shadow-xl transition-all"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1e5aff]/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4 text-[#1e5aff]">
            {feature.icon}
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2">{feature.title}</h3>
          <p className="text-xs sm:text-sm text-gray-600">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------
   Shopper Features Component
   - Displays all shopper-specific features
--------------------------------------------------------- */
function ShopperFeatures() {
  const features = [
    {
      icon: <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Post Requests",
      description: "Tell us what you're looking for. Sellers compete to give you their best offers."
    },
    {
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Add Bounties",
      description: "Add a reward to your request. Scouts hunt for hard-to-find items and get paid when you find them."
    },
    {
      icon: <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Swipe to Compare",
      description: "See all offers side-by-side. Swipe through prices, pick the best deal."
    },
    {
      icon: <MapPin className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Map to Stall",
      description: "Get real-time directions straight to the seller's stall. No more wandering."
    },
    {
      icon: <CreditCard className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Secure Escrow",
      description: "Money held safely until you confirm pickup. Only pay when you're satisfied."
    },
    {
      icon: <QrCode className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Scan & Shop",
      description: "At a busy stall? Scan the QR code. AI helps you browse and buy without waiting."
    },
    {
      icon: <Camera className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Snap to Search",
      description: "See something you like? Snap a photo. AI finds similar items and prices."
    },
    {
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Community Recommendations",
      description: "Not sure where to find quality? Ask the community. Real people, real answers."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Verified Sellers",
      description: "Every seller is verified with real stall locations. No ghosts. No scams."
    },
    {
      icon: <Bell className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Instant Notifications",
      description: "Get alerted when sellers respond to your request. Never miss an offer."
    },
    {
      icon: <Headphones className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "AI Assistance",
      description: "Talk to seller AI agents. Ask questions, negotiate prices, all via voice or text."
    },
    {
      icon: <Store className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Discover New Sellers",
      description: "Find hidden gems—stalls you'd never notice while walking through the market."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-[#c4d4ff] hover:shadow-xl transition-all"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1e5aff]/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4 text-[#1e5aff]">
            {feature.icon}
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2">{feature.title}</h3>
          <p className="text-xs sm:text-sm text-gray-600">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------
   How It Works Content Components
--------------------------------------------------------- */
function SellerHowItWorks() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-[#1e5aff] rounded-full flex items-center justify-center text-white font-bold shrink-0">1</div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Snap & Set Up</h3>
          <p className="text-gray-600">Take photos of your products. Set your prices and minimums. Your AI storefront is ready in minutes.</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-[#1e5aff] rounded-full flex items-center justify-center text-white font-bold shrink-0">2</div>
        <div>
          <h3 className="text-lg font-semibold mb-1">AI Sells 24/7</h3>
          <p className="text-gray-600">Your AI agent handles customer requests, negotiates within your rules, and closes sales—even while you sleep.</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-[#1e5aff] rounded-full flex items-center justify-center text-white font-bold shrink-0">3</div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Get Paid</h3>
          <p className="text-gray-600">Funds go into escrow. When customer confirms pickup, money releases to your wallet. Withdraw anytime.</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-[#1e5aff] rounded-full flex items-center justify-center text-white font-bold shrink-0">4</div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Grow with Scouts</h3>
          <p className="text-gray-600">Scouts bring customers to your stall. You pay only when they deliver. Performance-based marketing.</p>
        </div>
      </div>
    </div>
  );
}

function ShopperHowItWorks() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-[#1e5aff] rounded-full flex items-center justify-center text-white font-bold shrink-0">1</div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Post What You Want</h3>
          <p className="text-gray-600">Tell us what you&apos;re looking for. Add a bounty if you want faster results.</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-[#1e5aff] rounded-full flex items-center justify-center text-white font-bold shrink-0">2</div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Get Offers</h3>
          <p className="text-gray-600">Sellers send their best prices. Compare offers side-by-side. Swipe to choose.</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-[#1e5aff] rounded-full flex items-center justify-center text-white font-bold shrink-0">3</div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Pay Securely</h3>
          <p className="text-gray-600">Money held in escrow. Only released when you confirm pickup. No risk.</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-[#1e5aff] rounded-full flex items-center justify-center text-white font-bold shrink-0">4</div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Pick Up & Enjoy</h3>
          <p className="text-gray-600">Follow the map to the seller&apos;s stall. Confirm receipt. Done.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Stats Component - Changes with Tab
--------------------------------------------------------- */
function StatsSection({ activeTab }: { activeTab: "personal" | "business" }) {
  if (activeTab === "personal") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-[#1e5aff]">500+</div>
          <div className="text-xs sm:text-sm text-gray-600">Shoppers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-[#1e5aff]">200+</div>
          <div className="text-xs sm:text-sm text-gray-600">Sellers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-[#1e5aff]">1,000+</div>
          <div className="text-xs sm:text-sm text-gray-600">Requests</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-[#1e5aff]">₦5M+</div>
          <div className="text-xs sm:text-sm text-gray-600">Saved</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-[#1e5aff]">200+</div>
          <div className="text-xs sm:text-sm text-gray-600">Active Sellers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-[#1e5aff]">₦10M+</div>
          <div className="text-xs sm:text-sm text-gray-600">Sales Processed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-[#1e5aff]">24/7</div>
          <div className="text-xs sm:text-sm text-gray-600">AI Selling</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-[#1e5aff]">98%</div>
          <div className="text-xs sm:text-sm text-gray-600">Satisfaction</div>
        </div>
      </div>
    );
  }
}

/* ---------------------------------------------------------
   Testimonials Component - Changes with Tab
--------------------------------------------------------- */
function TestimonialsSection({ activeTab }: { activeTab: "personal" | "business" }) {
  if (activeTab === "personal") {
    const testimonials = [
      {
        name: "Chioma",
        role: "Shopper, Lagos",
        content: "I needed a specific Ankara style. Posted a request with a small bounty. Within an hour, three sellers sent offers. Picked the best, picked it up the next day. No stress."
      },
      {
        name: "Tunde",
        role: "Shopper, Ibadan",
        content: "The map feature saved me. The seller was hidden in the back of the market. Paymeo led me straight there."
      },
      {
        name: "Amina",
        role: "Shopper, Kano",
        content: "I love that I don't have to walk through the whole market anymore. I post what I want, compare offers, and just go pick up."
      }
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {testimonials.map((t, i) => (
          <Card key={i} className="bg-white border border-[#c4d4ff] rounded-2xl">
            <CardContent className="p-4 sm:p-6">
              <p className="text-sm text-gray-700 mb-4">&quot;{t.content}&quot;</p>
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-xs text-gray-500">{t.role}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  } else {
    const testimonials = [
      {
        name: "Musa",
        role: "Electronics Seller, Computer Village",
        content: "I was serving a customer when my AI sold ₦15,000 worth of goods to someone online. I didn't even know it happened until I got the notification."
      },
      {
        name: "Funke",
        role: "Fashion Designer, Balogun",
        content: "The QR code at my stall is magic. When I'm busy, customers just scan and my AI handles them. I've stopped losing sales during rush hour."
      },
      {
        name: "Emeka",
        role: "Grocer, Ariaria",
        content: "I get requests on WhatsApp. I reply once and my AI handles the rest. It's like having an extra staff for free."
      }
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {testimonials.map((t, i) => (
          <Card key={i} className="bg-white border border-[#c4d4ff] rounded-2xl">
            <CardContent className="p-4 sm:p-6">
              <p className="text-sm text-gray-700 mb-4">&quot;{t.content}&quot;</p>
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-xs text-gray-500">{t.role}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}

/* ---------------------------------------------------------
   Full HomePage component with toggle-based content
--------------------------------------------------------- */
export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"personal" | "business">("personal");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // waitlist dialog
  const [isProfileOpen, setIsProfileOpen] = useState(false); // slide-in profile
  const [activePhase, setActivePhase] = useState(1);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const router = useRouter(); // ✅ initialize router

  // Use intersection observer for animations
  const { ref: howItWorksRef, isInView: howItWorksInView } = useInViewport();
  const { ref: featuresRef, isInView: featuresInView } = useInViewport();
  const { ref: meoRef, isInView: meoInView } = useInViewport();

const openWaitlist = () => setWaitlistOpen(true);

useEffect(() => {
  // Only run the animation interval if the section is in view
  if (howItWorksInView) {
    const interval = setInterval(() => {
      setActivePhase((prev) => (prev === 4 ? 1 : prev + 1));
    }, 7000); // switch every 7 seconds
    return () => clearInterval(interval);
  }
}, [howItWorksInView]);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // simulate network
    setTimeout(() => {
      setIsOpen(false);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
        setName("");
      }, 300);
    }, 2000);
  };

  const scrollToSection = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  const videos = {
    personal:
      "https://res.cloudinary.com/diml8ljwa/video/upload/q_70,f_webm,vc_vp9,w_1200,ac_none,du_8/v1762294237/paymeohero_1_tq8bao",
    business:
      "https://res.cloudinary.com/diml8ljwa/video/upload/q_70,f_webm,vc_vp9,w_1200,ac_none,du_8/v1762296185/paymeomale_1_qirryn",
  };

  const culture = "https://res.cloudinary.com/diml8ljwa/image/upload/v1761872629/hero_illustration_ppefew.png";

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SplashScreen />
      {/* Profile slide-in */}
      <ProfileSlideIn
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        activeTab={activeTab}
         openWaitlist={() => setWaitlistOpen(true)}
      />

      {/* Hero Section */}
<section className="relative min-h-screen flex flex-col overflow-hidden">
  {/* Background Phone Image */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-[#1e5aff]/80 via-[#1e5aff]/60 to-[#1e5aff]/90 z-10">
      <LazyVideo
        key={activeTab}
        src={videos[activeTab]}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full object-cover z-0 transition-all duration-700"
      />
    </div>

    {/* Blur overlays */}
    <div className="absolute inset-0 backdrop-blur-sm bg-black/5" />
    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/10 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/10 to-transparent" />
  </div>

  {/* Navigation */}
  <Nav
    imgPaymeoLogoWhite2={imgPaymeoLogoWhite2}
    activeTab={activeTab}
    setActiveTab={setActiveTab}
    setIsProfileOpen={setIsProfileOpen}
  />

  {/* Main Content */}
  <div className="relative z-10 flex-1 flex items-center px-4 sm:px-6 lg:px-10 pb-20 pt-24 sm:pt-20">
    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-end">
      
      {/* Left Column - Hero Card */}
      <Card className="bg-white border border-[#c4d4ff] rounded-[30px] p-6 sm:p-8 md:p-10 shadow-lg min-h-[380px] sm:min-h-[420px] flex flex-col justify-between">
        <CardContent className="p-0 flex flex-col justify-between h-full">
          <div>
            <Badge className="bg-[#e6dbff] text-violet-500 hover:bg-[#e6dbff] border border-violet-500 mb-4 sm:mb-6 text-xs sm:text-sm">
              <span className="font-normal">
                {activeTab === "personal" ? "We're now in" : "For"}
              </span>
              <span>{activeTab === "personal" ? "Beta! 🚀" : "Businesses 💼"}</span>
            </Badge>

            {activeTab === "personal" ? (
              <>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[50px] leading-tight mb-4 sm:mb-6 text-black font-extrabold">
                  Find what you need. At the best price.
                </h1>

                <p className="text-sm sm:text-base text-black/80 leading-relaxed mb-6 sm:mb-8">
                 Tell us what you&apos;re looking for. Sellers send their best offers. Compare, choose, and pick up—all without walking through the entire market.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[50px] leading-tight mb-4 sm:mb-6 text-black font-extrabold">
                  Sell even when you&apos;re busy.
                </h1>
                <p className="text-sm sm:text-base text-black/80 leading-relaxed mb-6 sm:mb-8">
                  Power your sales 24/7. Manage payments securely. Connect with customers automatically. All in one place.
                </p>
              </>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="mt-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
            {activeTab === "personal" ? (
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#1e5aff] hover:bg-[#1e5aff]/90 text-white rounded-[20px] h-12 px-4 sm:px-6 group text-sm sm:text-base mt-4 sm:mt-6 mb-2 sm:mb-0" onClick={() => {
                    openWaitlist()
                  }}>
                    Join The Waitlist
                    <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 ml-2 rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </DialogTrigger>
              </Dialog>
            ) : (
              <>
               
                  <Button className="bg-[#1e5aff] hover:bg-[#1e5aff]/90 text-white rounded-[20px] h-12 px-4 sm:px-6 group text-sm sm:text-base mt-4 sm:mt-6 mb-2 sm:mb-0" onClick={() => setIsProfileOpen(true)}>
                    Get Started for Free
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Button>
                
                <Link href="https://web.paymeo.co">
                <Button
                  className="border border-[#c4d4ff] bg-white text-[#1e5aff] rounded-[20px] h-12 px-4 sm:px-6 group transition-colors duration-200 hover:bg-black hover:text-white text-sm sm:text-base mt-6"
                >
                  <span className="flex items-center">
                    Sign in
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </span>
                </Button>
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Right Column - Waitlist Info */}
      <div className="flex flex-col items-center lg:items-end gap-5 sm:gap-6 mt-0 mb-6 xl:mt-10 sm:mt-0">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-right"
        >
          <div className="flex items-center justify-center lg:justify-end -space-x-2 mb-3 sm:mb-4">
            <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-white">
              <AvatarImage src={img6.src} alt="Paymeo user" />
            </Avatar>
            <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-white">
              <AvatarImage src={img4.src} alt="Paymeo user" />
            </Avatar>
            <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-white">
              <AvatarImage src={img2.src} alt="Paymeo user" />
            </Avatar>
            <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-white">
              <AvatarImage src={img1.src} alt="Paymeo user" />
            </Avatar>
          </div>
          <p className="text-white text-xs sm:text-sm md:text-base backdrop-blur-sm bg-black/20 rounded-lg px-3 py-1 sm:px-4 sm:py-2 inline-block">
            {activeTab === "personal"
              ? "500+ shoppers have already joined!"
              : "200+ businesses now use Paymeo to supercharge their sales."}
          </p>
        </motion.div>

        {/* Desktop Button */}
        {activeTab === "personal" ? (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="hidden lg:flex border-2 border-white text-white hover:bg-white hover:text-[#1e5aff] rounded-[15px] h-16 sm:h-[76px] px-6 sm:px-8 text-lg sm:text-xl backdrop-blur-sm bg-transparent group transition-all"
                onClick={() => {
                    openWaitlist()
                  }}
              >
                Join The Waitlist
                <ArrowUp className="w-5 h-5 sm:w-7 sm:h-7 ml-2 rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </DialogTrigger>
          </Dialog>
        ) : (
          <Button
            asChild
            variant="outline"
            className="hidden lg:flex border-2 border-white text-white hover:bg-white hover:text-[#1e5aff] rounded-[15px] h-16 sm:h-[76px] px-6 sm:px-8 text-lg sm:text-xl backdrop-blur-sm bg-transparent group transition-all"
          >
            <a href="https://web.paymeo.co">
              Get Started Now
              <ArrowUp className="w-5 h-5 sm:w-7 sm:h-7 ml-2 rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </Button>
        )}
      </div>

      <WaitlistDialog isOpen={waitlistOpen} setIsOpen={setWaitlistOpen} />
    </div>
  </div>

  {/* Scroll Indicator */}
  <div className="absolute bottom-12 xl:bottom-6 md:bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 flex sm:flex-row items-center justify-center gap-3 sm:gap-4">
    <button
      onClick={scrollToSection}
      className="bg-black/70 hover:bg-black/80 backdrop-blur-sm text-white text-xs sm:text-sm md:text-base px-4 sm:px-6 py-3 sm:py-3 rounded-[25px] flex items-center gap-2 transition-all group whitespace-nowrap"
    >
      How it works
      <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-y-1 transition-transform" />
    </button>
    {activeTab === "personal" && (
      <button
        onClick={() => router.push('/marketplace')}
        className="bg-black/70 hover:bg-black/70 text-white text-xs sm:text-sm md:text-base px-4 sm:px-6 py-3 sm:py-3 rounded-[25px] flex items-center gap-2 transition-all shadow-md animate-fadeIn whitespace-nowrap"
      >
        Marketplace
      </button>
    )}

    {activeTab === "business" && (
      <button
        onClick={() => router.push('/pricing')}
        className="bg-black/70 hover:bg-black/70 text-white text-xs sm:text-sm md:text-base px-4 sm:px-6 py-3 sm:py-3 rounded-[25px] flex items-center gap-2 transition-all shadow-md animate-fadeIn whitespace-nowrap"
      >
        Pricing
      </button>
    )}
  </div>
</section>


      {/* How It Works Section */}
<section
  id="how-it-works"
  ref={howItWorksRef}
  className="relative py-8 sm:py-10 px-4 sm:px-6 lg:px-10 bg-white overflow-hidden"
>
  {/* Background Image */}
  <div className="absolute inset-x-0 top-0 h-[40%] sm:h-[50%] md:h-[50%] lg:h-[105%] overflow pointer-events-none">
    <Image
      src={culture}
      alt="Background pattern"
      fill
      priority
      className="object-cover object-top opacity-10"
    />
  </div>

  {/* Foreground Content */}
  <div className="relative max-w-7xl mx-auto">
    {/* Section Header - Changes with Tab */}
    <div className="text-center mb-8 sm:mb-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
        {activeTab === "personal" ? "How shoppers find value" : "How sellers grow"}
      </h2>
      <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
        {activeTab === "personal" 
          ? "From request to pickup—simple steps to get what you need at the best price."
          : "From setup to sale—everything you need to sell more, even when you're busy."}
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
      
      {/* Left Column - How It Works Steps */}
      <Card className="bg-white border-2 border-[#c4d4ff] rounded-[30px] p-6 sm:p-8 shadow-lg">
        <CardContent className="p-0">
          {activeTab === "personal" ? <ShopperHowItWorks /> : <SellerHowItWorks />}
          
          <div className="mt-8">
            <Button className="bg-[#1e5aff] hover:bg-[#1e5aff]/90 text-white rounded-[20px] h-12 px-6">
              {activeTab === "personal" ? "Start Shopping" : "Start Selling"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Right Column - Video Feature */}
      <Card className="relative bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-[#c4d4ff] rounded-[30px] overflow-hidden h-[80vh] sm:h-screen shadow-lg">
        <CardContent className="relative h-full p-0 overflow-hidden">
          {/* Background Video - Only plays when in view */}
          <LazyVideo
            src={activeTab === "personal" 
              ? "https://res.cloudinary.com/diml8ljwa/video/upload/q_70,f_webm,vc_vp9,w_1200,ac_none,du_8/v1762297517/woman_1_wjwhiw"
              : "https://res.cloudinary.com/diml8ljwa/video/upload/q_70,f_webm,vc_vp9,w_1200,ac_none,du_8/v1762297517/woman_1_wjwhiw"
            }
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />

          {/* Overlay Content */}
          <div className="relative z-20 h-full flex flex-col justify-end items-center text-center p-6 sm:p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={howItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#1e5aff] rounded-[23px] flex items-center justify-center">
                  <Image src={imgPaymeoLogoWhite2} alt="Paymeo" className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-2 sm:mb-3">
                {activeTab === "personal" ? "Find Anything. Fast." : "Sell 24/7. Even When Busy."}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-md mx-auto">
                {activeTab === "personal" 
                  ? "Post what you need. Get offers from multiple sellers. Pick the best deal. No wandering."
                  : "Your AI handles customers while you work. Never lose a sale. Your stall never closes."}
              </p>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Navigation */}
    <div className="flex justify-center gap-3 sm:gap-4 mt-8 sm:mt-12 relative z-10">
      <button
        className="bg-black/70 hover:bg-black/80 backdrop-blur-sm text-white px-3 sm:px-4 py-2 sm:py-3 rounded-[25px] flex items-center gap-2 transition-all text-sm"
        aria-label="Scroll up"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 rotate-180" />
      </button>
      <button
        onClick={() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })}
        className="bg-black/70 hover:bg-black/80 backdrop-blur-sm text-white px-4 sm:px-6 py-2 sm:py-3 rounded-[25px] flex items-center gap-2 transition-all group text-sm"
        aria-label="View all features"
      >
        All Features
        <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-y-1 transition-transform" />
      </button>
    </div>
  </div>
</section>


   {/* Features Section — Full feature grid */}
<section id="features-section" ref={featuresRef} className="relative overflow-hidden py-12 sm:py-20 px-4 sm:px-6 lg:px-10">
  {/* Background */}
  <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white z-0" />
  
  {/* Content container */}
  <div className="relative z-10 max-w-7xl mx-auto">
    {/* Section Header */}
    <div className="text-center mb-8 sm:mb-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
        {activeTab === "personal" ? "Everything shoppers need" : "Everything sellers need to grow"}
      </h2>
      <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
        {activeTab === "personal"
          ? "Powerful features that make finding and buying what you need effortless."
          : "From AI selling to secure payments—all the tools to run your business 24/7."}
      </p>
    </div>

    {/* Feature Grid - Changes based on tab */}
    {activeTab === "personal" ? <ShopperFeatures /> : <SellerFeatures />}

    {/* Stats Section */}
    <div className="mt-12 sm:mt-16">
      <StatsSection activeTab={activeTab} />
    </div>
  </div>
</section>

      {/* MEO Section — Fully Responsive Cinematic Hero */}
<section className="relative overflow-hidden min-h-screen flex flex-col justify-between" id="meo" ref={meoRef}>
  {/* Video background - Only plays when in view */}
  <LazyVideo
    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
    src="https://res.cloudinary.com/diml8ljwa/video/upload/v1762296791/meo4_frbyem.webm"
  />

  {/* Overlays */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-0" />
  <div className="absolute inset-0 bg-gradient-to-r from-[#0d3bb8]/40 via-transparent to-[#1e5aff]/30 z-0 mix-blend-multiply" />

  {/* Top-centered Meo capsule */}
  <div className="relative z-10 flex justify-center pt-4 sm:pt-6 md:pt-30">
    <div className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-1 sm:py-2 rounded-full border border-white/10 mt-[10%] sm:mt-[15%] xl:mt-[6%]">
      <Image src={imgPaymeoLogoWhite2} alt="Meo" width={20} height={20} className="w-4 h-4 sm:w-6 sm:h-6" />
      <span className="text-white font-medium text-sm sm:text-base md:text-lg">Meo</span>
    </div>
  </div>

  {/* Bottom section: responsive grid */}
  <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-20 pb-6 sm:pb-8 md:pb-10 lg:pb-12 flex flex-col sm:flex-row items-end justify-between gap-4 sm:gap-6 md:gap-8">
    {/* Left — Button */}
   <div className="flex justify-center sm:justify-start w-full sm:w-auto">
  <button className="flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-[#1e5aff] rounded-[15px] h-10 sm:h-12 md:h-[46px] xl:h-[76px] px-4 sm:px-6 md:px-8 text-sm sm:text-base md:text-xl backdrop-blur-sm bg-transparent group transition-all">
    Coming Soon
  </button>
</div>


    {/* Right — Text block */}
    <div className="max-w-lg text-center sm:text-left mx-auto sm:mx-0">
     <h5 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-4xl font-medium text-white leading-snug sm:leading-tight mb-4 sm:mb-6">
  UNDERSTANDS YOUR CUSTOMERS LIKE YOU DO
</h5>
      <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed">
        Meo is your dedicated <span className="text-[#1e5aff]">24/7</span> Sales AI Agent built to understand, engage, and convert intent into sales like you.<br className="hidden sm:block"/>
        Allowing you make more sales even while you sleep!
      </p>
    </div>
  </div>
</section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {activeTab === "personal" ? "What shoppers say" : "What sellers say"}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Real stories from real users.
            </p>
          </div>
          <TestimonialsSection activeTab={activeTab} />
        </div>
      </section>

      {/* FAQ Section - Can pass activeTab if FAQ component supports it */}
      <FaqSection />

      <Footer />
    </div>
  );
}