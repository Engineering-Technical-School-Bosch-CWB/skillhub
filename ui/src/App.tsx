import "./styles/global.css"
import Form, { IField } from "./components/Form";

export default function App() {

    const fields:IField[] = [
        { name: "email", label: "Email" },
        { name: "password", label: "Password", type: "password" },
    ]

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", gap: "30px", padding: "100px" }}>
                <div style={{ maxWidth: "500px", width: "100%" }}>
                    <Form 
                        onSubmit={(payload) => console.log(payload)}
                        fields={fields}
                    />
                </div>
            </div>
        </>
    )
}
