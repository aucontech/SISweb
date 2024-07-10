import { httpApi } from "./http.api";

// Định nghĩa interface ReportRequest
export interface ReportRequest {
    deviceId: string;
    date: number;
}

// Hàm getReport với đối số là một đối tượng ReportRequest và sử dụng phương thức POST
export const getReport = (reqParams: ReportRequest): Promise<any> => {
    return httpApi.post<any>("/report", reqParams);
};

export const exportReport = (reqParams: ReportRequest): Promise<any> => {
    // This assumes httpApi.post returns a fetch-like Response object
    return httpApi.post<Blob>("/exportreport", reqParams, {
        responseType: "blob",
        withCredentials: true,
    });
};
