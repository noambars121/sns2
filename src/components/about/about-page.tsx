import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export function AboutPage() {
  const { language } = useI18n();

  const content = {
    en: {
      title: "About SNS",
      subtitle: "A Sense of Style, A Touch of You",
      story:
        "Founded in 2024, SNS (Sense Clothing) was born from a passion for combining luxury with comfort. Our journey began with a simple idea: create clothing that makes you feel as good as you look.",
      mission:
        "Our mission is to redefine modern fashion by creating pieces that seamlessly blend sophistication with comfort, while maintaining our commitment to sustainability and ethical production.",
      values: [
        {
          title: "Quality First",
          description:
            "Every piece is crafted with meticulous attention to detail using premium materials.",
        },
        {
          title: "Sustainable Fashion",
          description:
            "We are committed to ethical production and sustainable practices.",
        },
        {
          title: "Innovation",
          description:
            "Constantly pushing boundaries in design and comfort technology.",
        },
      ],
    },
    he: {
      title: "אודות SNS",
      subtitle: "תחושה של סטייל, נגיעה של עצמך",
      story:
        "נוסד ב-2024, SNS (Sense Clothing) נולד מתוך תשוקה לשילוב יוקרה עם נוחות. המסע שלנו התחיל מרעיון פשוט: ליצור בגדים שיגרמו לך להרגיש טוב כמו שאתה נראה.",
      mission:
        "המשימה שלנו היא להגדיר מחדש את האופנה המודרנית על ידי יצירת פריטים המשלבים בצורה חלקה תחכום עם נוחות, תוך שמירה על המחויבות שלנו לקיימות וייצור אתי.",
      values: [
        {
          title: "איכות תחילה",
          description:
            "כל פריט מיוצר בתשומת לב קפדנית לפרטים תוך שימוש בחומרים מעולים.",
        },
        {
          title: "אופנה בת-קיימא",
          description: "אנו מחויבים לייצור אתי ולשיטות עבודה בנות-קיימא.",
        },
        {
          title: "חדשנות",
          description:
            "דוחפים באופן מתמיד את הגבולות בעיצוב ובטכנולוגיית הנוחות.",
        },
      ],
    },
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-black pb-32 pt-6">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
              {currentContent.title}
            </h1>
            <p className="text-xl text-gray-400">{currentContent.subtitle}</p>
          </div>

          {/* Story Section */}
          <div className="rounded-3xl bg-[#1A1A1A] p-8">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              {language === "en" ? "Our Story" : "הסיפור שלנו"}
            </h2>
            <p className="text-gray-300">{currentContent.story}</p>
          </div>

          {/* Mission Section */}
          <div className="rounded-3xl bg-[#1A1A1A] p-8">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              {language === "en" ? "Our Mission" : "המשימה שלנו"}
            </h2>
            <p className="text-gray-300">{currentContent.mission}</p>
          </div>

          {/* Values Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">
              {language === "en" ? "Our Values" : "הערכים שלנו"}
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {currentContent.values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-3xl bg-[#1A1A1A] p-6"
                >
                  <h3 className="mb-2 text-xl font-medium text-[#9FE65C]">
                    {value.title}
                  </h3>
                  <p className="text-gray-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
