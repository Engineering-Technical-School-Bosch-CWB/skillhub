import Link from "@/components/Link";
import { INavLink } from "../../Nav.interfaces";
import Icon from "@/components/Icon";
import Text from "@/typography";

import styles from "../../styles.module.css"

const NavLink = ({to, label, icon}: INavLink) => {
    return (
        <Link to={to} className={styles.nav_link}>
            <Icon name={icon ?? "link"} className={styles.nav_icon} size="md"/> 
            <Text fontSize="lg" className={styles.label}>{label}</Text>
        </Link>
    )
}

export default NavLink