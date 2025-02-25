import ExplorerContainer from "../../components/ExplorerContainer"
import Header from "../../components/Header"
import internalAPI from "../../service/internal.services";
import getHex from "../../constants/getHex";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SectionHeader from "@/components/SectionHeader";
import Progress from "@/components/Progress";

const ClassesOverview = () => {

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [cardsData, setCardsData] = useState([]);
    const [archivedCardsData, setArchivedCardsData] = useState([]);

    const toggleAdd = () => navigate("new")

    const getData = async () => {
        
        const response = await internalAPI.jsonRequest(`/classes?${new URLSearchParams({ query: search })}`, "GET");

        if (!response.success) {
            if (!toast.isActive("classes-load-error"))
                toast.error("Something went wrong.", { toastId: "classes-load-error" });
            navigate("/home");
        }

        const content = response.data;

        setCardsData((content.filter((c: { isArchived: boolean; }) => !c.isArchived)).map((c: { name: string; id: number; startingYear: string; }) => ({
            color: getHex(c.name),
            goTo: c.id,
            subtitle: c.startingYear,
            title: c.name,
            variant: "card"
        })));

        setArchivedCardsData((content.filter((c: { isArchived: boolean; }) => c.isArchived)).map((c: { name: string; id: number; startingYear: string; }) => ({
            color: getHex(c.name),
            goTo: c.id,
            subtitle: c.startingYear,
            title: c.name,
            variant: "card"
        })));

        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, [search])

    if (loading)
        return (
        <>
            <Header />
            <Progress />
        </>
    )


    return (
        <div>
            <Header />
            <main>
                <SectionHeader links={[{
                    label: "Classes Overview",
                }]} />
                <ExplorerContainer
                    title={"Classes"}
                    folderData={archivedCardsData}
                    data={cardsData}
                    onAddHandle={() => toggleAdd()}
                    input={{
                        search: search,
                        onChange: setSearch,
                    }}
                />
            </main>
        </div>
    )
}

export default ClassesOverview;