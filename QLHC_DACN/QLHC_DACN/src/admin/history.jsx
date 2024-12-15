import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const HistoryPurchaseRequest = () => {
  const { maPhieuDX } = useParams(); // Lấy mã phiếu từ URL
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gọi API để lấy dữ liệu lịch sử duyệt
    const fetchHistory = async () => {
      try {
        const response = await fetch(`https://localhost:7240/api/DeXuat/history/${maPhieuDX}`);
        if (!response.ok) {
          throw new Error("Failed to fetch history data");
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lịch sử duyệt - Mã Phiếu: {maPhieuDX}</h1>
      {historyData ? (
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Ngày Duyệt</th>
              <th className="border px-4 py-2">Trạng Thái</th>
              <th className="border px-4 py-2">Lý Do Từ Chối</th>
              <th className="border px-4 py-2">Người Duyệt</th>
              <th className="border px-4 py-2">Tên Đăng Nhập</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{new Date(item.ngayDuyet).toLocaleString()}</td>
                <td className="border px-4 py-2">{item.trangThai}</td>
                <td className="border px-4 py-2">{item.lyDoTuChoi || "N/A"}</td>
                <td className="border px-4 py-2">{item.nguoiDung.tenNguoiDung}</td>
                <td className="border px-4 py-2">{item.nguoiDung.tenDangNhap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Không có dữ liệu lịch sử duyệt.</p>
      )}
    </div>
  );
};

export default HistoryPurchaseRequest;
