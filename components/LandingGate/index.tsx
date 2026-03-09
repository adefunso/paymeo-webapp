"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useState, useEffect } from "react";

interface LandingGateProps {
  onSelect: (tab: "personal" | "business") => void;
  imgPaymeoLogoWhite2: StaticImport;
}

export default function LandingGate({
  onSelect,
  imgPaymeoLogoWhite2,
}: LandingGateProps) {
  const [selected, setSelected] = useState<"personal" | "business">("personal");
  const [viewportHeight, setViewportHeight] = useState("100vh");

  useEffect(() => {
    // Fix for mobile viewport height issues
    const setVH = () => {
      setViewportHeight(`${window.innerHeight}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    
    return () => window.removeEventListener('resize', setVH);
  }, []);

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
      {/* background noise */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* SVG in bottom right corner */}
           {/* SVG in bottom right corner - partially off-screen */}
      <div className="absolute bottom-0 right-0 opacity-25 pointer-events-none z-0 translate-x-1/4 translate-y-1/4">
        <svg
          width="200"
          height="200"
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

      {/* NAV - Increased logo and button sizes */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-white/20 rounded-[15px] flex items-center justify-center">
            <Image src={imgPaymeoLogoWhite2} alt="Paymeo" className="w-8 h-8" />
          </div>
          <span className="text-white font-extrabold text-[30px] mb-2">paymeo</span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://web.paymeo.co"
            className="text-white/90 text-sm hidden sm:block mr-3"
          >
            Become a Seller
          </a>

          <a
            href="https://web.paymeo.co"
            className="bg-white text-[#1e5aff] text-sm px-4.5 py-2.5 rounded-full font-semibold"
          >
            Log in
          </a>

          <a
            href="https://web.paymeo.co"
            className="border border-white/20 text-white text-sm px-4.5 py-2.5 rounded-full hidden sm:block bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
          >
            Sign up
          </a>
        </div>
      </nav>

      {/* HERO - Adjusted for proper spacing */}
      <div className="flex-1 flex items-start lg:items-center justify-center px-6 lg:px-12 pt-2 lg:pt-0 min-h-0 relative z-10">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-2 items-center mt-[-60px] lg:mt-10 xl:mt-10">

          {/* PHONES - much smaller on mobile */}
          <div className="relative flex justify-center items-center scale-[0.45] sm:scale-100 -mb-8 sm:mb-0 mt-[-40px] lg:mt-0">

            {/* LEFT CARD */}
            <motion.div
              className="absolute bottom-0 mb-[50px] mr-[150px]"
              initial={{ x: -200, rotate: -25, opacity: 0 }}
              animate={{ x: "-55%", rotate: -10, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div
                className="overflow-hidden rounded-xl border-4 border-white/20 shadow-xl"
                style={{
                  height: "clamp(210px,40vh,480px)",
                  aspectRatio: "9/19",
                }}
              >
                <img
                  src="https://res.cloudinary.com/diml8ljwa/image/upload/v1762341472/paymeoswipe_1_wq0dgo.webp"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* CENTER CARD — VIDEO */}
            <motion.div
              className="relative z-20"
              initial={{ y: 140, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div
                className="overflow-hidden rounded-2xl border-4 border-white/30 shadow-2xl"
                style={{
                  height: "clamp(280px,70vh,650px)",
                  aspectRatio: "9/19",
                }}
              >
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source
                    src="https://res.cloudinary.com/diml8ljwa/video/upload/q_70,f_webm,vc_vp9,w_1200,ac_none,du_8/v1762294237/paymeohero_1_tq8bao"
                    type="video/webm"
                  />
                </video>
              </div>
            </motion.div>

            {/* RIGHT CARD */}
            <motion.div
              className="absolute bottom-0 mb-[50px] ml-[150px]"
              initial={{ x: 200, rotate: 25, opacity: 0 }}
              animate={{ x: "55%", rotate: 10, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div
                className="overflow-hidden rounded-xl border-4 border-white/20 shadow-xl"
                style={{
                  height: "clamp(210px,40vh,480px)",
                  aspectRatio: "9/19",
                }}
              >
                <img
                  src="https://res.cloudinary.com/diml8ljwa/image/upload/v1761906469/TransactionChats_ajel9w.svg"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

          </div>

          {/* TEXT - centered on mobile and brought closer */}
          <motion.div
            className="text-center lg:text-left max-w-lg mx-auto lg:mx-0 -mt-12 sm:mt-0 mt-[-90px] lg:-mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight mb-3">
              The AI-Powered Local Marketplace
            </h1>

            <p className="text-white/80 text-sm lg:text-base mb-6">
              Shop, sell 24/7 with AI, and get paid.
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-4">

              {/* Hidden on mobile */}
              <div className="bg-white p-2 rounded-lg hidden sm:block">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://paymeo.co"
                  className="w-[80px] h-[80px]"
                />
              </div>

              <button className="bg-white text-[#1e5aff] text-sm px-4 py-2 rounded-full font-semibold">
                Scan QR Code
              </button>

            </div>
          </motion.div>

        </div>
      </div>

      {/* BOTTOM */}
      <div className="relative z-10 pb-3 flex flex-col items-center gap-1 flex-shrink-0">
        <p className="text-white/85 text-[11px] tracking-widest uppercase">
          I want to
        </p>

        <div className="relative flex items-center gap-4 p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
          {/* SHOP */}
          <button
            onClick={() => {
              setSelected("personal");
              onSelect("personal");
            }}
            className={`flex items-center gap-2 px-5 py-2 text-sm font-bold rounded-full transition-colors cursor-pointer ${
              selected === "personal"
                ? "text-white hover:bg-white/10"
                : "text-white hover:bg-white/10"
            }`}
          >
            Shop
          </button>

          {/* Separator */}
          <div className="w-px h-6 bg-white/30"></div>

          {/* SELL */}
          <button
            onClick={() => {
              setSelected("business");
              onSelect("business");
            }}
            className={`flex items-center gap-2 px-5 py-2 text-sm font-bold rounded-full transition-colors cursor-pointer ${
              selected === "business"
                ? "text-white hover:bg-white/10"
                : "text-white hover:bg-white/10"
            }`}
          >
            Sell
          </button>
        </div>

        <p className="text-white/85 text-[11px]">
          You can switch anytime
        </p>
      </div>
    </motion.section>
  );
}