import styled from "./styles.module.css"
import Header from "../../components/Header"
import ExploitationBarChart from "./components/ExploitationBarChart"
import DoughnutChart from "../../components/DoughnutChart"
import Input from "../../components/Input"
import ClassCard from "./components/ClassCard"
import Text from "../../typography"

const AprenticesResults = () => {
    return (
        <div>
            <Header/>
            <div className={styled.content}>
                <div className={styled.chart_section}>
                    <Text variant="span" fontWeight="bold" fontSize="xl2">Results</Text>
                    <div className={styled.chart_container}>
                        <ExploitationBarChart/>
                        <DoughnutChart exploitation={50} />
                    </div>
                </div>
                <hr className={styled.divider}/>
                <div className={styled.classes_section}>
                    <div className={styled.filter_container}>
						<Input label="Search subjects..." iconName="search" className={styled.input}/>
                    </div>
                    <div className={styled.card_container}>
						<ClassCard title="C# Básico" startDate="20/09/2024" exploitation={67} color={"#00884a"}/>
                        <ClassCard title="Excel" startDate="20/09/2024" exploitation={40} color={"#ed0007"}/>
                        <ClassCard title="Java Básico" startDate="20/09/2024" exploitation={98} color={"#9e2896"}/>
                        <ClassCard title="IoT" startDate="20/09/2024" exploitation={80} color={"#0197ee"}/>
						<ClassCard title="Java Avançado" startDate="15/08/2024" exploitation={85} color={"#ffcf00"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AprenticesResults;