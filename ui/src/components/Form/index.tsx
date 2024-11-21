import { FieldValues, Path, PathValue, SubmitHandler, useForm } from "react-hook-form";
import InputText from "../InputText";
import Button from "../Button";
import styles from "./styles.module.css"
import { IFormProps } from "./types";
import { zodResolver } from "@hookform/resolvers/zod"
import InputDate from "../InputDate";

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
    submitText = "Submit",
    schema,
}:IFormProps<T>): JSX.Element {

    const { 
        register, 
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<T>({
        resolver: schema && zodResolver(schema),
        mode: "onBlur"
    })

    const submit:SubmitHandler<T> = async (data) => 
        await onSubmit(data)

    return (
        <form 
            className={`${styles.form} ${customClassName}`}
            onSubmit={handleSubmit(submit)}
        >
            {fields.map((field, i) => {
                const id = `${field.name}-${i}`

                switch(field.type) {
                    case "date":
                        register(field.name)
                        return <InputDate
                            label={field.label}
                            onChange={(newValue) => {
                                if(newValue) {
                                    setValue(field.name, 
                                        newValue.format("YYYY-MM-DD") as PathValue<T, Path<T>>)
                                }
                            }}
                        />
                    default: 
                        return <InputText
                            key={id}
                            id={id}
                            type={field.type}
                            label={field.label}
                            {...register(field.name)}
                            fullwidth
                            required={field.required}
                            error={errors[field.name] && String(errors[field.name])}
                        />
                }
            })}

            <Button
                className={styles.submit_button}
                variant="contained"
                type="submit"
            >{ submitText }</Button>
        </form>
    )
}