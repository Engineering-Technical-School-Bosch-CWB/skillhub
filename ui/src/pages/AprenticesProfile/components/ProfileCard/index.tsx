import Avatar from "../../../../components/Avatar"
import Button from "../../../../components/Button"
import Icon from "../../../../components/Icon"
import Text from "../../../../typography"
import { IStudentData } from "../../interfaces/AprenticesProfile.interface"

import styles from '../../styles.module.css'

export default (e: IStudentData) => {
    return (
        <div className={`${styles.profile_section} ${styles.align}`}>

            <div className={`${styles.profile_card} ${styles.align}`}>
                <Avatar src={e.image ?? "/avatar.png"} size="xl" />
                <section className={`${styles.data_section} ${styles.align}`}>
                    <Text fontWeight="bold" fontSize="xl">{e.name}</Text>
                    <Text fontWeight="light">{e.class?.name}</Text>
                </section>
            </div>
            <Button variant="primary_icon"><Icon name="settings"/></Button>
        </div>
    )
}