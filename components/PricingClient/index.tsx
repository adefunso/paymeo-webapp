"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUp, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer"; // adjust path if your Footer is elsewhere
import { useEffect, useMemo, useState } from "react";
import imgPaymeoLogoWhite2 from "@/public/assets/paymeologowhite.png";
import imgPaymeoLogoBlue from "@/public/assets/paymeologoblue.png";
import { useRouter } from "next/navigation";

/* ------------------------------
   Profile slide-in (business / personal)
   ------------------------------ */
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
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm z-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className={`
          fixed top-5 xl:right-5 bottom-5 z-80
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

            <div className="flex justify-between">
              <div className="mt-10 flex justify-center md:justify-start ml-6">
                <span className="bg-black/70 text-[12px] text-white px-3 py-2 rounded-[20px] border-0">
                  MOBILE APP COMING SOON!
                </span>
              </div>

              <button
                onClick={onClose}
                className="absolute top-7 right-7 z-20 p-2 rounded-full hover:bg-gray-100 transition"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-gray-800" />
              </button>
            </div>

            <div className="relative z-10 flex-1 p-10 overflow-y-auto flex flex-col justify-center items-center text-center">
              <div className="flex flex-col items-center mb-8">
                <div className="w-12 h-12 bg-[#1e5aff] rounded-[14px] flex items-center justify-center mb-4">
                  <Image src={imgPaymeoLogoWhite2} alt="Paymeo" className="w-10 h-10 object-contain" />
                </div>
                <h3 className="text-2xl font-semibold">Paymeo Account</h3>
              </div>

              {activeTab === "personal" ? (
                <>
                  <h4 className="text-2xl font-semibold mb-3">Be the first to experience Paymeo Personal</h4>
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
                <>
                  <h4 className="text-2xl font-semibold mb-3">Log in to your Paymeo Business Account</h4>
                  <p className="text-gray-600 mb-8 max-w-md">
                    &quot;Sell across your existing channels with 24/7 Sales AI Agents — never lose a sale, even while you sleep.
                    Manage payments, inventory, and shipments all in one place. Unlock demand-driven social commerce and 10x your sales process — right from your pocket.&quot;
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

            <div className="p-4 text-center text-sm text-gray-400 border-t border-gray-100">&copy; 2025 Paymeo. All rights reserved.</div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------
   AnimatedNumber - per-digit scroll effect
   Accepts: value (number)
   Renders each digit column (0-9) and transitions translateY to target digit.
   Works for integers. Add commas for readability but digits animate.
   ------------------------------ */
function AnimatedNumber({ value }: { value: number }) {
  const numeric = Math.round(value);
  const str = numeric.toLocaleString("en-US");
  const chars = str.split("");

  return (
    <span
      className="inline-flex items-baseline justify-center font-mono"
      style={{
        fontVariantNumeric: "tabular-nums", // equal width digits
        lineHeight: "1em",
      }}
    >
      {chars.map((ch, i) => {
        // render commas normally
        if (ch === ",") {
          return (
            <span
              key={i}
              className="mx-[1px] text-current"
              style={{ position: "relative", top: "0.1em" }}
            >
              ,
            </span>
          );
        }

        const digit = parseInt(ch, 10);
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              width: "1.2ch",
              height: "1em",
              overflow: "hidden",
              verticalAlign: "bottom",
            }}
          >
            <motion.div
              initial={false}
              animate={{ y: `${-digit * 1}em` }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 30,
              }}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {Array.from({ length: 10 }).map((_, d) => (
                <span
                  key={d}
                  style={{
                    height: "1em",
                    lineHeight: "1em",
                    fontSize: "1em",
                  }}
                >
                  {d}
                </span>
              ))}
            </motion.div>
          </span>
        );
      })}
    </span>
  );
}

/* ------------------------------
   Main Pricing client component
   ------------------------------ */
export default function PricingClient({ imgPaymeoLogoWhite2 }: { imgPaymeoLogoWhite2: StaticImageData }) {
  const [activePlan, setActivePlan] = useState<"monthly" | "annually">("monthly");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"personal" | "business">("personal");
  const router = useRouter();

  // Pricing content (as requested) — API credits removed where asked
  const plans = useMemo(
    () => [
      {
        name: "Starter",
        price: "Free",
        description: "Micro-businesses, freelancers, and new users. Perfect for testing Paymeo.",
        buttonText: "Get Started",
        highlight: false,
        features: [
          "Unlimited Products & Services",
          "Unlimited Clients",
          "Accept Payments via Escrow",
          "10 free + 20 commissioned sales per month (2–5%) across one account",
          "Unlimited Invoices & Automated Receipts",
          "Wallet",
          "Receive & Respond to Purchase Requests (\"Ask\")",
          "Basic Inventory Management",
          "Smart Negotiation Tools",
          "Email Notifications",
          "Manage up to 2 Business Accounts",
          "Sales AI Agent (1 free trial showcase) — Pay-as-you-go (N5k/$4)",
          "Recurring Invoices (Add-on)",
        ],
      },
      {
        name: "Growth",
        price: "₦32,000/mo ($20/mo)",
        description: "Growing SMEs and serious freelancers — remove limits and unlock powerful tools.",
        buttonText: "Start Free Trial",
        highlight: true,
        features: [
          "Everything in Starter, plus:",
          "Zero Commission on Sales — Unlimited commission-free sales",
          "Advanced Inventory Management (low stock alerts, SKU-level tracking)",
          "Recurring Invoices",
          "Sales AI Agent (Basic: 24/7 assistant)",
          "Basic Analytics (sales trends, top products)",
          "Pulse Insights (self-run campaigns, lightweight marketing)",
          "Advanced Negotiation Tools",
          "USD Account (for international trade)",
          "Free Withdrawals (first 10 per month, then small fee)",
          "Email & WhatsApp Notifications/Reminders",
          "Multiple Account Users & Teams (2 users included, +$2/user after)",
          "Manage up to 5 Business Accounts",
          "Customizable Invoice Templates (Add-on)",
          "Sales Webinar & Live Sales Rooms (Add-on)",
        ],
      },
      {
        name: "Enterprise",
        price: "Custom (Contact Sales)",
        description: "Large businesses, agencies, and platforms (custom pricing & integrations).",
        buttonText: "Contact Sales",
        highlight: false,
        features: [
          "Everything in Growth, plus:",
          "Advanced Analytics (exportable reports, CLV, custom metrics)",
          "Advanced Sales AI (custom-trained on your business, FAQs, and tone)",
          "Sales Webinar & Live Sales Rooms",
          "Unlimited Free Withdrawals",
          "Customizable Invoice Templates (with branding/logo)",
          "Dedicated Account Manager & Priority Support",
          "Higher API Limits & Custom Integrations",
          "Embeddable Product Showcase (Add-on)",
          "White-labeling Options (Add-on)",
        ],
      },
    ],
    []
  );

  // Feature comparison (keeps API-related row removed per your instruction)
  const featureList = [
    { name: "AI Messages per day", starter: "Limited", growth: "Unlimited", enterprise: "Unlimited" },
    { name: "Meeting Scheduling", starter: "Basic", growth: "Unlimited", enterprise: "Unlimited" },
    { name: "Custom Prompting", starter: "-", growth: "✓", enterprise: "✓" },
    { name: "Custom Analytics", starter: "-", growth: "Basic", enterprise: "Advanced" },
    { name: "Team Collaboration", starter: "-", growth: "2 users", enterprise: "Unlimited" },
    { name: "Manage Business Accounts", starter: "Up to 2", growth: "Up to 5", enterprise: "Unlimited" },
  ];

  // Helper pricing numbers for animation (monthly and annual)
  // Growth: monthly ₦32,000 -> annually ₦256,000 (we also animate the USD numbers 20 -> 160)
  const growthNairaMonthly = 32000;
  const growthNairaAnnual = 256000; // equivalent to $200/yr example
  const growthUsdMonthly = 20;
  const growthUsdAnnual = 160;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/40 to-white">
      {/* Profile slide-in */}
      <ProfileSlideIn open={isProfileOpen} onClose={() => setIsProfileOpen(false)} activeTab={activeTab} openWaitlist={() => setWaitlistOpen(true)} />

      {/* Nav */}
      <Nav
        imgPaymeoLogoWhite2={imgPaymeoLogoWhite2}
        activeTab="business"
        setActiveTab={(tab) => {
          if (tab === "personal") router.push("/");
        }}
        setIsProfileOpen={() => {
          setActiveTab("business");
          setIsProfileOpen(true);
        }}
      />

      {/* Hero */}
      <section className="relative pt-28 pb-20 text-center overflow-hidden">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10">
          <h1 className="flex flex-wrap items-center justify-center text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-gray-900 leading-tight">
            <span className="mr-2">Start</span>

            <span className="flex items-center justify-center mx-1 ml-[-12px] mr-[-12px]">
              <Image src={imgPaymeoLogoBlue} alt="Paymeo logo" className="object-contain relative top-[1px]" width={60} height={60} sizes="(max-width: 640px) 32px, (max-width: 1024px) 48px, 60px" priority />
            </span>

            <span className="ml-2">for free</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl px-7 mx-auto mb-10">
            Whether you&apos;re using Paymeo for clients, customers, or walk-in sales, it just works — free to use.
          </p>
        </motion.div>
      </section>

      {/* Pricing section with toggle */}
      <section className="max-w-7xl mx-auto px-6 pb-28 mt-[-90px]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10">
        <div className="flex items-center justify-center mb-4">
          <div className="relative bg-gray-100 rounded-full flex items-center w-[240px] p-1">
            {/* sliding highlight */}
            <motion.div
              className="absolute top-1 bottom-1 rounded-full bg-[#1e5aff] shadow-md"
              layout
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              style={{
                width: "calc(50% - 4px)",
                left: activePlan === "monthly" ? 4 : "calc(50% + 0px)",
              }}
            />
            <button onClick={() => setActivePlan("monthly")} className={`relative z-10 flex-1 py-2 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 ${activePlan === "monthly" ? "text-white" : "text-gray-700 hover:text-[#1e5aff]"}`}>
              Monthly
            </button>
            <button onClick={() => setActivePlan("annually")} className={`relative z-10 flex-1 py-2 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 ${activePlan === "annually" ? "text-white" : "text-gray-700 hover:text-[#1e5aff]"}`}>
              Annually
            </button>
          </div>
        </div>
        </motion.div>

        {activePlan === "annually" && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-[#1e5aff] text-sm font-medium text-center mt-2">
            Intro annual discount at launch ($160/yr). Save 33.3% annually 🎉
          </motion.div>
        )}

        <div className="grid gap-8 md:grid-cols-3 mt-8">
          {plans.map((plan, i) => {
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}>
                <Card className={`rounded-[30px] border-2 ${plan.highlight ? "border-[#1e5aff] shadow-xl bg-white" : "border-gray-200 bg-white/70 backdrop-blur-sm"} p-8 h-full flex flex-col justify-between`}>
                  <CardContent className="p-0 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-2xl font-semibold mb-2 text-gray-900">{plan.name}</h3>
                      <p className="text-gray-600 mb-6">{plan.description}</p>

                      <div className="text-4xl font-bold mb-4 text-[#1e5aff] flex flex-col items-center">
                        {/* Growth plan uses AnimatedNumber for naira and usd */}
                        {plan.name === "Growth" ? (
                          <div className="flex flex-col items-center">
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl">₦</span>
                              <AnimatedNumber value={activePlan === "monthly" ? growthNairaMonthly : growthNairaAnnual} />
                              <span className="text-base font-medium text-gray-600 ml-2">/{activePlan === "monthly" ? "mo" : "yr"}</span>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">($<AnimatedNumber value={activePlan === "monthly" ? growthUsdMonthly : growthUsdAnnual} />)</div>
                          </div>
                        ) : plan.name === "Enterprise" ? (
                          <div className="flex flex-col items-center">
                            <span className="text-xl">Custom</span>
                            <div className="text-sm text-gray-500 mt-1">Contact Sales (starts ~ $199/mo)</div>
                          </div>
                        ) : (
                          <div>Free</div>
                        )}
                      </div>

                      <ul className="space-y-3 text-gray-700 text-sm">
                        {plan.features.map((f, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="text-[#1e5aff] w-5 h-5 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8">
                      <Link href="https://web.paymeo.co">
                        <Button className={`w-full h-12 rounded-[20px] font-medium ${plan.highlight ? "bg-[#1e5aff] text-white hover:bg-[#1746cc]" : "border border-[#1e5aff] text-white bg-black hover:bg-[#1e5aff]/10 hover:text-[#1e5aff]"}`}>
                          {plan.buttonText}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Feature comparison table - sticky header, scrollable rows */}
      <section className="relative max-w-6xl mx-auto px-6 pb-32">
        <div className="sticky top-0 bg-white border border-gray-200 rounded-t-3xl grid grid-cols-4 text-center font-semibold text-gray-800 z-10 shadow-sm">
          <div className="text-left px-4 py-5">Features</div>
          <div className="py-5">Starter</div>
          <div className="py-5">Growth</div>
          <div className="py-5">Enterprise</div>
        </div>

        <div className="max-h-[420px] overflow-y-auto border border-t-0 border-gray-200 rounded-b-3xl">
          {featureList.map((f, i) => (
            <div key={i} className="grid grid-cols-4 text-sm border-b border-gray-100 py-4 px-4 text-gray-700 hover:bg-gray-50 transition">
              <div className="font-medium">{f.name}</div>
              <div className="text-center">{f.starter}</div>
              <div className="text-center">{f.growth}</div>
              <div className="text-center">{f.enterprise}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Meo AI CTA */}
<section className="bg-gradient-to-b from-gray-50 to-white py-28 text-center mt-[-90px]">
  <div className="max-w-4xl mx-auto px-6">
    <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
      Meet <span className="text-[#1e5aff]">Meo</span> — your Sales AI Agent that never sleeps.
    </h2>
    <p className="text-gray-600 text-lg mb-8">
      Meo works 24/7 to help your business close more sales — online and in-store.  
      Attach Meo to your products or services, and customers can instantly chat or talk with a 
      smart, human-like assistant that understands your offers, negotiates, and converts.  
      While you rest, Meo sells.
    </p>
    <Button className="bg-[#1e5aff] hover:bg-[#1746cc] text-white rounded-[20px] px-8 h-12 font-medium">
      Coming Soon
    </Button>
  </div>
</section>


      {/* Footer */}
      <Footer />
    </div>
  );
}
