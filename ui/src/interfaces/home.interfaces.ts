import { ForwardRefExoticComponent, RefAttributes } from "react";
import IIcons from "../icons/InterfacesIconProps";

export interface ICardProps {
    to: string,
    icon: ForwardRefExoticComponent<Omit<IIcons, "ref"> & RefAttributes<SVGSVGElement>>,
    label: string
}