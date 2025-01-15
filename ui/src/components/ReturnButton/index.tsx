import Button from "../Button"
import Icon from "../Icon"
import { useNavigate } from "react-router-dom";

export default () => {

    const navigate = useNavigate()

    const handle = () => {
        navigate(-1)
    }

    return (
        <Button variant="primary_icon" onClick={handle}><Icon name="arrow_back"/></Button>
    )

}