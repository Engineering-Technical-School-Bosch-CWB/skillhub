import Button from "./components/Button";

import "./styles/reset.css"
import "./styles/global.css"

export default function App() {
    return (
        <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "70vh", gap: "10px" }}>
                <Button variant="outlined">Bosch</Button>
                <Button variant="contained">Bosch</Button>
            </div>
        </>
    )
}
