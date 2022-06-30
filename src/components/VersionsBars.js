import moment from "moment";
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

const VersionsBars = () => {
  let totalUsersNoOs = 0;

  let totalUsers = 0;
  let versions = {};

  // para contar usuarios sin registro de version
  versions["Desconocida"] = {
    ios: 0,
    android: 0,
    unknown: 0,
    total: 0,
  };

  actives.forEach((e) => {
    if (!e.os) {
      totalUsersNoOs++;
      return;
    }

    totalUsers++;

    // si no tiene version lo sumo a unknown
    if (!e.v) {
      versions["Desconocida"].unknown++;
      versions["Desconocida"].total++;
      return;
    }

    if (!versions[e.v]) {
      versions[e.v] = {
        ios: 0,
        android: 0,
        unknown: 0,
        total: 0,
      };
    }

    versions[e.v][e.os]++;
    versions[e.v].total++;
  });

  // convierto el objeto en array para rechart
  versions = Object.keys(versions).map((k) => ({
    name: k,
    ...versions[k],
  }));

  // descarto las versiones que tienen menos del 0,1% del total de usuario
  // por lo general son versiones de dev
  versions = versions.filter((e) => e.total >= totalUsers * 0.001);

  // ordeno en base al total
  versions.sort((a, b) => b.total - a.total);

  // actualizo el total de usuarios por las versiones que descarté
  // despues se usa para calcular el porcentaje de cada version
  totalUsers = versions.reduce((prev, e) => prev + e.total, 0);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg bg-white opacity-90 p-3">
          <p className="text-gray-500 mb-2">{payload[0].payload.name}</p>
          <table>
            <tbody>
              <tr>
                <td className="text-gray-700 font-normal">Android</td>
                <td className="pl-2 font-medium">
                  {payload[0].payload.android.toLocaleString("es-AR")}
                </td>
                <td></td>
              </tr>
              <tr>
                <td className="text-gray-700 font-normal">IOs</td>
                <td className="pl-2 font-medium">
                  {payload[0].payload.ios.toLocaleString("es-AR")}
                </td>
                <td></td>
              </tr>
              <tr>
                <td className="text-gray-700 font-normal">Total</td>
                <td className="pl-2 font-medium">
                  {payload[0].payload.total.toLocaleString("es-AR")}
                </td>
                <td className="pl-2">
                  {((payload[0].payload.total * 100) / totalUsers)
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
      <p className="mb-6 font-medium text-xl text-gray-700">
        Versiones
      </p>
      <ResponsiveContainer height={360} className="text-sm">
        <BarChart data={versions}>
          <Tooltip content={<CustomTooltip />} />

          <Bar
            dataKey="android"
            stackId="a"
            fill={colors.android}
            name="Android"
          />
          <Bar dataKey="ios" stackId="a" fill={colors.blue} name="iOS" />
          <Bar
            dataKey="unknown"
            stackId="a"
            fill={colors.red}
            legendType={"none"}
          />

          <CartesianGrid strokeDasharray="3 3" />
          <YAxis type="number" domain={[1, "auto"]} />
          <XAxis type="category" dataKey="name" interval={0} />
          <Tooltip />

          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default VersionsBars;
