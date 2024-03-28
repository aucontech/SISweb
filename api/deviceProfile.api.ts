import { httpApi } from "./http.api";

export const getDeviceProfiles = (reqParams: any): Promise<any> => {
    return httpApi.get<any>("/deviceProfiles", {
        params: { ...reqParams },
    });
};

export const getDeviceProfileById = (id: string): Promise<any> => {
    return httpApi.get<any>(`/deviceProfile/${id}`, {});
};

export const saveOrUpdateDeviceProfile = (deviceProfile: any): Promise<any> => {
    return httpApi.post<any>(`/deviceProfile`, deviceProfile);
};
export const getTimeSeriesKeyByProfileId = (id: string): Promise<any> => {
    return httpApi.get<any>(`/deviceProfile/devices/keys/timeseries`, {
        params: {
            deviceProfileId: id,
        },
    });
};
