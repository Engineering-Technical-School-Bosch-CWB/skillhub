import Icon from "../Icon";
import Input from "../Input";
import Button from "../Button";
import Text from "../../typography";
import styles from "./style.module.css";
import IdentificationCard from "./Components/IdentificationCard";

import { useState } from "react";
import { Link } from "react-router-dom";
import { SelectView, SelectViewType } from "./Components/SelectView";
import { IExplorerContainerProps } from "./Interfaces/ExplorerContainer.interfaces";
import Select from "../Select";

const ExplorerContainer = ({ input, folderPath, onAddHandle, title, data, filter, button }: IExplorerContainerProps) => {

    const [view, setView] = useState<SelectViewType>("card");

    return (
        <div className={`${styles.explorerContainer}`} >
            <div className={`${styles.space_between}`}>
                <Text fontSize="xl2" fontWeight="bold" >
                    {title}
                </Text>
                {
                    button &&
                    <Button variant="primary_icon" onClick={() => button.onClick()}><Icon name="settings" /></Button>
                }
            </div>
            <div className={`${styles.explorerHeader} ${styles.align}`}>

                <div className={`${styles.searchContainer} ${styles.align}`}>
                    <Input type="text" label="Search" iconName="search" value={input.search} onChange={(e) => input.onChange(e.target.value)} width={"25rem"} />
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
                    folderPath &&
                    <Link
                        className={`${styles.folderBtn}`}
                        to={folderPath}
                    >
                        <Icon name="folder_open" size="md" />
                    </Link>
                }
            </div>

            <div className={`${styles.listContainer} ${view == "list" ? styles.tableListContainer : ''} `}>
                {
                    data.map((e, i) => {
                        return (
                            <>
                                <IdentificationCard key={i} color={e.color} variant={view} title={e.title} subtitle={e.subtitle} icon={e.icon} iconDetails={e.iconDetails} goTo={e.goTo} />
                                {/* <IdentificationCard {...e}/> */}
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}



export default ExplorerContainer;