import { useState } from "react";
import Text from "../../typography";
import Icon from "../Icon";
import Input from "../Input";
import IdentificationCard from "./Components/IdentificationCard";
import {SelectView, SelectViewType } from "./Components/SelectView";
import styles from "./style.module.css";
import { IExplorerContainerProps } from "./Interfaces/ExplorerContainer.interfaces";
import { Link } from "react-router-dom";
import Button from "../Button";

const ExplorerContainer = ( {folderPath, onAddHandle, title, data}: IExplorerContainerProps ) =>
{

    const [view, setView] = useState<SelectViewType>("card");

    return (
        <div className={`${styles.explorerContainer}`} >
            <Text fontSize="xl2" fontWeight="bold" >
                {title}
            </Text>   
            <div className={`${styles.explorerHeader} ${styles.align}`}>
                
                <div className={`${styles.searchContainer} ${styles.align}`}>
                    <Input type="text" label="Pesquisar" iconName="search"/>
                </div>     

                {
                    onAddHandle?
                        <Button 
                            className={`${styles.addBtn} ${styles.align}`} 
                            // to={addPath}
                            onClick={(e) => onAddHandle!(e)}
                        >
                            <Icon name="add" size="md" />
                        </Button>
                    : <></>
                }

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
                {
                    data.map(e => {
                        return (
                            <>
                                {/* <IdentificationCard color={`${e.color}`} variant={view} title={`${e.title}`} subtitle={`${e.subtitle}`} icon={`${e.icon}`} iconDetails={`${e.iconDetails}`} goTo={`${e.goTo}`} /> */}
                                <IdentificationCard {...e} />
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
} 



export default ExplorerContainer;