import Header from "../../components/Header";
import styles from './styles.module.css';
import Card from "./components/Card";

export default () => {
    return (
        <>
            <Header/>
            <div className={styles.homeContainer} >
                <div className={styles.linksContainer}>
                    <Card to="/aprentice/results" label="Results" iconName="book_2" iconSize="md"/>
                    <Card to="/login" label="Birthdays" iconName="featured_seasonal_and_gifts" iconSize="md"/>
                    <Card to="/class" label="Class Overview" iconName="school" iconSize="md"/>
                    <Card to="/login" label="Curricular Unit Overview" iconName="edit_square" iconSize="md"/>
                    <Card to="/login" label="User Overview" iconName="person" iconSize="md"/>
                </div>
            </div>
        </>
    )
}