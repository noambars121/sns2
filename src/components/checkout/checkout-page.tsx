import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, CreditCard, CircleDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useI18n } from "@/lib/i18n";
import {
  validateRequired,
  validateZipCode,
  getErrorMessage,
} from "@/tests/utils/validation";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zip: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  zip?: string;
}

export function CheckoutPage() {
  const { language } = useI18n();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [items, setItems] = useState<OrderItem[]>([
    {
      id: 1,
      name: "Luxurious Puffer Jacket",
      price: 675,
      image:
        "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=2070",
      quantity: 1,
      size: "M",
      color: "Black",
    },
  ]);

  const updateQuantity = (id: number, change: number) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item,
      ),
    );
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!validateRequired(formData.firstName)) {
      newErrors.firstName = getErrorMessage("First Name", "required");
    }

    if (!validateRequired(formData.lastName)) {
      newErrors.lastName = getErrorMessage("Last Name", "required");
    }

    if (!validateRequired(formData.address)) {
      newErrors.address = getErrorMessage("Address", "required");
    }

    if (!validateRequired(formData.city)) {
      newErrors.city = getErrorMessage("City", "required");
    }

    if (!validateZipCode(formData.zip)) {
      newErrors.zip = getErrorMessage("", "zipCode");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      // Simulate order processing
      setTimeout(() => {
        setIsSubmitting(false);
        // Reset form or redirect to confirmation
      }, 2000);
    } else {
      setIsSubmitting(false);
    }
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 15;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-black pb-32 pt-6">
      <div className="container px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-3xl font-bold text-white"
        >
          {language === "en" ? "Checkout" : "תשלום"}
        </motion.h1>

        <form onSubmit={handleSubmit}>
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl bg-[#1A1A1A] p-6"
          >
            <h2 className="mb-4 text-xl font-semibold text-white">
              {language === "en" ? "Order Summary" : "סיכום הזמנה"}
            </h2>
            {items.map((item) => (
              <div key={item.id} className="mb-4 flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-white">{item.name}</h3>
                  <p className="text-sm text-gray-400">{`${item.size} · ${item.color}`}</p>
                  <p className="mt-1 font-semibold text-[#9FE65C]">
                    ${item.price}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-white">{item.quantity}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 space-y-2 border-t border-gray-800 pt-4 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>{language === "en" ? "Subtotal" : "סכום ביניים"}</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>{language === "en" ? "Shipping" : "משלוח"}</span>
                <span>${shipping}</span>
              </div>
              <div className="flex justify-between pt-2 text-base font-semibold text-white">
                <span>{language === "en" ? "Total" : "סה״כ"}</span>
                <span>${total}</span>
              </div>
            </div>
          </motion.div>

          {/* Shipping Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 rounded-3xl bg-[#1A1A1A] p-6"
          >
            <h2 className="mb-4 text-xl font-semibold text-white">
              {language === "en" ? "Shipping Information" : "פרטי משלוח"}
            </h2>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    {language === "en" ? "First Name" : "שם פרטי"}
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => {
                      setFormData({ ...formData, firstName: e.target.value });
                      if (errors.firstName)
                        setErrors({ ...errors, firstName: undefined });
                    }}
                    className={`rounded-xl ${errors.firstName ? "border-red-500" : ""}`}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">{errors.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    {language === "en" ? "Last Name" : "שם משפחה"}
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => {
                      setFormData({ ...formData, lastName: e.target.value });
                      if (errors.lastName)
                        setErrors({ ...errors, lastName: undefined });
                    }}
                    className={`rounded-xl ${errors.lastName ? "border-red-500" : ""}`}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">
                  {language === "en" ? "Address" : "כתובת"}
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => {
                    setFormData({ ...formData, address: e.target.value });
                    if (errors.address)
                      setErrors({ ...errors, address: undefined });
                  }}
                  className={`rounded-xl ${errors.address ? "border-red-500" : ""}`}
                />
                {errors.address && (
                  <p className="text-sm text-red-500">{errors.address}</p>
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">
                    {language === "en" ? "City" : "עיר"}
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => {
                      setFormData({ ...formData, city: e.target.value });
                      if (errors.city)
                        setErrors({ ...errors, city: undefined });
                    }}
                    className={`rounded-xl ${errors.city ? "border-red-500" : ""}`}
                  />
                  {errors.city && (
                    <p className="text-sm text-red-500">{errors.city}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">
                    {language === "en" ? "ZIP Code" : "מיקוד"}
                  </Label>
                  <Input
                    id="zip"
                    value={formData.zip}
                    onChange={(e) => {
                      setFormData({ ...formData, zip: e.target.value });
                      if (errors.zip) setErrors({ ...errors, zip: undefined });
                    }}
                    className={`rounded-xl ${errors.zip ? "border-red-500" : ""}`}
                  />
                  {errors.zip && (
                    <p className="text-sm text-red-500">{errors.zip}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Method */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 rounded-3xl bg-[#1A1A1A] p-6"
          >
            <h2 className="mb-4 text-xl font-semibold text-white">
              {language === "en" ? "Payment Method" : "אמצעי תשלום"}
            </h2>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 rounded-xl border border-gray-800 p-4">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  {language === "en" ? "Credit Card" : "כרטיס אשראי"}
                </Label>
              </div>
              <div className="flex items-center space-x-3 rounded-xl border border-gray-800 p-4">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="flex items-center gap-2">
                  <CircleDollarSign className="h-5 w-5" />
                  PayPal
                </Label>
              </div>
            </RadioGroup>
          </motion.div>

          {/* Place Order Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Button
              type="submit"
              className="w-full rounded-full bg-[#9FE65C] py-6 text-lg font-semibold text-black hover:bg-[#9FE65C]/90"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? language === "en"
                  ? "Processing..."
                  : "מעבד..."
                : language === "en"
                  ? "Place Order"
                  : "בצע הזמנה"}
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
