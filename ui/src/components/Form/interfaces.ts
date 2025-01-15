import { ZodTypeAny } from "zod";
import { IInputProps } from "../Input/interfaces";

export type IFormInput = IInputProps & {
    fieldName: string
    zodSchema?: ZodTypeAny
    label?: string
    type?: string
    required?: boolean
    locked?: boolean
    value?: string
}

export interface IFormProps<T> {
    onSubmit: (payload:T) => any
    customClassName?: string
    fields: IFormInput[]
    submitText?: string
}