import { Path } from "react-hook-form";

export interface IField<T = any> {
    name: Path<T>;
    label?: string;
    type?: "text" | "password";
    required?: boolean;
}

export interface IFormProps<T> {
    onSubmit: (payload:T) => any;
    customClassName?: string;
    fields: IField<T>[];
    submitText?: string;
}