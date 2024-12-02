import { Dispatch, SetStateAction } from "react";

export interface IContestmentModalProps {
    isOpen: boolean,
    handleIsOpen: Dispatch<SetStateAction<boolean>>
}