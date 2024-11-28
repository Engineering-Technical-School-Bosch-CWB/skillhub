import styled from "./styles.module.css"
import Header from "../../components/Header"
import Heading from "../../typography/Heading/Heading.typography"
import ExploitationBarChart from "./components/ExploitationBarChart"
import DoughnutChart from "../../components/DoughnutChart"

export default () => {
    return (
        <div>
            <Header/>
            <div className={styled.content}>
                <div className={styled.chart_section}>
                    <Heading>Results</Heading>
                    <div className={styled.chart_container}>
                        <ExploitationBarChart/>
                        <DoughnutChart exploitation={50} />
                    </div>
                    <div className={styled.legend_container}>
                        <p>Exploitation per Subject</p>
                        <p>Overall Exploitation</p>
                    </div>
                </div>
                <hr className={styled.divider}/>
                <div>
                    <div className={styled.filter_container}>

                    </div>
                    <div className={styled.card_container}>

                    </div>
                </div>
            </div>
        </div>
    )
}