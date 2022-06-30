import moment from "moment";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import actives from "../actives";
import colors from "../colors";

const OpensDateChart = () => {
  const opensByDate = {};

  actives.forEach((e) => {
    if (e.opensByDate) {
      Object.keys(e.opensByDate).forEach((k) => {
        if (opensByDate[k]) {
          opensByDate[k].userCount++;
          opensByDate[k].opensCount += e.opensByDate[k];
        } else {
          opensByDate[k] = {
            userCount: 1,
            opensCount: e.opensByDate[k],
          };
        }
      });
    }
  });

  let opens = Object.keys(opensByDate).map((k) => ({
    ...opensByDate[k],
    date: moment(k, "YYYYMMDD"),
    dateString: moment(k, "YYYYMMDD").format("DD/MM"),
    avg: opensByDate[k].opensCount / opensByDate[k].userCount,
  }));

  const minDate = moment("2022-06-01");
  const maxDate = moment("2022-06-30");
  opens = opens.filter(e => e.date.isSameOrAfter(minDate) && e.date.isSameOrBefore(maxDate));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg bg-white opacity-90 p-3">
          <p className="text-gray-500 mb-2">
            {payload[0].payload.date.format("DD/MM/YYYY")}
            {" "}
            {payload[0].payload.date.format("dddd")}
          </p>
          <table>
            <tbody>
              <tr>
                <td className="text-gray-700 font-normal">Aperturas de app</td>
                <td className="pl-2 font-medium">
                  {payload[0].payload.opensCount.toLocaleString("es-AR")}
                </td>
              </tr>
              <tr>
                <td className="text-gray-700 font-normal">Usuarios</td>
                <td className="pl-2 font-medium">
                  {payload[0].payload.userCount.toLocaleString("es-AR")}
                </td>
              </tr>
              <tr>
                <td className="text-gray-700 font-normal">
                  Promedio por usuario
                </td>
                <td className="pl-2 font-medium">
                  {payload[0].payload.avg.toFixed(1).replace(".", ",")}
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
        Aperturas de app y Usuarios activos por día
      </p>
      <ResponsiveContainer height={360} className="text-sm">
        <LineChart data={opens}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dateString" interval={2} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="opensCount"
            stroke={colors.purple}
            name="Aperturas de app"
            activeDot={{ r: 6 }}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="userCount"
            name="Usuarios"
            stroke={colors.water}
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OpensDateChart;
