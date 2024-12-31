import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Mail, Phone } from "lucide-react";
import {
  validateEmail,
  validateRequired,
  getErrorMessage,
} from "@/tests/utils/validation";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactPage() {
  const { language } = useI18n();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!validateRequired(formData.name)) {
      newErrors.name = getErrorMessage("Name", "required");
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = getErrorMessage("", "email");
    }

    if (!validateRequired(formData.message)) {
      newErrors.message = getErrorMessage("Message", "required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", message: "" });
      }, 3000);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: language === "en" ? "Email" : "אימייל",
      value: "contact@senseclothing.com",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: language === "en" ? "Phone" : "טלפון",
      value: "+1 (555) 123-4567",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: language === "en" ? "Live Chat" : "צ'אט חי",
      value: language === "en" ? "Available 24/7" : "זמין 24/7",
    },
  ];

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
              {language === "en" ? "Contact Us" : "צור קשר"}
            </h1>
            <p className="text-xl text-gray-400">
              {language === "en"
                ? "We're here to help and answer any question you might have"
                : "אנחנו כאן לעזור ולענות על כל שאלה שיש לך"}
            </p>
          </div>

          {/* Contact Information */}
          <div className="grid gap-6 md:grid-cols-3">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 rounded-3xl bg-[#1A1A1A] p-6"
              >
                <div className="rounded-full bg-[#9FE65C] p-3 text-black">
                  {info.icon}
                </div>
                <div>
                  <h3 className="font-medium text-white">{info.title}</h3>
                  <p className="text-gray-400">{info.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl bg-[#1A1A1A] p-8">
            <h2 className="mb-6 text-2xl font-semibold text-white">
              {language === "en" ? "Send us a message" : "שלח לנו הודעה"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {language === "en" ? "Name" : "שם"}
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name)
                        setErrors({ ...errors, name: undefined });
                    }}
                    className={`rounded-xl ${errors.name ? "border-red-500" : ""}`}
                    placeholder={language === "en" ? "Your name" : "השם שלך"}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {language === "en" ? "Email" : "אימייל"}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email)
                        setErrors({ ...errors, email: undefined });
                    }}
                    className={`rounded-xl ${errors.email ? "border-red-500" : ""}`}
                    placeholder={
                      language === "en" ? "Your email" : "האימייל שלך"
                    }
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">
                  {language === "en" ? "Message" : "הודעה"}
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message)
                      setErrors({ ...errors, message: undefined });
                  }}
                  className={`min-h-[150px] rounded-xl ${errors.message ? "border-red-500" : ""}`}
                  placeholder={
                    language === "en"
                      ? "How can we help you?"
                      : "כיצד נוכל לעזור לך?"
                  }
                />
                {errors.message && (
                  <p className="text-sm text-red-500">{errors.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full rounded-full bg-[#9FE65C] py-6 text-lg font-semibold text-black hover:bg-[#9FE65C]/90"
                disabled={isSubmitted}
              >
                {isSubmitted
                  ? language === "en"
                    ? "Message Sent!"
                    : "ההודעה נשלחה!"
                  : language === "en"
                    ? "Send Message"
                    : "שלח הודעה"}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
