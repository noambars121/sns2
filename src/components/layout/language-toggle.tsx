import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export function LanguageToggle() {
  const { language, setLanguage } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed left-4 top-4 z-50"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage(language === "en" ? "he" : "en")}
        className="rounded-full bg-black/20 text-white backdrop-blur-sm hover:bg-black/30"
      >
        {language === "en" ? "עב" : "EN"}
      </Button>
    </motion.div>
  );
}
