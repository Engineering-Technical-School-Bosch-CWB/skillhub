import { useEffect, useState } from "react"
import { ICreateModalProps } from "./_CreateModal.interface"
import Input from "@/components/Input";

import styles from '../DeleteModals/styles.module.css'
import IPosition, { EPositionLevel } from "@/interfaces/models/IPosition";
import Select from "@/components/Select";
import { ISelectProps } from "@/components/Select/interfaces";

export default ({onChange, list}: ICreateModalProps) => {

    const [data, setData] = useState<IPosition>();

    const checkIfExistsStudentPosition = (): boolean => {
        const tempList = list as IPosition[];

        return tempList.some((position) => {
            const level = typeof position.positionLevel === "string"
                ? EPositionLevel[position.positionLevel as keyof typeof EPositionLevel]
                : position.positionLevel;
            
            if (level === EPositionLevel.Student) {
                console.log("is student");
                
                return true;
            }
            return false;
        });

    }

    const positionLevelSelectProps: ISelectProps = {
        label: "Position Level",
        data: [
            {
                key: "Admin",
                value: 2
            },
            {
                key: "Apprentice",
                value: 1,
                disabled: checkIfExistsStudentPosition()
            },
        ],
        onChange(e) {
            change("positionLevel", e.target.value)
        },
    }
    
    const change = (key: keyof IPosition, value: any) => {
        setData(prev => ({
            ...prev!,
            [key]: value
        }))
    }

    useEffect(() => {
        onChange!(data)
    }, [data]);
    useEffect(() => {
        console.log(positionLevelSelectProps);
        
    }, []);

    return (
        <section className={styles.content_section} >
            <Input label="Name" value={data?.name} onChange={(e) => change("name", e.target.value)} />
            <Select {...positionLevelSelectProps} />
        </section>
    )
}