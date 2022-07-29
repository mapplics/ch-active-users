import colors from "../colors";
import { ActiveUser } from "../interfaces";

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

const VersionsBars = ({actives}: {actives: ActiveUser[]}) => {
  let totalUsersNoOs = 0;

  let totalUsers = 0;
  let versionsList: {
    name: string;
    ios: number;
    android: number;
    unknown: number;
    total: number;
  }[] = [];

  // para contar usuarios sin registro de version
  const unknownVersion = {
    name: "Desconocida",

    ios: 0,
    android: 0,
    unknown: 0,
    total: 0,
  };
  versionsList.push(unknownVersion);

  actives.forEach((e) => {
    if (!e.os) {
      totalUsersNoOs++;
      return;
    }

    totalUsers++;

    // si no tiene version lo sumo a unknown
    if (!e.version) {
      unknownVersion.unknown++;
      unknownVersion.total++;
      return;
    }

    let version = versionsList.find((x) => x.name === e.version);
    if (!version) {
      version = {
        name: e.version,
        ios: 0,
        android: 0,
        unknown: 0,
        total: 0,
      };

      versionsList.push(version);
    }

    version.total++;
    switch(e.os) {
      case 'android': version.android++; break;
      case 'ios': version.ios++; break;
      default: version.unknown++;
    }
  });


  // descarto las versiones que tienen menos del 0,1% del total de usuario
  // por lo general son versiones de dev
  versionsList = versionsList.filter((e) => e.total >= totalUsers * 0.001);

  // ordeno en base al total
  versionsList.sort((a, b) => b.total - a.total);

  // actualizo el total de usuarios por las versiones que descarté
  // despues se usa para calcular el porcentaje de cada version
  totalUsers = versionsList.reduce((prev, e) => prev + e.total, 0);

  const CustomTooltip = ({ active, payload, label }: any) => {
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
      <p className="mb-6 font-medium text-xl text-gray-700">Versiones</p>
      <ResponsiveContainer height={360} className="text-sm">
        <BarChart data={versionsList}>
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
