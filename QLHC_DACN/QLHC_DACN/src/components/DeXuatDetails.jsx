import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DeXuatDetails = () => {
  const { maPhieuDX } = useParams(); // Lấy mã phiếu từ URL
  const [chiTietData, setChiTietData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Điều hướng quay lại

  useEffect(() => {
    axios
      .get(`https://localhost:7240/api/DeXuat/details/${maPhieuDX}`)
      .then((response) => {
        setChiTietData(response.data.chiTietDeXuat);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching details:", error);
        setIsLoading(false);
      });
  }, [maPhieuDX]);

  if (isLoading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">
        Chi tiết Phiếu Đề Xuất: {maPhieuDX}
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
              
              <th className="px-4 py-2 text-left">Đơn Giá</th>
            </tr>
          </thead>
          <tbody>
            {chiTietData.map((detail, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{detail.tenHoaChat}</td>
                <td className="px-4 py-2">{detail.soLuong} {detail.donViTinh}</td>
                
                <td className="px-4 py-2">{detail.donGia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">Không có chi tiết đề xuất</p>
      )}
    </div>
  );
};

export default DeXuatDetails;
