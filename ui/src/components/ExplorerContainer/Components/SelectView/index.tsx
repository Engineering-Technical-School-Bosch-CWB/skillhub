import Button from "../../../Button";
import Icon from "../../../Icon";
import styles from "../../style.module.css"


type SelectViewType = "list" | "card"

interface ISelectViewProps {
    type: SelectViewType,
    change: Function
}

const SelectView = ( props: ISelectViewProps ) => 
    <div 
        className={`${styles.selectView}`}
    >
        <Button 
            variant={props.type == "list" ? "contained" : "outlined"}
            onClick={() => props.change("list")}
            className={`${styles.selectViewBtn}`}
        >
            <Icon name="list" size="md" /> 
        </Button>
        <Button 
            variant={props.type == "card" ? "contained" : "outlined"}
            onClick={() => props.change("card")}
            className={`${styles.selectViewBtn}`}
        >
            <Icon name="widgets" size="md" /> 
        </Button>
    </div>

export { SelectView };
export type { SelectViewType, ISelectViewProps };
