export interface IModalProps {
    isOpen: boolean,
    handleIsOpen: (...props: any[]) => void,
    competenceId: number
}