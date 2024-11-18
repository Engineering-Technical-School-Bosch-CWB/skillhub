import { FieldValues, Path, SubmitHandler, useForm } from "react-hook-form";
import Input from "../Input";
import Button from "../Button";
import styles from "./styles.module.css"

export interface IField<T = any> {
    name: Path<T>;
    label?: string;
    type?: "text" | "password";
    required?: boolean;
}

interface IFormProps<T> {
    onSubmit: (payload:T) => any;
    customClassName?: string;
    fields: IField<T>[];
    submitText?: string;
}

/**
 * Reusable `Form` component for rendering a form with customizable fields.
 * Uses `react-hook-form` for form management, making it easy to add fields dynamically,
 * handle validation, and process submissions.
 *
 * @template T - The type of form field values, extending FieldValues to support react-hook-form integration.
 * 
 * @param {IFormProps<T>} props - The properties object for configuring the `Form` component.
 * @param {(payload: T) => Promise<void> | void} props.onSubmit - Function to handle form submission, receiving form data as an argument.
 * @param {string} [props.customClassName] - Optional CSS class name for styling the form container.
 * @param {IField<T>[]} props.fields - Array of field configurations, each specifying a name, label, and optional type (e.g., "text" or "password").
 * @param {string} [props.submitText="Submit"] - Optional text for the submit button; defaults to "Submit" if not provided.
 *
 * @returns {JSX.Element} The form element, with fields mapped to `Input` components based on `fields` configuration.
 *
 * @example
 * ```tsx
 * const fields: IField[] = [
 *   { name: "email", label: "Email", type: "text" },
 *   { name: "password", label: "Password", type: "password" }
 * ];
 *
 * function handleFormSubmit(data: { email: string, password: string }) {
 *   console.log(data);
 * }
 *
 * <Form
 *   onSubmit={handleFormSubmit}
 *   fields={fields}
 *   customClassName="custom-form"
 *   submitText="Sign In"
 * />
 * ```
 */
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
                    required={field.required}
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