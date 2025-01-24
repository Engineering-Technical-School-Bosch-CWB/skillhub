import ExplorerContainer from "../../components/ExplorerContainer"
import Header from "../../components/Header"
import internalAPI from "../../service/internal.services";
import getHex from "../../constants/getHex";

import { useEffect, useState } from "react";

const ClassesOverview = () => {

    const [search, setSearch] = useState("");
    const [cardsData, setCardsData] = useState([])

    const getData = async () => {
        const response = await internalAPI.jsonRequest(`/classes?${new URLSearchParams({query: search})}`, "GET");
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
                <ExplorerContainer title={"Classes"} folderPath={"a"} data={cardsData} input={{
                    search: search,
                    onChange: setSearch
                }} />
            </main>
        </div>
    )
}

export default ClassesOverview;