const i18n = require('i18next').default;
import { initReactI18next } from 'react-i18next';
import en from './locales/en';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: false,
  lng: 'en', // 'en' | 'es'
  // Using simple hardcoded resources for simple example
  resources: {
    en: en,
    ru: {
      'sign-up': { header: 'Зарегестрироваться' },
    },
  },
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
