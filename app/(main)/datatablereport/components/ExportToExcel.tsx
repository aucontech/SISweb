import * as XLSX from "xlsx";
import { Button } from "primereact/button";
import { co } from "@fullcalendar/core/internal-common";
interface Props {
    data: any[];
    columns: any[];
}

const ExportToExcel: React.FC<Props> = ({ data, columns }) => {
    const handleExport = () => {
        if (data.length === 0 || columns.length === 0) {
            return;
        }
        const wb = XLSX.utils.book_new();
        const ws_data = [];

        // Tạo header cho Excel file
        const headers = columns.map((col: any) => col.name);
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
        XLSX.writeFile(wb, "data.xlsx");
    };

    return <Button onClick={handleExport}>Export to Excel</Button>;
};

export default ExportToExcel;
