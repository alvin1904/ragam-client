import React, { useContext } from "react";
import {
  loginUserApi,
  registerUserApi,
  setHead,
  getDetails,
} from "../../../ragam/src/apis";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const registerUser = async (data) => {
    try {
      const response = await registerUserApi(data);
      return response;
    } catch (err) {
      return err;
    }
  };

  const loginUser = async (data) => {
    try {
      const response = await loginUserApi(data);
      if (data && response && response.data && response.data.token)
        await addtoLocalStorage(response.data.token);
      return response;
    } catch (err) {
      return err;
    }
  };

  const addtoLocalStorage = async (token) => {
    try {
      setHead(token);
      const response = await getDetails();
      let temp = response.data;
      temp.token = token; //adding a token key
      localStorage.setItem("details", JSON.stringify(temp));
    } catch (err) {
      alert("token expire or net down");
      console.log(err);
    }
  };

  return (
    <AppContext.Provider
      value={{
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
