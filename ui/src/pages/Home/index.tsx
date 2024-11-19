
import Link from "../../components/Link";
import Header from "../../components/Header";

import styles from './styles.module.css'
import GiftIcon from "../../icons/GiftIcon";
import ResultsIcon from "../../icons/ResultsIcon";
import TeamIcon from "../../icons/TeamIcon";
import EducationIcon from "../../icons/EducationIcon";
import UserIcon from "../../icons/UserIcon";

export const Home = () => {


    return (
        <>
            <Header/>

            <div className={styles.homeContainer} >
                <div className={styles.linksContainer}>
                    <div className={styles.linksCards}>
                        <Link className={styles.link} to="/Login">
                            <div className={styles.cardInside}>
                                <ResultsIcon className={styles.image}></ResultsIcon>
                                <span className={styles.textCard}>Results</span>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.linksCards}>
                        <Link className={styles.link} to="/Login">
                            <div className={styles.cardInside}>
                                <GiftIcon className={styles.image}></GiftIcon>
                                <span className={styles.textCard}>Birthdays</span>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.linksCards}>
                        <Link className={styles.link} to="/Login">
                            <div className={styles.cardInside}>
                                <TeamIcon className={styles.image}></TeamIcon>
                                <span className={styles.textCard}>Classes Overview</span>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.linksCards}>
                        <Link className={styles.link} to="/Login">
                            <div className={styles.cardInside}>
                                <EducationIcon className={styles.image}></EducationIcon>
                                <span className={styles.textCard}>Curricular Unit Overview</span>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.linksCards}>
                        <Link className={styles.link} to="/Login">
                            <div className={styles.cardInside}>
                                <UserIcon className={styles.image}></UserIcon>
                                <span className={styles.textCard}>Users Overview</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}