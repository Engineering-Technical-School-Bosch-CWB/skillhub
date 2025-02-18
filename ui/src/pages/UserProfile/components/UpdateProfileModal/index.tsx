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

export default ({title, handleClose, open, isCurrentUser}: IUpdateProfileModalProps) => {
    const _location = useLocation();
    const queryParams = new URLSearchParams(_location.search);
    const id = queryParams.get("userId");
    const {user: logedUser} = useUserContext();
    const [isUpdatePassword, setIsUpdatePassword] = useState(false);
    const [selectArea, setSelectArea] = useState<ISelectData[]>([]);
    const [selectPosition, setSelectPosition] = useState<ISelectData[]>([]);
    const [selectSector, setSelectSector] = useState<ISelectData[]>([]);
    const [userData, setUserData] = useState<IUser>(
        {
            birthday: new Date,
            id: 0,
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
    const [updatedData, setUpdatedData] = useState({})

    const loadData = async () => {
        const response = await internalAPI.jsonRequest(`/users${isCurrentUser? "": `/?id=${id}`}`, "GET")
        var data = response.data as IUser;
        setUserData(data)
    }

    const formatDate = (value?: Date): string => {
        return dayjs(value).format('DD/MM/YYYY');
    }

    const toggleSubmit = async () => {
        var response = await internalAPI.jsonRequest(`/users/${id}`,"PATCH", undefined, updatedData);
        if(!response || !response.success){
            toast.error("Error on update user data", {toastId:"update-user-error"})
            return;
        }
        location.reload();    
    }
    
    const loadSectors = async () => {
        const response = await internalAPI.jsonRequest("/sectors","GET");
        if(!response||!response.success)
            return toast.error("Error on load sectors", {toastId: "sectors-load-error"})
        const data = response.data as ISector[];
        setSelectSector(data.map((sector) => {
            return {
                key: sector.name!,
                value: sector.id,
                selected: sector.name == userData.sector?.name
            };
        }))
    }
    const loadOccupationArea = async () => {
        const response = await internalAPI.jsonRequest("/occupationArea","GET");
        if(!response||!response.success)
            return toast.error("Error on load occupation areas", {toastId: "occupation-areas-load-error"})
        const data = response.data as IOccupationArea[];
        setSelectArea(data.map((area) => {
            return {
                key: area.name!,
                value: area.id!,
                selected: area.name == userData.occupationArea?.name
            }
        }))
    }
    const loadPositions = async () => {
        let response = await internalAPI.jsonRequest("/positions","GET");
        if(!response||!response.success)
            return toast.error("Error on load positions", {toastId: "positions-load-error"})
        let data = response.data as IPosition[];
        
        setSelectPosition(data.map((position) => {
            return {
                key: position.name!,
                value: position.id!,
                selected: position.name == userData.position?.name
            }
        }))
    }
    const changeValue = (key: string, value: any) => {
        setUpdatedData(prev => {
            return {
                ...prev,
                [key]: value
            };
        });
        setUserData(prev => {
            return {
                ...prev,
                [key]: value
            };
        });
    }

    useEffect(() => {
        loadData();
    },[])
    useEffect(() => {
        if(logedUser?.permissionLevel && logedUser?.permissionLevel > 1 ) {
            loadSectors();
            loadPositions();
            loadOccupationArea();
        }
    }, [userData])

    return (
        <Modal title={title} handleClose={handleClose} open={open}>
            <div className={styles.modal_content}>
                <section className={`${styles.dual_input} ${styles.input_2_3}`}>
                    <Input label="Name" value={userData.name} onChange={(e) => changeValue("name", e.target.value)} disabled={isUpdatePassword}/>
                    <Input label="Birth" value={formatDate(userData.birthday)} type="date" dateChange={(e) => changeValue("birthday", e?.format("YYYY-MM-DD"))} disabled={isUpdatePassword} />
                </section>
                <Input label="Identification" value={userData.identification} onChange={(e) => changeValue("identification", e.target.value)} disabled={isUpdatePassword} />
                {
                    logedUser?.permissionLevel && logedUser?.permissionLevel > 1 ? 
                        <section className={`${styles.triple_input} ${styles.input_1_1_1}`}>
                            <Select data={selectSector} label="Sector" disabled={isUpdatePassword} onChange={(e) => changeValue("sectorId", e.target.value)} />
                            <Select data={selectPosition} label="Position" disabled={isUpdatePassword}  onChange={(e) => changeValue("positionId", e.target.value)} />
                            <Select data={selectArea} label="Área" disabled={isUpdatePassword} onChange={(e) => changeValue("occupationAreaId", e.target.value)} />
                        </section> :
                        <Input value={`${userData.position?.name} - ${userData.sector?.name}`} disabled  />
                }
                <Input label="Password" type="password" placeholder="************" disabled={!isUpdatePassword} onChange={(e) => changeValue("password", e.target.value)} />
                <Button variant="link" onClick={() => setIsUpdatePassword(true)}>Update Password</Button>
                <ButtonGroup cancel={handleClose} submit={toggleSubmit} />
            </div>
        </Modal>
    )
}