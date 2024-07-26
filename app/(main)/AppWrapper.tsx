"use client";
import React, { useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ProgressSpinner } from "primereact/progressspinner";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { readUser } from "@/service/localStorage";
import { getDeviceByCustomer } from "@/api/device.api";
import { MEIKO_DEVICE_ID, OTSUKA_DEVICE_ID } from "@/constants/constans";

interface AppWrapperProps {
    children: ReactNode;
}

interface RouteConfig {
    CUSTOMER_USER: {
        DEFAULT_ROUTES: string[];
        DEVICE_SPECIFIC: {
            [key: string]: string[];
        };
    };
    OTHER_USER: string[];
}

const ROUTE_CONFIG: RouteConfig = {
    CUSTOMER_USER: {
        DEFAULT_ROUTES: ["/Graphic", "/alarmsummarycustomer", "/user"],
        DEVICE_SPECIFIC: {
            [OTSUKA_DEVICE_ID]: ["/OTSUKA"],
            [MEIKO_DEVICE_ID]: ["/Graphic/MEIKO"],
        },
    },
    OTHER_USER: [
        "/Graphic",
        "/scorecard",
        "/alarmsummary",
        "/alarmhistory",
        "/SetupData",
        "/devices",
        "/customerreport",
        "/gcvalues",
        "/datatablereport",
        "/historicalchart",
        "/filemanager",
        "/user",
    ],
};

type MiddlewareResult = {
    success: boolean;
    action?: "redirect";
    payload?: string;
};

type Middleware = (
    user: any,
    pathname: string,
    deviceId: string | null
) => MiddlewareResult | Promise<MiddlewareResult>;

type MiddlewareChain = Middleware[];

const isAuthenticated: Middleware = (user) => ({
    success: !!user,
});

const hasAccess: Middleware = (user, pathname, deviceId) => {
    if (user && user.authority === "CUSTOMER_USER") {
        const allowedRoutes = [
            ...ROUTE_CONFIG.CUSTOMER_USER.DEFAULT_ROUTES,
            ...(deviceId &&
            deviceId in ROUTE_CONFIG.CUSTOMER_USER.DEVICE_SPECIFIC
                ? ROUTE_CONFIG.CUSTOMER_USER.DEVICE_SPECIFIC[deviceId]
                : []),
        ];
        return { success: allowedRoutes.includes(pathname) };
    } else {
        return { success: ROUTE_CONFIG.OTHER_USER.includes(pathname) };
    }
};

const middlewareChain: MiddlewareChain = [isAuthenticated, hasAccess];

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const { isAuthenticated, isLoading, isRedirectToLogin, user } = authContext;
    console.log("user", user);
    const getCustomerDefaultRoute = async (user: any): Promise<string> => {
        if (user && user.authority === "CUSTOMER_USER") {
            try {
                const devices = await getDeviceByCustomer(user.customerId.id, {
                    page: 0,
                    pageSize: 100,
                });
                const deviceId =
                    devices.data.data.length > 0
                        ? devices.data.data[0].id.id
                        : null;

                if (
                    deviceId &&
                    deviceId in ROUTE_CONFIG.CUSTOMER_USER.DEVICE_SPECIFIC
                ) {
                    return ROUTE_CONFIG.CUSTOMER_USER.DEVICE_SPECIFIC[
                        deviceId
                    ][0];
                }
            } catch (error) {
                console.error("Error fetching device:", error);
            }
        }
        return ROUTE_CONFIG.CUSTOMER_USER.DEFAULT_ROUTES[0];
    };

    const runMiddleware = async (
        user: any,
        pathname: string,
        deviceId: string | null
    ): Promise<MiddlewareResult> => {
        for (const middleware of middlewareChain) {
            const result = await middleware(user, pathname, deviceId);
            if (!result.success) {
                return result;
            }
        }
        return { success: true };
    };

    const handleRouting = async (
        user: any,
        isDefaultRouting: boolean = false
    ) => {
        if (!user) return;

        let deviceId = null;
        if (user.authority === "CUSTOMER_USER") {
            try {
                const devices = await getDeviceByCustomer(user.customerId.id, {
                    page: 0,
                    pageSize: 100,
                });
                deviceId =
                    devices.data.data.length > 0
                        ? devices.data.data[0].id.id
                        : null;
            } catch (error) {
                console.error("Error fetching device:", error);
            }
        }

        if (isDefaultRouting) {
            const defaultRoute = await getCustomerDefaultRoute(user);
            router.push(defaultRoute);
        } else {
            console.log("run middleware");
            const middlewareResult = await runMiddleware(
                user,
                pathname,
                deviceId
            );
            if (!middlewareResult.success) {
                const defaultRoute = await getCustomerDefaultRoute(user);

                router.push(defaultRoute);
            }
        }
    };

    useEffect(() => {
        console.log("pathname", pathname);
        console.log("user", user);
        console.log("isAuthenticated", isAuthenticated);
        const userStored = readUser();
        if (!isAuthenticated) {
            if (
                isRedirectToLogin ||
                pathname === "/login" ||
                pathname === "/"
            ) {
                router.push("/login");
            }
        } else {
            if (pathname === "/" || pathname === "/login") {
                console.log("redirect to default route", user);
                handleRouting(userStored, true);
            } else {
                handleRouting(userStored);
            }
            // Nếu pathname là "/login" và user đã authenticated, không làm gì cả
        }
    }, [isAuthenticated, pathname, isRedirectToLogin]);

    if (isLoading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <ProgressSpinner style={{ width: "50px", height: "50px" }} />
            </div>
        );
    }

    return <>{children}</>;
};

export default AppWrapper;
