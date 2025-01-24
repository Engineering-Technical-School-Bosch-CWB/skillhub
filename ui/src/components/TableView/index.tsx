import styled from "./styles.module.css";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import Icon from "../Icon";
import { ITableData, ITableViewProps } from "./interfaces";

// ----*-----
// the "DATA" props is expected to be an ARRAY OF OBJECTS OF EXACT SAME STRUCTURE,
// the useeffect function is going to take the keys from the objects and use it as
// table header, while the values are going to compose the rows of the table.
// 
// the "HASOPTIONS" props is expected to be a boolean that indicates if the table
// has buttons that perform actions in the last column, as it is common for the project.
// 
// the "OPTIONS" props is expected to be an array of objects of { "ICONNAME", "FUNCTION" },
// because that way we can create an options column with icons that, when clicked, 
// perform the action stablished by the function.
// 
// the "HASNOTATION" props is expected to be a boolean that indicates whether the 
// table has the first column as with the notation of the rows or not.
// 
// if the 
// ----*-----

const TableView = ({ data, hasOptions, options, hasNotation }: ITableViewProps) => {
    const [keys, setKeys] = useState<string[]>([]);
    const [values, setValues] = useState<ITableData[]>([]);

    useEffect(() => {

        if (!data || data.length == 0)
            return;

        const updateKeys = () => {
            const actualKeys = Object.keys(data[0]);
            const formattedKeys = actualKeys.map(key => formatString(key));
            setKeys(formattedKeys);
        };

        const updateValues = () => {
            const formattedObj = data.map((item) => formatObjectKeys(item));
            setValues(formattedObj);
        };

        updateKeys();
        updateValues();
    }, [data]);

    // ..styles the competence status 
    // rows accordingly to it.. 
    const handleStyle = (key: string, item: ITableData) => {
        if (key != "Aptitude") return styled.row;

        switch (item[key]) {
            case "Skilled":
                return styled.skilled;

            case "Unskilled":
                return styled.unskilled;

            case "Developing":
                return styled.development;
        }
    }

    return (
        <div className={styled.container}>
            <TableContainer component={Paper} className={styled.table}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {
                                hasNotation ?
                                    <TableCell align="center" className={styled.head}>#</TableCell>
                                    : <></>
                            }

                            {
                                keys.map((key) => (
                                    key != "Id" ?
                                        <TableCell key={key} align="center" className={styled.head}>{key}</TableCell>
                                        : <></>
                                ))
                            }

                            {
                                hasOptions ?
                                    <TableCell align="center" className={styled.head}>Options</TableCell>
                                    : <></>
                            }
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            values.map((item, index) => (
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    {
                                        hasNotation ?
                                            <TableCell key={index} align="center" className={styled.row}>{index}</TableCell>
                                            : <></>
                                    }

                                    {
                                        keys.map((key) => (
                                            key != "Id" ?
                                                <TableCell key={key} align="center">
                                                    <div className={styled.cell}>
                                                        <div className={handleStyle(key, item)}>{item[key]}</div>
                                                    </div>
                                                </TableCell>
                                                : <></>
                                        ))
                                    }

                                    {
                                        hasOptions && options ?
                                            <TableCell key={index} align="center">
                                                <div className={styled.options}>
                                                    {
                                                        options.map((option) => (
                                                            <div onClick={() => option.function(true, item.Id)}>
                                                                <Icon 
                                                                    name={option.iconName} 
                                                                    size="md"
                                                                    className={styled.link}
                                                                />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </TableCell>
                                            : <></>
                                    }
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

const formatString = (str: string) => {
    return str
        .split('_')
        .map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(' ');
}

function formatObjectKeys(obj: { [key: string]: any }): { [key: string]: any } {
    return Object.keys(obj).reduce((acc: { [key: string]: any }, key) => {
        const formattedKey = formatString(key);
        acc[formattedKey] = obj[key];
        return acc;
    }, {});
}

export default TableView;
