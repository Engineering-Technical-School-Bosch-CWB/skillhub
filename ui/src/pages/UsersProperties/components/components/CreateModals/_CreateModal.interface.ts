import { UserPropsType } from "../../PropertiesTable.interface";


export interface ICreateModalProps {
    kind?: UserPropsType,
    isOpen?: boolean,
    onClose?: () => void,
    onChange?: (data: any) => void,
}