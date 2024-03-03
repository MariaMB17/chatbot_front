// i18n.ts
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: 'en',
    resources: {},
  });

export default i18next;
