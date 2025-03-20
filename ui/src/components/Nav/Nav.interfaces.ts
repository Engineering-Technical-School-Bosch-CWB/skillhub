export interface INavLink {
    to: string,
    label: string,
    icon?: string,
}

export interface INavProps {
    links: INavLink[]
}

export type Tab = "home"