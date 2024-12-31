import { create } from "zustand";
import { persist } from "zustand/middleware";

type Language = "en" | "he";

interface I18nStore {
  language: Language;
  direction: "ltr" | "rtl";
  setLanguage: (lang: Language) => void;
}

export const useI18n = create<I18nStore>(
  persist(
    (set) => ({
      language: "en",
      direction: "ltr",
      setLanguage: (lang) =>
        set({
          language: lang,
          direction: lang === "he" ? "rtl" : "ltr",
        }),
    }),
    {
      name: "i18n-storage",
      version: 1,
    },
  ),
);
