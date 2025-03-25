import styled from "./styles.module.css";
import Text from "../../../../typography";
import Modal from "../../../../components/Modal";
import TableView from "../../../../components/TableView";
import internalAPI from "../../../../service/internal.services";

import { IModalProps } from "../../interfaces";
import { ITableData } from "../../../../components/TableView/interfaces";
import { useEffect, useState } from "react";
import { formatDate } from "../../../../constants/formatDate";
import { t } from 'i18next';

const HistoryModal = ({ isOpen, handleIsOpen, skillId }: IModalProps) => {
    const handleClose = () => handleIsOpen(false);

    const [skillDescription, setSkillDescription] = useState("");
    const [evaluationCriteria, setEvaluationCriteria] = useState("");
    const [skillHistory, setSkillHistory] = useState<ITableData[]>([]);

    const getData = async () => {
        const response = await internalAPI.jsonRequest(`/skillResults/history/skill/${skillId}`, "GET");

        const content = response.data;

        setSkillDescription(content.skill.description);
        setEvaluationCriteria(content.skill.evaluationCriteria);
        setSkillHistory(content.resultHistory.map((r: { reason: string; date: string; aptitude: string; }) => ({
            date: !r.date ? "---" : formatDate(r.date),
            reason: r.reason,
            aptitude: r.aptitude
        })))

    }

    useEffect(() => {
        getData();
    }, [skillId])

    return (
        <div>
            <Modal open={isOpen} handleClose={handleClose} title={t('components.tableView.skillHistory')}>
                <div className={styled.information}>
                    <Text fontSize="xl" fontWeight="semibold">{skillDescription}</Text>
                    <Text>{evaluationCriteria}</Text>
                </div>
                <TableView data={skillHistory} hasNotation={false} hasOptions={false} />
            </Modal>
        </div>
    );
}

export default HistoryModal;