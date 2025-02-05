import { useEffect, useState } from "react"
import { Tabs } from "../links"
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

export default ( {kind}: ICrudContainerProps ) => {

    const [data, setData] = useState([]);
    const [options, setOptions] = useState<IOption[]>([]);

    const [page, setPage] = useState(0);
    const [items, setItems] = useState(0);

    const tabName = {
        "home":"Home",
        "course":"Course",
        "curricularUnits":"Curricular Unit",
        "subjectAreas":"Subject Area",
    }

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

    const toggleEdit = (isOpen: boolean, id: number) => {
        //! edit logic
    }
    const toggleDelete = (isOpen: boolean, id: number) => {
        //! delete logic
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

    return(
        <>
            <section className={styles.table_header}>
                <Text fontSize="xl" fontWeight="bold">{tabName[kind]}</Text>
                <Button variant="primary_icon"><Icon name="add" /></Button>
            </section>
            <TableView data={data} hasNotation={false} hasOptions={true} options={options} />
        </>
    )
}