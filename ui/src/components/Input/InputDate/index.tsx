import { styled } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { IRootInputProps } from "../interfaces";
import InputContainer from "../InputContainer";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

export interface IInputDateProps extends IRootInputProps {
    type: "date"
}

const InputDate = forwardRef<HTMLInputElement, IInputDateProps>(
    ({ error, label, helperText, id, fieldName }, ref) => 
{
    const { setValue } = useFormContext();

    return (
        <InputContainer
            error={error}
            helperText={helperText}
            id={id}
        >
            <SInput 
                label={label}
                error={error}
                ref={ref}
                format="DD/MM/YYYY"
                onChange={(value) => {
                    if(value && setValue && fieldName) {
                        setValue(fieldName, value.format("YYYY-MM-DD"))
                    }
                }}
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
    }
}))

export default InputDate