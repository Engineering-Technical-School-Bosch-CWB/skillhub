import { Path } from "react-hook-form"

export interface IField<T = any> {
    name: Path<T> | string
    label?: string
    type?: "text" | "password" | "date"
    required?: boolean
}

const Input = ({}: IField) => {
    
}