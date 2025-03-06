import Icon from "@/components/Icon";
import Text from "@/typography";
import { useEffect, useState } from "react"

interface IPasswordRequisitesProps {
    value?: string
}

import styles from "./styles.module.css"

export default ({ value }: IPasswordRequisitesProps) => {

    const [haveMinLength, setHaveMinLength] = useState(false);
    const [haveUpperCase, setHaveUpperCase] = useState(false);
    const [haveLowerCase, setHaveLowerCase] = useState(false);
    const [haveNumbers, setHaveNumbers] = useState(false);

    const validate = () => {
        const LowerCase = /(?=.*[a-z])/;
        const UpperCase = /(?=.*[A-Z])/;
        const minLength = (value?.length ?? 0) >= 8;
        const Numbers = /(?=.*\d)/;
        setHaveMinLength(minLength);
        setHaveLowerCase(LowerCase.test(value ?? ""));
        setHaveUpperCase(UpperCase.test(value ?? ""));
        setHaveNumbers(Numbers.test(value ?? ""))
    }

    useEffect(() => {
        validate();
    }, [value])

    return (
        <div className={styles.requisites_container}>
            <span className={haveMinLength ? styles.complete : styles.incomplete}>
                <Icon className={styles.indicator_icon} name={haveMinLength ? "check" : "close"} />
                <Text>Min 8 characters</Text>
            </span>
            <span className={haveNumbers ? styles.complete : styles.incomplete}>
                <Icon className={styles.indicator_icon} name={haveNumbers ? "check" : "close"} />
                <Text>Have Number</Text>
            </span>
            <span className={haveLowerCase ? styles.complete : styles.incomplete}>
                <Icon className={styles.indicator_icon} name={haveLowerCase ? "check" : "close"} />
                <Text>Lower Case</Text>
            </span>
            <span className={haveUpperCase ? styles.complete : styles.incomplete}>
                <Icon className={styles.indicator_icon} name={haveUpperCase ? "check" : "close"} />
                <Text>Upper Case</Text>
            </span>
        </div>
    )
}