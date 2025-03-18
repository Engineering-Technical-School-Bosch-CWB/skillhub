import Header from "../../components/Header";
import styles from './styles.module.css';
import Card from "./components/Card";

import { useUserContext } from "../../contexts/user.context";
import { t } from "i18next";

const Home = () => {

    const { user } = useUserContext();

    return (
        <>
            <Header />
            <main>
                <div className={styles.homeContainer} >
                    <div className={styles.linksContainer}>
                        <Card to="/user-profile" label={t('home.userProfile')} iconName="person" iconSize="md" />
                        {
                            user?.studentProfile &&
                            <Card to="/apprentice/results" label={t('home.studentResults')} iconName="book_2" iconSize="md" />
                        }
                        <Card to="/birthdays" label={t('home.birthdays')} iconName="featured_seasonal_and_gifts" iconSize="md" />
                        {
                            user?.permissionLevel === 2 &&
                            <>
                                <Card to="/curricular-units" label={t('home.curricularUnits')} iconName="design_services" iconSize="md" />
                                <Card to="/classes" label={t('home.classesOverview')} iconName="school" iconSize="md" />
                                <Card to="/school-content" label={t('home.schoolContent')} iconName="book" iconSize="md" />
                                <Card to="/users" label={t('home.users')} iconName="people" iconSize="md" />
                            </>
                        }
                    </div>
                </div>
            </main>
        </>
    )
}

export default Home;