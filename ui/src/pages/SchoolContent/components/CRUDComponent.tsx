import { useEffect, useState } from "react";
import { Tabs } from "../links";
import internalAPI from "@/service/internal.services";
import { toast } from "react-toastify";
import TableView from "@/components/TableView";
import { IOption } from "@/components/TableView/interfaces";
import Text from "@/typography";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import styles from "../styles.module.css";
import SectionHeader from "@/components/SectionHeader";
import { ISectionHeaderProps } from "@/components/SectionHeader/interfaces";
import DeleteModal from "./DeleteModals/DeleteModal";
import UpdateModal from "./UpdateModals/UpdateModal";
import { CurricularUnit } from "@/interfaces/models/ICurricularUnit";
import { Course } from "@/interfaces/models/ICourse";
import { OccupationArea } from "@/interfaces/models/IOccupationArea";
import { SubjectArea } from "@/interfaces/models/ISubjectArea";
import CreateModal from "./CreateModals/CreateModal";
import Pagination from "@/components/TableView/Pagination";
import { t } from "i18next";

export interface ICrudContainerProps {
    kind: Tabs;
}

const typeMap: Record<Tabs, new (data: any) => any> = {
    course: Course,
    curricularUnits: CurricularUnit,
    occupationArea: OccupationArea,
    subjectAreas: SubjectArea,
};

export default ({ kind }: ICrudContainerProps) => {

    const [page, setPage] = useState(1);
    const [items] = useState(10);
    const [maxPages, setMaxPages] = useState(1);
    const [focusedId, setFocusedId] = useState(0);
    const [data, setData] = useState<any[]>([]);
    const [options, setOptions] = useState<IOption[]>([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);

    const classConstructor = typeMap[kind];

    const getData = async () => {
        const response = await internalAPI.jsonRequest(`/${kind}?page=${page}&items=${items}`, "GET");
        if (!response.success) {
            if (!toast.isActive(`${kind}-load-error`))
                toast.error(`Error on load ${kind}.`, { toastId: `${kind}-load-error` });
            return;
        }
        setMaxPages(response.info?.totalPages ?? 1);
        processData(response.data);
    };

    const processData = (data: any) => {
        const values = data.map((e: any) => new classConstructor(e).convert());
        setData(values);
        setOptions([
            { function: toggleEdit, iconName: "edit" },
            { function: toggleDelete, iconName: "close" },
        ]);
    };

    const toggleEdit = (isOpen: boolean, id: number) => {
        setFocusedId(id);
        setEditModalOpen(isOpen);
    };

    const toggleDelete = (isOpen: boolean, id: number) => {
        setFocusedId(id);
        setDeleteModalOpen(isOpen);
    };

    const toggleCreate = () => {
        setCreateModalOpen(true);
    };

    const closeModal = () => {
        setDeleteModalOpen(false);
        setEditModalOpen(false);
        setCreateModalOpen(false);
    };

    const handleCreate = (newItem: any) => {
        setData([...data, new classConstructor(newItem).convert()]);
        closeModal();
    };

    const handleUpdate = (updatedItem: any) => {
        setData((prev) => prev.map((item) => (item.id === updatedItem.id ? new classConstructor(updatedItem).convert() : item)));
        closeModal();
    };

    const handleDelete = (deletedId: number) => {
        setData((prev) => prev.filter((item) => item.id !== deletedId));
        closeModal();
    };

    const sectionHeaderProps: ISectionHeaderProps = {
        links: [
            { label: t('schoolContent.title'), goTo: "/school-content" },
            { label: t(`schoolContent.kind.${kind}`) },
        ],
    };

    useEffect(() => {
        getData();
    }, [page, items]);

    return (
        <>
            <SectionHeader {...sectionHeaderProps} />
            <section className={styles.table_header}>
                <Text fontSize="xl2" fontWeight="bold">{t(`schoolContent.kind.${kind}`)}</Text>
                <Button variant="secondary_icon" onClick={toggleCreate}>
                    <Icon name="add" size="md" />
                </Button>
            </section>
            <TableView data={data} hasNotation={false} hasOptions={true} options={options} />
            <Pagination pages={maxPages} current={page} onChange={setPage} />

            {
                editModalOpen &&
                <UpdateModal id={focusedId} kind={kind} isOpen={true} onClose={closeModal} onUpdate={handleUpdate} />
            }
            {
                deleteModalOpen &&
                <DeleteModal id={focusedId} kind={kind} isOpen={true} onClose={closeModal} onDelete={handleDelete} />
            }
            {
                createModalOpen &&
                <CreateModal kind={kind} isOpen={true} onClose={closeModal} onCreate={handleCreate} />
            }
        </>
    );
};
