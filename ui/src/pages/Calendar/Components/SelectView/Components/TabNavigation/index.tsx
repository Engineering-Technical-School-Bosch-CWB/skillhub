export interface ITabNavigationProps {
    onSelect(index: number): void,
    items: string[],
    current?: string
}

import styles from './styles.module.css';

export default ({items, current, onSelect}: ITabNavigationProps) => {
    return (
        <div className={styles.tab_navigation_container}>
            {
                items.map( (item, _index) => {
                    return (
                        <span 
                            className={`${styles.tab_item} ${item == current? styles.selected : ""} `}
                            onClick={() => onSelect(_index)}
                        >
                            {item}
                        </span>
                    )
                })
            }
        </div>
    )
}