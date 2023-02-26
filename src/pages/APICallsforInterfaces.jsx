import { logoutUserApi, setHead } from "../apis/index";

const APICallsforMain = () => {
  return { msg: "main" };
};
const APICallsforSearch = () => {
  return { msg: "search" };
};
const APICallsforProfile = () => {
  return { msg: "profile" };
};
const APICallsforSettings = () => {
  return { msg: "settings" };
};
const APICallsforSignOut = async () => {
  try {
    const res = await logoutUserApi();
    setHead("");
    if (res.status == 200) {
      localStorage.removeItem("details");
      localStorage.clear();
      return { msg: res.data.message };
    }
  } catch (err) {
    console.log(err);
    return { err: "signout" };
  }
};

export {
  APICallsforMain,
  APICallsforSearch,
  APICallsforProfile,
  APICallsforSettings,
  APICallsforSignOut,
};
