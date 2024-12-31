import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useWishlist } from "@/lib/stores/wishlist";
import { ProductCard } from "@/components/product/product-card";

export function WishlistPage() {
  const { language } = useI18n();
  const { items } = useWishlist();

  return (
    <div className="min-h-screen bg-black pb-32 pt-6">
      <div className="container px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-3xl font-bold text-white"
        >
          {language === "en" ? "Wishlist" : "מועדפים"}
        </motion.h1>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <p className="text-lg text-gray-400">
              {language === "en"
                ? "Your wishlist is empty"
                : "רשימת המועדפים שלך ריקה"}
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                collection={item.collection}
                image={item.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
