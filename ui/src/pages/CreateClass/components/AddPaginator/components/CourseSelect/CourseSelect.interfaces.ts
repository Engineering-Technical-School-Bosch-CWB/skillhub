import { ISelectData } from "@/components/Select/interfaces";

export interface CourseSelectProps {
    onChange?: (data : ISelectData) => void;
    defaultValue?: ISelectData
}