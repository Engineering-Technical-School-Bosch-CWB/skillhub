import styled from "./styles.module.css";

interface IDividerProps {
    size: "big" | "small"
}

const Divider = ({ size }: IDividerProps) => {
    return (<hr className={ size === "big" ? styled.big : styled.small}></hr>)
}

export default Divider;