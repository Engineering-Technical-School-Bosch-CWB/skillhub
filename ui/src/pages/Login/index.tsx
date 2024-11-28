import BoschLogo from "../../components/BoschLogo";
import Form from "../../components/Form";
import { IFormInput } from "../../components/Form/types";
import styles from "./styles.module.css"

export const Login = () => {
    
    const fields:IFormInput[] = [
        { fieldName: "edv", label: "Identification(EDV)", required: true },
        { fieldName: "password", label: "Password", type: "password", required: false }
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