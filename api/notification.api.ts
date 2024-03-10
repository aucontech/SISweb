import { httpApi } from "./http.api";

export const getNotifications = (reqParams: any): Promise<any> => {
    return httpApi.get<any>("/notifications", { params: { ...reqParams } });
};

export const deleteNotifications = (id: string) => {
    return httpApi.delete<any>(`/notification/${id}`);
};
