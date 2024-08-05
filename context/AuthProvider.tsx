"use client";
import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    ReactNode,
} from "react";

import { getCurrentUser } from "@/api/auth.api";
import { persistUser } from "@/service/localStorage";

// Xác định kiểu cho User và AuthContext
interface User {
    // Thêm các thuộc tính cho User tùy vào cấu trúc của đối tượng User bạn nhận được
}

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    user: User | null;
    isLoading: boolean;
    isRedirectToLogin: boolean;
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
    const [isRedirectToLogin, setIsRedirectToLogin] = useState(false);

    const authenticate = useCallback(async () => {
        setIsLoading(() => true);
        try {
            const resp = await getCurrentUser();
            if (resp.status === 200) {
                setIsAuthenticated(() => true);
                setIsRedirectToLogin(() => false);
                persistUser(resp.data);
                setUser(() => resp.data);
            }
        } catch (error: any) {
            if (error?.response?.data?.errorCode === 10) {
                setIsAuthenticated(() => false);
                setIsRedirectToLogin(() => true);
            }
        } finally {
            setIsLoading(() => false);
        }
    }, []);

    const _checkSession = useCallback(async () => {
        try {
            const userRes = await getCurrentUser();
            if (userRes) {
                if (!isAuthenticated) {
                    setIsAuthenticated(true);
                }
            }
        } catch (error: any) {
            if (error?.response?.data?.errorCode === 10) {
                setIsAuthenticated(() => false);
                setIsRedirectToLogin(() => true);
            }
        } finally {
           // setIsLoading(() => false);
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
    // console.log("user", user);
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                user,
                isLoading,
                isRedirectToLogin,
            }}
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
