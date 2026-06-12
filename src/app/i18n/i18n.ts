import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import commonEn from "../../locales/en/common.json";
import landingEn from "../../locales/en/landing.json";
import commonEs from "../../locales/es/common.json";
import landingEs from "../../locales/es/landing.json";
import commonFr from "../../locales/fr/common.json";
import landingFr from "../../locales/fr/landing.json";
import commonZh from "../../locales/zh/common.json";
import landingZh from "../../locales/zh/landing.json";

import "./i18n-types";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "fr", "es", "zh"],
    defaultNS: "common",
    ns: ["common", "landing"],
    resources: {
      en: { common: commonEn, landing: landingEn },
      fr: { common: commonFr, landing: landingFr },
      es: { common: commonEs, landing: landingEs },
      zh: { common: commonZh, landing: landingZh },
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;