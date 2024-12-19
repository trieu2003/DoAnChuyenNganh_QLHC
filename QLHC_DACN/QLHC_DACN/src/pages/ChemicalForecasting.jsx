import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChemicalForecasting = () => {
  const [monHocs, setMonHocs] = useState([]);
  const [selectedMaMon, setSelectedMaMon] = useState("");
  const [lopHocPhans, setLopHocPhans] = useState([]);
  const [thongKeDuTru, setThongKeDuTru] = useState([]);
  const [showThongKe, setShowThongKe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMonHocs = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7240/api/DuTru/monhoc"
        );
        setMonHocs(response.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách môn học:", err);
        setError("Không thể tải danh sách môn học.");
      }
    };
    fetchMonHocs();
  }, []);

  const fetchLopHocPhans = async (maMon) => {
    if (!maMon) return;
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://localhost:7240/api/DuTru/lophocphan/${maMon}`
      );
      setLopHocPhans(response.data);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách lớp học phần:", err);
      setError("Không thể tải danh sách lớp học phần.");
    } finally {
      setLoading(false);
    }
  };
  
  const fetchThongKeDuTru = async (maMon) => {
    if (!maMon) return;
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://localhost:7240/api/DuTru/thongkeTongSL/${maMon}`
      );
      setThongKeDuTru(response.data);
      setShowThongKe(true); // Hiển thị bảng thống kê
    } catch (err) {
      // console.error("Lỗi khi lấy thống kê hóa chất dự trù:", err);
      // setError("Không thể tải thống kê hóa chất.");
      if (error.response && error.response.status === 404) {
        setErrorMessage("Chưa có bài thí nghiệm nào được xác nhận");
      } else {
        setErrorMessage("Có lỗi xảy ra khi tải dữ liệu");
      }
      setThongKeDuTru([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMonHocChange = (e) => {
    const maMon = e.target.value;
    setSelectedMaMon(maMon);

    if (maMon) {
      fetchLopHocPhans(maMon); // Lấy danh sách lớp học phần
      fetchThongKeDuTru(maMon); // Gọi thống kê hóa chất
    }

    setShowThongKe(false); // Ẩn bảng thống kê khi chưa có dữ liệu
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">
        Dự trù hoá chất cho môn học
      </h1>

      {/* Dropdown chọn môn học */}
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-col w-full md:w-1/3">
          <label htmlFor="monHoc" className="block font-semibold mb-2">
            Chọn môn học
          </label>
          <select
            id="monHoc"
            value={selectedMaMon}
            onChange={handleMonHocChange}
            className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">-- Chọn môn học --</option>
            {monHocs.map((monHoc) => (
              <option key={monHoc.maMon} value={monHoc.maMon}>
                {monHoc.tenMon}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Các nút tạo bài thí nghiệm và xem chi tiết */}
      <div className="flex justify-between mt-6">
        {/* Nút Tạo Bài Thí Nghiệm */}
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={() => navigate(`/chemical-forecasting/add/${selectedMaMon}`)}
          disabled={!selectedMaMon}
        >
          Tạo Dự Trù Bài Thí Nghiệm
        </button>

        {/* Nút Xem Chi Tiết */}
        <button
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          onClick={() =>
            navigate(`/chemical-forecasting/details/${selectedMaMon}`)
          }
          disabled={!selectedMaMon}
        >
          Xem Chi Tiết
        </button>
      </div>
      {/* Bảng danh sách lớp học phần */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Danh sách lớp học phần</h2>
        {loading ? (
          <p className="text-blue-500">Đang tải dữ liệu...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 bg-white shadow-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-3 text-left">
                    Mã LHP
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Giảng viên
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Sĩ số
                  </th>
                </tr>
              </thead>
              <tbody>
                {lopHocPhans.map((lopHocPhan) => (
                  <tr key={lopHocPhan.maLHP} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-3">
                      {lopHocPhan.maLHP}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {lopHocPhan.gvDay}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {lopHocPhan.siSo}
                    </td>
                  </tr>
                ))}
                {lopHocPhans.length === 0 && (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center p-4 border border-gray-300"
                    >
                      Không có lớp học phần nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Bảng thống kê hóa chất */}
      {thongKeDuTru.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">Thống kê hóa chất dự trù</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 bg-white shadow-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-3 text-left">
                    Tên hóa chất
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Số lượng
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Đơn vị
                  </th>
                </tr>
              </thead>
              <tbody>
                {thongKeDuTru.map((item) => (
                  <tr key={item.maHoaChat} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-3">
                      {item.hoaChat?.tenHoaChat || "Không xác định"}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {item.tongSoLuong}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {item.hoaChat?.donVi || "Không xác định"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChemicalForecasting;
