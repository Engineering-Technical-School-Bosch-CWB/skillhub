import { useParams } from "react-router-dom"
import Header from "../../../../components/Header"
import Text from "../../../../typography";
import Form from "../../../../components/Form";

import styles from './styles.module.css';
import ReturnButton from "../../../../components/ReturnButton";

export default () => {

    const params = useParams();

    const submitForm = (e : any) => {
        console.log(e);
    }

    return (
        <>
            <Header />
            <main>
                <section className={`${styles.section_header} ${styles.align}`}>
                    <ReturnButton />
                    <Text fontSize="xl2" fontWeight="extrabold"> Nova Avaliação</Text>
                    <span></span>
                </section>
                <Form fields={[
                    {
                        fieldName: "Name",
                        label: 'Name'
                    },
                    {
                        fieldName: "Date",
                        label: "Date",
                        type:'date'
                    },
                    {
                        fieldName: "Description",
                        label: "Description"
                    },

                    {
                        fieldName: 'cb1',
                        type: "checkBox",
                        label: 'Competencia A'
                    },
                    {
                        fieldName: 'cb1',
                        type: "checkBox",
                        label: 'Competencia B'
                    },
                    {
                        fieldName: 'cb1',
                        type: "checkBox",
                        label: 'Competencia C'
                    },
                    {
                        fieldName: 'cb1',
                        type: "checkBox",
                        label: 'Competencia D'
                    }
                ]} 
                    onSubmit={(e) => {submitForm(e)}}/>
            </main>
        </>
    )
}