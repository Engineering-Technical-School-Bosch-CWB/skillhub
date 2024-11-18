import Form, { IField } from "../../components/Form"
import styles from "./styles.module.css"

export const CompleteRegistering = () => {
    const fields: IField[] = [
        { name: "fullname", label: "Full Name", required: true },
        { name: "birthday", label: "Date of Birth", required: true },
        { name: "identification", label: "Identification(EDV)", required: true },
        { name: "position", label: "Position", required: true },
        { name: "password", label: "Password",type:"password", required: true },
        { name: "passwordconfirm", label: "Password Confirm", type:"password", required: true }
      ];
    
    return (
        <div className={styles.background}>
            <div className={styles.formContainer}>
                <Form
                    fields={fields}
                    submitText="Enter"
                    onSubmit={(data) => console.log(data)}
                />
            </div>
        </div>
    )
}