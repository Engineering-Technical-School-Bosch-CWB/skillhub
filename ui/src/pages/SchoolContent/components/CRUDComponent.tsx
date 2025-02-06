import { useEffect, useState } from "react"
import { tabName, Tabs } from "../links"
import internalAPI from "@/service/internal.services";
import { toast } from "react-toastify";
import TableView from "@/components/TableView";
import { IOption } from "@/components/TableView/interfaces";
import Text from "@/typography";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

import styles from "../styles.module.css"
import SectionHeader from "@/components/SectionHeader";
import { ISectionHeaderProps } from "@/components/SectionHeader/interfaces";
import DeleteModal from "./DeleteModals/DeleteModal";
import UpdateModal from "./UpdateModals/UpdateModal";
import { CurricularUnit } from "@/interfaces/models/ICurricularUnit";
import { Course } from "@/interfaces/models/ICourse";
import { OccupationArea } from "@/interfaces/models/IOccupationArea";
import { SubjectArea } from "@/interfaces/models/ISubjectArea";
import CreateModal from "./CreateModals/CreateModal";

export interface ICrudContainerProps {
    kind: Tabs
}

const typeMap: Record<Tabs, new (data: any) => any> = {
    course: Course,
    curricularUnits: CurricularUnit,
    occupationArea: OccupationArea,
    subjectAreas: SubjectArea
}

export default ( {kind}: ICrudContainerProps ) => {

    const [data, setData] = useState([]);
    const [options, setOptions] = useState<IOption[]>([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [items, setItems] = useState(0);

    const [focusedId, setFocusedId] = useState(0);



    const loadData = async () => {
        const response = await internalAPI.jsonRequest(`/${kind}?page=${page}&items=${items}`, "GET");
        if (!response || response.statusCode != 200) 
            if (!toast.isActive(`${kind}-load-error`))
                toast.error(`Error on load ${kind}.`, { toastId: `${kind}-load-error` });

        setCourseOptions(response.data);
    }

    const setCourseOptions = (data: any) => {
        const classConstructor = typeMap[kind];
        
        const values = data.map((e: any) => {
            const res = new classConstructor(e).convert();
            return res
        })
        const options: IOption[] = [
            {
                function: toggleEdit,
                iconName: "edit"
            },
            {
                function: toggleDelete,
                iconName: "close"
            }
        ] 
        setData(values);
        setOptions(options);
    }

    const toggleEdit = (isOpen: boolean,id: number) => {
        setFocusedId(id)
        setEditModalOpen(isOpen)
    }
    const toggleDelete = (isOpen: boolean,id: number) => {
        setFocusedId(id)
        setDeleteModalOpen(isOpen)
    }

    const toggleCreate = () => {
        setCreateModalOpen(true);
    }

    const closeModal = () => {
        setDeleteModalOpen(false);
        setEditModalOpen(false);
        setCreateModalOpen(false);
    }

    const sectionHeaderProps: ISectionHeaderProps = {
        links: [
            {
                label: "School Content",
                goTo: "/school-content"
            },
            {
                label: tabName[kind]
            }
        ]
    }

    
    
    useEffect(() => {
        loadData();
        toggleCreate();
    }, [])


    return(
        <>
            <SectionHeader {...sectionHeaderProps} />
            <section className={styles.table_header}>
                <Text fontSize="xl2" fontWeight="bold">{tabName[kind]}</Text>
                <Button variant="secondary_icon" onClick={() => toggleCreate()}>
                    <Icon name="add" size="md"/>
                </Button>
            </section>
            <TableView data={data} hasNotation={false} hasOptions={true} options={options} />

            { editModalOpen && <UpdateModal id={focusedId} kind={kind} isOpen={true} onClose={closeModal} /> }
            { deleteModalOpen && <DeleteModal id={focusedId} kind={kind}  isOpen={true} onClose={closeModal} /> }
            { createModalOpen && <CreateModal kind={kind} isOpen={true} onClose={closeModal} />}
        </>
    )
}