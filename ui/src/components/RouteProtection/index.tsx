import { AccessLevel } from "../../enums/AccessLevel"
import { Outlet } from "react-router-dom";

interface IRouteProtectionProps {
    accessLevel: AccessLevel;
}

export default ({ accessLevel }:IRouteProtectionProps) => {
    return <Outlet/>
}
