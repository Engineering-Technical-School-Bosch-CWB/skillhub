import getHex from "@/constants/getHex";
import Header from "@/components/Header";
import internalAPI from "@/service/internal.services";
import ExplorerContainer from "@/components/ExplorerContainer";
import CreateModal from "../SchoolContent/components/CreateModals/CreateModal";
import IIdentificationCardProps from "@/components/ExplorerContainer/Components/IdentificationCard/interfaces";
import SectionHeader from "@/components/SectionHeader";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { ISectionHeaderProps } from "@/components/SectionHeader/interfaces";
import { CurricularUnit } from "@/interfaces/models/ICurricularUnit";
import Progress from "@/components/Progress";

const CurricularUnits = () => {
    const [data, setData] = useState([]);
    const [createModalOpen, setCreateModalOpen] = useState(false);

    const [search, setSearch] = useState<string>("");
    const [subjectArea, setSubjectArea] = useState<number>();
    const [subjectAreas, setSubjectAreas] = useState([]);

    const [loading, setLoading] = useState(true);

    const subjectAreaFilter = {
        name: "Subject Area",
        params: subjectAreas,
        setValue: setSubjectArea
    }

    const sectionHeaderProps: ISectionHeaderProps = {
        links: [
            {
                label: "Curricular Units"
            }
        ]
    }

    const getData = async () => {

        console.log(subjectArea)

        const apiRequest = async () => {

            const params = new URLSearchParams();
            if (search) params.append('query', search);
            if (Number(subjectArea)) params.append('subjectAreaId', String(subjectArea));

            const response = await internalAPI.jsonRequest(`/curricularUnits?${params.toString()}`, "GET");

            if (!response || response.statusCode != 200)
                if (!toast.isActive(`curricular-units-load-error`))
                    toast.error(`Error on load Curricular Units.`, { toastId: `curricular-units-load-error` });

            console.log(response.data)

            return response.data;
        }

        setData(await apiRequest());

        const apiAreasRequest = async () => {
            const response = await internalAPI.jsonRequest(`/subjectAreas`, "GET");

            if (!response || response.statusCode != 200)
                if (!toast.isActive(`curricular-units-load-error`))
                    toast.error(`Error on load Curricular Units.`, { toastId: `curricular-units-load-error` });

            return response.data;
        }

        setSubjectAreas((await apiAreasRequest()).map((p: { name: string; id: number; }) => ({
            key: p.name,
            value: p.id
        })));

        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        getData();
    }, [search, subjectArea])

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
                <ExplorerContainer
                    data={data.map((cUnit: CurricularUnit) => {
                        let res: IIdentificationCardProps = {
                            title: cUnit.name,
                            subtitle: cUnit.subjectArea?.name ?? "No subject area",
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
                    filter={[subjectAreaFilter]}
                    onAddHandle={() => {}}
                />
            </main>
            {createModalOpen && <CreateModal kind={"curricularUnits"} isOpen={true} onClose={() => setCreateModalOpen(false)} />}
        </>
    )
}

export default CurricularUnits;