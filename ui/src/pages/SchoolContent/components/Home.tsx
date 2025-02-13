import SectionHeader from "@/components/SectionHeader"

import {links } from "../links";
import Card from "@/pages/Home/components/Card";

import styles from "@/pages/Home/styles.module.css"
import { ISectionHeaderProps } from "@/components/SectionHeader/interfaces";
import Text from "@/typography";

export default () => {
    const sectionHeaderLinks: ISectionHeaderProps = {
        links: [
            {
                label: "School Content"
            }
        ]
    }

    return (
        <>  
            <SectionHeader links={sectionHeaderLinks.links}/>
            <div className={styles.page_title_container}>
                <Text fontSize="xl2" fontWeight="bold">School Content</Text>
            </div>
            <div className={styles.homeContainer}>
                {
                    links.map((link) => {
                        return( 
                            <Card iconName={link.icon?? ""} to={link.to} label={link.label} iconSize="md" />
                        )
                    })
                }
            </div>
        </>
    )
}