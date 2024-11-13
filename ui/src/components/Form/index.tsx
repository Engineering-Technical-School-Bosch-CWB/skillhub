import { FieldValues, Path, SubmitHandler, useForm } from "react-hook-form";
import Input from "../Input";
import Button from "../Button";
import styles from "./styles.module.css"

export interface IField<T = any> {
    name: Path<T>;
    label?: string;
    type?: "text" | "password";
}

interface IFormProps<T> {
    onSubmit: (payload:T) => Promise<void> | void;
    customClassName?: string;
    fields: IField<T>[];
    submitText?: string;
}

export default function Form<T extends FieldValues>({
    onSubmit,
    customClassName,
    fields,
    submitText = "Submit"
}:IFormProps<T>) {

    const { register, handleSubmit } = useForm<T>()

    const submit:SubmitHandler<T> = async (data) => 
        await onSubmit(data)

    return (
        <form 
            className={`${styles.form} ${customClassName}`}
            onSubmit={handleSubmit(submit)}
        >
            {fields.map((field, i) => {
                const id = `${field.name}-${i}`

                return <Input
                    key={id}
                    id={id}
                    type={field.type}
                    label={field.label}
                    {...register(field.name)}
                    fullwidth
                />
            })}

            <Button
                className={styles.submit_button}
                variant="contained"
                type="submit"
            >{ submitText }</Button>
        </form>
    )
}