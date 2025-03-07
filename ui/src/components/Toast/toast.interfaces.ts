import { TypeOptions } from "react-toastify"

export interface IToastProps {
    kind?:  TypeOptions
    title?: string,
    message?: string,
    icon?: string
}

export interface IToastContainerProps {
    data?: IToastProps,
    toastId?: string
}

export const toast = ({}:IToastProps) => {
    return toast
}