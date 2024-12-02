import { Dispatch, SetStateAction } from "react";

export interface IHistoryModalProps {
    isOpen: boolean,
    handleIsOpen: Dispatch<SetStateAction<boolean>>
}