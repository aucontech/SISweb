import { httpApi } from "./http.api";

export const getDeviceProfiles = (reqParams: any): Promise<any> => {
    return httpApi.get<any>("/deviceProfiles", {
        params: { ...reqParams },
    });
};
