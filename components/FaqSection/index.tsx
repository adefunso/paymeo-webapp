"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
  {
    question: "What is Paymeo?",
    answer:
      "Paymeo is an intent-driven social commerce platform that bridges conversations and commerce. It lets users express what they need (intent) and connects them directly to the people or businesses that can fulfill those needs — all while enabling seamless, secure payments.",
  },
  {
    question: "What makes Paymeo different?",
    answer:
      "Unlike traditional platforms, Paymeo is built around intent — not just transactions. It transforms requests, offers, and conversations into meaningful connections, making commerce more human, intelligent, and instant.",
  },
  {
    question: "Who can use Paymeo?",
    answer:
      "Anyone. Whether you’re an individual sending money, a creator selling services, or a business managing customers, Paymeo provides the tools to connect, engage, and grow — all in one place.",
  },
  {
    question: "What currencies does Paymeo support?",
    answer:
      "Paymeo currently supports the Nigerian Naira (₦), with multi-currency support for USD and other African markets — such as the Ghanaian Cedi (₵), Kenyan Shilling (KSh), and South African Rand (R) — coming soon.",
  },
  {
    question: "Is Paymeo regulated?",
    answer:
      "Yes. Paymeo partners with licensed financial institutions and payment processors to comply with the Central Bank of Nigeria (CBN) and other relevant African regulatory bodies. Our goal is to ensure every transaction is legally compliant, safe, and transparent.",
  },
  {
    question: "Can I use Paymeo without a business?",
    answer:
      "Of course. You don’t need to own a business to use Paymeo. You can send money, request payments, split bills, or simply interact with others who can help you fulfill a need or offer a service.",
  },
  {
  question: "What can I do with Meo?",
  answer:
    "Meo is your personal and business assistant across the entire Paymeo ecosystem. It helps you perform actions, manage tasks, and interact with people or businesses through simple text or voice commands. For individuals, Meo can help you send or request money, discover sellers or service providers, make purchases, and manage your wallet — all hands-free. For businesses and creators, Meo helps you respond to customers, negotiate and close sales, track payments, generate invoices, and even recommend actions to boost engagement or sales. As Meo evolves, it will become an intelligent intent-recognition AI that powers discovery, support, insights, and automation across the Paymeo and Meo Platforms ecosystem — making every interaction faster, smarter, and more human.",
},

  {
    question: "How will Paymeo handle delivery and fulfillment?",
    answer:
      "In our later rollout phases, Paymeo will integrate with verified delivery partners and our in-house logistics platform, to ensure that goods ordered through Paymeo are delivered safely, efficiently, and transparently. Each delivery will include live tracking, insurance options, and user feedback systems.",
  },
  {
    question: "Where is Paymeo available?",
    answer:
      "Paymeo is currently available in Nigeria, with expansion plans to other African countries underway. Global access will roll out gradually as we build regional compliance partnerships.",
  },
  {
    question: "How does Paymeo handle disputes?",
    answer:
      "We take user protection seriously. Our in-app dispute resolution system helps resolve issues quickly, and we monitor suspicious transactions using machine learning models. Verified sellers and buyers enjoy an extra layer of trust protection.",
  },
  {
    question: "What’s next for Paymeo?",
    answer:
      "We’re building toward a future where human intent drives commerce. That means more intelligent discovery, smarter delivery systems, and integrated AI assistance via Meo — making every transaction more seamless and human-centered.",
  },
];


  return (
    <section className="bg-linear-to-b from-[#1e5aff] to-[#1846cc] h-[100%] text-white py-24 px-6 lg:px-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start z-20">
        {/* Left side - Heading */}
        <div className="flex flex-col justify-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-semibold leading-tight">
            Some Frequently Asked Questions
          </h2>
          
        </div>

        {/* Right side - FAQ items */}
        <div className="space-y-6 mb-25">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-white/30 pb-4">
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex justify-between items-center w-full text-left text-lg md:text-xl font-medium focus:outline-none"
              >
                <span>{faq.question}</span>
                {openIndex === index ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Plus className="w-5 h-5 text-white" />
                )}
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 text-sm md:text-base text-blue-100"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative shape */}
      <div className="absolute bottom-0 right-0 opacity-25">
        <svg
          width="180"
          height="180"
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
    </section>
  );
}
