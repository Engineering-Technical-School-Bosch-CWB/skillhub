import styled from "./styles.module.css"
import Header from "../../components/Header"
import ExploitationBarChart from "./components/ExploitationBarChart"
import DoughnutChart from "../../components/DoughnutChart"
import Input from "../../components/Input"
import ClassCard from "./components/ClassCard"

const AprenticesResults = () => {
    return (
        <div>
            <Header/>
            <div className={styled.content}>
                <div className={styled.chart_section}>
                    <span className={styled.heading}>Results</span>
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
						<ClassCard title="C# Básico" startDate="20/09/2024" exploitation={40}/>
						<ClassCard title="Java Avançado" startDate="15/08/2024" exploitation={85}/>
						<ClassCard title="Java Avançado" startDate="15/08/2024" exploitation={85}/>
						<ClassCard title="Java Avançado" startDate="15/08/2024" exploitation={85}/>
						<ClassCard title="Java Avançado" startDate="15/08/2024" exploitation={85}/>
						<ClassCard title="Java Avançado" startDate="15/08/2024" exploitation={85}/>
						<ClassCard title="Java Avançado" startDate="15/08/2024" exploitation={85}/>
						<ClassCard title="Java Avançado" startDate="15/08/2024" exploitation={85}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AprenticesResults;