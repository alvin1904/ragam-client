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
export const getDetails = () => api.get("/user");
export const logoutUserApi=()=>api.get("/user/auth/logout");

export const addTodo = (data) => api.post("/todo/new", data);
export const deleteTodo = (id) => api.delete(`/todo/delete/${id}`);
export const completeTodo = (id) => api.put(`/todo/complete/${id}`);
