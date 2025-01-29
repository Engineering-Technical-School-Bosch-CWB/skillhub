import Form from "../../components/Form";
import styles from "./styles.module.css"
import BoschLogo from "../../components/BoschLogo";
import internalAPI from "../../service/internal.services";

import { IFormInput } from "../../components/Form/interfaces";
import { useUserContext } from "../../contexts/user.context";
import { useNavigate } from "react-router-dom";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import toastifyUpdate from "../../constants/toastfyUpdate";

const Login = () => {
    const { setUser } = useUserContext();
    const navigate = useNavigate();

    const fields: IFormInput[] = [
        { fieldName: "Identification", label: "Identification(EDV)", required: true },
        { fieldName: "Password", label: "Password", type: "password", required: true }
    ];

    const handleSubmit = async (data: FieldValues) => {

        const apiRequest = async () => {

            const response = await internalAPI.jsonRequest("/login", "POST", undefined, data);

            if (!response || response.statusCode != 200)
                throw new Error(response.message);

            console.log(response);

            return response.data;
        };

        const message = toast.loading("Authenticating...");
        apiRequest().then(content => {

            toast.update(message, {
                ...toastifyUpdate,
                render: "Logged in successfully!",
                type: "success",
            })

            sessionStorage.setItem("@AUTH", content.authToken.token);
            setUser(content.user);

            if (content.firstLogin) {
                navigate("/complete-register");
                toast.info("Complete registration to gain access.");
                return;
            }

            navigate("/home");

        }).catch(err => {
            toast.update(message, {
                ...toastifyUpdate,
                render: err.message || "Invalid credentials.",
                type: "error",
            })
        })
    }

    return (
        <div className={styles.background}>
            <div className={styles.formContainer}>
                <BoschLogo />
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