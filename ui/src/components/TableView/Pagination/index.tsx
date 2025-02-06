import Button from "@/components/Button"
import IPaginationProps from "./Pagination.interfaces"
import styles from "./styles.module.css"
import Text from "@/typography"
import Icon from "@/components/Icon"

export default ({pages, onChange, current}: IPaginationProps) => {
    
    const renderBtns = () => {
        let items = []
        for (let index = 1; index <= pages; index++) {
            items.push(
                <Button 
                    variant="rounded" 
                    className={`${styles.pagination_btn} ${current == index? styles.selected :""}`}
                    onClick={() => onChange(index)}
                >
                    <Text>{index}</Text>
                </Button>
            )            
        }
        return items;
    }

    return (
        <section className={styles.pagination_container}>
            <div className={styles.pagination_content}>
                <Button 
                    variant="select_rounded" 
                    className={`${styles.pagination_btn} ${styles.arrow}`} onClick={() => onChange(current - 1)}
                    disabled={current <= 1}
                >
                    <Icon name="chevron_left" size="md" /> 
                </Button>
                {renderBtns()}
                <Button 
                    variant="select_rounded" 
                    className={`${styles.pagination_btn} ${styles.arrow}`} onClick={() => onChange(current + 1)}
                    disabled={current >= pages}
                >
                    <Icon name="chevron_right" size="md" /> 
                </Button>
            </div>
        </section>
    )
}