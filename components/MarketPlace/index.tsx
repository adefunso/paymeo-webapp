"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image, { StaticImageData } from "next/image";
import imgPaymeoLogoWhite2 from "@/public/assets/paymeologowhite.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Link from "next/link";
import { ArrowUp, X } from "lucide-react";
import { useRouter } from "next/navigation";

// Types for API response
interface ProductImage {
  image_url: string;
  sort_order: number;
}

interface Product {
  id: number;
  product_name: string;
  slug: string;
  description: string;
  currency: string;
  per_unit_cost: number;
  total_sold: number;
  inventory: number | null;
  user_id: string;
  product_id: string;
  date_uploaded: string;
  product_image: string | null;
  collection_id: string;
  upload_type: string;
  delivery_timeline: number | null;
  weight: number | null;
  dimensions: string | null;
  brand: string | null;
  product_condition: string;
  return_policy: string;
  is_negotiable: number;
  starting_price: string | null;
  ending_price: string | null;
  delivery_options: string | null;
  upfront_payment_percentage: number;
  available_for_pickup: number;
  available_for_delivery: number;
  lagos_delivery_fee: number | null;
  outside_lagos_delivery_fee: number | null;
  is_digital: number;
  digital_file_url: string | null;
  file_size: string | null;
  file_type: string | null;
  digital_product_type: string | null;
  allowed_downloads: number | null;
  download_expiry_days: number | null;
  watermark_enabled: number;
  cloudinary_public_id: string | null;
  category: string;
  images: ProductImage[];
  primary_image: string;
}

interface PaginationInfo {
  current_page: number;
  total_pages: number;
  total_products: number;
  products_per_page: number;
  has_previous: boolean;
  has_next: boolean;
}

interface ApiResponse {
  success: string;
  products: Product[];
  pagination: PaginationInfo;
}

// API configuration
const PAYMEO_API_KEY = process.env.NEXT_PUBLIC_PAYMEO_API_KEY || "D5NN602kTIoOFAbhicH6oovHUxzqYVZg";
const API_BASE_URL = "https://api.paymeo.co/mango/manig/product-list";

/* ------------------------------
   Profile slide-in
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
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className={`
          fixed top-5 xl:right-5 bottom-5 z-70
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
              <div className="absolute inset-0">
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
   Main page with API integration
   ------------------------------ */
export default function MarketplacePage({ imgPaymeoLogoWhite2 }: { imgPaymeoLogoWhite2: StaticImageData }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasFetched, setHasFetched] = useState(false);
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"personal" | "business">("personal");
  const router = useRouter();

  // Fetch products from API using GET method
  const fetchProducts = useCallback(async (page: number = 1, limit: number = 12) => {
    try {
      setLoading(true);
      setError(null);
      
      const url = `${API_BASE_URL}?page=${page}&limit=${limit}`;
      console.log(`Fetching products from: ${url}`);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-api-key': PAYMEO_API_KEY,
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      console.log('API response data:', data);

      if (data.success && Array.isArray(data.products)) {
        setProducts(prevProducts => 
          page === 1 ? data.products : [...prevProducts, ...data.products]
        );
        setPagination(data.pagination);
        setHasFetched(true);
      } else {
        throw new Error('Invalid response format from API: Missing products array');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch products from API';
      setError(errorMessage);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load more products
  const loadMore = () => {
    if (pagination?.has_next && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchProducts(nextPage, 12);
    }
  };

  // Format price with currency
  const formatPrice = (price: number, currency: string = 'NGN') => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Check if Load More button should be shown
  const shouldShowLoadMore = products.length >= 12 && pagination?.has_next;

  // Initial data fetch - runs only once
  useEffect(() => {
    if (!hasFetched) {
      fetchProducts(1, 12);
    }
  }, [fetchProducts, hasFetched]);

 

  return (
    <div className="relative bg-white min-h-screen">
      {/* Profile slide-in */}
      <ProfileSlideIn 
        open={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        activeTab={activeTab} 
        openWaitlist={() => setWaitlistOpen(true)} 
      />
      
      {/* Nav */}
      <Nav
        imgPaymeoLogoWhite2={imgPaymeoLogoWhite2}
        activeTab="personal"
        setActiveTab={(tab) => {
          if (tab === "personal") router.push("/");
          else if (tab === "business") router.push("https://web.paymeo.co");
        }}
        setIsProfileOpen={() => {
          setActiveTab("personal");
          setIsProfileOpen(true);
        }}
      />

      {/* Marketplace Content */}
      <main className="pt-30 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header row - left title, right app badges */}
        <div className="flex flex-col xl:flex-row md:flex-row sm:flex-row justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl text-center xl:text-start md:text-start font-semibold mb-4 text-gray-800"
            >
              Explore Our Marketplace
            </motion.h1>
            <p className="text-gray-500 text-center xl:text-start md:text-start mb-8 xl:mb-12 md:mb-12 max-w-2xl mx-auto">
              Discover businesses and their unique products on Paymeo — buy from
              real people and trusted sellers.
            </p>
          </div>

          <div className="md:flex flex-col gap-3 items-center text-center">
            <span className="text-sm text-gray-600">Mobile app is coming soon</span>
            <div className="flex gap-2 justify-center">
              <Image
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                width={130}
                height={44}
                className="object-contain"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                width={130}
                height={44}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* "Just For You" label */}
        <div className="flex items-center justify-between mb-4 mt-20">
          <h2 className="text-lg font-semibold text-gray-800">Just For You</h2>
        </div>

        {/* Loading State */}
        {loading && products.length === 0 && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e5aff]"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <p className="text-red-500 mb-4">Error: {error}</p>
              <button
                onClick={() => fetchProducts(1, 12)}
                className="bg-[#1e5aff] text-white px-6 py-2 rounded-full hover:bg-[#1746cc] transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && (
          <>
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found.</p>
              </div>
            ) : (
              <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                {products.map((item) => (
                  <motion.div 
                    key={`${item.id}-${item.product_id}`} 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.25 }}
                  >
                    
                    <a href={`https://web.paymeo.co/product/${item.slug}`} target="_blank">       
                    <Card className="relative rounded-[13px] overflow-hidden border-t border-b border-gray-100 bg-white hover:shadow-lg transition">
                      <CardContent className="p-2">
                        <div className="relative w-full h-40 xl:h-70 rounded-[13px] overflow-hidden bg-gray-50">
                          <Image 
                            src={item.primary_image || "https://res.cloudinary.com/diml8ljwa/image/upload/v1762607184/poweredby_mqkisv.png"} 
                            alt={item.product_name} 
                            fill 
                            className="object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://res.cloudinary.com/diml8ljwa/image/upload/v1762607184/poweredby_mqkisv.png";
                            }}
                          />
                          {/* heart overlay top-right */}
                          <div className="absolute top-2 right-2 rounded-full p-1.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20.8 6.6c-.9-1.2-2.3-1.9-3.8-1.9-1.5-0-2.9.7-3.8 1.9L12 7.8l-1.2-1.1C9.9 5.4 8.5 4.7 7 4.7 5.5 4.7 4.1 5.4 3.2 6.6 1.7 8.6 2.1 11.4 4 13l8 7.1 8-7.1c1.9-1.6 2.3-4.4.8-6.4z" />
                            </svg>
                          </div>
                        </div>

                        <h3 className="mt-3 text-sm font-medium text-gray-900 line-clamp-2">
                          {item.product_name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.brand}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-semibold text-gray-900">
                            {formatPrice(item.per_unit_cost, item.currency)}
                          </span>
                          <span className="text-xs text-gray-400">♡ {item.total_sold}</span>
                        </div>
                      </CardContent>
                    </Card>
                    </a>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Load More Button - Only shows when there are 12 or more products AND there are more to load */}
            {shouldShowLoadMore && (
              <div className="flex flex-col items-center mt-8 mb-10">
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                  <button 
                    onClick={loadMore} 
                    disabled={loading}
                    className="bg-black text-white rounded-full px-6 py-2 text-sm hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Loading...' : 'Load More'}
                  </button>
                </motion.div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}