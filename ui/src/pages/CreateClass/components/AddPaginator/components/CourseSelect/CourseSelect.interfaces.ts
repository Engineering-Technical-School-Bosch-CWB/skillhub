import { ISelectData } from "@/components/Select/interfaces";

export interface CourseSelectProps {
    onChange?: (data : ISelectData) => void;
    onSelect?: (data : ISelectData) => void;
}