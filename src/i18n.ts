import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translations from "./locales";

export const supportedLngs = {
  en: "English",
  ua: "Ukrainian",
};

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  supportedLngs: Object.keys(supportedLngs),
  interpolation: {
    escapeValue: false,
  },
  resources: translations,
});
