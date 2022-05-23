import axios from "axios";

// khởi tạo và cấu hình cho axios

const value = localStorage.getItem("isLogin");
const token = Boolean(value) ? value : "";

const axioisClient = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
  headers: {
    "Content-Type": "application/json",
    isLogin: token,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

// cấu hình cho respone khi được trả về cho client
axioisClient.interceptors.response.use((respsone) => {
  if (respsone && respsone.data) {
    return respsone.data;
  }
  return respsone;
});

export default axioisClient;
