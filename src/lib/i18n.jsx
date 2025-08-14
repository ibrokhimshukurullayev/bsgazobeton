import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import global_uz from "../../public/locales/uz/common.json";
import global_ru from "../../public/locales/rus/common.json";
import global_en from "../../public/locales/en/common.json";

i18n.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: "uz_Uz",
  fallbackLng: "uz_Uz",
  resources: {
    uz: {
      global: global_uz,
    },
    en: {
      global: global_en,
    },
    ru: {
      global: global_ru,
    },
  },
});

export default i18n;
