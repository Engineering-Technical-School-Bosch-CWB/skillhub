import Form from "../../components/Form"
import styles from "./styles.module.css"
import BoschLogo from "../../components/BoschLogo";
import internalAPI from "../../service/internal.services";

import { FieldValues } from "react-hook-form";
import { IFormInput } from "../../components/Form/interfaces";
import { useEffect } from "react";
import { useUserContext } from "../../contexts/user.context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import toastifyUpdate from "../../constants/toastfyUpdate";

export const CompleteRegistering = () => {
    const { user, setUser } = useUserContext();
    const navigate = useNavigate();
    const userPosition = `${user?.position?.name} - ${user?.sector?.name} - ${user?.occupationArea?.name}`;

    const handleSubmit = async (data: FieldValues) => {

        if (data.password != data.passwordconfirm)
            return toast.error("Passwords must match!");

        const apiRequest = async () => {
            const response = await internalAPI.jsonRequest(`/users/${user?.id}`, "PATCH", undefined, {
                name: data.fullname,
                birthday: data.birthday,
                password: data.password

            });

            if (!response.success)
                throw new Error(response.message);

            return response.data;
        }
        const message = toast.loading("Updating user registration...");
        apiRequest().then(content => {

            toast.update(message, {
                ...toastifyUpdate,
                render: "User registration updated!",
                type: "success"
            })

            setUser(content);
            navigate("/home");
        }).catch(err => {
            toast.update(message, {
                ...toastifyUpdate,
                render: err.message || "Invalid credentials.",
                type: "error"
            })
        })
    }

    const fields: IFormInput[] = [
        { fieldName: "fullname", label: "Full Name", required: true, value: user?.name, maxLength: 500 },
        { fieldName: "birthday", label: "Date of Birth", required: true, type: "date" },
        { fieldName: "identification", label: "Identification(EDV)", required: true, locked: true, value: user?.identification, maxLength: 100 },
        { fieldName: "position", label: "Position", required: true, locked: true, value: userPosition },
        { fieldName: "password", label: "Password", type: "password", required: true, maxLength: 255, password: true },
        { fieldName: "passwordconfirm", label: "Password Confirm", type: "password", required: true, maxLength: 255 }
    ];

    useEffect(() => {
        if (!user)
            navigate("/")
    }, []);

    return (
        <div className={styles.background}>
            <div className={styles.formContainer}>
                <BoschLogo />
                <Form
                    fields={fields}
                    submitText="Enter"
                    onSubmit={(data) => handleSubmit(data)}
                />
            </div>
        </div>
    )
}