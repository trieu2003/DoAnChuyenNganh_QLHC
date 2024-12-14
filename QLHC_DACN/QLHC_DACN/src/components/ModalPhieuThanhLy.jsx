// // import React from 'react';

// // // Modal Component for PhieuThanhLy Details
// // const ModalPhieuThanhLy = ({ phieu, onClose, onDuyet, onTuChoi }) => {
// //   return (
// //     <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50 transition-all ease-in-out duration-300">
// //       <div className="bg-white p-6 rounded-md w-3/4 shadow-xl transform transition-all ease-in-out duration-300 scale-95 hover:scale-100">
// //         <h2 className="text-xl font-bold mb-4">Chi Tiết Phiếu Thanh Lý</h2>

// //         {/* Bảng chi tiết phiếu thanh lý */}
// //         <table className="min-w-full table-auto text-left">
// //           <thead className="bg-gray-200">
// //             <tr>
// //               <th className="px-4 py-2">Mã Phiếu</th>
// //               <th className="px-4 py-2">Lý Do</th>
// //               <th className="px-4 py-2">Phương Thức Thanh Lý</th>
// //               <th className="px-4 py-2">Ngày Tạo</th>
// //               <th className="px-4 py-2">Tên Người Dùng</th>
// //               <th className="px-4 py-2">Mã Lo</th>
// //               <th className="px-4 py-2">Nhà Cung Cấp</th>
// //               <th className="px-4 py-2">Số Lượng</th>
// //               <th className="px-4 py-2">Hạn Sử Dụng</th>
// //               <th className="px-4 py-2">Trạng Thái Lô</th>
// //               <th className="px-4 py-2">Tên Hóa Chất</th>
// //               <th className="px-4 py-2">Số Lô Hóa Chất</th>
// //               <th className="px-4 py-2">Số CAS</th>
// //               <th className="px-4 py-2">Ngày Duyệt</th>
// //               <th className="px-4 py-2">Trạng Thái Duyệt</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             <tr>
// //               <td className="px-4 py-2">{phieu.maPhieuTL}</td>
// //               <td className="px-4 py-2">{phieu.lyDo}</td>
// //               <td className="px-4 py-2">{phieu.phuongThucThanhLy}</td>
// //               <td className="px-4 py-2">{new Date(phieu.ngayTao).toLocaleDateString()}</td>
// //               <td className="px-4 py-2">{phieu.nguoiDung_TenDangNhap}</td>
// //               <td className="px-4 py-2">{phieu.maLo}</td>
// //               <td className="px-4 py-2">{phieu.nhaCungCap}</td>
// //               <td className="px-4 py-2">{phieu.soLuong}</td>
// //               <td className="px-4 py-2">{new Date(phieu.hanSuDung).toLocaleDateString()}</td>
// //               <td className="px-4 py-2">{phieu.loTrangThai}</td>
// //               <td className="px-4 py-2">{phieu.tenHoaChat}</td>
// //               <td className="px-4 py-2">{phieu.hoaChatSoLo}</td>
// //               <td className="px-4 py-2">{phieu.hoaChatSoCAS}</td>
// //               <td className="px-4 py-2">{new Date(phieu.duyetPhieuTL_NgayDuyet).toLocaleDateString()}</td>
// //               <td className="px-4 py-2">{phieu.duyetPhieuTL_TrangThai}</td>
// //             </tr>
// //           </tbody>
// //         </table>

// //         <div className="mt-4 flex justify-between">
// //           {/* Nút Duyệt Thanh Lý */}
// //           <button
// //             onClick={() => onDuyet(phieu.maPhieuTL)}
// //             className="bg-green-500 text-white px-4 py-2 rounded transition-transform transform hover:scale-105"
// //           >
// //             Duyệt Thanh Lý
// //           </button>
// //           {/* Nút Từ Chối Thanh Lý */}
// //           <button
// //             onClick={() => onTuChoi(phieu.maPhieuTL)}
// //             className="bg-red-500 text-white px-4 py-2 rounded transition-transform transform hover:scale-105"
// //           >
// //             Từ Chối Thanh Lý
// //           </button>
// //         </div>

// //         <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full transition-transform transform hover:scale-105" onClick={onClose}>Đóng</button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ModalPhieuThanhLy;
// import React from 'react';

// const ModalPhieuThanhLy = ({ phieu, onClose, loadingDetail, onDuyet, onTuChoi }) => {
//   if (loadingDetail) {
//     return <div className="modal">Đang tải chi tiết...</div>;
//   }

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2 className="text-2xl font-bold">Chi Tiết Phiếu Thanh Lý: {phieu.maPhieuTL}</h2>
        
//         <table className="min-w-full table-auto mt-4">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 border">Mã Hóa Chất</th>
//               <th className="px-4 py-2 border">Tên Hóa Chất</th>
//               <th className="px-4 py-2 border">Lý Do</th>
//               <th className="px-4 py-2 border">Phương Thức Thanh Lý</th>
//               <th className="px-4 py-2 border">Ngày Tạo</th>
//             </tr>
//           </thead>
//           <tbody>
//             {phieu.hoaChat.map((item) => (
//               <tr key={item.maHoaChat}>
//                 <td className="px-4 py-2 border">{item.maHoaChat}</td>
//                 <td className="px-4 py-2 border">{item.tenHoaChat}</td>
//                 <td className="px-4 py-2 border">{item.lyDo}</td>
//                 <td className="px-4 py-2 border">{item.phuongThucThanhLy}</td>
//                 <td className="px-4 py-2 border">{new Date(item.ngayTao).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="modal-actions mt-4">
//           <button
//             onClick={() => onDuyet(phieu.maPhieuTL)}
//             className="bg-green-500 text-white px-4 py-2 rounded mr-2"
//           >
//             Duyệt
//           </button>
//           <button
//             onClick={() => onTuChoi(phieu.maPhieuTL)}
//             className="bg-red-500 text-white px-4 py-2 rounded"
//           >
//             Từ Chối
//           </button>
//           <button
//             onClick={onClose}
//             className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
//           >
//             Đóng
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

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
              <td className="px-4 py-2 border">{phieu.hinhAnh}</td>
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
