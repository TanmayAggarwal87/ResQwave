// store/useLanguageStore.ts
import { create } from "zustand";
import i18n from "../i18n";

type LanguageStore = {
  language: string;
  setLanguage: (lng: string) => void;
};

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: i18n.language, // default from i18n
  setLanguage: (lng) => {
    i18n.changeLanguage(lng);
    set({ language: lng });  
  },
}));
