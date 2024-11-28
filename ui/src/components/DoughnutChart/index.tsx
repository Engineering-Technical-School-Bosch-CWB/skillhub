import React from "react";
import { PieChart, Pie, Tooltip, Legend, Label, Cell } from "recharts";

interface IDoughnutChartProps {
  exploitation: number;
}

const DoughnutChart: React.FC<IDoughnutChartProps> = ({ exploitation }) => {
  // Definindo os dados do gráfico de pizza
  const data = [
    { name: "Exploitation", value: exploitation },
    { name: "Remaining", value: 100 - exploitation },
  ];

  return (
    <div>
      <PieChart width={400} height={400}>
        <Pie
          data={data}             
          dataKey="value"         
          nameKey="name"          
          cx={200}                
          cy={200}                
          innerRadius={60}
          outerRadius={100}       
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
