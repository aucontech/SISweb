"use client";
import React, { useEffect, useCallback, useState, ReactNode } from "react";
import { getCurrentUser, refreshTokenFun } from "@/api/auth.api";
import {
    persistRefreshToken,
    persistToken,
    readRefreshToken,
} from "@/service/localStorage";
import { useRouter } from "next/navigation";
import { ProgressSpinner } from "primereact/progressspinner";

interface AppWrapperProps {
    children: ReactNode;
}
const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter(); // Use useRouter hook for redirection

    const _checkSession = useCallback(async () => {
        try {
            setIsLoading(true);
            const user = await getCurrentUser();
            console.log(user);
            if (user) {
                // If the user is authenticated, do nothing here
            }
        } catch (error: any) {
            console.log(error);
            let shouldRedirect = false;
            if (error?.response?.data?.errorCode === 11) {
                let refreshToken = readRefreshToken();
                try {
                    const res = await refreshTokenFun({ refreshToken });
                    if (res) {
                        console.log("refresh successful", res);
                        persistToken(res.data?.token);
                        persistRefreshToken(res.data?.refreshToken);
                        // If refreshToken is successful, do nothing here
                    } else {
                        console.log("Refresh token unsuccessful");
                        shouldRedirect = true;
                    }
                } catch (error) {
                    shouldRedirect = true;
                }
            } else if (error?.response?.data?.errorCode === 10) {
                shouldRedirect = true;
            }

            if (shouldRedirect) {
                router.push("/login"); // Redirect to login page
            }
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    useEffect(() => {
        _checkSession();
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

    // Since we are redirecting unauthenticated users, we don't need an isAuthenticated check here
    return <>{children}</>;
};

export default AppWrapper;
