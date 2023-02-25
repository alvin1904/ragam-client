import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
  // baseURL: "http://192.168.0.123:3000/",
  //   baseURL: "https://myTodo1904Personal-api.onrender.com/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const loginUserApi = (data) => api.post("/api/v1/user/auth/login", data);
export const registerUserApi = (data) => api.post("/api/v1/user/auth/login", data);

export const addTodo = (data) => api.post("/todo/new", data);
export const deleteTodo = (id) => api.delete(`/todo/delete/${id}`);
export const completeTodo = (id) => api.put(`/todo/complete/${id}`);
