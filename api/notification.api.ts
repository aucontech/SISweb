import { httpApi } from "./http.api";

export const getNotifications = (reqParams: any): Promise<any> => {
    return httpApi.get<any>("/notifications", { params: { ...reqParams } });
};

export const deleteNotification = (id: string): Promise<any> => {
    return null;
};
