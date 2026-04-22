"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Heart,
  Shield,
  Zap,
  Users,
  Globe,
  Award,
  Sparkles,
  Clock,
  TrendingUp,
  Building2,
  Code2,
  Wifi,
  Banknote,
  Mic,
  Network,
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import imgPaymeoLogoWhite2 from "@/public/assets/paymeologowhite.png";
import img1 from "@/public/assets/1358c3ba35bdc98636a5ef3762c21e31cbb88101.png";
import img2 from "@/public/assets/c84cb53a7a4ab50359323f283c7dd65e84d3da6a.png";

/* ─── Animated counter ──────────────────────────────────────────── */
function AnimatedNumber({ target, suffix = "" }: { target: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ""));
    const prefix = target.match(/^[^0-9]*/)?.[0] ?? "";
    const postfix = target.replace(/^[^0-9]*[0-9.,]+/, "");
    let start = 0;
    const duration = 1200;
    const step = (timestamp: number, startTime: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * numeric);
      setDisplay(`${prefix}${current}${postfix}`);
      if (progress < 1) requestAnimationFrame((t) => step(t, startTime));
      else setDisplay(target);
    };
    requestAnimationFrame((t) => step(t, t));
  }, [inView, target]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ─── Section label pill ────────────────────────────────────────── */
function Pill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 bg-[#1e5aff]/10 rounded-full px-4 py-2 mb-6">
      <span className="text-[#1e5aff]">{icon}</span>
      <span className="text-sm font-semibold text-[#1e5aff] tracking-wide uppercase">{label}</span>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────── */
export default function AboutPage() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeImpactTab, setActiveImpactTab] = useState<"mission" | "people" | "product" | "future">("mission");

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const impactContent = {
    mission: {
      heading: "Commerce that works for everyone.",
      body: "We believe every seller — from a Balogun stall owner to a digital entrepreneur — deserves access to tools that used to be reserved for big brands. Paymeo democratises AI-powered selling.",
    },
    people: {
      heading: "Built by market people, for market people.",
      body: "Our team has haggled, negotiated, and walked every aisle. We understand what it means to lose a sale because you were busy. That lived experience drives every product decision.",
    },
    product: {
      heading: "AI that never sleeps, so you can.",
      body: "Voice agents that negotiate in Yoruba, Igbo, and Pidgin. Escrow-backed payments. A scout network that turns local knowledge into income. This is commerce infrastructure for Africa.",
    },
    future: {
      heading: "Nigeria first. Then the world.",
      body: "We are starting in Lagos because that is where the energy is. But the Paymeo model — scouts, AI agents, escrow, community — is exportable to every emerging market on earth.",
    },
  };

  return (
    <div
      className="min-h-screen bg-white overflow-x-hidden"
      ref={containerRef}
      style={{ fontFamily: "'DM Sans', 'Sora', sans-serif" }}
    >
      <Nav
        imgPaymeoLogoWhite2={imgPaymeoLogoWhite2}
        activeTab="personal"
        setActiveTab={() => {}}
        setIsProfileOpen={setIsProfileOpen}
      />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative pt-36 pb-24 px-6 lg:px-8 text-center overflow-hidden"
      >
        {/* mesh background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(30,90,255,0.08),transparent)]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-[#1e5aff] rounded-full blur-[120px] pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#1e5aff] rounded-full blur-[100px] pointer-events-none"
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Pill icon={<Sparkles className="w-4 h-4" />} label="Our Story" />
          </motion.div>

          {/* Pinterest-style large headline with inline image chips */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black text-gray-900 leading-[0.95] tracking-tight mb-8"
          >
            Building the future
            <br />
            of{" "}
            <span className="relative inline-block">
              <span className="text-[#1e5aff]">local commerce</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-[#1e5aff]/30 rounded-full origin-left"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-xl sm:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
          >
            Paymeo was born from a simple idea: everyone who delivers value deserves to get paid.
            We&apos;re bridging the gap between traditional markets and digital convenience.
          </motion.p>
        </div>
      </motion.section>

      {/* ── STATS STRIP (Pinterest-style cards) ──────────────────── */}
      <section className="py-16 px-6 lg:px-8 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { number: "500+", label: "Shoppers" },
            { number: "200+", label: "Sellers" },
            { number: "1,000+", label: "Requests Fulfilled" },
            { number: "₦10M+", label: "Value Paid Out" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-gray-50 rounded-3xl p-8 hover:bg-[#1e5aff]/5 transition-colors group cursor-default"
            >
              <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2 group-hover:text-[#1e5aff] transition-colors">
                <AnimatedNumber target={stat.number} />
              </div>
              <div className="text-gray-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── THE NAME ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <Pill icon={<Heart className="w-4 h-4" />} label="The Name" />
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6 leading-tight">
              &ldquo;Pay me{" "}
              <em className="not-italic text-[#1e5aff]">o</em>&rdquo;
            </h2>
            <p className="text-xl text-gray-500 mb-5 leading-relaxed">
              In Nigerian markets, when you&apos;ve delivered value — closed a deal, finished a work, guided someone to the right stall — you say{" "}
              <strong className="text-[#1e5aff] font-semibold">&ldquo;Pay me o.&rdquo;</strong>
            </p>
            <p className="text-xl text-gray-500 leading-relaxed">
              It&apos;s a fair demand for what you&apos;ve earned. That&apos;s the spirit of Paymeo. Everyone who provides value — sellers, scouts, community experts — gets paid.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="https://res.cloudinary.com/diml8ljwa/image/upload/v1762613401/paymeomarketplace-min_wymdfp.png"
                alt="Nigerian market"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </div>
            {/* floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="absolute -bottom-6 -left-6 bg-[#1e5aff] text-white rounded-2xl px-5 py-4 shadow-xl"
            >
              <div className="text-2xl font-black">2026</div>
              <div className="text-white/80 text-sm">Founded in Lagos</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── IMPACT TABS (Pinterest-style) ────────────────────────── */}
      <section className="py-24 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
           {/* Tab bar */}
<div className="flex gap-1 bg-gray-200/60 rounded-full p-1 mb-14 flex-wrap justify-center sm:justify-start sm:w-fit">
  {(["mission", "people", "product", "future"] as const).map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveImpactTab(tab)}
      className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all capitalize flex-1 sm:flex-none whitespace-nowrap ${
        activeImpactTab === tab
          ? "bg-[#1e5aff] text-white shadow-md"
          : "text-gray-500 hover:text-gray-900"
      }`}
    >
      {tab}
    </button>
  ))}
</div>

            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[300px]">
              <motion.div
                key={activeImpactTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-6">
                  {impactContent[activeImpactTab].heading}
                </h2>
                <p className="text-xl text-gray-500 leading-relaxed">
                  {impactContent[activeImpactTab].body}
                </p>
              </motion.div>
              <motion.div
                key={activeImpactTab + "-visual"}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-br from-[#1e5aff]/10 to-[#1e5aff]/5 rounded-3xl h-64 flex items-center justify-center"
              >
                <div className="text-[#1e5aff]/20 text-[160px] font-black leading-none select-none">
                  {activeImpactTab === "mission" && "🎯"}
                  {activeImpactTab === "people" && "🤝"}
                  {activeImpactTab === "product" && "⚡"}
                  {activeImpactTab === "future" && "🌍"}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MEO TECHNOLOGIES SECTION ─────────────────────────────── */}
      <section className="py-28 px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#1e5aff 1px, transparent 1px), linear-gradient(90deg, #1e5aff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <Pill icon={<Building2 className="w-4 h-4" />} label="The Company Behind Paymeo" />
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight mb-6">
              Meo Technologies{" "}
              <span className="text-[#1e5aff]">Limited</span>
            </h2>
            <p className="text-xl text-gray-500 leading-relaxed">
              Paymeo is a product of Meo Technologies Limited — a Nigerian software and ICT company
              driving digital transformation through innovative platforms, tools, and infrastructure.
            </p>
          </motion.div>

          {/* Big statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#0a1628] to-[#0d2050] rounded-[2.5rem] p-10 sm:p-16 mb-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#1e5aff]/20 rounded-full blur-[80px]" />
            <div className="relative z-10 max-w-4xl">
              <p className="text-white/50 text-sm font-semibold uppercase tracking-widest mb-6">
                Company Mission
              </p>
              <p className="text-white text-2xl sm:text-3xl font-bold leading-relaxed">
                Meo Technologies specialises in software development and ICT solutions, focusing on{" "}
                <span className="text-[#4d87ff]">digital commerce</span> and{" "}
                <span className="text-[#4d87ff]">remittance facilitation</span>. We develop and operate enterprise
                and social commerce platforms, online remittance systems, networking tools, and voice-based
                engagement solutions to drive innovation and{" "}
                <span className="text-[#4d87ff]">digital transformation in Nigeria and globally</span>.
              </p>
            </div>
          </motion.div>

          {/* Product pillars */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: <Code2 className="w-6 h-6" />,
                title: "Enterprise & Social Commerce",
                desc: "Platforms that power buying and selling at scale — from market stalls to enterprise supply chains.",
              },
              {
                icon: <Banknote className="w-6 h-6" />,
                title: "Online Remittance Systems",
                desc: "Fast, secure money movement that works for Nigerians at home and in the diaspora.",
              },
              {
                icon: <Network className="w-6 h-6" />,
                title: "Networking Tools",
                desc: "Connecting businesses, communities, and professionals across Nigeria's digital landscape.",
              },
              {
                icon: <Mic className="w-6 h-6" />,
                title: "Voice-Based Engagement",
                desc: "AI voice solutions that engage users in local languages — the tech behind Paymeo's AI agents.",
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Digital Transformation",
                desc: "End-to-end consulting and development that moves Nigerian businesses from analogue to digital.",
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Global Ambition",
                desc: "Built in Nigeria, designed for every emerging market where commerce is human, local, and alive.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-gray-50 hover:bg-white border border-gray-100 hover:border-[#1e5aff]/20 hover:shadow-lg transition-all rounded-2xl p-8"
              >
                <div className="w-12 h-12 bg-[#1e5aff]/10 rounded-xl flex items-center justify-center text-[#1e5aff] mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Pill icon={<Award className="w-4 h-4" />} label="Our Values" />
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-4">What drives us</h2>
            <p className="text-xl text-gray-500">Every decision we make is guided by these principles.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Heart className="w-6 h-6" />, title: "Value for Value", description: "Everyone who delivers value deserves to be compensated. No exceptions." },
              { icon: <Shield className="w-6 h-6" />, title: "Trust First", description: "Every seller is verified. Every payment is secured in escrow. No shortcuts." },
              { icon: <Zap className="w-6 h-6" />, title: "AI That Works", description: "Technology should make selling easier, not harder. Our AI sells while you sleep." },
              { icon: <Users className="w-6 h-6" />, title: "Community Powered", description: "From scouts to shoppers, everyone plays a part in the marketplace." },
              { icon: <Globe className="w-6 h-6" />, title: "Local First", description: "We start with physical markets because that's where real connections happen." },
              { icon: <Clock className="w-6 h-6" />, title: "24/7 Commerce", description: "Your stall never closes. Your AI never sleeps. You never stop selling." },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-white border border-gray-100 hover:border-[#1e5aff]/20 hover:shadow-lg transition-all rounded-2xl p-8"
              >
                <div className="w-12 h-12 bg-[#1e5aff]/10 rounded-xl flex items-center justify-center text-[#1e5aff] mb-5">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-500">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Pill icon={<Users className="w-4 h-4" />} label="The Team" />
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-4">
              Built by people who know the market
            </h2>
            <p className="text-xl text-gray-500">
              We&apos;ve walked the stalls, haggled with sellers, and experienced the magic of local markets firsthand.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Ade Funsó", role: "CEO & Co-founder", bio: "Former researcher turned tech entrepreneur. Understands the market dynamics.", image: img2 },
              { name: "Michael Benson", role: "CTO & Co-founder", bio: "AI specialist who built negotiation agents that actually sound human.", image: img1 },
              { name: "Praise James", role: "Lead Developer", bio: "Built the system around local market contexts.", image: img2 },
              { name: "Miracle Iwunze", role: "Head of Community", bio: "Built scout programs that turned market knowledge into income.", image: img1 },
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="text-center group"
              >
                <div className="relative mb-6 inline-block">
                  <div className="w-28 h-28 rounded-2xl overflow-hidden mx-auto border-4 border-transparent group-hover:border-[#1e5aff]/20 transition-all shadow-lg">
                    <Image src={member.image} alt={member.name} width={112} height={112} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#1e5aff] rounded-full flex items-center justify-center text-white text-xs font-black shadow">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-[#1e5aff] font-semibold text-sm mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black text-gray-900 mb-4">Our journey</h2>
            <p className="text-xl text-gray-500">From a simple idea to a platform transforming local commerce.</p>
          </motion.div>

          <div className="relative pl-10">
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-[#1e5aff]/20" />
            {[
              { year: "", title: "The Idea", description: "Watching sellers lose customers during rush hours sparked an idea: what if AI could sell while they're busy?" },
              { year: "Early 2026", title: "First Prototype", description: "Built the first voice AI agent that could negotiate prices. Sellers loved it." },
              { year: "Mid 2026", title: "Scout Program Launched", description: "Turned market knowledge into income. Scouts earned bounties for finding items and onboarding sellers." },
              { year: "2026", title: "Paymeo Beta", description: "Launched in Lagos. 200+ sellers, 500+ shoppers, and growing every day." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative mb-10 last:mb-0"
              >
                <div className="absolute -left-[2.15rem] top-5 w-4 h-4 bg-[#1e5aff] rounded-full border-4 border-white shadow-md" />
                <div className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow border border-gray-100">
                  <span className="text-[#1e5aff] font-bold text-sm">{item.year}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-1 mb-2">{item.title}</h3>
                  <p className="text-gray-500">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-28 px-6 lg:px-8 bg-[#0a1628] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(30,90,255,0.25),transparent)]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl sm:text-7xl font-black text-white leading-tight mb-6">
            Join the movement.
          </h2>
          <p className="text-xl text-white/60 mb-10 max-w-xl mx-auto">
            Whether you&apos;re a seller, shopper, or someone who knows the market — there&apos;s a place for you at Paymeo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#1e5aff] hover:bg-[#1649d4] text-white rounded-full px-10 py-6 text-base font-semibold shadow-xl shadow-[#1e5aff]/30"
              onClick={() => (window.location.href = "/for-shoppers")}
            >
              Start Shopping <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 bg-black text-white hover:bg-white/10 hover:text-white rounded-full px-10 py-6 text-base font-semibold"
              onClick={() => (window.location.href = "/for-sellers")}
            >
              Start Selling
            </Button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}