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

export const getSeverAttributesByAsset = (asseetId: string): Promise<any> => {
    console.log(asseetId);
    return httpApi.get<any>(
        `/plugins/telemetry/ASSET/${asseetId}/values/attributes/SERVER_SCOPE`
    );
};

export const saveOrUpdateSeverAttributesByAsseet = (
    assetId: string,
    attribute: any
): Promise<any> => {
    return httpApi.post<any>(
        `/plugins/telemetry/ASSET/${assetId}/SERVER_SCOPE`,
        { ...attribute }
    );
};
