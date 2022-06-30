import actives from "../actives";
import colors from "../colors";

const {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} = require("recharts");

const OsPieChart = () => {
  let os = {};
  actives.forEach((e) => {
    if (!e.os) return;

    if (os[e.os]) {
      os[e.os]++;
    } else {
      os[e.os] = 1;
    }
  });

  os = Object.keys(os).map((k) => ({
    name: k,
    userCount: os[k],
  }));

  os.sort((a, b) => b.userCount - a.userCount);

  const renderLabel = (value) => {
    switch (value) {
      case "ios":
        return "IOs";
      case "android":
        return "Android";
      default:
        return value;
    }
  };

  const getColor = (value) => {
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
  }) => {
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
        {`${renderLabel(os[index].name)} ${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
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
          data={os}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          dataKey="userCount"
        >
          {os.map((entry, index) => {
            return <Cell key={`cell-${index}`} fill={getColor(entry.name)} />;
          })}
        </Pie>
      </PieChart>
    </div>
  );
};
export default OsPieChart;
