import { INavLink } from "@/components/Nav/Nav.interfaces";
import { t } from "i18next";

export type Tabs =  "course" | "curricularUnits" | "subjectAreas" | "occupationArea"

export const tabName = {
    "home": "Home",
    "course": "Course",
    "curricularUnits": "Curricular Unit",
    "subjectAreas": "Subject Area",
    "occupationArea": "Occupation Area"
}

export const links: INavLink[] = [
    {
        label: 'courses',
        to: "?tab=course",
        icon: "school"
    },
    {
        label: 'subjectArea',
        to: "?tab=subjectAreas",
        icon: "collections_bookmark"
    },
    {
        label: 'occupationArea',
        to: "?tab=occupationArea",
        icon: "hub"
    }
]

export enum ESchoolContentTabs {
    Courses,
    CurricularUnits,
    SubjectAreas
}