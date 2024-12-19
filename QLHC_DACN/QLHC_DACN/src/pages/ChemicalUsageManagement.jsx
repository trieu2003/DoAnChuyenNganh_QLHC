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
  const [chemicals, setChemicals] = useState([]); // Danh sách hóa chất
  const [classInfo, setClassInfo] = useState(null);
  const [modalChiTietData, setModalChiTietData] = useState([]); // Dữ liệu chi tiết cho modal
  const [monHocList, setMonHocList] = useState([]); // Danh sách môn học
  const [selectedMonHoc, setSelectedMonHoc] = useState(""); // Môn học được chọn
  const [hoaChatList, setHoaChatList] = useState([]); // Danh sách hóa chất dự trù
  const [error, setError] = useState(""); // Lưu lỗi nếu có
  const [lopHocPhanList, setLopHocPhanList] = useState([]); // Danh sách lớp học phần
  const [errorMessage, setErrorMessage] = useState("");
  // Lấy danh sách môn học từ API
  useEffect(() => {
    const fetchMonHoc = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7240/api/DuTru/monhoc"
        );
        console.log(response.data); // Kiểm tra dữ liệu môn học nhận được từ API
        setMonHocList(response.data);
      } catch (err) {
        setError("Không thể tải danh sách môn học.");
        console.error(err); // In lỗi nếu có
      }
    };

    fetchMonHoc();
  }, []);

  const handleMonHocChange = async (e) => {
    const maMonHoc = e.target.value; // Lấy mã môn học được chọn
    setSelectedMonHoc(maMonHoc); // Cập nhật môn học đã chọn

    if (!maMonHoc) {
      setHoaChatList([]); // Xóa danh sách hóa chất
      setLopHocPhanList([]); // Xóa danh sách lớp học phần
      return;
    }

    try {
      // Gọi API lấy danh sách hóa chất dự trù
      const hoaChatResponse = await axios.get(
        `https://localhost:7240/api/DuTru/thongkeTongSL/${maMonHoc}`
      );
      setHoaChatList(hoaChatResponse.data); // Lưu danh sách hóa chất
      setError(""); // Xóa lỗi nếu thành công

      // Gọi API lấy danh sách lớp học phần
      const lopHocPhanResponse = await axios.get(
        `https://localhost:7240/api/DuTru/lophocphan/${maMonHoc}`
      );
      setLopHocPhanList(lopHocPhanResponse.data); // Lưu danh sách lớp học phần
    } catch (err) {
      // setError("Không thể tải dữ liệu.");
      if (error.response && error.response.status === 404) {
        setErrorMessage("Chưa có bài thí nghiệm nào được xác nhận");
      } else {
        setErrorMessage("Có lỗi xảy ra khi tải dữ liệu");
      } // Ghi lại lỗi
      console.error(err);
      setHoaChatList([]); // Xóa danh sách hóa chất nếu lỗi
      //setLopHocPhanList([]); // Xóa danh sách lớp học phần nếu lỗi
    }
  };

  // Fetch classes
  useEffect(() => {
    axios
      .get("https://localhost:7240/api/ChemicalUsageManagement/GetClasses")
      .then((response) => setClasses(response.data))
      .catch((error) => console.error("Error fetching classes:", error));
  }, []);
  // Fetch danh sách tên hóa chất
  useEffect(() => {
    axios
      .get(
        "https://localhost:7240/api/ChemicalUsageManagement/GetChemicalNames"
      )
      .then((response) => setChemicals(response.data))
      .catch((error) => console.error("Error fetching chemical names:", error));
  }, []);
  // Fetch mã lô khi chọn tên hóa chất
  const handleChemicalChange = async (e) => {
    const tenHoaChat = e.target.value;
    setNewChiTiet({ ...newChiTiet, tenHoaChat, maLo: "" }); // Xóa mã lô cũ khi đổi hóa chất

    if (tenHoaChat) {
      try {
        const response = await axios.get(
          `https://localhost:7240/api/ChemicalUsageManagement/GetMaxQuantityLotByChemicalName/${tenHoaChat}`
        );
        setNewChiTiet((prevState) => ({
          ...prevState,
          maLo: response.data.maLo, // Cập nhật mã lô từ API
        }));
      } catch (error) {
        console.error("Error fetching lot information:", error);
      }
    }
  };
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

  const openModal = async (phieu) => {
    setSelectedPhieu(phieu);
    setIsModalOpen(true);

    try {
      const classDetails = await fetchClassInfoByPhieuPhanBo(phieu.maPhieuPB);
      setClassInfo(classDetails);

      // Tránh ghi đè nếu dữ liệu đã tồn tại
      if (!phieu.chiTiet || phieu.chiTiet.length === 0) {
        setChiTietData([]); // Nếu không có chi tiết
        return;
      }

      const chiTietWithNames = await Promise.all(
        phieu.chiTiet.map(async (ct) => {
          if (ct.tenHoaChat) return ct; // Không cần gọi API nếu đã có tên hóa chất
          try {
            const response = await axios.get(
              `https://localhost:7240/api/ChemicalUsageManagement/GetChemicalByLot/${ct.maLo}`
            );
            return { ...ct, tenHoaChat: response.data.tenHoaChat };
          } catch (error) {
            console.error(
              `Error fetching chemical name for lot ${ct.maLo}:`,
              error
            );
            return { ...ct, tenHoaChat: "N/A" }; // Xử lý lỗi
          }
        })
      );

      setChiTietData(chiTietWithNames);
    } catch (error) {
      console.error("Error fetching modal data:", error);
    }
  };

  const closeModal = () => {
    setSelectedPhieu(null);
    setIsModalOpen(false);
  };

  // Handle input change for new lot details
  const handleChiTietChange = (event) => {
    const { name, value } = event.target;
    setNewChiTiet((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
  const fetchClassInfoByPhieuPhanBo = async (maPhieuPB) => {
    try {
      const response = await axios.get(
        `https://localhost:7240/api/ChemicalUsageManagement/GetClassInfoByPhieuPhanBo/${maPhieuPB}`
      );
      return response.data; // Trả về thông tin lớp học phần
    } catch (error) {
      console.error("Error fetching class info:", error);
      return null;
    }
  };

  return (
    <div className="p-6">
      <div className="container mx-auto p-6 bg-white shadow rounded-lg border border-gray-400">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-600">
          Hiển thị hóa chất dự trù Theo Môn Học
        </h1>

        {/* Hiển thị lỗi nếu có */}
        {error && (
          <p className="text-red-500 text-center bg-red-100 py-2 px-4 rounded mb-4">
            {error}
          </p>
        )}

        {/* Select box để chọn môn học */}
        <div className="mb-6">
          <label
            htmlFor="monHocSelect"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Chọn Môn Học:
          </label>
          <select
            id="monHocSelect"
            className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
            value={selectedMonHoc}
            onChange={handleMonHocChange}
          >
            <option value="">-- Chọn Môn Học --</option>
            {monHocList.map((monHoc) => (
              <option key={monHoc.maMon} value={monHoc.maMon}>
                {monHoc.tenMon}
              </option>
            ))}
          </select>
        </div>

        {/* Danh Sách Lớp Học Phần */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Danh Sách Lớp Học Phần
          </h2>
          {lopHocPhanList.length > 0 ? (
            <table className="table-auto border-collapse border border-gray-300 w-full text-left text-sm">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-3">STT</th>
                  <th className="border border-gray-300 px-4 py-3">Tên Lớp</th>
                  <th className="border border-gray-300 px-4 py-3">
                    Giảng Viên
                  </th>
                  <th className="border border-gray-300 px-4 py-3">Sĩ Số</th>
                </tr>
              </thead>
              <tbody>
                {lopHocPhanList.map((lop, index) => (
                  <tr
                    key={lop.MaLHP}
                    className={index % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {lop.tenLopHocPhan}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {lop.gvDay || "Không xác định"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {lop.siSo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">
              Không có lớp học phần nào được tìm thấy.
            </p>
          )}
        </div>

        {/* Hiển thị danh sách hóa chất dự trù */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Danh Sách Hóa Chất Dự Trù
          </h2>
          {hoaChatList.length > 0 ? (
            <table className="table-auto border-collapse border border-gray-300 w-full text-left text-sm">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-3">STT</th>
                  <th className="border border-gray-300 px-4 py-3">
                    Tên Hóa Chất
                  </th>
                  <th className="border border-gray-300 px-4 py-3">Đơn Vị</th>
                  <th className="border border-gray-300 px-4 py-3">
                    Tổng Số Lượng
                  </th>
                </tr>
              </thead>
              <tbody>
                {hoaChatList.map((hoaChat, index) => (
                  <tr
                    key={hoaChat.maHoaChat}
                    className={index % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {hoaChat.hoaChat?.tenHoaChat || "Không xác định"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {hoaChat.hoaChat?.donVi || "Không xác định"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {hoaChat.tongSoLuong || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">Không có hóa chất nào được dự trù. 
            <span className="text-red-500"> Kiểm tra xem đã xác nhận dự trù chưa ?</span>
            </p>
            
          )}
        </div>
      </div>
      <div className="container mx-auto p-6 bg-white shadow rounded-lg border border-gray-300">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-600">
          Tạo Phiếu Phân Bổ Hóa Chất
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Ngày lập:
            </label>
            <input
              type="date"
              className="border p-3 w-full rounded-lg shadow-sm"
              name="ngayLap"
              value={formData.ngayLap}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Nội dung:
            </label>
            <textarea
              className="border p-3 w-full rounded-lg shadow-sm"
              name="noiDung"
              value={formData.noiDung}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Lớp học phần:
            </label>
            <select
              className="border p-3 w-full rounded-lg shadow-sm"
              name="maLHP"
              value={formData.maLHP}
              onChange={handleChange}
            >
              <option value="">Chọn lớp học phần</option>
              {classes.map((cls) => (
                <option key={cls.maLHP} value={cls.maLHP}>
                  {cls.tenLopHocPhan}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-4 mb-6">
            <select
              className="border p-3 flex-1 rounded-lg shadow-sm"
              name="tenHoaChat"
              value={newChiTiet.tenHoaChat}
              onChange={handleChemicalChange}
            >
              <option value="">Chọn Hóa Chất</option>
              {chemicals.map((hc) => (
                <option key={hc.maHoaChat} value={hc.tenHoaChat}>
                  {hc.tenHoaChat}
                </option>
              ))}
            </select>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mã Lô hiện có:
            </label>
            <input
              type="text"
              className="border p-3 flex-1 rounded-lg shadow-sm"
              name="maLo"
              value={newChiTiet.maLo}
              readOnly
              placeholder="Mã Lô"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số lượng cần nhập:
            </label>
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
            <thead className="bg-blue-200">
              <tr>
                <th className="px-4 py-3 text-left border-b text-gray-700">
                  Tên hóa chất
                </th>
                <th className="px-4 py-3 text-left border-b text-gray-700">
                  Mã Lô
                </th>
                <th className="px-4 py-3 text-left border-b text-gray-700">
                  Số Lượng
                </th>
              </tr>
            </thead>
            <tbody>
              {chiTietData.map((ct, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b text-gray-600">
                    {ct.tenHoaChat}
                  </td>
                  <td className="px-4 py-3 border-b text-gray-600">
                    {ct.maLo}
                  </td>
                  <td className="px-4 py-3 border-b text-gray-600">
                    {ct.soLuong}
                  </td>
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
      </div>
      {/* Table of Phieu Phan Bo */}
      <h2 className="text-xl font-semibold mt-8 text-gray-800">
        Danh Sách Phiếu Phân Bổ
      </h2>
      <table className="w-full mt-6 border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-6 py-4 text-sm text-gray-700">Mã Phiếu</th>
            <th className="border px-6 py-4 text-sm text-gray-700">Ngày Lập</th>
            <th className="border px-6 py-4 text-sm text-gray-700">
              Nội Dung
            </th>{" "}
            <th className="border px-6 py-4 text-sm text-gray-700">Thao tác</th>{" "}
          </tr>{" "}
        </thead>{" "}
        <tbody>
          {" "}
          {phieuPhanBoList.map((phieu) => (
            <tr key={phieu.maPhieuPB} className="hover:bg-gray-50">
              {" "}
              <td className="border px-6 py-4">{phieu.maPhieuPB}</td>{" "}
              <td className="border px-6 py-4">{phieu.ngayLap}</td>{" "}
              <td className="border px-6 py-4">{phieu.noiDung}</td>{" "}
              <td className="border px-6 py-4 flex justify-center">
                {" "}
                <button
                  onClick={() => openModal(phieu)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  {" "}
                  Xem Chi Tiết{" "}
                </button>{" "}
              </td>{" "}
            </tr>
          ))}{" "}
        </tbody>{" "}
      </table>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/2 shadow-lg transform transition-all duration-300 scale-100 hover:scale-105">
            <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-2">
              <h3 className="text-xl font-semibold text-blue-600">
                Chi Tiết Phân Bổ
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-600 text-2xl hover:text-red-600"
              >
                &times;
              </button>
            </div>

            {/* Hiển thị thông tin lớp học phần */}
            {classInfo && (
              <div className="mb-4 space-y-2">
                <p className="text-sm text-gray-700">
                  <strong className="font-semibold text-blue-500">
                    Tên lớp học phần:
                  </strong>{" "}
                  {classInfo.tenLopHocPhan}
                </p>
                <p className="text-sm text-gray-700">
                  <strong className="font-semibold text-blue-500">
                    Giảng viên dạy:
                  </strong>{" "}
                  {classInfo.gvDay}
                </p>
                <p className="text-sm text-gray-700">
                  <strong className="font-semibold text-blue-500">
                    Sĩ số:
                  </strong>{" "}
                  {classInfo.siSo}
                </p>
              </div>
            )}
            {/* Kiểm tra nếu không có hóa chất */}
            {chiTietData.length === 0 ? (
              <div className="text-center text-gray-600 py-6">
                <p className="text-lg font-semibold text-red-500">
                  Hóa chất vừa thêm có lẽ đã hết trong Lô Hóa Chất !
                </p>
              </div>
            ) : (
              /* Bảng hiển thị chi tiết phân bổ */
              <table className="w-full table-auto mb-4 border-collapse">
                <thead className="bg-blue-100 text-blue-700">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">
                      Hóa Chất
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">Mã Lô</th>
                    <th className="px-6 py-3 text-left font-semibold">
                      Số Lượng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {chiTietData.map((ct, index) => (
                    <tr
                      key={index}
                      className="hover:bg-blue-50 transition duration-300 ease-in-out"
                    >
                      <td className="border-t border-gray-200 px-6 py-3">
                        {ct.tenHoaChat}
                      </td>
                      <td className="border-t border-gray-200 px-6 py-3">
                        {ct.maLo}
                      </td>
                      <td className="border-t border-gray-200 px-6 py-3">
                        {ct.soLuong}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChemicalUsageManagement;
