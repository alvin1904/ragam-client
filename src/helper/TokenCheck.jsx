import { Navigate } from "react-router-dom";

const TokenCheck = ({ children }) => {
  let temp = localStorage.getItem("details");
  if (!temp) return <Navigate to="/login" replace={true} />;
  return children;
};

export const getFromLocalStorage = () => {
  let data = JSON.parse(localStorage.getItem("details"));
  if (data) return data;
  else window.location.reload(); 
  //to reload so that tokenCheck can happen
};

export default TokenCheck;
