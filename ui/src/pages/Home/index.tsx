import Link from "../../components/Link";
import Header from "../../components/Header";
import styles from './styles.module.css'
import Icon from "../../components/Icon";
import { RouteMap } from "../../router/map";

const Home = () => {
    return (
        <>
            <Header/>

            <div className={styles.homeContainer} >
                <div className={styles.linksContainer}>
                    <div className={styles.linksCards}>
                        <Link className={styles.link} to={RouteMap.NOT_FOUND}>
                            <div className={styles.cardInside}>
                                <Icon name="bar_chart_4_bars" size="md"/>
                                <span className={styles.textCard}>Results</span>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.linksCards}>
                        <Link className={styles.link} to={RouteMap.NOT_FOUND}>
                            <div className={styles.cardInside}>
                                <Icon name="featured_seasonal_and_gifts" size="md"/>
                                <span className={styles.textCard}>Birthdays</span>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.linksCards}>
                        <Link className={styles.link} to={RouteMap.NOT_FOUND}>
                            <div className={styles.cardInside}>
                                <Icon name="school" size="md"/>
                                <span className={styles.textCard}>Classes Overview</span>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.linksCards}>
                        <Link className={styles.link} to={RouteMap.NOT_FOUND}>
                            <div className={styles.cardInside}>
                                <Icon name="book_2" size="md"/>
                                <span className={styles.textCard}>Curricular Unit Overview</span>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.linksCards}>
                        <Link className={styles.link} to={RouteMap.NOT_FOUND}>
                            <div className={styles.cardInside}>
                                <Icon name="group" size="md"/>
                                <span className={styles.textCard}>Users Overview</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home