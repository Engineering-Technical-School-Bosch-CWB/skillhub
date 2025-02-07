import Header from "@/components/Header";
import SectionHeader from "@/components/SectionHeader";
import { ISectionHeaderProps } from "@/components/SectionHeader/interfaces";
import Table from "./components/table";


const UsersProperties = () => {
    const headerSectionProps: ISectionHeaderProps = {
        links: [
            {
                label: "Users",
                goTo: "/users"
            },
            {
                label: "Properties",
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