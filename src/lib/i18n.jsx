"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import global_uz from "../../public/locales/uz/common.json";
import global_ru from "../../public/locales/rus/common.json";
import global_en from "../../public/locales/en/common.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      uz: { global: global_uz },
      ru: { global: global_ru },
      en: { global: global_en },
    },
    fallbackLng: "uz",
    debug: false,
    detection: {
      // 🔹 Tilni aniqlash tartibi
      order: ["localStorage", "cookie", "navigator"],
      caches: ["localStorage"], // foydalanuvchi tanlovini shu yerda saqlaydi
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
