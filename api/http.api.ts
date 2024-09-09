import axios from "axios";
import {
    readToken,
    readRefreshToken,
    persistToken,
    persistRefreshToken,
} from "@/service/localStorage";
import { refreshToken as RefreshToken } from "./auth.api";
export const httpApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL_API}`,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 100000,
});

export const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL_API}`,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 100000,
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
        if (
            error?.response?.data?.errorCode === 11 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true; // Mark it so we don't try to refresh the token again
            const refreshToken: string | null = readRefreshToken();
            if (refreshToken) {
                try {
                    const res = await RefreshToken({
                        refreshToken,
                    });
                    let { data } = res;
                    if (data) {
                        persistToken(data.token);
                        persistRefreshToken(data.refreshToken);
                        originalRequest.headers[
                            "X-Authorization"
                        ] = `Bearer ${data.token}`;
                    }

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
