import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const { language } = useI18n();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        style={{ opacity, scale }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        <picture>
          <source
            srcSet="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2574&auto=format&fit=crop"
            media="(min-width: 1024px)"
          />
          <source
            srcSet="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1287&auto=format&fit=crop"
            media="(min-width: 768px)"
          />
          <motion.img
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=892&auto=format&fit=crop"
            alt="Hero background - Fashion model in elegant clothing"
            className="h-full w-full object-cover"
            loading="eager"
          />
        </picture>
      </motion.div>

      <div className="container relative mx-auto flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-4"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="inline-block rounded-full bg-[#776895]/20 px-4 py-1.5 text-sm font-medium text-[#776895] backdrop-blur-sm"
            >
              {language === "en" ? "New Collection" : "קולקציה חדשה"}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl lg:text-7xl"
            >
              {language === "en" ? "A Sense of Style," : "תחושה של סטייל,"}
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="bg-gradient-to-r from-[#776895] to-[#776895]/70 bg-clip-text text-transparent"
              >
                {language === "en" ? "A Touch of You" : "נגיעה של עצמך"}
              </motion.span>
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mx-auto max-w-lg text-base text-gray-300 sm:text-lg md:text-xl"
          >
            {language === "en"
              ? "Discover our curated collection of premium fashion pieces"
              : "גלה את האוסף המובחר שלנו של פריטי אופנה יוקרתיים"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Button
              size="lg"
              className="group relative overflow-hidden rounded-full bg-[#776895] px-8 text-white transition-transform hover:scale-105 hover:bg-[#776895]/90"
            >
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: -4 }}
                className="relative z-10 flex items-center"
              >
                {language === "en" ? "Browse Collections" : "עיין באוספים"}
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.span>
              </motion.span>
              <motion.div
                className="absolute inset-0 z-0 bg-gradient-to-r from-[#776895]/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white px-8 text-white transition-colors hover:bg-white/10"
            >
              {language === "en" ? "Shop Now" : "קנה עכשיו"}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="rounded-full bg-white/10 p-2 backdrop-blur-sm"
          >
            <ArrowRight className="h-5 w-5 rotate-90 text-white" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
