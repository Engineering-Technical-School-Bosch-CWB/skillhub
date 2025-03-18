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
import { useTranslation } from "react-i18next";

const Login = () => {
    const {t} = useTranslation();
    const { setUser } = useUserContext();
    const navigate = useNavigate();

    const fields: IFormInput[] = [
        { fieldName: "Identification", label: t("login.identification"), required: true, maxLength: 100 },
        { fieldName: "Password", label: "Password", type: "password", required: true, maxLength: 255 }
    ];

    const handleSubmit = async (data: FieldValues) => {

        const apiRequest = async () => {

            const response = await internalAPI.jsonRequest("/login", "POST", undefined, data);

            if (!response.success)
                throw new Error(response.message);

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