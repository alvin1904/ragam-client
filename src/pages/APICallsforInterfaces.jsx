import { logoutUserApi, setHead } from "../apis/index";

const APICallsforMain = () => {
  return { msg: "main" };
};
const APICallsforSearch = () => {
  return { msg: "search" };
};
const APICallsforProfile = () => {
  let data = getFromLocalStorage();
  //also users' playlists
  if (data && data != null) return data;
};
const APICallsforSettings = () => {
  let data = getFromLocalStorage();
  if (data && data != null) return data;
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

//helpers
const getFromLocalStorage = () => {
  let data = JSON.parse(localStorage.getItem("details"));
  if (data) return data;
  else window.location.reload(); //to reload so that tokenCheck can happen
};

export {
  APICallsforMain,
  APICallsforSearch,
  APICallsforProfile,
  APICallsforSettings,
  APICallsforSignOut,
};
