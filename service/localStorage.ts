export const persistToken = (token: any): void => {
    localStorage.setItem("accessToken", token);
};

export const readToken = (): string | null => {
    return localStorage.getItem("accessToken") || null;
};

export const persistRefreshToken = (token: any): void => {
    localStorage.setItem("refreshToken", token);
};

export const readRefreshToken = (): string | null => {
    return localStorage.getItem("refreshToken") || null;
};

export const persistUser = (user: any): void => {
    localStorage.setItem("user", JSON.stringify(user));
};

// export const readUser = (): UserModel | null => {
//     const userStr = localStorage.getItem("user");

//     return userStr ? JSON.parse(userStr) : testUser;
// };

export const deleteToken = (): void => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};
export const deleteUser = (): void => localStorage.removeItem("user");
