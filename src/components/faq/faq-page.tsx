import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQPage() {
  const { language } = useI18n();

  const faqs = {
    en: [
      {
        category: "Products & Sizing",
        items: [
          {
            question: "How do I find my size?",
            answer:
              'We provide detailed size guides for each product. You can find the size chart by clicking on the "Size Guide" link on any product page.',
          },
          {
            question: "What materials do you use?",
            answer:
              "We use premium materials sourced from ethical suppliers. Each product page lists detailed material information.",
          },
          {
            question: "Are your products sustainable?",
            answer:
              "Yes, we are committed to sustainability. We use eco-friendly materials and ethical manufacturing processes.",
          },
        ],
      },
      {
        category: "Shipping & Returns",
        items: [
          {
            question: "What are your shipping times?",
            answer:
              "Domestic orders typically arrive within 3-5 business days. International shipping takes 7-14 business days.",
          },
          {
            question: "What is your return policy?",
            answer:
              "We offer free returns within 30 days of purchase. Items must be unworn with original tags attached.",
          },
          {
            question: "Do you ship internationally?",
            answer:
              "Yes, we ship to most countries worldwide. Shipping costs and times vary by location.",
          },
        ],
      },
      {
        category: "Orders & Payment",
        items: [
          {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, PayPal, and Apple Pay.",
          },
          {
            question: "Can I modify my order?",
            answer:
              "Orders can be modified within 1 hour of placement. Please contact customer service for assistance.",
          },
          {
            question: "Are prices inclusive of tax?",
            answer:
              "Displayed prices do not include sales tax. Tax will be calculated at checkout based on your location.",
          },
        ],
      },
    ],
    he: [
      {
        category: "מוצרים ומידות",
        items: [
          {
            question: "איך אני מוצא את המידה שלי?",
            answer:
              'אנו מספקים מדריכי מידות מפורטים לכל מוצר. ניתן למצוא את טבלת המידות על ידי לחיצה על הקישור "מדריך מידות" בכל דף מוצר.',
          },
          {
            question: "באילו חומרים אתם משתמשים?",
            answer:
              "אנו משתמשים בחומרים איכותיים שמקורם מספקים אתיים. כל דף מוצר מציג מידע מפורט על החומרים.",
          },
          {
            question: "האם המוצרים שלכם בני-קיימא?",
            answer:
              "כן, אנו מחויבים לקיימות. אנו משתמשים בחומרים ידידותיים לסביבה ותהליכי ייצור אתיים.",
          },
        ],
      },
      {
        category: "משלוח והחזרות",
        items: [
          {
            question: "מהם זמני המשלוח שלכם?",
            answer:
              "הזמנות מקומיות מגיעות בדרך כלל תוך 3-5 ימי עסקים. משלוח בינלאומי לוקח 7-14 ימי עסקים.",
          },
          {
            question: "מה מדיניות ההחזרות שלכם?",
            answer:
              "אנו מציעים החזרות חינם תוך 30 יום מהרכישה. הפריטים חייבים להיות ללא שימוש עם תגיות מקוריות מחוברות.",
          },
          {
            question: 'האם אתם שולחים לחו"ל?',
            answer:
              "כן, אנו שולחים לרוב המדינות בעולם. עלויות וזמני משלוח משתנים לפי מיקום.",
          },
        ],
      },
      {
        category: "הזמנות ותשלום",
        items: [
          {
            question: "אילו אמצעי תשלום אתם מקבלים?",
            answer:
              "אנו מקבלים את כל כרטיסי האשראי העיקריים, PayPal ו-Apple Pay.",
          },
          {
            question: "האם אני יכול לשנות את ההזמנה שלי?",
            answer:
              "ניתן לשנות הזמנות תוך שעה מההזמנה. אנא צרו קשר עם שירות הלקוחות לעזרה.",
          },
          {
            question: 'האם המחירים כוללים מע"מ?',
            answer:
              'המחירים המוצגים אינם כוללים מע"מ. המס יחושב בקופה בהתאם למיקום שלך.',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-black pb-32 pt-6">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
              {language === "en" ? "FAQ" : "שאלות נפוצות"}
            </h1>
            <p className="text-xl text-gray-400">
              {language === "en"
                ? "Find answers to frequently asked questions"
                : "מצא תשובות לשאלות נפוצות"}
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {faqs[language].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-3xl bg-[#1A1A1A] p-8"
              >
                <h2 className="mb-6 text-2xl font-semibold text-white">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <AccordionItem
                      key={itemIndex}
                      value={`item-${index}-${itemIndex}`}
                      className="border-b border-gray-800"
                    >
                      <AccordionTrigger className="text-left text-white hover:text-[#9FE65C] [&[data-state=open]]:text-[#9FE65C]">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-400">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
