import { Path } from "react-hook-form";
import { ZodType } from "zod";

export interface IField<T = any> {
    name: Path<T>
    label?: string
    type?: "text" | "password" | "date"
    required?: boolean
}

export interface IFormProps<T> {
    onSubmit: (payload:T) => any
    customClassName?: string
    fields: IField<T>[]
    submitText?: string
    schema?: ZodType<any, any, any>
}