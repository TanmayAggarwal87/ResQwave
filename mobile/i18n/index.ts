
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations
import en from "../locales/en.json";
import hi from "../locales/hi.json";
import mr from "../locales/mr.json";
import ta from "../locales/ta.json";
import te from "../locales/te.json"; 
import be from "../locales/be.json";  

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  mr: { translation: mr },
  ta: { translation: ta },
  te: { translation: te },
      be: { translation: be },  
};

i18n.use(initReactI18next).init({
  lng: "en", // Default language
  fallbackLng: "en",
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
