import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";
import styles from "./styles.module.css"
import { IFormProps } from "./interfaces";
import { zodResolver } from "@hookform/resolvers/zod"
import Input from "../Input";
import { z, ZodTypeAny } from "zod";

/**
 * `Form` component: A dynamic and reusable form builder using `react-hook-form` and Zod for validation.
 *
 * Props:
 * - `onSubmit` (SubmitHandler<T>, required): A callback function triggered on form submission. Receives the form data as a parameter.
 * - `fields` (Array<{ fieldName: string; type: string; zodSchema?: ZodTypeAny; [key: string]: any; }>, required):
 *   An array of field configurations for rendering input fields. Each field includes:
 *     - `fieldName` (string): The name of the field, used as the key for form data.
 *     - `type` (string): The input type (e.g., "text", "email", "password").
 *     - `zodSchema` (ZodTypeAny, optional): A Zod schema for validating the field.
 *     - Any additional props supported by the `Input` component.
 * - `submitText` (string, optional): The text displayed on the submit button. Defaults to `"Submit"`.
 *
 * Example usage:
 * ```
 * import { z } from "zod";
 * import Form from "./Form";
 *
 * const fields = [
 *   {
 *     fieldName: "email",
 *     type: "email",
 *     zodSchema: z.string().email("Invalid email address"),
 *     label: "Email Address",
 *   },
 *   {
 *     fieldName: "password",
 *     type: "password",
 *     zodSchema: z.string().min(6, "Password must be at least 6 characters"),
 *     label: "Password",
 *   },
 * ];
 *
 * const handleSubmit = async (data) => {
 *   console.log("Form submitted:", data);
 * };
 *
 * <Form 
 *   fields={fields}
 *   onSubmit={handleSubmit}
 *   customClassName="custom-form-class"
 *   submitText="Sign In"
 * />;
 * ```
 *
 * Notes:
 * - The form is validated using Zod schemas provided in the `fields` prop.
 * - Errors are automatically displayed for each field using the `helperText` and `error` props.
 */
const Form = <T extends FieldValues>({
    onSubmit,
    customClassName,
    fields,
    submitText = "Submit",
}:IFormProps<T>) => {

    const schema = z.object(
        fields.reduce((acc, field) => {
          if (field.zodSchema) {
            acc[field.fieldName] = field.zodSchema;
          } else {
            acc[field.fieldName] = z.any();
          }
          return acc;
        }, {} as Record<string, ZodTypeAny>)
    );

    const formMethods = useForm<T>({
        resolver: zodResolver(schema),
        mode: "onBlur"
    })

    const { 
        register, 
        handleSubmit,
        formState: { errors },
    } = formMethods

    const submit:SubmitHandler<T> = async (data) => 
        await onSubmit(data)

    return (
        <form 
            className={`${styles.form} ${customClassName}`}
            onSubmit={handleSubmit(submit)}
        >
            <FormProvider {...formMethods}>
                {fields.map(({ fieldName, zodSchema, type, locked, value, ...field }, i) => {
                    const id = `${fieldName}-${i}`

                    return <Input
                        key={id} id={id} type={type}
                        {...register(fieldName as any)}
                        {...field}
                        fieldName={fieldName}
                        error={!!errors[fieldName]}
                        helperText={errors[fieldName]?.message as string | undefined}
                        value={value}
                        disabled={locked}
                    />
                })}

                <Button
                    className={styles.submit_button}
                    variant="contained"
                    type="submit"
                >{ submitText }</Button>
            </FormProvider>
        </form>
    )
}

export default Form
