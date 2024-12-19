// export default CreatePhieuThanhLy;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreatePhieuThanhLy = () => {
  const [lyDo, setLyDo] = useState("");
  const [phuongThucThanhLy, setPhuongThucThanhLy] = useState("");
  const [maNguoiDung, setMaNguoiDung] = useState("");
  const [hoaChats, setHoaChats] = useState([]);
  const [selectedHoaChat, setSelectedHoaChat] = useState(null);
  const [loHoaChats, setLoHoaChats] = useState([]);
  const [selectedLoHoaChat, setSelectedLoHoaChat] = useState(null);
  const [soLuong, setSoLuong] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetching the list of HoaChat (chemical items)
    const fetchHoaChats = async () => {
      try {
        const response = await axios.get("https://localhost:7240/api/Statistics/hoa-chat");
        setHoaChats(response.data);
      } catch (error) {
        console.error("Error fetching HoaChat:", error);
      }
    };

    fetchHoaChats();
  }, []);

  // Fetch LoHoaChats based on selected HoaChat
  useEffect(() => {
    if (selectedHoaChat) {
      const fetchLoHoaChats = async () => {
        try {
          const response = await axios.get(`https://localhost:7240/api/Statistics/lo-hoa-chat/${selectedHoaChat.MaHoaChat}`);
          setLoHoaChats(response.data);
        } catch (error) {
          console.error("Error fetching LoHoaChats:", error);
        }
      };

      fetchLoHoaChats();
    }
  }, [selectedHoaChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Create Phieu Thanh Ly (Liquidation Request)
      const phieuThanhLyResponse = await axios.post("https://localhost:7240/api/PhieuThanhLy", {
        LyDo: lyDo,
        PhuongThucThanhLy: phuongThucThanhLy,
        MaNguoiDung: maNguoiDung,
      });

      const phieuThanhLyId = phieuThanhLyResponse.data.MaPhieuTL;

      // Step 2: Add HoaChat (Chemical) and LoHoaChat (Chemical Lot) to the created Phieu Thanh Ly
      if (selectedHoaChat && selectedLoHoaChat) {
        const hoaChatResponse = await axios.post(
          `https://localhost:7240/api/PhieuThanhLy/${phieuThanhLyId}/add-hoachat`,
          {
            MaHoaChat: selectedHoaChat.MaHoaChat,
            SoLo: selectedLoHoaChat.SoLo,
            SoLuong: soLuong,
          }
        );
        setMessage(`Phiếu thanh lý và hóa chất đã được thêm thành công!`);
      }
    } catch (error) {
      console.error("Error creating Phieu Thanh Ly:", error);
      setMessage("Lỗi trong quá trình tạo phiếu thanh lý.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Tạo Phiếu Thanh Lý Hóa Chất</h2>

      {message && <p className="text-red-500 mb-4">{message}</p>}

      <form onSubmit={handleSubmit}>
        {/* Lý do thanh lý */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Lý Do Thanh Lý</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            value={lyDo}
            onChange={(e) => setLyDo(e.target.value)}
            required
          />
        </div>

        {/* Phương thức thanh lý */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phương Thức Thanh Lý</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            value={phuongThucThanhLy}
            onChange={(e) => setPhuongThucThanhLy(e.target.value)}
            required
          />
        </div>

        {/* Mã người dùng */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Mã Người Dùng</label>
          <input
            type="number"
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            value={maNguoiDung}
            onChange={(e) => setMaNguoiDung(e.target.value)}
            required
          />
        </div>

        {/* Chọn hóa chất */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Chọn Hóa Chất</label>
          <select
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            value={selectedHoaChat ? selectedHoaChat.MaHoaChat : ""}
            onChange={(e) => {
              const selected = hoaChats.find((h) => h.MaHoaChat === parseInt(e.target.value));
              setSelectedHoaChat(selected);
            }}
            required
          >
            <option value="" disabled>
              Chọn hóa chất
            </option>
            {hoaChats.map((hoaChat) => (
              <option key={hoaChat.MaHoaChat} value={hoaChat.MaHoaChat}>
                {hoaChat.TenHoaChat} (CAS: {hoaChat.SoCAS})
              </option>
            ))}
          </select>
        </div>

        {/* Chọn lô hóa chất */}
        {selectedHoaChat && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Chọn Lô Hóa Chất</label>
            <select
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              value={selectedLoHoaChat ? selectedLoHoaChat.SoLo : ""}
              onChange={(e) => {
                const selected = loHoaChats.find((lh) => lh.SoLo === e.target.value);
                setSelectedLoHoaChat(selected);
              }}
              required
            >
              <option value="" disabled>
                Chọn lô hóa chất
              </option>
              {loHoaChats.map((loHoaChat) => (
                <option key={loHoaChat.SoLo} value={loHoaChat.SoLo}>
                  Lô: {loHoaChat.SoLo}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Số lượng */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Số Lượng</label>
          <input
            type="number"
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            value={soLuong}
            onChange={(e) => setSoLuong(e.target.value)}
            min={1}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Đang tạo..." : "Tạo Phiếu Thanh Lý"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePhieuThanhLy;
