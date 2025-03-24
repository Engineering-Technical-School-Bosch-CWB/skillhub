import Input from "@/components/Input";
import styles from "../../styles.module.css";
import { useEffect, useState } from "react";
import { t } from "i18next";

export interface ISkillSelection {
    skillId: number
    weight?: number
}

interface ISkillOptionProps {
    id: number
    skillWeight?: number
    selected?: boolean
    description: string
    selectedSkills: ISkillSelection[]
    setSelectedSkills: Function
}

export default ({ id, skillWeight, description, selected, selectedSkills, setSelectedSkills }: ISkillOptionProps) => {

    const [checked, setChecked] = useState(selected ?? false);
    const [weight, setWeight] = useState(skillWeight ?? 1);

    const handleChange = () => {
        if (checked) {
            setSelectedSkills([
                ...selectedSkills.filter(s => s.skillId != id),
                {
                    skillId: id,
                    weight: weight
                }
            ]);
        } else {
            setSelectedSkills(
                selectedSkills.filter(s => s.skillId != id)
            );
        }
    }

    useEffect(() => {
        handleChange();
    }, [checked, weight]);

    return (
        <>
            <div className={`${styles.option}`}>
                <Input type="checkBox" label={description} width={"calc(100% - 8.5rem)"} checked={checked} onChange={(e) => setChecked(e.target.checked)}/>
                <div className={`${styles.input_weight}`}>
                    <Input type="number" label={t('createExam.weight')} value={checked ? weight : ""} disabled={!checked} min={0} onChange={(e) => setWeight(Number(e.target.value))} width={"8rem"} />
                </div>
            </div>
        </>
    )
}