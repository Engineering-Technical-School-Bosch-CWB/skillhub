import BoschLogo from "../BoschLogo"
import styles from "./styles.module.css"

interface IHeaderProps {

}

export default ({  }:IHeaderProps) => {

    return(
        <header className={styles.header}>
            <BoschLogo/>
        </header>
    )
}