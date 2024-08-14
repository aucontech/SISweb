import * as XLSX from "xlsx";
import { Button } from "primereact/button";

import { Utils } from "@/service/Utils";
interface Props {
    data: any[];
    columns: any[];
    filters: any;
    user: any;
}

const ExportToExcel: React.FC<Props> = ({ data, columns, filters, user }) => {
    console.log("ExportToExcel -> data", filters);
    const handleExport = () => {
        const tagsKeys = filters.tags.map((tag: any) => tag.key).join(", ");
        const data1 = [
            [`USER: ${user.email}`],
            [`STATION: ${filters.device.name}`],
            [],
            [`DATA REPORT FOR: ${tagsKeys}`],
            [
                "FROM:",
                `${Utils.formateJsTime(
                    filters.dates[0].toDate(),
                    "yyyy-MM-dd HH:mm:ss"
                )}`,
            ],
            [
                "TO:",
                `${Utils.formateJsTime(
                    filters.dates[1].toDate(),
                    "yyyy-MM-dd HH:mm:ss"
                )}`,
            ],
        ];
        if (data.length === 0 || columns.length === 0) {
            return;
        }
        const wb = XLSX.utils.book_new();
        const ws_data = [];

        // Tạo header cho Excel file
        const headers = columns.map((col: any) => col.name);

        data1.forEach((item: any) => {
            ws_data.push(item);
        });
        ws_data.push(headers);

        // Thêm dữ liệu vào các dòng
        data.forEach((item: any) => {
            const row = columns.map((col: any) => item[col.key] || "");
            ws_data.push(row);
        });

        const ws = XLSX.utils.aoa_to_sheet(ws_data);
        ws["!cols"] = columns.map((col: any) => ({ wch: col.width || 15 })); // Giả sử mỗi cột có trường 'width' hoặc mặc định là 15

        XLSX.utils.book_append_sheet(wb, ws, "Data");

        // Tạo và tải xuống file Excel
        const fromDate = Utils.formateJsTime(
            filters.dates[0].toDate(),
            "yyyy-MM-dd"
        );
        const toDate = Utils.formateJsTime(
            filters.dates[1].toDate(),
            "yyyy-MM-dd"
        );

        // Tạo và tải xuống file Excel
        XLSX.writeFile(
            wb,
            `${filters.device.name}_from_${fromDate}_to_${toDate}.xlsx`
        );
    };

    return <Button onClick={handleExport}>Export to Excel</Button>;
};

export default ExportToExcel;
