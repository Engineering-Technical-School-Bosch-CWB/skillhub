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
import { t } from "i18next";

export const CompleteRegistering = () => {
    const { user, setUser } = useUserContext();
    const navigate = useNavigate();
    const userPosition = `${user?.position?.name} - ${user?.sector?.name} - ${user?.occupationArea?.name}`;

    const handleSubmit = async (data: FieldValues) => {

        if (data.password != data.passwordconfirm)
            return toast.error(t('errors.passwordMustMatch'));

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
        const message = toast.loading(t('completeRegistration.updating'));
        apiRequest().then(content => {
            toast.update(message, {
                ...toastifyUpdate,
                render: t('completeRegistration.updated'),
                type: "success"
            })

            setUser(content);
            navigate("/home");
        }).catch(err => {
            toast.update(message, {
                ...toastifyUpdate,
                render: err.message || t('completeRegistration.invalidCredentials'),
                type: "error"
            })
        })
    }

    const fields: IFormInput[] = [
        { fieldName: "fullname", label: t('completeRegistration.fields.fullName'), required: true, value: user?.name, maxLength: 500 },
        { fieldName: "birthday", label: t('completeRegistration.fields.birth'), required: true, type: "date", max:'today' },
        { fieldName: "identification", label: t('completeRegistration.fields.identification'), required: true, locked: true, value: user?.identification, maxLength: 100 },
        { fieldName: "position", label: t('completeRegistration.fields.position'), required: true, locked: true, value: userPosition },
        { fieldName: "password", label: t('completeRegistration.fields.password'), type: "password", required: true, maxLength: 255, password: true },
        { fieldName: "passwordconfirm", label: t('completeRegistration.fields.confirmPassword'), type: "password", required: true, maxLength: 255 }
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