import BoschLogo from "../../components/BoschLogo";
import Form from "../../components/Form";
import { IField } from "../../components/Form/types";
import styles from "./styles.module.css"

export const Login = () => {
    const fields: IField[] = [
        { name: "edv", label: "Identification(EDV)", required: true },
        { name: "password", label: "Password", type: "password", required: true }
    ];
    
    return (
        <div className={styles.background}>
            <div className={styles.formContainer}>
                <BoschLogo/>
                <Form
                    fields={fields}
                    submitText="Enter"
                    onSubmit={(data) => console.log(data)}
                >
                </Form>
            </div>
        </div>
    )
}