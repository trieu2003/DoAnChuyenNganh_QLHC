import React, { useState, useEffect } from "react";

const DeXuatForm = () => {
  const [soLuongDeXuat, setSoLuongDeXuat] = useState(0);
  const [lyDo, setLyDo] = useState("");
  const [trangThai, setTrangThai] = useState("Chờ duyệt");
  const [chiTietDeXuat, setChiTietDeXuat] = useState([]);
  const [newDetail, setNewDetail] = useState({
    maHoaChat: "",
    soLuong: "",
    donGia: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Cập nhật soLuongDeXuat khi chiTietDeXuat thay đổi
  useEffect(() => {
    const totalSoLuong = chiTietDeXuat.reduce(
      (sum, detail) => sum + Number(detail.soLuong),
      0
    );
    setSoLuongDeXuat(totalSoLuong);
  }, [chiTietDeXuat]);

  // Hàm xử lý khi người dùng tìm kiếm hóa chất
  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term.length > 2) {
      // Giả lập gọi API tìm kiếm hóa chất
      const results = await fetch(`/api/hoachat/search?query=${term}`)
        .then((res) => res.json())
        .catch((err) => console.error("Error fetching search results:", err));
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Hàm xử lý khi người dùng chọn hóa chất từ danh sách kết quả tìm kiếm
  const handleSelectHoaChat = (hoaChat) => {
    setNewDetail({ ...newDetail, maHoaChat: hoaChat.maHoaChat });
    setSearchResults([]); // Xóa kết quả tìm kiếm sau khi chọn
    setSearchTerm(hoaChat.tenHoaChat); // Hiển thị tên hóa chất đã chọn
  };

  // Thêm chi tiết đề xuất vào danh sách
  const handleAddDetail = () => {
    if (newDetail.maHoaChat && newDetail.soLuong && newDetail.donGia) {
      setChiTietDeXuat([...chiTietDeXuat, newDetail]);
      setNewDetail({ maHoaChat: "", soLuong: "", donGia: "" }); // Reset form chi tiết
    }
  };

  // Hàm xử lý gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Gọi API lưu phiếu đề xuất và các chi tiết
    const newDeXuat = {
      soLuongDeXuat,
      lyDo,
      trangThai,
      chiTietDeXuat,
    };
    await fetch("/api/phieu-dexuat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDeXuat),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Phiếu đề xuất đã được tạo:", data);
        // Reset form
        setLyDo("");
        setTrangThai("Chờ duyệt");
        setChiTietDeXuat([]);
      })
      .catch((err) => console.error("Error submitting form:", err));
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Tạo Phiếu Đề Xuất</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Số Lượng Đề Xuất</label>
          <input
            type="number"
            value={soLuongDeXuat}
            readOnly
            className="w-full p-2 border rounded bg-gray-100 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Lý Do</label>
          <textarea
            value={lyDo}
            onChange={(e) => setLyDo(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Trạng Thái</label>
          <input
            type="text"
            value="Chờ duyệt"
            readOnly
            className="w-full p-2 border rounded bg-gray-100 focus:outline-none"
          />
        </div>

        {/* Nhập chi tiết đề xuất với tìm kiếm hóa chất */}
        <h3 className="text-xl font-semibold mb-4">Thêm Chi Tiết Đề Xuất</h3>
        <div className="mb-4">
          <label className="block mb-2">Tìm Kiếm Hóa Chất</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            placeholder="Nhập tên hóa chất..."
          />
          {/* Hiển thị danh sách kết quả tìm kiếm */}
          {searchResults.length > 0 && (
            <ul className="border mt-2 max-h-40 overflow-auto">
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectHoaChat(result)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {result.tenHoaChat} (SoCAS: {result.soCAS})
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block mb-2">Mã Hóa Chất</label>
            <input
              type="text"
              value={newDetail.maHoaChat}
              onChange={(e) =>
                setNewDetail({ ...newDetail, maHoaChat: e.target.value })
              }
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
              readOnly
            />
          </div>
          <div>
            <label className="block mb-2">Số Lượng</label>
            <input
              type="number"
              value={newDetail.soLuong}
              onChange={(e) =>
                setNewDetail({ ...newDetail, soLuong: e.target.value })
              }
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Đơn Giá</label>
            <input
              type="number"
              value={newDetail.donGia}
              onChange={(e) =>
                setNewDetail({ ...newDetail, donGia: e.target.value })
              }
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleAddDetail}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors mb-6"
        >
          Thêm Chi Tiết
        </button>

        {/* Hiển thị danh sách chi tiết đã thêm */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2">Chi Tiết Đã Thêm:</h4>
          <ul>
            {chiTietDeXuat.map((detail, index) => (
              <li key={index} className="border p-2 rounded mb-2">
                Mã Hóa Chất: {detail.maHoaChat}, Số Lượng: {detail.soLuong}, Đơn
                Giá: {detail.donGia}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Tạo Phiếu Đề Xuất
        </button>
      </form>
    </div>
  );
};

export default DeXuatForm;
