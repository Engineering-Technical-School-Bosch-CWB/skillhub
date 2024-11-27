import React from "react";
import { PieChart, Pie, Tooltip, Legend, Label } from "recharts";

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
          data={data}             // Passando os dados
          dataKey="value"         // Especificando qual chave deve ser usada para o valor
          nameKey="name"          // Especificando qual chave deve ser usada para o nome
          cx={200}                // Centralizando o gráfico
          cy={200}                // Centralizando o gráfico
          innerRadius={60}        // Raio interno (faz o gráfico de donut)
          outerRadius={100}       // Raio externo
          fill="#9e2896"
        >
          {/* Colocando o Label centralizado */}
          <Label 
            value={`${exploitation}%`}  // Exibe a porcentagem
            position="center"          // Posiciona no centro
            fontSize={24}              // Ajuste de tamanho de fonte
            fontWeight="bold"          // Ajuste de peso da fonte
            fill="#000"                // Cor da fonte
          />
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default DoughnutChart;
