import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const DeXuatList = () => {
  const [deXuatData, setDeXuatData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  // Gọi API để lấy dữ liệu
  useEffect(() => {
    axios
      .get('https://localhost:7240/api/DeXuat/all-details')
      .then((response) => {
        setDeXuatData(response.data);  // Lưu dữ liệu vào state
        setIsLoading(false);  // Đổi trạng thái khi đã lấy dữ liệu
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);
  const handleViewDetails = (maPhieuDX) => {
    navigate(`/purchase-request/details/${maPhieuDX}`);
  };

  // Xử lý sự kiện thêm mới
  const handleAdd = () => {
    // Chuyển hướng tới trang thêm mới
    window.location.href = '/purchase-request/add';  // Hoặc sử dụng React Router
  };

  // Xử lý sự kiện sửa
  const handleEdit = (maPhieuDX) => {
    // Chuyển hướng tới trang sửa với tham số maPhieuDX
    navigate(`/purchase-request/edit/${maPhieuDX}`);
  };

  if (isLoading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Danh sách Đề xuất</h1>
      
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          onClick={handleAdd}
        >
          Thêm Mới
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Mã Phiếu Đề Xuất</th>
            <th className="px-4 py-2 text-left">Lý Do</th>
            <th className="px-4 py-2 text-left">Trạng Thái</th>
            <th className="px-4 py-2 text-left">Ngày Tạo</th>
            <th className="px-4 py-2 text-left">Hành động</th>
            {/* <th className="px-4 py-2 text-left">Hành Động</th> */}
          </tr>
        </thead>
        <tbody>
          {deXuatData.map((item) => (
            <tr key={item.maPhieuDX} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{item.maPhieuDX}</td>
              <td className="px-4 py-2">{item.lyDo}</td>
              <td className="px-4 py-2">{item.trangThai}</td>
              <td className="px-4 py-2">{new Date(item.ngayTao).toLocaleString()}</td>
              <td className="px-4 py-2">
                {/* {item.chiTietDeXuat.length > 0 ? (
                  item.chiTietDeXuat.map((detail, index) => (
                    <div key={index}>
                      Hóa chất {detail.tenHoaChat} - Số lượng: {detail.soLuong} lọ - Đơn giá: {detail.donGia}
                    </div>
                  ))
                ) : (
                  <span>Không có chi tiết</span>
                )} */}
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  onClick={() => handleViewDetails(item.maPhieuDX)}
                >
                  Xem chi tiết
                </button>
                {/* <button className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
                onClick={() => handleEdit(item.maPhieuDX)}
                >
                  Chỉnh sửa
                  </button> */}
              </td>
              {/* <td className="px-4 py-2">
                <button
                  className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
                  onClick={() => handleEdit(item.maPhieuDX)}
                >
                  Sửa
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeXuatList;
