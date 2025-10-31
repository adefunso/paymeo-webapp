"use client";
import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { User } from "lucide-react";

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

  // Scroll-based visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

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

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out bg-gradient-to-b from-black/40 via-black/10 to-transparent px-4 sm:px-6 lg:px-10 py-3 ${
        showNav ? "translate-y-0" : "-translate-y-full"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* --- Logo --- */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#1e5aff] rounded-[14px] flex items-center justify-center">
            <Image
              src={imgPaymeoLogoWhite2}
              alt="Paymeo logo"
              className="w-8 h-8"
            />
          </div>
          <span className="hidden sm:inline text-white text-2xl mb-1">
            paymeo
          </span>
        </div>

        {/* --- Centered Tab Switcher --- */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center bg-black/10 backdrop-blur-md rounded-full p-1 shadow-lg border border-white/10"
          role="tablist"
          aria-label="Account type"
        >
          {/* Sliding background highlight */}
          <span
            className="absolute top-1 bottom-1 rounded-full bg-[#1e5aff] shadow-lg transition-all duration-300 ease-in-out"
            style={{
              left: `${highlightStyle.left}px`,
              width: `${highlightStyle.width}px`,
            }}
          />

          {/* Personal Tab */}
          <button
            ref={personalRef}
            role="tab"
            aria-selected={activeTab === "personal"}
            onClick={() => setActiveTab("personal")}
            className={`relative z-10 px-4 sm:px-6 py-2 text-sm sm:text-base rounded-full font-medium transition-all ${
              activeTab === "personal"
                ? "text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            Personal
          </button>

          {/* Business Tab */}
          <button
            ref={businessRef}
            role="tab"
            aria-selected={activeTab === "business"}
            onClick={() => setActiveTab("business")}
            className={`relative z-10 px-4 sm:px-6 py-2 text-sm sm:text-base rounded-full font-medium transition-all ${
              activeTab === "business"
                ? "text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            Business
          </button>
        </div>

        {/* --- Profile Icon --- */}
        <button
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
          aria-label="User profile"
          onClick={() => setIsProfileOpen(true)}
        >
          <User className="w-5 h-5 text-white" />
        </button>
      </div>
    </nav>
  );
}
