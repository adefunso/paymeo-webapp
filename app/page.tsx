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
  [key: string]: any;
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
          w-[100%] sm:w-[70%] md:w-[65%] lg:w-[60%] xl:w-[50%]
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
<div className="mt-10 flex justify-center md:justify-start ml-6">
    <span className="bg-black/70 text-[12px] text-white hover:bg-black/70 px-3 py-2 rounded-[20px] border-0">
      MOBILE APP COMING SOON!
    </span>
  </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-7 right-7 z-20 p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-gray-800" />
        </button>

         </div>
  

        {/* Content */}
        <div className="relative z-10 flex-1 p-10 overflow-y-auto flex flex-col justify-center items-center text-center">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-[#1e5aff] rounded-[14px] flex items-center justify-center mb-4">
              <Image
                src={imgPaymeoLogoWhite2}
                alt="Paymeo"
                className="w-10 h-10 object-contain"
              />
            </div>
          </div>

          {/* PERSONAL TAB */}
          {activeTab === "personal" ? (
            <>
              <h4 className="text-2xl font-semibold mb-3">
                Be the first to experience Paymeo Personal
              </h4>
              <p className="text-gray-600 mb-8 max-w-md">
                &quot;We&apos;re shipping the personal web & mobile experience soon. Join the waitlist and get early access.&quot;
              </p>
              <div className="space-y-3 w-full sm:w-[60%]">
                <button
                  className="w-full h-12 rounded-[14px] bg-[#1e5aff] text-white flex items-center justify-center gap-2 font-medium shadow-md hover:bg-[#1746cc] transition-colors"
                  onClick={() => {
                    openWaitlist();
                    onClose();
                  }}
                  
                >
                  Join the Waitlist
                  <ArrowUp className="w-4 h-4 rotate-45" />
                </button>
              </div>
            </>
          ) : (
            /* BUSINESS TAB */
            <>
              <h4 className="text-2xl font-semibold mb-3">
                Log in to your Paymeo Business Account
              </h4>
              <p className="text-gray-600 mb-8 max-w-md">
                &quot;Sell across your existing channels with 24/7 Sales AI Agents — never lose a sale, even while you sleep. Manage payments, inventory, and shipments all in one place. Unlock demand-driven social commerce and 10x your sales process — right from your pocket.&quot;
              </p>

              <div className="flex flex-col gap-3 w-full sm:w-[60%]">
                <Link href="https://web.paymeo.co" className="w-full">
                  <div className="block w-full text-center h-12 rounded-[14px] bg-[#1e5aff] text-white leading-[48px] hover:bg-[#1746cc] transition-colors">
                    Get started for free
                  </div>
                </Link>

                <Link href="https://web.paymeo.co" className="w-full">
                  <div className="block w-full text-center h-12 rounded-[14px] border border-[#1e5aff] text-[#1e5aff] leading-[48px] hover:bg-[#1e5aff]/10 transition-colors">
                    Log In
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 text-center text-sm text-gray-400 border-t border-gray-100">
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
      "https://res.cloudinary.com/diml8ljwa/video/upload/v1762296185/paymeomale_1_qirryn.webm",
  };

  const culture = "https://res.cloudinary.com/diml8ljwa/image/upload/v1761872629/hero_illustration_ppefew.png";

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Profile slide-in */}
      <ProfileSlideIn
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        activeTab={activeTab}
         openWaitlist={() => setWaitlistOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative h-screen xl:h-screen flex flex-col overflow-hidden">
        {/* Background Phone Image */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b  from-[#1e5aff]-100/80 via-[#1e5aff]-50/50 to-[#1e5aff]/90 z-10">
          <LazyVideo
  key={activeTab} // forces reload when tab changes
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

       <Nav imgPaymeoLogoWhite2={imgPaymeoLogoWhite2} activeTab={activeTab} setActiveTab={setActiveTab} setIsProfileOpen={setIsProfileOpen} />



        {/* Main Content */}
        <div className="relative z-10 flex-1 flex items-center px-4 sm:px-6 lg:px-10 pb-16 pt-8 mt-20">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-end">
            
      
            {/* Left Column - Hero Card */}
            <Card className="bg-white border border-[#c4d4ff] rounded-[30px] p-8 md:p-10 shadow-lg">
              <CardContent className="p-0">
                <Badge className="bg-[#e6dbff] text-violet-500 hover:bg-[#e6dbff] border border-violet-500 mb-6">
                  <span className="font-normal">
                    {activeTab === "personal" ? "We're now in" : "For"}
                  </span>
                  <span>{activeTab === "personal" ? "Beta! 🍲🔥" : "Businesses 💼"}</span>
                </Badge>

                {activeTab === "personal" ? (
                  <>
                   <h1 className="text-4xl sm:text-5xl lg:text-[50px] leading-tight mb-6 text-black font-extrabold">
  The Intent-Driven Social Commerce
</h1>

                    <p className="text-base text-black/80 leading-relaxed mb-8">
                      Discover, shop with confidence, pay friends and connect over the things you love, powered by your requests.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                          <Button className="bg-[#1e5aff] hover:bg-[#1e5aff]/90 text-white rounded-[20px] h-12 px-6 group" onClick={openWaitlist}>
                            Join The Waitlist
                            <ArrowUp className="w-5 h-5 ml-2 rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                    </div>
                  </>
                ) : (
                  <>
                    <h1 className="text-4xl sm:text-5xl lg:text-[50px] leading-tight mb-6 text-black font-extrabold">
                      Grow with Intent-Driven Commerce
                    </h1>
                    <p className="text-base text-black/80 leading-relaxed mb-8">
                      Power your sales, manage payments, and connect with customers all in one place.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="https://web.paymeo.co">
                      
                          <Button className="bg-[#1e5aff] hover:bg-[#1e5aff]/90 text-white rounded-[20px] h-12 px-6 group">
                            Get Started for Free
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </Button>
                        
                      </Link>
                    <Button
  className="border border-[#c4d4ff] bg-white text-[#1e5aff] rounded-[20px] h-12 px-6 
             group transition-colors duration-200 hover:bg-black"
  onClick={() => setIsProfileOpen(true)}
>
  <span className="group-hover:text-white flex items-center">
    Sign in
    <ArrowRight className="w-5 h-5 ml-2 transition-colors group-hover:text-white" />
  </span>
</Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Right Column - Waitlist Info (avatars + join button) */}
            <div className="flex flex-col items-center lg:items-end gap-6">
              <motion.div
    key={activeTab}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.6 }}
    className="text-center lg:text-right"
  >
              <div className="text-center lg:text-right">
                <div className="flex items-center justify-center lg:justify-end -space-x-2 mb-4" aria-label="User avatars">
                  <Avatar className="w-14 h-14 border-2 border-white">
                    <AvatarImage src={img6.src} alt="Paymeo user" />
                    
                  </Avatar>
                  <Avatar className="w-14 h-14 border-2 border-white">
                    <AvatarImage src={img4.src} alt="Paymeo user" />
                    
                  </Avatar>
                  <Avatar className="w-14 h-14 border-2 border-white">
                    <AvatarImage src={img2.src} alt="Paymeo user" />
                   
                  </Avatar>
                  <Avatar className="w-14 h-14 border-2 border-white">
                    <AvatarImage src={img1.src} alt="Paymeo user" />
                    
                  </Avatar>
                </div>
                {activeTab === "personal" ? (
      <p className="text-white text-base backdrop-blur-sm bg-black/20 rounded-lg px-4 py-2 inline-block">
        50+ explorers have already joined!
      </p>
    ) : (
      <p className="text-white text-base backdrop-blur-sm bg-black/20 rounded-lg px-4 py-2 inline-block">
        100+ businesses now use Paymeo to supercharge their sales.
      </p>
    )}
              </div>
               </motion.div>

              {/* This button is hidden on mobile but still triggers the same dialog */}
               {activeTab === "personal" ? (
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="hidden lg:flex border-2 border-white text-white hover:bg-white hover:text-[#1e5aff] rounded-[15px] h-[76px] px-8 text-xl backdrop-blur-sm bg-transparent group transition-all" onClick={openWaitlist}
                  >
                    Join The Waitlist
                    <ArrowUp className="w-7 h-7 ml-3 rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </DialogTrigger>
              </Dialog>
              ) : (
                <Button
      asChild
      variant="outline"
      className="hidden lg:flex border-2 border-white text-white hover:bg-white hover:text-[#1e5aff] rounded-[15px] h-[76px] px-8 text-xl backdrop-blur-sm bg-transparent group transition-all"
    >
      <a href="https://web.paymeo.co">
        Get Started Now
        <ArrowUp className="w-7 h-7 ml-3 rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </a>
    </Button>
  )}
            </div>

           <WaitlistDialog isOpen={waitlistOpen} setIsOpen={setWaitlistOpen} />
          </div>
        </div>

      {/* Scroll Indicator - Absolutely positioned */}
<div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center space-x-2">
  {/* How It Works Button */}
  <button
    onClick={scrollToSection}
    className="hidden xl:flex bg-black/70 hover:bg-black/80 backdrop-blur-sm text-white text-sm sm:text-base px-5 py-3 rounded-[25px] flex items-center gap-2 transition-all group whitespace-nowrap"
    aria-label="Scroll to how it works section"
  >
    How it works
    <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
  </button>

  {/* Pricing Button (only for Business mode) */}
  {activeTab === 'business' && (
    <button
      onClick={() => router.push('/pricing')} // replace with your pricing route
      className="bg-black/70 hover:bg-black/70 text-white text-sm sm:text-base px-5 py-3 rounded-[25px] flex items-center gap-2 transition-all shadow-md animate-fadeIn whitespace-nowrap"
      aria-label="View pricing"
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
  className="relative py-10 px-4 sm:px-6 lg:px-10 bg-white overflow-hidden"
>
  {/* Background Image */}
  <div className="absolute inset-x-0 top-0 h-[50%] sm:h-[50%] md:h-[50%] lg:h-[105%] overflow pointer-events-none">
    <Image
      src={culture} // ← replace with your Cloudinary or local path
      alt="Background pattern"
      fill
      priority
      className="object-cover object-top opacity-10"
    />
  </div>

  {/* Foreground Content */}
  <div className="relative max-w-7xl mx-auto">
    

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      

     {/* Animated Feature Card */}
<Card className="relative bg-gradient-to-br from-blue-50 to-blue-50 border-2 border-[#c4d4ff] rounded-[30px] overflow-hidden h-screen shadow-lg">
  <CardContent className="relative h-full flex items-center justify-center overflow-hidden">

    {/* Animation Container - Only animate when in view */}
    <AnimatePresence mode="wait">
      {howItWorksInView && activePhase === 1 && (
        <motion.div
          key="phase1"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          {/* Caption */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center px-10"
          >
            Use <i className="text-[#1e5aff]">&quot;Ask&quot;</i> to find products/services & get recommendations!
          </motion.h3>

          {/* Main Mobile */}
          <motion.img
            src="https://res.cloudinary.com/diml8ljwa/image/upload/v1761884644/ask1_v0i2re.svg"
            alt="Paymeo Chat Screen"
            className="w-[100%] md:w-[300px] lg:w-[300px] xl:w-[300px] "
          />

          {/* Mini Overlays */}
          <motion.img
            src="https://res.cloudinary.com/diml8ljwa/image/upload/v1761885291/ask2_aijwma.svg"
            alt="Overlay 1"
            className="absolute top-[45%] w-[100%] md:w-[300px] lg:w-[300px] xl:w-[300px]  z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          />
          <motion.img
            src="https://res.cloudinary.com/diml8ljwa/image/upload/v1761885291/ask3_sql6ll.svg"
            alt="Overlay 2"
            className="absolute top-[65%] w-[100%] md:w-[300px] lg:w-[300px] xl:w-[300px] z-10"
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
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center px-10"
          >
            <i className="text-[#1e5aff]">Swipe</i> real-time offers for your product/service requests
          </motion.h3>

          <motion.img
            src="https://res.cloudinary.com/diml8ljwa/image/upload/v1762341472/paymeoswipe_1_wq0dgo.webp"
            alt="Sales Dashboard"
            className="w-[350%] md:w-[600px] lg:w-[600px] xl:w-[600px]"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-l md:text-3l font-semibold text-gray-600 mt-10 text-center px-10"
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
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center px-10"
          >
            Form communities, organize life-events, schedule & pay gradually for items using <i className="text-[#1e5aff]">Co-pay</i>
          </motion.h3>

          {/* Chat Screen */}
          <motion.img
            src="https://res.cloudinary.com/diml8ljwa/image/upload/v1761906469/TransactionChats_ajel9w.svg"
            alt="Chat Interface"
            className="w-[80%] md:w-[250px] lg:w-[250px] xl:w-[250px] rounded-3xl shadow-lg"
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
          /* default for mobile */
    sm:top-[20%]        /* slightly higher on small screens */
    md:top-[25%]        /* medium screens */
    lg:top-[25%]        /* larger screens */
    xl:top-[22%]        /* extra large screens */
    w-[80%] 
    md:w-[250px] 
    lg:w-[250px]
    xl:w-[250px]
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
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center px-10"
          >
             Shop and collaborate with friends & businesses through <i className="text-[#1e5aff]">Chat Flows</i>
          </motion.h3>

          {/* Chat Screen */}
          <motion.img
            src="https://res.cloudinary.com/diml8ljwa/image/upload/v1761906908/businesstransactionchats_fgaaid.svg"
            alt="Chat Interface"
            className="w-[80%] md:w-[250px] lg:w-[250px] xl:[w-250px] rounded-3xl shadow-lg"
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
<Card className="relative bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-[#c4d4ff] rounded-[30px] overflow-hidden h-screen shadow-lg">
  <CardContent className="relative h-full p-0 overflow-hidden">

    {/* Background Video - Only plays when in view */}
    <LazyVideo
      src="https://res.cloudinary.com/diml8ljwa/video/upload/v1762297517/woman_1_wjwhiw.webm"
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Gradient Overlay for readability */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />

    {/* Overlay Content */}
    <div className="relative z-20 h-full flex flex-col justify-end items-center text-center p-8 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={howItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-[#1e5aff] rounded-[23px] flex items-center justify-center">
            {/* <Sparkles className="w-8 h-8 text-white" /> */}
            <Image src={imgPaymeoLogoWhite2} alt="Paymeo" className="w-10 h-10" />
          </div>
        </div>
        <h3 className="text-3xl md:text-4xl font-semibold text-white mb-3">
          Express Your Intent
        </h3>
        <p className="text-base md:text-lg text-gray-200 max-w-md mx-auto">
          From shopping, collaborating & sending cash to friends, seeking recommendations, to selling. Paymeo understands what you're looking for and connects you with the right opportunities — instantly.
        </p>
      </motion.div>
    </div>
  </CardContent>
</Card>

    </div>

    {/* Navigation */}
    <div className="flex justify-center gap-4 mt-12 relative z-10">
      <button
        className="bg-black/70 hover:bg-black/80 backdrop-blur-sm text-white px-4 py-3 rounded-[25px] flex items-center gap-2 transition-all"
        aria-label="Scroll up"
      >
        <ArrowDown className="w-4 h-4 rotate-180" />
      </button>
      <button
        onClick={() => document.getElementById('more-features')?.scrollIntoView({ behavior: 'smooth' })}
        className="bg-black/70 hover:bg-black/80 backdrop-blur-sm text-white px-6 py-3 rounded-[25px] flex items-center gap-2 transition-all group"
        aria-label="View more features"
      >
        More
        <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
      </button>
    </div>
  </div>
</section>


   {/* More Features Section — video background + glass feature cards */}
<section id="more-features" ref={featuresRef} className="relative overflow-hidden min-h-screen flex flex-col justify-between">
  {/* Video background (full bleed) - Only plays when in view */}
  <LazyVideo
    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
    src="https://res.cloudinary.com/diml8ljwa/video/upload/v1761862907/paymeohand_rbd6vd.mp4"
  />

  {/* Overlays */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white/10 z-0" />

  {/* Content container */}
  <div className="relative z-10 max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-20">
    {/* Heading */}
    <div className="text-center mb-12">
      
      <p className="bg-black/20 backdrop-blur-md rounded-lg px-6 py-4 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
        Paymeo combines social networking with commerce — every interaction can turn into a trusted sale or meaningful connection.
      </p>
    </div>

    {/* Feature cards grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Card — Verified Community */}
      <Card className="bg-white/60 backdrop-blur-md border border-white/8 rounded-2xl shadow-2xl overflow-hidden transform transition hover:-translate-y-2">
        <CardContent className="p-8">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 bg-white/8">
            <CheckCircle2 className="w-8 h-8 text-black" />
          </div>
          <h3 className="text-2xl text-black mb-3">Verified Community</h3>
          <p className="text-black/80">
            Every member is verified so you can trade and connect with confidence in a trusted environment.
          </p>
        </CardContent>
      </Card>

      {/* Card — Smart Matching */}
      <Card className="bg-white/60 backdrop-blur-md border border-white/8 rounded-2xl shadow-2xl overflow-hidden transform transition hover:-translate-y-2">
        <CardContent className="p-8">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 bg-white/8">
            <Network className="w-8 h-8 text-black" />
          </div>
          <h3 className="text-2xl text-black mb-3">Smart Matching</h3>
          <p className="text-black/80">
            Intent-powered matching connects you to the right people, offers, and buyers at the right time.
          </p>
        </CardContent>
      </Card>

      {/* Card — Seamless Payments */}
      <Card className="bg-white/60 backdrop-blur-md border border-white/8 rounded-2xl shadow-2xl overflow-hidden transform transition hover:-translate-y-2">
        <CardContent className="p-8">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 bg-white/8">
            <Sparkles className="w-8 h-8 text-black" />
          </div>
          <h3 className="text-2xl text-black mb-3">Seamless Payments</h3>
          <p className="text-black/80">
            Pay friends, accept purchases, send tips, and reconcile transactions — all with clean UX and powerful controls.
          </p>
        </CardContent>
      </Card>
    </div>

    {/* Subtext row */}
    <div className="mt-12 flex items-center justify-center">
      <div className="bg-black/20 backdrop-blur-md rounded-lg px-6 py-4 text-white text-lg text-center">
        Secure • Fast • Built for community
      </div>
    </div>

    {/* Navigation buttons — fixed positioning */}
    <div className="relative z-20 flex justify-center gap-4 mt-10 sm:mt-14">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="bg-black/70 hover:bg-black/80 backdrop-blur-sm text-white px-4 py-3 rounded-[25px] flex items-center gap-2 transition-all"
        aria-label="Scroll up"
      >
        <ArrowDown className="w-4 h-4 rotate-180" />
      </button>

      <button
        onClick={() => document.getElementById('meo')?.scrollIntoView({ behavior: 'smooth' })}
        className="bg-black/70 hover:bg-black/80 backdrop-blur-sm text-white px-6 py-3 rounded-[25px] flex items-center gap-2 transition-all group"
        aria-label="Go to Meo section"
      >
        Meo AI
        <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
      </button>
    </div>
  </div>
</section>



      {/* Final CTA — full-bleed video background with glass CTA */}
{/* MEO Section — Fully Responsive Cinematic Hero */}
<section className="relative overflow-hidden h-screen flex flex-col justify-between" id="meo" ref={meoRef}>
  {/* Video background - Only plays when in view */}
  <LazyVideo
    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
    src="https://res.cloudinary.com/diml8ljwa/video/upload/v1762296791/meo4_frbyem.webm"
  />

  {/* Overlays */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-0" />
  <div className="absolute inset-0 bg-gradient-to-r from-[#0d3bb8]/40 via-transparent to-[#1e5aff]/30 z-0 mix-blend-multiply" />

  {/* Top-centered Meo capsule */}
  <div className="relative z-10 flex justify-center pt-6 sm:pt-30 ">
    <div className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mt-[20%] xl:mt-[6%]">
      <Image src={imgPaymeoLogoWhite2} alt="Meo" width={24} height={24} />
      <span className="text-white font-medium text-base sm:text-lg">Meo</span>
    </div>
  </div>

  {/* Bottom section: responsive grid */}
  <div className="relative z-10 w-full px-6 sm:px-10 md:px-20 pb-10 sm:pb-12 flex flex-col sm:flex-row items-end justify-between gap=8 sm:gap-0">
    {/* Left — Button */}
   <div className="flex justify-center sm:justify-start w-full sm:w-auto">
  <button className=" lg:flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-[#1e5aff] rounded-[15px] h-[46px] xl:h-[76px] px-8 text-xl backdrop-blur-sm bg-transparent group transition-all">
    Coming Soon
  </button>
</div>


    {/* Right — Text block */}
    <div className="max-w-lg text-center sm:text-left mx-auto sm:mx-0">
     <h5 className="text-l sm:text-2xl md:text-4xl font-medium text-white leading-snug sm:leading-tight mb-6">
  UNDERSTANDS YOUR CUSTOMERS
  LIKE YOU DO
</h5>
      <p className="text-white/90 text-[13px] sm:text-base md:text-lg leading-relaxed">
        Meo is your dedicated <span className="text-[#1e5aff]">24/7</span> Sales AI Agent built to understand, engage, and convert intent into sales like you.<br/>
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