import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DuTruDetails = () => {
  const { maBaiTN } = useParams(); // Lấy mã phiếu từ URL
  const [chiTietData, setChiTietData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Điều hướng quay lại
  //const location = useLocation(); // Lấy dữ liệu từ state khi điều hướng
  //const selectedMaMon = location.state?.selectedMaMon || ""; // Nhận selectedMaMon từ state hoặc để trống nếu không có

  useEffect(() => {
    axios
      .get(`https://localhost:7240/api/DuTru/baitn/${maBaiTN}`)
      .then((response) => {
        setChiTietData(response.data || []); // Use response.data directly since it's an array
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching details:", error);
        setChiTietData([]); // Reset to empty on error
        setIsLoading(false);
      });
  }, [maBaiTN]);
  

  if (isLoading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">
        Chi tiết Dự trù của bài thí nghiệm: {} {maBaiTN}
      </h1>

      <button
        className="mb-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
        onClick={() => navigate(-1)} // Quay lại trang trước
      >
        Quay lại
      </button>

      {chiTietData.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">STT</th>
              <th className="px-4 py-2 text-left">Tên Hóa Chất</th>
              <th className="px-4 py-2 text-left">Số Lượng</th>
            </tr>
          </thead>
          <tbody>
            {chiTietData.map((detail, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{detail.hoaChat.tenHoaChat}</td>
                <td className="px-4 py-2">{detail.soLuong} {detail.hoaChat.donVi}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">Bài thí nghiệm này chưa có dự trù</p>
      )}
    </div>
  );
};

export default DuTruDetails;
