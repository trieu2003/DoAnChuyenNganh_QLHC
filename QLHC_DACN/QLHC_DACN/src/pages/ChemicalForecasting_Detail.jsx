import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ChemicalForecastingDetail = () => {
  const { selectedMaMon } = useParams();
  const [baiThiNghiemData, setBaiThiNghiemData] = useState([]);
  const [trangThai, setTrangThai] = useState(""); // Trạng thái phiếu
  const [lyDoTuChoi, setLyDoTuChoi] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://localhost:7240/api/DuTru/detail/${selectedMaMon}`)
      .then((response) => {
        const data = response.data;
        setBaiThiNghiemData(response.data);
        setTrangThai(data.trangThai); // Lưu trạng thái
        setLyDoTuChoi(data.lyDoTuChoi); // Lưu lý do từ chối nếu có
        setLoading(false);
      })
      .catch((err) => {
        setError("Lỗi khi tải dữ liệu");
        setLoading(false);
      });
  }, [selectedMaMon]);

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <button
        className="mb-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
        onClick={() => navigate(-1)} // Quay lại trang trước
      >
        Quay lại
      </button>

      {/* Hiển thị lý do từ chối nếu trạng thái là 'Từ chối' */}

      <h1 className="text-2xl font-bold text-center mb-6">
        Chi Tiết Dự Trù Hóa Chất
      </h1>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : baiThiNghiemData.length > 0 ? (
        baiThiNghiemData.map((baiThiNghiem, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-lg font-bold mb-4">
              Bài Thí Nghiệm: {baiThiNghiem.tenBaiTN}
            </h2>
            <h2 className="text-lg font-bold mb-4">
              Trạng Thái: {baiThiNghiem.trangThai}
            </h2>
            {baiThiNghiem.trangThai === "Từ chối" && (
              <div className="mb-4 p-4 bg-red-100 text-red-800 rounded">
                <strong>Lý do từ chối:</strong>{" "}
                {baiThiNghiem.lyDoTuChoi || "Không có lý do cụ thể"}
              </div>
            )}
            <h3 className="text-md font-bold mb-2">Hóa Chất Dự Trù:</h3>
            {baiThiNghiem.duTru.length > 0 ? (
              <table className="w-full border-collapse border border-gray-300 bg-white shadow-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-3 text-left">
                      Tên Hóa Chất
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      Số Lượng
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      Đơn Vị
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {baiThiNghiem.duTru.map((duTru, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-3">
                        {duTru.hoaChat?.tenHoaChat || "Không xác định"}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {duTru.soLuong}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {duTru.hoaChat?.donVi}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">Không có hóa chất dự trù.</p>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">Không có bài thí nghiệm nào.</p>
      )}
    </div>
  );
};

export default ChemicalForecastingDetail;
