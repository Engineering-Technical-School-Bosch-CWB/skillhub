import { styled } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { IRootInputProps } from "../interfaces";
import InputContainer from "../InputContainer";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";

export interface IInputDateProps extends IRootInputProps {
    type: "date",
    hasForm: true,
}

const InputDate = forwardRef<HTMLInputElement, IInputDateProps>(
    ({ error, hasForm, label, helperText, id, fieldName, dateChange }, ref) => 
{

    const formContext = useFormContext();

    const handleSetValue = (value: dayjs.Dayjs | null) => {

        if(hasForm)
        {
            const {setValue} = formContext;
            if(setValue && fieldName)
                setValue(fieldName, value?.format("YYYY-MM-DD"))
            return
        }
        if(value && dateChange)
            dateChange(value);
                
    }

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
    }
}))

export default InputDate