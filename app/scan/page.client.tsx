"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, QrCode, Sparkles, ArrowRight, ShieldCheck, X } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { QRScanner } from '@/components/QRScanner';
import { StoreAgent } from '@/components/StoreAgent';
import imgPaymeoLogoWhite2 from '@/public/assets/paymeologowhite.png';

type AppState = 'home' | 'scanning' | 'agent';



export default function ScanPageClient() {
  const [activeTab, setActiveTab] = useState<"personal" | "business">("personal");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [state, setState] = useState<AppState>('home');
  const [scannedStore, setScannedStore] = useState<string | null>(null);

  // Prevent body scroll when scanning or agent is active
  useEffect(() => {
    if (state === 'scanning' || state === 'agent') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [state]);

  const handleScan = (data: string) => {
    setScannedStore(data);
    setState('agent');
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Nav
        imgPaymeoLogoWhite2={imgPaymeoLogoWhite2}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsProfileOpen={setIsProfileOpen}
      />

      {/* Home State - Full Viewport Height with White Background */}
      {state === 'home' && (
        <motion.div 
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pt-20 md:pt-28 min-h-screen bg-white flex items-start justify-center"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col items-center text-center">
            {/* Animated Icon */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="mb-6 p-4 bg-[#1e5aff]/5 rounded-3xl"
            >
              <ShoppingBag className="w-12 h-12 text-[#1e5aff]" />
            </motion.div>
            
            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-gray-900"
            >
              Scan. Shop. <span className="text-[#1e5aff]">Pay.</span>
            </motion.h1>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-gray-600 max-w-2xl mb-6 leading-relaxed"
            >
              Scan stall QR codes to activate a Sales Agent that handles sales, negotiations and payments for you.
            </motion.p>

            {/* Features Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10 w-full"
            >
              {[
                { icon: QrCode, title: "Scan QR", desc: "Instant access to any stall's AI agent.", color: "text-[#1e5aff]" },
                { icon: Sparkles, title: "Sales Agent", desc: "Get the best deals with real-time Sales Agent.", color: "text-[#1e5aff]" },
                { icon: ShieldCheck, title: "Secure Pay", desc: "One-tap payments after negotiation.", color: "text-[#1e5aff]" }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl bg-gray-50 border border-gray-200 text-left hover:border-[#1e5aff]/30 hover:shadow-md transition-all"
                >
                  <feature.icon className={`w-6 h-6 ${feature.color} mb-4`} />
                  <h3 className="font-semibold text-base sm:text-lg mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => setState('scanning')}
              className="group relative px-8 sm:px-10 py-3.5 sm:py-4 bg-[#1e5aff] hover:bg-[#1e5aff]/90 text-white font-medium text-base sm:text-lg rounded-full transition-all flex items-center gap-3 overflow-hidden shadow-lg shadow-[#1e5aff]/20"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10">Start Shopping</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Scanning State - Fullscreen Overlay */}
      {state === 'scanning' && (
        <motion.div 
          key="scanning"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white flex flex-col items-center justify-center p-6 z-50"
          style={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Close Button */}
          <button 
            onClick={() => setState('home')}
            className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>

          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">Scan QR Code</h2>
            <p className="text-gray-500 text-sm sm:text-base">Point your camera at the stall&apos;s QR code</p>
          </div>
          
          <div className="w-full max-w-sm">
            <QRScanner onScan={handleScan} />
          </div>
          
          <button 
            onClick={() => setState('home')}
            className="mt-8 px-6 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 text-sm font-medium transition-colors"
          >
            Cancel
          </button>
        </motion.div>
      )}

      {/* Agent State - Fullscreen */}
      {state === 'agent' && (
        <StoreAgent 
          key="agent" 
          onClose={() => setState('home')} 
        />
      )}

      <Footer />
    </div>
  );
}