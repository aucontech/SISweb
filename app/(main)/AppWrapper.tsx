"use client";
import React, { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
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
    const { isAuthenticated, isLoading, isRedirectToLogin } = authContext;

    useEffect(() => {
        if (isRedirectToLogin && !isAuthenticated) {
            router.push("/login");
        } else {
            if (pathname === "/login") {
                router.push("/Graphic");
            } else {
                if (pathname === "/") {
                    router.push("/Graphic");
                } else {
                    router.push(pathname);
                }
            }
        }
    }, [isAuthenticated, pathname, isRedirectToLogin]);

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
