import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/stores/cart";
import { useI18n } from "@/lib/i18n";
import { useNavigate } from "react-router-dom";

export function CartPage() {
  const { language } = useI18n();
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, total } = useCart();

  return (
    <div className="min-h-screen bg-black pb-32 pt-6">
      <div className="container px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-3xl font-bold text-white"
        >
          {language === "en" ? "Shopping Cart" : "עגלת קניות"}
        </motion.h1>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <p className="text-lg text-gray-400">
              {language === "en"
                ? "Your cart is empty"
                : "עגלת הקניות שלך ריקה"}
            </p>
            <Button
              onClick={() => navigate("/")}
              className="mt-4 rounded-full bg-[#9FE65C] text-black hover:bg-[#9FE65C]/90"
            >
              {language === "en" ? "Continue Shopping" : "המשך בקנייה"}
            </Button>
          </motion.div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.size}-${item.color}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="flex gap-4 rounded-3xl bg-[#1A1A1A] p-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 rounded-xl object-cover"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-medium text-white">{item.name}</h3>
                        {item.size && item.color && (
                          <p className="text-sm text-gray-400">
                            {item.size} · {item.color}
                          </p>
                        )}
                        <p className="mt-1 font-semibold text-[#9FE65C]">
                          {item.price}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-white">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl bg-[#1A1A1A] p-6"
              >
                <h2 className="mb-4 text-xl font-semibold text-white">
                  {language === "en" ? "Order Summary" : "סיכום הזמנה"}
                </h2>
                <div className="space-y-2 border-t border-gray-800 pt-4">
                  <div className="flex justify-between text-gray-400">
                    <span>
                      {language === "en" ? "Subtotal" : "סכום ביניים"}
                    </span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>{language === "en" ? "Shipping" : "משלוח"}</span>
                    <span>$15.00</span>
                  </div>
                  <div className="flex justify-between pt-2 text-lg font-semibold text-white">
                    <span>{language === "en" ? "Total" : "סה״כ"}</span>
                    <span>${(total + 15).toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  onClick={() => navigate("/checkout")}
                  className="mt-6 w-full rounded-full bg-[#9FE65C] py-6 text-lg font-semibold text-black hover:bg-[#9FE65C]/90"
                >
                  {language === "en" ? "Proceed to Checkout" : "המשך לתשלום"}
                </Button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
