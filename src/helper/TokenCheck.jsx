import { Navigate } from "react-router-dom";
import { setHead } from "../apis/index";

const TokenCheck = ({ children }) => {
  let temp = localStorage.getItem("details");
  if (!temp) return <Navigate to="/login" replace={true} />;
  else setHead(JSON.parse(temp).token); // set token to head each time the app refreshes
  return children;
};

export default TokenCheck;
