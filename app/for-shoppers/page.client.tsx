"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowRight,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Network,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";
import WaitlistDialog from "@/components/WaitlistDialog";
import imgPaymeoLogoWhite2 from "@/public/assets/paymeologowhite.png";
import img1 from "@/public/assets/1358c3ba35bdc98636a5ef3762c21e31cbb88101.png";
import img2 from "@/public/assets/c84cb53a7a4ab50359323f283c7dd65e84d3da6a.png";
import img4 from "@/public/assets/5aa1fa68211c63081166829f4977597c21ba8a26.png";
import img6 from "@/public/assets/435b9331e24bd7e0d6eaba49dc951f5f0ebdac7f.png";

// Import only the components we still need from shopper-components
import { 
  ShopperFeatures, 
  ShopperHowItWorks, 
  ShopperTestimonials
} from "@/components/shopper-components";

// Type for useInViewport
interface UseInViewportReturn {
  ref: any;
  isInView: boolean;
}

function useInViewport(): UseInViewportReturn {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, []);

  return { ref, isInView };
}

// LazyVideo Component (copied directly)
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
    <div ref={ref as React.RefObject<HTMLDivElement>}>
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

export default function ForShoppersPageClient() {
  const [activeTab, setActiveTab] = useState<"personal" | "business">("personal");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activePhase, setActivePhase] = useState(1);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const router = useRouter();

  const { ref: howItWorksRef, isInView: howItWorksInView } = useInViewport();
  const { ref: featuresRef, isInView: featuresInView } = useInViewport();

  useEffect(() => {
    if (howItWorksInView) {
      const interval = setInterval(() => {
        setActivePhase((prev) => (prev === 4 ? 1 : prev + 1));
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [howItWorksInView]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const openWaitlist = () => setWaitlistOpen(true);
  
  const culture = "https://res.cloudinary.com/diml8ljwa/image/upload/v1761872629/hero_illustration_ppefew.png";

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Waitlist Dialog */}
      <WaitlistDialog isOpen={waitlistOpen} setIsOpen={setWaitlistOpen} />

      {/* Navigation */}
      <Nav
        imgPaymeoLogoWhite2={imgPaymeoLogoWhite2}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsProfileOpen={setIsProfileOpen}
      />

      {/* HERO SECTION - COMPACT AND FULLY VISIBLE */}
      <section className="relative h-screen max-h-[800px] min-h-[700px] flex flex-col overflow-hidden">
        {/* Background Phone Image */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e5aff]/80 via-[#1e5aff]/60 to-[#1e5aff]/90 z-10">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full object-cover z-0"
            >
              <source 
                src="https://res.cloudinary.com/diml8ljwa/video/upload/q_70,f_webm,vc_vp9,w_1200,ac_none,du_8/v1762294237/paymeohero_1_tq8bao" 
                type="video/webm" 
              />
            </video>
          </div>
          <div className="absolute inset-0 backdrop-blur-sm bg-black/5" />
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/10 to-transparent" />
        </div>

        {/* Main Content - More compact */}
        <div className="relative z-10 flex-1 flex items-center px-4 sm:px-6 lg:px-10 pt-20 pb-16 md:pt-24 md:pb-20">
          <div className="max-w-7xl mx-auto w-full mt-[-80px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center lg:items-end">
              {/* Left Column - Hero Card */}
              <Card className="bg-white border border-[#c4d4ff] rounded-[30px] p-5 sm:p-6 shadow-lg">
                <CardContent className="p-0">
                  <div>
                    <div className="bg-[#e6dbff] text-violet-500 border border-violet-500 mb-3 text-xs inline-block px-2 py-0.5 rounded-full">
                      <span className="font-normal">We&apos;re now in</span>
                      <span>Beta! 🚀</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[50px] leading-tight mb-2 text-black font-extrabold">
                      Find what you need. <br className="hidden sm:block" />
                      At the best price.
                    </h1>

                    <p className="text-xs sm:text-sm md:text-base text-black/80 leading-relaxed mb-3 font-small">
                      Post what you&apos;re looking for. Sellers send their
                      best offers. Compare, choose, and pay securely without
                      walking through the entire market. Attach bounties to your posts and fellow shoppers help you find things faster. Get paid helping other shoppers find things. Tip people who help
                      you, connect with friends.
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 mt-1">
                    <Button 
  className="bg-[#1e5aff] hover:bg-[#1e5aff]/90 text-white rounded-[20px] h-10 px-4 group text-xs sm:text-sm"
  onClick={() => window.location.href = 'https://my.paymeo.co'}
>
  Use Paymeo
  <ArrowUp className="w-3 h-3 ml-2 rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Right Column - Avatars */}
              <div className="flex flex-col items-center lg:items-end gap-2">
                <div className="text-center lg:text-right">
                  <div className="flex items-center justify-center lg:justify-end -space-x-2 mb-2">
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-white">
                      <AvatarImage src={img6.src} alt="Paymeo user" />
                    </Avatar>
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-white">
                      <AvatarImage src={img4.src} alt="Paymeo user" />
                    </Avatar>
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-white">
                      <AvatarImage src={img2.src} alt="Paymeo user" />
                    </Avatar>
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-white">
                      <AvatarImage src={img1.src} alt="Paymeo user" />
                    </Avatar>
                  </div>
                  <p className="text-white text-xs backdrop-blur-sm bg-black/20 rounded-lg px-3 py-1 inline-block">
                    80+ shoppers have already joined!
                  </p>
                </div>

                {/* Desktop Waitlist Button */}
                <Button
                  variant="outline"
                  className="hidden lg:flex border-2 border-white text-white hover:bg-white hover:text-[#1e5aff] rounded-[15px] h-12 px-5 text-base backdrop-blur-sm bg-transparent group transition-all"
                  onClick={() => window.location.href = 'https://my.paymeo.co'}
                >
                  Use Paymeo
                  <ArrowUp className="w-4 h-4 ml-2 rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator with Marketplace Button - UPDATED */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-3 mb-[50px] lg:mb-[80px]">
          <button
            onClick={() => scrollToSection("shoppers-value")}
            className="bg-black/70 hover:bg-black/80 text-white text-xs sm:text-sm px-4 py-2 rounded-[25px] flex items-center gap-2 transition-all group whitespace-nowrap shadow-lg"
          >
            How it works
            <ArrowDown className="w-3 h-3 group-hover:translate-y-1 transition-transform" />
          </button>
          
          {/* Marketplace Button */}
          <button
            onClick={() => router.push("/marketplace")}
            className="bg-black/70 hover:bg-black/70 text-white text-xs sm:text-sm px-4 py-2 rounded-[25px] flex items-center gap-2 transition-all shadow-md whitespace-nowrap"
          >
            Marketplace
          </button>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS ANIMATED SECTION - WITH NEW ID
      ========================================================= */}
      <section
        id="shoppers-value"
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
                        className="
    absolute 
    top-[35%] sm:top-[20%] md:top-[27%] lg:top-[25%] xl:top[40%]
    w-full max-w-[180px] sm:max-w-[250px] md:max-w-[250px] lg:max-w-[250px]
    z-10 
    rounded-3xl 
    shadow-5xl 
  "
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 3,
                          duration: 0.6,
                          ease: "easeOut",
                        }}
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

          {/* Navigation - UPDATED with Arrow Down to Features */}
          <div className="flex justify-center gap-3 sm:gap-4 mt-8 sm:mt-12 relative z-10">
            <button
              onClick={() => scrollToSection("features-section")}
              className="bg-black/70 hover:bg-black/80 backdrop-blur-sm text-white px-3 sm:px-4 py-2 sm:py-3 rounded-[25px] flex items-center gap-2 transition-all group text-sm"
              aria-label="Scroll to features"
            >
              Features
              <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS STEPS SECTION */}
      <section
        className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-10 bg-white overflow-hidden"
      >
        {/* Decorative circles */}
        <div className="absolute bottom-0 right-0 opacity-25 pointer-events-none">
          <svg width="180" height="180" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M80 0C35.817 0 0 35.817 0 80s35.817 80 80 80 80-35.817 80-80S124.183 0 80 0Zm0 150C41.117 150 10 118.883 10 80S41.117 10 80 10s70 31.117 70 70-31.117 70-70 70Z" fill="#1e5aff" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How shoppers find value
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple steps to get what you need at the best price.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <ShopperHowItWorks />
            <div className="mt-10 text-center">
              <Button 
                className="bg-[#1e5aff] hover:bg-[#1e5aff]/90 text-white rounded-[20px] h-12 px-8"
                onClick={openWaitlist}
              >
                Start Shopping
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - WITH NEW ID */}
      <section
        id="features-section"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything Shoppers Need
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Powerful features that make finding and buying effortless.
            </p>
          </div>
          <ShopperFeatures />
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
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
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What Shoppers Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real stories from real users.
            </p>
          </div>
          <ShopperTestimonials />
        </div>
      </section>

      {/* MORE FEATURES SECTION */}
      <section
        ref={featuresRef}
        className="relative overflow-hidden min-h-screen flex flex-col justify-between"
      >
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source 
            src="https://res.cloudinary.com/diml8ljwa/video/upload/q_70,f_webm,vc_vp9,w_1200,ac_none,du_8/v1761862907/paymeohand_rbd6vd" 
            type="video/webm" 
          />
        </video>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white/10 z-0" />

        {/* Content container */}
        <div className="relative z-10 max-w-7xl mx-auto py-12 sm:py-20 px-4 sm:px-6 lg:px-20">
          {/* Heading */}
          <div className="text-center mb-8 sm:mb-12">
            <p className="bg-black/20 backdrop-blur-md rounded-lg px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Paymeo combines social networking with commerce — every
              interaction can turn into a trusted sale or meaningful connection.
            </p>
          </div>

          {/* Feature cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Card — Verified Community */}
            <Card className="bg-white/60 backdrop-blur-md border border-white/8 rounded-2xl shadow-2xl overflow-hidden transform transition hover:-translate-y-2">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-white/8">
                  <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl text-black mb-2 sm:mb-3">
                  Verified Community
                </h3>
                <p className="text-black/80 text-sm sm:text-base">
                  Every member is verified so you can trade and connect with
                  confidence in a trusted environment.
                </p>
              </CardContent>
            </Card>

            {/* Card — Smart Matching */}
            <Card className="bg-white/60 backdrop-blur-md border border-white/8 rounded-2xl shadow-2xl overflow-hidden transform transition hover:-translate-y-2">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-white/8">
                  <Network className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl text-black mb-2 sm:mb-3">
                  Smart Matching
                </h3>
                <p className="text-black/80 text-sm sm:text-base">
                  Intent-powered matching connects you to the right people,
                  offers, and buyers at the right time.
                </p>
              </CardContent>
            </Card>

            {/* Card — Seamless Payments */}
            <Card className="bg-white/60 backdrop-blur-md border border-white/8 rounded-2xl shadow-2xl overflow-hidden transform transition hover:-translate-y-2">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-white/8">
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl text-black mb-2 sm:mb-3">
                  Seamless Payments
                </h3>
                <p className="text-black/80 text-sm sm:text-base">
                  Pay securely, accept purchases, send tips, and reconcile
                  transactions.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Subtext row */}
          <div className="mt-8 sm:mt-12 flex items-center justify-center">
            <div className="bg-black/20 backdrop-blur-md rounded-lg px-4 sm:px-6 py-2 sm:py-4 text-white text-sm sm:text-lg text-center">
              Secure • Fast • Built for community
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-6 lg:px-12 bg-[#1e5aff]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to find what you need?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Join thousands of shoppers already using Paymeo.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-[#1e5aff] hover:bg-gray-100 rounded-full px-8"
            onClick={openWaitlist}
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* FAQ SECTION */}
      <FaqSection />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}