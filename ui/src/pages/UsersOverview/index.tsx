import ExplorerContainer from "../../components/ExplorerContainer";
import Header from "../../components/Header";
import internalAPI from "../../service/internal.services";
import getColor from "../../constants/getHex";

import { useEffect, useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { useNavigate } from "react-router-dom";
import UpdateProfileModal from "../UserProfile/components/UpdateProfileModal";
import { t } from "i18next";

const UsersOverview = () => {
    
    const navigation = useNavigate();

    const [search, setSearch] = useState("");

    const [usersData, setUsersData] = useState([]);
    const [arquivedUsersData, setArquivedUsersData] = useState([]);

    const [position, setPosition] = useState<number>();
    const [positions, setPositions] = useState([]);
    const [createModal, setCreateModal] = useState(false);
    
    const positionFilter = {
        name: t('usersOverview.position'),
        params: positions,
        setValue: setPosition
    }

    const getData = async () => {

        const params = new URLSearchParams();
        if (search) params.append('query', search);
        if (Number(position)) params.append('positionId', String(position))

        const response = await internalAPI.jsonRequest(`/users/paginated?${params.toString()}`, "GET");
        const content = response.data;

        if(response.statusCode === 403 )   {
            navigation('/home');
            return;
        }

        setUsersData((content.filter((u: { isArchived: boolean; }) => !u.isArchived)).map((u: { name: string; id: number; position: { name: string; }; sector: { name: string; }; }) => ({
            color: getColor(u.name),
            goTo:  "/user-profile?userId=" + u.id,
            title: u.name,
            subtitle: u.position.name + " - " + u.sector.name,
        })))

        setArquivedUsersData((content.filter((u: { isArchived: boolean; }) => u.isArchived)).map((u: { name: string; id: number; position: { name: string; }; sector: { name: string; }; }) => ({
            color: getColor(u.name),
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
                    label: t('usersOverview.users')
                }]} />
                <ExplorerContainer 
                    filter={[positionFilter]} 
                    data={usersData} 
                    title={t('usersOverview.users')} 
                    folderData={arquivedUsersData}
                    onAddHandle={() => setCreateModal(true)} 
                    input={{
                        search: search,
                        onChange: setSearch
                    }} 
                    button={{
                        icon: "settings",
                        onClick: () => {navigation("/users-properties")}
                    
                }} />
            </main>
            <UpdateProfileModal 
                title={t('usersOverview.addUser')} 
                handleClose={() => setCreateModal(false)} 
                isCurrentUser={false} 
                open={createModal}
            />
        </>
    )
}

export default UsersOverview;