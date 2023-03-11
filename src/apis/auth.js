import { getDetails, loginUserApi, registerUserApi, setHead } from ".";

export const loginApi = async (details) => {
  try {
    const response = await loginUserApi(details);
    console.log(response);
    if (response && response.data && response.data.token)
      await addtoLocalStorage(response.data.token);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const addtoLocalStorage = async (token) => {
  try {
    setHead(token);
    const response = await getDetails();
    let temp = response.data;
    temp.token = token; //adding a token key
    localStorage.setItem("details", JSON.stringify(temp));
  } catch (err) {
    console.log(err);
  }
};

export const registerApi = async (data) => {
  try {
    const response = await registerUserApi(data);
    return response;
  } catch (err) {
    return err;
  }
};
