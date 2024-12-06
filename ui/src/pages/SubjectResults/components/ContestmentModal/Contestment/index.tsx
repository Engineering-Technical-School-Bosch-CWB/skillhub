import styles from "./styles.module.css";
import Text from "../../../../../typography";
import Divider from "../../../../../components/Divider";
import Icon from "../../../../../components/Icon";
import { useEffect, useState } from "react";
import { IContestmentProps } from "./interfaces";

const Contestment = ({ option, selectionHandler }: IContestmentProps) => {
    const [optionsShowing, setOptionsShowing] = useState<boolean>(false);
    
    const handleStyle = () => {
        switch (option) {
            case "Apt":
                return styles.apt;

            case "Inapt":
                return styles.inapt;

            case "In Development":
                return styles.development;
        }
    }

    const handleClick = (status: string) => {
        setOptionsShowing(!optionsShowing);
        selectionHandler(status);
    }

    useEffect(() => {
        console.log(optionsShowing);
    }, []);

    return (
        <div style={{marginBottom: "3rem"}}>
            <div className={styles.header}>
                <Text>Current</Text>
                <Text>Contestment</Text>
            </div>

            <Divider size="small" />

            <div className={styles.contestment}>
                <div className={styles.inapt}>Inapt</div>

                <Icon name="arrow_right_alt" size="md" />

                <div className={styles.select_button}>
                    <div
                        className={handleStyle()}
                        onClick={() => setOptionsShowing(!optionsShowing)}
                    >{option}</div>

                    <div className={optionsShowing ? styles.options : styles.hidden}>
                        <div onClick={() => handleClick("Apt")}><Text>Apt</Text></div>
                        <div onClick={() => handleClick("In Development")}><Text>In Development</Text></div>
                        <div onClick={() => handleClick("Inapt")}><Text>Inapt</Text></div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Contestment;