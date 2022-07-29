import moment from "moment";
import Select from "react-select";
import actives from "../actives";
import { MonthData } from "../interfaces";

const Header = ({
  monthData,
  setData,
}: {
  monthData: MonthData;
  setData: (arg0: MonthData) => void;
}) => {
  const opensByDateTotal: { [key: string]: number } = {};
  let totalOpens = 0;

  monthData.users.forEach((element) => {
    if (element.opensByDate) {
      Object.keys(element.opensByDate).forEach((k) => {
        if (typeof opensByDateTotal[k] !== "number") opensByDateTotal[k] = 0;
        opensByDateTotal[k] += element.opensByDate[k];
      });
    }
  });

  Object.keys(opensByDateTotal).forEach((k) => {
    const date = moment(k, "YYYYMMDD");
    if (
      date.isSameOrAfter(monthData.start, "day") &&
      date.isSameOrBefore(monthData.finish, "day")
    ) {
      totalOpens += opensByDateTotal[k];
    }
  });

  return (
    <header className="w-full py-5 px-4 text-gray-700 bg-gray-200 relative">
      <div className="flex justify-start">
        <div className="text-2xl font-bold text-gray-700 mb-4">
          CODERHOUSE App Usuarios Activos
        </div>

        <div className="ml-8 w-48">
          <Select
            options={actives}
            value={monthData}
            getOptionLabel={(x: MonthData) => x.label}
            getOptionValue={(x: MonthData) => x.label}
            isClearable={false}
            isSearchable={false}
            onChange={(x: any) => setData(x)}
          />
        </div>
      </div>
      {/* <p className="font-normal text-gray-500 text-justify mb-4">
        Datos desde el <strong>01/06/2022</strong> hasta el{" "}
        <strong>30/06/2022</strong>
      </p> */}

      <table>
        <tbody>
          <tr>
            <td className="font-normal text-gray-500 text-justify">
              Usuarios activos totales
            </td>
            <td className="pl-4 font-medium">
              {monthData.users.length.toLocaleString("es-AR")}
            </td>
          </tr>
          <tr>
            <td className="font-normal text-gray-500 text-justify">
              Aperturas de app
            </td>
            <td className="pl-4 font-medium">
              {totalOpens.toLocaleString("es-AR")}
            </td>
          </tr>
          <tr>
            <td className="font-normal text-gray-500 text-justify">
              Promedio por usuario
            </td>
            <td className="pl-4 font-medium">
              {(totalOpens / monthData.users.length)
                .toFixed(1)
                .replace(".", ",")}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="absolute right-1 top-1 text-xs">
        Actualizado: 29/07/2022 12:18
      </div>
    </header>
  );
};

export default Header;
