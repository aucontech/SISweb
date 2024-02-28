import { useEffect, useState } from "react";
import {
    readToken,
    readRefreshToken,
    persistRefreshToken,
    persistToken,
} from "@/service/localStorage";
import { getCurrentUser, refreshTokenFun } from "@/api/auth.api";

interface User {}

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const authenticate = async () => {
            const token = readToken();
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                const resp = await getCurrentUser();
                if (resp.status === 200) {
                    setUser(resp.data.user); // Giả sử response trả về có chứa dữ liệu người dùng
                    setIsAuthenticated(true);
                }
            } catch (err: any) {
                console.error(err);
                if (err.response?.data?.errorCode === 11) {
                    const refreshToken = readRefreshToken();
                    if (refreshToken) {
                        try {
                            const resp = await refreshTokenFun({
                                refreshToken,
                            });
                            persistToken(resp.data.token);
                            persistRefreshToken(resp.data.refreshToken);
                            setIsAuthenticated(true);
                        } catch (error) {
                            console.error(error);
                            setIsAuthenticated(false);
                        }
                    } else {
                        setIsAuthenticated(false);
                    }
                } else {
                    setIsAuthenticated(false);
                }
            }
        };

        authenticate();
    }, []);

    return { isAuthenticated, user };
};

export default useAuth;
