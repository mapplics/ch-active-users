import { scaleLog } from "d3-scale";
import actives from "../actives";
import colors from "../colors";

const {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} = require("recharts");
const scale = scaleLog();

const UserCountriesBars = () => {
  let totalUsers = 0;

  let countries = {};

  actives.forEach((e) => {
    if (!e.country) return;

    totalUsers++;

    if (countries[e.country]) {
      countries[e.country]++;
    } else {
      countries[e.country] = 1;
    }
  });

  countries = Object.keys(countries).map((k) => ({
    name: k,
    userCount: countries[k],
  }));

  countries.sort((a, b) => b.userCount - a.userCount);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg bg-white opacity-90 p-3">
          <p className="text-gray-500 mb-2">{payload[0].payload.name}</p>
          <table>
            <tbody>
              <tr>
                <td className="text-gray-700 font-normal">Usuarios</td>
                <td className="pl-2 font-medium">
                  {payload[0].payload.userCount.toLocaleString("es-AR")}
                </td>
                <td className="pl-2">
                  {((payload[0].payload.userCount * 100) / totalUsers)
                    .toFixed(1)
                    .replace(".", ",")}
                  %
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
      <p className="font-medium text-xl text-gray-700">
        Usuarios activos por país
      </p>
      <p className="mb-6 text-sm text-gray-500">Escala logarítmica</p>
      <ResponsiveContainer height={360} className="text-sm">
        <BarChart data={countries} >
          <CartesianGrid strokeDasharray={"2 2"}/>
          <Bar dataKey="userCount" fill={colors.water} name="Usuarios" />

          <YAxis type="number" scale={scale} domain={[1, "auto"]} />
          <XAxis type="category" dataKey="name" name="País" />
          <Tooltip content={<CustomTooltip />} />

          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default UserCountriesBars;
