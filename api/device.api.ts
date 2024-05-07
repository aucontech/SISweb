import { httpApi } from "./http.api";

export const getDevices = (reqParams: any): Promise<any> => {
    return httpApi.get<any>("/tenant/deviceInfos", {
        params: { ...reqParams },
    });
};

export const getDeviceById = (deviceId: string): Promise<any> => {
    return httpApi.get<any>(`/device/${deviceId}`);
};

export const getDeviceByCustomer = (
    customerId: string,
    reqParams: any
): Promise<any> => {
    return httpApi.get<any>(`/customer/${customerId}/devices`, {
        params: { ...reqParams },
    });
};
