import { ChangeEvent } from "react"

export interface ISelectData{
    key: string,
    value: string,
    selected? : boolean,
    disabled? : boolean
}

export interface ISelectProps {
    data : ISelectData[],
    label?: string,
    name?: string,
    id?: string,
    disabled?: boolean,
    hasDefault?: boolean,
    onChange?:  (e: ChangeEvent<HTMLSelectElement>) => void
}