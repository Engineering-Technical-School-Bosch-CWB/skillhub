import Form, { IField } from "../../components/Form"
import Header from "../../components/Header"

export default () => {

    const fields: IField[] = [
        { name: "email", label: "Email", type: "text" },
        { name: "password", label: "Password", type: "password" }
    ];

    return (
        <>
            <Header/>

            <div style={{ margin: "20vh auto", width: "500px" }}>
                <Form
                    fields={fields}
                    onSubmit={(data) => console.log(data)}
                />
            </div>
        </>
    )
}