import { MouseEventHandler } from "react";
import styles from "./styles.module.css"
import Link from "../../Link";

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

                <div className={styles.link_list}>
                    {/* {Object.values(routesByAccessLevel).map((route, i) => (
                        <Link key={i} to={route.path}>{ route.title }</Link>
                    ))} */}
                </div>
            </div>
        </div>
    )
}