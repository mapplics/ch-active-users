import colors from "../colors";
import { MonthData } from "../interfaces";

const { PieChart, Pie, Cell, Tooltip } = require("recharts");

const OsPieChart = ({ monthData }: { monthData: MonthData }) => {
  const osList: { name: string; userCount: number }[] = [];

  monthData.users.forEach((e) => {
    if (!e.os) return;

    let os = osList.find((x) => x.name === e.os);

    if (!os) {
      os = { name: e.os, userCount: 0 };
      osList.push(os);
    }

    os.userCount++;
  });

  osList.sort((a, b) => b.userCount - a.userCount);

  const renderLabel = (value: string) => {
    switch (value) {
      case "ios":
        return "IOs";
      case "android":
        return "Android";
      default:
        return value;
    }
  };

  const getColor = (value: string) => {
    switch (value) {
      case "ios":
        return colors.blue;
      case "android":
        return colors.android;
      default:
        return value;
    }
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.4;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={"middle"}
        dominantBaseline="central"
      >
        {`${renderLabel(osList[index].name)} ${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg bg-white opacity-90 p-3">
          <p className="text-gray-500 mb-2">
            {renderLabel(payload[0].payload.name)}
          </p>
          <table>
            <tbody>
              <tr>
                <td className="text-gray-700 font-normal">Usuarios</td>
                <td className="pl-2 font-medium">
                  {payload[0].payload.userCount.toLocaleString("es-AR")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="mx-auto">
      <p className="mb-6 font-medium text-xl text-gray-700">
        Sistemas Operativos
      </p>
      <PieChart width={200} height={200}>
        <Tooltip content={<CustomTooltip />} />

        <Pie
          data={osList}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          dataKey="userCount"
        >
          {osList.map((entry, index) => {
            return <Cell key={`cell-${index}`} fill={getColor(entry.name)} />;
          })}
        </Pie>
      </PieChart>
    </div>
  );
};
export default OsPieChart;
