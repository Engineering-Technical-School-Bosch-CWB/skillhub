import Header from "@/components/Header"
import styles from "./styles.module.css"
import Text from "@/typography"
import Button from "@/components/Button"
import Pagination from "@/components/TableView/Pagination"
import Icon from "@/components/Icon"
import Modal from "@/components/Modal"
import Input from "@/components/Input"
import TextArea from "@/components/TextArea"
import ButtonGroup from "@/components/ButtonGroup"
import internalAPI from "@/service/internal.services"
import SettingsModal from "./components/SettingsModal"
import SectionHeader from "@/components/SectionHeader"

import { ISectionHeaderProps } from "@/components/SectionHeader/interfaces"
import { useEffect, useState } from "react"
import { CurricularUnit, ICurricularUnit } from "@/interfaces/models/ICurricularUnit"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import { ISkill } from "@/interfaces/models/ISkill"
import { IHttpMethod, IServiceResponse } from "@/interfaces/services.interfaces"
import Progress from "@/components/Progress"
import { t } from "i18next"

export default () => {

    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const [data, setData] = useState<ICurricularUnit>(CurricularUnit.getDefault());

    const [skills, setSkills] = useState<ISkill[]>([]);
    const [focusedSkill, setFocusedSkill] = useState<ISkill | undefined>();

    const [curricularUnitModal, setCurricularUnitModal] = useState<boolean>(false);
    const [skillModalOpen, setSkillModalOpen] = useState<boolean>(false);
    const [deleteSkillModal, setDeleteSkillModal] = useState<boolean>(false);

    const [page, setPage] = useState<number>(1);
    const [maxPages, setMaxPages] = useState<number>(1);
    const [items] = useState<number>(10);

    const sectionHeaderProps: ISectionHeaderProps = {
        links: [
            {
                label: t('curricularUnits.curricularUnits'),
                goTo: "/curricular-units"
            },
            {
                label: data.name,
            },
        ]
    }
    const getData = async () => {
        let response = await internalAPI.jsonRequest(`/curricularUnits/${id}`, "GET");
        if (!response || response.statusCode != 200)
            if (!toast.isActive(`curricular-unit-load-error`))
                toast.error(`Error on load Curricular Unit.`, { toastId: `curricular-unit-load-error` });

        setData(response.data)

        response = await internalAPI.jsonRequest(`/skills/curricularUnit/${id}?page=${page}&limit=${items}`, "GET");
        setSkills(response.data);
        setMaxPages(response.info?.totalPages ?? 1);

        setLoading(false);
    }

    const changeModalValue = (key: string, value: any) => {
        setFocusedSkill(prev => ({
            ...prev!,
            [key]: value
        }))
    }

    const changePage = (index: number) => {
        setPage(index);
    }

    const skillSubmit = async () => {
        const isEdit = focusedSkill?.id
        let _id = id
        let method: IHttpMethod = "POST";
        const data = {
            ...focusedSkill,
            curricularUnitId: Number.parseInt(_id!)
        }
        let request: IServiceResponse<any>;
        if (isEdit)
            method = "PATCH"
        request = await internalAPI.jsonRequest(`/skills/${isEdit ? focusedSkill.id : ""}`, method, undefined, data)
        if (!request || !request.success) {
            toast.error(`Error on ${isEdit ? "edit" : "create"} skill`)
            return;
        }
        location.reload();
    }
    const submitSkillDelete = async () => {
        const response = await internalAPI.jsonRequest(`/skills/${focusedSkill?.id}`, "DELETE")
        if (!response || !response.success) {
            toast.error(`Error on delete skill`, { toastId: "delete-skill-error" });
            return;
        }
        location.reload();
    }
    const onSkillEditToggle = (index?: number) => {
        if ((!skillModalOpen) && (index !== undefined)) {
            setFocusedSkill(skills[index])
        } else if (!skillModalOpen) {
            setFocusedSkill(undefined)
        }
        setSkillModalOpen(!skillModalOpen)
    }
    const onSkillDeleteToggle = (index?: number) => {
        if ((!skillModalOpen) && (index !== undefined)) {
            setFocusedSkill(skills[index])
        } else if (!skillModalOpen) {
            setFocusedSkill(undefined)
        }
        setDeleteSkillModal(!deleteSkillModal);
    }

    const onCurricularUnitEditToggle = () => {
        setCurricularUnitModal(!curricularUnitModal)
    }

    useEffect(() => {
        getData();
    }, [])

    if (loading)
        return (
            <>
                <Header />
                <Progress />
            </>
        )

    return (
        <>
            <Header />
            <main>
                <SectionHeader {...sectionHeaderProps} />
                <section className={styles.table_header}>
                    <span className={styles.table_label}>
                        <Text fontSize="xl2" fontWeight="bold">{data.name}</Text>
                        <Text fontSize="sm" fontWeight="light">({data.subjectArea?.name})</Text>
                    </span>
                    <span>
                        <Button variant="primary_icon" onClick={() => onCurricularUnitEditToggle()}>
                            <Icon name="settings" size="md" />
                        </Button>
                        <Button variant="secondary_icon" onClick={() => onSkillEditToggle()}>
                            <Icon name="add" size="md" />
                        </Button>
                    </span>
                </section>
                <table>
                    <tr>
                        <th>#</th>
                        <th>{t('tables.description')}</th>
                        <th>{t('tables.options')}</th>
                    </tr>
                    {
                        skills.map((skill, _index) => {
                            return (
                                <tr>
                                    <td>{_index+1}</td>
                                    <td className={styles.description}>
                                        {skill.description}
                                        <span className={styles.tooltip}>
                                            <Text fontSize="sm" fontWeight="bold">
                                                {skill.description}
                                            </Text>
                                            <Text fontSize="sm">
                                                {`${t('curricularUnits.evaluationCriteria')}: ${skill.evaluationCriteria}`}
                                            </Text>
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`${styles.option_btn} ${styles.warning}`} onClick={() => onSkillEditToggle(_index)}>
                                            <Icon name="edit" size="md" />
                                        </span>
                                        <span className={`${styles.option_btn} ${styles.danger}`} onClick={() => onSkillDeleteToggle(_index)}>
                                            <Icon name="delete" size="md" />
                                        </span>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>

                {
                    maxPages > 1 &&
                    <Pagination pages={maxPages} current={page} onChange={changePage} />
                }
            </main>
            {
                skillModalOpen &&
                <Modal title={(focusedSkill?.id ? t('curricularUnits.modal.editTitle') : t('curricularUnits.modal.createTitle'))}
                    handleClose={() => onSkillEditToggle()}
                    open={skillModalOpen}
                    subtitle={data.name}
                >
                    <div className={styles.modal}>

                        <Input value={focusedSkill?.description} label={t('curricularUnits.modal.description')} onChange={(e) => changeModalValue("description", e.target.value)} />
                        <TextArea
                            label={t('curricularUnits.modal.evaluationCriteria')}
                            className={styles.textArea}
                            setValue={(e: any) => changeModalValue("evaluationCriteria", e)}
                            value={focusedSkill?.evaluationCriteria ?? ""}
                        />
                        <ButtonGroup cancel={() => onSkillEditToggle()} submit={() => skillSubmit()} />
                    </div>
                </Modal>
            }

            {
                deleteSkillModal &&
                <Modal
                    handleClose={() => onSkillDeleteToggle()}
                    open={deleteSkillModal}
                    title={t('curricularUnits.deleteModal.title')}
                    subtitle={t('curricularUnits.deleteModal.areYouSure')}
                >
                    <div className={styles.modal}>
                        <span>
                            <Text>{t("curricularUnits.deleteModal.description")}: </Text>
                            <Text>{focusedSkill?.description}</Text>
                        </span>
                        <span>
                            <Text>{t("curricularUnits.deleteModal.evaluationCriteria")}: </Text>
                            <Text>{focusedSkill?.evaluationCriteria}</Text>
                        </span>
                        <ButtonGroup cancel={() => onSkillDeleteToggle()} submit={() => submitSkillDelete()} />
                    </div>
                </Modal>
            }
            <SettingsModal
                data={data}
                handleClose={() => setCurricularUnitModal(false)}
                open={curricularUnitModal}
                title="" ucState={{
                    value: data,
                    setValue: setData
                }} />
        </>
    )
}