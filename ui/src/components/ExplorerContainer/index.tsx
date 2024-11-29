import { useState } from "react";
import Text from "../../typography";
import Button from "../Button";
import Icon from "../Icon";
import Input from "../Input";
import IdentificationCard from "./Components/IdentificationCard";
import {SelectView, SelectViewType } from "./Components/SelectView";
import IIdentificationCardProps from "./Components/IdentificationCard/IIdentificationCardProps";
import styles from "./style.module.css";


interface ExplorerContainerProps {
    title: string,
    folderPath: string,
    data: IIdentificationCardProps[]
}

const ExplorerContainer = ( props?: ExplorerContainerProps ) =>
{

    const [view, setView] = useState<SelectViewType>("card");

    const toggleCard =( aa : string ) => {
        console.log(aa);
        
    }

    const list : IIdentificationCardProps[] = [
        {
            variant: "card",
            color: "#0197ee",
            icon:"group",
            iconDetails: "12",
            subtitle: "2012",
            title: "TDS"
        }
    ]

    return (
        <div className={`${styles.explorerContainer}`} >
            <div className={`${styles.explorerHeader} ${styles.align}`}>
                
                <Text fontSize="xl" fontWeight="bold" >
                    Title
                </Text>   
                
                <div className={`${styles.searchContainer} ${styles.align}`}>
                    <Button variant="contained" className={`${styles.addBtn}`} >
                        <Icon name="add" size="md" />
                    </Button>
                    <Input type="text" label="Pesquisar" />
                </div>     
                
                <SelectView type={view} change={(e : SelectViewType) => setView(e)}/>        
                
                <Button>
                    <Icon name="folder" size="md" />
                </Button>
            </div>

            <div className={`${styles.listContainer} ${view == "list" ? styles.tableListContainer : ''} `}>
                <IdentificationCard color="#0197ee" variant={view} title="DTA 2022" subtitle="2022 / 01" icon="group" iconDetails="18" onClick={() => toggleCard("eita")} />
                <IdentificationCard color="#0197ee" variant={view} title="DTA 2022" subtitle="2022 / 01" icon="group" iconDetails="18" />
                <IdentificationCard color="#0197ee" variant={view} title="DTA 2022" subtitle="2022 / 01" icon="group" iconDetails="18" />
                <IdentificationCard color="#0197ee" variant={view} title="DTA 2022" subtitle="2022 / 01" icon="group" iconDetails="18" />
                <IdentificationCard {...list[0]} />
            </div>
        </div>
    )
} 



export default ExplorerContainer;