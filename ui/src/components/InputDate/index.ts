import { styled } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

const InputDate = styled(DatePicker)(() => ({
    maxHeight: 50,
    "> div": {
        maxHeight: 50,
        borderRadius: 0,
        borderColor: "var(--gray-200)",
    }
}))

export default InputDate