import axios from "axios";

export const httpApi = axios.create({
    baseURL: process.env.baseUrlApi,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000,
});
