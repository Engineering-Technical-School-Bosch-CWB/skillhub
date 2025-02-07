export type UserPropsType = "position" | "sector"

export const UserPropsTypeToEndpoint = {
    "position" :"positions",
    "sector"   :"sectors"
}

export const UserPropsTypeToTitle = {
    "position" :"Position",
    "sector"   :"Sector"
}

export interface IUserPropertiesTablesProps {
    kind: UserPropsType,
    items?: number
}