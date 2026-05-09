"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence } from "framer-motion";

interface LandingGateProps {
  imgPaymeoLogoWhite2: StaticImport;
}

export default function LandingGate({
  imgPaymeoLogoWhite2,
}: LandingGateProps) {
  const [selected, setSelected] = useState<"personal" | "business">("personal");
  const [viewportHeight, setViewportHeight] = useState("100vh");
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Rotating text animation state
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  // Swipeable cards state
  const [mobileCards, setMobileCards] = useState([0, 1, 2]); // 0=back-left, 1=center, 2=back-right
  
  const rotatingTexts = [
    { text: "Post what you need, and let sellers come to you.", highlight: ["Post what you need", "sellers come to you."] },
    { text: "Turn product requests into sales — local markets, real connections.", highlight: ["Turn product requests into sales", "local markets", "connections."] },
    { text: "Shop smartly, tip people and connect over the things you love.", highlight: ["smartly", "connect", "love."] },
    { text: "Shoppers who want what you're selling find you — instantly.", highlight: ["Shoppers who want", "find you", "instantly."] },
    { text: "Create your AI-powered digital storefront in seconds.", highlight: ["AI-powered", "in seconds."] },
    { text: "Your 24/7 AI Sales Agent handles negotiations while you sleep.", highlight: ["24/7 AI Sales Agent", "while you sleep."] },
    { text: "Get paid helping people find what they are looking for, form social connections.", highlight: ["Get paid helping people", "looking for", "social connections."] },
  ];

  // Handle swipe gesture
  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      // Move center card to back, bring next card to front
      setMobileCards(prev => {
        const newOrder = [...prev];
        const lastCard = newOrder.pop()!;
        newOrder.unshift(lastCard);
        return newOrder;
      });
    } else if (direction === "left") {
      // Move center card to front, send front card to back
      setMobileCards(prev => {
        const newOrder = [...prev];
        const firstCard = newOrder.shift()!;
        newOrder.push(firstCard);
        return newOrder;
      });
    }
  };

  useEffect(() => {
    const setVH = () => {
      setViewportHeight(`${window.innerHeight}px`);
    };
    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);

  // Rotating text interval - slower (5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [rotatingTexts.length]);

  // Helper function to render text with bounty-style yellow highlights
  const renderHighlightedText = (text: string, highlights: string[]) => {
    if (!highlights.length) return text;
    
    let result = text;
    highlights.forEach(highlight => {
      const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapedHighlight})`, 'gi');
      result = result.replace(regex, `<span class="inline-block px-1 sm:px-1.5 py-0.5 mx-0.5 rounded-md bg-amber-300 border border-amber-400 text-amber-950 font-extrabold shadow-sm">$1</span>`);
    });
    
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  // Card images array for easy rotation
  const cardImages = [
    {
      type: "image",
      src: "https://res.cloudinary.com/diml8ljwa/image/upload/w_800,q_auto/v1762341472/paymeoswipe_1_wq0dgo.webp",
      alt: "Paymeo swipe"
    },
    {
      type: "video",
      src: "https://res.cloudinary.com/diml8ljwa/video/upload/q_70,f_webm,vc_vp9,w_1200,ac_none,du_8/v1762294237/paymeohero_1_tq8bao",
      alt: "Paymeo app"
    },
    {
      type: "image",
      src: "https://res.cloudinary.com/diml8ljwa/image/upload/w_800,q_auto/v1777020892/IMG_20260424_094658.jpg_nwdcql.jpg",
      alt: "Paymeo app"
    }
  ];

  return (
    <motion.section
      className="relative w-full overflow-hidden flex flex-col"
      style={{
        background: "#1e5aff",
        height: viewportHeight,
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Noise texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle highlight overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 pointer-events-none" />

      {/* SVG corner decoration - Responsive opacity */}
      <div className="absolute bottom-0 right-0 opacity-10 sm:opacity-10 pointer-events-none z-0 translate-x-1/4 translate-y-1/4">
        <svg
          width="450"
          height="450"
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M80 0C35.817 0 0 35.817 0 80s35.817 80 80 80 80-35.817 80-80S124.183 0 80 0Zm0 150C41.117 150 10 118.883 10 80S41.117 10 80 10s70 31.117 70 70-31.117 70-70 70Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Background Image - Original styling with responsive opacity */}
      <div className="absolute bottom-0 right-0 z-0 pointer-events-none opacity-20 sm:opacity-100">
        <img
          src="https://res.cloudinary.com/diml8ljwa/image/upload/v1776888046/hero-image-fashion_vfbebn.png"
          alt="Fashion Smartphone"
          className="w-auto h-auto max-w-none"
          style={{
            transform: "translateX(30%) translateY(30%)",
            maxWidth: "none",
            width: "min(500px, 90vw)",
            height: "auto"
          }}
        />
      </div>

      {/* NAV - Responsive padding and sizing */}
      <nav className="relative z-50 flex items-center justify-between px-4 sm:px-6 lg:px-12 py-3 sm:py-4 flex-shrink-0">
        {/* Logo - Left side with fixed width to balance the layout - INCREASED SIZE ON MOBILE */}
        <div className="flex items-center gap-2 sm:gap-2 min-w-[100px] sm:min-w-[120px]">
          <div className="w-9 h-9 sm:w-9 sm:h-9 bg-white/20 rounded-[15px] sm:rounded-[15px] flex items-center justify-center translate-y-0.5">
            <Image src={imgPaymeoLogoWhite2} alt="Paymeo" className="w-8 h-8 sm:w-8 sm:h-8" />
          </div>
          <span className="text-white font-extrabold text-3xl sm:text-[30px] mb-0 sm:mb-0">paymeo</span>
        </div>

        {/* Desktop Menu Button - Perfectly Centered using absolute positioning */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => setIsDesktopMenuOpen(!isDesktopMenuOpen)}
            className="flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 sm:px-4 py-2 rounded-full hover:bg-white/20 transition-colors whitespace-nowrap"
          >
            <span className="text-xs sm:text-sm font-medium">Menu</span>
            <ChevronDown
              className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${
                isDesktopMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Right side buttons - Fixed width to balance the layout */}
        <div className="flex items-center gap-1 sm:gap-2 min-w-[100px] sm:min-w-[120px] justify-end">
          <a
            href="/seller"
            className="text-white/90 text-xs sm:text-sm hidden md:block mr-1 sm:mr-3 whitespace-nowrap"
          >
            Become a Seller
          </a>

          <a
            href="https://my.paymeo.co"
            className="bg-white text-[#1e5aff] text-xs sm:text-sm px-3 sm:px-4.5 py-1.5 sm:py-2.5 rounded-full font-semibold hidden md:block whitespace-nowrap"
          >
            Log in
          </a>

          <a
            href="https://my.paymeo.co"
            className="border border-white/20 text-white text-xs sm:text-sm px-3 sm:px-4.5 py-1.5 sm:py-2.5 rounded-full hidden md:block bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors whitespace-nowrap"
          >
            Sign up
          </a>

          {/* Mobile Menu Button - INCREASED SIZE ON MOBILE */}
          <div className="relative md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3.5 py-2 rounded-full"
            >
              <span className="text-sm font-medium">Menu</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 z-50 overflow-hidden"
                  >
                    <div className="py-2 max-h-[80vh] overflow-y-auto">
                      <a
                        href="/marketplace"
                        className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-[#1e5aff] hover:text-white transition-colors font-bold"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Marketplace
                      </a>
                      <a
                        href="/scan"
                        className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-[#1e5aff] hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Scan QR Code
                      </a>
                      <a
                        href="/for-shoppers"
                        className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-[#1e5aff] hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        For Shoppers
                      </a>
                      <a
                        href="/for-sellers"
                        className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-[#1e5aff] hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        For Sellers
                      </a>
                      <a
                        href="/pricing"
                        className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-[#1e5aff] hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Pricing
                      </a>
                      <a
                        href="/about"
                        className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-[#1e5aff] hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        About
                      </a>
                      <a
                        href="/faq"
                        className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-[#1e5aff] hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        FAQ
                      </a>
                      <div className="border-t border-gray-200 my-1" />
                      <a
                        href="/seller"
                        className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-[#1e5aff] hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Become a Seller
                      </a>
                      <a
                        href="https://my.paymeo.co"
                        className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-[#1e5aff] hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Log in
                      </a>
                      <a
                        href="https://my.paymeo.co"
                        className="block px-4 py-2.5 text-sm bg-[#1e5aff] text-white font-medium hover:bg-[#0d3bb8] mx-3 my-2 rounded-full text-center transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign up
                      </a>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop Dropdown Menu */}
        <AnimatePresence>
          {isDesktopMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 bg-black/40"
                onClick={() => setIsDesktopMenuOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="fixed left-0 right-0 top-[70px] sm:top-[80px] w-full bg-white shadow-2xl z-50 border-t border-gray-200 max-h-[calc(100vh-80px)] overflow-y-auto"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 sm:mb-4">
                        For Users
                      </h3>
                      <div className="space-y-2 sm:space-y-3">
                        <a
                          href="/for-shoppers"
                          className="block text-sm sm:text-base text-gray-800 hover:text-[#1e5aff] transition-colors font-medium"
                          onClick={() => setIsDesktopMenuOpen(false)}
                        >
                          For Shoppers
                        </a>
                        <a
                          href="/for-sellers"
                          className="block text-sm sm:text-base text-gray-800 hover:text-[#1e5aff] transition-colors font-medium"
                          onClick={() => setIsDesktopMenuOpen(false)}
                        >
                          For Sellers
                        </a>
                        <a
                          href="/pricing"
                          className="block text-sm sm:text-base text-gray-800 hover:text-[#1e5aff] transition-colors font-medium"
                          onClick={() => setIsDesktopMenuOpen(false)}
                        >
                          Pricing
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 sm:mb-4">
                        Company
                      </h3>
                      <div className="space-y-2 sm:space-y-3">
                        <a
                          href="/about"
                          className="block text-sm sm:text-base text-gray-800 hover:text-[#1e5aff] transition-colors"
                          onClick={() => setIsDesktopMenuOpen(false)}
                        >
                          About Us
                        </a>
                        <a
                          href="#"
                          className="block text-sm sm:text-base text-gray-800 hover:text-[#1e5aff] transition-colors"
                          onClick={() => setIsDesktopMenuOpen(false)}
                        >
                          Careers
                        </a>
                        <a
                          href="#"
                          className="block text-sm sm:text-base text-gray-800 hover:text-[#1e5aff] transition-colors"
                          onClick={() => setIsDesktopMenuOpen(false)}
                        >
                          Blog
                        </a>
                        <a
                          href="#"
                          className="block text-sm sm:text-base text-gray-800 hover:text-[#1e5aff] transition-colors"
                          onClick={() => setIsDesktopMenuOpen(false)}
                        >
                          Press
                        </a>
                        <div className="text-xs text-gray-400 pt-1">
                          Legal entity: Meo Technologies Limited
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 sm:mb-4">
                        Platform
                      </h3>
                      <div className="space-y-2 sm:space-y-3">
                        <a
                          href="/marketplace"
                          className="block text-sm sm:text-base text-gray-800 hover:text-[#1e5aff] transition-colors"
                          onClick={() => setIsDesktopMenuOpen(false)}
                        >
                          Browse Marketplace
                        </a>
                        <a
                          href="/scan"
                          className="block text-sm sm:text-base text-gray-800 hover:text-[#1e5aff] transition-colors"
                          onClick={() => setIsDesktopMenuOpen(false)}
                        >
                          Scan QR Code
                        </a>
                        <a
                          href="/faq"
                          className="block text-sm sm:text-base text-gray-800 hover:text-[#1e5aff] transition-colors"
                          onClick={() => setIsDesktopMenuOpen(false)}
                        >
                          FAQ
                        </a>
                        <a
                          href="#"
                          className="block text-sm sm:text-base text-gray-800 hover:text-[#1e5aff] transition-colors"
                          onClick={() => setIsDesktopMenuOpen(false)}
                        >
                          Support
                        </a>
                        <a
                          href="/terms"
                          className="block text-sm sm:text-base text-gray-800 hover:text-[#1e5aff] transition-colors"
                          onClick={() => setIsDesktopMenuOpen(false)}
                        >
                          Terms of Service
                        </a>
                        <a
                          href="/privacy"
                          className="block text-sm sm:text-base text-gray-800 hover:text-[#1e5aff] transition-colors"
                          onClick={() => setIsDesktopMenuOpen(false)}
                        >
                          Privacy Policy
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 sm:mb-4">
                        Community
                      </h3>
                      <div className="space-y-2 sm:space-y-3">
                        <a
                          href="#"
                          className="block text-sm sm:text-base text-gray-800 hover:text-[#1e5aff] transition-colors"
                          onClick={() => setIsDesktopMenuOpen(false)}
                        >
                          Scouts Program
                        </a>
                        <a
                          href="#"
                          className="block text-sm sm:text-base text-gray-800 hover:text-[#1e5aff] transition-colors"
                          onClick={() => setIsDesktopMenuOpen(false)}
                        >
                          Bounties
                        </a>
                        <a
                          href="#"
                          className="block text-sm sm:text-base text-gray-800 hover:text-[#1e5aff] transition-colors"
                          onClick={() => setIsDesktopMenuOpen(false)}
                        >
                          Community Guidelines
                        </a>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4"
                  >
                    <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                      Join thousands of sellers and shoppers already using Paymeo
                    </p>
                    <a
                      href="https://web.paymeo.co"
                      className="bg-[#1e5aff] text-white text-xs sm:text-sm px-5 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-[#0d3bb8] transition-colors whitespace-nowrap"
                      onClick={() => setIsDesktopMenuOpen(false)}
                    >
                      Get Started
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION - Responsive */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 pt-4 sm:pt-8 lg:pt-0 min-h-0 relative z-10">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-0 items-center">

          {/* MOBILE CARDS (hidden on lg+) - SWIPEABLE CARDS */}
<div className="relative flex justify-center items-center mb-2 sm:mb-8 mt-0 sm:mt-8 lg:hidden">

  {/* Card 1 - Back Left (EXACT original position) */}
  <motion.div
    className="absolute bottom-0 mb-4 sm:mb-6 mr-10 sm:mr-14"
    animate={{ 
      x: mobileCards[0] === 1 ? "-55%" : "-55%",
      rotate: mobileCards[0] === 1 ? -10 : -10,
      scale: mobileCards[0] === 1 ? 1 : 0.85,
    }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    onClick={() => handleSwipe("right")}
    style={{ cursor: "pointer" }}
  >
    <div
      className="overflow-hidden rounded-2xl border-4 border-white/20 shadow-xl"
      style={{ height: "clamp(170px, 30vw, 220px)", aspectRatio: "9/19" }}
    >
      {mobileCards[0] === 1 && cardImages[mobileCards[0]].type === "video" ? (
        <video className="w-full h-full object-cover" muted loop playsInline disablePictureInPicture>
          <source src={cardImages[mobileCards[0]].src} type="video/webm" />
        </video>
      ) : (
        <img
          src={cardImages[mobileCards[0]].src}
          className="w-full h-full object-cover"
          alt={cardImages[mobileCards[0]].alt}
        />
      )}
    </div>
  </motion.div>

  {/* Card 2 - Center (Main Card) - EXACT original position */}
  <motion.div
    className="relative z-20"
    drag="x"
    dragConstraints={{ left: 0, right: 0 }}
    dragElastic={0.7}
    onDragEnd={(e, info) => {
      if (info.offset.x > 100) {
        handleSwipe("right");
      } else if (info.offset.x < -100) {
        handleSwipe("left");
      }
    }}
    whileDrag={{ scale: 0.95 }}
  >
    <div
      className="overflow-hidden rounded-3xl sm:rounded-4xl border-4 border-white/30 shadow-2xl"
      style={{ height: "clamp(240px, 45vw, 300px)", aspectRatio: "9/19" }}
    >
      {cardImages[mobileCards[1]].type === "video" ? (
        <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
          <source src={cardImages[mobileCards[1]].src} type="video/webm" />
        </video>
      ) : (
        <img
          src={cardImages[mobileCards[1]].src}
          className="w-full h-full object-cover"
          alt={cardImages[mobileCards[1]].alt}
        />
      )}
    </div>
  </motion.div>

  {/* Card 3 - Back Right (EXACT original position) */}
  <motion.div
    className="absolute bottom-0 mb-4 sm:mb-6 ml-10 sm:ml-14"
    animate={{ 
      x: mobileCards[2] === 1 ? "55%" : "55%",
      rotate: mobileCards[2] === 1 ? 10 : 10,
      scale: mobileCards[2] === 1 ? 1 : 0.85,
    }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    onClick={() => handleSwipe("left")}
    style={{ cursor: "pointer" }}
  >
    <div
      className="overflow-hidden rounded-2xl border-4 border-white/20 shadow-xl"
      style={{ height: "clamp(170px, 30vw, 220px)", aspectRatio: "9/19" }}
    >
      {mobileCards[2] === 1 && cardImages[mobileCards[2]].type === "video" ? (
        <video className="w-full h-full object-cover" muted loop playsInline disablePictureInPicture>
          <source src={cardImages[mobileCards[2]].src} type="video/webm" />
        </video>
      ) : (
        <img
          src={cardImages[mobileCards[2]].src}
          className="w-full h-full object-cover"
          alt={cardImages[mobileCards[2]].alt}
        />
      )}
    </div>
  </motion.div>

</div>

          {/* DESKTOP CARDS (hidden below lg) */}
          <div className="relative hidden lg:flex justify-center items-center">
            <motion.div
              className="absolute bottom-0 mb-8 sm:mb-12 mr-20 sm:mr-24"
              initial={{ x: -200, rotate: -25, opacity: 0 }}
              animate={{ x: "-55%", rotate: -10, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div
                className="overflow-hidden rounded-2xl border-4 border-white/20 shadow-xl"
                style={{ height: "clamp(280px, 30vh, 380px)", aspectRatio: "9/19" }}
              >
                <img
                  src="https://res.cloudinary.com/diml8ljwa/image/upload/w_800,q_auto/v1762341472/paymeoswipe_1_wq0dgo.webp"
                  className="w-full h-full object-cover"
                  alt="Paymeo swipe"
                />
              </div>
            </motion.div>

            <motion.div
              className="relative z-20"
              initial={{ y: 140, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div
                className="overflow-hidden rounded-4xl border-4 border-white/30 shadow-2xl"
                style={{ height: "clamp(400px, 50vh, 585px)", aspectRatio: "9/19" }}
              >
                <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
                  <source
                    src="https://res.cloudinary.com/diml8ljwa/video/upload/q_70,f_webm,vc_vp9,w_1200,ac_none,du_8/v1762294237/paymeohero_1_tq8bao"
                    type="video/webm"
                  />
                </video>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-0 mb-8 sm:mb-12 ml-20 sm:ml-24"
              initial={{ x: 200, rotate: 25, opacity: 0 }}
              animate={{ x: "55%", rotate: 10, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div
                className="overflow-hidden rounded-2xl border-4 border-white/20 shadow-xl"
                style={{ height: "clamp(280px, 30vh, 380px)", aspectRatio: "9/19" }}
              >
                <img
                  src="https://res.cloudinary.com/diml8ljwa/image/upload/w_800,q_auto/v1777020892/IMG_20260424_094658.jpg_nwdcql.jpg"
                  className="w-full h-full object-cover"
                  alt="Paymeo app"
                />
              </div>
            </motion.div>
          </div>

          {/* TEXT CONTENT - Responsive typography */}
          <motion.div
            className="text-center lg:text-left max-w-lg mx-auto lg:mx-0 lg:-ml-10 xl:-mr-20 px-2 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-2 sm:mb-3">
              Find What You Need. Get Paid For What You Deliver.
            </h1>
            
            <div className="min-h-[70px] sm:min-h-[80px] md:min-h-[70px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTextIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="text-white text-xs sm:text-sm md:text-[13px] font-semibold leading-relaxed sm:leading-snug"
                >
                  {renderHighlightedText(rotatingTexts[currentTextIndex].text, rotatingTexts[currentTextIndex].highlight)}
                </motion.p>
              </AnimatePresence>
            </div>
            
            {/* QR Code Section - Responsive */}
            <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-4 mt-2 sm:mt-4">
              <div className="relative inline-block">
                <div className="bg-white p-1.5 sm:p-2 rounded-lg hidden sm:block shadow-md relative z-10">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://paymeo.co"
                    className="w-[60px] sm:w-[80px] h-[60px] sm:h-[80px]"
                    alt="QR code to download app"
                  />
                </div>
                
                <div className="hidden sm:block absolute left-full top-1/2 -translate-y-1/2 -ml-2 sm:-ml-3 z-0">
                  <div className="bg-white text-black text-xs sm:text-sm font-semibold pl-2 sm:pl-3 pr-2 sm:pr-3 py-0.5 sm:py-1 rounded-r-full shadow-md whitespace-nowrap flex items-center gap-1 sm:gap-2">
                    <span>Scan to download app</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* BOTTOM CTA SECTION - Responsive - INCREASED SIZE ON MOBILE */}
      <div className="relative z-10 pb-2 sm:pb-3 flex flex-col items-center gap-0.5 sm:gap-1 flex-shrink-0">
        <p className="text-white/85 text-[11px] sm:text-[11px] font-semibold tracking-widest uppercase">
          I want to
        </p>
        <div className="relative flex items-center gap-3 sm:gap-4 p-1 sm:p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
          <a href="https://my.paymeo.co">
            <button
              className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-sm font-bold rounded-full transition-colors cursor-pointer text-white hover:bg-white/10`}
            >
              Shop
            </button>
          </a>
          <div className="w-px h-5 sm:h-6 bg-white/30"></div>
          <a href="https://web.paymeo.co">
            <button
              className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-sm font-bold rounded-full transition-colors cursor-pointer text-white hover:bg-white/10`}
            >
              Sell
            </button>
          </a>
        </div>
        <p className="text-white/85 text-[11px] sm:text-[11px] font-semibold">
          You can switch anytime
        </p>
      </div>

      {/* FOOTER WITH LEGAL NAME - Responsive */}
      <div className="relative z-10 mt-1 sm:mt-2 pt-2 sm:pt-3 border-t border-white/10 flex-shrink-0">
        <div className="px-4 sm:px-6 lg:px-12 py-1 sm:py-2">
          <p className="text-white/40 text-[8px] sm:text-[10px] lg:text-[11px] text-center leading-tight">
            © {new Date().getFullYear()} Paymeo. A service provided by{" "}
            <span className="text-white/60 font-medium">Meo Technologies Limited</span>.
            All rights reserved.
          </p>
        </div>
      </div>

    </motion.section>
  );
}