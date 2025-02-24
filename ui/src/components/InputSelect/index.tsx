import { ChangeEvent, useEffect, useState } from "react";
import { ISelectData } from "../Select/interfaces";
import styles from './styles.module.css';
import Input from "../Input";

export interface InputSelectProps{
    onChange?: (data : ISelectData) => void;
    defaultValue?: ISelectData,
    data: ISelectData[],
    label?: string,
    className ?: any
}

export default ({onChange, defaultValue, data, label, className }: InputSelectProps) => {

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

    const handleBlur = ( ) => {
        setInputFocus(false);
    }


    useEffect(() => {
        if(defaultValue){
            selectOption(defaultValue)
        }
    }, [defaultValue,])

    return (
        <>
            <div className={styles.personalized_select}>
                <Input 
                    className={`${styles.input} ${className}`}
                    onFocus={() => setInputFocus(true)} 
                    onBlur={() => handleBlur()}
                    value={inputKey}
                    onChange={changeInput}
                    label={label}
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