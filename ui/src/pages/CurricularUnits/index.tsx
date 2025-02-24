import Header from "@/components/Header";

import SectionHeader from "@/components/SectionHeader";
import { ISectionHeaderProps } from "@/components/SectionHeader/interfaces";
import { useEffect, useState } from "react";
import internalAPI from "@/service/internal.services";
import { toast } from "react-toastify";
import CreateModal from "../SchoolContent/components/CreateModals/CreateModal";
import ExplorerContainer from "@/components/ExplorerContainer";
import IIdentificationCardProps from "@/components/ExplorerContainer/Components/IdentificationCard/interfaces";
import { CurricularUnit } from "@/interfaces/models/ICurricularUnit";
import getHex from "@/constants/getHex";

const CurricularUnits = () => {
    const [data, setData] = useState([]);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [items, setItems] = useState(0); 

    const [search, setSearch] = useState<string>("");

    const sectionHeaderProps: ISectionHeaderProps = {
        links: [
            {
                label:"Curricular Units"
            }
        ]
    }

    const loadData = async () => { 
        const response = await internalAPI.jsonRequest(`/curricularUnits?page=${page}&items=${items}&query=${search}`, "GET");
        if (!response || response.statusCode != 200) 
            if (!toast.isActive(`curricular-units-load-error`))
                toast.error(`Error on load Curricular Units.`, { toastId: `curricular-units-load-error` });

        setData(response.data)
    }

    useEffect(() => {
        loadData();
    }, [])

    useEffect(() => {
        loadData();
    }, [search])

    return(
        <>
            <Header />
            <main>
                <SectionHeader {...sectionHeaderProps} /> 
                <ExplorerContainer 
                    data={data.map((cUnit: CurricularUnit) => {
                        let res: IIdentificationCardProps={
                            title: cUnit.name,
                            color: getHex(cUnit.name),
                            goTo: `${cUnit.id}`,
                        }
                        return res;
                    })} 
                    input={{
                        onChange: setSearch,
                        search: search
                    }} 
                    title="Curricular Units"
                />

                {/* <TableView data={data} hasNotation={true} hasOptions={true} options={options} /> */}
                {/* <Pagination pages={maxPages} current={page} onChange={changePage} /> */}
            </main>            
            { createModalOpen && <CreateModal kind={"curricularUnits"} isOpen={true} onClose={() => setCreateModalOpen(false)} />}
        </>
    )
}

export default CurricularUnits;