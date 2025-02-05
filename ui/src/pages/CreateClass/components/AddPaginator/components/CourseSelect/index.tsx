import Input from "@/components/Input"

import styles from './styles.module.css';
import { ChangeEvent, useEffect, useState } from "react";
import { ISelectData } from "@/components/Select/interfaces";
import { CourseSelectProps } from "./CourseSelect.interfaces";
import internalAPI from "@/service/internal.services";
import { toast } from "react-toastify";
import { ICourse } from "@/interfaces/models/ICourse";

export default ({onChange, defaultValue} : CourseSelectProps) =>  {

    const [inputFocus, setInputFocus] = useState(false);
    const [inputKey, setInputKey] = useState("");
    const [data, setData] = useState<ISelectData[]>([]);

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

    const getData = async () => {
        const response = await internalAPI.jsonRequest(`/course?page=1&items=10&query=${inputKey}`, "GET");
        if(!response.success)
            if (!toast.isActive("courses-load-error"))
                toast.error("Error on load courses.", { toastId: "courses-load-error" });

        const _reqData = response.data as ICourse[];

        setData(_reqData.map((item) => {
            return {
                key: item.name,
                value: item.id
            }
        }));
    }

    useEffect(() => {
        if(defaultValue){
            selectOption(defaultValue)
        }
    }, [])

    useEffect(() => {
        getData();
    }, [inputKey,])

    return (
        <>
            <div className={styles.personalized_select}>
                <Input 
                    className={styles.input}
                    onFocus={() => setInputFocus(true)} 
                    onBlur={() => handleBlur()}
                    value={inputKey}
                    onChange={changeInput}
                    label="Curso"
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