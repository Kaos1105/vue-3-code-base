import { defineStore } from 'pinia';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { LocalStorageEnum } from '@/enums/localStorageEnum';

const { setItem } = useLocalStorage(LocalStorageEnum.LANGUAGE);

interface LanguageState {
  lang: string;
}

export const useLanguageStore = defineStore({
  id: 'language',

  state: (): LanguageState => ({
    lang: '',
  }),

  getters: {
    language: (state) => state.lang,
  },

  actions: {
    setLanguage(locale: string) {
      this.lang = locale;
      setItem(locale);
    },
  },
});
