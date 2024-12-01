import { useState } from "react";
import axios from "axios";

const PurchaseRequest_Add = () => {
  const maNguoiDung = parseInt(localStorage.getItem("maNguoiDung"), 10);
  const [phieuDeXuat, setPhieuDeXuat] = useState({
    lyDo: "",
    trangThai: "Chờ duyệt",
    maNguoiDung: maNguoiDung,
  });

  const [chiTietDeXuat, setChiTietDeXuat] = useState([
    {
      maHoaChat: 0,
      soLuong: 1,
      donGia: 1000,
      tenHoaChat: "",
      searchQuery: "",
      searchResults: [],
    },
  ]);

  const handleAddDetail = () => {
    setChiTietDeXuat([
      ...chiTietDeXuat,
      {
        maHoaChat: 0,
        soLuong: 1,
        donGia: 1000,
        tenHoaChat: "",
        searchQuery: "",
        searchResults: [],
      },
    ]);
  };

  const handleRemoveDetail = (index) => {
    const updatedDetails = [...chiTietDeXuat];
    updatedDetails.splice(index, 1);
    setChiTietDeXuat(updatedDetails);
  };

  const handleChangeDetail = (index, field, value) => {
    const updatedDetails = [...chiTietDeXuat];
    updatedDetails[index][field] = value;
    setChiTietDeXuat(updatedDetails);
  };

  const handleSearch = async (index, query) => {
    const updatedDetails = [...chiTietDeXuat];
    updatedDetails[index].searchQuery = query;

    if (query.length >= 2) {
      try {
        const response = await axios.get(
          "https://localhost:7240/api/ChemicalManagement/Search",
          {
            params: { searchTerm: query },
          }
        );
        updatedDetails[index].searchResults = response.data;
        setChiTietDeXuat(updatedDetails);
      } catch (error) {
        console.error(
          "Lỗi khi tìm kiếm hóa chất:",
          error.response?.data || error.message
        );
      }
    } else {
      updatedDetails[index].searchResults = [];
      setChiTietDeXuat(updatedDetails);
    }
  };

  const handleSelectChemical = (index, chemical) => {
    const updatedDetails = [...chiTietDeXuat];
    updatedDetails[index].maHoaChat = chemical.maHoaChat;
    updatedDetails[index].tenHoaChat = chemical.tenHoaChat;
    updatedDetails[index].donViTinh = chemical.donVi;
    updatedDetails[index].searchResults = [];
    updatedDetails[index].searchQuery = "";
    setChiTietDeXuat(updatedDetails);
  };

  const validateForm = () => {
    if (!phieuDeXuat.lyDo.trim()) {
      alert("Lý do không được để trống!");
      return false;
    }

    for (const detail of chiTietDeXuat) {
      if (!detail.tenHoaChat.trim()) {
        alert("Tên hóa chất không được để trống!");
        return false;
      }
      if (detail.soLuong <= 0) {
        alert("Số lượng phải lớn hơn 0!");
        return false;
      }
      if (detail.donGia <= 1000) {
        alert("Đơn giá phải lớn hơn hoặc bằng 1000!");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const phieuResponse = await axios.post(
        "https://localhost:7240/api/DeXuat/create",
        phieuDeXuat
      );
      const maPhieuDX = phieuResponse.data.maPhieuDX;

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
        {
          maHoaChat: 0,
          soLuong: 1,
          donGia: 1000,
          tenHoaChat: "",
          searchQuery: "",
          searchResults: [],
        },
      ]);
    } catch (error) {
      console.error("Lỗi khi tạo phiếu đề xuất:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Tạo Phiếu Đề Xuất Mua Hóa Chất
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Lý Do */}
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

        {/* Chi Tiết Đề Xuất */}
        <h2 className="text-2xl font-semibold mb-4">Chi Tiết Đề Xuất</h2>

        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Tìm Kiếm Hóa Chất</th>
              <th className="border border-gray-300 p-2">Tên Hóa Chất</th>
              <th className="border border-gray-300 p-2">Số Lượng</th>
              <th className="border border-gray-300 p-2">Đơn Giá</th>
              <th className="border border-gray-300 p-2">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {chiTietDeXuat.map((detail, index) => (
              <tr key={index}>
                {/* Tìm Kiếm Hóa Chất */}
                <td className="border border-gray-300 p-2 relative">
                  <input
                    type="text"
                    value={detail.searchQuery}
                    onChange={(e) => handleSearch(index, e.target.value)}
                    placeholder="Tìm kiếm hóa chất..."
                    className="w-full border-gray-300 p-2 rounded"
                  />
                  {detail.searchResults.length > 0 && (
                    <ul className="absolute left-0 right-0 bg-white border rounded shadow max-h-40 overflow-y-auto z-10">
                      {detail.searchResults.map((chemical) => (
                        <li
                          key={chemical.maHoaChat}
                          className="p-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSelectChemical(index, chemical)}
                        >
                          {chemical.tenHoaChat}
                        </li>
                      ))}
                    </ul>
                  )}
                </td>

                {/* Tên Hóa Chất */}
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    value={detail.tenHoaChat}
                    readOnly
                    className="w-full border-gray-300 p-2 rounded bg-gray-100"
                  />
                </td>

                {/* Số Lượng */}
                <td className="border border-gray-300 p-2 flex items-center">
                  <input
                    type="number"
                    value={detail.soLuong || 1}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (newValue >= 0 || newValue === "") {
                        handleChangeDetail(index, "soLuong", newValue);
                      }
                    }}
                    className="w-full border-gray-300 p-2 rounded"
                    min="0"
                    required
                  />
                  {/* Hiển thị Đơn Vị */}
                  {detail.donViTinh && (
                    <span className="ml-2 text-gray-600">{detail.donViTinh}</span>
                  )}
                </td>

                {/* Đơn Giá */}
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    step="1"
                    value={detail.donGia}
                    onChange={(e) =>
                      handleChangeDetail(index, "donGia", e.target.value)
                    }
                    className="w-full border-gray-300 p-2 rounded"
                    min="1000"
                    required
                  />
                </td>

                {/* Hành Động */}
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    type="button"
                    onClick={() => handleRemoveDetail(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-6">
          {/* Nút Thêm Chi Tiết */}
          <button
            type="button"
            onClick={handleAddDetail}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            Thêm Chi Tiết
          </button>

          {/* Nút Tạo Phiếu */}
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-lg"
          >
            Tạo Phiếu Đề Xuất
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseRequest_Add;
