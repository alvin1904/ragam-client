import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  // baseURL: "http://192.168.0.123:3000/",
  //   baseURL: "https://myTodo1904Personal-api.onrender.com/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const setHead = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const loginUserApi = (data) => api.post("/user/auth/login", data);
export const registerUserApi = (data) => api.post("/user/auth/register", data);
export const logoutUserApi = () => api.get("/user/auth/logout");
export const getDetails = () => api.get("/user");
export const updateUserName = (data) => api.patch("/user/auth/edit", data);
export const updatePassword = (data) => api.patch("/user/auth/edit/password", data);

