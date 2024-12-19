// export default ModalPhieuThanhLy;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModalPhieuThanhLy = ({ maPhieuTL, onClose, onDuyet, onTuChoi }) => {
  const [phieuThanhLyDetails, setPhieuThanhLyDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhieuThanhLyDetails = async () => {
      try {
        // Gọi API theo mã phiếu thanh lý (maPhieuTL) hoặc sử dụng hoaChatSoCAS làm khóa
        const response = await axios.get(`https://localhost:7240/api/PhieuThanhLy/${maPhieuTL}`);
        setPhieuThanhLyDetails(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        setError('Không thể tải chi tiết phiếu thanh lý');
        setLoading(false);
      }
    };

    if (maPhieuTL) {
      fetchPhieuThanhLyDetails();
    }
  }, [maPhieuTL]);

  if (loading) return <div>Đang tải chi tiết...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

    const duongdananh=   "/src/assets/Images/";
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Xem chi tiết phiếu thanh lý {maPhieuTL}</h2>

      <table className="min-w-full table-auto mb-6">
        <thead className="bg-gray-100">
          <tr>
            {/* <th className="px-4 py-2 border">Mã Phiếu</th>
            <th className="px-4 py-2 border">Lý Do</th>
            <th className="px-4 py-2 border">Trạng Thái</th>
            <th className="px-4 py-2 border">Phương Thức Thanh Lý</th>
            <th className="px-4 py-2 border">Ngày Tạo</th> */}
            {/* <th className="px-4 py-2 border">Mã người dùng</th> */}
            <th className="px-4 py-2 border">Tên đăng nhập người tạo</th>
            {/* <th className="px-4 py-2 border">Email người tạo</th> */}
            <th className="px-4 py-2 border">Mã lô</th>
            <th className="px-4 py-2 border">Nhà Cung Cấp</th>
            <th className="px-4 py-2 border">Số lượng  </th>
            <th className="px-4 py-2 border">Số lượng Tồn </th>
            <th className="px-4 py-2 border">Hạn Sử Dụng</th>
            <th className="px-4 py-2 border">Trạng thái Lô</th>
            <th className="px-4 py-2 border">Tên Hóa Chất</th>
            <th className="px-4 py-2 border">Ghi chú</th>
            <th className="px-4 py-2 border">Đơn vị</th>
            <th className="px-4 py-2 border">Hình ảnh </th>
            <th className="px-4 py-2 border">Mô tả</th>
            <th className="px-4 py-2 border">Nguy hiểm</th>
            <th className="px-4 py-2 border">Số liệu an toàn</th>
            <th className="px-4 py-2 border">Hóa chất Số Lô</th>
            <th className="px-4 py-2 border">Hóa chất Số CAS</th>
            {/* <th className="px-4 py-2 border">Mã người duyệt phiếu</th> */}
            <th className="px-4 py-2 border">Ngày duyệt phiếu</th>
            {/* <th className="px-4 py-2 border">Trạng thái duyệt phiếu</th> */}
            
          </tr>
        </thead>
        <tbody>
          {phieuThanhLyDetails && phieuThanhLyDetails.map((phieu) => (
            <tr key={phieu.hoaChatSoCAS} className="hover:bg-gray-50">
              {/* <td className="px-4 py-2 border">{phieu.maPhieuTL}</td>
              <td className="px-4 py-2 border">{phieu.lyDo}</td>
              <td className="px-4 py-2 border">{phieu.trangThai}</td>
              <td className="px-4 py-2 border">{phieu.phuongThucThanhLy}</td>
              <td className="px-4 py-2 border">{new Date(phieu.ngayTao).toLocaleDateString()}</td> */}
              {/* <td className="px-4 py-2 border">{phieu.maNguoiDung}</td> */}
              <td className="px-4 py-2 border">{phieu.nguoiDung_TenDangNhap}</td>
              {/* <td className="px-4 py-2 border">{phieu.nguoiDung_Email}</td> */}
              <td className="px-4 py-2 border">{phieu.maLo}</td>
              <td className="px-4 py-2 border">{phieu.nhaCungCap}</td>
              <td className="px-4 py-2 border">{phieu.soLuong}</td>
              <td className="px-4 py-2 border">{phieu.soLuongTon}</td>
              <td className="px-4 py-2 border">{phieu.hanSuDung}</td>
              <td className="px-4 py-2 border">{phieu.loTrangThai}</td>
              <td className="px-4 py-2 border">{phieu.tenHoaChat}</td>
              <td className="px-4 py-2 border">{phieu.ghiChu}</td>
              <td className="px-4 py-2 border">{phieu.donVi}</td>   
              <td className="px-4 py-2 border"><img  src={`src/assets/Images/${phieu.hinhAnh}`} alt ="${phieu.hinhAnh}"></img></td>
             
              <td className="px-4 py-2 border">{phieu.moTa}</td>
              <td className="px-4 py-2 border">{phieu.nguyHiem}</td>
              <td className="px-4 py-2 border">{phieu.soLieuAnToan}</td>
              <td className="px-4 py-2 border">{phieu.hoaChatSoLo}</td>
              <td className="px-4 py-2 border">{phieu.hoaChatSoCAS}</td>

             
              
              {/* <td className="px-4 py-2 border">{phieu.duyetPhieuTL_MaNguoiDung}</td> */}
              <td className="px-4 py-2 border">{new Date(phieu.duyetPhieuTL_NgayDuyet).toLocaleDateString()}</td>
              {/* <td className="px-4 py-2 border">{phieu.duyetPhieuTL_TrangThai}</td>  */}
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModalPhieuThanhLy;
