import { logoutUserApi, setHead } from "../../apis/index";
import { getFromLocalStorage } from "../../helper/StorageOperations";
import { useSongsContext } from "../../context/songContext";

const APICallsforMain =  () => {
  return {data: "home"};
};

const APICallsforSearch = () => {
  return { msg: "search" };
};

const APICallsforProfile = () => {
  return { msg: "profile" };
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
      return res;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export {
  APICallsforMain,
  APICallsforSearch,
  APICallsforProfile,
  APICallsforSettings,
  APICallsforSignOut,
};
