import Header from "@/components/Header";

import styles from "./styles.module.css";
import SectionHeader from "@/components/SectionHeader";
import { ISectionHeaderProps } from "@/components/SectionHeader/interfaces";
import TableView from "@/components/TableView";
import Text from "@/typography";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { useEffect, useState } from "react";
import { IOption } from "@/components/TableView/interfaces";
import internalAPI from "@/service/internal.services";
import { toast } from "react-toastify";
import { OccupationArea } from "@/interfaces/models/IOccupationArea";
import Pagination from "@/components/TableView/Pagination";
import CreateModal from "../SchoolContent/components/CreateModals/CreateModal";
import { useNavigate } from "react-router-dom";

const CurricularUnits = () => {
    const [options, setOptions] = useState<IOption[]>([]);
    const [data, setData] = useState([]);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);
    const [items, setItems] = useState(10); 
    const navigate = useNavigate();

    const sectionHeaderProps: ISectionHeaderProps = {
        links: [
            {
                label:"Curricular Units"
            }
        ]
    }

    const loadData = async () => { 
        const response = await internalAPI.jsonRequest(`/curricularUnits?page=${page}&items=${items}`, "GET");
        if (!response || response.statusCode != 200) 
            if (!toast.isActive(`curricular-units-load-error`))
                toast.error(`Error on load Curricular Units.`, { toastId: `curricular-units-load-error` });
        
        setMaxPages(response.info?.totalPages ?? 1)
        setCourseOptions(response.data);
    }

    const setCourseOptions = (data: any) => {
        const classConstructor = OccupationArea;
        
        const values = data.map((e: any) => {
            const res = new classConstructor(e).convert();
            return res
        })
        const options: IOption[] = [
            {
                function: toDetails,
                iconName: "chevron_right"
            }
        ] 
        setData(values);
        setOptions(options);
    }

    const changePage = (index: number) => {
        setPage(index);
    }

    const toDetails = (isOpen: boolean,id: number) => {
        navigate(`${id}`)
    }

    useEffect(() => {
        loadData();
    }, [])

    return(
        <>
            <Header />
            <main>
                <SectionHeader {...sectionHeaderProps} /> 
                <section className={styles.table_header}>
                <Text fontSize="xl2" fontWeight="bold">Curricular Units</Text>
                    <Button variant="secondary_icon" onClick={() => setCreateModalOpen(true)}>
                        <Icon name="add" size="md"/>
                    </Button>
                </section>
                <TableView data={data} hasNotation={true} hasOptions={true} options={options} />
                <Pagination pages={maxPages} current={page} onChange={changePage} />
            </main>            
            { createModalOpen && <CreateModal kind={"curricularUnits"} isOpen={true} onClose={() => setCreateModalOpen(false)} />}
        </>
    )
}

export default CurricularUnits;