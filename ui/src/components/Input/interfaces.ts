import { Path } from "react-hook-form"
import { IInputDateProps } from "./InputDate"
import { IInputTextProps } from "./InputText"

export interface IRootInputProps<T = any> {
    id?: string
    fieldName: Path<T>
    type?: "text" | "password" | "date"
    required?: boolean
    error?: boolean
}

export type IInputProps = IInputDateProps | IInputTextProps