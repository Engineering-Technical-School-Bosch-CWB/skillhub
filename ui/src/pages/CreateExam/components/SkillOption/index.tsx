import Input from "@/components/Input";
import styles from "../../styles.module.css";
import { ChangeEvent, useEffect, useState } from "react";

export interface ISkillSelection {
    skillId: number
    weight?: number
}

interface ISkillOptionProps {
    id: number
    description: string
    selectedSkills: ISkillSelection[]
    setSelectedSkills: Function
}

export default ({ id, description, selectedSkills, setSelectedSkills }: ISkillOptionProps) => {

    const [checked, setChecked] = useState(false);
    const [weight, setWeight] = useState(1);

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
                <Input type="checkBox" label={description} checked={checked} onChange={(e) => setChecked(e.target.checked)}/>
                <div className={`${styles.input_weight}`}>
                    <Input type="number" label="Weight" value={weight} disabled={!checked} min={0} onChange={(e) => setWeight(Number(e.target.value))} />
                </div>
            </div>
        </>
    )
}