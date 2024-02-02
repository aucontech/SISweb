import axios from "axios";
import {
    persistRefreshToken,
    persistToken,
    readToken,
} from "@/service/localStorage";
import { refreshTokenFun } from "./auth.api";
import { readRefreshToken } from "@/service/localStorage";
export const httpApi = axios.create({
    baseURL: process.env.baseUrlApi,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000,
});

httpApi.interceptors.request.use(
    (config) => {
        const token = readToken();
        if (token) {
            config.headers["X-Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

httpApi.interceptors.response.use(
    (response) => {
        // If the response is successful, just return it
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        // Check if the error is due to a token expiration and we haven't already retried
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark it so we don't try to refresh the token again
            const refreshToken: string | null = readRefreshToken();
            if (refreshToken) {
                try {
                    const res = await refreshTokenFun({
                        refreshToken,
                    });
                    if (res) {
                        persistToken(res.token);
                        persistRefreshToken(res.refreshToken);
                        originalRequest.headers[
                            "X-Authorization"
                        ] = `Bearer ${res.token}`;
                    }
                    // Update the header of the original request

                    // Retry the request with the new token
                    return httpApi(originalRequest);
                } catch (refreshError) {
                    return Promise.reject(refreshError); // If token refresh fails, reject the promise
                }
            } else {
                return Promise.reject(error);
            }
        }
        // If the error is not due to token expiration or another request, just return it
        return Promise.reject(error);
    }
);
