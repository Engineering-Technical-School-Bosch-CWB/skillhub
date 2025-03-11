import { useEffect, useState } from "react";
import { ISelectData } from "@/components/Select/interfaces";
import { CourseSelectProps } from "./CourseSelect.interfaces";
import internalAPI from "@/service/internal.services";
import { toast } from "react-toastify";
import { ICourse } from "@/interfaces/models/ICourse";
import Select from "@/components/Select";

export default ({ onChange }: CourseSelectProps) => {

    const [inputKey] = useState("");
    const [data, setData] = useState<ISelectData[]>([]);

    const getData = async () => {
        const response = await internalAPI.jsonRequest(`/course?page=1&items=10&query=${inputKey}`, "GET");
        if (!response.success)
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
        getData();
    }, [inputKey])

    return (
        <>
            <Select 
                label="Course"
                data={data} 
                onChange={(e) => onChange({
                    key: data.find(d => d.value == Number(e.target.value))?.key!,
                    value: Number(e.target.value)
                })} 
            />
        </>
    )
}