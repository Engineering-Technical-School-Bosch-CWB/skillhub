import { useContext } from "react";
import BoschLogo from "../../components/BoschLogo";
import Form from "../../components/Form";
import { IFormInput } from "../../components/Form/types";
import styles from "./styles.module.css"
import { UserContext } from "../../contexts/user.context";
import { useNavigate } from "react-router-dom";
import internalAPI from "../../service/internal.services";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

const Login = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    
    const fields:IFormInput[] = [
        { fieldName: "Identification", label: "Identification(EDV)", required: true },
        { fieldName: "Password", label: "Password", type: "password", required: true }
    ];

    const handleSubmit = async (data: FieldValues) => {
        const response = await internalAPI.jsonRequest('/login', 'POST', undefined, data);

        if(response.statusCode != 200) {
            toast.error("Invalid credentials.");
            return;
        }

        sessionStorage.setItem("@AUTH", response.data.token);
        setUser(response.data.user);
        navigate("/home");
        toast.success("Logged in successfully!");
    }
    
    return (
        <div className={styles.background}>
            <div className={styles.formContainer}>
                <BoschLogo/>
                <Form
                    fields={fields}
                    submitText="Enter"
                    onSubmit={(data) => handleSubmit(data)}
                >
                </Form>
            </div>
        </div>
    )
}

export default Login;