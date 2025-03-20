import styled from "./styles.module.css";
import React from "react";
import { PieChart, Pie, Tooltip, Label, Cell } from "recharts";
import Text from "../../../typography";
import { IDoughnutCharProps } from "./interfaces";

const DoughnutChart: React.FC<IDoughnutCharProps> = ({ performance, title }) => {

  const data = [
    { name: "Performance", value: performance },
    { name: "Remaining", value: performance == null ? 0 : Number((100 - performance).toFixed(2)) },
  ];

  return (
    <div className={styled.container}>
      <Text>{title}</Text>
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
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={index === 0 ? "#9e2896" : "#b9b9b9"} />
          ))}

          <Label
            value={`${performance}%`}
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
