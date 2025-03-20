import styles from "./styles.module.css"
import NavLink from "./components/NavLink"
import { INavProps } from "./Nav.interfaces"

const Nav = ({links} : INavProps) => {

    return (
        <nav className={styles.nav}>
            {
                links.map((link) => {
                    return (
                        <NavLink to={link.to} label={link.label} icon={link.icon} /> 
                    )
                })
            }
        </nav>
    )
}

export default Nav;