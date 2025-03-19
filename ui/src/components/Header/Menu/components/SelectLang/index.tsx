import Text from "@/typography"
import { t } from "i18next"

import styles from './styles.module.css'

export default () => {

    const selectedLang = localStorage.getItem('lang')

    const toggleLang = (lang: string) => {
        if(lang == selectedLang) return

        localStorage.setItem('lang', lang);
        location.reload();
    }

    return (
        <section className={styles.lang_section}>
            <Text fontSize="lg" fontWeight="regular">{t('home.lang')}</Text>
            <span className={styles.flag_container}>
                <img src="public/image/br-flag.png" alt="br-flag" width={40} onClick={() => toggleLang('ptbr')} className={selectedLang == "ptbr" ? styles.selected : "" } />
                <img src="public/image/us-flag.png" alt="us-flag" width={40} onClick={() => toggleLang('us')} className={selectedLang == "us" ? styles.selected : "" } />
            </span>
        </section>
    )
}