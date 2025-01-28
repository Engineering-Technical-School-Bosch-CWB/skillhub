import Input from "@/components/Input"

import styles from './styles.module.css';
import { ChangeEvent, useState } from "react";
import { ISelectData } from "@/components/Select/interfaces";
import { CourseSelectProps } from "./CourseSelect.interfaces";

export default ({onChange} : CourseSelectProps) =>  {

    const [inputFocus, setInputFocus] = useState(false);
    const [inputKey, setInputKey] = useState("");

    const changeInput = (e : ChangeEvent<HTMLInputElement>) => {
        setInputKey(e.target.value)
        if(onChange)
            onChange!({
                key: inputKey,
                value: undefined
            });
    }   
    const selectOption = (e: ISelectData) => {
        setInputKey(e.key)
        if(onChange)
            onChange!({
                key: e.key,
                value: e.value
            });
    }

    const handleBlur = (e: any ) => {
        setInputFocus(false);
    }

    const data : ISelectData[] = [
        {
            key: "Digital Talent Academy",
            value: 1
        },
        {
            key: "Cibersistemas",
            value: 2
        },
        {
            key: "Mecânica",
            value: 3
        },
        {
            key: "Desenvolvimento de sistemas",
            value: 4
        },
    ]

    return (
        <>
            <div className={styles.personalized_select}>

                <Input 
                    className={styles.input}
                    onFocus={() => setInputFocus(true)} 
                    onBlur={(e) => handleBlur(e)}
                    value={inputKey}
                    onChange={changeInput}
                />
                
                <div className={`${styles.options_container} ${inputFocus ? styles.focused : ''}`}>
                    <ul>
                        {
                            data.map((item) => {
                                return (
                                    <>
                                        <li
                                            onClick={() => selectOption(item)}
                                            onMouseDown={(e) => e.preventDefault()}  
                                        >{item.key}</li>
                                    </>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}