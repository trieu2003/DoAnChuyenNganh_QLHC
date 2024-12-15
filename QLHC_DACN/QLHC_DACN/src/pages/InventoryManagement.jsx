import { useState, useEffect } from "react";
import axios from "axios";

const InventoryManagement = () => {
  const [phieuNhap, setPhieuNhap] = useState([]);
  const [lots, setLots] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const maNguoiDung = parseInt(localStorage.getItem("maNguoiDung"), 10); //Thêm hàm cho phép lấy mã người dùng hiện đang đăng nhập
  const [chemicalList, setChemicalList] = useState([]);
  const [newPhieuNhap, setNewPhieuNhap] = useState({
    soLuongNhap: 0,
    ngayNhap: new Date().toISOString().split("T")[0],
    nguoiNhap: "user123",
    ghiChu: "",
    maNguoiDung: maNguoiDung, // Default value for user ID
  });

  const [newLot, setNewLot] = useState({
    nhaCungCap: "",
    soLuong: 0,
    soLo: "",
    hanSuDung: "",
    maHoaChat: "",
    soLuongTon: 0,
    trangThai: "",
    ghiChu: "",
    maPhieuNhap: "", // Optional if not needed initially
  });

  // Fetch all Phieu Nhap on component mount
  useEffect(() => {
    axios
      .get("https://localhost:7240/api/InventoryManagement/GetAllPhieuNhap")
      .then((response) => {
        setPhieuNhap(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Phieu Nhap data:", error);
      });
  }, []);
  useEffect(() => {
    fetch("https://localhost:7240/api/InventoryManagement/GetChemicals")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched chemicals:", data); // Kiểm tra dữ liệu
        setChemicalList(data);
      })
      .catch((error) => console.error("Error fetching chemicals:", error));
  }, []);

  // Handle input change for Phieu Nhap
  const handlePhieuNhapChange = (e) => {
    const { name, value } = e.target;
    setNewPhieuNhap((prev) => ({ ...prev, [name]: value }));
  };

  const handleLotChange = (e) => {
    const { name, value } = e.target;
    setNewLot((prev) => ({ ...prev, [name]: value }));
  };
  // Handle creating a new "Phieu Nhap"
  // Handle creating a new "Phieu Nhap"
  const handleCreatePhieuNhap = () => {
    const updatedPhieuNhap = {
      ...newPhieuNhap,
      soLuongNhap: lots.length, // Update soLuongNhap based on the number of lots
    };

    // First, create the "Phieu Nhap"
    axios
      .post(
        "https://localhost:7240/api/InventoryManagement/AddPhieuNhap",
        updatedPhieuNhap,
        {
          headers: {
            "Content-Type": "application/json", // Ensure content type is JSON
          },
        }
      )
      .then((response) => {
        alert("Phiếu nhập đã được tạo!");
        const createdPhieuNhap = response.data; // Get the created Phieu Nhap from the response

        // Now, send all lots with MaPhieuNhap
        const lotsWithPhieuNhap = lots.map((lot) => ({
          ...lot,
          maPhieuNhap: createdPhieuNhap.maPhieuNhap, // Associate the Phieu Nhap ID with the lot
        }));

        // Send the lots data to the backend
        axios
          .post(
            "https://localhost:7240/api/InventoryManagement/AddLots",
            lotsWithPhieuNhap,
            {
              headers: {
                "Content-Type": "application/json", // Ensure content type is JSON
              },
            }
          )
          .then(() => {
            alert("Các lô hóa chất đã được thêm!");
            setPhieuNhap((prev) => [...prev, createdPhieuNhap]); // Add new Phieu Nhap to the list
            resetForm();
            setModalOpen(false);
          })
          .catch((error) => {
            console.error("Error adding lots:", error);
            alert(
              `Error adding lots: ${error.response?.data || error.message}`
            );
          });
      })
      .catch((error) => {
        console.error("Error creating Phieu Nhap:", error);
        alert(
          `Error creating Phieu Nhap: ${error.response?.data || error.message}`
        );
      });
  };

  // Update the handleAddLot function to add validation and handle state correctly
  const handleAddLot = () => {
    if (newLot.nhaCungCap && newLot.soLuong > 0 && newLot.hanSuDung) {
      setLots((prev) => {
        const updatedLots = [...prev, newLot];
        setNewPhieuNhap((prev) => ({
          ...prev,
          soLuongNhap: updatedLots.length, // Updated to reflect the correct number of lots
        }));
        return updatedLots;
      });
      resetLotForm(); // Clear the form after adding a lot
    } else {
      alert("Vui lòng điền đầy đủ thông tin lô hóa chất");
    }
  };

  const resetLotForm = () => {
    setNewLot({
      nhaCungCap: "",
      soLuong: 0,
      soLo: "",
      hanSuDung: "",
      maHoaChat: "",
      soLuongTon: 0,
      trangThai: "",
      ghiChu: "",
      maPhieuNhap: "", // Optional reset
    });
  };
  // Reset the Phieu Nhap form fields
  const resetForm = () => {
    setNewPhieuNhap({
      soLuongNhap: 0,
      ngayNhap: "",
      nguoiNhap: "user123",
      ghiChu: "",
      maNguoiDung: maNguoiDung,
    });
    setLots([]);
  };
  const confirmCloseModal = () => {
    const confirmClose = window.confirm(
      "Bạn có chắc muốn đóng tác vụ trước khi lưu?"
    );
    if (confirmClose) {
      setModalOpen(false); // Close the modal
      resetForm(); // Reset form if necessary
    }
  };
  const handleDelete = (index) => {
    // Create a new array excluding the item at the specified index
    const updatedLots = lots.filter((_, i) => i !== index);
    setLots(updatedLots); // Update the state with the new list
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700">
        Quản Lý Phiếu Nhập và Nhập Lô Hóa Chất
      </h1>

      {/* PhieuNhap List */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-blue-600">
          Danh Sách Phiếu Nhập
        </h2>
        <div className="overflow-x-auto bg-gray-50 p-4 rounded-lg shadow-md">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-blue-200">
              <tr className="text-left text-sm font-medium text-blue-700">
                <th className="px-6 py-3">Mã Phiếu Nhập</th>
                <th className="px-6 py-3">Số Lượng Nhập</th>
                <th className="px-6 py-3">Ngày Nhập</th>
                <th className="px-6 py-3">Người Nhập</th>
                <th className="px-6 py-3">Ghi Chú</th>
              </tr>
            </thead>
            <tbody>
              {phieuNhap.length > 0 ? (
                phieuNhap.map((phieu) => (
                  <tr
                    key={phieu.maPhieuNhap}
                    className="border-b hover:bg-blue-50 transition duration-200"
                  >
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {phieu.maPhieuNhap}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {phieu.soLuongNhap}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {phieu.ngayNhap}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {phieu.tenNguoiDung}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {phieu.ghiChu || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-3 text-center text-gray-500 text-sm"
                  >
                    Không có phiếu nhập nào để hiển thị.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Button to open modal */}
      <button
        onClick={() => setModalOpen(true)}
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transform transition-transform duration-200 hover:scale-105"
      >
        Tạo Phiếu Nhập Mới
      </button>

      {/* Modal for creating new Phieu Nhap */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl overflow-hidden transform transition-all duration-500 ease-in-out scale-95 opacity-0 opacity-100">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Tạo Phiếu Nhập Mới
            </h2>
            <div className="flex flex-col sm:flex-row sm:space-x-6">
              {/* Phieu Nhap form */}
              <div className="w-full sm:w-1/3">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Ngày Nhập
                  </label>
                  <input
                    type="date"
                    name="ngayNhap"
                    className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPhieuNhap.ngayNhap}
                    onChange={handlePhieuNhapChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Ghi Chú
                  </label>
                  <textarea
                    name="ghiChu"
                    className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPhieuNhap.ghiChu}
                    onChange={handlePhieuNhapChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Mã Người Dùng
                  </label>
                  <input
                    type="number"
                    name="maNguoiDung"
                    className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPhieuNhap.maNguoiDung}
                    onChange={handlePhieuNhapChange}
                  />
                </div>
                {/* Display the number of added lots */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Số Lượng Lô Đã Thêm
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md bg-gray-200 text-gray-700"
                    value={lots.length} // Shows the count of added lots
                    disabled
                  />
                </div>
                <button
                  onClick={handleCreatePhieuNhap}
                  className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Tạo Phiếu Nhập
                </button>
              </div>

              {/* Lot form */}
              <div className="w-full sm:w-2/3 mt-6 sm:mt-0">
                <h3 className="text-lg font-semibold mb-4 text-center sm:text-left">
                  Thông Tin Lô Hóa Chất
                </h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Nhà Cung Cấp
                  </label>
                  <input
                    type="text"
                    name="nhaCungCap"
                    className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newLot.nhaCungCap}
                    onChange={handleLotChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Số Lượng
                  </label>
                  <input
                    type="number"
                    name="soLuong"
                    className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newLot.soLuong}
                    onChange={handleLotChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    So Lo
                  </label>
                  <input
                    type="text"
                    name="soLo"
                    className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newLot.soLo}
                    onChange={handleLotChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Hạn Sử Dụng
                  </label>
                  <input
                    type="date"
                    name="hanSuDung"
                    className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newLot.hanSuDung}
                    onChange={handleLotChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Trạng Thái
                  </label>
                  <input
                    type="text"
                    name="trangThai"
                    className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newLot.trangThai}
                    onChange={handleLotChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Số Lượng Tồn
                  </label>
                  <input
                    type="number"
                    name="soLuongTon"
                    className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newLot.soLuongTon}
                    onChange={handleLotChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Chọn Hóa Chất
                  </label>
                  <select
                    name="maHoaChat"
                    value={newLot.maHoaChat}
                    onChange={handleLotChange}
                    className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Chọn hóa chất</option>
                    {chemicalList.map((chemical) => (
                      <option
                        key={chemical.maHoaChat}
                        value={chemical.maHoaChat}
                      >
                        {chemical.tenHoaChat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Ghi Chú
                  </label>
                  <textarea
                    name="ghiChu"
                    className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newLot.ghiChu}
                    onChange={handleLotChange}
                  />
                </div>
                <button
                  onClick={handleAddLot}
                  className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                >
                  Thêm Lô
                </button>
              </div>
            </div>

            {/* List of lots added */}
            <h4 className="text-lg font-semibold mt-6 mb-2 text-gray-700">
              Các Lô Đã Thêm
            </h4>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Nhà Cung Cấp
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Số Lượng
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Số Lô
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Hạn Sử Dụng
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Trạng Thái
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Mã Hóa Chất
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Ghi Chú
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Số Lượng Tồn
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Hành Động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lots.map((lot, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition duration-200"
                    >
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {lot.nhaCungCap}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {lot.soLuong}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {lot.soLo}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {lot.hanSuDung}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {lot.trangThai}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {lot.maHoaChat}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {lot.ghiChu}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {lot.soLuongTon}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                          onClick={() => handleDelete(index)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Close Confirmation */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={confirmCloseModal}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
