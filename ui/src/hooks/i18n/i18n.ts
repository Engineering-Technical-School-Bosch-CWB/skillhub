import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import us from './locales/us.json';
import ptbr from './locales/pt-br.json'

i18n
    .use(initReactI18next)
    .init({
        resources: {
            us: {...us},
            ptbr: {...ptbr}
        },
        lng: 'us'
    })

export default i18n;