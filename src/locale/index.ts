import { createI18n } from 'vue-i18n';
import { LOCALE } from '@/enums/localeEnum';

import english from './en';
import japan from './ja';

const messages: any = {
  en: { ...english },
  ja: { ...japan },
};

const i18n = createI18n({
  locale: LOCALE.JA, // set locale
  fallbackLocale: LOCALE.EN, // set fallback locale
  messages,
});

export default i18n;
