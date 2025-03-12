import { useEffect, useState } from "react"
import Avatar from "../Avatar"
import BoschLogo from "../BoschLogo"
import Menu from "./Menu"
import styles from "./styles.module.css"
import Link from "../Link"
import { useUserContext } from "../../contexts/user.context"
import { useNavigate } from "react-router-dom"
import internalAPI from "../../service/internal.services"
import { toast } from "react-toastify"

interface IHeaderProps {

}

/**
 * `Header` component: Displays a Bosch logo, a user avatar, and a menu.
 *
 * Features:
 * - Bosch logo on the left.
 * - User avatar with a tooltip and click-to-open menu functionality.
 * - Menu toggles visibility based on the `menuOpen` state.
 *
 * Notes:
 * - Uses `BoschLogo` for branding and `Avatar` for user interaction.
 * - The `Menu` component is displayed when the user clicks the avatar.
 */
const Header = ({ }: IHeaderProps) => {


    const { user, setUser } = useUserContext();
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    const getData = async () => {

        const response = await internalAPI.jsonRequest("/users", "GET", undefined, undefined);

        if (!response.success) {
            if (!toast.isActive("user-load-error"))
                toast.error("Authentication required.", { toastId: "user-load-error" });
            navigate("/");
        }

        const content = response.data;
        setUser(content);
    }

    useEffect(() => {
        getData();
    }, [])


    return (
        <>
            <header className={styles.header}>
                <Link to="/home">
                    <BoschLogo />
                </Link>

                <nav>
                    <Avatar
                        src={user?.profilePicture?.pUrl ?? "https://ctp-ets.br.bosch.com/SkillHub/avatar.png"}
                        tooltip={user?.name}
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

export default Header
