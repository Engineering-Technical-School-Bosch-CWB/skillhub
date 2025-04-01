import { MouseEventHandler } from "react";
import styles from "./styles.module.css"
import Link from "../../Link";
import { useUserContext } from "../../../contexts/user.context";
import { Divider } from "@mui/material";
import { t } from "i18next";
import SelectLang from "./components/SelectLang";

interface IMenuProps {
    open: boolean;
    handleClose: () => void;
}

export default ({ open, handleClose }: IMenuProps) => {

    const { user, isAdmin } = useUserContext();

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
                    <Link to={"/user-profile"}>{t("home.userProfile")}</Link>
                    {
                        user?.studentProfile &&
                        <Link to={"/apprentice/results"} >{t('home.studentResults')}</Link>
                    }
                    <Link to={"/birthdays"} >{t('home.birthdays')}</Link>
                    {
                        user?.permissionLevel === 2 && isAdmin &&
                        <>
                            <Link to={"/classes"} >{t('home.classesOverview')}</Link>
                            <Link to={"/school-content"} >{t('home.schoolContent')}</Link>
                            <Link to={"/users"} >{t('home.users')}</Link>
                        </>
                    }
                    <Divider />
                    <SelectLang />
                    <Divider />
                    <Link onClick={() => sessionStorage.removeItem("@AUTH")} to={"/"}>{t('home.signout')}</Link>
                </div>
            </div>
        </div>
    )
}