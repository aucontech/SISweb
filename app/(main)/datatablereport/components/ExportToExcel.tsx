import * as XLSX from "xlsx";

const ExportToExcel = ({ data, columns }) => {
    const handleExport = () => {
        const wb = XLSX.utils.book_new();
        const ws_data = [];

        // Tạo header cho Excel file
        const headers = columns.map((col) => col.name);
        ws_data.push(headers);

        // Thêm dữ liệu vào các dòng
        data.forEach((item) => {
            const row = columns.map((col) => item[col.key] || "");
            ws_data.push(row);
        });

        const ws = XLSX.utils.aoa_to_sheet(ws_data);
        ws["!cols"] = columns.map((col) => ({ wch: col.width || 15 })); // Giả sử mỗi cột có trường 'width' hoặc mặc định là 15

        XLSX.utils.book_append_sheet(wb, ws, "Data");

        // Tạo và tải xuống file Excel
        XLSX.writeFile(wb, "data.xlsx");
    };

    return <button onClick={handleExport}>Export to Excel</button>;
};

export default ExportToExcel;
