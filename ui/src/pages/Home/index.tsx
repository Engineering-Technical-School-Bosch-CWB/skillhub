import Header from "../../components/Header"
import Form from "../../components/Form";
import { IFormInput } from "../../components/Form/types";
import { z } from "zod";
export default () => {

    const fields:IFormInput[] = [
        { fieldName: "email", label: "Email", type: "text", zodSchema: z.string().email() },
        { fieldName: "password", label: "Password", type: "password", zodSchema: z.string().min(8) },
        { fieldName: "birthdate", label: "Birthdate", type: "date", zodSchema: z.string() },
    ];

    return (
        <>
            <Header/>

            <div style={{ margin: "20vh auto", width: "100%", maxWidth: "500px" }}>
                <Form
                    fields={fields}
                    onSubmit={(data) => { console.log(data) }}
                />
            </div>
        </>
    )
}