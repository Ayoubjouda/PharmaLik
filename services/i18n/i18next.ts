import { I18n } from 'i18n-js';

// Set the key-value pairs for the different languages you want to support.
const translations = {
  en: { search: 'search for pharmacy' },
  ar: { search: 'بحث عن صيدلية' },
  fr: { search: 'recherche de pharmacie' },
};
export const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = 'en';
i18n.enableFallback = true;
