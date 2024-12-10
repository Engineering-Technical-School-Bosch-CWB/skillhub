import { useParams } from "react-router-dom"
import Header from "../../../../components/Header"
import Text from "../../../../typography";
import Form from "../../../../components/Form";

export default () => {

    const params = useParams();

    const submitForm = (e : any) => {
        console.log(e);
        
    }

    return (
        <>
            <Header />
            <main>

                <Text fontSize="xl2" fontWeight="extrabold"> Nova Avaliação</Text>
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
                        fieldName:'Competences',
                        
                    },
                    {
                        fieldName: 'cb1',
                        type: "checkBox",
                        label: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
                    }
                ]} 
                    onSubmit={(e) => {submitForm(e)}}/>
            </main>
        </>
    )
}