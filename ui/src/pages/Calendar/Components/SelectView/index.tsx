import styles from './styles.module.css';
import { t } from "i18next"
import { ViewKind } from "../.."
import TabNavigation from "./Components/TabNavigation"
import Text from "@/typography";
import Icon from "@/components/Icon";
import Link from "@/components/Link";

interface ISelectViewProps {
    currentView: ViewKind,
    currentYear: number,
    setSelectedView(value: ViewKind): void,
    currentMonth: string,
    monthPrevious(): void,
    monthForward(): void
}

export default ({
    currentView, setSelectedView, currentYear,
    currentMonth, monthForward, monthPrevious
}: ISelectViewProps) => {

    const items = [ t(`calendar.instructor`), t(`calendar.class`) ]

    const onSelect = (index: number) => {
        const val: ViewKind[] = ["instructor", "class"]
        setSelectedView(val[index])
    }

    return(
        <div className={styles.calendar_select_view_container}>
            <TabNavigation items={items} current={t(`calendar.${currentView}`)} onSelect={onSelect}  /> 
            <span className={styles.month_select}>
                <Link to="" onClick={monthPrevious}>
                    <Icon name="chevron_left" size="lg" />
                </Link>
                <Text className={styles.month} fontWeight="bold">
                    {t(`calendar.months.${currentMonth}`)}, {currentYear}
                </Text>
                <Link to="" onClick={monthForward}>
                    <Icon name="chevron_right" size="lg" />
                </Link>

            </span>
        </div>
    )
}