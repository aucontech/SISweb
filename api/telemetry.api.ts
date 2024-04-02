import { httpApi } from "./http.api";

export const getSeverAttributesByDevice = (deviceId: string): Promise<any> => {
    return httpApi.get<any>(
        `/plugins/telemetry/DEVICE/${deviceId}/values/attributes/SERVER_SCOPE`
    );
};
