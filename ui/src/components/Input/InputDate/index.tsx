import { styled } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { IRootInputProps } from "../interfaces";
import InputContainer from "../InputContainer";
import { forwardRef } from "react";

export interface IInputDateProps extends IRootInputProps {
    type: "date"
}

const InputDate = forwardRef<HTMLInputElement, IInputDateProps>(
    ({ error, label, helperText, id }, ref) => (

    <InputContainer
        error={error}
        helperText={helperText}
        id={id}
    >
        <SInput 
            label={label}
            error={error}
            ref={ref}
        />
    </InputContainer>
))

const SInput = styled(DatePicker)<{ error?: boolean }>(({ error }) => ({
    width: "100%",
    height: "100%",

    "> div": {
        height: "100%",
        borderRadius: 0,
        borderColor: error ? "var(--error-light)" : "var(--gray-200)",
    }
}))

export default InputDate