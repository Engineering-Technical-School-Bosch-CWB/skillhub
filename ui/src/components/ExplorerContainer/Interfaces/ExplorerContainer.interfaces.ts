import IIdentificationCardProps from "../Components/IdentificationCard/interfaces";

export interface IExplorerContainerProps {
    title: string,
    folderPath?: string,
    onAddHandle?: Function,
    data: IIdentificationCardProps[]
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
}
