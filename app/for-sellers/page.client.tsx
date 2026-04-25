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

// Import components from seller-components
import { 
  SellerFeatures, 
  SellerHowItWorks, 
  SellerTestimonials,
} from "@/components/seller-components";

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


export default function ForSellersPageClient() {
  const [activeTab, setActiveTab] = useState<"personal" | "business">("business");
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
  const videos = {
    personal: "https://res.cloudinary.com/diml8ljwa/video/upload/q_70,f_webm,vc_vp9,w_1200,ac_none,du_8/v1762294237/paymeohero_1_tq8bao",
    business: "https://res.cloudinary.com/diml8ljwa/video/upload/q_70,f_webm,vc_vp9,w_1200,ac_none,du_8/v1762296185/paymeomale_1_qirryn",
  };

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
        <source src={videos.business} type="video/webm" />
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
        {/* Left Column - Hero Card - More compact */}
        <Card className="bg-white border border-[#c4d4ff] rounded-[30px] p-5 sm:p-6 shadow-lg">
          <CardContent className="p-0">
            <div>
              <div className="bg-[#e6dbff] text-violet-500 border border-violet-500 mb-3 text-xs inline-block px-2 py-0.5 rounded-full">
                <span className="font-normal">For</span>
                <span>Businesses 💼</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[50px] leading-tight mb-2 text-black font-extrabold">
                Sell even when <br className="hidden sm:block" />
                you&apos;re busy.
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-black/80 leading-relaxed mb-3 font-small">
                Power your sales 24/7. Get paid instantly, receive tips
                from happy customers, and manage everything securely.
                Connect with customers automatically. All in one place.
              </p>
            </div>

            {/* CTA Buttons - More compact */}
            <div className="flex flex-col sm:flex-row gap-2 mt-1">
              <Button 
                className="bg-[#1e5aff] hover:bg-[#1e5aff]/90 text-white rounded-[20px] h-10 px-4 group text-xs sm:text-sm"
                onClick={() => setIsProfileOpen(true)}
              >
                Get Started for Free
                <ArrowRight className="w-3 h-3 ml-2" />
              </Button>

              <Link href="https://web.paymeo.co">
                <Button className="border border-[#c4d4ff] bg-white text-[#1e5aff] rounded-[20px] h-10 px-4 group transition-colors duration-200 hover:bg-black hover:text-white text-xs sm:text-sm">
                  <span className="flex items-center">
                    Sign in
                    <ArrowRight className="w-3 h-3 ml-2" />
                  </span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Avatars - More compact */}
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
              100+ businesses now use Paymeo to supercharge their sales.
            </p>
          </div>

          {/* Desktop Button - More compact */}
          <Button
            asChild
            variant="outline"
            className="hidden lg:flex border-2 border-white text-white hover:bg-white hover:text-[#1e5aff] rounded-[15px] h-12 px-5 text-base backdrop-blur-sm bg-transparent group transition-all"
          >
            <a href="https://web.paymeo.co">
              Get Started Now
              <ArrowUp className="w-4 h-4 ml-2 rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  </div>

  {/* Scroll Indicator with Pricing Button - MOVED UP */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-3 mb-[50px] lg:mb-[80px]">
    <button
      onClick={() => scrollToSection("how-it-works")}
      className="bg-black/70 hover:bg-black/80 text-white text-xs sm:text-sm px-4 py-2 rounded-[25px] flex items-center gap-2 transition-all group whitespace-nowrap shadow-lg"
    >
      How it works
      <ArrowDown className="w-3 h-3 group-hover:translate-y-1 transition-transform" />
    </button>
    
    {/* Pricing Button */}
    <button
      onClick={() => router.push("/pricing")}
      className="bg-black/70 hover:bg-black/70 text-white text-xs sm:text-sm px-4 py-2 rounded-[25px] flex items-center gap-2 transition-all shadow-md whitespace-nowrap"
    >
      Pricing
    </button>
  </div>
</section>

      {/* MEO SECTION - Original from homepage */}
      <section
        className="relative overflow-hidden min-h-screen flex flex-col justify-between"
        id="meo"
        ref={featuresRef}
      >
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="https://res.cloudinary.com/diml8ljwa/video/upload/v1762296791/meo4_frbyem.webm" type="video/webm" />
        </video>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d3bb8]/40 via-transparent to-[#1e5aff]/30 z-0 mix-blend-multiply" />

        {/* Top-centered Meo capsule */}
        <div className="relative z-10 flex justify-center pt-4 sm:pt-6 md:pt-30">
          <div className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-1 sm:py-2 rounded-full border border-white/10 mt-[10%] sm:mt-[15%] xl:mt-[6%]">
            <Image
              src={imgPaymeoLogoWhite2}
              alt="Meo"
              width={20}
              height={20}
              className="w-4 h-4 sm:w-6 sm:h-6"
            />
            <span className="text-white font-medium text-sm sm:text-base md:text-lg">
              Meo
            </span>
          </div>
        </div>

        {/* Bottom section */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-20 pb-6 sm:pb-8 md:pb-10 lg:pb-12 flex flex-col sm:flex-row items-end justify-between gap-4 sm:gap-6 md:gap-8">
          <div className="flex justify-center sm:justify-start w-full sm:w-auto">
            <button className="flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-[#1e5aff] rounded-[15px] h-10 sm:h-12 md:h-[46px] xl:h-[76px] px-4 sm:px-6 md:px-8 text-sm sm:text-base md:text-xl backdrop-blur-sm bg-transparent group transition-all">
              Coming Soon
            </button>
          </div>

          <div className="max-w-lg text-center sm:text-left mx-auto sm:mx-0">
            <h5 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-4xl font-medium text-white leading-snug sm:leading-tight mb-4 sm:mb-6">
              UNDERSTANDS YOUR CUSTOMERS LIKE YOU DO
            </h5>
            <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed">
              Meo is your dedicated{" "}
              <span className="text-[#1e5aff]">24/7</span> Sales AI Agent
              built to understand, engage, and convert intent into sales for
              you.
              <br className="hidden sm:block" />
              Allowing you make more sales even while you sleep!
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS STEPS SECTION */}
      <section
        ref={howItWorksRef}
        className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-10 bg-white overflow-hidden"
      >
        {/* Decorative circles */}
        <div className="absolute bottom-0 right-0 opacity-25 pointer-events-none">
          <svg width="180" height="180" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M80 0C35.817 0 0 35.817 0 80s35.817 80 80 80 80-35.817 80-80S124.183 0 80 0Zm0 150C41.117 150 10 118.883 10 80S41.117 10 80 10s70 31.117 70 70-31.117 70-70 70Z" fill="#1e5aff" />
          </svg>
        </div>

        {/* Top left circle */}
        <div className="absolute top-0 left-0 opacity-25 pointer-events-none">
          <svg width="180" height="180" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M80 0C35.817 0 0 35.817 0 80s35.817 80 80 80 80-35.817 80-80S124.183 0 80 0Zm0 150C41.117 150 10 118.883 10 80S41.117 10 80 10s70 31.117 70 70-31.117 70-70 70Z" fill="#1e5aff" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How sellers grow
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From setup to sale—everything you need to sell more.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <SellerHowItWorks />
            <div className="mt-10 text-center">
              <Button 
                className="bg-[#1e5aff] hover:bg-[#1e5aff]/90 text-white rounded-[20px] h-12 px-8"
                onClick={() => setIsProfileOpen(true)}
              >
                Start Selling
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything Sellers Need to Grow
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From AI selling to secure payments—all the tools to run your business 24/7.
            </p>
          </div>
          <SellerFeatures />
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
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
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What Sellers Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real stories from real sellers.
            </p>
          </div>
          <SellerTestimonials />
        </div>
      </section>

      {/* MORE FEATURES SECTION - Video background with glass cards */}
      <section
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
          <source src="https://res.cloudinary.com/diml8ljwa/video/upload/q_70,f_webm,vc_vp9,w_1200,ac_none,du_8/v1761862907/paymeohand_rbd6vd" type="video/webm" />
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
            Ready to grow your business?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Join hundreds of sellers already using Paymeo.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-[#1e5aff] hover:bg-gray-100 rounded-full px-8"
            onClick={() => setIsProfileOpen(true)}
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