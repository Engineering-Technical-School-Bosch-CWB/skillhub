import { Tabs } from "../../links";

export interface ICreateModalProps {
    kind?: Tabs,
    isOpen?: boolean,
    onClose?: () => void,
    onChange?: (data: any) => void,
    setDisabled?: (data: boolean) => void
}