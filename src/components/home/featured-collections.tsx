import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const collections = [
  {
    id: 1,
    name: { en: "Urban Luxury", he: "יוקרה אורבנית" },
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070",
  },
  {
    id: 2,
    name: { en: "Weekend Vibes", he: "אווירת סוף שבוע" },
    image:
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=2070",
  },
  {
    id: 3,
    name: { en: "Essentials", he: "בסיסיים" },
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2070",
  },
];

export function FeaturedCollections() {
  const { language } = useI18n();

  return (
    <section className="py-16">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-3xl font-bold text-white"
        >
          {language === "en" ? "Featured Collections" : "קולקציות מובחרות"}
        </motion.h2>
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {collections.map((collection, index) => (
              <CarouselItem
                key={collection.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-[4/5] overflow-hidden rounded-3xl"
                >
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={collection.image}
                    alt={collection.name[language]}
                    className="h-full w-full object-cover"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.2 }}
                    className="absolute inset-0 flex items-center justify-center glass-effect"
                  >
                    <h3 className="text-2xl font-bold text-white">
                      {collection.name[language]}
                    </h3>
                  </motion.div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-12 hidden lg:flex" />
          <CarouselNext className="-right-12 hidden lg:flex" />
        </Carousel>
      </div>
    </section>
  );
}
