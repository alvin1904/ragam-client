import React, { useContext, useState } from "react";
const AppContext = React.createContext();

import { loginUserApi, registerUserApi, setHead, getDetails } from "./apis";

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
        let temp = {
          ...user,
          email: data.email,
          verified: true,
          token: response.data.token,
        };
        await addtoLocalStorage(temp);
        setUser(temp);
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
  const addtoLocalStorage = async (data) => {
    try {
      data.token && setHead(data.token);
      const response = await getDetails();
      let temp = response.data;
      temp.token = data.token;
      localStorage.setItem("details", JSON.stringify(temp));
    } catch (err) {
      alert("token expire or net down");
      console.log(err);
    }
  };

  const getUser = () => user;

  return (
    <AppContext.Provider
      value={{
        getUser,
        addtoLocalStorage,
        loginUser,
        registerUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useUserAuthContext = () => useContext(AppContext);

export { AppProvider };
