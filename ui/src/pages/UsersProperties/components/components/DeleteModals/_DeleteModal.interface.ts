import { UserPropsType } from "../../PropertiesTable.interface"

export interface IDeleteModalProps {
    kind?: UserPropsType,
    id: number,
    isOpen?: boolean
    onClose?: () => void
}