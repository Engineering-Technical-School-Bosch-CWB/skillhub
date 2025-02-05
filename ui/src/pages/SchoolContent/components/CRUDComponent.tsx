import { useEffect, useState } from "react"
import { tabName, Tabs } from "../links"
import internalAPI from "@/service/internal.services";
import { toast } from "react-toastify";
import TableView from "@/components/TableView";
import { IOption } from "@/components/TableView/interfaces";
import Text from "@/typography";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

export interface ICrudContainerProps {
    kind: Tabs
}
import styles from "../styles.module.css"
import SectionHeader from "@/components/SectionHeader";
import { ISectionHeaderProps } from "@/components/SectionHeader/interfaces";
import DeleteModal from "./DeleteModals/DeleteModal";
import UpdateModal from "./UpdateModals/UpdateModal";

export default ( {kind}: ICrudContainerProps ) => {

    const [data, setData] = useState([]);
    const [options, setOptions] = useState<IOption[]>([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
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

    useEffect(() => {
        loadData();
    }, [])

    const toggleEdit = (isOpen: boolean,id: number) => {
        setFocusedId(id)
        setEditModalOpen(isOpen)
    }
    const toggleDelete = (isOpen: boolean,id: number) => {
        setFocusedId(id)
        setDeleteModalOpen(isOpen)
    }

    const closeModal = () => {
        setDeleteModalOpen(false);
        setEditModalOpen(false);
    }

    const setCourseOptions = (data: any) => {
        const values = data.map((e: any) => {
            return {
                id: e.id,
                abbreviation: e.abbreviation,
                name: e.name,
                occupationArea: e.occupationArea.name
            }
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


    //!!!!!!! TEST ZONE !!!!!!!!!!
    useEffect(() => {
        // toggleDelete(true, 1)
        toggleEdit(true, 1);
    },[])
    //!!!!!!! TEST ZONE !!!!!!!!!!

    return(
        <>
            <SectionHeader {...sectionHeaderProps} />
            <section className={styles.table_header}>
                <Text fontSize="xl2" fontWeight="bold">{tabName[kind]}</Text>
                <Button variant="secondary_icon">
                    <Icon name="add" size="md"/>
                </Button>
            </section>
            <TableView data={data} hasNotation={false} hasOptions={true} options={options} />

            { editModalOpen && <UpdateModal id={focusedId} kind={kind} isOpen={true} onClose={closeModal} /> }
            { deleteModalOpen && <DeleteModal id={focusedId} kind={kind}  isOpen={true} onClose={closeModal} /> }
        </>
    )
}