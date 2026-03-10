"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import global_uz from "../../public/locales/uz/common.json";
import global_ru from "../../public/locales/rus/common.json";
import global_en from "../../public/locales/en/common.json";

i18n.use(initReactI18next).init({
  resources: {
    uz: { global: global_uz },
    ru: { global: global_ru },
    en: { global: global_en },
  },
  lng: "uz",
  supportedLngs: ["uz", "ru", "en"],
  fallbackLng: "uz",
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
