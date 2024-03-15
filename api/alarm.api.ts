import { httpApi } from "./http.api";

export const getAlarms = (reqParams: any): Promise<any> => {
    return httpApi.get<any>("/alarms", {
        params: { ...reqParams },
    });
};
