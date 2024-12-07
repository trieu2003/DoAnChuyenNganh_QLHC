import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PhieuThanhLyDetail = ({ maPhieuTL, onClose }) => {
  const [phieu, setPhieu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy chi tiết phiếu thanh lý từ API
  useEffect(() => {
    const fetchPhieuDetail = async () => {
      try {
        const response = await axios.get(`https://localhost:7240/api/PhieuThanhLy/${maPhieuTL}`);
        setPhieu(response.data);
        setLoading(false);
      } catch (error) {
        setError('Không thể tải chi tiết phiếu thanh lý');
        setLoading(false);
      }
    };
    fetchPhieuDetail();
  }, [maPhieuTL]);

  if (loading) return <div className="text-center">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  if (!phieu) return null; // Nếu không có dữ liệu, không render

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-2xl font-bold mb-4">Chi Tiết Phiếu Thanh Lý</h2>
        <div className="mb-4">
          <p><strong>Mã Phiếu:</strong> {phieu.maPhieuTL}</p>
          <p><strong>Lý Do:</strong> {phieu.lyDo}</p>
          <p><strong>Trạng Thái:</strong> {phieu.trangThai}</p>
          <p><strong>Phương Thức Thanh Lý:</strong> {phieu.phuongThucThanhLy}</p>
          <p><strong>Ngày Tạo:</strong> {new Date(phieu.ngayTao).toLocaleDateString()}</p>
        </div>

        <h3 className="text-xl font-semibold mb-4">Danh Sách Hóa Chất</h3>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Người Yêu cầu thanh lý</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Mã lô hóa chất</th>
              <th className="px-4 py-2 border">Tên nhà Cung Cấp</th>
              <th className="px-4 py-2 border">Lô Trạng thái</th>
              <th className="px-4 py-2 border">Tên hóa chất</th>
              <th className="px-4 py-2 border">Số lô hóa chất</th>
              <th className="px-4 py-2 border">Trạng thái hóa chất</th>
              <th className="px-4 py-2 border">Số CAS hóa chất</th>
              <th className="px-4 py-2 border">Hạn Sử Dụng</th>
            </tr>
          </thead>
          <tbody>
            {phieu.hoaChatDetails && phieu.hoaChatDetails.length > 0 ? (
              phieu.hoaChatDetails.map((hoaChat, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{phieu.nguoiDung_TenDangNhap}</td>
                  <td className="px-4 py-2 border">{phieu.nguoiDung_Email}</td>
                  <td className="px-4 py-2 border">{hoaChat.maLo}</td>
                  <td className="px-4 py-2 border">{hoaChat.nhaCungCap}</td>
                  <td className="px-4 py-2 border">{hoaChat.loTrangThai}</td>
                  <td className="px-4 py-2 border">{hoaChat.tenHoaChat}</td>
                  <td className="px-4 py-2 border">{hoaChat.hoaChatSoLo}</td>
                  <td className="px-4 py-2 border">{hoaChat.trangThai}</td>
                  <td className="px-4 py-2 border">{hoaChat.hoaChatSoCAS}</td>
                  <td className="px-4 py-2 border">{new Date(hoaChat.hanSuDung).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="px-4 py-2 border text-center">Không có thông tin hóa chất</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default PhieuThanhLyDetail;
