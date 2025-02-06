import { Tabs } from "../../links";

export interface IDeleteModalProps {
    kind?: Tabs,
    id: number,
    isOpen?: boolean
    onClose?: () => void
}