import { httpApi } from "./http.api";
import { httpApi as httpApiv2 } from "./http.api.v2";
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
    return httpApiv2.get<any>(`/alarm/${entityType}/${entityId}`, {
        params: { ...reqParams },
    });
};

export const getAlarmTypes = (reqParams: any): Promise<any> => {
    return httpApi.get<any>("/alarm/types", {
        params: { ...reqParams },
    });
};
