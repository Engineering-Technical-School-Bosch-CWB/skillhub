export interface ITableData {
    [key: string]: string | number;
}

export interface IOption {
    iconName: string,
    function: (...props: any[]) => void
}

export interface ITableViewProps {
    data: ITableData[],
    hasOptions: boolean,
    options?: IOption[],
    hasNotation: boolean
}