
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { createRoot } from "react-dom/client";
import Button from "../Button";
import Text from "@/typography";

interface IConfirmDialogProps {
    message?: string,
    label?: string,
    resolve?: (result: boolean) => void,
    cancelLabel?: string,
    submitLabel?: string,
    kind?: "success" | "alert" | "danger" | "default"
}

export const ConfirmDialog = ({message, label, resolve, submitLabel, cancelLabel, kind = "default"}: IConfirmDialogProps) => {
    const [open, setOpen] = useState(true);
    
    const handleClose = (result: boolean) => {
        setOpen(false);
        setTimeout(() => {
            resolve!(result);
            document.getElementById("confirm-root")?.remove();
        }, 300);
    }

    useEffect(() => {
        return () => document.getElementById("confirm-root")?.remove()
    }, [])

    return open ?(
        <>
        <div className={styles.bg} onClick={() => handleClose(false)}></div>
        <div className={`${styles.dialog}`}>
            {
                label &&
                <span>
                    <section className={`${styles.dialog_header} ${styles[kind]}`}>
                        <Text fontSize="lg">{label}</Text>
                    </section>
                    <hr />
                </span>
            }
            {
                message && 
                <section className={styles.dialog_message}>
                    <Text>{message}</Text>
                </section>
            }
            <section className={styles.btn_area}>
                <Button onClick={() => handleClose(false)}>{cancelLabel ?? "Cancel"}</Button>
                <Button onClick={() => handleClose(true)} variant="contained">{submitLabel ?? "Ok"}</Button>
            </section>
        </div>
        </>
    ) : null;
}

export function confirmDialog(
    label?:string, 
    message?: string, 
    cancelLabel?: string, 
    submitLabel?: string,
    kind?: "success" | "alert" | "danger" | "default",
) {
    return new Promise((resolve) => {
        const modalRoot = document.createElement("div");
        modalRoot.id = "confirm-root";
        document.body.appendChild(modalRoot);

        const root = createRoot(modalRoot)
        root.render(<ConfirmDialog label={label} message={message} resolve={resolve} cancelLabel={cancelLabel} submitLabel={submitLabel} kind={kind} />)
    })
}