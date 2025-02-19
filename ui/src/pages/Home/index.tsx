import Header from "../../components/Header";
import styles from './styles.module.css';
import Card from "./components/Card";
import Progress from "@/components/Progress";

import { useUserContext } from "../../contexts/user.context";

const Home = () => {

    const { user } = useUserContext();

    return (
        <>
            <Header />
            <main>
                <div className={styles.homeContainer} >
                    <div className={styles.linksContainer}>
                        <Card to="/user-profile" label="User Profile" iconName="person" iconSize="md" />
                        {
                            user?.studentProfile &&
                            <Card to="/apprentice/results" label="Student Results" iconName="book_2" iconSize="md" />
                        }
                        <Card to="/birthdays" label="Birthdays" iconName="featured_seasonal_and_gifts" iconSize="md" />
                        {
                            user?.permissionLevel === 2 &&
                            <>
                                <Card to="/classes" label="Classes Overview" iconName="school" iconSize="md" />
                                <Card to="/school-content" label="School Content" iconName="book" iconSize="md" />
                                <Card to="/users" label="Users" iconName="people" iconSize="md" />
                            </>
                        }
                    </div>
                </div>
            </main>
        </>
    )
}

export default Home;