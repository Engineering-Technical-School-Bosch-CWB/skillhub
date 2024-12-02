import styled from "./styles.module.css";
import { Box, Modal } from "@mui/material";
import { IContestmentModalProps } from "./interfaces";
import Text from "../../../../typography";

const ContestmentModal = ({ isOpen, handleIsOpen }: IContestmentModalProps) => {
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