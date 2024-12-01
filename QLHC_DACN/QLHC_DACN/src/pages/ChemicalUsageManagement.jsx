import { useState, useEffect } from "react";
import axios from "axios";

const ChemicalUsageManagement = () => {
  const [formData, setFormData] = useState({
    ngayLap: new Date().toISOString().split("T")[0], // Ngày hiện tại mặc định
    noiDung: "",
    maLHP: "",
  });
  const [classes, setClasses] = useState([]);
  const [phieuPhanBoList, setPhieuPhanBoList] = useState([]);
  const [selectedPhieu, setSelectedPhieu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chiTietData, setChiTietData] = useState([]);
  const [newChiTiet, setNewChiTiet] = useState({ maLo: "", soLuong: "" });
  const [loading, setLoading] = useState(false);

  // Fetch classes
  useEffect(() => {
    axios
      .get("https://localhost:7240/api/ChemicalUsageManagement/GetClasses")
      .then((response) => setClasses(response.data))
      .catch((error) => console.error("Error fetching classes:", error));
  }, []);

  // Fetch phiếu phân bổ
  const fetchPhieuPhanBo = () => {
    axios
      .get("https://localhost:7240/api/ChemicalUsageManagement/GetPhieuPhanBo")
      .then((response) => setPhieuPhanBoList(response.data))
      .catch((error) => console.error("Error fetching Phieu Phan Bo:", error));
  };

  useEffect(() => {
    fetchPhieuPhanBo();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://localhost:7240/api/ChemicalUsageManagement/CreatePhieuPhanBo",
        formData
      );

      const createdPhieu = response.data;

      if (chiTietData.length > 0) {
        const allocationDetails = chiTietData.map((ct) => ({
          maPhieuPB: createdPhieu.maPhieuPB,
          maLo: ct.maLo,
          soLuong: ct.soLuong,
        }));

        await axios.post(
          `https://localhost:7240/api/ChemicalUsageManagement/create-allocation-details`,
          allocationDetails
        );
      }

      fetchPhieuPhanBo();
      setFormData({
        ngayLap: new Date().toISOString().split("T")[0], // Reset về ngày hiện tại
        noiDung: "",
        maLHP: "",
      });
      setChiTietData([]);
    } catch (error) {
      console.error("Error in creating phiếu or saving chi tiết:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (phieu) => {
    setSelectedPhieu(phieu);
    setChiTietData(phieu.chiTiet || []);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPhieu(null);
    setIsModalOpen(false);
  };

  const handleChiTietChange = (e) => {
    setNewChiTiet({ ...newChiTiet, [e.target.name]: e.target.value });
  };

  const addChiTiet = () => {
    if (newChiTiet.maLo && newChiTiet.soLuong) {
      setChiTietData([...chiTietData, newChiTiet]);
      setNewChiTiet({ maLo: "", soLuong: "" });
    }
  };

  const saveChiTiet = async () => {
    if (!selectedPhieu) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `https://localhost:7240/api/ChemicalUsageManagement/AddChiTietPhanBo`,
        {
          maPhieuPB: selectedPhieu.maPhieuPB,
          chiTiet: [...(selectedPhieu.chiTiet || []), ...chiTietData],
        }
      );
      console.log("Saved chi tiết:", response.data);
      fetchPhieuPhanBo();
      closeModal();
    } catch (error) {
      console.error("Error saving chi tiết:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Tạo Phiếu Phân Bổ Hóa Chất</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Ngày lập:</label>
          <input
            type="date"
            className="border p-3 w-full rounded-lg shadow-sm"
            name="ngayLap"
            value={formData.ngayLap}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Nội dung:</label>
          <textarea
            className="border p-3 w-full rounded-lg shadow-sm"
            name="noiDung"
            value={formData.noiDung}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Lớp học phần:</label>
          <select
            className="border p-3 w-full rounded-lg shadow-sm"
            name="maLHP"
            value={formData.maLHP}
            onChange={handleChange}
          >
            <option value="">Chọn lớp học phần</option>
            {classes.map((cls) => (
              <option key={cls.maLHP} value={cls.maLHP}>
                {cls.maLHP}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            className="border p-3 flex-1 rounded-lg shadow-sm"
            name="maLo"
            value={newChiTiet.maLo}
            onChange={handleChiTietChange}
            placeholder="Mã Lô"
          />
          <input
            type="number"
            className="border p-3 flex-1 rounded-lg shadow-sm"
            name="soLuong"
            value={newChiTiet.soLuong}
            onChange={handleChiTietChange}
            placeholder="Số Lượng"
          />
          <button
            type="button"
            onClick={addChiTiet}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Thêm
          </button>
        </div>

        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg mb-6">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left border-b text-gray-700">Mã Lô</th>
              <th className="px-4 py-3 text-left border-b text-gray-700">Số Lượng</th>
            </tr>
          </thead>
          <tbody>
            {chiTietData.map((ct, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 border-b text-gray-600">{ct.maLo}</td>
                <td className="px-4 py-3 border-b text-gray-600">{ct.soLuong}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 mt-4 rounded-lg hover:bg-blue-700 transition duration-200"
          disabled={loading}
        >
          {loading ? "Đang tạo..." : "Tạo Phiếu Phân Bổ"}
        </button>
      </form>

      {/* Table of Phieu Phan Bo */}
      <h2 className="text-xl font-semibold mt-8 text-gray-800">Danh Sách Phiếu Phân Bổ</h2>
      <table className="w-full mt-6 border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-6 py-4 text-sm text-gray-700">Mã Phiếu</th>
            <th className="border px-6 py-4 text-sm text-gray-700">Ngày Lập</th>
            <th className="border px-6 py-4 text-sm
text-gray-700">Nội Dung</th> <th className="border px-6 py-4 text-sm text-gray-700">Thao tác</th> </tr> </thead> <tbody> {phieuPhanBoList.map((phieu) => ( <tr key={phieu.maPhieuPB} className="hover:bg-gray-50"> <td className="border px-6 py-4">{phieu.maPhieuPB}</td> <td className="border px-6 py-4">{phieu.ngayLap}</td> <td className="border px-6 py-4">{phieu.noiDung}</td> <td className="border px-6 py-4"> <button onClick={() => openModal(phieu)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" > Xem Chi Tiết </button> </td> </tr> ))} </tbody> </table>
  {/* Modal */}
  {isModalOpen && (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Chi Tiết Phân Bổ</h3>
          <button
            onClick={closeModal}
            className="text-gray-600 text-xl"
          >
            &times;
          </button>
        </div>
        <table className="w-full table-auto mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Mã Lô</th>
              <th className="px-4 py-3 text-left">Số Lượng</th>
            </tr>
          </thead>
          <tbody>
            {chiTietData.map((ct, index) => (
              <tr key={index}>
                <td className="border px-4 py-3">{ct.maLo}</td>
                <td className="border px-4 py-3">{ct.soLuong}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )}
</div>
); };

export default ChemicalUsageManagement;