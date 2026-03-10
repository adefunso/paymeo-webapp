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
  RiLinkedinFill,
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
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Network,
  User,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Mail,
  Sparkles,
  Camera,
  MessageCircle,
  MapPin,
  CreditCard,
  Bell,
  Share2,
  QrCode,
  Zap,
  Globe,
  Smartphone,
  Users,
  TrendingUp,
  Clock,
  Shield,
  BarChart,
  DollarSign,
  Headphones,
  Store,
  Link as LinkIcon,
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
import LandingGate from "@/components/LandingGate";

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
function useInViewport(
  options: IntersectionObserverOptions = {},
): UseInViewportReturn {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      },
    );

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
   NEW COMPONENTS - ADD THESE AFTER YOUR EXISTING COMPONENTS
   These will be used in the new sections below
--------------------------------------------------------- */











/* ---------------------------------------------------------
   Full HomePage component (ALL YOUR ORIGINAL CONTENT INTACT)
   NEW SECTIONS ADDED AT THE BOTTOM
--------------------------------------------------------- */
export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"personal" | "business">(
    "personal",
  );
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
  const [hasSelectedTab, setHasSelectedTab] = useState(false);

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
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const videos = {
    personal:
      "https://res.cloudinary.com/diml8ljwa/video/upload/q_70,f_webm,vc_vp9,w_1200,ac_none,du_8/v1762294237/paymeohero_1_tq8bao",
    business:
      "https://res.cloudinary.com/diml8ljwa/video/upload/q_70,f_webm,vc_vp9,w_1200,ac_none,du_8/v1762296185/paymeomale_1_qirryn",
  };

  const culture =
    "https://res.cloudinary.com/diml8ljwa/image/upload/v1761872629/hero_illustration_ppefew.png";

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SplashScreen />
      {/* Profile slide-in */}

      {/* ── LANDING GATE — shown until user picks a tab ── */}
    <AnimatePresence>
      {!hasSelectedTab && (
        <motion.div
          key="gate"
          className="fixed inset-0 z-[100]"
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        >
          <LandingGate
            imgPaymeoLogoWhite2={imgPaymeoLogoWhite2}
          />
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  );
}
