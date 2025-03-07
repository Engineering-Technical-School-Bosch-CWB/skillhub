import styles from "./styles.module.css"
import Button from "../Button";
import { IButtonGroupProps } from "./interfaces";

const ButtonGroup = ({ submit, cancel, disabled }: IButtonGroupProps) => (
    <div className={styles.group}>
        <Button variant="outlined" onClick={cancel}>Cancel</Button>
        <Button variant="contained" onClick={submit} disabled={disabled} >Submit</Button>
    </div>
)

export default ButtonGroup
