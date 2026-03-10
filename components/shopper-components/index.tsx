"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  DollarSign,
  ArrowRight,
  MapPin,
  CreditCard,
  QrCode,
  Users,
  CheckCircle2,
  Bell,
  Headphones,
  Store,
  ArrowDown,
} from "lucide-react";
import { useInViewport } from "@/hooks/useInViewport";
import { RefObject, useEffect, useRef } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

/* ---------------------------------------------------------
   LazyVideo Component
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
    <div ref={ref as RefObject<HTMLDivElement>}>
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
   Shopper Features Component
--------------------------------------------------------- */
export function ShopperFeatures() {
  const features = [
    {
      icon: <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Post Requests",
      description:
        "Tell us what you're looking for. Sellers compete to give you their best offers.",
    },
    {
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Add Bounties",
      description:
        "Add a reward to your request. Scouts hunt for hard-to-find items and get paid when you find them.",
    },
    {
      icon: <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Swipe to Compare",
      description:
        "See all offers side-by-side. Swipe through prices, pick the best deal.",
    },
    {
      icon: <MapPin className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Map to Stall",
      description:
        "Get real-time directions straight to the seller's stall. No more wandering.",
    },
    {
      icon: <CreditCard className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Secure Escrow",
      description:
        "Money held safely until you confirm pickup. Only pay when you're satisfied.",
    },
    {
      icon: <QrCode className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Scan & Shop",
      description:
        "At a busy stall? Scan the QR code. AI helps you browse and buy without waiting.",
    },
    {
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Community Recommendations",
      description:
        "Not sure where to find quality? Ask the community. Real people, real answers.",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Verified Sellers",
      description:
        "Every seller is verified with real stall locations. No ghosts. No scams.",
    },
    {
      icon: <Bell className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Instant Notifications",
      description:
        "Get alerted when sellers respond to your request. Never miss an offer.",
    },
    {
      icon: <Headphones className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "AI Assistance",
      description:
        "Talk to seller AI agents. Ask questions, negotiate prices, all via voice or text.",
    },
    {
      icon: <Store className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Discover New Sellers",
      description:
        "Find hidden gems—stalls you'd never notice while walking through the market.",
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
   Shopper How It Works Component
--------------------------------------------------------- */
export function ShopperHowItWorks() {
  return (
    <div className="space-y-8">
      {/* Step 1 */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-[#1e5aff] rounded-full flex items-center justify-center text-white font-bold shrink-0">
          1
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Post What You Want</h3>
          <p className="text-gray-600 mb-2">
            Tell us what you&apos;re looking for — products, services, or even
            recommendations. Add a bounty if you want faster results. You can
            also request money from friends or send tips directly from your
            wallet.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Find better
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Request money
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Send tips
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
          <h3 className="text-lg font-semibold mb-1">
            Get Offers & Recommendations
          </h3>
          <p className="text-gray-600 mb-2">
            Sellers send their best prices. Community members reply with
            recommendations. Compare offers side-by-side, swipe to choose, or
            accept a tip-worthy recommendation. You can also receive money
            directly from friends in chat.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Compare offers
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Community answers
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Chat payments
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
          <h3 className="text-lg font-semibold mb-1">
            Pay, Tip & Transfer Securely
          </h3>
          <p className="text-gray-600 mb-2">
            Money held in escrow. Only released when you confirm pickup. No
            risk. Tip users who gave great recommendations. Send money to
            friends directly from your wallet. All secure, all in-app.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Escrow protection
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Wallet balance
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Peer-to-peer transfers
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Tip recommendations
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
          <h3 className="text-lg font-semibold mb-1">Pick Up & Enjoy</h3>
          <p className="text-gray-600 mb-2">
            Follow the map to the seller&apos;s stall. Confirm receipt.
            Confirm delivery for out-of-market orders. Done. Tip exceptional
            service.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Map directions
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Rate & review
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Instant wallet update
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1e5aff] text-xs rounded-full">
              Ready for next
            </span>
          </div>
        </div>
      </div>

      {/* Wallet Summary Card */}
      <div className="mt-6 p-4 bg-gradient-to-r from-[#1e5aff]/5 to-[#1e5aff]/10 rounded-xl border border-[#1e5aff]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1e5aff] rounded-full flex items-center justify-center">
            <span className="text-white font-bold">₦</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Your Paymeo Wallet</p>
            <p className="text-lg font-semibold">
              Send, receive, tip, and request—all from one wallet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Shopper Testimonials Component
--------------------------------------------------------- */
export function ShopperTestimonials() {
  const testimonials = [
    {
      name: "Chioma",
      role: "Shopper, Lagos",
      content:
        "I needed a specific Ankara style. Posted a request with a small bounty. Within an hour, three sellers sent offers. Picked the best, picked it up the next morning. No stress.",
    },
    {
      name: "Tunde",
      role: "Shopper, Ibadan",
      content:
        "The map feature saved me. The seller was hidden in the back of the market. Paymeo led me straight there.",
    },
    {
      name: "Kemi",
      role: "Shopper, Lagos",
      content:
        "I love that I don't have to walk through the whole market anymore. I post what I want, compare offers, and just go pick up.",
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
          <Card className="bg-white border border-[#c4d4ff] rounded-2xl">
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

/* ---------------------------------------------------------
   How It Works Animated Section - FIXED with unique ID
--------------------------------------------------------- */
interface HowItWorksAnimatedProps {
  howItWorksInView: boolean;
  activePhase: number;
  culture: string;
  imgPaymeoLogoWhite2: StaticImport;
}

export function HowItWorksAnimated({
  howItWorksInView,
  activePhase,
  culture,
  imgPaymeoLogoWhite2,
}: HowItWorksAnimatedProps) {
  // Create a ref for this specific instance
  const sectionRef = useRef<HTMLElement>(null);
  
  return (
    <section
      ref={sectionRef}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Animated Feature Card */}
          <Card className="relative bg-gradient-to-br from-blue-50 to-blue-50 border-2 border-[#c4d4ff] rounded-[30px] overflow-hidden h-[80vh] sm:h-screen shadow-lg">
            <CardContent className="relative h-full flex items-center justify-center overflow-hidden p-4 sm:p-6">
              <AnimatePresence mode="wait">
                {howItWorksInView && activePhase === 1 && (
                  <motion.div
                    key="phase1"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-4"
                  >
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center px-4 sm:px-10 xl:px-0"
                    >
                      Use <i className="text-[#1e5aff]">&quot;Ask&quot;</i> to find
                      products/services & get recommendations!
                    </motion.h3>

                    <motion.img
                      src="https://res.cloudinary.com/diml8ljwa/image/upload/v1761884644/ask1_v0i2re.svg"
                      alt="Paymeo Chat Screen"
                      className="w-full max-w-[250px] sm:max-w-[300px] md:max-w-[300px] lg:max-w-[300px]"
                    />

                    <motion.img
                      src="https://res.cloudinary.com/diml8ljwa/image/upload/v1761885291/ask2_aijwma.svg"
                      alt="Overlay 1"
                      className="absolute top-[40%] sm:top-[45%] w-full max-w-[250px] sm:max-w-[300px] md:max-w-[300px] lg:max-w-[300px] z-10"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                    />
                    <motion.img
                      src="https://res.cloudinary.com/diml8ljwa/image/upload/v1761885291/ask3_sql6ll.svg"
                      alt="Overlay 2"
                      className="absolute top-[55%] sm:top-[65%] w-full max-w-[250px] sm:max-w-[300px] md:max-w-[300px] lg:max-w-[300px] z-10"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 }}
                    />
                  </motion.div>
                )}

                {howItWorksInView && activePhase === 2 && (
                  <motion.div
                    key="phase2"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-4"
                  >
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center px-4 sm:px-10"
                    >
                      <i className="text-[#1e5aff]">Swipe</i> real-time offers
                      for your product/service requests
                    </motion.h3>

                    <motion.img
                      src="https://res.cloudinary.com/diml8ljwa/image/upload/v1762341472/paymeoswipe_1_wq0dgo.webp"
                      alt="Sales Dashboard"
                      className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]"
                    />
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-sm sm:text-base md:text-lg font-semibold text-gray-600 mt-6 sm:mt-10 text-center px-4 sm:px-10"
                    >
                      Using{" "}
                      <i>
                        <strong>&quot;Shop Ask&quot;</strong>
                      </i>
                      , get real-time offers from businesses around you. Swipe.
                      Shortlist. Negotiate. Shop!
                    </motion.p>
                  </motion.div>
                )}

                {howItWorksInView && activePhase === 3 && (
                  <motion.div
                    key="phase3"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-4"
                  >
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center px-4 sm:px-10"
                    >
                      Form communities, organize life-events, schedule & pay
                      gradually for items using{" "}
                      <i className="text-[#1e5aff]">Co-pay</i>
                    </motion.h3>

                    <motion.img
                      src="https://res.cloudinary.com/diml8ljwa/image/upload/v1761906469/TransactionChats_ajel9w.svg"
                      alt="Chat Interface"
                      className="w-full max-w-[180px] sm:max-w-[250px] md:max-w-[250px] lg:max-w-[250px] rounded-3xl shadow-lg"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />

                    <motion.img
                      src="https://res.cloudinary.com/diml8ljwa/image/upload/v1761906916/Pinnedcopay_hgzuhd.svg"
                      alt="Pinned Transactions"
                      className="absolute top-[35%] sm:top-[20%] md:top-[27%] lg:top-[25%] xl:top[40%] w-full max-w-[180px] sm:max-w-[250px] md:max-w-[250px] lg:max-w-[250px] z-10 rounded-3xl shadow-5xl"
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 3, duration: 0.6, ease: "easeOut" }}
                    />
                  </motion.div>
                )}

                {howItWorksInView && activePhase === 4 && (
                  <motion.div
                    key="phase4"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-4"
                  >
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center px-4 sm:px-10"
                    >
                      Shop. Collaborate with friends, family & businesses
                      through <i className="text-[#1e5aff]">Chat Flows</i>
                    </motion.h3>

                    <motion.img
                      src="https://res.cloudinary.com/diml8ljwa/image/upload/v1761906908/businesstransactionchats_fgaaid.svg"
                      alt="Chat Interface"
                      className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[250px] lg:max-w-[250px] rounded-3xl shadow-lg"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Video Feature Card */}
          <Card className="relative bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-[#c4d4ff] rounded-[30px] overflow-hidden h-[80vh] sm:h-screen shadow-lg">
            <CardContent className="relative h-full p-0 overflow-hidden">
              <LazyVideo
                src="https://res.cloudinary.com/diml8ljwa/video/upload/q_70,f_webm,vc_vp9,w_1200,ac_none,du_8/v1762297517/woman_1_wjwhiw"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />

              <div className="relative z-20 h-full flex flex-col justify-end items-center text-center p-6 sm:p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={howItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="flex items-center justify-center mb-3 sm:mb-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#1e5aff] rounded-[23px] flex items-center justify-center">
                      <Image
                        src={imgPaymeoLogoWhite2}
                        alt="Paymeo"
                        className="w-8 h-8 sm:w-10 sm:h-10"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-2 sm:mb-3">
                    Express Your Intent
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-md mx-auto">
                    From shopping, collaborating & sending cash to friends,
                    seeking recommendations, to selling. Paymeo understands
                    what you&apos;re looking for and connects you with the
                    right opportunities — instantly.
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
          >
            <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 rotate-180" />
          </button>
        </div>
      </div>
    </section>
  );
}