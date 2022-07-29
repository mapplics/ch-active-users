import { MonthData } from "../interfaces";

const Header = ({ monthData }: { monthData: MonthData }) => {
  let totalOpens = 0;

  monthData.users.forEach((element) => {
    if (element.opensByDate) {
      totalOpens += Object.keys(element.opensByDate).reduce(
        (prev, k) => prev + element.opensByDate[k],
        0,
      );
    }
  });

  return (
    <div className="w-full py-5 px-4 text-gray-700 bg-gray-200 relative">
      <div className="w-full text-2xl font-bold text-gray-700 mb-4">
        CODERHOUSE App Usuarios Activos
      </div>
      <p className="font-normal text-gray-500 text-justify mb-4">
        Datos desde el <strong>01/06/2022</strong> hasta el{" "}
        <strong>30/06/2022</strong>
      </p>

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
              {(totalOpens / monthData.users.length).toFixed(1).replace(".", ",")}
            </td>
          </tr>
        </tbody>
      </table>

      {/* 
      <div className="absolute right-1 top-1 text-xs">
        Actualizado: 28/06/2022 9:18
      </div>
      */}
    </div>
  );
};

export default Header;
