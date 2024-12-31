import { useI18n } from "@/lib/i18n";
import { ProductCard } from "./product-card";

const products = [
  {
    id: 1,
    name: { en: "Cush Coat", he: "מעיל קאש" },
    price: "$325.00",
    collection: { en: "Urban Collection", he: "קולקציה אורבנית" },
    image:
      "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=2070",
  },
  {
    id: 2,
    name: { en: "Air Cocoon", he: "קוקון אוויר" },
    price: "$450.00",
    collection: { en: "Winter Collection", he: "קולקציית חורף" },
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070",
  },
  {
    id: 3,
    name: { en: "Silk Blouse", he: "חולצת משי" },
    price: "$275.00",
    collection: { en: "Essentials", he: "בסיסיים" },
    image:
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=2070",
  },
  {
    id: 4,
    name: { en: "Leather Jacket", he: "ג'קט עור" },
    price: "$595.00",
    collection: { en: "Urban Collection", he: "קולקציה אורבנית" },
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2070",
  },
];

export function ProductGrid() {
  const { language } = useI18n();

  return (
    <section className="py-8 pb-32">
      <div className="container px-2 sm:px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-medium text-white">
            {language === "en" ? "Popular Products" : "מוצרים פופולריים"}
          </h2>
          <button className="text-sm text-gray-400 hover:text-white">
            {language === "en" ? "Show All" : "הצג הכל"}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name[language]}
              price={product.price}
              collection={product.collection[language]}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
