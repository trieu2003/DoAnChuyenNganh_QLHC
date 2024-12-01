// export default CreatePhieuThanhLyForm;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreatePhieuThanhLyForm = ({ onClose, onRefresh }) => {
  const [lyDo, setLyDo] = useState('Hủy hóa chất không còn sử dụng');  // Mặc định giá trị lý do
  const [phuongThucThanhLy, setPhuongThucThanhLy] = useState('Tiêu hủy');  // Mặc định giá trị phương thức thanh lý
  const [hoaChats, setHoaChats] = useState([]);  // Danh sách hóa chất chưa thanh lý
  const [selectedHoaChat, setSelectedHoaChat] = useState(null); // Hóa chất đã chọn
  const [loading, setLoading] = useState(false);

  // Lấy danh sách hóa chất từ API
  useEffect(() => {
    const fetchHoaChats = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://localhost:7240/api/PhieuThanhLy/hoa-chat-chua-thanh-ly');
        setHoaChats(response.data);  // Lưu danh sách hóa chất vào state
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách hóa chất:", error);
        alert('Không thể tải danh sách hóa chất');
        setLoading(false);
      }
    };
    fetchHoaChats();
  }, []);

  // Hàm xử lý chọn hóa chất từ combobox
  const handleHoaChatSelect = (e) => {
    const selectedHoaChat = hoaChats.find(hoaChat => hoaChat.maHoaChat === parseInt(e.target.value));
    setSelectedHoaChat(selectedHoaChat); // Lưu hóa chất đã chọn vào state
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedHoaChat) {
      alert("Bạn phải chọn một hóa chất.");
      return;
    }

    setLoading(true);

    const data = {
      phieuThanhLy: {
        LyDo: lyDo,
        PhuongThucThanhLy: phuongThucThanhLy,
        NgayTao: new Date().toISOString(), // Tạo thời gian hiện tại
        MaNguoiDung: localStorage.getItem('maNguoiDung'), // Giả sử bạn có mã người dùng, thay đổi theo hệ thống
      },
      soLoList: [selectedHoaChat.soLo], // Gửi danh sách số lô 
    };

    try {
      // Gửi request đến API để tạo phiếu thanh lý
      console.log(data);
      console.log(localStorage.getItem('maNguoiDung'));
      const response = await axios.post('https://localhost:7240/api/PhieuThanhLy/create-phieu-thanh-ly', data);
      alert(response.data.message || 'Phiếu thanh lý đã được tạo thành công');
      onRefresh();  // Làm mới dữ liệu ở parent component
      onClose();    // Đóng modal sau khi tạo thành công
    } catch (error) {
      console.error("Có lỗi khi tạo phiếu thanh lý:", error);
      alert('Có lỗi xảy ra khi tạo phiếu thanh lý');
    }

    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Tạo Phiếu Thanh Lý</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label htmlFor="lyDo" className="block text-lg font-medium">Lý Do Thanh Lý</label>
          <input
            id="lyDo"
            type="text"
            value={lyDo}
            onChange={(e) => setLyDo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            disabled // Không cho phép chỉnh sửa
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phuongThucThanhLy" className="block text-lg font-medium">Phương Thức Thanh Lý</label>
          <input
            id="phuongThucThanhLy"
            type="text"
            value={phuongThucThanhLy}
            onChange={(e) => setPhuongThucThanhLy(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            disabled // Không cho phép chỉnh sửa
          />
        </div>

        <div className="mb-4">
          <label htmlFor="hoaChat" className="block text-lg font-medium">Chọn Lô Hóa Chất</label>
          <select
            id="hoaChat"
            onChange={handleHoaChatSelect} // Sử dụng hàm xử lý khi chọn hóa chất
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Chọn lô hóa chất...</option>
            {hoaChats.length > 0 ? (
              hoaChats.map((hoaChat) => (
                <option key={hoaChat.soLo} value={hoaChat.maHoaChat}>
                  {hoaChat.tenHoaChat} - {hoaChat.soLo}  {/* Hiển thị tên hóa chất */}
                </option>
              ))
            ) : (
              <option>Không có hóa chất nào chưa thanh lý</option>
            )}
          </select>
        </div>

        <div className="mb-4 flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
            Hủy
          </button>
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded">
            {loading ? 'Đang tạo...' : 'Tạo Phiếu Thanh Lý'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePhieuThanhLyForm;
