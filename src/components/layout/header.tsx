import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export function Header() {
  const navigate = useNavigate();
  const { language } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-colors safe-area-top will-change-transform ${isScrolled ? "glass-effect" : ""}`}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-white"
        >
          SNS
        </motion.button>
      </div>
    </motion.header>
  );
}
