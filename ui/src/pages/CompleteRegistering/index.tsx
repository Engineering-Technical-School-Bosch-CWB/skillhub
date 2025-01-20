import { FieldValues } from "react-hook-form";
import BoschLogo from "../../components/BoschLogo";
import Form from "../../components/Form"
import { IFormInput } from "../../components/Form/interfaces";
import styles from "./styles.module.css"
import internalAPI from "../../service/internal.services";
import { useContext, useEffect, useState } from "react";
import { useUserContext } from "../../contexts/user.context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const CompleteRegistering = () => {
    const { user, setUser } = useUserContext();
    const navigate = useNavigate();
    const userPosition = `${user?.position?.name} - ${user?.sector?.name} - ${user?.occupationArea?.name}`;

    const handleSubmit = async (data: FieldValues) => {
        const response = await internalAPI.jsonRequest("/users", 'POST', undefined, data);
        const content = response.data;
        console.log(content);

        if(response.statusCode != 200) {
            toast.error("Invalid fields.");
            return;
        } 

        setUser(content);
        navigate("/home");
    }

    const fields: IFormInput[] = [
        { fieldName: "fullname", label: "Full Name", required: true, value: user?.name },
        { fieldName: "birthday", label: "Date of Birth", required: true, type: "date" },
        { fieldName: "identification", label: "Identification(EDV)", required: true, locked: true, value: user?.identification },
        { fieldName: "position", label: "Position", required: true, locked: true, value: userPosition },
        { fieldName: "password", label: "Password",type:"password", required: true },
        { fieldName: "passwordconfirm", label: "Password Confirm", type:"password", required: true }
    ];

    return (
        <div className={styles.background}>
            <div className={styles.formContainer}>
                <BoschLogo/>
                <Form
                    fields={fields}
                    submitText="Enter"
                    onSubmit={(data) => console.log(data)}
                />
            </div>
        </div>
    )
}