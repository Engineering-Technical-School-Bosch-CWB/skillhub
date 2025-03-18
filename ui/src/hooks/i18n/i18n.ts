import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import us from './locales/us.json';
import ptbr from './locales/pt-br.json'

let storage = localStorage.getItem('lang');

if(!storage){
    localStorage.setItem('lang', 'ptbr');
    storage = 'ptbr';
}



i18n
    .use(initReactI18next)
    .init({
        resources: {
            us: {...us},
            ptbr: {...ptbr}
        },
        lng: storage
    })

export default i18n;