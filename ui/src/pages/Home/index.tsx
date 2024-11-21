import { toast } from "react-toastify";
import Header from "../../components/Header"
import Form from "../../components/Form";
import { IField } from "../../components/Form/types";

export default () => {

    const fields: IField[] = [
        { name: "email", label: "Email", type: "text" },
        { name: "password", label: "Password", type: "password" },
        { name: "birthdate", label: "Birthdate", type: "date" },
    ];

    return (
        <>
            <Header/>

            <div style={{ margin: "20vh auto", width: "100%", maxWidth: "500px" }}>
                <Form
                    fields={fields}
                    onSubmit={(data) => { toast.success(data.email) }}
                />
            </div>
        </>
    )
}