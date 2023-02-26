import "./AppInterface.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  Loading_Interface,
  Main_Interface,
  Search_Interface,
  Profile_Interface,
  Settings_Interface,
  Error_Interface,
} from "../components/interfaces/index";
import { useReducer } from "react";
import {
  LoadReducer,
  INITIAL_STATE,
} from "../components/interfaces/LoadReducer";

const AppInterface = () => {
  const [state, dispatch] = useReducer(LoadReducer, INITIAL_STATE);

  const changeInterface = (target) => {
    dispatch({ type: "Loading_Interface" });
    try {
      // let data;
      // if ((target = "Main_Interface")) {
      //   data = forMain();
      //   console.log(data);
      // }
      // else{
      //   data={q: "adfad"}
      // }
    } catch (err) {
      console.log(err);
      dispatch({ type: "Error_Interface" });
    }
    dispatch({ type: target, payload: data });
  };

  return (
    <div className="interface">
      <Navbar />
      <Sidebar interfaces={state.interface} changeInterface={changeInterface} />
      {state.interface == "Loading_Interface" && <Loading_Interface />}
      {state.interface == "Main_Interface" && <Main_Interface />}
      {state.interface == "Search_Interface" && <Search_Interface />}
      {state.interface == "Profile_Interface" && <Profile_Interface />}
      {state.interface == "Settings_Interface" && <Settings_Interface />}
      {state.interface == "Error_Interface" && <Error_Interface />}
    </div>
  );
};

export default AppInterface;
