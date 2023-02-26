import { Navigate } from "react-router-dom";

const TokenCheck = ({ children }) => {
  let temp = localStorage.getItem("details");
  if (!temp) return <Navigate to="/login" replace={true} />;
  return children;
};

export default TokenCheck;
