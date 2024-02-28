import { httpApi } from "./http.api";

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

export const refreshTokenFun = (
    tokenPayload: RefreshTokenRequest
): Promise<any> => {
    return httpApi.post<any>("/auth/token", { ...tokenPayload });
};

export const getCurrentUser = (): Promise<any> => {
    return httpApi.get<any>("/auth/user");
};
