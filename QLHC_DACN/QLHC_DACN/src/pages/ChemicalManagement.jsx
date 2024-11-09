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
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {chemicals.length > 0 ? (
          chemicals.map((chemical) => (
            <div
              key={chemical.maHoaChat}
              className="border border-gray-300 rounded-lg p-2 bg-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl hover:border-blue-400 hover:bg-blue-100"
            >
              <div className="relative overflow-hidden rounded-md mb-2">
                <div className="group relative">
                  <img
                    src={`src/assets/Images/${chemical.hinhAnh}`}
                    alt={chemical.tenHoaChat}
                    className="w-full h-48 object-cover rounded-md transition-transform duration-300 group-hover:scale-150 group-hover:object-contain"
                  />
                </div>
              </div>
              <h3 className="text-sl font-semibold text-gray-800">
                {chemical.tenHoaChat}
              </h3>
              <p className="text-gray-500 text-xm mt-1">
                Số CAS: {chemical.soCAS}
              </p>
              <p className="text-gray-500 text-xm">Đơn Vị: {chemical.donVi}</p>
              <p className="text-gray-500 text-xm line-clamp-2">
                Mô Tả: {chemical.moTa || "N/A"}
              </p>
              <button
                onClick={() => handleViewLots(chemical.maHoaChat)}
                className="mt-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white py-1 px-2 rounded shadow hover:from-blue-500 hover:to-blue-700 transition duration-200 transform hover:scale-105"
              >
                Xem Lô Hóa Chất
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-4 text-gray-500">
            Không có hóa chất nào để hiển thị.
          </div>
        )}
      </div>

      {/* pagination */}
      <div className="flex items-center justify-center mt-4 space-x-4">
        {" "}
        {/* Center alignment and spacing */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`flex items-center justify-center py-2 px-4 rounded transition duration-200 
      ${
        currentPage === 1
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-gray-500 text-white hover:bg-gray-600"
      }`} // Conditional styling
        >
          Trang Trước
        </button>
        <span className="text-gray-700 font-semibold">
          Trang {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center py-2 px-4 rounded transition duration-200 
      ${
        currentPage === totalPages
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-gray-500 text-white hover:bg-gray-600"
      }`} // Conditional styling
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
          <div className="bg-white rounded-lg shadow-lg p-8 z-60 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Danh Sách Lô Hóa Chất
            </h2>
            <div className="grid grid-cols-5 gap-4 mb-6">
              {lots.map((lot) => (
                <button
                  key={lot.maLo}
                  onClick={() => handleLotClick(lot.maLo)}
                  className={`py-2 px-4 rounded-lg text-white text-center transition duration-300 ${
                    lot.soLuongTon > 0
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-gray-500 cursor-not-allowed"
                  }`}
                >
                  {lot.maLo}
                </button>
              ))}
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
