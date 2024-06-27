import { httpApi } from "./http.api";

export const getRelations = (reqParams: any) => {
    return httpApi.get<any>(`/relations`, { params: { ...reqParams } });
};
