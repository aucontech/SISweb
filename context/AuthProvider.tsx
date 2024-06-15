"use client";
import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    ReactNode,
} from "react";
import {
    readToken,
    readRefreshToken,
    persistRefreshToken,
    persistToken,
} from "@/service/localStorage";
import { getCurrentUser, refreshTokenFun } from "@/api/auth.api";

// Xác định kiểu cho User và AuthContext
interface User {
    // Thêm các thuộc tính cho User tùy vào cấu trúc của đối tượng User bạn nhận được
}

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    user: User | null;
    isLoading: boolean;
}

// Tạo một Context với kiểu AuthContextType
export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

// Tạo AuthProvider component với TypeScript
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const authenticate = useCallback(async () => {
        setIsLoading(() => true);
        const token = readToken();
        try {
            const resp = await getCurrentUser();
            if (resp.status === 200) {
                setIsAuthenticated(() => true);
                // setUser(resp.data.user);
            }
        } catch (error: any) {
            //console.log(error);
            if (error?.response?.data?.errorCode !== 11) {
                setIsAuthenticated(() => false);
            } else {
                await handleRefreshToken();
            }
        } finally {
            setIsLoading(() => false);
        }
    }, []);
    const handleRefreshToken = async () => {
        try {
            const refreshToken = readRefreshToken();
            const newTokens = await refreshTokenFun({ refreshToken });
            persistToken(newTokens?.data.token);
            persistRefreshToken(newTokens?.data.refreshToken);
            setIsAuthenticated(() => true);
        } catch (error) {
            setIsAuthenticated(() => false);
        }
    };

    const _checkSession = useCallback(async () => {
        try {
            const user = await getCurrentUser();
            if (user) {
            } else {
            }
        } catch (error) {
            await handleRefreshToken();
        }
    }, []);

    useEffect(() => {
        // _checkSession();
        const intervalId = setInterval(async () => {
            await _checkSession();
        }, 2000);
        return () => clearInterval(intervalId);
    }, [_checkSession]);

    useEffect(() => {
        authenticate();
    }, [authenticate]);
    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setIsAuthenticated, user, isLoading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Tạo một custom hook để sử dụng context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
