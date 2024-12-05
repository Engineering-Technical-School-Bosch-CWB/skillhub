import styles from "./styles.module.css";
import Text from "../../../../typography";
import { IModalProps } from "../../interfaces";
import Modal from "../../../../components/Modal";
import Divider from "../../../../components/Divider";
import Icon from "../../../../components/Icon";
import Button from "../../../../components/Button";
import { useEffect, useState } from "react";
import ButtonGroup from "../../../../components/ButtonGroup";

const ContestmentModal = ({ isOpen, handleIsOpen, competenceId }: IModalProps) => {
    const [optionsShowing, setOptionsShowing] = useState<boolean>(false);
    const [selectedContestment, setSelectedContestment] = useState<string>("Apt");

    const handleClose = () => handleIsOpen(false);

    const handleStyle = () => {
        switch (selectedContestment) {
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
        setSelectedContestment(status);
    }

    useEffect(() => {
        console.log(optionsShowing);
    }, []);

    return (
        <div>
            <Modal open={isOpen} handleClose={handleClose} title="Competence Contestment">
                <div className={styles.information}>

                    <Text fontSize="xl" fontWeight="semibold" className={styles.title}>Utilizar operações I/O.</Text>
                    <div className={styles.content}>
                        <div className={styles.contestment_container}>
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
                                    >{selectedContestment}</div>

                                    <div className={optionsShowing ? styles.options : styles.hidden}>
                                        <div onClick={() => handleClick("Apt")}><Text>Apt</Text></div>
                                        <div onClick={() => handleClick("In Development")}><Text>In Development</Text></div>
                                        <div onClick={() => handleClick("Inapt")}><Text>Inapt</Text></div>
                                    </div>
                                </div>
                            </div>
                            <ButtonGroup submit={handleClick} cancel={handleClose} />
                        </div>
                    </div>

                </div>
            </Modal>
        </div>
    );
}

export default ContestmentModal;