import { v4 as uuid } from "uuid"
import { IInputProps, IInputType } from "./interfaces"
import InputDate from "./InputDate"
import InputText from "./InputText"
import InputPassword from "./InputPassword"
import { forwardRef } from "react"

const InputComponents: Record<IInputType, React.ElementType> = {
    date: InputDate,
    text: InputText,
    email: InputText,
    password: InputPassword,
};

const Input = forwardRef<HTMLInputElement, IInputProps>(
    ({type, id = uuid(), ...props }, ref) => {

    const Component = InputComponents[type]

    return (
        <Component ref={ref} id={id} type={type} {...props}/>
    )
})

export default Input
