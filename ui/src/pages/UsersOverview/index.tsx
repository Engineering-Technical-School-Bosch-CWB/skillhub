import ExplorerContainer from "../../components/ExplorerContainer";
import Header from "../../components/Header";
import internalAPI from "../../service/internal.services";
import getHex from "../../constants/getHex";

import { useEffect, useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { useNavigate, useNavigation } from "react-router-dom";

const UsersOverview = () => {
    
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const navigation = useNavigate();
    const [position, setPosition] = useState<number>();
    const [positions, setPositions] = useState([]);
    
    const positionFilter = {
        name: "Position",
        params: positions,
        setValue: setPosition
    }

    const getData = async () => {

        const params = new URLSearchParams();
        if (search) params.append('query', search);
        if (Number(position)) params.append('positionId', String(position))

        const response = await internalAPI.jsonRequest(`/users/paginated?${params.toString()}`, "GET");
        const content = response.data;

        setUsers(content.map((u: { name: string; id: number; position: { name: string; }; sector: { name: string; }; }) => ({
            color: getHex(u.name),
            goTo:  "/user-profile?userId=" + u.id,
            title: u.name,
            subtitle: u.position.name + " - " + u.sector.name,
        })))

        const positions = (await internalAPI.jsonRequest("/positions", "GET")).data;
        setPositions(positions.map((p: { name: string; id: number; }) => ({
            key: p.name,
            value: p.id
        })))
    }

    useEffect(() => {
        getData();
    }, [search, position])

    return (
        <>
            <Header />
            <main>
                <SectionHeader links={[{
                    label: "Users"
                }]} />
                <ExplorerContainer filter={[positionFilter]} data={users} title={"Users"} onAddHandle={() => {}} input={{
                    search: search,
                    onChange: setSearch
                }} button={{
                    icon: "settings",
                    onClick: () => {navigation("/users-properties")}
                    // criate position create sector and create occupation area
                }} />
            </main>
        </>
    )
}

export default UsersOverview;