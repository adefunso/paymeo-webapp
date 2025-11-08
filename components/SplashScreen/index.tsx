import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Wait for the page to finish loading
    const handleLoad = () => {
      setTimeout(() => setFadeOut(true), 500); // Delay before fade out
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-[9999] bg-gradient-to-b from-[#1e5aff] to-[#265ffc] transition-opacity duration-700 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <img
        src="https://res.cloudinary.com/diml8ljwa/image/upload/v1762615201/paymeologowhite_mu8lfg.png"
        alt="Paymeo Logo"
        className="w-25 h-25 animate-heartbeat select-none"
      />
    </div>
  );
}
