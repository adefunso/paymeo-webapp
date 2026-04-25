"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import imgPaymeoLogoWhite2 from "@/public/assets/paymeologowhite.png";
import { Button } from "@/components/ui/button";



const faqs = [
  {
    category: "For Shoppers",
    questions: [
      {
        q: "What is Paymeo and how does it work?",
        a: "Paymeo is a local marketplace where you can post what you're looking for and get offers from sellers. Simply tell us what you need, and sellers will compete to give you the best price. You can compare offers, choose the best deal, and pay securely through our escrow system—all without walking through the entire market."
      },
      {
        q: "Is Paymeo free for shoppers?",
        a: "Yes! Paymeo is completely free for shoppers. You only pay for the items you buy. Sellers pay a small transaction fee when they make a sale."
      },
      {
        q: "How do bounties work?",
        a: "Bounties are optional rewards you can add to your requests. If you're looking for something hard to find, adding a bounty encourages scouts and community members to help you locate it. You only pay the bounty if someone successfully finds it for you."
      },
      {
        q: "How do I know sellers are real?",
        a: "Every seller on Paymeo is manually verified. We confirm their stall location with photos and GPS. When you choose a seller, you get real-time map directions straight to their stall. You can visit before you pay."
      },
      {
        q: "How does payment work?",
        a: "All payments are held in escrow. When you agree to a price, the money is secured. It only releases to the seller after you confirm you've received the goods. No scams. No stress."
      },
      {
        q: "Can I tip someone who helped me?",
        a: "Absolutely! If a scout finds something for you or someone gives a great recommendation, you can tip them directly from your wallet. It's our way of encouraging the community to help each other."
      },
      {
        q: "What if the seller doesn't have the item when I arrive?",
        a: "Your money is in escrow—you don't pay until you confirm you have the goods. If the item isn't available, simply don't confirm, and your money will be refunded."
      },
      {
        q: "Can I return items?",
        a: "Returns are between you and the seller. Paymeo holds funds until you confirm—so you have leverage to inspect first. If there's an issue, you can dispute and we'll review the chat history."
      }
    ]
  },
  {
    category: "For Sellers",
    questions: [
      {
        q: "How do I start selling on Paymeo?",
        a: "Download the app, snap photos of your products, and set your prices. Our AI automatically creates listings for you. Add your bank details to your wallet, and you're ready to start selling—even while you sleep!"
      },
      {
        q: "How does the AI agent work?",
        a: "Your AI agent handles customer requests 24/7. It negotiates within your price rules, answers questions, and closes sales—even when you're busy serving other customers or sleeping. You just confirm the pickup."
      },
      {
        q: "What are the fees?",
        a: "Paymeo charges a small transaction fee (1.5% - 3.5%) only when you make a sale. There are no monthly fees unless you choose a premium subscription for advanced features."
      },
      {
        q: "How do I get paid?",
        a: "Funds go into escrow when a customer pays. Once they confirm pickup, money releases to your wallet. You can withdraw to your bank anytime or keep funds in your wallet for purchases and transfers."
      },
      {
        q: "What is the QR code storefront?",
        a: "Every seller gets a unique QR code. Place it at your stall. When customers scan it, your AI agent activates and helps them browse, ask questions, and buy—even when you're busy with other customers."
      },
      {
        q: "Can I receive tips?",
        a: "Yes! Happy customers can tip you directly through the app. Tips go straight to your wallet."
      },
      {
        q: "How do scouts help my business?",
        a: "Scouts are community members who earn bounties by finding items for shoppers. They'll bring customers to your stall. You only pay when they deliver—performance-based marketing."
      },
      {
        q: "Do I need a smartphone?",
        a: "Yes, any Android or iPhone works. The app is designed to be simple—snap photos, set prices, and let the AI do the rest."
      }
    ]
  },
  {
    category: "For Scouts",
    questions: [
      {
        q: "What is a scout?",
        a: "Scouts are community experts who know the market well. When shoppers post requests with bounties, scouts find the items at physical stalls, take photos, and earn the bounty when the sale completes."
      },
      {
        q: "How do I earn as a scout?",
        a: "You earn bounties by finding requested items. When you onboard new sellers, you also earn a commission on their first few sales. The more you help, the more you earn."
      },
      {
        q: "Do I need to buy anything?",
        a: "No. You just need to know where to find items. Take a photo, tag the stall, and let the seller's AI handle the rest. You get paid when the sale happens."
      }
    ]
  },
  {
    category: "Payments & Wallet",
    questions: [
      {
        q: "How does escrow protect me?",
        a: "When you pay, money is held securely by Paymeo. It only releases to the seller when you confirm you've received the goods. This protects both buyers and sellers from scams."
      },
      {
        q: "How do I withdraw money?",
        a: "Go to your wallet, tap 'Withdraw', and enter your bank details. Funds typically arrive within 24 hours."
      },
      {
        q: "Can I send money to friends?",
        a: "Yes! Your Paymeo wallet lets you send money to other users, request payments, and split costs—all within the app."
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely. We use industry-standard encryption and partner with licensed payment providers. Your money is always protected."
      }
    ]
  },
  {
    category: "General",
    questions: [
      {
        q: "What is Co-Pay?",
        a: "Co-Pay lets you create groups to buy together. Perfect for events, bulk purchases, or splitting costs with friends. Add products, invite people, and the app splits everything automatically. (Coming soon)"
      },
      {
        q: "What is Meo AI?",
        a: "Meo is your dedicated 24/7 Sales AI Agent built to understand, engage, and convert intent into sales for you. It handles negotiations, answers customer questions, and closes deals while you focus on other things."
      },
      {
        q: "Is Paymeo available in my area?",
        a: "We're currently launching in major markets like Balogun, Computer Village, and Alaba. We're expanding rapidly—join the waitlist and we'll notify you when we launch in your area."
      },
      {
        q: "How do I contact support?",
        a: "You can reach us through the app, email support@paymeo.co, or visit our help center. We're here 24/7 to assist you."
      }
    ]
  }
];

export default function FAQPageClient() {
  const [activeCategory, setActiveCategory] = useState("For Shoppers");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"personal" | "business">("personal");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const currentFaq = faqs.find(f => f.category === activeCategory) || faqs[0];
  
  const filteredQuestions = currentFaq.questions.filter(q => 
    q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Nav
        imgPaymeoLogoWhite2={imgPaymeoLogoWhite2}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsProfileOpen={setIsProfileOpen}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1e5aff]/5 via-transparent to-[#1e5aff]/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Everything you need to know about Paymeo
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1e5aff] focus:border-transparent"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-gray-200 sticky top-20 bg-white/80 backdrop-blur-md z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
            {faqs.map((category) => (
              <button
                key={category.category}
                onClick={() => setActiveCategory(category.category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  activeCategory === category.category
                    ? "bg-[#1e5aff] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border border-gray-200 rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900 pr-8">{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-gray-500">No results found for &quot;{searchQuery}&quot;</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Still Have Questions? */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Can&apos;t find the answer you&apos;re looking for? Please reach out to our friendly team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-[#1e5aff] hover:bg-[#1e5aff]/90 text-white rounded-full px-8"
              onClick={() => window.location.href = "/contact"}
            >
              Contact Support
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-full px-8"
              onClick={() => window.location.href = "/for-shoppers"}
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}