import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/lib/stores/wishlist";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Image } from "@/components/ui/image";

const sizes = ["XS", "S", "M", "L", "XL"];
const colors = ["Black", "Navy", "Brown"];

interface ProductDetailProps {
  id?: number;
  name?: string;
  price?: string;
  rating?: number;
  collection?: string;
  description?: string;
  stockStatus?: "in-stock" | "low-stock" | "out-of-stock";
  images?: string[];
}

export function ProductDetail({
  id = 1,
  name = "Luxurious Puffer Jacket",
  price = "$675.00",
  rating = 4.8,
  collection = "Urban Collection",
  description = "A premium puffer jacket crafted from the finest materials. Features a modern cut with innovative padding technology for ultimate comfort and warmth.",
  stockStatus = "in-stock",
  images = [
    "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=2070",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070",
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2070",
  ],
}: ProductDetailProps) {
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const isLiked = isInWishlist(id);

  const toggleWishlist = () => {
    if (isLiked) {
      removeItem(id);
    } else {
      addItem({ id, name, price, collection, image: images[0] });
    }
  };

  const stockStatusColors = {
    "in-stock": "text-[#776895]",
    "low-stock": "text-yellow-400",
    "out-of-stock": "text-red-500",
  };

  const stockStatusText = {
    "in-stock": "In Stock",
    "low-stock": "Low Stock",
    "out-of-stock": "Out of Stock",
  };

  return (
    <div className="min-h-screen bg-black pb-32">
      <div className="container px-4">
        {/* Top Section */}
        <div className="pt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              {name}
            </h1>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-[#776895] text-[#776895]" />
                  <span className="ml-1 text-white">{rating}</span>
                </div>
                <span className="text-xl font-semibold text-[#776895] sm:text-2xl">
                  {price}
                </span>
              </div>
              <span className={cn("text-sm", stockStatusColors[stockStatus])}>
                {stockStatusText[stockStatus]}
              </span>
            </div>
          </motion.div>

          {/* Image Carousel */}
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="aspect-[3/4] overflow-hidden rounded-3xl"
                  >
                    <Image
                      src={image}
                      alt={`${name} view ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 hidden sm:flex" />
            <CarouselNext className="-right-4 hidden sm:flex" />
          </Carousel>
        </div>

        {/* Middle Section */}
        <div className="mt-8 space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-300">Size</h3>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                  className={`h-12 w-12 rounded-full ${selectedSize === size ? "bg-[#776895] text-white" : "text-white"}`}
                  disabled={stockStatus === "out-of-stock"}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-300">Color</h3>
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <Button
                  key={color}
                  variant={selectedColor === color ? "default" : "outline"}
                  onClick={() => setSelectedColor(color)}
                  className={`rounded-full px-6 ${selectedColor === color ? "bg-[#776895] text-white" : "text-white"}`}
                  disabled={stockStatus === "out-of-stock"}
                >
                  {color}
                </Button>
              ))}
            </div>
          </div>

          <motion.div
            animate={{ height: isDescriptionExpanded ? "auto" : "80px" }}
            className="overflow-hidden"
          >
            <p className="text-gray-300">{description}</p>
          </motion.div>
          <Button
            variant="ghost"
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="flex w-full items-center justify-center text-gray-400"
          >
            <ChevronDown
              className={`h-5 w-5 transition-transform ${isDescriptionExpanded ? "rotate-180" : ""}`}
            />
          </Button>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-[80px] left-0 right-0 glass-effect px-4 py-3 safe-area-bottom"
        >
          <div className="container flex gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full text-white"
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist();
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLiked ? "liked" : "unliked"}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Heart
                    className={`h-5 w-5 ${isLiked ? "fill-[#776895] text-[#776895]" : ""}`}
                  />
                </motion.div>
              </AnimatePresence>
            </Button>
            <div className="flex flex-1 gap-2">
              <Button
                className="flex-1 rounded-full bg-white text-black hover:bg-white/90"
                disabled={
                  stockStatus === "out-of-stock" ||
                  !selectedSize ||
                  !selectedColor
                }
              >
                Buy Now
              </Button>
              <Button
                className="flex-1 rounded-full bg-[#776895] text-white hover:bg-[#776895]/90"
                disabled={
                  stockStatus === "out-of-stock" ||
                  !selectedSize ||
                  !selectedColor
                }
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
