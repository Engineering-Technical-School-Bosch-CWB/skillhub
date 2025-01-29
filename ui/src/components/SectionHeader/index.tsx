import styles from "./style.module.css"
import { ISectionHeaderProps } from "./interfaces"
import Link from "../Link"

export default ({ links }: ISectionHeaderProps) => {
    return (
        <>
            <div className={`${styles.section}`}>
                <span className={`${styles.disabled}`}>/</span>
                {
                    !links
                    ? <span className={`${styles.disabled}`}>Home</span>
                    : <Link to={"/home"}>Home</Link>
                }
                {links?.map(l => (
                    <>
                        <span className={`${styles.disabled}`}>/</span>
                        {

                            !l.goTo
                                ? <span className={`${styles.disabled}`}>{l.label}</span>
                                : <Link to={l.goTo}>{l.label}</Link>
                        }
                    </>
                ))}
            </div>

        </>
    )
}