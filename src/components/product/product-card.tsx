import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "@/lib/stores/wishlist";
import { Image } from "@/components/ui/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ProductDetail } from "./product-detail";

interface ProductCardProps {
  id: number;
  name?: string;
  price?: string;
  collection?: string;
  image?: string;
}

export function ProductCard({
  id = 1,
  name = "Luxurious Puffer",
  price = "$675.00",
  collection = "Urban Luxury",
  image = "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2070",
}: ProductCardProps) {
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const isLiked = isInWishlist(id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      removeItem(id);
    } else {
      addItem({ id, name, price, collection, image });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden rounded-2xl bg-[#1A1A1A]"
      layout
      layoutId={`product-${id}`}
      role="article"
      aria-labelledby={`product-name-${id}`}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="aspect-[3/4] overflow-hidden"
      >
        <Image
          src={image}
          alt={`Product image of ${name}`}
          className="h-full w-full bg-gray-900 object-cover transition-transform duration-500 group-hover:scale-110"
          priority={id <= 4}
        />
      </motion.div>

      {/* Quick Actions */}
      <div className="absolute right-2 top-2 flex flex-col gap-2">
        <Button
          type="button"
          onClick={toggleWishlist}
          className="rounded-full bg-black/20 p-2 backdrop-blur-sm hover:bg-black/30 hover:text-[#776895] touch-target"
          aria-label={
            isLiked ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`
          }
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
                className={`h-5 w-5 ${isLiked ? "fill-[#776895] text-[#776895]" : "text-white"}`}
              />
            </motion.div>
          </AnimatePresence>
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              className="rounded-full bg-black/20 p-2 backdrop-blur-sm hover:bg-black/30 hover:text-[#776895] touch-target"
              aria-label={`Quick view ${name}`}
            >
              <Eye className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-auto bg-black p-0 sm:max-w-[800px]">
            <ProductDetail
              id={id}
              name={name}
              price={price}
              collection={collection}
              images={[image]}
            />
          </DialogContent>
        </Dialog>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute bottom-0 left-0 right-0 translate-y-0 bg-black/80 p-3 backdrop-blur-sm"
      >
        <h3 id={`product-name-${id}`} className="font-medium text-white">
          {name}
        </h3>
        <p className="mt-0.5 text-sm text-gray-300">{collection}</p>
        <p className="mt-1 font-semibold text-[#776895]">{price}</p>
        <Button
          className="mt-2 w-full rounded-full bg-[#776895] text-white transition-transform hover:scale-105 hover:bg-[#776895]/90"
          onClick={() => (window.location.href = `/product/${id}`)}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </motion.div>
    </motion.div>
  );
}
