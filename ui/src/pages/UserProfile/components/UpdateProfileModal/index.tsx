import Modal, { IModalProps } from "@/components/Modal"
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import internalAPI from "@/service/internal.services";
import IUser from "@/interfaces/models/IUser";
import Input from "@/components/Input";
import dayjs from "dayjs";
import ButtonGroup from "@/components/ButtonGroup";
import { useLocation } from "react-router-dom";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import { useUserContext } from "@/contexts/user.context";
import Select from "@/components/Select";
import { ISelectData } from "@/components/Select/interfaces";
import IPosition from "@/interfaces/models/IPosition";
import IOccupationArea from "@/interfaces/models/IOccupationArea";
import ISector from "@/interfaces/models/ISector";

export interface IUpdateProfileModalProps extends IModalProps {
    id?: number,
    isCurrentUser: boolean
}

export default ({title, handleClose, open, id, isCurrentUser}: IUpdateProfileModalProps) => {
    const _location = useLocation();
    const queryParams = new URLSearchParams(_location.search);
    const {user: logedUser} = useUserContext();
    const [isUpdatePassword, setIsUpdatePassword] = useState(false);
    const [selectArea, setSelectArea] = useState<ISelectData[]>([]);
    const [selectPosition, setSelectPosition] = useState<ISelectData[]>([]);
    const [selectSector, setSelectSector] = useState<ISelectData[]>([]);
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
        const id = queryParams.get("userId");
        const response = await internalAPI.jsonRequest(`/users${isCurrentUser? "": `/?id=${id}`}`, "GET")
        var data = response.data as IUser;
        setUserData(data)
    }

    const formatDate = (value?: Date): string => {
        return dayjs(value).format('DD/MM/YYYY');
    }

    const sendUpdatePassword = async () => {
        const data = {
            hash: userData.password
        }
        var response = await internalAPI.jsonRequest(`/users/${id}`,"PATCH", undefined, data);
        if(!response || !response.success){
            toast.error("Error on update password", {toastId:"update-password-error"})
            return;
        }
        location.reload();
    }
    const sendUpdateUserInfo = async () => {
        var response = await internalAPI.jsonRequest(`/users/${id}`,"PATCH", undefined, userData);
        if(!response || !response.success){
            toast.error("Error on update password", {toastId:"update-password-error"})
            return;
        }
        location.reload();
    }

    const loadPosition = async () => {
        let response = await internalAPI.jsonRequest("/positions","GET");
        if(!response||!response.success)
            return toast.error("Error on load positions")
        let data = response.data as IPosition[];
        console.log(data);
        
        setSelectPosition(data.map((position) => {
            return {
                key: position.name!,
                value: position.id!
            }
        }))
        response = await internalAPI.jsonRequest("/occupationArea","GET");
        if(!response||!response.success)
            return toast.error("Error on load occupation areas")
        data = response.data as IOccupationArea[];
        console.log(data);
        setSelectArea(data.map((area) => {
            return {
                key: area.name!,
                value: area.id!
            }
        }))
        response = await internalAPI.jsonRequest("/sector","GET");
        if(!response||!response.success)
            return toast.error("Error on load sectors")
        data = response.data as ISector[];
        console.log(data);
        setSelectSector(data.map((sector) => {
            return {
                key: sector.name!,
                value: sector.id
            }
        }))
    }

    const toggleSubmit = () => {
        if(isUpdatePassword){
            sendUpdatePassword();
            return;
        }
        sendUpdateUserInfo();
    }

    const changeValue = (key: keyof IUser, value: any) => {
        setUserData(prev => ({
            ...prev,
            [key]: value
        }))
    }

    useEffect(() => {
        console.log(logedUser);
        loadData();
        loadPosition();
        
    },[])

    return (
        <Modal title={title} handleClose={handleClose} open={open}>
            <div className={styles.modal_content}>
                <section className={`${styles.dual_input} ${styles.input_2_3}`}>
                    <Input label="Name" value={userData.name} onChange={(e) => changeValue("name", e.target.value)} disabled={isUpdatePassword}/>
                    <Input label="Birth" value={formatDate(userData.birthday)} type="date" dateChange={(e) => changeValue("birthday", e?.format("YYYY-MM-DD"))} disabled={isUpdatePassword} />
                </section>
                <Input label="Identification" value={userData.identification} onChange={(e) => changeValue("identification", e.target.value)} disabled={isUpdatePassword} />
                {
                    logedUser!.permissionLevel! > 1 ? 
                    <>
                        <Select data={selectArea}/>
                        <Select data={selectPosition}/>
                        <Select data={selectSector}/>
                    </> :
                    <Input value={`${userData.position?.name} - ${userData.sector?.name}`} disabled  />
                }
                <Input label="Password" type="password" placeholder="************" disabled={!isUpdatePassword} onChange={(e) => changeValue("password", e.target.value)} />
                <Button variant="link" onClick={() => setIsUpdatePassword(true)}>Update Password</Button>
                <ButtonGroup cancel={handleClose} submit={toggleSubmit} />
            </div>
        </Modal>
    )
}