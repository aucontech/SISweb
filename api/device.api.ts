import { httpApi } from "./http.api";

export const getDevices = (reqParams: any): Promise<any> => {
    return httpApi.get<any>("/tenant/deviceInfos", {
        params: { ...reqParams },
    });
};
