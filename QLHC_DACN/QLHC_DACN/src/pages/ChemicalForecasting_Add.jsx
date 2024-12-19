import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ChemicalForecasting_Add = () => {
  const { selectedMaMon } = useParams();
  const navigate = useNavigate();

  const [tenBaiTN, setTenBaiTN] = useState("");
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [duTru, setduTru] = useState([
    { maHoaChat: 0, soLuong: 1, tenHoaChat: "", donViTinh: "", searchQuery: "", searchResults: [] },
  ]);

  useEffect(() => {
    axios
      .get(`https://localhost:7240/api/DuTru/lophocphan/${selectedMaMon}`)
      .then((response) => setSelectedClasses(response.data))
      .catch((error) => console.error("Error fetching classes:", error));
  }, [selectedMaMon]);

  const handleAddDetail = () => {
    setduTru([
      ...duTru,
      { maHoaChat: 0, soLuong: 1, tenHoaChat: "", donViTinh: "", searchQuery: "", searchResults: [] },
    ]);
  };

  const handleRemoveDetail = (index) => {
    const updatedDetails = [...duTru];
    updatedDetails.splice(index, 1);
    setduTru(updatedDetails);
  };

  const handleChangeDetail = (index, field, value) => {
    const updatedDetails = [...duTru];
    updatedDetails[index][field] = value;
    setduTru(updatedDetails);
  };

  const handleSearch = async (index, query) => {
    const updatedDetails = [...duTru];
    updatedDetails[index].searchQuery = query;

    if (query.length >= 2) {
      try {
        const response = await axios.get("https://localhost:7240/api/ChemicalManagement/Search", {
          params: { searchTerm: query },
        });
        updatedDetails[index].searchResults = response.data;
      } catch (error) {
        console.error("Lỗi khi tìm kiếm hóa chất:", error.response?.data || error.message);
      }
    } else {
      updatedDetails[index].searchResults = [];
    }
    setduTru(updatedDetails);
  };

  const handleSelectChemical = (index, chemical) => {
    const updatedDetails = [...duTru];
    updatedDetails[index].maHoaChat = chemical.maHoaChat;
    updatedDetails[index].tenHoaChat = chemical.tenHoaChat;
    updatedDetails[index].donViTinh = chemical.donVi;
    updatedDetails[index].searchQuery = "";
    updatedDetails[index].searchResults = [];
    setduTru(updatedDetails);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://localhost:7240/api/DuTru/taoBaiTN", {
        tenBaiTN,
        maMon: selectedMaMon,
        trangThai: 'Chờ duyệt',
      });

      for (const item of duTru) {
        await axios.post("https://localhost:7240/api/DuTru/taoDuTru", {
          maHoaChat: item.maHoaChat,
          maBaiTN: response.data.maBaiTN,
          soLuong: item.soLuong,
        });
      }

      navigate(`/chemical-forecasting`);
    } catch (error) {
      console.error("Error creating experiment:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Tạo bài thí nghiệm</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium">Tên bài thí nghiệm:</label>
          <input
            type="text"
            value={tenBaiTN}
            onChange={(e) => setTenBaiTN(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg p-3"
          />
        </div>

        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Tìm Kiếm Hóa Chất</th>
              <th className="border border-gray-300 p-2">Tên Hóa Chất</th>
              <th className="border border-gray-300 p-2">Số Lượng</th>
              <th className="border border-gray-300 p-2">Đơn Vị Tính</th>
              <th className="border border-gray-300 p-2">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {duTru.map((detail, index) => (
              <tr key={index}>
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
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    value={detail.tenHoaChat}
                    readOnly
                    className="w-full border-gray-300 p-2 rounded bg-gray-100"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    value={detail.soLuong}
                    onChange={(e) => handleChangeDetail(index, "soLuong", e.target.value)}
                    className="w-full border-gray-300 p-2 rounded"
                    min="0"
                  />
                </td>
                <td className="border border-gray-300 p-2">{detail.donViTinh}</td>
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

        <button
          type="button"
          onClick={handleAddDetail}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg"
        >
          Thêm Chi Tiết
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded-lg"
        >
          Tạo bài thí nghiệm
        </button>
      </form>
    </div>
  );
};

export default ChemicalForecasting_Add;
