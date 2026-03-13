import axios from "axios";
import { useUserStore } from "@/stores/user";

const http = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 10000,
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.userInfo?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (e) => Promise.reject(e),
);

// 响应拦截器
http.interceptors.response.use(
  (res) => res.data,
  (e) => {
    return Promise.reject(e);
  },
);

export default http;
