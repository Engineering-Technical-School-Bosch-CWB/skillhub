import { ReactNode } from "react";
import { AccessLevel } from "../../enums/AccessLevel"

interface IRouteProtectionProps {
    accessLevel: AccessLevel;
    children: ReactNode;
}

export default ({ accessLevel, children }:IRouteProtectionProps) => {
    return children
}