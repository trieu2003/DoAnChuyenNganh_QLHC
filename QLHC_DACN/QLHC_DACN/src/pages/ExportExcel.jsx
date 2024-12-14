
import React from "react";
import ExcelJS from "exceljs";
import axios from "axios";

const ExportExcel = () => {
    const handleExport = async () => {
        try {
            // Gọi các API đồng thời
            const [phieuThanhLyRes, loHoaChatRes, hoaChatRes, totalPhieuRes] = await Promise.all([
                axios.get("https://localhost:7240/api/Statistics/phieu-thanh-ly-statistics"),
                axios.get("https://localhost:7240/api/Statistics/lo-hoa-chat-statistics"),
                axios.get("https://localhost:7240/api/Statistics/hoa-chat-statistics"),
                axios.get("https://localhost:7240/api/Statistics/total-phieu-thanh-ly"),
            ]);

            // Lấy dữ liệu từ các API
            const phieuThanhLyData = phieuThanhLyRes.data || [];
            const loHoaChatData = loHoaChatRes.data || [];
            const hoaChatData = hoaChatRes.data || [];
            const totalPhieuData = totalPhieuRes.data || 0; // Tổng số phiếu

            // Kiểm tra dữ liệu trước khi xuất Excel
            if (!phieuThanhLyData.length && !loHoaChatData.length && !hoaChatData.length && !totalPhieuData) {
                alert("Không có dữ liệu để xuất Excel!");
                return;
            }

            // Tạo workbook và worksheet
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Thống kê tổng hợp");

            // Tiêu đề chính
            worksheet.mergeCells("A1:L1");
            const titleCell = worksheet.getCell("A1");
            titleCell.value = "Thống kê tổng hợp từ nhiều API";
            titleCell.font = { size: 20, bold: true, color: { argb: "FFFFFFFF" } };
            titleCell.alignment = { vertical: "middle", horizontal: "center" };
            titleCell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FF4CAF50" }, // Màu xanh đậm
            };

            let currentRow = 3; // Dòng bắt đầu
            let currentColumn = 1; // Cột bắt đầu

            // 1. Tổng số phiếu thanh lý
            worksheet.getCell(currentRow, currentColumn).value = "Tổng số phiếu thanh lý";
            worksheet.getCell(currentRow, currentColumn).font = { bold: true, size: 14 };
            worksheet.getCell(currentRow, currentColumn + 1).value = totalPhieuData;
            worksheet.getCell(currentRow, currentColumn + 1).font = { bold: true, size: 14 };
            currentRow += 2;

            // 2. Dữ liệu Phiếu Thanh Lý
            worksheet.getCell(currentRow, currentColumn).value = "Phiếu Thanh Lý";
            worksheet.getCell(currentRow, currentColumn).font = { bold: true, size: 16 };
            worksheet.getCell(currentRow, currentColumn).fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFFFC107" }, // Màu vàng
            };
            currentRow++;

            // Thêm header
            worksheet.getRow(currentRow).values = ["Trạng Thái", "Tổng Số Phiếu", "Tổng Số Lượng"];
            worksheet.getRow(currentRow).font = { bold: true };
            worksheet.getRow(currentRow).alignment = { horizontal: "center" };
            worksheet.getRow(currentRow).eachCell((cell) => {
                cell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                };
            });
            currentRow++;

            phieuThanhLyData.forEach((item) => {
                worksheet.addRow([item.trangThai, item.totalCount, item.totalQuantity]).eachCell((cell) => {
                    cell.border = {
                        top: { style: "thin" },
                        left: { style: "thin" },
                        bottom: { style: "thin" },
                        right: { style: "thin" },
                    };
                });
            });

            currentRow += phieuThanhLyData.length + 2;

            // 3. Dữ liệu Lô Hóa Chất
            worksheet.getCell(currentRow, currentColumn).value = "Lô Hóa Chất";
            worksheet.getCell(currentRow, currentColumn).font = { bold: true, size: 16 };
            worksheet.getCell(currentRow, currentColumn).fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFF06292" }, // Màu hồng
            };
            currentRow++;

            // Thêm header
            // Add data rows
            worksheet.getRow(currentRow).values = ["Trạng Thái", "Tổng Số Lô", "Tổng Số Lượng"];
            worksheet.getRow(currentRow).font = { bold: true };
            worksheet.getRow(currentRow).alignment = { horizontal: "center" };
            worksheet.getRow(currentRow).eachCell((cell) => {
                cell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                };
            });
            currentRow++;

            // 3. Data for Lô Hóa Chất
            loHoaChatData.forEach((item) => {
                worksheet.addRow([item.trangThai, item.totalCount, item.totalQuantity]).eachCell((cell) => {
                    cell.border = {
                        top: { style: "thin" },
                        left: { style: "thin" },
                        bottom: { style: "thin" },
                fgColor: { argb: "FFF06292" }, // Pink color
                        right: { style: "thin" },
                    };
                });
            });
            // Add header

            currentRow += loHoaChatData.length + 2;

            // 4. Dữ liệu Hóa Chất
            worksheet.getCell(currentRow, currentColumn).value = "Hóa Chất";
            worksheet.getCell(currentRow, currentColumn).font = { bold: true, size: 16 };
            worksheet.getCell(currentRow, currentColumn).fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FF9FA8DA" }, // Màu tím
            };
            currentRow++;

            // Thêm header
            // Add data rows
            worksheet.getRow(currentRow).values = ["Mã Hóa Chất", "Tên Hóa Chất", "Tổng Số Lượng"];
            worksheet.getRow(currentRow).font = { bold: true };
            worksheet.getRow(currentRow).alignment = { horizontal: "center" };
            worksheet.getRow(currentRow).eachCell((cell) => {
                cell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                };
            });
            currentRow++;

            // 4. Data for Hóa Chất
            hoaChatData.forEach((item) => {
                worksheet.addRow([item.maHoaChat, item.tenHoaChat, item.totalQuantity]).eachCell((cell) => {
                    cell.border = {
                        top: { style: "thin" },
                        left: { style: "thin" },
                        bottom: { style: "thin" },
                fgColor: { argb: "FF9FA8DA" }, // Purple color
                        right: { style: "thin" },
                    };
                });
            });
            // Add header

            // Auto-fit cột
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

    return <button onClick={handleExport} className="hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Tạo Excel Tổng Hợp</button>;
};

export default ExportExcel;
