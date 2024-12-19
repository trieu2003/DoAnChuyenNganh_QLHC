// export default PhieuThanhLyList;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalPhieuThanhLy from './ModalPhieuThanhLy'; // Import Modal hiển thị chi tiết phiếu thanh lý

const PhieuThanhLyList = () => {
  const [phieuThanhLys, setPhieuThanhLys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhieu, setSelectedPhieu] = useState(null); // Lưu phiếu được chọn để hiển thị chi tiết
  const [processed, setProcessed] = useState(new Set()); // Lưu trữ các mã phiếu đã được xử lý

  // Hàm lấy dữ liệu phiếu thanh lý
  const fetchPhieuThanhLys = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://localhost:7240/api/PhieuThanhLy');
      setPhieuThanhLys(response.data);
      setError(null);
    } catch (err) {
      setError('Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhieuThanhLys();
  }, []);

  // Xử lý hành động duyệt phiếu
  const handleDuyet = async (maPhieuTL) => {
    const phieu = phieuThanhLys.find((p) => p.maPhieuTL === maPhieuTL);
    if (phieu.trangThai !== 'Chờ duyệt') {
      alert('Phiếu thanh lý này đã được xử lý.');
      return;
    }

    const confirmDuyet = window.confirm(
      'Bạn có chắc chắn muốn duyệt phiếu thanh lý này? Hành động này không thể hoàn tác.'
    );
    if (!confirmDuyet) return;

    try {
      await axios.put(`https://localhost:7240/api/PhieuThanhLy/accept/${maPhieuTL}`);
      alert('Đã duyệt phiếu thanh lý');
      setProcessed((prev) => new Set([...prev, maPhieuTL])); // Đánh dấu phiếu đã được duyệt
      fetchPhieuThanhLys(); // Gọi lại API để cập nhật danh sách
    } catch (err) {
      alert('Không thể duyệt phiếu thanh lý');
    }
  };
  const handleTuChoi = async (maPhieuTL) => {
    const lyDoTuChoi = prompt('Vui lòng nhập lý do từ chối:');
    if (!lyDoTuChoi || lyDoTuChoi.trim() === '') {
      alert('Lý do từ chối không được để trống.');
      return;
    }
  
    const confirmTuChoi = window.confirm(
      'Bạn có chắc chắn muốn từ chối phiếu thanh lý này? Phiếu sẽ bị xóa khỏi hệ thống.'
    );
    if (!confirmTuChoi) return;
  
    try {
      console.log('URL:', `https://localhost:7240/api/PhieuThanhLy/reject/${maPhieuTL}`);
      console.log('Payload:', JSON.stringify({ lyDoTuChoi }));
    
      const response = await  axios.put(
        `https://localhost:7240/api/PhieuThanhLy/reject/${maPhieuTL}`,
        JSON.stringify(lyDoTuChoi), // Chỉ gửi chuỗi, không phải object
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
     
    
      console.log('Phản hồi từ API:', response.data);
      alert('Đã từ chối phiếu thanh lý');
    } catch (err) {
      console.error('Chi tiết lỗi:', err.response?.data || err);
      alert(`Lỗi khi từ chối phiếu thanh lý: ${err.response?.data?.message || err.message}`);
    }
    
  };
  
  

  if (loading) return <div className="text-center">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Danh Sách Phiếu Thanh Lý</h2>
      <table className="min-w-full table-auto mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Mã Phiếu</th>
            <th className="px-4 py-2 border">Lý Do</th>
            <th className="px-4 py-2 border">Trạng Thái</th>
            <th className="px-4 py-2 border">Phương Thức Thanh Lý</th>
            <th className="px-4 py-2 border">Ngày Tạo</th>
            <th className="px-4 py-2 border">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {phieuThanhLys.map((phieu) => (
            <tr key={phieu.maPhieuTL} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{phieu.maPhieuTL}</td>
              <td className="px-4 py-2 border">{phieu.lyDo}</td>
              <td className="px-4 py-2 border">{phieu.trangThai}</td>
              <td className="px-4 py-2 border">{phieu.phuongThucThanhLy}</td>
              <td className="px-4 py-2 border">
                {new Date(phieu.ngayTao).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => setSelectedPhieu(phieu.maPhieuTL)} // Cập nhật mã phiếu khi nhấn "Xem Chi Tiết"
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Xem Chi Tiết
                </button>
                <button
                  onClick={() => handleDuyet(phieu.maPhieuTL)}
                  className={`px-4 py-2 rounded mr-2 ${
                    processed.has(phieu.maPhieuTL) || phieu.trangThai !== 'Chờ duyệt'
                      ? 'bg-gray-300 text-gray-500 line-through cursor-not-allowed'
                      : 'bg-green-500 text-white'
                  }`}
                  disabled={processed.has(phieu.maPhieuTL) || phieu.trangThai !== 'Chờ duyệt'}
                >
                  Duyệt
                </button>
                <button
                  onClick={() => handleTuChoi(phieu.maPhieuTL)}
                  className={`px-4 py-2 rounded ${
                    processed.has(phieu.maPhieuTL) || phieu.trangThai !== 'Chờ duyệt'
                      ? 'bg-gray-300 text-gray-500 line-through cursor-not-allowed'
                      : 'bg-red-500 text-white'
                  }`}
                  disabled={processed.has(phieu.maPhieuTL) || phieu.trangThai !== 'Chờ duyệt'}
                >
                  Từ Chối
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Hiển thị Modal chi tiết nếu cần */}
      {selectedPhieu && (
        <ModalPhieuThanhLy
          maPhieuTL={selectedPhieu} // Truyền mã phiếu vào Modal
          onClose={() => setSelectedPhieu(null)} // Đóng modal khi không cần xem nữa
          onDuyet={handleDuyet}
          onTuChoi={handleTuChoi}
        />
      )}
    </div>
  );
};

export default PhieuThanhLyList;
