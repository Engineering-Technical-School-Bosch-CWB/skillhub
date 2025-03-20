import internalAPI from "@/service/internal.services"
import { IUserPropertiesTablesProps, UserPropsTypeToEndpoint, UserPropsTypeToTitle } from "./PropertiesTable.interface"
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import TableView from "@/components/TableView";
import Pagination from "@/components/TableView/Pagination";
import { IOption } from "@/components/TableView/interfaces";
import Text from "@/typography";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

import styles from "./styles.module.css"
import UpdateModal from "./components/UpdateModals/UpdateModal";
import DeleteModal from "./components/DeleteModals/DeleteModal";
import CreateModal from "./components/CreateModals/CreateModal";
import { t } from "i18next";

export default ({kind, items = 3}: IUserPropertiesTablesProps) => {

    const [page, setPage] = useState(1);
    const [data, setData] = useState<any>([]);
    const [pages, setPages] = useState(1);
    
    const [focusedId, setFocusedId] = useState(0);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);

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

    const options: IOption[] = [
        {
            iconName: "delete",
            function: toggleDelete
        },
        {
            iconName: "edit",
            function: toggleEdit
        }
    ]
    const loadData = async () => {
        var response = await internalAPI.jsonRequest(`/${UserPropsTypeToEndpoint[kind]}?page=${page}&items=${items}`, "GET");
        if(!response || response.statusCode != 200)
            toast.error(`Error on load ${UserPropsTypeToTitle[kind]}`, {toastId: `error-on-load-${kind}`})

        setData(response.data);
        setPages(response.info?.totalPages ?? 1)

    }   

    const changePage = (index: number) => {
        setPage(index)
    }

    useEffect(() => {
        loadData();
    },[page])

    return(
        <section className={styles.table_container}>
            <section className={styles.table_header}>
                <Text fontSize="xl2" fontWeight="bold">{ t(`usersOverview.properties.${kind}.title`)}</Text>
                <Button variant="secondary_icon" onClick={() => toggleCreate()}>
                    <Icon name="add" size="md"/>
                </Button>
            </section>
            <TableView data={data} hasOptions hasNotation options={options} />
            {
                pages > 1 &&
                    <Pagination current={page} pages={pages} onChange={changePage} />
            }

            { createModalOpen && <CreateModal kind={kind} isOpen={true} onClose={closeModal} list={data} />}
            { editModalOpen && <UpdateModal id={focusedId} kind={kind} isOpen={true} onClose={closeModal} /> }
            { deleteModalOpen && <DeleteModal id={focusedId} kind={kind}  isOpen={true} onClose={closeModal} /> }
        </section>
    )
}