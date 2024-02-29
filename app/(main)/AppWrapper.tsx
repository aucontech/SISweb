"use client";
import React, { useEffect, useCallback, useState, ReactNode } from "react";
import { getCurrentUser, refreshTokenFun } from "@/api/auth.api";
import {
    persistRefreshToken,
    persistToken,
    readRefreshToken,
} from "@/service/localStorage";
import Router, { useRouter } from "next/navigation";
import Login from "./login/page";
import { ProgressSpinner } from "primereact/progressspinner";

interface AppWrapperProps {
    children: ReactNode;
}
const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
    const _checkSession = useCallback(async () => {
        try {
            const user = await getCurrentUser();
            console.log(user);
            if (user) {
                setIsAuthenticated(true);
            }
        } catch (error: any) {
            console.log(error);
            if (error?.response?.data?.errorCode === 11) {
                let refreshToken = readRefreshToken();
                try {
                    const res = await refreshTokenFun({ refreshToken });
                    if (res) {
                        persistToken(res.token);
                        persistRefreshToken(res.refreshToken);
                        setIsAuthenticated(true);
                    } else {
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    setIsAuthenticated(false);
                }
            }
        } finally {
            setIsLoading(false); // End loading
        }
    }, []);
    useEffect(() => {
        const intervalId = setInterval(() => {
            _checkSession();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [_checkSession]);

    const spinnerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    };
    if (isLoading) {
        return (
            <div style={spinnerStyle}>
                <ProgressSpinner style={{ width: "50px", height: "50px" }} />
            </div>
        );
    }

    return isAuthenticated ? <>{children}</> : <Login />;
};

export default AppWrapper;
