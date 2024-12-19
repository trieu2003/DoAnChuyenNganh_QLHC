import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HistoryTable from "../components/HistoryTable";

const HistoryPurchaseRequest = () => {
  const { maPhieuDX } = useParams();
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`https://localhost:7240/api/DeXuat/history/${maPhieuDX}`);
        if (!response.ok) {
          throw new Error("Không có lịch sử duyệt");
        }
        const data = await response.json();
        setHistoryData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [maPhieuDX]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const fields = [
    { name: "ngayDuyet", label: "Ngày Duyệt", render: (item) => new Date(item.ngayDuyet).toLocaleString() },
    { name: "trangThai", label: "Trạng Thái" },
    { name: "lyDoTuChoi", label: "Lý Do Từ Chối", render: (item) => item.lyDoTuChoi || "Không có", },
    { name: "nguoiDung.tenNguoiDung", label: "Người Duyệt", render: (item) => item.nguoiDung?.tenNguoiDung || "N/A", },
    { name: "nguoiDung.tenDangNhap", label: "Tên Đăng Nhập", render: (item) => item.nguoiDung?.tenDangNhap || "N/A" },
  ];

  return (
    <HistoryTable
      data={historyData}
      fields={fields}
      title={`Lịch sử duyệt - Mã Phiếu: ${maPhieuDX}`}
    />
  );
};

export default HistoryPurchaseRequest;
