import "./AppInterface.css";
import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LoadReducer,
  INITIAL_STATE,
} from "../../hooks/LoadReducer";
import {
  Loading_Interface,
  Main_Interface,
  Search_Interface,
  Profile_Interface,
  Settings_Interface,
  Error_Interface,
} from "../../interfaces/index";
import {
  APICallsforMain,
  APICallsforProfile,
  APICallsforSearch,
  APICallsforSettings,
  APICallsforSignOut,
} from "./APICallsforInterfaces";
// import { useUserAuthContext } from "../userAuth";

const AppInterface = () => {
  // const { addtoLocalStorage } = useUserAuthContext();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(LoadReducer, INITIAL_STATE);
  const [errors, setErrors] = useState("a big error");
  const changeInterface = (target) => {
    dispatch({ type: "Loading_Interface" });
    let data = {};
    try {
      switch (target) {
        case "Main_Interface":
          data = APICallsforMain();
          break;
        case "Search_Interface":
          data = APICallsforSearch();
          break;
        case "Profile_Interface":
          data = APICallsforProfile();
          break;
        case "Settings_Interface":
          data = APICallsforSettings();
          break;
        case "Sign_Out":
          data = APICallsforSignOut();
          return navigate("/login");
        default:
          data = {};
      }
    } catch (err) {
      data = { ...err };
      dispatch({ type: "Error_Interface" });
    }
    dispatch({ type: target, payload: data });
  };

  return (
    <div className="interface">
      <Navbar />
      <Sidebar interfaces={state.interface} changeInterface={changeInterface} />
      {state.interface == "Loading_Interface" && (
        <Loading_Interface data={state.data} />
      )}
      {state.interface == "Main_Interface" && (
        <Main_Interface data={state.data} />
      )}
      {state.interface == "Search_Interface" && (
        <Search_Interface data={state.data} />
      )}
      {state.interface == "Profile_Interface" && (
        <Profile_Interface data={state.data} />
      )}
      {state.interface == "Settings_Interface" && (
        <Settings_Interface data={state.data} />
      )}
      {state.interface == "Error_Interface" && (
        <Error_Interface data={state.data} />
      )}
      {errors && <div className="error_handler">{errors}</div>}
    </div>
  );
};

export default AppInterface;
