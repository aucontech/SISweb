// src/hooks/useToken.ts
import { useState, useEffect } from "react";
import { readToken } from "@/service/localStorage";
export const useToken = (): string | null => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Function to read token from localStorage

        // Read token initially when component mounts
        const initialToken = readToken();
        setToken(initialToken);

        // Function to handle storage event
        const handleStorageChange = () => {
            const newToken = readToken();
            setToken(newToken);
        };

        // Listen to storage events to detect changes in token
        window.addEventListener("storage", handleStorageChange);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []); // Empty dependency array ensures this effect runs only once

    return token;
};
