import { httpApi } from "./http.api";

export const getAllAlarms = (reqParams: any): Promise<any> => {
    return httpApi.get<any>("/alarms", {
        params: { ...reqParams },
    });
};

export const getAlarms = (
    entityType: string,
    entityId: string,
    reqParams: any
): Promise<any> => {
    return httpApi.get<any>(`/alarm/${entityType}/${entityId}`, {
        params: { ...reqParams },
    });
};
