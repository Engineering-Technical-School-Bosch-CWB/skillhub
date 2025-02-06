import { Tabs } from "../../links";

export interface IUpdateModalProps {
    kind?: Tabs,
    id: number,
    isOpen?: boolean
    onChange?: (data: any) => void,
    onClose?: () => void
}