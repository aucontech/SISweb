import { httpApi, api } from "./http.api";

export interface LoginRequest {
    username: string;
    password: string;
}
export interface LoginResponse {
    data: any;
}

export interface RefreshTokenRequest {
    refreshToken: string | null;
}
export const login = (loginPayload: LoginRequest): Promise<LoginResponse> => {
    return httpApi.post<LoginResponse>("/auth/login", { ...loginPayload });
};

export const refreshToken = (
    tokenPayload: RefreshTokenRequest
): Promise<any> => {
    return api.post<any>("/auth/token", { ...tokenPayload });
};

export const getCurrentUser = (): Promise<any> => {
    return httpApi.get<any>("/auth/user");
};

export const changePassword = (reqData: any): Promise<any> => {
    return httpApi.post<any>("/auth/changePassword", { ...reqData });
};
export const updateProfile = (reqData: any): Promise<any> => {
    return httpApi.post<any>("/user?sendActivationMail=false", { ...reqData });
};

export const logout = (): Promise<any> => {
    return httpApi.post<any>("/auth/logout");
};
export const forgotPassword = (reqData: any): Promise<any> => {
    return httpApi.post<any>("/noauth/resetPasswordByEmailSogec", {
        ...reqData,
    });
};

export const resetPassword = (reqData: any): Promise<any> => {
    return httpApi.post<any>("/noauth/resetPassword", { ...reqData });
};
