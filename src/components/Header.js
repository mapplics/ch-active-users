import actives from "../actives";

const Header = () => {
  return (
    <div className="w-full py-5 px-4 text-gray-700 bg-gray-200 relative">
      <div className="w-full text-2xl font-bold text-gray-700 mb-4">
        CH App Usuarios Activos
      </div>
      <p className="font-normal text-gray-500 text-justify">
        Datos desde el <strong>01/06/2022</strong> hasta el{" "}
        <strong>30/06/2022</strong>
      </p>

      <p className="font-normal text-gray-500 text-justify">
        Usuarios activos totales{" "}
        <strong>{actives.length.toLocaleString("es-AR")}</strong>
      </p>

      {/* 
      <div className="absolute right-1 top-1 text-xs">
        Actualizado: 28/06/2022 9:18
      </div>
      */}
    </div>
  );
};

export default Header;
