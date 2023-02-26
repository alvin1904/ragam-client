import "./Nav.css";
import {
  MdSettings,
  MdAccountCircle,
  MdLibraryMusic,
  MdOutlineSearch,
  MdExitToApp
} from "react-icons/md";
import { useEffect, useState } from "react";

const Sidebar = ({ interfaces, changeInterface }) => {
  const changePage = (page) => changeInterface(page);

  const btns = [
    // {
    //   target: "Loading_Interface",
    //   button: <MdLibraryMusic size={28} />,
    // },
    {
      target: "Main_Interface",
      button: <MdLibraryMusic size={28} />,
    },
    {
      target: "Search_Interface",
      button: <MdOutlineSearch size={28} />,
    },
    {
      target: "Profile_Interface",
      button: <MdAccountCircle size={28} />,
    },
    {
      target: "Settings_Interface",
      button: <MdSettings size={28} />,
    },
    {
      target: "Sign_Out",
      button: <MdExitToApp size={28} />,
    },
  ];

  const [firsttime, setFirstTime] = useState(true);
  useEffect(() => {
    if (firsttime) {
      setFirstTime(false);
      changePage("Main_Interface");
    }
  }, [firsttime]);

  return (
    <div className="sidebar">
      {btns.map((btn, index) => {
        return (
          <button
            key={index}
            className={`sidebar_btn ${
              btn.target == interfaces ? "nav_selected" : ""
            }`}
            onClick={() => {
              changePage(btn.target);
            }}
          >
            {btn.button}
          </button>
        );
      })}
    </div>
  );
};
export default Sidebar;
