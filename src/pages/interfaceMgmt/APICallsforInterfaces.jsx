import { logoutUserApi, setHead } from "../../apis/index";
import { getFromLocalStorage } from "../../helper/StorageOperations";

const APICallsforMain = () => {
  return { msg: "main" };
};

const APICallsforSearch = () => {
  return { msg: "search" };
};

const APICallsforProfile = () => {
  let data = getFromLocalStorage();
  //also users' playlists
  return data;
};

const APICallsforSettings = () => {
  let data = getFromLocalStorage();
  return data;
};

const APICallsforSignOut = async () => {
  try {
    const res = await logoutUserApi();
    setHead("");
    if (res.status == 200) {
      localStorage.removeItem("details");
      localStorage.clear();
      console.log({ msg: res.data.message });
      return { msg: res.data.message };
    }
  } catch (err) {
    console.log(err);
    return { err: "signout error" };
  }
};

export {
  APICallsforMain,
  APICallsforSearch,
  APICallsforProfile,
  APICallsforSettings,
  APICallsforSignOut,
};
