import ExplorerContainer from "../../components/ExplorerContainer";
import Header from "../../components/Header";
import internalAPI from "../../service/internal.services";
import getHex from "../../constants/getHex";

import { useEffect, useState } from "react";

const UsersOverview = () => {
    
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    
    const [cargo, setCargo] = useState();
    
    const cargo_ = {
        name: "Position",
        params: [
            {
                name: "Meio Oficial",
                value: 1,
            },
            {
                name: "Aprendiz",
                value: 2
            }
        ],
        setValue: setCargo
    }

    const getData = async () => {
        const response = await internalAPI.jsonRequest(`/users/paginated?${new URLSearchParams({query: search})}`, "GET");
        const content = response.data;
        console.log(content)

        setUsers(content.map((u: { name: string; id: number; position: { name: string; }; sector: { name: string; }; }) => ({
            color: getHex(u.name),
            goTo:  u.id,
            title: u.name,
            subtitle: u.position.name + " - " + u.sector.name,
        })))
    }

    useEffect(() => {
        getData();
        console.log(search)
    }, [search])

    return (
        <>
            <Header />
            <main>
                <ExplorerContainer filter={[cargo_]} data={users} title={"Users"} onAddHandle={() => {}} input={{
                    search: search,
                    onChange: setSearch
                }} />
            </main>
        </>
    )
}

export default UsersOverview;