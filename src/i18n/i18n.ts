import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { translationEn } from './English/TranslationEn';

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: translationEn },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});