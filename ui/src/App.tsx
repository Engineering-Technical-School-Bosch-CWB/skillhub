import Button from "./components/Button";

import "./styles/reset.css"
import "./styles/global.css"
import Input from "./components/Input";

export default function App() {
    return (
        <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "70vh", gap: "10px", padding: "100px" }}>
                <Button variant="outlined">Bosch</Button>
                <Button variant="contained">Bosch</Button>
                <Input label="Bosch"/>
            </div>
        </>
    )
}
