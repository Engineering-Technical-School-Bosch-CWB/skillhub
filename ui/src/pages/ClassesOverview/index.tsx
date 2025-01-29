import ExplorerContainer from "../../components/ExplorerContainer"
import Header from "../../components/Header"
import internalAPI from "../../service/internal.services";
import getHex from "../../constants/getHex";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SectionHeader from "@/components/SectionHeader";

const ClassesOverview = () => {

    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [cardsData, setCardsData] = useState([])

    const toggleAdd = () => navigate("new")

    const getData = async () => {
        const response = await internalAPI.jsonRequest(`/classes?${new URLSearchParams({ query: search })}`, "GET");

        if (!response || response.statusCode != 200) {
            if (!toast.isActive("classes-load-error"))
                toast.error("Something went wrong.", { toastId: "classes-load-error" });
            navigate("/home");
        }

        const content = response.data;

        setCardsData(content.map((c: { name: string; id: number; startingYear: string; }) => ({
            color: getHex(c.name),
            goTo: c.id,
            subtitle: c.startingYear,
            title: c.name,
            variant: "card"
        })))
    }

    useEffect(() => {
        getData();
    }, [search])

    return (
        <div>
            <Header />
            <main>
                <SectionHeader links={[{
                    label: "Classes Overview",
                }]} />
                <ExplorerContainer
                    title={"Classes"}
                    folderPath={"a"}
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