import IIdentificationCardProps from "../Components/IdentificationCard/interfaces";

export interface IExplorerContainerProps {
    title: string,
    folderPath?: string,
    onAddHandle?: Function,
    data: IIdentificationCardProps[]
}
