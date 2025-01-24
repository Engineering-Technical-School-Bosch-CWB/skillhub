import styles from "./styles.module.css";
import { useState } from "react";
import Text from "../../../../typography";
import { IModalProps } from "../../interfaces";
import Modal from "../../../../components/Modal";
import ButtonGroup from "../../../../components/ButtonGroup";
import Contestment from "./Contestment";

const ContestmentModal = ({ isOpen, handleIsOpen, skillId: competenceId }: IModalProps) => {
    const [selectedContestment, setSelectedContestment] = useState<string>("Apt");

    const handleClose = () => handleIsOpen(false);

    const handleSubmit = () => {

    };

    return (
        <div>
            <Modal open={isOpen} handleClose={handleClose} title="Competence Contestment">
                <div className={styles.information}>

                    <Text fontSize="xl" fontWeight="semibold" className={styles.title}>Utilizar operações I/O.</Text>

                    <div className={styles.content}>
                        <div className={styles.contestment_container}>
                            <Contestment option={selectedContestment} selectionHandler={setSelectedContestment}/>
                            <ButtonGroup cancel={handleClose} submit={handleSubmit}/>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ContestmentModal;