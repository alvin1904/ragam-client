import "./AppInterface.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loading_Interface from "../components/interfaces/Loading_Interface";
import Main_Interface from "../components/interfaces/Main_Interface";
import Profile_Interface from "../components/interfaces/Profile_Interface";
import Settings_Interface from "../components/interfaces/Settings_Interface";
import { useState } from "react";

const AppInterface = () => {
  const [interfaces, setInterfaces] = useState("Loading_Interface");

  return (
    <div className="interface">
      <Navbar />
      <Sidebar interfaces={interfaces} setInterfaces={setInterfaces} />
      {interfaces == "Loading_Interface" && <Loading_Interface />}
      {interfaces == "Main_Interface" && <Main_Interface />}
      {interfaces == "Profile_Interface" && <Profile_Interface />}
      {interfaces == "Settings_Interface" && <Settings_Interface />}
    </div>
  );
};

export default AppInterface;
