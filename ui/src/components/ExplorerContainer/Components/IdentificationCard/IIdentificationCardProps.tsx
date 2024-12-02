import { SelectViewType } from "../SelectView";

type colors = "brown" | "red"

interface IIdentificationCardProps {
    variant?: SelectViewType,
    color?: string | colors,
    title?: string,
    subtitle?: string,
    icon?: string,
    iconDetails?: string,
    goTo?: string
}


export default IIdentificationCardProps;