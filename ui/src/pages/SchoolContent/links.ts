import { INavLink } from "@/components/Nav/Nav.interfaces";

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
        label: "Courses",
        to: "?tab=course",
        icon: "school"
    },
    {
        label: "Curricular Unit",
        to: "?tab=curricularUnits",
        icon: "collections_bookmark"
    },
    {
        label: "Subject Area",
        to: "?tab=subjectAreas",
        icon: "category"
    },
    {
        label: "Occupation Area",
        to: "?tab=occupationArea",
        icon: "category"
    }
]

export enum ESchoolContentTabs {
    Courses,
    CurricularUnits,
    SubjectAreas
}