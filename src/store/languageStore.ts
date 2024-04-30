import { create } from "zustand";

export enum LanguageType {
  zh = "zh",
  en = "en",
  ja = "ja",
}

interface BearState {
  language: LanguageType;
  changeLanguage: (language: LanguageType) => void;
}

export const useLanguage = create<BearState>((set) => ({
  language: LanguageType.zh,
  changeLanguage: (language) => set(() => ({ language: language })),
}));
