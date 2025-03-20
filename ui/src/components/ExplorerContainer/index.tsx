import Icon from "../Icon";
import Input from "../Input";
import Button from "../Button";
import Text from "../../typography";
import styles from "./styles.module.css";
import IdentificationCard from "./Components/IdentificationCard";

import { useEffect, useState } from "react";
import { SelectView, SelectViewType } from "./Components/SelectView";
import { IExplorerContainerProps } from "./Interfaces/ExplorerContainer.interfaces";
import Select from "../Select";
import IIdentificationCardProps from "./Components/IdentificationCard/interfaces";

const ExplorerContainer = ({ input, folderData, onAddHandle, title, subtitle, data, filter, button }: IExplorerContainerProps) => {

    const [view, setView] = useState<SelectViewType>("card");
    const [archivedView, setArchivedView] = useState(false);

    const [cardsData, setCardsData] = useState<IIdentificationCardProps[]>(data);

    useEffect(() => {
        setCardsData(archivedView ? folderData! : data);
    }, [archivedView, data])

    return (
        <div className={`${styles.explorerContainer}`} >
            <div className={`${styles.space_between}`}>
                <div className={`${styles.col}`}>
                    <Text fontSize="xl2" fontWeight="bold" >
                        {title}
                    </Text>
                    {
                        subtitle &&
                        <Text>{subtitle}</Text>
                    }
                </div>
                {
                    button &&
                    <Button variant="primary_icon" onClick={() => button.onClick()}><Icon name="settings" /></Button>
                }
            </div>
            <div className={`${styles.explorerHeader} ${styles.align}`}>

                <div className={`${styles.searchContainer} ${styles.align}`}>
                    <Input type="text" label="Search" iconName="search" value={input.search} onChange={(e) => input.onChange(e.target.value)} width={"25rem"} maxLength={50} />
                </div>

                {
                    onAddHandle &&
                    <Button
                        className={`${styles.addBtn} ${styles.align}`}
                        // to={addPath}
                        onClick={(e: any) => onAddHandle!(e)}
                    >
                        <Icon name="add" size="md" />
                    </Button>
                }

                {
                    filter &&
                    filter.map((f, i) => (
                        <div key={i} className={`${styles.filter_container}  ${styles.align}`}>
                            <Select data={f.params} label={f.name} onChange={(e) => f.setValue(e.target.value)} />
                        </div>
                    ))
                }

                <SelectView type={view} change={(e: SelectViewType) => setView(e)} />

                {
                    folderData &&
                    <Button
                        className={`${styles.folderBtn}`}
                        variant={archivedView ? "contained" : "outlined"}
                        onClick={() => setArchivedView(!archivedView)}
                    >
                        <Icon name="folder_open" size="md" />
                    </Button>
                }
            </div>

            <div className={`${styles.listContainer} ${view == "list" ? styles.tableListContainer : ''} `}>
                {
                    cardsData.map((e, i) => {
                        return (
                            <>
                                <IdentificationCard key={i} color={e.color} variant={view} title={e.title} subtitle={e.subtitle} icon={e.icon} iconDetails={e.iconDetails} goTo={e.goTo} archived={archivedView} />
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}



export default ExplorerContainer;