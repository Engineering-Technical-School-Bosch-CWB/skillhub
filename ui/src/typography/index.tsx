import { forwardRef } from "react"
import f_styles from "./font-styles.module.css"
import f_weights from "./font-weights.module.css"
import f_sizes from "./font-sizes.module.css"

type TextVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p"
type TextWeight = "light" | "regular" | "semibold" | "bold" | "extrabold"
type TextFontSize = "xs" | "sm" | "md" | "lg" | "xl" | "xl2" | "xl3" | "xl4" | "xl5"
type TextStyle = "normal" | "itallic" 

type TextElementProps = JSX.IntrinsicElements[TextVariant];

type ITextProps = TextElementProps & {
    variant?: TextVariant
    fontWeight?: TextWeight
    fontSize?: TextFontSize
    fontStyle?: TextStyle
    style?: any
}

const Text = forwardRef<HTMLElement, ITextProps>(
    ({ 
        variant: Variant = "span",
        fontWeight = "regular",
        fontSize = "md",
        fontStyle = "normal",
        children,
        style
    }, ref) => (
        <Variant 
            ref={ref as any}
            className={`${f_styles[fontStyle]} ${f_sizes[fontSize]} ${f_weights[fontWeight]}`}
            children={children}
            style={style}
        />
    ) 
)

export default Text
