import { MouseEventHandler, ReactNode } from "react";
import styles from "./styles.module.css"

interface IModalProps {
    open: boolean;
    handleClose: () => void;
    children?: ReactNode;
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default ({ 
    children,
    open,
    handleClose,
    maxWidth = "md" 
}:IModalProps) => {

    const handleModalClick:MouseEventHandler = (e) => {
        e.stopPropagation()
    }

    return (
        <div 
            data-open={open} 
            className={styles.modal_container}
            onClick={handleClose}
        >
            {
                open &&
                <div 
                    className={`${styles.modal} ${styles[maxWidth]}`}
                    onClick={handleModalClick}
                >
                    <button 
                        className={styles.close_button}
                        onClick={handleClose}
                    >X</button>

                    { children }
                </div>
            }
        </div>
    )
}