import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import zh from "./lang/zh";
import en from "./lang/en";
import ja from "./lang/ja";

i18n.use(initReactI18next).init({
  resources: {
    zh: {
      translation: zh,
    },
    en: {
      translation: en,
    },
    ja: {
      translation: ja,
    },
  },
  lng: "zh",
});

export default i18n;
