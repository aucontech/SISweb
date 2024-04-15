import { httpApi } from "./http.api";

export const getAssets = (reqParams: any): Promise<any> => {
    return httpApi.get<any>("/tenant/assetInfos", {
        params: { ...reqParams },
    });
};
