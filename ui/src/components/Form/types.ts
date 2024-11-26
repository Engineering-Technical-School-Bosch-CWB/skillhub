import { ZodType } from "zod";
import { IInputProps } from "../Input/interfaces";
import { IInputContainerProps } from "../Input/InputContainer";

export type IFormInput = IInputProps & IInputContainerProps

export interface IFormProps<T> {
    onSubmit: (payload:T) => any
    customClassName?: string
    fields: IInputProps[]
    submitText?: string
    schema?: ZodType<any, any, any>
}