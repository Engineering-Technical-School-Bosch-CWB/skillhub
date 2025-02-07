import { UserPropsType } from "../../PropertiesTable.interface";

export interface IUpdateModalProps {
    kind?: UserPropsType,
    id: number,
    isOpen?: boolean
    onChange?: (data: any) => void,
    onClose?: () => void
}