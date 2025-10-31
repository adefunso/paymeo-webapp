"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle2 } from "lucide-react";
import imgPaymeoLogoWhite2 from "@/public/assets/paymeologowhite.png";

interface WaitlistDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function WaitlistDialog({ isOpen, setIsOpen }: WaitlistDialogProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleWaitlistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://formspree.io/f/xpwoyeqk", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setName("");
        setEmail("");
      } else {
        console.error("Formspree submission error");
        alert("Something went wrong. Please try again later.");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#1e5aff] rounded-[14px] flex items-center justify-center">
              <Image src={imgPaymeoLogoWhite2} alt="" className="w-8 h-8" />
            </div>
            Join The Waitlist
          </DialogTitle>
          <DialogDescription>
            Be among the first to experience intent-driven social commerce. We&apos;ll notify you when we launch! 🚀
          </DialogDescription>
        </DialogHeader>

        {!isSubmitted ? (
          <form onSubmit={handleWaitlistSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#1e5aff] hover:bg-[#1e5aff]/90"
              disabled={loading}
            >
              <Mail className="w-4 h-4 mr-2" />
              {loading ? "Joining..." : "Join Waitlist"}
            </Button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl mb-2">You&apos;re on the list!</h3>
            <p className="text-gray-600 text-center">
              We&apos;ll notify you as soon as we launch.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
