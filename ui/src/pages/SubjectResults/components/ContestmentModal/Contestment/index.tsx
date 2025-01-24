import styled from "./styles.module.css";
import Text from "../../../../../typography";
import Divider from "../../../../../components/Divider";
import Icon from "../../../../../components/Icon";
import { useEffect, useState } from "react";
import { IContestmentProps } from "./interfaces";

const Contestment = ({ option, selectionHandler, current }: IContestmentProps) => {
    const [optionsShowing, setOptionsShowing] = useState<boolean>(false);

    const handleStyle = (op: string) => {
        switch (op) {
            case "Skilled":
                return styled.skilled;

            case "Unskilled":
                return styled.unskilled;

            case "Developing":
                return styled.development;
        }
    }

    const handleClick = (status: string) => {
        setOptionsShowing(!optionsShowing);
        selectionHandler(status);
    }

    useEffect(() => {
        console.log(optionsShowing);
    }, []);

    return (
        <div style={{ marginBottom: "3rem" }}>
            <div className={styled.header}>
                <Text>Current</Text>
                <Text>Contestment</Text>
            </div>

            <Divider size="small" />

            <div className={styled.contestment}>
                <div className={handleStyle(current)}>{current}</div>

                <Icon name="arrow_right_alt" size="md" />

                <div className={styled.select_button}>
                    <div
                        className={handleStyle(option)}
                        onClick={() => setOptionsShowing(!optionsShowing)}
                    >{option}</div>

                    <div className={optionsShowing ? styled.options : styled.hidden}>
                        {
                            current != "Skilled" &&
                            <div onClick={() => handleClick("Skilled")}><Text>Skilled</Text></div>
                        }
                        {
                            current != "Developing" &&
                            <div onClick={() => handleClick("Developing")}><Text>Developing</Text></div>
                        }
                        {
                            current != "Unskilled" &&
                            <div onClick={() => handleClick("Unskilled")}><Text>Unskilled</Text></div>
                        }
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Contestment;