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
                <div>
                    <Heading>Results</Heading>
                    <div className={styled.chart_container}>
                        <ExploitationBarChart/>
                        <DoughnutChart exploitation={50}/>
                    </div>
                </div>
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