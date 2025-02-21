import styles from "./style.module.css"
import { ISectionHeaderProps } from "./interfaces"
import Link from "../Link"
import Text from "@/typography"

export default ({ links }: ISectionHeaderProps) => {
    return (
        <>
            <div className={`${styles.section}`}>
                {
                    !links
                        ? <span className={`${styles.disabled}`}><Text fontSize="sm">Home</Text></span>
                        :
                        <Link to={"/home"}>
                            <Text fontSize="sm">Home</Text>
                        </Link>
                }
                {links?.map((l, i) => (
                    <div key={i} className={`${styles.div}`}>
                        <span className={`${styles.disabled}`}> </span>
                        <span className={`material-symbols-outlined ${styles.arrow} ${styles.disabled}`}>
                            arrow_forward_ios
                        </span>
                        {

                            !l.goTo
                                ?
                                <span className={`${styles.disabled}`}>
                                    <Text fontSize="sm">{l.label}</Text>
                                </span>
                                :
                                <Link to={l.goTo}>
                                    <Text fontSize="sm">{l.label}</Text>
                                </Link>
                        }
                    </div>
                ))}
            </div>

        </>
    )
}