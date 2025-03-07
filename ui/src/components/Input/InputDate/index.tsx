import { styled } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { IRootInputProps } from "../interfaces";
import InputContainer from "../InputContainer";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";

export interface IInputDateProps extends IRootInputProps {
    type: "date",
    hasForm: true,
}

const InputDate = forwardRef<HTMLInputElement, IInputDateProps>(
    ({ error, hasForm, label, helperText, id, fieldName, dateChange, value, className, disabled, ...props }, ref) => {

        const formContext = useFormContext();

        const handleSetValue = (value: dayjs.Dayjs | null) => {

            if (fieldName || hasForm) {
                const { setValue } = formContext;
                if (setValue && fieldName)
                    setValue(fieldName, value?.format("YYYY-MM-DD"))
                return
            }
            if (value && dateChange)
                dateChange(value);

        }

        const getDefaultValue = (): Dayjs => {
            let defaultValue = value?.toString().split("/") ?? "";
            let res = dayjs(`${defaultValue[2]}-${defaultValue[1]}-${defaultValue[0]}`);
            return res;
        }

        return (
            <InputContainer
                error={error}
                helperText={helperText}
                id={id}
                width={props.width}
            >
                <SInput
                    className={className}
                    label={label}
                    error={error}
                    ref={ref}
                    format="DD/MM/YYYY"
                    slotProps={{
                        textField: {
                            required: props.required,
                        },
                    }}
                    disabled={disabled}
                    value={value ? getDefaultValue() : undefined}
                    onChange={(value) => handleSetValue(value)}
                />
            </InputContainer>
        )
    })

const SInput = styled(DatePicker)<{ error?: boolean }>(({ error }) => ({
    width: "100%",
    height: "100%",

    "> div": {
        height: "100%",
        borderRadius: 0,
        border: error ? "var(--danger-border)" : "",
    },

    ".css-1dune0f-MuiInputBase-input-MuiOutlinedInput-input": {
        display: "flex",
        alignItems: "center"
    }

}))

export default InputDate