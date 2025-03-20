import styles from "./styles.module.css"
import Button from "../Button";
import { IButtonGroupProps } from "./interfaces";
import { t } from "i18next";

const ButtonGroup = ({ submit, cancel, disabled }: IButtonGroupProps) => (
    <div className={styles.group}>
        <Button variant="outlined" onClick={cancel}>{t('buttons.cancel')}</Button>
        <Button variant="contained" onClick={submit} disabled={disabled} >{t('buttons.send')}</Button>
    </div>
)

export default ButtonGroup
