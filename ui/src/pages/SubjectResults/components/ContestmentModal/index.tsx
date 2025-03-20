import Contestment from "./Contestment";
import styles from "./styles.module.css";
import Text from "../../../../typography";
import Modal from "../../../../components/Modal";
import ButtonGroup from "../../../../components/ButtonGroup";
import internalAPI from "../../../../service/internal.services";

import { useEffect, useState } from "react";
import { IModalProps } from "../../interfaces";

const ContestmentModal = ({ isOpen, handleIsOpen, skillId }: IModalProps) => {
    const [selectedContestment, setSelectedContestment] = useState<string>("Skilled");

    const [skillDescription, setSkillDescription] = useState("");
    const [currentAptitude, setCurrentAptitude] = useState("");

    const getData = async () => {
        const response = await internalAPI.jsonRequest(`/skillResults/skill/${skillId}`, "GET");
        const content = response.data;

        setSkillDescription(content.description);
        setCurrentAptitude(content.aptitude);
    }

    const handleClose = () => handleIsOpen(false);

    const handleSubmit = () => {

    };

    useEffect(() => {
        getData();
    }, [skillId])

    return (
        <div>
            <Modal open={isOpen} handleClose={handleClose} title="Skill Contestment">
                <div className={styles.information}>

                    <Text fontSize="xl" fontWeight="semibold" className={styles.title}>{skillDescription}</Text>

                    <div className={styles.content}>
                        <div className={styles.contestment_container}>
                            <Contestment option={selectedContestment} selectionHandler={setSelectedContestment} current={currentAptitude}/>
                            <ButtonGroup cancel={handleClose} submit={handleSubmit}/>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ContestmentModal;