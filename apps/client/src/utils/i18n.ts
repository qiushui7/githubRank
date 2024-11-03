import { createI18n } from 'vue-i18n';
import en from './locales/en';
import zh from './locales/zh';

export const availableLocales = [
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
];

export const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages: {
    en,
    zh,
  },
});
