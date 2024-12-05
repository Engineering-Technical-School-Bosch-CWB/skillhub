import IIdentificationCardProps from "../Components/IdentificationCard/IIdentificationCardProps";

export interface IExplorerContainerProps {
    title: string,
    folderPath?: string,
    onAddHandle?: Function,
    data: IIdentificationCardProps[]
}
