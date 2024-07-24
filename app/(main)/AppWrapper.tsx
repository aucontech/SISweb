"use client";
import React, { useEffect, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ProgressSpinner } from "primereact/progressspinner";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { usePathname } from "next/navigation";
import { readUser } from "@/service/localStorage";
import { getDeviceByCustomer } from "@/api/device.api";
import { MEIKO_DEVICE_ID, OTSUKA_DEVICE_ID } from "@/constants/constans";
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

    const _fetchDataDevciesByCustomer = useCallback(async () => {
        try {
            const user = readUser();
            const response = await getDeviceByCustomer(user.customerId.id, {
                page: 0,
                pageSize: 100,
            });
            const data = response.data.data; // Assuming response structure has a data attribute
            console.log(data);
            return data; // Ensure this matches the structure you expect
        } catch (err) {
            console.log(err);
            return []; // Return an empty array or handle the error as needed
        }
    }, []);

    useEffect(() => {
        const user = readUser();
        if (isRedirectToLogin && !isAuthenticated) {
            router.push("/login");
        } else {
            if (pathname === "/login") {
                router.push("/Graphic");
                if (user && user?.authority === "CUSTOMER_USER") {
                    _fetchDataDevciesByCustomer()
                        .then((res) => {
                            let deviceIds = res.map((item: any) => item.id.id);
                            if (deviceIds && deviceIds.length > 0) {
                                switch (deviceIds[0]) {
                                    case OTSUKA_DEVICE_ID:
                                        router.push("/OTSUKA");
                                        break;

                                    case MEIKO_DEVICE_ID:
                                        router.push("/Graphic/MEIKO");
                                        break;
                                }
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            } else {
                if (pathname === "/") {
                    router.push("/Graphic");
                    if (user && user.authority === "CUSTOMER_USER") {
                        _fetchDataDevciesByCustomer()
                            .then((res) => {
                                let deviceIds = res.map(
                                    (item: any) => item.id.id
                                );
                                if (deviceIds && deviceIds.length > 0) {
                                    switch (deviceIds[0]) {
                                        case OTSUKA_DEVICE_ID:
                                            router.push("/OTSUKA");
                                            break;

                                        case MEIKO_DEVICE_ID:
                                            router.push("/Graphic/MEIKO");
                                            break;
                                    }
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
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
