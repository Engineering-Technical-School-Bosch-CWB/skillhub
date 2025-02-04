import { INavLink } from "@/components/Nav/Nav.interfaces";

export type Tabs = "home" | "course" | "curricularUnits" | "subjectAreas"

export const links: INavLink[] = [
    {
        label: "Home",
        to: "/home",
        icon: "home"
    },
    {
        label: "Courses",
        to: "?tab=courses",
        icon: "school"
    },
    {
        label: "Curricular Unit",
        to: "?tab=curricularUnit",
        icon: "collections_bookmark"
    },
    {
        label: "Subject Area",
        to: "?tab=subjectArea",
        icon: "category"
    }
]