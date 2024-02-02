import axios from "axios";

export const http = axios.create({
    baseURL: "http://ewon-vpn.ddns.net:8200/api",
});
export const ContentType = "application/json";

http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers["accessToken"] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getUnReadAlarms = `/notifications?pageSize=10000&page=0&sortProperty=createdTime&sortOrder=DESC&unreadOnly=true`;
export const getReadAllAlarms = `/notifications?pageSize=10000&page=0&sortProperty=createdTime&sortOrder=DESC&unreadOnly=false`;
