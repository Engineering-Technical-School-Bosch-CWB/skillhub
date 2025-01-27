import { IInputDateProps } from "./InputDate"
import { IInputTextProps } from "./InputText"
import { IInputContainerProps } from "./InputContainer"
import { IInputPasswordProps } from "./InputPassword"
import { ComponentPropsWithoutRef } from "react"
import { IInputCheckBoxProps } from "./InputCheckBox"

export type IInputType = "text" | "password" | "date" | "email" | "checkBox" | "number"

export interface IRootInputProps extends IInputContainerProps, ComponentPropsWithoutRef<'input'> {
    id?: string
    type?: IInputType
    error?: boolean
    fieldName?: string
}

export type IInputProps = IInputDateProps | IInputTextProps | IInputPasswordProps | IInputCheckBoxProps
