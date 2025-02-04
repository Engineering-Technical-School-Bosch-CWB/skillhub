import Header from "../../components/Header";
import Nav from "@/components/Nav";

import {links, Tabs} from "./links"
import Courses from "./components/Courses";
import SubjectArea from "./components/SubjectArea";
import CurricularUnit from "./components/CurricularUnit";
import { useLocation } from "react-router-dom";
 

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const SchoolContent = () => {

    const query = useQuery();

    const content = {
        "home":"",
        "courses": <Courses />,
        "curricularUnit": <CurricularUnit />,
        "subjectArea": <SubjectArea />
    }

    const renderTab = () => {
        const tab = query.get("tab")?.toString() as Tabs
        return content[tab]
    }

    return (
        <>
            <Header />
            <Nav links={links} />
            <main>
                {renderTab()}

            </main>
        </>
    )
}

export default SchoolContent;