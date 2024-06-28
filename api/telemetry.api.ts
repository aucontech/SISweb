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
    return httpApi.get<any>(
        `/plugins/telemetry/ASSET/${asseetId}/values/attributes/SERVER_SCOPE`
    );
};

export const saveOrUpdateTimeseriesData = (
    deviceId: string,
    params: any
): Promise<any> => {
    const requestBody = JSON.stringify(params);
    return httpApi.post<any>(
        `/plugins/telemetry/DEVICE/${deviceId}/timeseries/scope=ANY`,
        requestBody
    );
};

export const saveOrUpdateTimeseriesDataByAsset = (
    assetId: string,
    params: any
): Promise<any> => {
    const requestBody = JSON.stringify(params);
    return httpApi.post<any>(
        `/plugins/telemetry/ASSET/${assetId}/timeseries/scope=ANY`,
        requestBody
    );
};
export const getSeverAttributesByDeviceandKeys = (
    deviceId: string,
    keys: string
): Promise<any> => {
    return httpApi.get<any>(
        `/plugins/telemetry/DEVICE/${deviceId}/values/attributes/SERVER_SCOPE?keys=${keys}`
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

export const getTimeseriesKeys = (
    entityType: string,
    entityId: string
): Promise<any> => {
    return httpApi.get<any>(
        `/plugins/telemetry/${entityType}/${entityId}/keys/timeseries`
    );
};

export const getTimesSeriesData = (
    entityType: string,
    entityId: string,
    params: any
): Promise<any> => {
    return httpApi.get<any>(
        `/plugins/telemetry/${entityType}/${entityId}/values/timeseries`,
        {
            params,
        }
    );
};
