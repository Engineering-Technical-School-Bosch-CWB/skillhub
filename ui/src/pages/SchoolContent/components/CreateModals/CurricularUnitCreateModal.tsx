import { useEffect, useState } from "react"
import { ICreateModalProps } from "./_CreateModal.interface"
import { ICourse } from "@/interfaces/models/ICourse";

export default ({onChange}: ICreateModalProps) => {

    const [data, setData] = useState<ICourse>();

    const change = (key: keyof ICourse, value: any) => {
        setData(prev => ({
            ...prev!,
            [key]: value
        }))
    }

    useEffect(() => {
        onChange!(data)
    }, [data]);

    return (
        <>
        </>
    )
}