"use client";
import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { User, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SmartNavProps {
  imgPaymeoLogoWhite2: StaticImageData | string;
  activeTab: "personal" | "business";
  setActiveTab: (tab: "personal" | "business") => void;
  setIsProfileOpen: (open: boolean) => void;
}

export default function SmartNav({
  imgPaymeoLogoWhite2,
  activeTab,
  setActiveTab,
  setIsProfileOpen,
}: SmartNavProps) {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [ticking, setTicking] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Get current pathname
  const pathname = usePathname();

  // Animated highlight for active tab
  const [highlightStyle, setHighlightStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });
  const personalRef = useRef<HTMLButtonElement | null>(null);
  const businessRef = useRef<HTMLButtonElement | null>(null);

  const updateHighlight = () => {
    const activeRef = activeTab === "personal" ? personalRef : businessRef;
    if (activeRef.current) {
      const { offsetLeft, offsetWidth } = activeRef.current;
      setHighlightStyle({ left: offsetLeft, width: offsetWidth });
    }
  };

  useEffect(() => {
    updateHighlight();
    window.addEventListener("resize", updateHighlight);
    return () => window.removeEventListener("resize", updateHighlight);
  }, [activeTab]);

  // Scroll-based visibility and background change
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scrolled state for background
      setIsScrolled(currentScrollY > 50);

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setShowNav(false);
          } else {
            setShowNav(true);
          }
          setLastScrollY(currentScrollY);
          setTicking(false);
        });
        setTicking(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, ticking]);

  // Determine if we're on a special page that needs blue background
  const isHomePage = pathname === "/";
  const isShoppersPage = pathname === "/for-shoppers";
  const isSellersPage = pathname === "/for-sellers";
  
  // Blue background should show on homepage (when not scrolled) and on shoppers/sellers pages when scrolled
  const shouldShowBlueBg = 
    (isHomePage && isScrolled) || // Homepage when scrolled
    (!isHomePage && !isShoppersPage && !isSellersPage) || // Any other page (not home, not shoppers, not sellers)
    (isScrolled && (isShoppersPage || isSellersPage)); // Shoppers/sellers pages when scrolled

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-6 lg:px-12 py-3 ${
        showNav ? "translate-y-0" : "-translate-y-full"
      } ${
        shouldShowBlueBg
          ? "bg-[#1e5aff] shadow-lg" 
          : "bg-gradient-to-b from-black/40 via-black/10 to-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-white/20 rounded-[15px] flex items-center justify-center">
            <Image src={imgPaymeoLogoWhite2} alt="Paymeo" className="w-8 h-8" />
          </div>
          <span className="text-white font-extrabold text-[30px] mb-2 hidden sm:block">paymeo</span>
          <span className="text-white font-extrabold text-[30px] mb-2 sm:hidden">paymeo</span>
        </Link>

        {/* Desktop Menu Button - Centered */}
        <div className="hidden md:flex justify-center flex-1 ml-37">
          <button
            onClick={() => setIsDesktopMenuOpen(!isDesktopMenuOpen)}
            className={`flex items-center gap-1 backdrop-blur-md border border-white/20 text-white px-4 py-2.5 rounded-full transition-colors ${
              shouldShowBlueBg 
                ? "bg-white/10 hover:bg-white/20" 
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <span className="text-sm font-medium">Menu</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isDesktopMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Desktop Action Links */}
          <a
            href="/seller"
            className={`text-sm hidden md:block mr-3 transition-colors ${
              shouldShowBlueBg ? "text-white/90 hover:text-white" : "text-white/90 hover:text-white"
            }`}
          >
            Become a Seller
          </a>

          <a
            href="https://my.paymeo.co"
            className={`text-sm px-4.5 py-2.5 rounded-full font-semibold hidden md:block transition-colors ${
              shouldShowBlueBg 
                ? "bg-white text-[#1e5aff] hover:bg-gray-100" 
                : "bg-white text-[#1e5aff] hover:bg-gray-100"
            }`}
          >
            Log in
          </a>

          <a
            href="https://my.paymeo.co"
            className={`border border-white/20 text-sm px-4.5 py-2.5 rounded-full hidden md:block backdrop-blur-md transition-colors ${
              shouldShowBlueBg 
                ? "bg-white/10 text-white hover:bg-white/20" 
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Sign up
          </a>

          {/* Mobile Menu Button */}
          <div className="relative md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`flex items-center gap-1 backdrop-blur-md border border-white/20 text-white px-3 py-2 rounded-full transition-colors ${
                shouldShowBlueBg 
                  ? "bg-white/10 hover:bg-white/20" 
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              <span className="text-sm font-medium">Menu</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Mobile Dropdown */}
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
                    <div className="py-2">
                      <a
                        href="/for-shoppers"
                        className="block px-4 py-3 text-sm text-gray-800 hover:bg-[#1e5aff] hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        For Shoppers
                      </a>
                      <a
                        href="/for-sellers"
                        className="block px-4 py-3 text-sm text-gray-800 hover:bg-[#1e5aff] hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        For Sellers
                      </a>
                        <a
                        href="/pricing"
                        className="block px-4 py-3 text-sm text-gray-800 hover:bg-[#1e5aff] hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Pricing
                      </a>
                       <a
                        href="/about"
                        className="block px-4 py-3 text-sm text-gray-800 hover:bg-[#1e5aff] hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        About
                      </a>
                      <a
                        href="/marketplace"
                        className="block px-4 py-3 text-sm text-gray-800 hover:bg-[#1e5aff] hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Marketplace
                      </a>
                      
                     
                       <a
                        href="/faq"
                        className="block px-4 py-3 text-sm text-gray-800 hover:bg-[#1e5aff] hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        FAQ
                      </a>
                      <div className="border-t border-gray-200 my-2" />
                      <a
                        href="/seller"
                        className="block px-4 py-3 text-sm text-gray-800 hover:bg-[#1e5aff] hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Become a Seller
                      </a>
                      <a
                        href="https://my.paymeo.co"
                        className="block px-4 py-3 text-sm text-gray-800 hover:bg-[#1e5aff] hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Log in
                      </a>
                      <a
                        href="https://my.paymeo.co"
                        className="block px-4 py-3 text-sm bg-[#1e5aff] text-white font-medium hover:bg-[#0d3bb8] mx-3 my-2 rounded-full text-center transition-colors"
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
      </div>

      {/* Desktop Dropdown - Stripe-style Slide Down */}
      <AnimatePresence>
        {isDesktopMenuOpen && (
          <>
            {/* Backdrop with fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40"
              onClick={() => setIsDesktopMenuOpen(false)}
            />

            {/* Mega-menu with slide down */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.3, 
                ease: [0.4, 0, 0.2, 1] // Custom easing for Stripe-like feel
              }}
              className="fixed left-0 right-0 top-[80px] w-full bg-white shadow-2xl z-50 border-t border-gray-200 max-h-[calc(100vh-80px)] overflow-y-auto"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Responsive Grid - 1 col on mobile, 2 on tablet, 4 on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Column 1 - For Users */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                      For Users
                    </h3>
                    <div className="space-y-3">
                      <a
                        href="/for-shoppers"
                        className="block text-base text-gray-800 hover:text-[#1e5aff] transition-colors font-medium"
                        onClick={() => setIsDesktopMenuOpen(false)}
                      >
                        For Shoppers
                      </a>
                      <a
                        href="/for-sellers"
                        className="block text-base text-gray-800 hover:text-[#1e5aff] transition-colors font-medium"
                        onClick={() => setIsDesktopMenuOpen(false)}
                      >
                        For Sellers
                      </a>
                      <a
                        href="/pricing"
                        className="block text-base text-gray-800 hover:text-[#1e5aff] transition-colors font-medium"
                        onClick={() => setIsDesktopMenuOpen(false)}
                      >
                        Pricing
                      </a>
                    </div>
                  </motion.div>

                  {/* Column 2 - Company */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                      Company
                    </h3>
                    <div className="space-y-3">
                      <a
                        href="/about"
                        className="block text-base text-gray-800 hover:text-[#1e5aff] transition-colors"
                        onClick={() => setIsDesktopMenuOpen(false)}
                      >
                        About Us
                      </a>
                      <a
                        href=""
                        className="block text-base text-gray-800 hover:text-[#1e5aff] transition-colors"
                        onClick={() => setIsDesktopMenuOpen(false)}
                      >
                        Careers
                      </a>
                      <a
                        href=""
                        className="block text-base text-gray-800 hover:text-[#1e5aff] transition-colors"
                        onClick={() => setIsDesktopMenuOpen(false)}
                      >
                        Press
                      </a>
                    </div>
                  </motion.div>

                  {/* Column 3 - Marketplace */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                      Platform
                    </h3>
                    <div className="space-y-3">
                      <a
                        href="/marketplace"
                        className="block text-base text-gray-800 hover:text-[#1e5aff] transition-colors"
                        onClick={() => setIsDesktopMenuOpen(false)}
                      >
                        Browse Marketplace
                      </a>
                      <a
                        href="/faq"
                        className="block text-base text-gray-800 hover:text-[#1e5aff] transition-colors"
                        onClick={() => setIsDesktopMenuOpen(false)}
                      >
                        FAQ
                      </a>
                      <a
                        href=""
                        className="block text-base text-gray-800 hover:text-[#1e5aff] transition-colors"
                        onClick={() => setIsDesktopMenuOpen(false)}
                      >
                        Support
                      </a>
                    </div>
                  </motion.div>

                  {/* Column 4 - Community */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                      Community
                    </h3>
                    <div className="space-y-3">
                      <a
                        href=""
                        className="block text-base text-gray-800 hover:text-[#1e5aff] transition-colors"
                        onClick={() => setIsDesktopMenuOpen(false)}
                      >
                        Scouts Program
                      </a>
                      <a
                        href=""
                        className="block text-base text-gray-800 hover:text-[#1e5aff] transition-colors"
                        onClick={() => setIsDesktopMenuOpen(false)}
                      >
                        Bounties
                      </a>
                      <a
                        href=""
                        className="block text-base text-gray-800 hover:text-[#1e5aff] transition-colors"
                        onClick={() => setIsDesktopMenuOpen(false)}
                      >
                        Community Guidelines
                      </a>
                    </div>
                  </motion.div>
                </div>

                {/* Bottom CTA with staggered animation */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <p className="text-sm text-gray-600 text-center sm:text-left">
                    Join thousands of sellers and shoppers already using Paymeo
                  </p>
                  <a
                    href="https://web.paymeo.co"
                    className="bg-[#1e5aff] text-white text-sm px-6 py-3 rounded-full font-medium hover:bg-[#0d3bb8] transition-colors whitespace-nowrap"
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
  );
}