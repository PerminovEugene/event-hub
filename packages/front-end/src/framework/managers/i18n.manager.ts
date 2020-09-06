import { initReactI18next } from 'react-i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getEnvManager } from '../configuration/environment-manger-keeper';
const i18n = require('i18next').default; //TODO TS can't handle import here, need to configure build later

export enum I18nNamespaces {
  translations = 'translations',
}

const getOptions = () => {
  return {
    fallbackLng: 'en',
    load: 'languageOnly',
    ns: [I18nNamespaces.translations],
    defaultNS: I18nNamespaces.translations,

    saveMissing: true,
    debug: getEnvManager().getDebugI18n(),

    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
      format: (value: any, format: any, lng: any) => {
        if (format === 'uppercase') return value.toUpperCase();
        return value;
      },
    },
    wait: process && !process.release,
  };
};

export const initI18n = async () => {
  if (process && !process.release) {
    i18n
      .use(XHR)
      .use(initReactI18next)
      .use(LanguageDetector);
  }
  if (!i18n.isInitialized) {
    await i18n.init(getOptions() as any);
  }
  return i18n;
};
