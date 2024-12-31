import { useEffect } from "react";
import { Header } from "./layout/header";
import { LanguageToggle } from "./layout/language-toggle";
import { HeroSection } from "./home/hero-section";
import { FeaturedCollections } from "./home/featured-collections";
import { ProductGrid } from "./product/product-grid";
import { useTheme } from "@/lib/theme";

function Home() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="min-h-screen bg-background">
      <LanguageToggle />
      <Header />
      <main>
        <HeroSection />
        <FeaturedCollections />
        <ProductGrid />
      </main>
    </div>
  );
}

export default Home;
