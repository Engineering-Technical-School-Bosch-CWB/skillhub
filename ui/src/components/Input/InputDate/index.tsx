import { styled } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { IRootInputProps } from "../interfaces";

export interface IInputDateProps extends IRootInputProps {
    type: "date"
}

const InputDate = ({ error }: IInputDateProps) => {
    return (
        <SInput 
            error={error}
        />
    )
}

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