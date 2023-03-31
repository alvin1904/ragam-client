import "./AppInterface.css";
import Sidebar from "../../layouts/Sidebar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  Loading_Interface,
  Main_Interface,
  Search_Interface,
  Profile_Interface,
  Settings_Interface,
  Error_Interface,
} from "../../interfaces/index";
import { PlayListProvider } from "../../context/PlaylistContext";
import { logoutUserApi, setHead } from "../../apis";

const AppInterface = () => {
  const [interfaceSelected, setInterfaceSelected] = useState("");
  const navigate = useNavigate();

  const changeInterface = async (target) => {
    if (target == "Search_Interface") {
      setInterfaceSelected(target);
    } else if (target == "Sign_Out") {
      try {
        const res = await logoutUserApi();
        setHead("");
        if (res.status == 200) {
          localStorage.removeItem("details");
          localStorage.clear();
          navigate("/login");
        }
      } catch (err) {
      }
    } else {
      setInterfaceSelected(target);
    }
  };

  return (
    <div className="interface">
      <Sidebar
        interfaces={interfaceSelected}
        changeInterface={changeInterface}
      />
      {interfaceSelected == "Loading_Interface" && <Loading_Interface />}
      <PlayListProvider>
        {interfaceSelected == "Main_Interface" && <Main_Interface />}
        {interfaceSelected == "Search_Interface" && (
          <Search_Interface changeInterface={changeInterface} />
        )}
        {interfaceSelected == "Profile_Interface" && (
          <Profile_Interface changeInterface={changeInterface} />
        )}
      </PlayListProvider>
      {interfaceSelected == "Settings_Interface" && <Settings_Interface />}
      {interfaceSelected == "Error_Interface" && <Error_Interface />}
    </div>
  );
};

export default AppInterface;
