import { INavLink } from "@/components/Nav/Nav.interfaces";

export type Tabs =  "course" | "curricularUnits" | "subjectAreas" | "occupationAreas"

export const tabName = {
    "home": "Home",
    "course": "Course",
    "curricularUnits": "Curricular Unit",
    "subjectAreas": "Subject Area",
    "occupationAreas": "Occupation Area"
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
        to: "?tab=subjectAreaa",
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