import React, { useContext } from "react";
import { loginUserApi, registerUserApi, setHead, getDetails } from "../apis";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
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

  const loginUser = async (data) => {
    try {
      const response = await loginUserApi(data);
      console.log(response);
      if (data && response && response.data && response.data.token)
        await addtoLocalStorage(response.data.token);
      return response;
    } catch (err) {
      console.log(err);
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
