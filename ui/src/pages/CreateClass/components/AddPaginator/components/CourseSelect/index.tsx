import Input from "@/components/Input"

import styles from './styles.module.css';
import { ChangeEvent, useState } from "react";
import { ISelectData } from "@/components/Select/interfaces";

export default () =>  {

    const [inputFocus, setInputFocus] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const changeInput = (e : ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }   
    const selectOption = (e: ISelectData) => {
        setInputValue(e.key)
        console.log('äaaaaaaaaaaaaaaaaa');
        
    }

    const data : ISelectData[] = [
        {
            key: "Digital Talent Academy",
            value:"1"
        },
        {
            key: "Cibersistemas",
            value:"2"
        },
        {
            key: "Mecânica",
            value:"3"
        },
        {
            key: "Desenvolvimento de sistemas",
            value:"4"
        },
    ]

    return (
        <>
            <div className={styles.personalized_select}>

                <Input 
                    className={styles.input}
                    onFocus={() => setInputFocus(true)} 
                    onBlur={() => setInputFocus(false)}
                    value={inputValue}
                    onChange={(e) => changeInput(e)}
                />
                
                <div className={`${styles.options_container} ${inputFocus ? styles.focused : ''}`}>
                    <ul>
                        {
                            data.map((item) => {
                                return (
                                    <>
                                        <li
                                            onClick={() => selectOption(item)}
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