import moment, { Moment } from "moment";
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
import colors from "../colors";
import { MonthData } from "../interfaces";

const OpensDateChart = ({ monthData }: { monthData: MonthData }) => {
  const opensByDate: {
    date: Moment;
    dateString: string;
    dateShort: string;
    avg: number | undefined;
    userCount: number;
    opensCount: number;
  }[] = [];

  monthData.users?.forEach((e) => {
    if (!e.opensByDate) return;

    Object.keys(e.opensByDate).forEach((k) => {
      let date = opensByDate.find((x) => x.dateString === k);

      if (!date) {
        date = {
          dateString: k,
          date: moment(k, "YYYYMMDD"),
          dateShort: moment(k, "YYYYMMDD").format("DD/MM"),
          userCount: 0,
          opensCount: 0,
          avg: undefined,
        };

        opensByDate.push(date);
      }

      date.userCount++;
      date.opensCount += e.opensByDate[k];
    });
  });

  opensByDate.sort((a, b) => a.date.diff(b.date));

  opensByDate.forEach((e) => (e.avg = e.opensCount / e.userCount));

  const minDate = monthData.start;
  const maxDate = monthData.finish;
  const opens = opensByDate.filter(
    (e) =>
      e.date.isSameOrAfter(minDate, "day") &&
      e.date.isSameOrBefore(maxDate, "day"),
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg bg-white opacity-90 p-3">
          <p className="text-gray-500 mb-2">
            {payload[0].payload.date.format("DD/MM/YYYY")}{" "}
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
          <XAxis dataKey="dateShort" interval={2} />
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
