import styled from "./styles.module.css"
import Header from "../../components/Header"
import ExploitationBarChart from "./components/ExploitationBarChart"
import DoughnutChart from "../../components/Charts/DoughnutChart"
import Text from "../../typography"
import Divider from "../../components/Divider"
import ExplorerContainer from "../../components/ExplorerContainer"
import IIdentificationCardProps from "../../components/ExplorerContainer/Components/IdentificationCard/interfaces"
import { useEffect, useState } from "react"
import internalAPI from "../../service/internal.services"
import { IResult } from "../Login/interfaces"

const data: IIdentificationCardProps[] = [
    {
        title: "C# Básico",
        subtitle: "20/09/2024",
        iconDetails: "50%",
        color: "#00884a",
        goTo: "/aprentice/results/subject/8"
    },
    {
        title: "Excel", 
        subtitle: "20/09/2024",
        iconDetails: "89%", 
        color: "#ed0007",
        goTo: "/aprentice/results/subject/8"
    },
    {
        title: "Java Básico", 
        subtitle: "20/09/2024",
        iconDetails: "78%",  
        color: "#9e2896",
        goTo: "/aprentice/results/subject/8"
    },
    {
        title: "IoT",
        subtitle: "20/09/2024",
        iconDetails: "95%",
        color: "#0197ee",
        goTo: "/aprentice/results/subject/8"
    },
    {
        title: "Java Avançado",
        subtitle: "15/08/2024",
        iconDetails: "70%",
        color: "#ffcf00",
        goTo: "/aprentice/results/subject/8"
    }
]

const AprenticesResults = () => {
    const [barChartData, setBarChartData] = useState<IResult[]>();

    // useEffect(() => {
    //     handleFetch();
    // }, []);

    // const handleFetch() => {
    //     const data = internalAPI.jsonRequest("/students/results", 'POST');
    // }

    return (
        <div>
            <Header />
            <main>
                <div className={styled.chart_section}>
                    <Text variant="span" fontWeight="bold" fontSize="xl2">Results</Text>
                    <div className={styled.chart_container}>
                        <ExploitationBarChart/>
                        <DoughnutChart title="Overall Exploitation" exploitation={50} />
                    </div>
                </div>
                <Divider size="big"/>
                <div className={styled.classes_section}>
                    <ExplorerContainer title={"Subjects"} data={data} />
                </div>
            </main>
        </div>
    )
}

export default AprenticesResults;