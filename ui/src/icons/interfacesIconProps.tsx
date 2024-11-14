import { SVGProps } from "react";
export type IconSize = "small" | "medium" | "large" | "extraLarge";

export const sizeMap: Record<IconSize, string> = {
    small: "1.5rem",
    medium: "2rem",
    large: "3rem",
    extraLarge: "5rem",
};

export default interface IIcons extends SVGProps<SVGSVGElement> {
    size?: IconSize;  
    color?: string; 
}