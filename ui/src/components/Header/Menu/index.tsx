import { MouseEventHandler } from "react";
import styles from "./styles.module.css"
import Link from "../../Link";
import authenticatedRoutes from "../../../router/protected/authenticated.routes";
import teacherRoutes from "../../../router/protected/teacher.routes";
import { useUserContext } from "../../../contexts/user.context";
import { Divider } from "@mui/material";

interface IMenuProps {
    open: boolean;
    handleClose: () => void;
}

export default ({ open, handleClose }: IMenuProps) => {

    const { user } = useUserContext();

    const handleModalClick: MouseEventHandler = (e) => {
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
                    <Link to={"/home"}>{"Home"}</Link>
                    {
                        user?.studentProfile &&
                        <Link to={"/apprentice/results"} >{"Student Results"}</Link>
                    }
                    <Link to={"/birthdays"} >{"Birthdays"}</Link>
                    {
                        user?.permissionLevel === 2 &&
                        <>
                            <Link to={"/classes"} >{"Classes Overview"}</Link>
                            <Link to={"/school-content"} >{"School Content"}</Link>
                            <Link to={"/users"} >{"Users"}</Link>
                        </>
                    }
                    <Divider />
                    <Link onClick={() => sessionStorage.removeItem("@AUTH")} to={"/"}>{"Sign out"}</Link>
                </div>
            </div>
        </div>
    )
}