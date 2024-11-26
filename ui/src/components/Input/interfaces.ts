import { IInputDateProps } from "./InputDate"
import { IInputTextProps } from "./InputText"
import { IInputContainerProps } from "./InputContainer"
import { IInputPasswordProps } from "./InputPassword"

export type IInputType = "text" | "password" | "date" | "email"

export interface IRootInputProps extends IInputContainerProps {
    id?: string
    type?: IInputType
    error?: boolean
}

export type IInputProps = IInputDateProps | IInputTextProps | IInputPasswordProps
