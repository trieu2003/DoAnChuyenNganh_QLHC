import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DuyetPhieuThanhLyList = () => {
  const [duyetPhieuThanhLys, setDuyetPhieuThanhLys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm lấy danh sách duyệt phiếu thanh lý
  const fetchDuyetPhieuThanhLys = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://localhost:7240/api/DuyetPhieuTL/duyet-phieu-thanh-ly');
      setDuyetPhieuThanhLys(response.data);  // Lưu dữ liệu vào state
   
      setError(null);
    } catch (err) {
      setError('Không thể tải dữ liệu');
      
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi component mount
  useEffect(() => {
    fetchDuyetPhieuThanhLys();
  }, []); // []

  if (loading) return <div className="text-center">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Danh Sách Duyệt Phiếu Thanh Lý</h2>
      <table className="min-w-full table-auto mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Mã Phiếu</th>
            <th className="px-4 py-2 border">Ngày Duyệt</th>
            <th className="px-4 py-2 border">Trạng Thái</th>
            <th className="px-4 py-2 border">Lý Do Từ Chối</th>
          </tr>
        </thead>
        <tbody>
          {duyetPhieuThanhLys.map((duyet) => (
            console.log(duyet),
            <tr key={duyet.maLichSu} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{duyet.maPhieuTL}</td>
              <td className="px-4 py-2 border">{new Date(duyet.ngayDuyet).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">{duyet.trangThai}</td>
              <td className="px-4 py-2 border">{duyet.lyDoTuChoi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DuyetPhieuThanhLyList;