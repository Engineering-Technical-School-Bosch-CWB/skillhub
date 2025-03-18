import Header from "@/components/Header";
import SectionHeader from "@/components/SectionHeader";
import { ISectionHeaderProps } from "@/components/SectionHeader/interfaces";
import Table from "./components/table";
import { t } from "i18next";


const UsersProperties = () => {
    const headerSectionProps: ISectionHeaderProps = {
        links: [
            {
                label: t('usersOverview.users'),
                goTo: "/users"
            },
            {
                label: t('usersOverview.properties.properties'),
            },

        ]
    }
    return (
        <>
            <Header />
            <main>
                <SectionHeader links={headerSectionProps.links} />
                <Table kind="position"/> 
                <Table kind="sector"/> 
            </main>
        </>
    )
}

export default UsersProperties;