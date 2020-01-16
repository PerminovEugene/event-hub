import { initReactI18next } from 'react-i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
const i18n = require('i18next').default; //TODO TS can't handle import here, need to configure build later

const options = {
  fallbackLng: 'en',
  load: 'languageOnly', // we only provide en, de -> no region specific locals like en-US, de-DE
  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  saveMissing: true,
  debug: true,

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
    format: (value: any, format: any, lng: any) => {
      if (format === 'uppercase') return value.toUpperCase();
      return value;
    },
  },
  wait: process && !process.release,
};

// for browser use xhr backend to load translations and browser lng detector
if (process && !process.release) {
  i18n
    .use(XHR)
    .use(initReactI18next)
    .use(LanguageDetector);
}

// initialize if not already initialized
// if (!i18n.isInitialized) {
//   i18n.init(options as any);
// }

export const initI18n = async () => {
  if (!i18n.isInitialized) {
    await i18n.init(options as any);
  }
  return i18n;
};
// export default i18n;
