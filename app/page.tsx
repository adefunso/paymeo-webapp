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
                Log in to your Paymeo Business Account
              </h4>
              <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8 max-w-md">
                &quot;Sell across your existing channels with 24/7 Sales AI Agents — never lose a sale, even while you sleep. Manage payments, inventory, and shipments all in one place. Unlock demand-driven social commerce and 10x your sales process — right from your pocket.&quot;
              </p>

              <div className="flex flex-col gap-3 w-full sm:w-[80%] md:w-[60%]">
                <Link href="https://web.paymeo.co" className="w-full">
                  <div className="block w-full text-center h-10 sm:h-12 rounded-[14px] bg-[#1e5aff] text-white leading-[40px] sm:leading-[48px] hover:bg-[#1746cc] transition-colors text-sm sm:text-base">
                    Get started for free
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
          &copy; 2025 Paymeo. All rights reserved.
        </div>
      </motion.aside>
    </>
  )}
</AnimatePresence>

  );
}

/* ---------------------------------------------------------
   Full HomePage component (keeps all original content +
   waitlist dialog + new profile slide-in modal + switch
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
              <span>{activeTab === "personal" ? "Beta! 🍲🔥" : "Businesses 💼"}</span>
            </Badge>

            {activeTab === "personal" ? (
              <>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[50px] leading-tight mb-4 sm:mb-6 text-black font-extrabold">
                  The Intent-Driven Social Commerce
                </h1>

                <p className="text-sm sm:text-base text-black/80 leading-relaxed mb-6 sm:mb-8">
                  Discover, shop with confidence, pay friends and connect over the things you love, powered by your requests.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[50px] leading-tight mb-4 sm:mb-6 text-black font-extrabold">
                  Grow with Intent-Driven Commerce
                </h1>
                <p className="text-sm sm:text-base text-black/80 leading-relaxed mb-6 sm:mb-8">
                  Power your sales, manage payments, and connect with customers all in one place.
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
                <Link href="https://web.paymeo.co">
                  <Button className="bg-[#1e5aff] hover:bg-[#1e5aff]/90 text-white rounded-[20px] h-12 px-4 sm:px-6 group text-sm sm:text-base mt-4 sm:mt-6 mb-2 sm:mb-0">
                    Get Started for Free
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Button>
                </Link>
                <Button
                  className="border border-[#c4d4ff] bg-white text-[#1e5aff] rounded-[20px] h-12 px-4 sm:px-6 group transition-colors duration-200 hover:bg-black hover:text-white text-sm sm:text-base mt-6"
                  onClick={() => setIsProfileOpen(true)}
                >
                  <span className="flex items-center">
                    Sign in
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </span>
                </Button>
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
              ? "50+ explorers have already joined!"
              : "100+ businesses now use Paymeo to supercharge their sales."}
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
      className="bg-black/70 hover:bg-black/80 backdrop-blur-sm text-white text-xs sm:text-sm md:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-[25px] flex items-center gap-2 transition-all group whitespace-nowrap"
    >
      How it works
      <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-y-1 transition-transform" />
    </button>
    {activeTab === "personal" && (
      <button
        onClick={() => router.push('/marketplace')}
        className="bg-black/70 hover:bg-black/70 text-white text-xs sm:text-sm md:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-[25px] flex items-center gap-2 transition-all shadow-md animate-fadeIn whitespace-nowrap"
      >
        Marketplace
      </button>
    )}

    {activeTab === "business" && (
      <button
        onClick={() => router.push('/pricing')}
        className="bg-black/70 hover:bg-black/70 text-white text-xs sm:text-sm md:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-[25px] flex items-center gap-2 transition-all shadow-md animate-fadeIn whitespace-nowrap"
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
    

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
      

     {/* Animated Feature Card */}
<Card className="relative bg-gradient-to-br from-blue-50 to-blue-50 border-2 border-[#c4d4ff] rounded-[30px] overflow-hidden h-[80vh] sm:h-screen shadow-lg">
  <CardContent className="relative h-full flex items-center justify-center overflow-hidden p-4 sm:p-6">

    {/* Animation Container - Only animate when in view */}
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
          {/* Caption */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center px-4 sm:px-10 xl:px-0"
          >
            Use <i className="text-[#1e5aff]">&quot;Ask&quot;</i> to find products/services & get recommendations!
          </motion.h3>

          {/* Main Mobile */}
          <motion.img
            src="https://res.cloudinary.com/diml8ljwa/image/upload/v1761884644/ask1_v0i2re.svg"
            alt="Paymeo Chat Screen"
            className="w-full max-w-[250px] sm:max-w-[300px] md:max-w-[300px] lg:max-w-[300px]"
          />

          {/* Mini Overlays */}
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
            <i className="text-[#1e5aff]">Swipe</i> real-time offers for your product/service requests
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
             Using <i><strong>&quot;Shop Ask&quot;</strong></i>, get real-time offers from businesses around you. Swipe. Shortlist. Negotiate. Shop!
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
            Form communities, organize life-events, schedule & pay gradually for items using <i className="text-[#1e5aff]">Co-pay</i>
          </motion.h3>

          {/* Chat Screen */}
          <motion.img
            src="https://res.cloudinary.com/diml8ljwa/image/upload/v1761906469/TransactionChats_ajel9w.svg"
            alt="Chat Interface"
            className="w-full max-w-[180px] sm:max-w-[250px] md:max-w-[250px] lg:max-w-[250px] rounded-3xl shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />

          {/* Pinned Transactions Overlay */}
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
             Shop. Collaborate with friends, family & businesses through <i className="text-[#1e5aff]">Chat Flows</i>
          </motion.h3>

          {/* Chat Screen */}
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

{/* Card 1 - Video Feature */}
<Card className="relative bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-[#c4d4ff] rounded-[30px] overflow-hidden h-[80vh] sm:h-screen shadow-lg">
  <CardContent className="relative h-full p-0 overflow-hidden">

    {/* Background Video - Only plays when in view */}
    <LazyVideo
      src="https://res.cloudinary.com/diml8ljwa/video/upload/q_70,f_webm,vc_vp9,w_1200,ac_none,du_8/v1762297517/woman_1_wjwhiw"
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
          Express Your Intent
        </h3>
        <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-md mx-auto">
          From shopping, collaborating & sending cash to friends, seeking recommendations, to selling. Paymeo understands what you&apos;re looking for and connects you with the right opportunities — instantly.
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
      <button
        onClick={() => document.getElementById('more-features')?.scrollIntoView({ behavior: 'smooth' })}
        className="bg-black/70 hover:bg-black/80 backdrop-blur-sm text-white px-4 sm:px-6 py-2 sm:py-3 rounded-[25px] flex items-center gap-2 transition-all group text-sm"
        aria-label="View more features"
      >
        More
        <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-y-1 transition-transform" />
      </button>
    </div>
  </div>
</section>


   {/* More Features Section — video background + glass feature cards */}
<section id="more-features" ref={featuresRef} className="relative overflow-hidden min-h-screen flex flex-col justify-between">
  {/* Video background (full bleed) - Only plays when in view */}
  <LazyVideo
    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
    src="https://res.cloudinary.com/diml8ljwa/video/upload/q_70,f_webm,vc_vp9,w_1200,ac_none,du_8/v1761862907/paymeohand_rbd6vd"
  />

  {/* Overlays */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white/10 z-0" />

  {/* Content container */}
  <div className="relative z-10 max-w-7xl mx-auto py-12 sm:py-20 px-4 sm:px-6 lg:px-20">
    {/* Heading */}
    <div className="text-center mb-8 sm:mb-12">
      
      <p className="bg-black/20 backdrop-blur-md rounded-lg px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
        Paymeo combines social networking with commerce — every interaction can turn into a trusted sale or meaningful connection.
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
          <h3 className="text-lg sm:text-xl md:text-2xl text-black mb-2 sm:mb-3">Verified Community</h3>
          <p className="text-black/80 text-sm sm:text-base">
            Every member is verified so you can trade and connect with confidence in a trusted environment.
          </p>
        </CardContent>
      </Card>

      {/* Card — Smart Matching */}
      <Card className="bg-white/60 backdrop-blur-md border border-white/8 rounded-2xl shadow-2xl overflow-hidden transform transition hover:-translate-y-2">
        <CardContent className="p-4 sm:p-6 md:p-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-white/8">
            <Network className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl text-black mb-2 sm:mb-3">Smart Matching</h3>
          <p className="text-black/80 text-sm sm:text-base">
            Intent-powered matching connects you to the right people, offers, and buyers at the right time.
          </p>
        </CardContent>
      </Card>

      {/* Card — Seamless Payments */}
      <Card className="bg-white/60 backdrop-blur-md border border-white/8 rounded-2xl shadow-2xl overflow-hidden transform transition hover:-translate-y-2">
        <CardContent className="p-4 sm:p-6 md:p-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-white/8">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl text-black mb-2 sm:mb-3">Seamless Payments</h3>
          <p className="text-black/80 text-sm sm:text-base">
            Pay friends, accept purchases, send tips, and reconcile transactions — all with clean UX and powerful controls.
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

    {/* Navigation buttons — fixed positioning */}
    <div className="relative z-20 flex justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 md:mt-14">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="bg-black/70 hover:bg-black/80 backdrop-blur-sm text-white px-3 sm:px-4 py-2 sm:py-3 rounded-[25px] flex items-center gap-2 transition-all text-sm"
        aria-label="Scroll up"
      >
        <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 rotate-180" />
      </button>

      <button
        onClick={() => document.getElementById('meo')?.scrollIntoView({ behavior: 'smooth' })}
        className="bg-black/70 hover:bg-black/80 backdrop-blur-sm text-white px-4 sm:px-6 py-2 sm:py-3 rounded-[25px] flex items-center gap-2 transition-all group text-sm"
        aria-label="Go to Meo section"
      >
        Meo AI
        <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-y-1 transition-transform" />
      </button>
    </div>
  </div>
</section>



      {/* Final CTA — full-bleed video background with glass CTA */}
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




<FaqSection />

      <Footer />

    </div>
  );
}