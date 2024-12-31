import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  inStock: boolean;
}

const categories = [
  "Urban Collection",
  "Winter Collection",
  "Essentials",
  "Weekend Vibes",
];

export function Search() {
  const { language } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 1000],
    inStock: true,
  });

  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const toggleCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30"
        aria-label={language === "en" ? "Open search" : "פתח חיפוש"}
      >
        <SearchIcon className="h-5 w-5 text-white" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed inset-x-0 top-0 z-50 bg-black p-4"
          >
            <div className="container relative">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Input
                    type="search"
                    placeholder={
                      language === "en" ? "Search products..." : "חפש מוצרים..."
                    }
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="rounded-full bg-white/10 pr-12 text-white placeholder:text-gray-400"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowFilters(!showFilters)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full"
                  >
                    <Filter
                      className={cn(
                        "h-5 w-5 transition-colors",
                        showFilters ? "text-[#9FE65C]" : "text-white",
                      )}
                    />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full"
                  aria-label={language === "en" ? "Close search" : "סגור חיפוש"}
                >
                  <X className="h-5 w-5 text-white" />
                </Button>
              </div>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 overflow-hidden rounded-3xl bg-white/5 p-4"
                  >
                    <div className="space-y-4">
                      <div>
                        <h3 className="mb-2 text-sm font-medium text-white">
                          {language === "en" ? "Categories" : "קטגוריות"}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {categories.map((category) => (
                            <label
                              key={category}
                              className="flex cursor-pointer items-center space-x-2 rounded-full bg-white/5 px-3 py-1 hover:bg-white/10"
                            >
                              <Checkbox
                                checked={filters.categories.includes(category)}
                                onCheckedChange={() => toggleCategory(category)}
                                className="data-[state=checked]:bg-[#9FE65C] data-[state=checked]:text-black"
                              />
                              <span className="text-sm text-white">
                                {category}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-2 text-sm font-medium text-white">
                          {language === "en" ? "Price Range" : "טווח מחירים"}
                        </h3>
                        <Slider
                          defaultValue={[0, 1000]}
                          max={1000}
                          step={10}
                          value={filters.priceRange}
                          onValueChange={(value) =>
                            setFilters((prev) => ({
                              ...prev,
                              priceRange: value as [number, number],
                            }))
                          }
                          className="py-4"
                        />
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>${filters.priceRange[0]}</span>
                          <span>${filters.priceRange[1]}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="in-stock"
                          checked={filters.inStock}
                          onCheckedChange={(checked) =>
                            setFilters((prev) => ({
                              ...prev,
                              inStock: checked as boolean,
                            }))
                          }
                          className="data-[state=checked]:bg-[#9FE65C] data-[state=checked]:text-black"
                        />
                        <Label
                          htmlFor="in-stock"
                          className="text-sm font-medium text-white"
                        >
                          {language === "en" ? "In Stock Only" : "במלאי בלבד"}
                        </Label>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {debouncedQuery && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 rounded-3xl bg-white/5 p-4"
                >
                  <p className="text-sm text-gray-400">
                    {language === "en" ? "No results found" : "לא נמצאו תוצאות"}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
