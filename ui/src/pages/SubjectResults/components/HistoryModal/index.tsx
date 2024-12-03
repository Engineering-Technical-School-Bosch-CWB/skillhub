import styled from "./styles.module.css";
import Text from "../../../../typography";
import { IModalProps } from "../../interfaces";
import Modal from "../../../../components/Modal";
import TableView from "../../../../components/TableView";
import { ITableData } from "../../../../components/TableView/interfaces";

const data: ITableData[] = [
    {
        reason: "Exam 1",
        date: "10/05/2024",
        status: "Inapt"
    },
    {
        reason: "Exam 1",
        date: "28/05/2024",
        status: "In Development"
    },
    {
        reason: "Contestment",
        date: "12/06/2024",
        status: "Apt"
    },
]

const HistoryModal = ({ isOpen, handleIsOpen, competenceId }: IModalProps) => {
    const handleClose = () => handleIsOpen(false);

    return (
        <div>
            <Modal open={isOpen} handleClose={handleClose} title="Competence History">
                <div className={styled.information}>
                    <Text fontSize="xl" fontWeight="semibold">Utilizar operações I/O.</Text>
                    <Text>Utilizar a função scanf para armazenar input do usuário no caso de entrada de informações. No caso de saída, deverá usar a função printf para possibilitar a visualização de informações na tela.</Text>
                </div>
                <TableView data={data} hasNotation={false} hasOptions={false}/>
            </Modal>
        </div>
    );
}

export default HistoryModal;