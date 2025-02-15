import Modal, { IModalProps } from "@/components/Modal"
import Text from "@/typography"
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import internalAPI from "@/service/internal.services";
import IUser from "@/interfaces/models/IUser";
import Input from "@/components/Input";
import dayjs from "dayjs";

export interface IUpdateProfileModalProps extends IModalProps {
    id?: number,
    isCurrentUser: boolean
}

export default ({title, handleClose, open, id, isCurrentUser}: IUpdateProfileModalProps) => {

    const [userData, setUserData] = useState<IUser>(
        {
            birthday: new Date,
            id: id,
            identification: "",
            image: undefined,
            name: "",
            occupationArea: {
                id: 0, name: ""
            },
            permissionLevel: 0,
            position: {
                id: 0, name: ""
            },
            sector: {
                id: 0, name: ""
            }
        }
    );

    const loadData = async () => {
        const response = await internalAPI.jsonRequest(`/users${isCurrentUser? "": `/?id=${id}`}`, "GET")
        var data = response.data as IUser;
        setUserData(data)
    }

    const formatDate = (value?: Date): string => {
        return dayjs(value).format('DD/MM/YYYY');
    }

    useEffect(() => {
        loadData();
        console.log(userData.birthday?.toDateString());
        
    },[])

    return (
        <Modal title={title} handleClose={handleClose} open={open}>
            <div className={styles.modal_content}>
                <section className={`${styles.dual_input} ${styles.input_2_3}`}>
                    <Input label="Name"  />
                    <Input label="Birth" value={formatDate(userData.birthday)} type="date" />
                </section>
                <Input label="Identification" value={userData.identification} />
                <Input value={`${userData.position?.name} - ${userData.sector?.name}`} disabled/>
                <Input label="Password" value="************" disabled />
                <input type="date" />
            </div>
        </Modal>
    )
}