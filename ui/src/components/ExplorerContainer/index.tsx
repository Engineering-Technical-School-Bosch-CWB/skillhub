import { useState } from "react";
import Text from "../../typography";
import Button from "../Button";
import Icon from "../Icon";
import Input from "../Input";
import IdentificationCard from "./Components/IdentificationCard";
import {SelectView, SelectViewType } from "./Components/SelectView";
import IIdentificationCardProps from "./Components/IdentificationCard/IIdentificationCardProps";
import styles from "./style.module.css";
import { IExplorerContainerProps } from "./Interfaces/ExplorerContainer.interfaces";
import { Link } from "react-router-dom";


const ExplorerContainer = ( {folderPath, addPath, title, data}: IExplorerContainerProps ) =>
{

    const [view, setView] = useState<SelectViewType>("card");

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
                    {title}
                </Text>   
                
                <div className={`${styles.searchContainer} ${styles.align}`}>
                    {
                        addPath?
                            <Link 
                                className={`${styles.addBtn} ${styles.align}`} 
                                to={addPath}
                            >
                                <Icon name="add" size="md" />
                            </Link>
                        : <></>
                    }
                    <Input type="text" label="Pesquisar" iconName="search" />
                </div>     
                
                <SelectView type={view} change={(e : SelectViewType) => setView(e)}/>        
                
                {
                    folderPath?
                        <Link
                            className={`${styles.folderBtn}`}
                            to={folderPath}
                        >
                            <Icon name="folder_open" size="md" />
                        </Link>
                    : <></>
                }
            </div>

            <div className={`${styles.listContainer} ${view == "list" ? styles.tableListContainer : ''} `}>
                <IdentificationCard color="#0197ee" variant={view} title="DTA 2022" subtitle="2022 / 01" icon="group" iconDetails="18" goTo={`class/${1}`} />
                <IdentificationCard color="#0197ee" variant={view} title="DTA 2022" subtitle="2022 / 01" icon="group" iconDetails="18" />
                <IdentificationCard color="#0197ee" variant={view} title="DTA 2022" subtitle="2022 / 01" icon="group" iconDetails="18" />
                <IdentificationCard color="#0197ee" variant={view} title="DTA 2022" subtitle="2022 / 01" icon="group" iconDetails="18" />
                <IdentificationCard {...list[0]} />
            </div>
        </div>
    )
} 



export default ExplorerContainer;