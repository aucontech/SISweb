import { useEffect, useState } from "react";
import { readToken } from "@/service/localStorage";
import { getCurrentUser } from "@/api/auth.api";
interface User {}
const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const token = readToken();
        console.log(token);
        if (token && token !== "undefined") {
            setIsAuthenticated(true);
            getCurrentUser()
                .then((resp) => console.log(resp))
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    return { isAuthenticated, user };
};
export default useAuth;
