import React, { useContext, useState } from "react";
const AppContext = React.createContext();

import { loginUserApi, registerUserApi } from "./apis";

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
      console.log(response);
      if (response && response.data && response.data.token && data) {
        setUser({
          ...user,
          email: data.email,
          verified: true,
          token: response.data.token,
        });
      }
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  const registerUser = async (data) => {
    try {
      const response = await registerUserApi(data);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  const getUser = () => {
    return user;
  };
  return (
    <AppContext.Provider value={{ getUser, loginUser, registerUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useUserAuthContext = () => useContext(AppContext);

export { AppProvider };
