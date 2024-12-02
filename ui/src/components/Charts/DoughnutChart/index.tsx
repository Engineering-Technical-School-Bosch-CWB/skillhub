import styled from "./styles.module.css";
import React from "react";
import { PieChart, Pie, Tooltip, Label, Cell } from "recharts";
import Text from "../../../typography";
import { IDoughnutCharProps } from "./interfaces";

const DoughnutChart: React.FC<IDoughnutCharProps> = ({ exploitation, title }) => {

  const data = [
    { name: "Exploitation", value: exploitation },
    { name: "Remaining", value: 100 - exploitation },
  ];

  return (
    <div className={styled.container}>
      <Text>{ title }</Text>
      <PieChart width={250} height={250}>
        <Pie
          data={data}             
          dataKey="value"         
          nameKey="name"          
          cx={120}                
          cy={120}                
          innerRadius={50}
          outerRadius={90}       
          fill="#9e2896"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={index === 0 ? "#9e2896" : "#b9b9b9"} /> 
          ))}

          <Label
            value={`${exploitation}%`}  
            position="center"          
            fontSize={24}              
            fontWeight="bold"          
            fill="#000"                
          />
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default DoughnutChart;
