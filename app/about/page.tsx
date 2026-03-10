"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  TrendingUp
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import imgPaymeoLogoWhite2 from "@/public/assets/paymeologowhite.png";
import img1 from "@/public/assets/1358c3ba35bdc98636a5ef3762c21e31cbb88101.png";
import img2 from "@/public/assets/c84cb53a7a4ab50359323f283c7dd65e84d3da6a.png";

export default function AboutPage() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.02, 
      y: -8,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden" ref={containerRef}>
      {/* Navigation - Using a default tab value since we're not using activeTab */}
      <Nav
        imgPaymeoLogoWhite2={imgPaymeoLogoWhite2}
        activeTab="personal"
        setActiveTab={() => {}}
        setIsProfileOpen={setIsProfileOpen}
      />

      {/* Hero Section - Stripe Style */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e5aff]/5 via-transparent to-[#1e5aff]/5" />
        
        {/* Decorative circles */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-20 right-0 w-96 h-96 bg-[#1e5aff]/10 rounded-full blur-3xl"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute bottom-20 left-0 w-80 h-80 bg-[#1e5aff]/10 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[#1e5aff]/10 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#1e5aff]" />
              <span className="text-sm font-medium text-[#1e5aff]">Our Story</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
            >
              Building the future of
              <span className="text-[#1e5aff] block mt-2">local commerce</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Paymeo was born from a simple idea: everyone who delivers value deserves to get paid. 
              We&apos;re bridging the gap between traditional markets and digital convenience.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* The Name Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#1e5aff]/10 rounded-full px-4 py-2 mb-6">
                <Heart className="w-4 h-4 text-[#1e5aff]" />
                <span className="text-sm font-medium text-[#1e5aff]">The Name</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                &quot;Pay me <span className="text-[#1e5aff]">o</span>&quot;
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                In Nigerian markets, when you&apos;ve delivered value - closed a deal, finished a work, found the best price, 
                guided someone to the right stall — you say <span className="font-semibold text-[#1e5aff]">&quot;Pay me o.&quot;</span>
              </p>
              <p className="text-lg text-gray-600">
                It&apos;s a fair demand for what you&apos;ve earned. That&apos;s the spirit of Paymeo. 
                Everyone who provides value — sellers, scouts, community experts — gets paid.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Nigerian market"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white text-sm">Balogun Market, Lagos — where Paymeo was born</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section - Stripe Style Cards */}
<section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
  <div className="max-w-7xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-3xl mx-auto mb-16"
    >
      <div className="inline-flex items-center gap-2 bg-[#1e5aff]/10 rounded-full px-4 py-2 mb-6">
        <Award className="w-4 h-4 text-[#1e5aff]" />
        <span className="text-sm font-medium text-[#1e5aff]">Our Values</span>
      </div>
      <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
        What drives us
      </h2>
      <p className="text-xl text-gray-600">
        Every decision we make is guided by these principles.
      </p>
    </motion.div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        {
          icon: <Heart className="w-6 h-6" />,
          title: "Value for Value",
          description: "Everyone who delivers value deserves to be compensated. No exceptions."
        },
        {
          icon: <Shield className="w-6 h-6" />,
          title: "Trust First",
          description: "Every seller is verified. Every payment is secured in escrow. No shortcuts."
        },
        {
          icon: <Zap className="w-6 h-6" />,
          title: "AI That Works",
          description: "Technology should make selling easier, not harder. Our AI sells while you sleep."
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: "Community Powered",
          description: "From scouts to shoppers, everyone plays a part in the marketplace."
        },
        {
          icon: <Globe className="w-6 h-6" />,
          title: "Local First",
          description: "We start with physical markets because that's where real connections happen."
        },
        {
          icon: <Clock className="w-6 h-6" />,
          title: "24/7 Commerce",
          description: "Your stall never closes. Your AI never sleeps. You never stop selling."
        }
      ].map((value, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ 
            scale: 1.02, 
            y: -8,
            transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
          }}
          className="h-full"
        >
          <Card className="h-full bg-white border border-gray-200 hover:border-[#1e5aff]/20 transition-all">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-[#1e5aff]/10 rounded-xl flex items-center justify-center text-[#1e5aff] mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#1e5aff]/10 rounded-full px-4 py-2 mb-6">
              <Users className="w-4 h-4 text-[#1e5aff]" />
              <span className="text-sm font-medium text-[#1e5aff]">The Team</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Built by people who know the market
            </h2>
            <p className="text-xl text-gray-600">
              We&apos;ve walked the stalls, haggled with sellers, and experienced the magic of local markets firsthand.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ade Funsó",
                role: "CEO & Co-founder",
                bio: "Former researcher turned tech entrepreneur. Understands the market dynamics.",
                image: img2
              },
              {
                name: "Michael Benson",
                role: "CTO & Co-founder",
                bio: "AI specialist who built negotiation agents that actually sound human. Knows every corner of local markets",
                image: img1
              },
               {
                name: "Praise James",
                role: "Lead Developer",
                bio: "Built the system around local market contexts.",
                image: img2
              },
              {
                name: "Miracle Iwunze",
                role: "Head of Community",
                bio: "Built scout programs that turned market knowledge into income.",
                image: img1
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="text-center"
              >
                <div className="relative mb-6 inline-block">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-[#1e5aff]/20">
                    <Image 
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#1e5aff] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-[#1e5aff] font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1e5aff]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Shoppers" },
              { number: "200+", label: "Sellers" },
              { number: "1,000+", label: "Requests Fulfilled" },
              { number: "₦10M+", label: "Value Paid Out" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center text-white"
              >
                <motion.div 
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-4xl md:text-5xl font-bold mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Our journey
            </h2>
            <p className="text-xl text-gray-600">
              From a simple idea to a platform transforming local commerce.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#1e5aff]/20" />

            {[
              {
                year: "2025",
                title: "The Idea",
                description: "Watching sellers lose customers during rush hours sparked an idea: what if AI could sell while they're busy?",
                align: "left"
              },
              {
                year: "2026",
                title: "First Prototype",
                description: "Built the first voice AI agent that could negotiate prices. Sellers loved it.",
                align: "right"
              },
              {
                year: "2026",
                title: "Scout Program Launched",
                description: "Turned market knowledge into income. Scouts earned bounties for finding items and onboarding sellers.",
                align: "left"
              },
              {
                year: "2026",
                title: "Paymeo Beta",
                description: "Launched in Balogun Market. 200+ sellers, 500+ shoppers, and growing every day.",
                align: "right"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: item.align === "left" ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row items-start gap-8 mb-12 ${
                  item.align === "right" ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 top-0 w-4 h-4 bg-[#1e5aff] rounded-full transform -translate-x-1.5" />
                
                {/* Content */}
                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                  item.align === "left" ? "md:pr-12" : "md:pl-12"
                }`}>
                  <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                    <span className="text-[#1e5aff] font-bold text-sm">{item.year}</span>
                    <h3 className="text-xl font-semibold text-gray-900 mt-1 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1e5aff] to-[#0d3bb8]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Join the movement
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Whether you&apos;re a seller, shopper, or someone who knows the market—there&apos;s a place for you at Paymeo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-[#1e5aff] hover:bg-gray-100 rounded-full px-8"
                onClick={() => window.location.href = "/for-shoppers"}
              >
                Start Shopping
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white bg-black text-white hover:bg-white/10 hover:text-white rounded-full px-8"
                onClick={() => window.location.href = "/for-sellers"}
              >
                Start Selling
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}