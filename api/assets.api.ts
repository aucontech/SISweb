import { ex } from "@fullcalendar/core/internal-common";
import { httpApi } from "./http.api";

export const getAssets = (reqParams: any): Promise<any> => {
    return httpApi.get<any>("/tenant/assetInfos", {
        params: { ...reqParams },
    });
};

export const getAssetById = (id: string): Promise<any> => {
    return httpApi.get<any>(`/asset/${id}`);
};
