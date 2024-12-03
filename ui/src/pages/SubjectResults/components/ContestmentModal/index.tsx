import styled from "./styles.module.css";
import { Box, Modal } from "@mui/material";
import Text from "../../../../typography";
import { IModalProps } from "../../interfaces";

const ContestmentModal = ({ isOpen, handleIsOpen }: IModalProps) => {
    const handleClose = () => handleIsOpen(false);

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box >
                    <Text>Haha</Text>
                </Box>
            </Modal>
        </div>
    );
}

export default ContestmentModal;