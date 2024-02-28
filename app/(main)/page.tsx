"use client";
import React, { useEffect, useCallback, useState } from "react";
import Home from "./home/page";
import Login from "./login/page";
import useAuth from "@/hook/useAuth";
import { getCurrentUser, refreshTokenFun } from "@/api/auth.api";
import {
    persistRefreshToken,
    persistToken,
    readRefreshToken,
} from "@/service/localStorage";

const AppWrapper = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const _checkSession = useCallback(async () => {
        const user = await getCurrentUser();
        if (!user) {
            let refreshToken = readRefreshToken();
            const res = await refreshTokenFun({ refreshToken });
            if (res) {
                persistToken(res.token);
                persistRefreshToken(res.refreshToken);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(true);
        }
    }, []);
    useEffect(() => {
        const intervalId = setInterval(() => {
            _checkSession();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [_checkSession]);

    // Kiểm tra nếu người dùng đã xác thực, trả về trang Home, ngược lại trả về trang Login
    return isAuthenticated ? <Home /> : <Login />;
};

export default AppWrapper;
