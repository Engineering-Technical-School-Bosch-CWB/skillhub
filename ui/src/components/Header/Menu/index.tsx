import { MouseEventHandler } from "react";
import styles from "./styles.module.css"

interface IMenuProps {
    open: boolean;
    handleClose: () => void;
}

export default ({ open, handleClose }:IMenuProps) => {

    const handleModalClick:MouseEventHandler = (e) => {
        e.stopPropagation()
    }

    return (
        <div 
            className={`${styles.backdrop} ${open ? styles.backdrop_showing : styles.backdrop_closing}`}
            onClick={handleClose}
        >
            <div 
                className={`${styles.menu} ${open ? styles.menu_showing : styles.menu_closing}`}
                onClick={handleModalClick}
            >
                <button 
                    className={styles.close_button}
                    onClick={handleClose}
                >X</button>
            </div>
        </div>
    )
}