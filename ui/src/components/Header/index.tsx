import { useState } from "react"
import Avatar from "../Avatar"
import BoschLogo from "../BoschLogo"
import Menu from "./Menu"
import styles from "./styles.module.css"

interface IHeaderProps {

}

export default ({  }:IHeaderProps) => {

    const [menuOpen, setMenuOpen] = useState(false);

    return(
        <>
            <header className={styles.header}>
                <BoschLogo/>

                <nav>
                    <Avatar 
                        src="/avatar.png" 
                        tooltip="Murylo Saladino"
                        onClick={() => setMenuOpen(true)}
                        className={styles.user_icon}
                    />
                    
                </nav>
            </header>

            <Menu
                open={menuOpen}
                handleClose={() => setMenuOpen(false)}
            />
        </>
    )
}

