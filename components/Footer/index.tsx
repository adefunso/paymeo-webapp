"use client";

import Image from "next/image";
import {
  RiFacebookFill,
  RiInstagramLine,
  RiTwitterXLine,
  RiTiktokFill,
  RiLinkedinFill,
  RiWhatsappFill,
  RiDiscordFill,
  RiTelegram2Fill,
  RiTwitterXFill,
  RiInstagramFill
} from "react-icons/ri";
import imgPaymeoLogoWhite2 from "@/public/assets/paymeologowhite.png";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-600 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-2 py-16">
        {/* Newsletter Signup */}
        <div className="mb-16">
          <h3 className="text-lg md:text-xl font-medium text-gray-800 mb-4">
            Get news and updates from Paymeo
          </h3>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-2"
          >
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full sm:w-96 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e5aff]"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition font-medium"
            >
              Sign up
            </button>
          </form>

          <p className="mt-4 text-xs text-gray-500 max-w-2xl">
            By signing up, you agree to receive updates and marketing messages
            (e.g., email, social, etc.) from Paymeo about our existing and future
            products and services. You can unsubscribe at any time via the link
            in our emails. Your subscription is subject to our{" "}
            <a href="#" className="text-[#1e5aff] hover:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#1e5aff] hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>

        {/* Footer links */}
        <div className="border-t border-gray-200 pt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo + Socials */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-[#1e5aff] rounded-[14px] flex items-center justify-center">
                <Image
                  src={imgPaymeoLogoWhite2}
                  alt="Paymeo"
                  className="w-8 h-8"
                />
              </div>
              <span className="text-xl font-semibold text-gray-800 ml-[-6px]">
                paymeo
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Intent-driven social commerce platform.
            </p>

            <div className="flex items-center gap-4 text-white/70 mt-2">
              <a
                href="https://facebook.com/usepaymeo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1e5aff] hover:text-[#1e5aff] transition"
              >
                <RiFacebookFill className="text-2xl" />
              </a>
              <a
                href="https://instagram.com/usepaymeo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1e5aff] hover:text-[#1e5aff] transition"
              >
                <RiInstagramFill className="text-2xl" />
              </a>
              <a
                href="https://twitter.com/usepaymeo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1e5aff] hover:text-[#1e5aff] transition"
              >
                <RiTwitterXFill className="text-2xl" />
              </a>
              <a
                href="https://tiktok.com/@usepaymeo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1e5aff] hover:text-[#1e5aff] transition"
              >
                <RiTiktokFill className="text-2xl" />
              </a>
              <a
                href="https://www.linkedin.com/company/usepaymeo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1e5aff] hover:text-[#1e5aff] transition"
              >
                <RiLinkedinFill className="text-2xl" />
              </a>
            </div>
          </div>
          {/* Logo + Socials */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-l font-semibold text-gray-800">
                Community
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Join our communities
            </p>

            <div className="flex items-center gap-4 text-white/70 mt-2">
              <a
                href="https://facebook.com/usepaymeo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1e5aff] hover:text-[#1e5aff] transition"
              >
                <RiDiscordFill className="text-2xl" />
              </a>
              <a
                href="https://instagram.com/usepaymeo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1e5aff] hover:text-[#1e5aff] transition"
              >
                <RiTelegram2Fill className="text-2xl" />
              </a>
              <a
                href="https://twitter.com/usepaymeo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1e5aff] hover:text-[#1e5aff] transition"
              >
                <RiWhatsappFill className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-gray-800 font-medium mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#how-it-works" className="hover:text-gray-800 transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#more-features" className="hover:text-gray-800 transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-gray-800 transition">
                  Mobile App
                </Link>
              </li>
              <li>
                <Link href="/#meo" className="hover:text-gray-800 transition">
                  Meo AI
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-gray-800 font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-gray-800 transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800 transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800 transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-gray-800 font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-sm">

              <li>
                <a href="#" className="hover:text-gray-800 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800 transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800 transition">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-gray-200 mt-12 pt-6 text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-between">
          <p>&copy; 2025 Paymeo. All rights reserved.</p>
          <div className="flex gap-6 mt-3 sm:mt-0">
            <a href="#" className="hover:text-gray-800 transition">
              Terms
            </a>
            <a href="#" className="hover:text-gray-800 transition">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-800 transition">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
