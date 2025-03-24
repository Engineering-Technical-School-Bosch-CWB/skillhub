import Modal, { IModalProps } from "@/components/Modal"
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import internalAPI from "@/service/internal.services";
import IUser, { User } from "@/interfaces/models/IUser";
import Input from "@/components/Input";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import Button from "@/components/Button";
import { useUserContext } from "@/contexts/user.context";
import Select from "@/components/Select";
import { ISelectData } from "@/components/Select/interfaces";
import IPosition from "@/interfaces/models/IPosition";
import IOccupationArea from "@/interfaces/models/IOccupationArea";
import ISector from "@/interfaces/models/ISector";
import { IServiceResponse } from "@/interfaces/services.interfaces";
import { confirmDialog } from "@/components/ConfirmDialog";
import PasswordRequisites from "../../../../components/PasswordRequisites";
import { toast } from "@/components/Toast";
import { IClass } from "@/interfaces/models/IClass";
import { t } from "i18next";

export interface IUpdateProfileModalProps extends IModalProps {
    id?: number,
    isCurrentUser: boolean,
    byClassId?: string,
}


export default ({ title, handleClose, open, isCurrentUser, subtitle, byClassId }: IUpdateProfileModalProps) => {
    const _location = useLocation();
    const queryParams = new URLSearchParams(_location.search);
    const id = queryParams.get("userId");
    const { user: logedUser } = useUserContext();
    const [isUpdatePassword, setIsUpdatePassword] = useState(false);
    const [selectArea, setSelectArea] = useState<ISelectData[]>([]);
    const [selectPosition, setSelectPosition] = useState<ISelectData[]>([]);
    const [selectSector, setSelectSector] = useState<ISelectData[]>([]);
    const [selectClass, setSelectClass] = useState<ISelectData[]>([]);
    const [userData, setUserData] = useState<IUser>(User.getDefault());
    const [updatedData, setUpdatedData] = useState<IUser>({})

    const loadData = async () => {
        const response = await internalAPI.jsonRequest(`/users${isCurrentUser ? "" : `/?id=${id}`}`, "GET")
        var data = response.data as IUser;
        setUserData(data)
    }
    const formatDate = (value?: Date): string => {
        return dayjs(value).format('DD/MM/YYYY');
    }
    const toggleSubmit = async () => {
        
        var response: IServiceResponse<any>;
        if (id || isCurrentUser)
            response = await internalAPI.jsonRequest(`/users/${id ?? userData.id}`, "PATCH", undefined, updatedData);
        else if (byClassId)
            response = await internalAPI.jsonRequest(`/users/byClass/${byClassId}`, "POST", undefined, userData);
        else
            response = await internalAPI.jsonRequest(`/users/`, "POST", undefined, userData);

        if(!response || !response.success){
            const error = response.errors ? 
                Object.values(response.errors)[0]?.[0]
                : response.message;
            toast({
                data:{
                    title:`${t('classDetails.studentCard.error')} ${id ? t('classDetails.studentCard.update') : t('classDetails.studentCard.create')} ${t('classDetails.studentCard.user')}`,
                    message:error,
                    kind: "error"
                }
            })
            return;
        }
        location.reload();
    }
    const toggleRestorePassword = async () => {
        const confirm = await confirmDialog(t('classDetails.studentCard.confirms.resetPassword'));
        if(!confirm)
            return;

        const response = await internalAPI.jsonRequest(`/login/resetPassword/${id}`, "GET")
        if(!response || !response.success) {            
            toast({
                data: {
                    title: t('classDetails.studentCard.errors.resetPassword'),
                    kind: "error"
                },
                toastId: "reset-password-fail"});
            return;
        }
        location.reload();
    }
    const toggleArchive = async () => {
        const confirm = await confirmDialog(t('classDetails.studentCard.confirms.archive'), t('classDetails.studentCard.confirms.archiveDescription'), t('buttons.back'), t('buttons.ok'))
        if(!confirm){
            return;
        }
        
        const response = await internalAPI.jsonRequest(`/users/archive/${userData.id}`, "PATCH");
        if(!response || !response.success) {            
            toast({
                data: {
                    title: t('classDetails.studentCard.errors.archive'),
                    kind: "error"
                },
                toastId: "user-archive-fail"});

            return;
        }
        location.reload();
        
    }
    const loadSectors = async () => {
        const response = await internalAPI.jsonRequest("/sectors","GET");
        if(!response||!response.success)
            toast({
                data: {
                    title: t('classDetails.studentCard.errors.loadSectors'),
                    kind: "error"
                },
                toastId: "sectors-load-error"});

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
            toast({
                data: {
                    title: t('classDetails.studentCard.errors.loadAreas'),
                    kind: "error"
                },
                toastId: "occupation-areas-load-error"});

        const data = response.data as IOccupationArea[];
        setSelectArea(data.map((area) => {
            return {
                key: area.name!,
                value: area.id!,
                selected: area.name == userData.occupationArea?.name
            }
        }))
    }
    const loadClasses = async () => {
        let response = await internalAPI.jsonRequest("/classes", "GET");
        if(!response||!response.success)
            toast({
                data: {
                    title: t('classDetails.studentCard.errors.loadClasses'),
                    kind: "error"
                },
                toastId: "positions-load-error"});
        let data = response.data as IClass[];

        setSelectClass(data.map((_class) => {
            return {
                key: `${_class.name} (${_class.abbreviation})`,
                value: _class.id,
                selected: userData.studentProfile?.classId == _class.id
            }
        }))
    }
    const loadPositions = async () => {
        let response = await internalAPI.jsonRequest("/positions","GET");
        if(!response||!response.success)
            toast({
                data: {
                    title: t('classDetails.studentCard.errors.loadPositions'),
                    kind: "error"
                },
                toastId: "positions-load-error"});
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
    const handleCancel = () => {
        setIsUpdatePassword(false);
        setUpdatedData({})
        setUserData({})
        handleClose();
    }
    const identificationChange = (value: string) => {
        const validate = /^\d{0,8}$/;
        if(validate.test(value))
            changeValue("identification", value)
    }

    useEffect(() => {
        if (id || isCurrentUser && open)
            loadData();
    }, [, open])
    useEffect(() => {
        if (id || isCurrentUser)
            loadData();
    }, [isUpdatePassword])
    useEffect(() => {
        if (logedUser?.permissionLevel && logedUser?.permissionLevel > 1) {
            loadSectors();
            loadPositions();
            loadOccupationArea();
            loadClasses();
        }
    }, [userData])

    return (
        <Modal title={title} subtitle={subtitle} handleClose={handleClose} open={open}>
            <div className={styles.modal_content}>
                <section className={`${styles.dual_input} ${styles.input_2_3}`}>
                    <Input label={t('classDetails.studentCard.name')} value={userData.name} onChange={(e) => changeValue("name", e.target.value)} disabled={isUpdatePassword} maxLength={500} />
                    <Input label={t('classDetails.studentCard.birth')} max='today' value={formatDate(userData.birthday)} type="date" dateChange={(e) => changeValue("birthday", e?.format("YYYY-MM-DD"))} disabled={isUpdatePassword} />
                </section>
                <Input
                    label={t('classDetails.studentCard.identification')}
                    value={userData.identification}
                    onChange={(e) => identificationChange(e.target.value)} 
                    disabled={isUpdatePassword || !(logedUser?.permissionLevel! > 1)}
                    maxLength={100}
                />
                {
                    logedUser?.permissionLevel && logedUser?.permissionLevel > 1 ?
                        <section className={`${styles.triple_input} ${styles.input_1_1_1}`}>
                            <Select data={selectSector} label={t('classDetails.studentCard.sector')} disabled={isUpdatePassword} onChange={(e) => changeValue("sectorId", e.target.value)} />
                            <Select data={selectPosition} label={t('classDetails.studentCard.position')} disabled={isUpdatePassword} onChange={(e) => changeValue("positionId", e.target.value)} />
                            <Select data={selectArea} label={t('classDetails.studentCard.area')} disabled={isUpdatePassword} onChange={(e) => changeValue("occupationAreaId", e.target.value)} />
                        </section> :
                        <Input value={`${userData.position?.name} - ${userData.sector?.name}`} disabled />
                }
                {
                    (logedUser?.id != userData.id) && id && logedUser?.permissionLevel && logedUser?.permissionLevel > 1 &&
                    <>
                        <Select data={selectClass} onChange={(e) => changeValue("classId", e.target.value)} /> 
                    </>

                }
                {
                    (logedUser?.id && logedUser?.id == userData.id) &&
                    <>
                        <Input label={t('classDetails.studentCard.password')} type="password" placeholder="************" disabled={!isUpdatePassword} onChange={(e) => changeValue("password", e.target.value)} />
                        {
                            isUpdatePassword && 
                            <>
                                <PasswordRequisites value={updatedData.password?? ""} /> 
                                <Button variant="link" onClick={() => setIsUpdatePassword(false)}>{t('classDetails.studentCard.updateUser')}</Button>
                            </>
                        }
                        {
                            !isUpdatePassword &&
                            <Button variant="link" onClick={() => setIsUpdatePassword(true)}>{t('classDetails.studentCard.updatePassword')}</Button>
                        }
                    </>
                }
                {
                    (logedUser?.id != userData.id) && id && logedUser?.permissionLevel && logedUser?.permissionLevel > 1 &&
                        <Button onClick={() => toggleRestorePassword()}>{t('classDetails.studentCard.resetPassword')}</Button>
                }
                <section className={styles.btn_area}>
                    {
                        isCurrentUser && logedUser?.permissionLevel && logedUser?.permissionLevel > 1 &&
                        <Button kind="alert" onClick={toggleArchive} >{userData.isArchived ? t('buttons.unarchive'):t('buttons.archive')}</Button>
                    }
                    <span>
                        <Button onClick={handleCancel} >{t('buttons.cancel')}</Button>
                        <Button onClick={toggleSubmit} variant="contained">{t('buttons.save')}</Button>
                    </span>
                </section>
            </div>
        </Modal>
    )
}