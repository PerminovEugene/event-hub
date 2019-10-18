import { LanguageDetector } from 'i18next-express-middleware';
var i18next = require('i18next').default;

i18next.use(LanguageDetector).init({
  preload: ['en', 'ru'],
  // ...otherOptions
});
