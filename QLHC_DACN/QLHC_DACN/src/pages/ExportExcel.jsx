import React from "react";
import ExcelJS from "exceljs";
import axios from "axios";

const ExportExcel = () => {
    const handleExport = async () => {
        try {
            // Gọi các API đồng thời
            const [phieuThanhLyRes, loHoaChatRes, hoaChatRes, hoaChatTonKhoRes] = await Promise.all([
                axios.get("https://localhost:7240/api/Statistics/phieu-thanh-ly-statistics"),
                axios.get("https://localhost:7240/api/Statistics/lo-hoa-chat-statistics"),
                axios.get("https://localhost:7240/api/Statistics/hoa-chat-statistics"),
                axios.get("https://localhost:7240/api/Statistics/hoa-chat-ton-kho"),
            ]);

            // Lấy dữ liệu từ các API
            const phieuThanhLyData = phieuThanhLyRes.data || [];
            const loHoaChatData = loHoaChatRes.data || [];
            const hoaChatData = hoaChatRes.data || [];
            const hoaChatTonKhoData = hoaChatTonKhoRes.data || [];

            // Tạo workbook và worksheet
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Thống kê tổng hợp");

            let currentRow = 1;

            const addSection = (title, headers, data, getRowValues) => {
                // Thêm tiêu đề cho mỗi phần
                worksheet.mergeCells(`A${currentRow}:E${currentRow}`);
                const titleCell = worksheet.getCell(`A${currentRow}`);
                titleCell.value = title;
                titleCell.font = { size: 14, bold: true, color: { argb: "FFFFFFFF" } };
                titleCell.alignment = { horizontal: "center", vertical: "middle" };
                titleCell.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FF2196F3" }, // Màu xanh
                };
                currentRow += 1;

                // Thêm header
                worksheet.getRow(currentRow).values = headers;
                worksheet.getRow(currentRow).font = { bold: true };
                worksheet.getRow(currentRow).alignment = { horizontal: "center" };
                worksheet.getRow(currentRow).eachCell((cell) => {
                    cell.border = { top: { style: "thin" }, bottom: { style: "thin" } };
                });
                currentRow += 1;

                // Thêm data
                data.forEach((item) => {
                    worksheet.addRow(getRowValues(item)).eachCell((cell) => {
                        cell.border = { top: { style: "thin" }, bottom: { style: "thin" } };
                    });
                    currentRow += 1;
                });

                // Chừa một dòng trống giữa các phần
                currentRow += 1;
            };

            // Thêm dữ liệu từng phần
            addSection(
                "Phiếu Thanh Lý",
                ["Trạng Thái", "Tổng Số Phiếu", "Tổng Số Lượng"],
                phieuThanhLyData,
                (item) => [item.trangThai, item.totalCount, item.totalQuantity]
            );

            addSection(
                "Lô Hóa Chất",
                ["Trạng Thái", "Tổng Số Lô", "Tổng Số Lượng"],
                loHoaChatData,
                (item) => [item.trangThai, item.totalCount, item.totalQuantity]
            );

            addSection(
                "Hóa Chất",
                ["Mã Hóa Chất", "Tên Hóa Chất", "Tổng Số Lượng"],
                hoaChatData,
                (item) => [item.maHoaChat, item.tenHoaChat, item.totalQuantity]
            );

            addSection(
                "Hóa Chất Tồn Kho",
                ["Hóa Chất", "Mã CAS", "Tổng Số Lượng Tồn", "Số Lô"],
                hoaChatTonKhoData,
                (item) => [item.hoaChat, item.maCAS, item.tongSoLuongTon, item.soLoHoaChat]
            );

            // Auto-fit các cột
            worksheet.columns.forEach((column) => {
                column.width = 20;
            });

            // Xuất file Excel
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "ThongKeTongHop.xlsx";
            link.click();
        } catch (error) {
            console.error("Lỗi khi xuất Excel:", error);
            alert("Không thể xuất Excel! Vui lòng kiểm tra lại.");
        }
    };

    return (
        <button
            onClick={handleExport}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
            Tạo Excel Tổng Hợp
        </button>
    );
};

export default ExportExcel;
