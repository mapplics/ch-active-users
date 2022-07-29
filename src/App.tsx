import months from "./actives";
import Header from "./components/Header";
import OpensDateChart from "./components/OpensDateChart";
import OsPieChart from "./components/OsPieChart";
import UserCountriesBars from "./components/UserCountriesBars";
import VersionsBars from "./components/VersionsBars";

const App = () => {
  return (
    <div className="max-w-screen-md mx-auto bg-gray-100 ">
      <Header  monthData={months[0]} />
      <div className="grid grid-cols-12 p-4">
        <div className="col-span-12 md:col-span-4">
          <OsPieChart  monthData={months[0]}/>
        </div>
        <div className="col-span-12 md:col-span-8">
          <VersionsBars  monthData={months[0]}/>
        </div>
        <div className="col-span-12 mt-4">
          <OpensDateChart  monthData={months[0]}/>
        </div>
        <div className="col-span-12 mt-4">
          <UserCountriesBars monthData={months[0]}/>
        </div>
      </div>
    </div>
  );
};

export default App;
