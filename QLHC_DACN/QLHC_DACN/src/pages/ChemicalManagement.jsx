import { useEffect, useState } from "react";
import axios from "axios";

const ChemicalManagement = () => {
  const [chemicals, setChemicals] = useState([]);
  const [lots, setLots] = useState([]);
  const [selectedChemicalId, setSelectedChemicalId] = useState(null);
  const [selectedLot, setSelectedLot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchChemicals = async (page = 1) => {
    try {
      const response = await axios.get(
        `https://localhost:7240/api/ChemicalManagement/GetHoaChat?page=${page}&limit=15`
      );
      console.log("Response from API:", response.data);

      if (
        response.data &&
        Array.isArray(response.data.data) &&
        response.data.data.length > 0
      ) {
        setChemicals(response.data.data);
        setTotalPages(response.data.totalPages); // Update total pages
      } else {
        console.error("No chemicals found:", response.data.data);
        setChemicals([]);
      }
    } catch (error) {
      console.error("Error fetching the chemicals:", error);
      setChemicals([]);
    }
  };

  useEffect(() => {
    fetchChemicals(currentPage);
  }, [currentPage]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm) {
      try {
        const response = await axios.get(
          `https://localhost:7240/api/ChemicalManagement/Search?searchTerm=${searchTerm}`
        );

        if (response.status === 200) {
          if (response.data.length > 0) {
            setChemicals(response.data);
            setTotalPages(1); // Đặt lại tổng số trang nếu tìm kiếm
          } else {
            setChemicals([]); // Không tìm thấy hóa chất
            alert("Không tìm thấy hóa chất với thông tin đã nhập.");
          }
        }
      } catch (error) {
        console.error("Error searching for chemicals:", error);
        setChemicals([]);
        alert("Có lỗi xảy ra khi tìm kiếm hóa chất.");
      }
    }
  };

  const handleShowAll = () => {
    fetchChemicals();
    setSearchTerm("");
  };

  const handleViewLots = async (chemicalId) => {
    setSelectedChemicalId(chemicalId);
    setIsModalOpen(true);
    try {
      const response = await axios.get(
        `https://localhost:7240/api/ChemicalManagement/${chemicalId}/Lots`
      );
      setLots(response.data);
    } catch (error) {
      console.error("Error fetching the chemical lots:", error);
      setLots([]);
    }
  };

  const handleLotClick = async (lotId) => {
    try {
      const response = await axios.get(
        `https://localhost:7240/api/ChemicalManagement/LotDetails/${lotId}`
      );
      setSelectedLot(response.data);
    } catch (error) {
      console.error("Error fetching lot details:", error);
      setSelectedLot(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setLots([]);
    setSelectedLot(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target.className.includes("fixed inset-0")) {
      handleCloseModal();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">
        Danh Mục Hóa Chất
      </h1>

      <form onSubmit={handleSearchSubmit} className="mb-4 flex">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Tìm kiếm theo Số CAS"
          className="border rounded p-2 flex-grow"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Tìm kiếm
        </button>
        <button
          type="button"
          onClick={handleShowAll}
          className="ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
        >
          Hiển thị tất cả
        </button>
      </form>

      <div className="overflow-x-auto bg-gray-50 p-4 rounded-lg shadow-md">
        <table className="min-w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-xl">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <th className="border px-6 py-3 text-left font-semibold text-sm">
                Tên Hóa Chất
              </th>
              <th className="border px-6 py-3 text-left font-semibold text-sm">
                Số CAS
              </th>
              <th className="border px-6 py-3 text-left font-semibold text-sm">
                Đơn Vị
              </th>
              <th className="border px-6 py-3 text-left font-semibold text-sm">
                Mô Tả
              </th>
              {/* <th className="border px-6 py-3 text-center font-semibold text-sm">
                Hình Ảnh
              </th> */}
              <th className="border px-6 py-3 text-center font-semibold text-sm">
                Hành Động
              </th>
            </tr>
          </thead>
          <tbody>
            {chemicals.length > 0 ? (
              chemicals.map((chemical) => (
                <tr
                  key={chemical.maHoaChat}
                  className="hover:bg-blue-100 transition duration-300"
                >
                  <td className="border px-6 py-3 text-gray-800 text-sm">
                    {chemical.tenHoaChat}
                  </td>
                  <td className="border px-6 py-3 text-gray-600 text-sm">
                    {chemical.soCAS}
                  </td>
                  <td className="border px-6 py-3 text-gray-600 text-sm">
                    {chemical.donVi}
                  </td>
                  <td className="border px-6 py-3 text-gray-600 text-sm line-clamp-2">
                    {chemical.moTa || "N/A"}
                  </td>
                  {/* <td className="border px-6 py-3 text-center">
                    <img
                      src={`src/assets/Images/${chemical.hinhAnh}`}
                      alt={chemical.tenHoaChat}
                      className="h-14 w-14 object-cover rounded-lg shadow-md mx-auto"
                    />
                  </td> */}
                  <td className="border px-6 py-3 text-center">
                    <button
                      onClick={() => handleViewLots(chemical.maHoaChat)}
                      className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow hover:from-blue-500 hover:to-blue-700 transform transition-transform duration-200 hover:scale-105"
                    >
                      Xem Lô Hóa Chất
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-4 text-gray-500 text-sm"
                >
                  Không có hóa chất nào để hiển thị.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-6 space-x-4">
        {/* Center alignment and spacing */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`flex items-center justify-center py-2 px-4 rounded-lg shadow transition duration-300 transform 
      ${
        currentPage === 1
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105"
      }`}
        >
          Trang Trước
        </button>
        <span className="text-gray-800 font-semibold text-lg">
          Trang {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center py-2 px-4 rounded-lg shadow transition duration-300 transform 
      ${
        currentPage === totalPages
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105"
      }`}
        >
          Trang Sau
        </button>
      </div>

      {/* Modal for displaying chemical lots */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-lg shadow-lg p-8 z-60 max-w-6xl w-full">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Danh Sách Lô Hóa Chất
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="px-4 py-2 text-left">Mã Lô</th>
                    <th className="px-4 py-2 text-left w-44">Số Lô</th>
                    <th className="px-4 py-2 text-left w-56">Nhà Cung Cấp</th>
                    <th className="px-4 py-2 text-left">Số Lượng</th>
                    <th className="px-4 py-2 text-left">Số Lượng Tồn</th>
                    <th className="px-4 py-2 text-left">Trạng thái</th>
                    <th className="px-4 py-2 text-left">Hạn Sử Dụng</th>
                    <th className="px-4 py-2 text-left">Ghi Chú</th>
                  </tr>
                </thead>
                <tbody>
                  {lots.map((lot) => (
                    <tr
                      key={lot.maLo}
                      className={`border-t hover:bg-gray-100 ${
                        lot.soLuongTon > 0 ? "bg-white" : "bg-gray-100"
                      }`}
                      onClick={() => handleLotClick(lot.maLo)}
                    >
                      <td className="px-4 py-2">{lot.maLo}</td>
                      <td className="px-4 py-2">{lot.soLo}</td>
                      <td className="px-4 py-2">{lot.nhaCungCap}</td>
                      <td className="px-4 py-2">{lot.soLuong}</td>
                      <td className="px-4 py-2">{lot.soLuongTon}</td>
                      <td className="px-4 py-2">{lot.trangThai}</td>
                      <td className="px-4 py-2">{lot.hanSuDung}</td>
                      <td className="px-4 py-2">
                        {lot.ghiChu ? lot.ghiChu : "Không có ghi chú"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Display lot details */}
            {selectedLot && (
              <div className="mt-6 p-4 bg-white border border-gray-300 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-blue-700 mb-2">
                  Thông Tin Lô: {selectedLot.maLo}
                </h3>
                <div className="grid grid-cols-1 gap-y-2 text-gray-700">
                  <p className="text-lg">
                    <span className="font-semibold">Nhà cung cấp:</span>{" "}
                    {selectedLot.nhaCungCap}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Số Lượng:</span>{" "}
                    {selectedLot.soLuong}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Số Lượng tồn:</span>{" "}
                    {selectedLot.soLuongTon}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Hạn Sử Dụng:</span>{" "}
                    {selectedLot.hanSuDung}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Ghi Chú:</span>{" "}
                    {selectedLot.ghiChu || "Không có ghi chú"}
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={handleCloseModal}
              className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChemicalManagement;
