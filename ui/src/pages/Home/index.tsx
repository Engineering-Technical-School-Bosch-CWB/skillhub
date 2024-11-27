
import Link from "../../components/Link";
import Header from "../../components/Header";

import styles from './styles.module.css'
import GiftIcon from "../../icons/GiftIcon";
import ResultsIcon from "../../icons/ResultsIcon";
import TeamIcon from "../../icons/TeamIcon";
import EducationIcon from "../../icons/EducationIcon";
import UserIcon from "../../icons/userIcon";
import Card from "./components/Card";

export default () => {
    return (
        <>
            <Header/>

            <div className={styles.homeContainer} >
                <div className={styles.linksContainer}>
                    <Card to="/aprentice/results" icon={ResultsIcon} label="Results"/>
                    <Card to="/login" icon={GiftIcon} label="Birthdays"/>
                    <Card to="/login" icon={TeamIcon} label="Class Overview"/>
                    <Card to="/login" icon={EducationIcon} label="Curricular Unit Overview"/>
                    <Card to="/login" icon={UserIcon} label="User Overview"/>
                </div>
            </div>
        </>
    )
}