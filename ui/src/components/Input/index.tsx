import InputText from "../InputText"
import SInput from "./InputDate"
import { v4 as uuid } from "uuid"
import { ReactNode, useState } from "react"
import { IInputContainerProps } from "./InputContainer"
import { IInputProps } from "./interfaces"

const Input = ({
    label,
    error,
    fullwidth,
    helperText,
    id = uuid(),
    fieldName,
    type,
    ...props
}: IInputProps & IInputContainerProps) => {

    const [input, setInput] = useState<ReactNode>()

    switch(type) {
        case "text":
            return <InputText {...props} />
        case "date":
            return <SInput {...props} />
    }
}

export default Input
