import IIdentificationCardProps from "../Components/IdentificationCard/interfaces";

export interface IExplorerContainerProps {
    title: string
    subtitle?: string
    onAddHandle?: Function
    data: IIdentificationCardProps[]
    folderData?: IIdentificationCardProps[]
    input: {
        search: string,
        onChange: (str: string) => void
    }
    filter?: {
        name: string
        params: {
            key: string
            value: number
        }[]
        setValue: Function
    }[]
    button?: {
        icon: string
        onClick: Function
    }
}
