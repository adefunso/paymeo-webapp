"use client";

interface StatsSectionProps {
  activeTab: "personal" | "business";
}

export function StatsSection({ activeTab }: StatsSectionProps) {
  if (activeTab === "personal") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-[#1e5aff]">500+</div>
          <div className="text-xs sm:text-sm text-gray-600">Shoppers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-[#1e5aff]">200+</div>
          <div className="text-xs sm:text-sm text-gray-600">Sellers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-[#1e5aff]">1,000+</div>
          <div className="text-xs sm:text-sm text-gray-600">Requests</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-[#1e5aff]">₦5M+</div>
          <div className="text-xs sm:text-sm text-gray-600">Saved</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-[#1e5aff]">200+</div>
          <div className="text-xs sm:text-sm text-gray-600">Active Sellers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-[#1e5aff]">₦10M+</div>
          <div className="text-xs sm:text-sm text-gray-600">Sales Processed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-[#1e5aff]">24/7</div>
          <div className="text-xs sm:text-sm text-gray-600">AI Selling</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-[#1e5aff]">98%</div>
          <div className="text-xs sm:text-sm text-gray-600">Satisfaction</div>
        </div>
      </div>
    );
  }
}