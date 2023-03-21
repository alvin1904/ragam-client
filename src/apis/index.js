import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  // baseURL: "http://192.168.0.123:5000/api/v1",
  //   baseURL: "https://myTodo1904Personal-api.onrender.com/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const setHead = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// AUTH
export const loginUserApi = (data) => api.post("/user/auth/login", data);
export const registerUserApi = (data) => api.post("/user/auth/register", data);
export const logoutUserApi = () => api.get("/user/auth/logout");
export const getDetails = () => api.get("/user");
export const updateUserName = (data) => api.patch("/user/auth/edit", data);
export const updatePassword = (data) =>
  api.patch("/user/auth/edit/password", data);

// SONGS & SUER SERVICES
export const getSongsApi = (count) =>
  api.get(`/user-services/songs?count=${count}`);
export const getSongApi = (id) => api.get(`/song/${id}`);
export const getAlbumsApi = (count) =>
  api.get(`/user-services/albums?count=${count}`);
export const getAlbumApi = (id) => api.get(`/user-services/albums/${id}`);

// PLAYLISTS
export const createPlaylistsApi = (data) => api.post("/playlists", data);
export const updatePlaylistsApi = (id, data) =>
  api.patch(`/playlists/${id}`, data);
export const deletePlaylistsApi = (id) => api.delete(`/playlists/${id}`);
export const getAllPlaylistsApi = () => api.get("/playlists");
export const getFromPlaylistsApi = (id) => api.get(`/playlists/${id}`);

// LIKE
export const LikeSongApi = (id) => api.post(`/user-services/songs/like/${id}`);
export const DislikeSongApi = (id) =>
  api.post(`/user-services/songs/remove-like/${id}`);

// SEARCH
export const searchApi = (keyword) => api.get(`/search/${keyword}`);
