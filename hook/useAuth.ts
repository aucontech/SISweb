import { useCallback, useEffect, useState } from "react";
import {
    readToken,
    readRefreshToken,
    persistRefreshToken,
    persistToken,
} from "@/service/localStorage";
import { getCurrentUser, refreshTokenFun } from "@/api/auth.api";

interface User {}

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false); // Thêm biến này

    const authenticate = useCallback(async () => {
        setIsLoading(true); // Bắt đầu xác thực
        const token = readToken();
        try {
            const resp = await getCurrentUser();
            if (resp.status === 200) {
                console.log(resp);
                //setUser(resp.data.user);
                setIsAuthenticated(true);
            }
        } catch (err: any) {
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false); // Kết thúc xác thực
        }
    }, []);

    useEffect(() => {
        authenticate();
    }, []);

    return { isAuthenticated, user, isLoading }; // Trả về isLoading
};
export default useAuth;
