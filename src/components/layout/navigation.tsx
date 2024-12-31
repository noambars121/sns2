import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Heart, ShoppingCart, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, isActive, onClick }: NavItemProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="flex flex-1 flex-col items-center justify-center gap-1 p-1.5 touch-target"
      role="menuitem"
      aria-current={isActive ? "page" : undefined}
    >
      <motion.div
        animate={{ scale: isActive ? 1.1 : 1, y: isActive ? -2 : 0 }}
        className={`rounded-full p-2 transition-colors ${isActive ? "bg-[#776895] text-white" : "text-white hover:text-[#776895]"}`}
      >
        {icon}
      </motion.div>
      <span
        className={`text-xs ${isActive ? "text-[#776895]" : "text-gray-400"}`}
      >
        {label}
      </span>
    </motion.button>
  );
}

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useI18n();
  const [activeTab, setActiveTab] = useState("");

  const navItems = [
    {
      id: "/",
      icon: <Home className="h-5 w-5" />,
      label: language === "en" ? "Home" : "בית",
      action: () => navigate("/"),
    },
    {
      id: "/search",
      icon: <Search className="h-5 w-5" />,
      label: language === "en" ? "Search" : "חיפוש",
      action: () => navigate("/search"),
    },
    {
      id: "/wishlist",
      icon: <Heart className="h-5 w-5" />,
      label: language === "en" ? "Wishlist" : "מועדפים",
      action: () => navigate("/wishlist"),
    },
    {
      id: "/cart",
      icon: <ShoppingCart className="h-5 w-5" />,
      label: language === "en" ? "Cart" : "עגלה",
      action: () => navigate("/cart"),
    },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    setActiveTab(currentPath === "/" ? "/" : currentPath);
  }, [location.pathname]);

  const handleNavigation = (id: string, action: () => void) => {
    setActiveTab(id);
    action();
  };

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 glass-effect will-change-transform"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex w-full items-center justify-between px-2 py-1 safe-area-bottom">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeTab === item.id}
            onClick={() => handleNavigation(item.id, item.action)}
          />
        ))}
      </div>
    </motion.nav>
  );
}
