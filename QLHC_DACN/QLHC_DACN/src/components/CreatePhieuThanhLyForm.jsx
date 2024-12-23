
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreatePhieuThanhLyForm = ({ onClose, onRefresh }) => {
  const [lyDo, setLyDo] = useState([]);
  const [phuongThucThanhLy, setPhuongThucThanhLy] = useState([]);
  const [hoaChats, setHoaChats] = useState([]);
  const [sapHetHanHoaChats, setSapHetHanHoaChats] = useState([]); // Chemicals nearing expiration
  const [soNgayCanhBao, setSoNgayCanhBao] = useState(30); // Days for warning
  const [selectedHoaChats, setSelectedHoaChats] = useState([]); // Danh sách các hóa chất đã chọn
  const [loading, setLoading] = useState(false);

   // Fetch list of chemicals available for disposal
   useEffect(() => {
    const fetchHoaChats = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'https://localhost:7240/api/PhieuThanhLy/hoa-chat-chua-thanh-ly'
        );
        setHoaChats(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching chemicals:', err);
        setError('Không thể tải danh sách hóa chất');
        setLoading(false);
      }
    };

    const fetchSapHetHanHoaChats = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7240/api/Statistics/hoa-chat-sap-het-han?soNgayCanhBao=${soNgayCanhBao}`
        );
        setSapHetHanHoaChats(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching expiring chemicals:', err);
        setError('Không thể tải danh sách hóa chất sắp hết hạn');
      }
    };

    fetchHoaChats();
    fetchSapHetHanHoaChats();
  }, [soNgayCanhBao]);

  // Hàm xử lý khi chọn hóa chất từ combobox
  const handleHoaChatSelect = (e) => {
    const selectedHoaChat = hoaChats.find(hoaChat => hoaChat.maHoaChat === parseInt(e.target.value));
    if (selectedHoaChat && !selectedHoaChats.includes(selectedHoaChat)) {
      setSelectedHoaChats([...selectedHoaChats, selectedHoaChat]); // Thêm hóa chất vào danh sách đã chọn
    }
    e.target.value = ''; // Reset giá trị combobox sau khi chọn
  };

  // Xóa một lô hóa chất khỏi danh sách đã chọn
  const handleRemoveHoaChat = (maHoaChat) => {
    setSelectedHoaChats(selectedHoaChats.filter(hoaChat => hoaChat.maHoaChat !== maHoaChat));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (selectedHoaChats.length === 0) {
      alert("Bạn phải chọn ít nhất một lô hóa chất.");
      return;
    }
  
    setLoading(true);
  
    const data = {
      phieuThanhLy: {
        LyDo: lyDo,
        PhuongThucThanhLy: phuongThucThanhLy,
        NgayTao: new Date().toISOString(),
        MaNguoiDung: localStorage.getItem('maNguoiDung'),
      },
      soLoList: selectedHoaChats.map(hc => hc.soLo), // Gửi danh sách số lô đã chọn
    };
  
    try {
      const response = await axios.post('https://localhost:7240/api/PhieuThanhLy/create-phieu-thanh-ly', data);
      alert(response.data.message || 'Phiếu thanh lý đã được tạo thành công');
  
      // Làm mới toàn bộ trang sau khi tạo phiếu
      window.location.reload();
    } catch (error) {
      console.log(data);
      console.error("Có lỗi khi tạo phiếu thanh lý:", error);
      alert("Có lỗi khi tạo phiếu thanh lý. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Tạo Phiếu Thanh Lý</h2>
         {/* Display expiring chemicals */}
         <div className="mb-4">
  <h3 className="text-lg font-medium mb-2">
    Danh Sách Hóa Chất Sắp Hết Hạn (trong {soNgayCanhBao} ngày)
  </h3>
  <table className="min-w-full table-auto mt-4">
    <thead>
      <tr className="bg-gray-200">
        <th className="px-4 py-2">Tên Hóa Chất</th>
        <th className="px-4 py-2">Mã CAS</th>
        <th className="px-4 py-2">Mã Lô</th>
        <th className="px-4 py-2">Hạn Sử Dụng</th>
        <th className="px-4 py-2">Số Ngày Còn Lại</th>
        <th className="px-4 py-2">Số Lượng Tồn</th>
      </tr>
    </thead>
    <tbody>
      {sapHetHanHoaChats.map((hoaChat) => (
        <tr key={hoaChat.maLo}>
          <td className="px-4 py-2">{hoaChat.hoaChat}</td>
          <td className="px-4 py-2">{hoaChat.maCAS}</td>
          <td className="px-4 py-2">{hoaChat.maLo}</td>
          <td className="px-4 py-2">{new Date(hoaChat.hanSuDung).toLocaleDateString()}</td>
          <td className="px-4 py-2">{hoaChat.soNgayConLai}</td>
          <td className="px-4 py-2">{hoaChat.soLuongTon}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4">
  <label htmlFor="lyDo" className="block text-lg font-medium">Lý Do Thanh Lý</label>
  <input
    id="lyDo"
    type="text"
    value={lyDo}
    onChange={(e) => setLyDo(e.target.value)} // Cập nhật state
    className="w-full p-2 border border-gray-300 rounded"
  />
</div>

<div className="mb-4">
  <label htmlFor="phuongThucThanhLy" className="block text-lg font-medium">Phương Thức Thanh Lý</label>
  <input
    id="phuongThucThanhLy"
    type="text"
    value={phuongThucThanhLy}
    onChange={(e) => setPhuongThucThanhLy(e.target.value)} // Cập nhật state
    className="w-full p-2 border border-gray-300 rounded"
  />
</div>


        <div className="mb-4">
          <label htmlFor="hoaChat" className="block text-lg font-medium">Chọn Lô Hóa Chất</label>
          <select
            id="hoaChat"
            onChange={handleHoaChatSelect}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Chọn lô hóa chất...</option>
            {hoaChats.map((hoaChat) => (
              <option key={hoaChat.soLo} value={hoaChat.maHoaChat}>
                {hoaChat.tenHoaChat} - {hoaChat.soLo}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Danh Sách Lô Hóa Chất Đã Chọn</h3>
          {selectedHoaChats.length > 0 ? (
            <ul className="list-disc pl-5">
              {selectedHoaChats.map((hoaChat) => (
                <li key={hoaChat.maHoaChat} className="flex justify-between items-center">
                  <span>
                    {hoaChat.tenHoaChat} - {hoaChat.soLo}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveHoaChat(hoaChat.maHoaChat)}
                    className="text-red-600 hover:underline"
                  >
                    Xóa
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Chưa có lô hóa chất nào được chọn.</p>
          )}
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
