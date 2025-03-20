import InputDate from "./InputDate"
import InputText from "./InputText"
import InputCheckBox from "./InputCheckBox"
import InputPassword from "./InputPassword"

import { v4 as uuid } from "uuid"
import { IInputProps, IInputType } from "./interfaces"
import { forwardRef } from "react"

const InputComponents: Record<IInputType, React.ElementType> = {
    date: InputDate,
    text: InputText,
    email: InputText,
    number: InputText,
    password: InputPassword,
    checkBox: InputCheckBox
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
    ({type = "text", id = uuid(), ...props }, ref) => {

    const Component = InputComponents[type]

    return (
        <Component ref={ref} id={id} type={type} {...props}/>
    )
})

export default Input
