import styled from "./styles.module.css";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon";

interface ITableData {
    [key: string]: string | number;
}

interface IIconData {
    name: string,
    onClick: () => {}
}

interface ITableViewProps {
    data: ITableData[],
    hasIcons: boolean
}

const TableView = ({ data }: { data: ITableData[] }) => {
    const [keys, setKeys] = useState<string[]>([]);
    const [values, setValues] = useState<ITableData[]>([]);
    
    useEffect(() => {
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
    }, []);

    const handleStyle = (key: string, item: ITableData) => {
        if(key != "Status") return styled.row;

        switch (item[key]) {
            case "Apt":
                return styled.apt;
            
            case "Inapt":
                return styled.inapt;
            
            case "In Development":
                return styled.development;            
        }
    }

    return (
        <div className={styled.container}>
            <TableContainer component={Paper} className={styled.table}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className={styled.head}>#</TableCell>
                            {keys.map((key) => (
                                <TableCell key={key} align="center" className={styled.head}>{key}</TableCell>
                            ))}
                            <TableCell align="center" className={styled.head}>Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {values.map((item, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell key={index} align="center" className={styled.row}>{index}</TableCell>
                                {keys.map((key) => (
                                        <TableCell key={key} align="center">
                                            <div className={handleStyle(key, item)}>{item[key]}</div>
                                        </TableCell> 
                                ))}
                                <TableCell key={index} align="center" className={styled.options}>
                                    <div><Icon name="history" size="md" className={styled.link}/></div>
                                    <div><Icon name="priority_high" size="md" className={styled.link}/></div>
                                </TableCell>
                            </TableRow>
                        ))}
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
