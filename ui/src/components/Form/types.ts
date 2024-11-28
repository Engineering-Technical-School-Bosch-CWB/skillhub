import { ZodTypeAny } from "zod";
import { IInputProps } from "../Input/interfaces";

export type IFormInput = IInputProps & {
    fieldName: string
    zodSchema?: ZodTypeAny
}

export interface IFormProps<T> {
    onSubmit: (payload:T) => any
    customClassName?: string
    fields: IFormInput[]
    submitText?: string
}