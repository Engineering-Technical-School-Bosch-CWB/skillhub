import { v4 as uuid } from "uuid"
import { IInputContainerProps } from "./InputContainer"
import { IInputProps, IInputType } from "./interfaces"
import InputDate from "./InputDate"
import InputText from "./InputText"
import InputPassword from "./InputPassword"

const InputComponents: Record<IInputType, React.ElementType> = {
    date: InputDate,
    text: InputText,
    email: InputText,
    password: InputPassword,
};

const Input = ({
    type,
    id = uuid(),
    ...props
}: IInputProps & IInputContainerProps) => {

    const Component = InputComponents[type]

    return (
        <Component id={id} type={type} {...props}/>
    )
}

export default Input
