import Header from "./components/Header";
import OpensDateChart from "./components/OpensDateChart";
import OsPieChart from "./components/OsPieChart";
import UserCountriesBars from "./components/UserCountriesBars";
import VersionsBars from "./components/VersionsBars";

const App = () => {
  return (
    <div className="max-w-screen-md mx-auto bg-gray-100 ">
      <Header />
      <div className="grid grid-cols-12 p-4">
        <div className="col-span-12 md:col-span-4">
          <OsPieChart />
        </div>
        <div className="col-span-12 md:col-span-8">
          <VersionsBars />
        </div>
        <div className="col-span-12 mt-4">
          <OpensDateChart />
        </div>
        <div className="col-span-12 mt-4">
          <UserCountriesBars />
        </div>
      </div>
    </div>
  );
};

export default App;
