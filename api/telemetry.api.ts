import { httpApi } from "./http.api";

export const getSeverAttributesByDevice = (deviceId: string): Promise<any> => {
    return httpApi.get<any>(
        `/plugins/telemetry/DEVICE/${deviceId}/values/attributes/SERVER_SCOPE`
    );
};

export const saveOrUpdateSeverAttributesByDevice = (
    deviceId: string,
    attribute: any
): Promise<any> => {
    return httpApi.post<any>(
        `/plugins/telemetry/DEVICE/${deviceId}/SERVER_SCOPE`,
        { ...attribute }
    );
};
