import { IInputDateProps } from "./InputDate"
import { IInputTextProps } from "./InputText"
import { IInputContainerProps } from "./InputContainer"

export type IInputType = "text" | "password" | "date" | "email"

export interface IRootInputProps extends IInputContainerProps {
    id?: string
    fieldName: string
    type?: IInputType
    required?: boolean
    error?: boolean
}

export type IInputProps = IInputDateProps | IInputTextProps