"use client";
import React, {
    useEffect,
    useCallback,
    useState,
    ReactNode,
    Suspense,
} from "react";
import { getCurrentUser, refreshTokenFun } from "@/api/auth.api";
import {
    persistRefreshToken,
    persistToken,
    readRefreshToken,
} from "@/service/localStorage";
import { useRouter } from "next/navigation"; // Đảm bảo rằng đây là cách đúng để import useRouter
import { ProgressSpinner } from "primereact/progressspinner";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { usePathname } from "next/navigation";

interface AppWrapperProps {
    children: ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    const { isAuthenticated, setIsAuthenticated, isLoading } = authContext;

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        } else {
            if (pathname === "/login") {
                router.push("/");
            } else {
                router.push(pathname);
            }
        }
    }, [isAuthenticated, pathname]);

    const spinnerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    };

    return (
        <>
            {isLoading ? (
                <div style={spinnerStyle}>
                    <ProgressSpinner
                        style={{ width: "50px", height: "50px" }}
                    />
                </div>
            ) : (
                children
            )}
        </>
    );
};

export default AppWrapper;
