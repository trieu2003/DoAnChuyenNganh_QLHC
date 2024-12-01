import { useState, useEffect } from "react";
import axios from "axios";

const PurchaseRequest = () => {
  const maNguoiDung = parseInt(localStorage.getItem('maNguoiDung'), 10);// Chuyển giá trị thành số nguyên
  const [phieuDeXuat, setPhieuDeXuat] = useState({
    lyDo: "",
    trangThai: "Chờ duyệt",
    maNguoiDung: maNguoiDung,
  });

  const [chiTietDeXuat, setChiTietDeXuat] = useState([
    { maHoaChat: 0, soLuong: 1, donGia: 1000, tenHoaChat: "" },
  ]);

  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  // Thêm chi tiết đề xuất
  const handleAddDetail = () => {
    setChiTietDeXuat([
      ...chiTietDeXuat,
      { maHoaChat: 0, soLuong: 1, donGia: 1000, tenHoaChat: "" },
    ]);
  };

  // Xóa chi tiết đề xuất
  const handleRemoveDetail = (index) => {
    const updatedDetails = [...chiTietDeXuat];
    updatedDetails.splice(index, 1);
    setChiTietDeXuat(updatedDetails);
  };

  // Cập nhật thông tin chi tiết
  const handleChangeDetail = (index, field, value) => {
    const updatedDetails = [...chiTietDeXuat];
    updatedDetails[index][field] = value;
    setChiTietDeXuat(updatedDetails);
  };

  // Tìm kiếm hóa chất
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length >= 2) {
      try {
        const response = await axios.get(
          "https://localhost:7240/api/ChemicalManagement/Search",
          {
            params: { searchTerm: query },
          }
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error(
          "Lỗi khi tìm kiếm hóa chất:",
          error.response?.data || error.message
        );
      }
    } else {
      setSearchResults([]);
    }
  };

  // Chọn hóa chất từ kết quả tìm kiếm
  const handleSelectChemical = (index, chemical) => {
    const updatedDetails = [...chiTietDeXuat];
    updatedDetails[index].maHoaChat = chemical.maHoaChat;
    updatedDetails[index].tenHoaChat = chemical.tenHoaChat;

    setChiTietDeXuat(updatedDetails);
    setSearchResults([]); // Đóng danh sách kết quả tìm kiếm sau khi chọn
    setSearchQuery(''); // Clear text trong thanh tìm kiếm sau khi chọn hóa chất
  };

  // Gửi phiếu đề xuất
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Gửi phiếu đề xuất
      const phieuResponse = await axios.post(
        "https://localhost:7240/api/DeXuat/create",
        phieuDeXuat
      );
      const maPhieuDX = phieuResponse.data.maPhieuDX;

      // Gửi chi tiết đề xuất
      const updatedChiTietDeXuat = chiTietDeXuat.map((detail) => ({
        ...detail,
        maPhieuDX,
      }));
      await axios.post(
        "https://localhost:7240/api/DeXuat/create-details",
        updatedChiTietDeXuat
      );

      alert("Tạo phiếu đề xuất thành công!");
      setPhieuDeXuat({
        lyDo: "",
        trangThai: "Chờ duyệt",
        maNguoiDung: maNguoiDung,
      });
      setChiTietDeXuat([
        { maHoaChat: 0, soLuong: 0, donGia: 0, tenHoaChat: "" },
      ]);
    } catch (error) {
      console.error("Lỗi khi tạo phiếu đề xuất:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };
  return (
    
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Tạo Phiếu Đề Xuất Mua Hóa Chất
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="space-y-2">
          <label className="block font-medium">Lý Do</label>
          <textarea
            value={phieuDeXuat.lyDo}
            onChange={(e) =>
              setPhieuDeXuat({ ...phieuDeXuat, lyDo: e.target.value })
            }
            className="w-full border-2 border-gray-300 rounded-lg p-3"
            rows="3"
          />
        </div>

        <h2 className="text-2xl font-semibold">Chi Tiết Đề Xuất</h2>
        {chiTietDeXuat.map((detail, index) => (
          <div
            key={index}
            className="p-4 border-2 border-gray-200 rounded-lg space-y-4"
          >
            <div className="space-y-2">
              <label className="block font-medium">Tìm Kiếm Hóa Chất</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg p-3"
                  placeholder="Tìm hóa chất..."
                />
                {searchResults.length > 0 && (
                  <ul className="absolute left-0 right-0 mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {searchResults.map((chemical) => (
                      <li
                        key={chemical.maHoaChat}
                        className="p-3 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSelectChemical(index, chemical)}
                      >
                        {chemical.tenHoaChat}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-medium">Tên Hóa Chất</label>
              <input
                type="text"
                value={detail.tenHoaChat}
                readOnly
                className="w-full border-2 border-gray-300 rounded-lg p-3 bg-gray-100"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-medium">Số Lượng</label>
              {/* <input
                type="number"
                value={detail.soLuong}
                onChange={(e) =>
                  handleChangeDetail(index, "soLuong", e.target.value)
                }
                className="w-full border-2 border-gray-300 rounded-lg p-3"
                required
              /> */}
              <input
                type="number"
                value={detail.soLuong || 1}
                onChange={(e) => {
                  // Kiểm tra nếu giá trị nhập vào là số âm
                  const newValue = e.target.value;
                  if (newValue >= 0 || newValue === "") {
                    handleChangeDetail(index, "soLuong", newValue);
                  }
                }}
                className="w-full border-2 border-gray-300 rounded-lg p-3"
                required
                min="0" // Không cho phép giá trị nhỏ hơn 0
              />
            </div>

            <div className="space-y-2">
              <label className="block font-medium">Đơn Giá</label>
              <input
                type="number"
                step="1"
                value={detail.donGia }
                onChange={(e) => {
                  handleChangeDetail(index, "donGia", e.target.value)
                }}
                className="w-full border-2 border-gray-300 rounded-lg p-3"
                required
                min="1000" // Không cho phép giá trị nhỏ hơn 1000
              />
            </div>

            <button
              type="button"
              onClick={() => handleRemoveDetail(index)}
              className="bg-red-500 text-white px-6 py-2 rounded-lg mt-2"
            >
              Xóa
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddDetail}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg"
        >
          Thêm Chi Tiết
        </button>

        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-3 rounded-lg mt-6 w-full"
        >
          Tạo Phiếu Đề Xuất
        </button>
       
      </form>
    </div>
  );
};

export default PurchaseRequest;
