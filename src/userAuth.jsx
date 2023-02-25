import React, { useContext, useState } from "react";
const AppContext = React.createContext();

import { loginUserApi } from "./apis";

const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    token: "",
    verified: false,
  });

  const loginUser = async (data) => {
    try {
      const response = await loginUserApi(data);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  return (
    <AppContext.Provider value={{ user, loginUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useUserAuthContext = () => useContext(AppContext);

export { AppProvider };
