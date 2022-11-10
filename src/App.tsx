import { useState } from "react";
import monthsData from "./data/actives";
import Header from "./components/Header";
import OpensDateChart from "./components/OpensDateChart";
import OsPieChart from "./components/OsPieChart";
import UserCountriesBars from "./components/UserCountriesBars";
import VersionsBars from "./components/VersionsBars";

const App = () => {
  const [monthData, setMonthData] = useState(monthsData[0]);

  return (
    <div className="max-w-screen-md lg:max-w-screen-lg mx-auto bg-gray-100 flex flex-col h-screen">
      <Header monthData={monthData} setData={setMonthData} />
      <div className="grid grid-cols-12 p-4 flex-1 overflow-y-auto">
        <div className="col-span-12 md:col-span-4">
          <OsPieChart monthData={monthData} />
        </div>
        <div className="col-span-12 md:col-span-8">
          <VersionsBars monthData={monthData} />
        </div>
        <div className="col-span-12 mt-4">
          <OpensDateChart monthData={monthData} />
        </div>
        <div className="col-span-12 mt-4">
          <UserCountriesBars monthData={monthData} />
        </div>
      </div>
    </div>
  );
};

export default App;
