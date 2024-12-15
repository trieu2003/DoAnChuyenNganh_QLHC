// // // // // // // // // // // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // // // // // // // // // // import axios from 'axios';

// // // // // // // // // // // // // // // // // // // const PhieuThanhLyList = ({ onEdit }) => {
// // // // // // // // // // // // // // // // // // //   const [phieuThanhLys, setPhieuThanhLys] = useState([]);
// // // // // // // // // // // // // // // // // // //   const [loading, setLoading] = useState(true);  // Thêm trạng thái loading để hiển thị khi đang tải dữ liệu
// // // // // // // // // // // // // // // // // // //   const [error, setError] = useState(null); // Trạng thái lỗi

// // // // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // // // //     const fetchData = async () => {
// // // // // // // // // // // // // // // // // // //       try {
// // // // // // // // // // // // // // // // // // //         const response = await axios.get('https://localhost:7240/api/PhieuThanhLy');
// // // // // // // // // // // // // // // // // // //         console.log('Dữ liệu từ API:', response.data); // Kiểm tra xem dữ liệu có hợp lệ không
// // // // // // // // // // // // // // // // // // //         setPhieuThanhLys(response.data); // Cập nhật dữ liệu vào state
// // // // // // // // // // // // // // // // // // //         setLoading(false);  // Dữ liệu đã được tải xong

// // // // // // // // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // // // // // // // //         setError('Không thể tải dữ liệu');  // Xử lý lỗi nếu có
// // // // // // // // // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // // // // //     fetchData(); // Gọi API khi component mount
// // // // // // // // // // // // // // // // // // //   }, []); // Chỉ gọi API 1 lần khi component mount

// // // // // // // // // // // // // // // // // // //   // Hàm xử lý xóa phiếu thanh lý
// // // // // // // // // // // // // // // // // // //   const handleDelete = async (maPhieuTL) => {
// // // // // // // // // // // // // // // // // // //     if (window.confirm("Bạn có chắc chắn muốn xóa phiếu thanh lý này?")) {
// // // // // // // // // // // // // // // // // // //       try {
// // // // // // // // // // // // // // // // // // //         // Gọi API xóa phiếu thanh lý
// // // // // // // // // // // // // // // // // // //         await axios.delete(`https://localhost:7240/api/PhieuThanhLy/${maPhieuTL}`);
        
// // // // // // // // // // // // // // // // // // //         // Xóa phiếu thanh lý khỏi danh sách hiển thị
// // // // // // // // // // // // // // // // // // //         setPhieuThanhLys(phieuThanhLys.filter(phieu => phieu.maPhieuTL !== maPhieuTL));
// // // // // // // // // // // // // // // // // // //         alert('Xóa phiếu thanh lý thành công');
// // // // // // // // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // // // // // // // //         console.error("Có lỗi khi xóa phiếu thanh lý:", error);
// // // // // // // // // // // // // // // // // // //         alert("Không thể xóa phiếu thanh lý.");
// // // // // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // // // //   // Hiển thị loading hoặc lỗi nếu cần
// // // // // // // // // // // // // // // // // // //   if (loading) return <div>Loading...</div>;
// // // // // // // // // // // // // // // // // // //   if (error) return <div>{error}</div>;

// // // // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // // // //     <div className="overflow-x-auto relative">
// // // // // // // // // // // // // // // // // // //       <table className="min-w-full table-auto text-left">
// // // // // // // // // // // // // // // // // // //         <thead>
// // // // // // // // // // // // // // // // // // //           <tr className="bg-gray-200">
// // // // // // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Mã Phiếu</th>
// // // // // // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Lý Do</th>
// // // // // // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Trạng Thái</th>
// // // // // // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Phương Thức Thanh Lý</th>
// // // // // // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Mã Người Dùng</th>

// // // // // // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Hành Động</th>
// // // // // // // // // // // // // // // // // // //           </tr>
// // // // // // // // // // // // // // // // // // //         </thead>
// // // // // // // // // // // // // // // // // // //         <tbody>
// // // // // // // // // // // // // // // // // // //           {phieuThanhLys.length > 0 ? (
// // // // // // // // // // // // // // // // // // //             phieuThanhLys.map((phieu) => (
// // // // // // // // // // // // // // // // // // //               <tr key={phieu.maPhieuTL}>
// // // // // // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.maPhieuTL}</td>
// // // // // // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.lyDo}</td>
// // // // // // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.trangThai}</td>
// // // // // // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.phuongThucThanhLy}</td>
// // // // // // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.maNguoiDung}</td>

// // // // // // // // // // // // // // // // // // //                 <td className="px-4 py-2">
// // // // // // // // // // // // // // // // // // //                   <button
// // // // // // // // // // // // // // // // // // //                     onClick={() => onEdit(phieu)}
// // // // // // // // // // // // // // // // // // //                     className="bg-yellow-500 text-white px-4 py-2 rounded"
// // // // // // // // // // // // // // // // // // //                   >
// // // // // // // // // // // // // // // // // // //                     Chỉnh Sửa
// // // // // // // // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // // // // // // // //                   <button
// // // // // // // // // // // // // // // // // // //                     onClick={() => handleDelete(phieu.maPhieuTL)}
// // // // // // // // // // // // // // // // // // //                     className="bg-red-500 text-white px-4 py-2 ml-2 rounded"
// // // // // // // // // // // // // // // // // // //                   >
// // // // // // // // // // // // // // // // // // //                     Xóa
// // // // // // // // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // // // // // // // //                 </td>
// // // // // // // // // // // // // // // // // // //               </tr>
// // // // // // // // // // // // // // // // // // //             ))
// // // // // // // // // // // // // // // // // // //           ) : (
// // // // // // // // // // // // // // // // // // //             <tr>
// // // // // // // // // // // // // // // // // // //               <td colSpan="5" className="text-center px-4 py-2">
// // // // // // // // // // // // // // // // // // //                 Không có dữ liệu
// // // // // // // // // // // // // // // // // // //               </td>
// // // // // // // // // // // // // // // // // // //             </tr>
// // // // // // // // // // // // // // // // // // //           )}
// // // // // // // // // // // // // // // // // // //         </tbody>
// // // // // // // // // // // // // // // // // // //       </table>
// // // // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // // export default PhieuThanhLyList;
// // // // // // // // // // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // // // // // // // // // import axios from 'axios';

// // // // // // // // // // // // // // // // // // const PhieuThanhLyList = ({ onEdit }) => {
// // // // // // // // // // // // // // // // // //   const [phieuThanhLys, setPhieuThanhLys] = useState([]);
// // // // // // // // // // // // // // // // // //   const [loading, setLoading] = useState(true);  // Thêm trạng thái loading để hiển thị khi đang tải dữ liệu
// // // // // // // // // // // // // // // // // //   const [error, setError] = useState(null); // Trạng thái lỗi

// // // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // // //     const fetchData = async () => {
// // // // // // // // // // // // // // // // // //       try {
// // // // // // // // // // // // // // // // // //         const response = await axios.get('https://localhost:7240/api/PhieuThanhLy');
// // // // // // // // // // // // // // // // // //         console.log('Dữ liệu từ API:', response.data); // Kiểm tra xem dữ liệu có hợp lệ không
// // // // // // // // // // // // // // // // // //         setPhieuThanhLys(response.data); // Cập nhật dữ liệu vào state
// // // // // // // // // // // // // // // // // //         setLoading(false);  // Dữ liệu đã được tải xong
// // // // // // // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // // // // // // //         setError('Không thể tải dữ liệu');  // Xử lý lỗi nếu có
// // // // // // // // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // // // //     fetchData(); // Gọi API khi component mount
// // // // // // // // // // // // // // // // // //   }, []); // Chỉ gọi API 1 lần khi component mount

// // // // // // // // // // // // // // // // // //   // Hàm xử lý cập nhật trạng thái phiếu thanh lý (thay vì xóa)
// // // // // // // // // // // // // // // // // //   const handleDelete = async (maPhieuTL) => {
// // // // // // // // // // // // // // // // // //     if (window.confirm("Bạn có chắc chắn muốn cập nhật trạng thái 'Đã xóa' cho phiếu thanh lý này?")) {
// // // // // // // // // // // // // // // // // //       try {
// // // // // // // // // // // // // // // // // //         // Cập nhật trạng thái thành "Đã xóa"
// // // // // // // // // // // // // // // // // //         const updatedData = { trangThai: "Đã xóa" };

// // // // // // // // // // // // // // // // // //         // Gọi API để cập nhật trạng thái phiếu thanh lý
// // // // // // // // // // // // // // // // // //         await axios.put(`https://localhost:7240/api/PhieuThanhLy/${maPhieuTL}`, updatedData);

// // // // // // // // // // // // // // // // // //         // Cập nhật danh sách phiếu thanh lý sau khi thay đổi trạng thái
// // // // // // // // // // // // // // // // // //         setPhieuThanhLys(
// // // // // // // // // // // // // // // // // //           phieuThanhLys.map((phieu) =>
// // // // // // // // // // // // // // // // // //             phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: "Đã xóa" } : phieu
// // // // // // // // // // // // // // // // // //           )
// // // // // // // // // // // // // // // // // //         );
        
// // // // // // // // // // // // // // // // // //         alert('Cập nhật trạng thái phiếu thanh lý thành công');
// // // // // // // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // // // // // // //         console.error("Có lỗi khi cập nhật trạng thái phiếu thanh lý:", error);
// // // // // // // // // // // // // // // // // //         alert("Không thể cập nhật trạng thái phiếu thanh lý.");
// // // // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // // //   // Hiển thị loading hoặc lỗi nếu cần
// // // // // // // // // // // // // // // // // //   if (loading) return <div>Loading...</div>;
// // // // // // // // // // // // // // // // // //   if (error) return <div>{error}</div>;

// // // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // // //     <div className="overflow-x-auto relative">
// // // // // // // // // // // // // // // // // //       <table className="min-w-full table-auto text-left">
// // // // // // // // // // // // // // // // // //         <thead>
// // // // // // // // // // // // // // // // // //           <tr className="bg-gray-200">
// // // // // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Mã Phiếu</th>
// // // // // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Lý Do</th>
// // // // // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Trạng Thái</th>
// // // // // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Phương Thức Thanh Lý</th>
// // // // // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Mã Người Dùng</th>

// // // // // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Hành Động</th>
// // // // // // // // // // // // // // // // // //           </tr>
// // // // // // // // // // // // // // // // // //         </thead>
// // // // // // // // // // // // // // // // // //         <tbody>
// // // // // // // // // // // // // // // // // //           {phieuThanhLys.length > 0 ? (
// // // // // // // // // // // // // // // // // //             phieuThanhLys.map((phieu) => (
// // // // // // // // // // // // // // // // // //               <tr key={phieu.maPhieuTL}>
// // // // // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.maPhieuTL}</td>
// // // // // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.lyDo}</td>
// // // // // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.trangThai}</td>
// // // // // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.phuongThucThanhLy}</td>
// // // // // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.maNguoiDung}</td>

// // // // // // // // // // // // // // // // // //                 <td className="px-4 py-2">
// // // // // // // // // // // // // // // // // //                   <button
// // // // // // // // // // // // // // // // // //                     onClick={() => onEdit(phieu)}
// // // // // // // // // // // // // // // // // //                     className="bg-yellow-500 text-white px-4 py-2 rounded"
// // // // // // // // // // // // // // // // // //                   >
// // // // // // // // // // // // // // // // // //                     Chỉnh Sửa
// // // // // // // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // // // // // // //                   <button
// // // // // // // // // // // // // // // // // //                     onClick={() => handleDelete(phieu.maPhieuTL)}
// // // // // // // // // // // // // // // // // //                     className="bg-red-500 text-white px-4 py-2 ml-2 rounded"
// // // // // // // // // // // // // // // // // //                   >
// // // // // // // // // // // // // // // // // //                     Cập Nhật Trạng Thái
// // // // // // // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // // // // // // //                 </td>
// // // // // // // // // // // // // // // // // //               </tr>
// // // // // // // // // // // // // // // // // //             ))
// // // // // // // // // // // // // // // // // //           ) : (
// // // // // // // // // // // // // // // // // //             <tr>
// // // // // // // // // // // // // // // // // //               <td colSpan="5" className="text-center px-4 py-2">
// // // // // // // // // // // // // // // // // //                 Không có dữ liệu
// // // // // // // // // // // // // // // // // //               </td>
// // // // // // // // // // // // // // // // // //             </tr>
// // // // // // // // // // // // // // // // // //           )}
// // // // // // // // // // // // // // // // // //         </tbody>
// // // // // // // // // // // // // // // // // //       </table>
// // // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // export default PhieuThanhLyList;
// // // // // // // // // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // // // // // // // // import axios from 'axios';

// // // // // // // // // // // // // // // // // const PhieuThanhLyList = ({ onEdit }) => {
// // // // // // // // // // // // // // // // //   const [phieuThanhLys, setPhieuThanhLys] = useState([]);
// // // // // // // // // // // // // // // // //   const [loading, setLoading] = useState(true);  // Thêm trạng thái loading để hiển thị khi đang tải dữ liệu
// // // // // // // // // // // // // // // // //   const [error, setError] = useState(null); // Trạng thái lỗi
 
// // // // // // // // // // // // // // // // //   //Lấy mã người dùng từ localStorage, và đảm bảo nó là số (dùng parseInt)
// // // // // // // // // // // // // // // // //   const [userMaNguoiDung, setUserMaNguoiDung] = useState(parseInt(localStorage.getItem("maNguoiDung"))); // Lấy mã người dùng từ localStorage
// // // // // // // // // // // // // // // // //   const [userUsername, setUserName] = useState(parseInt(localStorage.getItem("username"))); // Lấy mã người dùng từ localStorage
  
// // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // //     const fetchData = async () => {
// // // // // // // // // // // // // // // // //       try {
// // // // // // // // // // // // // // // // //         const response = await axios.get('https://localhost:7240/api/PhieuThanhLy');
// // // // // // // // // // // // // // // // //         console.log('Dữ liệu từ API:', response.data); // Kiểm tra xem dữ liệu có hợp lệ không
// // // // // // // // // // // // // // // // //         setPhieuThanhLys(response.data); // Cập nhật dữ liệu vào state
// // // // // // // // // // // // // // // // //         setLoading(false);  // Dữ liệu đã được tải xong
// // // // // // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // // // // // //         setError('Không thể tải dữ liệu');  // Xử lý lỗi nếu có
// // // // // // // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // // //     fetchData(); // Gọi API khi component mount
// // // // // // // // // // // // // // // // //   }, []); // Chỉ gọi API 1 lần khi component mount

// // // // // // // // // // // // // // // // //   // Hàm xử lý cập nhật trạng thái phiếu thanh lý (thay vì xóa)
// // // // // // // // // // // // // // // // //   const handleDelete = async (maPhieuTL, maNguoiDung) => {
// // // // // // // // // // // // // // // // //     if (parseInt(maNguoiDung) !== userMaNguoiDung) {
// // // // // // // // // // // // // // // // //       alert("Bạn không có quyền cập nhật trạng thái phiếu thanh lý này.");
// // // // // // // // // // // // // // // // //       return;
// // // // // // // // // // // // // // // // //     }
  
// // // // // // // // // // // // // // // // //     if (window.confirm("Bạn có chắc chắn muốn cập nhật trạng thái 'Đã xóa' cho phiếu thanh lý này?")) {
// // // // // // // // // // // // // // // // //       try {
// // // // // // // // // // // // // // // // //         // Dữ liệu cần gửi
// // // // // // // // // // // // // // // // //         const updatedData = {
// // // // // // // // // // // // // // // // //           maNguoiDung: userMaNguoiDung // Mã người dùng từ localStorage hoặc session
// // // // // // // // // // // // // // // // //         };
  
// // // // // // // // // // // // // // // // //         // Gửi yêu cầu PUT để cập nhật trạng thái
// // // // // // // // // // // // // // // // //         await axios.put(`https://localhost:7240/api/PhieuThanhLy/update-status/${maPhieuTL}`, updatedData);
  
// // // // // // // // // // // // // // // // //         // Cập nhật danh sách phiếu thanh lý trong giao diện người dùng
// // // // // // // // // // // // // // // // //         setPhieuThanhLys(phieuThanhLys.map((phieu) =>
// // // // // // // // // // // // // // // // //           phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: "Đã xóa" } : phieu
// // // // // // // // // // // // // // // // //         ));
  
// // // // // // // // // // // // // // // // //         alert('Cập nhật trạng thái phiếu thanh lý thành công');
// // // // // // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // // // // // //         console.error("Có lỗi khi cập nhật trạng thái phiếu thanh lý:", error);
// // // // // // // // // // // // // // // // //         alert("Không thể cập nhật trạng thái phiếu thanh lý.");
// // // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // //   };
  
  

// // // // // // // // // // // // // // // // //   // Hiển thị loading hoặc lỗi nếu cần
// // // // // // // // // // // // // // // // //   if (loading) return <div>Loading...</div>;
// // // // // // // // // // // // // // // // //   if (error) return <div>{error}</div>;

// // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // //     <div className="overflow-x-auto relative">
// // // // // // // // // // // // // // // // //       <table className="min-w-full table-auto text-left">
// // // // // // // // // // // // // // // // //         <thead>
// // // // // // // // // // // // // // // // //           <tr className="bg-gray-200">
// // // // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Mã Phiếu</th>
// // // // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Lý Do</th>
// // // // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Trạng Thái</th>
// // // // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Phương Thức Thanh Lý</th>
// // // // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Mã Người Dùng</th>

// // // // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Hành Động</th>
// // // // // // // // // // // // // // // // //           </tr>
// // // // // // // // // // // // // // // // //         </thead>
// // // // // // // // // // // // // // // // //         <tbody>
// // // // // // // // // // // // // // // // //           {phieuThanhLys.length > 0 ? (
// // // // // // // // // // // // // // // // //             phieuThanhLys.map((phieu) => (
// // // // // // // // // // // // // // // // //               <tr key={phieu.maPhieuTL}>
// // // // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.maPhieuTL}</td>
// // // // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.lyDo}</td>
// // // // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.trangThai}</td>
// // // // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.phuongThucThanhLy}</td>
// // // // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.maNguoiDung}</td>

// // // // // // // // // // // // // // // // //                 <td className="px-4 py-2">
// // // // // // // // // // // // // // // // //                   <button
// // // // // // // // // // // // // // // // //                     onClick={() => onEdit(phieu)}
// // // // // // // // // // // // // // // // //                     className="bg-yellow-500 text-white px-4 py-2 rounded"
// // // // // // // // // // // // // // // // //                   >
// // // // // // // // // // // // // // // // //                     Chỉnh Sửa
// // // // // // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // // // // // //                   <button
// // // // // // // // // // // // // // // // //                     onClick={() => handleDelete(phieu.maPhieuTL, phieu.maNguoiDung)}
// // // // // // // // // // // // // // // // //                     className="bg-red-500 text-white px-4 py-2 ml-2 rounded"
// // // // // // // // // // // // // // // // //                   >
// // // // // // // // // // // // // // // // //                     Cập Nhật Trạng Thái
// // // // // // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // // // // // //                 </td>
// // // // // // // // // // // // // // // // //               </tr>
// // // // // // // // // // // // // // // // //             ))
// // // // // // // // // // // // // // // // //           ) : (
// // // // // // // // // // // // // // // // //             <tr>
// // // // // // // // // // // // // // // // //               <td colSpan="5" className="text-center px-4 py-2">
// // // // // // // // // // // // // // // // //                 Không có dữ liệu
// // // // // // // // // // // // // // // // //               </td>
// // // // // // // // // // // // // // // // //             </tr>
// // // // // // // // // // // // // // // // //           )}
// // // // // // // // // // // // // // // // //         </tbody>
// // // // // // // // // // // // // // // // //       </table>
// // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // export default PhieuThanhLyList;
// // // // // // // // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // // // // // // // import axios from 'axios';

// // // // // // // // // // // // // // // // const PhieuThanhLyList = () => {
// // // // // // // // // // // // // // // //   const [phieuThanhLys, setPhieuThanhLys] = useState([]);
// // // // // // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // // // // // //   const [error, setError] = useState(null);

// // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // //     const fetchData = async () => {
// // // // // // // // // // // // // // // //       try {
// // // // // // // // // // // // // // // //         const response = await axios.get('https://localhost:7240/api/PhieuThanhLy');
// // // // // // // // // // // // // // // //         setPhieuThanhLys(response.data);
// // // // // // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // // // // //         setError('Không thể tải dữ liệu');
// // // // // // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // //     fetchData();
// // // // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // // // //   if (loading) return <div>Loading...</div>;
// // // // // // // // // // // // // // // //   if (error) return <div>{error}</div>;

// // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // //     <div className="overflow-x-auto relative">
// // // // // // // // // // // // // // // //       <table className="min-w-full table-auto text-left">
// // // // // // // // // // // // // // // //         <thead>
// // // // // // // // // // // // // // // //           <tr className="bg-gray-200">
// // // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Mã Phiếu</th>
// // // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Lý Do</th>
// // // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Trạng Thái</th>
// // // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Phương Thức Thanh Lý</th>
// // // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Tên Người Dùng</th>
// // // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Thông Tin Lô Hóa Chất</th>
// // // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Thông Tin Duyệt Phiếu</th>
// // // // // // // // // // // // // // // //           </tr>
// // // // // // // // // // // // // // // //         </thead>
// // // // // // // // // // // // // // // //         <tbody>
// // // // // // // // // // // // // // // //           {phieuThanhLys.length > 0 ? (
// // // // // // // // // // // // // // // //             phieuThanhLys.map((phieu) => (
// // // // // // // // // // // // // // // //               <tr key={phieu.maPhieuTL}>
// // // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.maPhieuTL}</td>
// // // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.lyDo}</td>
// // // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.trangThai}</td>
// // // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.phuongThucThanhLy}</td>
// // // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.nguoiDung_TenDangNhap}</td>
// // // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.nhaCungCap}</td>
// // // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.duyetPhieuTL_NgayDuyet}</td>
// // // // // // // // // // // // // // // //               </tr>
// // // // // // // // // // // // // // // //             ))
// // // // // // // // // // // // // // // //           ) : (
// // // // // // // // // // // // // // // //             <tr>
// // // // // // // // // // // // // // // //               <td colSpan="7" className="text-center px-4 py-2">
// // // // // // // // // // // // // // // //                 Không có dữ liệu
// // // // // // // // // // // // // // // //               </td>
// // // // // // // // // // // // // // // //             </tr>
// // // // // // // // // // // // // // // //           )}
// // // // // // // // // // // // // // // //         </tbody>
// // // // // // // // // // // // // // // //       </table>
// // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // export default PhieuThanhLyList;
// // // // // // // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // // // // // // import axios from 'axios';

// // // // // // // // // // // // // // // const PhieuThanhLyList = () => {
// // // // // // // // // // // // // // //   const [phieuThanhLys, setPhieuThanhLys] = useState([]);
// // // // // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // // // // //   const [error, setError] = useState(null);

// // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // //     const fetchData = async () => {
// // // // // // // // // // // // // // //       try {
// // // // // // // // // // // // // // //         // Lấy dữ liệu từ API
// // // // // // // // // // // // // // //         const response = await axios.get('https://localhost:7240/api/PhieuThanhLy');  // Đảm bảo API đúng
// // // // // // // // // // // // // // //         setPhieuThanhLys(response.data);  // Lưu dữ liệu vào state
// // // // // // // // // // // // // // //         setLoading(false);  // Dữ liệu đã được tải xong
// // // // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // // // //         setError('Không thể tải dữ liệu');  // Xử lý lỗi nếu có
// // // // // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // //     fetchData();  // Gọi API khi component mount
// // // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // // //   if (loading) return <div>Loading...</div>;
// // // // // // // // // // // // // // //   if (error) return <div>{error}</div>;

// // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // //     <div className="overflow-x-auto relative">
// // // // // // // // // // // // // // //       <table className="min-w-full table-auto text-left">
// // // // // // // // // // // // // // //         <thead>
// // // // // // // // // // // // // // //           <tr className="bg-gray-200">
// // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Mã Phiếu</th>
// // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Lý Do</th>
// // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Trạng Thái</th>
// // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Phương Thức Thanh Lý</th>
// // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Ngày Tạo</th>
// // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Mã Người Dùng</th>
// // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Tên Người Dùng</th>
// // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Email Người Dùng</th>
// // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Mã Lo</th>
// // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Nhà Cung Cấp</th>
// // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Số Lượng</th>
// // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Hạn Sử Dụng</th>
// // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Trạng Thái Lô</th>
// // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Tên Hóa Chất</th>
// // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Số Lô Hóa Chất</th>
// // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Số CAS</th>
// // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Mã Người Duyệt</th>
// // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Ngày Duyệt</th>
// // // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Trạng Thái Duyệt</th>
// // // // // // // // // // // // // // //           </tr>
// // // // // // // // // // // // // // //         </thead>
// // // // // // // // // // // // // // //         <tbody>
// // // // // // // // // // // // // // //           {phieuThanhLys.length > 0 ? (
// // // // // // // // // // // // // // //             phieuThanhLys.map((phieu) => (
// // // // // // // // // // // // // // //               <tr key={phieu.maPhieuTL}>
// // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.maPhieuTL}</td>
// // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.lyDo}</td>
// // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.trangThai}</td>
// // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.phuongThucThanhLy}</td>
// // // // // // // // // // // // // // //                 <td className="px-4 py-2">{new Date(phieu.ngayTao).toLocaleDateString()}</td>
// // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.maNguoiDung}</td>
// // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.nguoiDung_TenDangNhap}</td>
// // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.nguoiDung_Email}</td>
// // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.maLo}</td>
// // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.nhaCungCap}</td>
// // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.soLuong}</td>
// // // // // // // // // // // // // // //                 <td className="px-4 py-2">{new Date(phieu.hanSuDung).toLocaleDateString()}</td>
// // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.loTrangThai}</td>
// // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.tenHoaChat}</td>
// // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.hoaChatSoLo}</td>
// // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.hoaChatSoCAS}</td>
// // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.duyetPhieuTL_MaNguoiDung}</td>
// // // // // // // // // // // // // // //                 <td className="px-4 py-2">{new Date(phieu.duyetPhieuTL_NgayDuyet).toLocaleDateString()}</td>
// // // // // // // // // // // // // // //                 <td className="px-4 py-2">{phieu.duyetPhieuTL_TrangThai}</td>
// // // // // // // // // // // // // // //               </tr>
// // // // // // // // // // // // // // //             ))
// // // // // // // // // // // // // // //           ) : (
// // // // // // // // // // // // // // //             <tr>
// // // // // // // // // // // // // // //               <td colSpan="19" className="text-center px-4 py-2">
// // // // // // // // // // // // // // //                 Không có dữ liệu
// // // // // // // // // // // // // // //               </td>
// // // // // // // // // // // // // // //             </tr>
// // // // // // // // // // // // // // //           )}
// // // // // // // // // // // // // // //         </tbody>
// // // // // // // // // // // // // // //       </table>
// // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // export default PhieuThanhLyList;
// // // // // // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // // // // // import axios from 'axios';

// // // // // // // // // // // // // // // Modal Component for PhieuThanhLy Details
// // // // // // // // // // // // // // const ModalPhieuThanhLy = ({ phieu, onClose, onDuyet, onTuChoi }) => {
// // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // //     <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
// // // // // // // // // // // // // //       <div className="bg-white p-6 rounded-md w-3/4">
// // // // // // // // // // // // // //         <h2 className="text-xl font-bold mb-4">Chi Tiết Phiếu Thanh Lý</h2>
// // // // // // // // // // // // // //         <table className="min-w-full table-auto text-left">
// // // // // // // // // // // // // //           <tbody>
// // // // // // // // // // // // // //             {/* Các dòng dữ liệu trong bảng chi tiết phiếu thanh lý */}
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Mã Phiếu</th><td className="px-4 py-2">{phieu.maPhieuTL}</td></tr>
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Lý Do</th><td className="px-4 py-2">{phieu.lyDo}</td></tr>
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Trạng Thái</th><td className="px-4 py-2">{phieu.trangThai}</td></tr>
// // // // // // // // // // // // // //             {/* Add other fields as needed */}
// // // // // // // // // // // // // //             {/* ... */}
// // // // // // // // // // // // // //           </tbody>
// // // // // // // // // // // // // //         </table>
        
// // // // // // // // // // // // // //         <div className="mt-4">
// // // // // // // // // // // // // //           {/* Nút Duyệt Thanh Lý */}
// // // // // // // // // // // // // //           <button
// // // // // // // // // // // // // //             onClick={() => onDuyet(phieu.maPhieuTL)}
// // // // // // // // // // // // // //             className="bg-green-500 text-white px-4 py-2 rounded mr-2"
// // // // // // // // // // // // // //           >
// // // // // // // // // // // // // //             Duyệt Thanh Lý
// // // // // // // // // // // // // //           </button>
// // // // // // // // // // // // // //           {/* Nút Từ Chối Thanh Lý */}
// // // // // // // // // // // // // //           <button
// // // // // // // // // // // // // //             onClick={() => onTuChoi(phieu.maPhieuTL)}
// // // // // // // // // // // // // //             className="bg-red-500 text-white px-4 py-2 rounded"
// // // // // // // // // // // // // //           >
// // // // // // // // // // // // // //             Từ Chối Thanh Lý
// // // // // // // // // // // // // //           </button>
// // // // // // // // // // // // // //         </div>
        
// // // // // // // // // // // // // //         <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={onClose}>Đóng</button>
// // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // const PhieuThanhLyList = () => {
// // // // // // // // // // // // // //   const [phieuThanhLys, setPhieuThanhLys] = useState([]);
// // // // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // // // //   const [error, setError] = useState(null);
// // // // // // // // // // // // // //   const [selectedPhieu, setSelectedPhieu] = useState(null); // Trạng thái phiếu được chọn

// // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // //     const fetchData = async () => {
// // // // // // // // // // // // // //       try {
// // // // // // // // // // // // // //         const response = await axios.get('https://localhost:7240/api/PhieuThanhLy');
// // // // // // // // // // // // // //         setPhieuThanhLys(response.data);
// // // // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // // //         setError('Không thể tải dữ liệu');
// // // // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     };
// // // // // // // // // // // // // //     fetchData();
// // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // //   // Hàm xử lý Duyệt Thanh Lý
// // // // // // // // // // // // // //   const handleDuyet = async (maPhieuTL) => {
// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //       const response = await axios.put(`https://localhost:7240/api/PhieuThanhLy/${maPhieuTL}/duyet`);
// // // // // // // // // // // // // //       setPhieuThanhLys(
// // // // // // // // // // // // // //         phieuThanhLys.map((phieu) =>
// // // // // // // // // // // // // //           phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã Duyệt' } : phieu
// // // // // // // // // // // // // //         )
// // // // // // // // // // // // // //       );
// // // // // // // // // // // // // //       alert('Đã duyệt phiếu thanh lý');
// // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // //       console.error('Lỗi khi duyệt phiếu thanh lý', error);
// // // // // // // // // // // // // //       alert('Không thể duyệt phiếu thanh lý');
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   // Hàm xử lý Từ Chối Thanh Lý
// // // // // // // // // // // // // //   const handleTuChoi = async (maPhieuTL) => {
// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //       const response = await axios.put(`https://localhost:7240/api/PhieuThanhLy/${maPhieuTL}/tu-choi`);
// // // // // // // // // // // // // //       setPhieuThanhLys(
// // // // // // // // // // // // // //         phieuThanhLys.map((phieu) =>
// // // // // // // // // // // // // //           phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã Từ Chối' } : phieu
// // // // // // // // // // // // // //         )
// // // // // // // // // // // // // //       );
// // // // // // // // // // // // // //       alert('Đã từ chối phiếu thanh lý');
// // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // //       console.error('Lỗi khi từ chối phiếu thanh lý', error);
// // // // // // // // // // // // // //       alert('Không thể từ chối phiếu thanh lý');
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const handleViewDetails = (phieu) => {
// // // // // // // // // // // // // //     setSelectedPhieu(phieu); // Cập nhật phiếu được chọn khi người dùng nhấn Xem Chi Tiết
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const handleCloseModal = () => {
// // // // // // // // // // // // // //     setSelectedPhieu(null); // Đóng modal khi người dùng nhấn Đóng
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   if (loading) return <div>Loading...</div>;
// // // // // // // // // // // // // //   if (error) return <div>{error}</div>;

// // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // //     <div className="overflow-x-auto relative">
// // // // // // // // // // // // // //       <table className="min-w-full table-auto text-left">
// // // // // // // // // // // // // //         <thead>
// // // // // // // // // // // // // //           <tr className="bg-gray-200">
// // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Mã Phiếu</th>
// // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Lý Do</th>
// // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Trạng Thái</th>
// // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Phương Thức Thanh Lý</th>
// // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Ngày Tạo</th>
// // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Mã Người Dùng</th>
// // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Tên Người Dùng</th>
// // // // // // // // // // // // // //             <th className="px-4 py-2 font-bold text-sm">Hành Động</th>
// // // // // // // // // // // // // //           </tr>
// // // // // // // // // // // // // //         </thead>
// // // // // // // // // // // // // //         <tbody>
// // // // // // // // // // // // // //           {phieuThanhLys.map((phieu) => (
// // // // // // // // // // // // // //             <tr key={phieu.maPhieuTL}>
// // // // // // // // // // // // // //               <td className="px-4 py-2">{phieu.maPhieuTL}</td>
// // // // // // // // // // // // // //               <td className="px-4 py-2">{phieu.lyDo}</td>
// // // // // // // // // // // // // //               <td className="px-4 py-2">{phieu.trangThai}</td>
// // // // // // // // // // // // // //               <td className="px-4 py-2">{phieu.phuongThucThanhLy}</td>
// // // // // // // // // // // // // //               <td className="px-4 py-2">{new Date(phieu.ngayTao).toLocaleDateString()}</td>
// // // // // // // // // // // // // //               <td className="px-4 py-2">{phieu.maNguoiDung}</td>
// // // // // // // // // // // // // //               <td className="px-4 py-2">{phieu.nguoiDung_TenDangNhap}</td>
// // // // // // // // // // // // // //               <td className="px-4 py-2">
// // // // // // // // // // // // // //                 <button
// // // // // // // // // // // // // //                   onClick={() => handleViewDetails(phieu)}
// // // // // // // // // // // // // //                   className="bg-blue-500 text-white px-4 py-2 rounded"
// // // // // // // // // // // // // //                 >
// // // // // // // // // // // // // //                   Xem Chi Tiết
// // // // // // // // // // // // // //                 </button>
// // // // // // // // // // // // // //               </td>
// // // // // // // // // // // // // //             </tr>
// // // // // // // // // // // // // //           ))}
// // // // // // // // // // // // // //         </tbody>
// // // // // // // // // // // // // //       </table>

// // // // // // // // // // // // // //       {selectedPhieu && (
// // // // // // // // // // // // // //         <ModalPhieuThanhLy
// // // // // // // // // // // // // //           phieu={selectedPhieu}
// // // // // // // // // // // // // //           onClose={handleCloseModal}
// // // // // // // // // // // // // //           onDuyet={handleDuyet}
// // // // // // // // // // // // // //           onTuChoi={handleTuChoi}
// // // // // // // // // // // // // //         />
// // // // // // // // // // // // // //       )}
// // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // export default PhieuThanhLyList;
// // // // // // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // // // // // import axios from 'axios';

// // // // // // // // // // // // // // // Modal Component for PhieuThanhLy Details
// // // // // // // // // // // // // // const ModalPhieuThanhLy = ({ phieu, onClose, onDuyet, onTuChoi }) => {
// // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // //     <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
// // // // // // // // // // // // // //       <div className="bg-white p-6 rounded-md w-3/4">
// // // // // // // // // // // // // //         <h2 className="text-xl font-bold mb-4">Chi Tiết Phiếu Thanh Lý</h2>
// // // // // // // // // // // // // //         <table className="min-w-full table-auto text-left">
// // // // // // // // // // // // // //           <tbody>
// // // // // // // // // // // // // //             {/* Mã phiếu thanh lý */}
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Mã Phiếu</th><td className="px-4 py-2">{phieu.maPhieuTL}</td></tr>
// // // // // // // // // // // // // //             {/* Lý do thanh lý */}
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Lý Do</th><td className="px-4 py-2">{phieu.lyDo}</td></tr>
// // // // // // // // // // // // // //             {/* Trạng thái thanh lý */}
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Trạng Thái</th><td className="px-4 py-2">{phieu.trangThai}</td></tr>
// // // // // // // // // // // // // //             {/* Phương thức thanh lý */}
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Phương Thức Thanh Lý</th><td className="px-4 py-2">{phieu.phuongThucThanhLy}</td></tr>
// // // // // // // // // // // // // //             {/* Ngày tạo */}
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Ngày Tạo</th><td className="px-4 py-2">{new Date(phieu.ngayTao).toLocaleDateString()}</td></tr>
// // // // // // // // // // // // // //             {/* Thông tin người dùng */}
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Mã Người Dùng</th><td className="px-4 py-2">{phieu.maNguoiDung}</td></tr>
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Tên Người Dùng</th><td className="px-4 py-2">{phieu.nguoiDung_TenDangNhap}</td></tr>
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Email Người Dùng</th><td className="px-4 py-2">{phieu.nguoiDung_Email}</td></tr>

// // // // // // // // // // // // // //             {/* Thông tin lô hóa chất */}
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Mã Lo</th><td className="px-4 py-2">{phieu.maLo}</td></tr>
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Nhà Cung Cấp</th><td className="px-4 py-2">{phieu.nhaCungCap}</td></tr>
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Số Lượng</th><td className="px-4 py-2">{phieu.soLuong}</td></tr>
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Hạn Sử Dụng</th><td className="px-4 py-2">{new Date(phieu.hanSuDung).toLocaleDateString()}</td></tr>
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Trạng Thái Lô</th><td className="px-4 py-2">{phieu.loTrangThai}</td></tr>
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Tên Hóa Chất</th><td className="px-4 py-2">{phieu.tenHoaChat}</td></tr>
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Số Lô Hóa Chất</th><td className="px-4 py-2">{phieu.hoaChatSoLo}</td></tr>
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Số CAS</th><td className="px-4 py-2">{phieu.hoaChatSoCAS}</td></tr>

// // // // // // // // // // // // // //             {/* Thông tin duyệt phiếu thanh lý */}
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Mã Người Duyệt</th><td className="px-4 py-2">{phieu.duyetPhieuTL_MaNguoiDung}</td></tr>
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Ngày Duyệt</th><td className="px-4 py-2">{new Date(phieu.duyetPhieuTL_NgayDuyet).toLocaleDateString()}</td></tr>
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Trạng Thái Duyệt</th><td className="px-4 py-2">{phieu.duyetPhieuTL_TrangThai}</td></tr>
// // // // // // // // // // // // // //           </tbody>
// // // // // // // // // // // // // //         </table>
        
// // // // // // // // // // // // // //         <div className="mt-4">
// // // // // // // // // // // // // //           {/* Nút Duyệt Thanh Lý */}
// // // // // // // // // // // // // //           <button
// // // // // // // // // // // // // //             onClick={() => onDuyet(phieu.maPhieuTL)}
// // // // // // // // // // // // // //             className="bg-green-500 text-white px-4 py-2 rounded mr-2"
// // // // // // // // // // // // // //           >
// // // // // // // // // // // // // //             Duyệt Thanh Lý
// // // // // // // // // // // // // //           </button>
// // // // // // // // // // // // // //           {/* Nút Từ Chối Thanh Lý */}
// // // // // // // // // // // // // //           <button
// // // // // // // // // // // // // //             onClick={() => onTuChoi(phieu.maPhieuTL)}
// // // // // // // // // // // // // //             className="bg-red-500 text-white px-4 py-2 rounded"
// // // // // // // // // // // // // //           >
// // // // // // // // // // // // // //             Từ Chối Thanh Lý
// // // // // // // // // // // // // //           </button>
// // // // // // // // // // // // // //         </div>
        
// // // // // // // // // // // // // //         <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={onClose}>Đóng</button>
// // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // const PhieuThanhLyList = () => {
// // // // // // // // // // // // // //   const [phieuThanhLys, setPhieuThanhLys] = useState([]);
// // // // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // // // //   const [error, setError] = useState(null);
// // // // // // // // // // // // // //   const [selectedPhieu, setSelectedPhieu] = useState(null);

// // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // //     const fetchData = async () => {
// // // // // // // // // // // // // //       try {
// // // // // // // // // // // // // //         const response = await axios.get('https://localhost:7240/api/PhieuThanhLy');
// // // // // // // // // // // // // //         setPhieuThanhLys(response.data);
// // // // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // // //         setError('Không thể tải dữ liệu');
// // // // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     };
// // // // // // // // // // // // // //     fetchData();
// // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // //   const handleDuyet = async (maPhieuTL) => {
// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //       const response = await axios.put(`https://localhost:7240/api/PhieuThanhLy/${maPhieuTL}/duyet`);
// // // // // // // // // // // // // //       setPhieuThanhLys(
// // // // // // // // // // // // // //         phieuThanhLys.map((phieu) =>
// // // // // // // // // // // // // //           phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã Duyệt' } : phieu
// // // // // // // // // // // // // //         )
// // // // // // // // // // // // // //       );
// // // // // // // // // // // // // //       alert('Đã duyệt phiếu thanh lý');
// // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // //       console.error('Lỗi khi duyệt phiếu thanh lý', error);
// // // // // // // // // // // // // //       alert('Không thể duyệt phiếu thanh lý');
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const handleTuChoi = async (maPhieuTL) => {
// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //       const response = await axios.put(`https://localhost:7240/api/PhieuThanhLy/${maPhieuTL}/tuchoi`);
// // // // // // // // // // // // // //       setPhieuThanhLys(
// // // // // // // // // // // // // //         phieuThanhLys.map((phieu) =>
// // // // // // // // // // // // // //           phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã Từ Chối' } : phieu
// // // // // // // // // // // // // //         )
// // // // // // // // // // // // // //       );
// // // // // // // // // // // // // //       alert('Đã từ chối phiếu thanh lý');
// // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // //       console.error('Lỗi khi từ chối phiếu thanh lý', error);
// // // // // // // // // // // // // //       alert('Không thể từ chối phiếu thanh lý');
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   if (loading) return <div>Loading...</div>;
// // // // // // // // // // // // // //   if (error) return <div>{error}</div>;

// // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // //     <div>
// // // // // // // // // // // // // //       <table className="min-w-full table-auto">
// // // // // // // // // // // // // //         <thead>
// // // // // // // // // // // // // //           <tr>
// // // // // // // // // // // // // //             <th>Mã Phiếu</th>
// // // // // // // // // // // // // //             <th>Lý Do</th>
// // // // // // // // // // // // // //             <th>Trạng Thái</th>
// // // // // // // // // // // // // //             <th>Phương Thức Thanh Lý</th>
// // // // // // // // // // // // // //             <th>Ngày Tạo</th>
// // // // // // // // // // // // // //             <th>Hành Động</th>
// // // // // // // // // // // // // //           </tr>
// // // // // // // // // // // // // //         </thead>
// // // // // // // // // // // // // //         <tbody>
// // // // // // // // // // // // // //           {phieuThanhLys.map((phieu) => (
// // // // // // // // // // // // // //             <tr key={phieu.maPhieuTL}>
// // // // // // // // // // // // // //               <td>{phieu.maPhieuTL}</td>
// // // // // // // // // // // // // //               <td>{phieu.lyDo}</td>
// // // // // // // // // // // // // //               <td>{phieu.trangThai}</td>
// // // // // // // // // // // // // //               <td>{phieu.phuongThucThanhLy}</td>
// // // // // // // // // // // // // //               <td>{new Date(phieu.ngayTao).toLocaleDateString()}</td>
// // // // // // // // // // // // // //               <td>
// // // // // // // // // // // // // //                 <button
// // // // // // // // // // // // // //                   onClick={() => setSelectedPhieu(phieu)}
// // // // // // // // // // // // // //                   className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
// // // // // // // // // // // // // //                 >
// // // // // // // // // // // // // //                   Xem Chi Tiết
// // // // // // // // // // // // // //                 </button>
// // // // // // // // // // // // // //                 <button
// // // // // // // // // // // // // //                   onClick={() => handleDuyet(phieu.maPhieuTL)}
// // // // // // // // // // // // // //                   className="bg-green-500 text-white px-4 py-2 rounded mr-2"
// // // // // // // // // // // // // //                 >
// // // // // // // // // // // // // //                   Duyệt
// // // // // // // // // // // // // //                 </button>
// // // // // // // // // // // // // //                 <button
// // // // // // // // // // // // // //                   onClick={() => handleTuChoi(phieu.maPhieuTL)}
// // // // // // // // // // // // // //                   className="bg-red-500 text-white px-4 py-2 rounded"
// // // // // // // // // // // // // //                 >
// // // // // // // // // // // // // //                   Từ Chối
// // // // // // // // // // // // // //                 </button>
// // // // // // // // // // // // // //               </td>
// // // // // // // // // // // // // //             </tr>
// // // // // // // // // // // // // //           ))}
// // // // // // // // // // // // // //         </tbody>
// // // // // // // // // // // // // //       </table>

// // // // // // // // // // // // // //       {selectedPhieu && (
// // // // // // // // // // // // // //         <ModalPhieuThanhLy
// // // // // // // // // // // // // //           phieu={selectedPhieu}
// // // // // // // // // // // // // //           onClose={() => setSelectedPhieu(null)}
// // // // // // // // // // // // // //           onDuyet={handleDuyet}
// // // // // // // // // // // // // //           onTuChoi={handleTuChoi}
// // // // // // // // // // // // // //         />
// // // // // // // // // // // // // //       )}
// // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // export default PhieuThanhLyList;
// // // // // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // // // // import axios from 'axios';

// // // // // // // // // // // // // // // Modal Component for PhieuThanhLy Details
// // // // // // // // // // // // // // const ModalPhieuThanhLy = ({ phieu, onClose, onDuyet, onTuChoi }) => {
// // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // //     <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
// // // // // // // // // // // // // //       <div className="bg-white p-6 rounded-md w-3/4">
// // // // // // // // // // // // // //         <h2 className="text-xl font-bold mb-4">Chi Tiết Phiếu Thanh Lý</h2>
// // // // // // // // // // // // // //         <table className="min-w-full table-auto text-left">
// // // // // // // // // // // // // //           <tbody>
// // // // // // // // // // // // // //             {/* Mã phiếu thanh lý */}
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Mã Phiếu</th><td className="px-4 py-2">{phieu.maPhieuTL}</td></tr>
// // // // // // // // // // // // // //             {/* Lý do thanh lý */}
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Lý Do</th><td className="px-4 py-2">{phieu.lyDo}</td></tr>
// // // // // // // // // // // // // //             {/* Trạng thái thanh lý */}
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Trạng Thái</th><td className="px-4 py-2">{phieu.trangThai}</td></tr>
// // // // // // // // // // // // // //             {/* Phương thức thanh lý */}
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Phương Thức Thanh Lý</th><td className="px-4 py-2">{phieu.phuongThucThanhLy}</td></tr>
// // // // // // // // // // // // // //             {/* Ngày tạo */}
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Ngày Tạo</th><td className="px-4 py-2">{new Date(phieu.ngayTao).toLocaleDateString()}</td></tr>
// // // // // // // // // // // // // //             {/* Thông tin người dùng */}
// // // // // // // // // // // // // //             {/* <tr><th className="px-4 py-2">Mã Người Dùng</th><td className="px-4 py-2">{phieu.maNguoiDung}</td></tr> */}
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Tên Người Dùng</th><td className="px-4 py-2">{phieu.nguoiDung_TenDangNhap}</td></tr>
// // // // // // // // // // // // // //             {/* <tr><th className="px-4 py-2">Email Người Dùng</th><td className="px-4 py-2">{phieu.nguoiDung_Email}</td></tr> */}

// // // // // // // // // // // // // //             {/* Thông tin lô hóa chất */}
// // // // // // // // // // // // // //             {/* <tr><th className="px-4 py-2">Mã Lo</th><td className="px-4 py-2">{phieu.maLo}</td></tr> */}
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Nhà Cung Cấp</th><td className="px-4 py-2">{phieu.nhaCungCap}</td></tr>
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Số Lượng</th><td className="px-4 py-2">{phieu.soLuong}</td></tr>
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Hạn Sử Dụng</th><td className="px-4 py-2">{new Date(phieu.hanSuDung).toLocaleDateString()}</td></tr>
// // // // // // // // // // // // // //             {/* <tr><th className="px-4 py-2">Trạng Thái Lô</th><td className="px-4 py-2">{phieu.loTrangThai}</td></tr> */}
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Tên Hóa Chất</th><td className="px-4 py-2">{phieu.tenHoaChat}</td></tr>
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Số Lô Hóa Chất</th><td className="px-4 py-2">{phieu.hoaChatSoLo}</td></tr>
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Số CAS</th><td className="px-4 py-2">{phieu.hoaChatSoCAS}</td></tr>

// // // // // // // // // // // // // //             {/* Thông tin duyệt phiếu thanh lý */}
// // // // // // // // // // // // // //             {/* <tr><th className="px-4 py-2">Mã Người Duyệt</th><td className="px-4 py-2">{phieu.duyetPhieuTL_MaNguoiDung}</td></tr> */}
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Ngày Duyệt</th><td className="px-4 py-2">{new Date(phieu.duyetPhieuTL_NgayDuyet).toLocaleDateString()}</td></tr>
// // // // // // // // // // // // // //             <tr><th className="px-4 py-2">Trạng Thái Duyệt</th><td className="px-4 py-2">{phieu.duyetPhieuTL_TrangThai}</td></tr>
// // // // // // // // // // // // // //           </tbody>
// // // // // // // // // // // // // //         </table>
        
// // // // // // // // // // // // // //         <div className="mt-4">
// // // // // // // // // // // // // //           {/* Nút Duyệt Thanh Lý */}
// // // // // // // // // // // // // //           <button
// // // // // // // // // // // // // //             onClick={() => onDuyet(phieu.maPhieuTL)}
// // // // // // // // // // // // // //             className="bg-green-500 text-white px-4 py-2 rounded mr-2"
// // // // // // // // // // // // // //           >
// // // // // // // // // // // // // //             Duyệt Thanh Lý
// // // // // // // // // // // // // //           </button>
// // // // // // // // // // // // // //           {/* Nút Từ Chối Thanh Lý */}
// // // // // // // // // // // // // //           <button
// // // // // // // // // // // // // //             onClick={() => onTuChoi(phieu.maPhieuTL)}
// // // // // // // // // // // // // //             className="bg-red-500 text-white px-4 py-2 rounded"
// // // // // // // // // // // // // //           >
// // // // // // // // // // // // // //             Từ Chối Thanh Lý
// // // // // // // // // // // // // //           </button>
// // // // // // // // // // // // // //         </div>
        
// // // // // // // // // // // // // //         <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={onClose}>Đóng</button>
// // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // const PhieuThanhLyList = () => {
// // // // // // // // // // // // // //   const [phieuThanhLys, setPhieuThanhLys] = useState([]);
// // // // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // // // //   const [error, setError] = useState(null);
// // // // // // // // // // // // // //   const [selectedPhieu, setSelectedPhieu] = useState(null);

// // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // //     const fetchData = async () => {
// // // // // // // // // // // // // //       try {
// // // // // // // // // // // // // //         const response = await axios.get('https://localhost:7240/api/PhieuThanhLy');
// // // // // // // // // // // // // //         setPhieuThanhLys(response.data);
// // // // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // // //         setError('Không thể tải dữ liệu');
// // // // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     };
// // // // // // // // // // // // // //     fetchData();
// // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // //   const handleDuyet = async (maPhieuTL) => {
// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //       const response = await axios.put(`https://localhost:7240/api/PhieuThanhLy/${maPhieuTL}/duyet`);
// // // // // // // // // // // // // //       setPhieuThanhLys(
// // // // // // // // // // // // // //         phieuThanhLys.map((phieu) =>
// // // // // // // // // // // // // //           phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã Duyệt' } : phieu
// // // // // // // // // // // // // //         )
// // // // // // // // // // // // // //       );
// // // // // // // // // // // // // //       alert('Đã duyệt phiếu thanh lý');
// // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // //       console.error('Lỗi khi duyệt phiếu thanh lý', error);
// // // // // // // // // // // // // //       alert('Không thể duyệt phiếu thanh lý');
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const handleTuChoi = async (maPhieuTL) => {
// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //       const response = await axios.put(`https://localhost:7240/api/PhieuThanhLy/${maPhieuTL}/tuchoi`);
// // // // // // // // // // // // // //       setPhieuThanhLys(
// // // // // // // // // // // // // //         phieuThanhLys.map((phieu) =>
// // // // // // // // // // // // // //           phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã Từ Chối' } : phieu
// // // // // // // // // // // // // //         )
// // // // // // // // // // // // // //       );
// // // // // // // // // // // // // //       alert('Đã từ chối phiếu thanh lý');
// // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // //       console.error('Lỗi khi từ chối phiếu thanh lý', error);
// // // // // // // // // // // // // //       alert('Không thể từ chối phiếu thanh lý');
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   if (loading) return <div>Loading...</div>;
// // // // // // // // // // // // // //   if (error) return <div>{error}</div>;

// // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // //     <div>
// // // // // // // // // // // // // //       <table className="min-w-full table-auto">
// // // // // // // // // // // // // //         <thead>
// // // // // // // // // // // // // //           <tr>
// // // // // // // // // // // // // //             <th>Mã Phiếu</th>
// // // // // // // // // // // // // //             <th>Lý Do</th>
// // // // // // // // // // // // // //             <th>Trạng Thái</th>
// // // // // // // // // // // // // //             <th>Phương Thức Thanh Lý</th>
// // // // // // // // // // // // // //             <th>Ngày Tạo</th>
// // // // // // // // // // // // // //             <th>Hành Động</th>
// // // // // // // // // // // // // //           </tr>
// // // // // // // // // // // // // //         </thead>
// // // // // // // // // // // // // //         <tbody>
// // // // // // // // // // // // // //           {phieuThanhLys.map((phieu) => (
// // // // // // // // // // // // // //             <tr key={phieu.maPhieuTL}>
// // // // // // // // // // // // // //               <td>{phieu.maPhieuTL}</td>
// // // // // // // // // // // // // //               <td>{phieu.lyDo}</td>
// // // // // // // // // // // // // //               <td>{phieu.trangThai}</td>
// // // // // // // // // // // // // //               <td>{phieu.phuongThucThanhLy}</td>
// // // // // // // // // // // // // //               <td>{new Date(phieu.ngayTao).toLocaleDateString()}</td>
// // // // // // // // // // // // // //               <td>
// // // // // // // // // // // // // //                 <button
// // // // // // // // // // // // // //                   onClick={() => setSelectedPhieu(phieu)}
// // // // // // // // // // // // // //                   className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
// // // // // // // // // // // // // //                 >
// // // // // // // // // // // // // //                   Xem Chi Tiết
// // // // // // // // // // // // // //                 </button>
// // // // // // // // // // // // // //                 <button
// // // // // // // // // // // // // //                   onClick={() => handleDuyet(phieu.maPhieuTL)}
// // // // // // // // // // // // // //                   className="bg-green-500 text-white px-4 py-2 rounded mr-2"
// // // // // // // // // // // // // //                 >
// // // // // // // // // // // // // //                   Duyệt
// // // // // // // // // // // // // //                 </button>
// // // // // // // // // // // // // //                 <button
// // // // // // // // // // // // // //                   onClick={() => handleTuChoi(phieu.maPhieuTL)}
// // // // // // // // // // // // // //                   className="bg-red-500 text-white px-4 py-2 rounded"
// // // // // // // // // // // // // //                 >
// // // // // // // // // // // // // //                   Từ Chối
// // // // // // // // // // // // // //                 </button>
// // // // // // // // // // // // // //               </td>
// // // // // // // // // // // // // //             </tr>
// // // // // // // // // // // // // //           ))}
// // // // // // // // // // // // // //         </tbody>
// // // // // // // // // // // // // //       </table>

// // // // // // // // // // // // // //       {selectedPhieu && (
// // // // // // // // // // // // // //         <ModalPhieuThanhLy
// // // // // // // // // // // // // //           phieu={selectedPhieu}
// // // // // // // // // // // // // //           onClose={() => setSelectedPhieu(null)}
// // // // // // // // // // // // // //           onDuyet={handleDuyet}
// // // // // // // // // // // // // //           onTuChoi={handleTuChoi}
// // // // // // // // // // // // // //         />
// // // // // // // // // // // // // //       )}
// // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // export default PhieuThanhLyList;
// // // // // // // // // // // // // // Modal Component for PhieuThanhLy Details
// // // // // // // // // // // // // const ModalPhieuThanhLy = ({ phieu, onClose, onDuyet, onTuChoi }) => {
// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
// // // // // // // // // // // // //       <div className="bg-white p-6 rounded-md w-3/4">
// // // // // // // // // // // // //         <h2 className="text-xl font-bold mb-4">Chi Tiết Phiếu Thanh Lý</h2>
// // // // // // // // // // // // //         <table className="min-w-full table-auto text-left">
// // // // // // // // // // // // //           <tbody>
// // // // // // // // // // // // //             {/* Mã phiếu thanh lý */}
// // // // // // // // // // // // //             <tr><th className="px-2 py-1">Mã Phiếu</th><td className="px-2 py-1">{phieu.maPhieuTL}</td></tr>
// // // // // // // // // // // // //             {/* Lý do thanh lý */}
// // // // // // // // // // // // //             <tr><th className="px-2 py-1">Lý Do</th><td className="px-2 py-1">{phieu.lyDo}</td></tr>
// // // // // // // // // // // // //             {/* Trạng thái thanh lý */}
// // // // // // // // // // // // //             <tr><th className="px-2 py-1">Trạng Thái</th><td className="px-2 py-1">{phieu.trangThai}</td></tr>
// // // // // // // // // // // // //             {/* Phương thức thanh lý */}
// // // // // // // // // // // // //             <tr><th className="px-2 py-1">Phương Thức Thanh Lý</th><td className="px-2 py-1">{phieu.phuongThucThanhLy}</td></tr>
// // // // // // // // // // // // //             {/* Ngày tạo */}
// // // // // // // // // // // // //             <tr><th className="px-2 py-1">Ngày Tạo</th><td className="px-2 py-1">{new Date(phieu.ngayTao).toLocaleDateString()}</td></tr>
// // // // // // // // // // // // //             {/* Thông tin người dùng */}
// // // // // // // // // // // // //             {/* <tr><th className="px-2 py-1">Mã Người Dùng</th><td className="px-2 py-1">{phieu.maNguoiDung}</td></tr> */}
// // // // // // // // // // // // //             <tr><th className="px-2 py-1">Tên Người Dùng</th><td className="px-2 py-1">{phieu.nguoiDung_TenDangNhap}</td></tr>
// // // // // // // // // // // // //             {/* <tr><th className="px-2 py-1">Email Người Dùng</th><td className="px-2 py-1">{phieu.nguoiDung_Email}</td></tr> */}

// // // // // // // // // // // // //             {/* Thông tin lô hóa chất */}
// // // // // // // // // // // // //             <tr><th className="px-2 py-1">Mã Lo</th><td className="px-2 py-1">{phieu.maLo}</td></tr>
// // // // // // // // // // // // //             <tr><th className="px-2 py-1">Nhà Cung Cấp</th><td className="px-2 py-1">{phieu.nhaCungCap}</td></tr>
// // // // // // // // // // // // //             <tr><th className="px-2 py-1">Số Lượng</th><td className="px-2 py-1">{phieu.soLuong}</td></tr>
// // // // // // // // // // // // //             <tr><th className="px-2 py-1">Hạn Sử Dụng</th><td className="px-2 py-1">{new Date(phieu.hanSuDung).toLocaleDateString()}</td></tr>
// // // // // // // // // // // // //             <tr><th className="px-2 py-1">Trạng Thái Lô</th><td className="px-2 py-1">{phieu.loTrangThai}</td></tr>
// // // // // // // // // // // // //             <tr><th className="px-2 py-1">Tên Hóa Chất</th><td className="px-2 py-1">{phieu.tenHoaChat}</td></tr>
// // // // // // // // // // // // //             <tr><th className="px-2 py-1">Số Lô Hóa Chất</th><td className="px-2 py-1">{phieu.hoaChatSoLo}</td></tr>
// // // // // // // // // // // // //             <tr><th className="px-2 py-1">Số CAS</th><td className="px-2 py-1">{phieu.hoaChatSoCAS}</td></tr>

// // // // // // // // // // // // //             {/* Thông tin duyệt phiếu thanh lý */}
// // // // // // // // // // // // //             {/* <tr><th className="px-2 py-1">Mã Người Duyệt</th><td className="px-2 py-1">{phieu.duyetPhieuTL_MaNguoiDung}</td></tr> */}
// // // // // // // // // // // // //             <tr><th className="px-2 py-1">Ngày Duyệt</th><td className="px-2 py-1">{new Date(phieu.duyetPhieuTL_NgayDuyet).toLocaleDateString()}</td></tr>
// // // // // // // // // // // // //             <tr><th className="px-2 py-1">Trạng Thái Duyệt</th><td className="px-2 py-1">{phieu.duyetPhieuTL_TrangThai}</td></tr>
// // // // // // // // // // // // //           </tbody>
// // // // // // // // // // // // //         </table>
        
// // // // // // // // // // // // //         <div className="mt-4">
// // // // // // // // // // // // //           {/* Nút Duyệt Thanh Lý */}
// // // // // // // // // // // // //           <button
// // // // // // // // // // // // //             onClick={() => onDuyet(phieu.maPhieuTL)}
// // // // // // // // // // // // //             className="bg-green-500 text-white px-4 py-2 rounded mr-2"
// // // // // // // // // // // // //           >
// // // // // // // // // // // // //             Duyệt Thanh Lý
// // // // // // // // // // // // //           </button>
// // // // // // // // // // // // //           {/* Nút Từ Chối Thanh Lý */}
// // // // // // // // // // // // //           <button
// // // // // // // // // // // // //             onClick={() => onTuChoi(phieu.maPhieuTL)}
// // // // // // // // // // // // //             className="bg-red-500 text-white px-4 py-2 rounded"
// // // // // // // // // // // // //           >
// // // // // // // // // // // // //             Từ Chối Thanh Lý
// // // // // // // // // // // // //           </button>
// // // // // // // // // // // // //         </div>
        
// // // // // // // // // // // // //         <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={onClose}>Đóng</button>
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // // Main PhieuThanhLyList component
// // // // // // // // // // // // // const PhieuThanhLyList = () => {
// // // // // // // // // // // // //   const [phieuThanhLys, setPhieuThanhLys] = useState([]);
// // // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // // //   const [error, setError] = useState(null);
// // // // // // // // // // // // //   const [selectedPhieu, setSelectedPhieu] = useState(null);

// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     const fetchData = async () => {
// // // // // // // // // // // // //       try {
// // // // // // // // // // // // //         const response = await axios.get('https://localhost:7240/api/PhieuThanhLy');
// // // // // // // // // // // // //         setPhieuThanhLys(response.data);
// // // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // //         setError('Không thể tải dữ liệu');
// // // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     };
// // // // // // // // // // // // //     fetchData();
// // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // //   const handleDuyet = async (maPhieuTL) => {
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const response = await axios.put(`https://localhost:7240/api/PhieuThanhLy/${maPhieuTL}/duyet`);
// // // // // // // // // // // // //       setPhieuThanhLys(
// // // // // // // // // // // // //         phieuThanhLys.map((phieu) =>
// // // // // // // // // // // // //           phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã Duyệt' } : phieu
// // // // // // // // // // // // //         )
// // // // // // // // // // // // //       );
// // // // // // // // // // // // //       alert('Đã duyệt phiếu thanh lý');
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //       console.error('Lỗi khi duyệt phiếu thanh lý', error);
// // // // // // // // // // // // //       alert('Không thể duyệt phiếu thanh lý');
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleTuChoi = async (maPhieuTL) => {
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const response = await axios.put(`https://localhost:7240/api/PhieuThanhLy/${maPhieuTL}/tuchoi`);
// // // // // // // // // // // // //       setPhieuThanhLys(
// // // // // // // // // // // // //         phieuThanhLys.map((phieu) =>
// // // // // // // // // // // // //           phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã Từ Chối' } : phieu
// // // // // // // // // // // // //         )
// // // // // // // // // // // // //       );
// // // // // // // // // // // // //       alert('Đã từ chối phiếu thanh lý');
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //       console.error('Lỗi khi từ chối phiếu thanh lý', error);
// // // // // // // // // // // // //       alert('Không thể từ chối phiếu thanh lý');
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   if (loading) return <div>Loading...</div>;
// // // // // // // // // // // // //   if (error) return <div>{error}</div>;

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div>
// // // // // // // // // // // // //       <table className="min-w-full table-auto">
// // // // // // // // // // // // //         <thead>
// // // // // // // // // // // // //           <tr>
// // // // // // // // // // // // //             <th>Mã Phiếu</th>
// // // // // // // // // // // // //             <th>Lý Do</th>
// // // // // // // // // // // // //             <th>Trạng Thái</th>
// // // // // // // // // // // // //             <th>Phương Thức Thanh Lý</th>
// // // // // // // // // // // // //             <th>Ngày Tạo</th>
// // // // // // // // // // // // //             <th>Hành Động</th>
// // // // // // // // // // // // //           </tr>
// // // // // // // // // // // // //         </thead>
// // // // // // // // // // // // //         <tbody>
// // // // // // // // // // // // //           {phieuThanhLys.map((phieu) => (
// // // // // // // // // // // // //             <tr key={phieu.maPhieuTL}>
// // // // // // // // // // // // //               <td>{phieu.maPhieuTL}</td>
// // // // // // // // // // // // //               <td>{phieu.lyDo}</td>
// // // // // // // // // // // // //               <td>{phieu.trangThai}</td>
// // // // // // // // // // // // //               <td>{phieu.phuongThucThanhLy}</td>
// // // // // // // // // // // // //               <td>{new Date(phieu.ngayTao).toLocaleDateString()}</td>
// // // // // // // // // // // // //               <td>
// // // // // // // // // // // // //                 <button
// // // // // // // // // // // // //                   onClick={() => setSelectedPhieu(phieu)}
// // // // // // // // // // // // //                   className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
// // // // // // // // // // // // //                 >
// // // // // // // // // // // // //                   Xem Chi Tiết
// // // // // // // // // // // // //                 </button>
// // // // // // // // // // // // //                 <button
// // // // // // // // // // // // //                   onClick={() => handleDuyet(phieu.maPhieuTL)}
// // // // // // // // // // // // //                   className="bg-green-500 text-white px-4 py-2 rounded mr-2"
// // // // // // // // // // // // //                 >
// // // // // // // // // // // // //                   Duyệt
// // // // // // // // // // // // //                 </button>
// // // // // // // // // // // // //                 <button
// // // // // // // // // // // // //                   onClick={() => handleTuChoi(phieu.maPhieuTL)}
// // // // // // // // // // // // //                   className="bg-red-500 text-white px-4 py-2 rounded"
// // // // // // // // // // // // //                 >
// // // // // // // // // // // // //                   Từ Chối
// // // // // // // // // // // // //                 </button>
// // // // // // // // // // // // //               </td>
// // // // // // // // // // // // //             </tr>
// // // // // // // // // // // // //           ))}
// // // // // // // // // // // // //         </tbody>
// // // // // // // // // // // // //       </table>

// // // // // // // // // // // // //       {selectedPhieu && (
// // // // // // // // // // // // //         <ModalPhieuThanhLy
// // // // // // // // // // // // //           phieu={selectedPhieu}
// // // // // // // // // // // // //           onClose={() => setSelectedPhieu(null)}
// // // // // // // // // // // // //           onDuyet={handleDuyet}
// // // // // // // // // // // // //           onTuChoi={handleTuChoi}
// // // // // // // // // // // // //         />
// // // // // // // // // // // // //       )}
// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export default PhieuThanhLyList;
// // // // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // // // import axios from 'axios';

// // // // // // // // // // // // // Modal Component for PhieuThanhLy Details
// // // // // // // // // // // // const ModalPhieuThanhLy = ({ phieu, onClose, onDuyet, onTuChoi }) => {
// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
// // // // // // // // // // // //       <div className="bg-white p-6 rounded-md w-3/4">
// // // // // // // // // // // //         <h2 className="text-xl font-bold mb-4">Chi Tiết Phiếu Thanh Lý</h2>
// // // // // // // // // // // //         <table className="min-w-full table-auto text-left">
// // // // // // // // // // // //           <tbody>
// // // // // // // // // // // //             {/* Mã phiếu thanh lý */}
// // // // // // // // // // // //             <tr><th className="px-2 py-1">Mã Phiếu</th><td className="px-2 py-1">{phieu.maPhieuTL}</td></tr>
// // // // // // // // // // // //             {/* Lý do thanh lý */}
// // // // // // // // // // // //             <tr><th className="px-2 py-1">Lý Do</th><td className="px-2 py-1">{phieu.lyDo}</td></tr>
// // // // // // // // // // // //             {/* Trạng thái thanh lý */}
// // // // // // // // // // // //             <tr><th className="px-2 py-1">Trạng Thái</th><td className="px-2 py-1">{phieu.trangThai}</td></tr>
// // // // // // // // // // // //             {/* Phương thức thanh lý */}
// // // // // // // // // // // //             <tr><th className="px-2 py-1">Phương Thức Thanh Lý</th><td className="px-2 py-1">{phieu.phuongThucThanhLy}</td></tr>
// // // // // // // // // // // //             {/* Ngày tạo */}
// // // // // // // // // // // //             <tr><th className="px-2 py-1">Ngày Tạo</th><td className="px-2 py-1">{new Date(phieu.ngayTao).toLocaleDateString()}</td></tr>
// // // // // // // // // // // //             {/* Thông tin người dùng */}
// // // // // // // // // // // //             {/* <tr><th className="px-2 py-1">Mã Người Dùng</th><td className="px-2 py-1">{phieu.maNguoiDung}</td></tr> */}
// // // // // // // // // // // //             <tr><th className="px-2 py-1">Tên Người Dùng</th><td className="px-2 py-1">{phieu.nguoiDung_TenDangNhap}</td></tr>
// // // // // // // // // // // //             {/* <tr><th className="px-2 py-1">Email Người Dùng</th><td className="px-2 py-1">{phieu.nguoiDung_Email}</td></tr> */}

// // // // // // // // // // // //             {/* Thông tin lô hóa chất */}
// // // // // // // // // // // //             <tr><th className="px-2 py-1">Mã Lo</th><td className="px-2 py-1">{phieu.maLo}</td></tr>
// // // // // // // // // // // //             <tr><th className="px-2 py-1">Nhà Cung Cấp</th><td className="px-2 py-1">{phieu.nhaCungCap}</td></tr>
// // // // // // // // // // // //             <tr><th className="px-2 py-1">Số Lượng</th><td className="px-2 py-1">{phieu.soLuong}</td></tr>
// // // // // // // // // // // //             <tr><th className="px-2 py-1">Hạn Sử Dụng</th><td className="px-2 py-1">{new Date(phieu.hanSuDung).toLocaleDateString()}</td></tr>
// // // // // // // // // // // //             <tr><th className="px-2 py-1">Trạng Thái Lô</th><td className="px-2 py-1">{phieu.loTrangThai}</td></tr>
// // // // // // // // // // // //             <tr><th className="px-2 py-1">Tên Hóa Chất</th><td className="px-2 py-1">{phieu.tenHoaChat}</td></tr>
// // // // // // // // // // // //             <tr><th className="px-2 py-1">Số Lô Hóa Chất</th><td className="px-2 py-1">{phieu.hoaChatSoLo}</td></tr>
// // // // // // // // // // // //             <tr><th className="px-2 py-1">Số CAS</th><td className="px-2 py-1">{phieu.hoaChatSoCAS}</td></tr>

// // // // // // // // // // // //             {/* Thông tin duyệt phiếu thanh lý */}
// // // // // // // // // // // //             {/* <tr><th className="px-2 py-1">Mã Người Duyệt</th><td className="px-2 py-1">{phieu.duyetPhieuTL_MaNguoiDung}</td></tr> */}
// // // // // // // // // // // //             <tr><th className="px-2 py-1">Ngày Duyệt</th><td className="px-2 py-1">{new Date(phieu.duyetPhieuTL_NgayDuyet).toLocaleDateString()}</td></tr>
// // // // // // // // // // // //             <tr><th className="px-2 py-1">Trạng Thái Duyệt</th><td className="px-2 py-1">{phieu.duyetPhieuTL_TrangThai}</td></tr>
// // // // // // // // // // // //           </tbody>
// // // // // // // // // // // //         </table>
        
// // // // // // // // // // // //         <div className="mt-4">
// // // // // // // // // // // //           {/* Nút Duyệt Thanh Lý */}
// // // // // // // // // // // //           <button
// // // // // // // // // // // //             onClick={() => onDuyet(phieu.maPhieuTL)}
// // // // // // // // // // // //             className="bg-green-500 text-white px-4 py-2 rounded mr-2"
// // // // // // // // // // // //           >
// // // // // // // // // // // //             Duyệt Thanh Lý
// // // // // // // // // // // //           </button>
// // // // // // // // // // // //           {/* Nút Từ Chối Thanh Lý */}
// // // // // // // // // // // //           <button
// // // // // // // // // // // //             onClick={() => onTuChoi(phieu.maPhieuTL)}
// // // // // // // // // // // //             className="bg-red-500 text-white px-4 py-2 rounded"
// // // // // // // // // // // //           >
// // // // // // // // // // // //             Từ Chối Thanh Lý
// // // // // // // // // // // //           </button>
// // // // // // // // // // // //         </div>
        
// // // // // // // // // // // //         <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={onClose}>Đóng</button>
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // };

// // // // // // // // // // // // // Main PhieuThanhLyList component
// // // // // // // // // // // // const PhieuThanhLyList = () => {
// // // // // // // // // // // //   const [phieuThanhLys, setPhieuThanhLys] = useState([]);
// // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // //   const [error, setError] = useState(null);
// // // // // // // // // // // //   const [selectedPhieu, setSelectedPhieu] = useState(null);

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     const fetchData = async () => {
// // // // // // // // // // // //       try {
// // // // // // // // // // // //         const response = await axios.get('https://localhost:7240/api/PhieuThanhLy');
// // // // // // // // // // // //         setPhieuThanhLys(response.data);
// // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // //         setError('Không thể tải dữ liệu');
// // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // //       }
// // // // // // // // // // // //     };
// // // // // // // // // // // //     fetchData();
// // // // // // // // // // // //   }, []);

// // // // // // // // // // // //   const handleDuyet = async (maPhieuTL) => {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const response = await axios.put(`https://localhost:7240/api/PhieuThanhLy/accept/${maPhieuTL}`);
// // // // // // // // // // // //       setPhieuThanhLys(
// // // // // // // // // // // //         phieuThanhLys.map((phieu) =>
// // // // // // // // // // // //           phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã Duyệt' } : phieu
// // // // // // // // // // // //         )
// // // // // // // // // // // //       );
// // // // // // // // // // // //       alert('Đã duyệt phiếu thanh lý');
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //       console.error('Lỗi khi duyệt phiếu thanh lý', error);
// // // // // // // // // // // //       alert('Không thể duyệt phiếu thanh lý');
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleTuChoi = async (maPhieuTL) => {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const response = await axios.put(`https://localhost:7240/api/PhieuThanhLy/reject/${maPhieuTL}`);
// // // // // // // // // // // //       setPhieuThanhLys(
// // // // // // // // // // // //         phieuThanhLys.map((phieu) =>
// // // // // // // // // // // //           phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã Từ Chối' } : phieu
// // // // // // // // // // // //         )
// // // // // // // // // // // //       );
// // // // // // // // // // // //       alert('Đã từ chối phiếu thanh lý');
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //       console.error('Lỗi khi từ chối phiếu thanh lý', error);
// // // // // // // // // // // //       alert('Không thể từ chối phiếu thanh lý');
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   if (loading) return <div>Loading...</div>;
// // // // // // // // // // // //   if (error) return <div>{error}</div>;

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div>
// // // // // // // // // // // //       <table className="min-w-full table-auto">
// // // // // // // // // // // //         <thead>
// // // // // // // // // // // //           <tr>
// // // // // // // // // // // //             <th>Mã Phiếu</th>
// // // // // // // // // // // //             <th>Lý Do</th>
// // // // // // // // // // // //             <th>Trạng Thái</th>
// // // // // // // // // // // //             <th>Phương Thức Thanh Lý</th>
// // // // // // // // // // // //             <th>Ngày Tạo</th>
// // // // // // // // // // // //             <th>Hành Động</th>
// // // // // // // // // // // //           </tr>
// // // // // // // // // // // //         </thead>
// // // // // // // // // // // //         <tbody>
// // // // // // // // // // // //           {phieuThanhLys.map((phieu) => (
// // // // // // // // // // // //             <tr key={phieu.maPhieuTL}>
// // // // // // // // // // // //               <td>{phieu.maPhieuTL}</td>
// // // // // // // // // // // //               <td>{phieu.lyDo}</td>
// // // // // // // // // // // //               <td>{phieu.trangThai}</td>
// // // // // // // // // // // //               <td>{phieu.phuongThucThanhLy}</td>
// // // // // // // // // // // //               <td>{new Date(phieu.ngayTao).toLocaleDateString()}</td>
// // // // // // // // // // // //               <td>
// // // // // // // // // // // //                 <button
// // // // // // // // // // // //                   onClick={() => setSelectedPhieu(phieu)}
// // // // // // // // // // // //                   className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
// // // // // // // // // // // //                 >
// // // // // // // // // // // //                   Xem Chi Tiết
// // // // // // // // // // // //                 </button>
// // // // // // // // // // // //                 <button
// // // // // // // // // // // //                   onClick={() => handleDuyet(phieu.maPhieuTL)}
// // // // // // // // // // // //                   className="bg-green-500 text-white px-4 py-2 rounded mr-2"
// // // // // // // // // // // //                 >
// // // // // // // // // // // //                   Duyệt
// // // // // // // // // // // //                 </button>
// // // // // // // // // // // //                 <button
// // // // // // // // // // // //                   onClick={() => handleTuChoi(phieu.maPhieuTL)}
// // // // // // // // // // // //                   className="bg-red-500 text-white px-4 py-2 rounded"
// // // // // // // // // // // //                 >
// // // // // // // // // // // //                   Từ Chối
// // // // // // // // // // // //                 </button>
// // // // // // // // // // // //               </td>
// // // // // // // // // // // //             </tr>
// // // // // // // // // // // //           ))}
// // // // // // // // // // // //         </tbody>
// // // // // // // // // // // //       </table>

// // // // // // // // // // // //       {selectedPhieu && (
// // // // // // // // // // // //         <ModalPhieuThanhLy
// // // // // // // // // // // //           phieu={selectedPhieu}
// // // // // // // // // // // //           onClose={() => setSelectedPhieu(null)}
// // // // // // // // // // // //           onDuyet={handleDuyet}
// // // // // // // // // // // //           onTuChoi={handleTuChoi}
// // // // // // // // // // // //         />
// // // // // // // // // // // //       )}
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // };

// // // // // // // // // // // // export default PhieuThanhLyList;
// // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // import axios from 'axios';

// // // // // // // // // // // Modal Component for PhieuThanhLy Details
// // // // // // // // // // const ModalPhieuThanhLy = ({ phieu, onClose, onDuyet, onTuChoi }) => {
// // // // // // // // // //   return (
// // // // // // // // // //     <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
// // // // // // // // // //       <div className="bg-white p-6 rounded-md w-3/4">
// // // // // // // // // //         <h2 className="text-xl font-bold mb-4">Chi Tiết Phiếu Thanh Lý</h2>
// // // // // // // // // //         <table className="min-w-full table-auto text-left">
// // // // // // // // // //           <tbody>
// // // // // // // // // //             {/* Mã phiếu thanh lý */}
// // // // // // // // // //             <tr><th className="px-2 py-1">Mã Phiếu</th><td className="px-2 py-1">{phieu.maPhieuTL}</td></tr>
// // // // // // // // // //             {/* Lý do thanh lý */}
// // // // // // // // // //             <tr><th className="px-2 py-1">Lý Do</th><td className="px-2 py-1">{phieu.lyDo}</td></tr>
// // // // // // // // // //             {/* Trạng thái thanh lý */}
// // // // // // // // // //             <tr><th className="px-2 py-1">Trạng Thái</th><td className="px-2 py-1">{phieu.trangThai}</td></tr>
// // // // // // // // // //             {/* Phương thức thanh lý */}
// // // // // // // // // //             <tr><th className="px-2 py-1">Phương Thức Thanh Lý</th><td className="px-2 py-1">{phieu.phuongThucThanhLy}</td></tr>
// // // // // // // // // //             {/* Ngày tạo */}
// // // // // // // // // //             <tr><th className="px-2 py-1">Ngày Tạo</th><td className="px-2 py-1">{new Date(phieu.ngayTao).toLocaleDateString()}</td></tr>
// // // // // // // // // //             {/* Thông tin người dùng */}
// // // // // // // // // //             <tr><th className="px-2 py-1">Tên Người Dùng</th><td className="px-2 py-1">{phieu.nguoiDung_TenDangNhap}</td></tr>
// // // // // // // // // //             {/* Thông tin lô hóa chất */}
// // // // // // // // // //             <tr><th className="px-2 py-1">Mã Lo</th><td className="px-2 py-1">{phieu.maLo}</td></tr>
// // // // // // // // // //             <tr><th className="px-2 py-1">Nhà Cung Cấp</th><td className="px-2 py-1">{phieu.nhaCungCap}</td></tr>
// // // // // // // // // //             <tr><th className="px-2 py-1">Số Lượng</th><td className="px-2 py-1">{phieu.soLuong}</td></tr>
// // // // // // // // // //             <tr><th className="px-2 py-1">Hạn Sử Dụng</th><td className="px-2 py-1">{new Date(phieu.hanSuDung).toLocaleDateString()}</td></tr>
// // // // // // // // // //             <tr><th className="px-2 py-1">Trạng Thái Lô</th><td className="px-2 py-1">{phieu.loTrangThai}</td></tr>
// // // // // // // // // //             <tr><th className="px-2 py-1">Tên Hóa Chất</th><td className="px-2 py-1">{phieu.tenHoaChat}</td></tr>
// // // // // // // // // //             <tr><th className="px-2 py-1">Số Lô Hóa Chất</th><td className="px-2 py-1">{phieu.hoaChatSoLo}</td></tr>
// // // // // // // // // //             <tr><th className="px-2 py-1">Số CAS</th><td className="px-2 py-1">{phieu.hoaChatSoCAS}</td></tr>
// // // // // // // // // //             {/* Thông tin duyệt phiếu thanh lý */}
// // // // // // // // // //             <tr><th className="px-2 py-1">Ngày Duyệt</th><td className="px-2 py-1">{new Date(phieu.duyetPhieuTL_NgayDuyet).toLocaleDateString()}</td></tr>
// // // // // // // // // //             <tr><th className="px-2 py-1">Trạng Thái Duyệt</th><td className="px-2 py-1">{phieu.duyetPhieuTL_TrangThai}</td></tr>
// // // // // // // // // //           </tbody>
// // // // // // // // // //         </table>
        
// // // // // // // // // //         <div className="mt-4">
// // // // // // // // // //           {/* Nút Duyệt Thanh Lý */}
// // // // // // // // // //           <button
// // // // // // // // // //             onClick={() => onDuyet(phieu.maPhieuTL)}
// // // // // // // // // //             className="bg-green-500 text-white px-4 py-2 rounded mr-2"
// // // // // // // // // //           >
// // // // // // // // // //             Duyệt Thanh Lý
// // // // // // // // // //           </button>
// // // // // // // // // //           {/* Nút Từ Chối Thanh Lý */}
// // // // // // // // // //           <button
// // // // // // // // // //             onClick={() => onTuChoi(phieu.maPhieuTL)}
// // // // // // // // // //             className="bg-red-500 text-white px-4 py-2 rounded"
// // // // // // // // // //           >
// // // // // // // // // //             Từ Chối Thanh Lý
// // // // // // // // // //           </button>
// // // // // // // // // //         </div>
        
// // // // // // // // // //         <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={onClose}>Đóng</button>
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // // Main PhieuThanhLyList component
// // // // // // // // // // const PhieuThanhLyList = () => {
// // // // // // // // // //   const [phieuThanhLys, setPhieuThanhLys] = useState([]);
// // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // //   const [error, setError] = useState(null);
// // // // // // // // // //   const [selectedPhieu, setSelectedPhieu] = useState(null);

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     const fetchData = async () => {
// // // // // // // // // //       try {
// // // // // // // // // //         const response = await axios.get('https://localhost:7240/api/PhieuThanhLy');
// // // // // // // // // //         setPhieuThanhLys(response.data);
// // // // // // // // // //         setLoading(false);
// // // // // // // // // //       } catch (error) {
// // // // // // // // // //         setError('Không thể tải dữ liệu');
// // // // // // // // // //         setLoading(false);
// // // // // // // // // //       }
// // // // // // // // // //     };
// // // // // // // // // //     fetchData();
// // // // // // // // // //   }, []);

// // // // // // // // // //   const handleDuyet = async (maPhieuTL) => {
// // // // // // // // // //     try {
// // // // // // // // // //       const response = await axios.put(`https://localhost:7240/api/PhieuThanhLy/accept/${maPhieuTL}`);
// // // // // // // // // //       // Sau khi duyệt thành công, cập nhật lại trạng thái trong bảng
// // // // // // // // // //       setPhieuThanhLys(
// // // // // // // // // //         phieuThanhLys.map((phieu) =>
// // // // // // // // // //           phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã duyệt thanh lý', loTrangThai: 'Đã thanh lý' } : phieu
// // // // // // // // // //         )
// // // // // // // // // //       );
// // // // // // // // // //       alert('Đã duyệt phiếu thanh lý');
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error('Lỗi khi duyệt phiếu thanh lý', error);
// // // // // // // // // //       alert('Không thể duyệt phiếu thanh lý');
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handleTuChoi = async (maPhieuTL) => {
// // // // // // // // // //     try {
// // // // // // // // // //       const response = await axios.put(`https://localhost:7240/api/PhieuThanhLy/reject/${maPhieuTL}`);
// // // // // // // // // //       // Sau khi từ chối thành công, cập nhật lại trạng thái trong bảng
// // // // // // // // // //       setPhieuThanhLys(
// // // // // // // // // //         phieuThanhLys.map((phieu) =>
// // // // // // // // // //           phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã từ chối thanh lý' } : phieu
// // // // // // // // // //         )
// // // // // // // // // //       );
// // // // // // // // // //       alert('Đã từ chối phiếu thanh lý');
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error('Lỗi khi từ chối phiếu thanh lý', error);
// // // // // // // // // //       alert('Không thể từ chối phiếu thanh lý');
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   if (loading) return <div>Loading...</div>;
// // // // // // // // // //   if (error) return <div>{error}</div>;

// // // // // // // // // //   return (
// // // // // // // // // //     <div>
// // // // // // // // // //       <table className="min-w-full table-auto">
// // // // // // // // // //         <thead>
// // // // // // // // // //           <tr>
// // // // // // // // // //             <th>Mã Phiếu</th>
// // // // // // // // // //             <th>Lý Do</th>
// // // // // // // // // //             <th>Trạng Thái</th>
// // // // // // // // // //             <th>Phương Thức Thanh Lý</th>
// // // // // // // // // //             <th>Ngày Tạo</th>
// // // // // // // // // //             <th>Hành Động</th>
// // // // // // // // // //           </tr>
// // // // // // // // // //         </thead>
// // // // // // // // // //         <tbody>
// // // // // // // // // //           {phieuThanhLys.map((phieu) => (
// // // // // // // // // //             <tr key={phieu.maPhieuTL}>
// // // // // // // // // //               <td>{phieu.maPhieuTL}</td>
// // // // // // // // // //               <td>{phieu.lyDo}</td>
// // // // // // // // // //               <td>{phieu.trangThai}</td>
// // // // // // // // // //               <td>{phieu.phuongThucThanhLy}</td>
// // // // // // // // // //               <td>{new Date(phieu.ngayTao).toLocaleDateString()}</td>
// // // // // // // // // //               <td>
// // // // // // // // // //                 <button
// // // // // // // // // //                   onClick={() => setSelectedPhieu(phieu)}
// // // // // // // // // //                   className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
// // // // // // // // // //                 >
// // // // // // // // // //                   Xem Chi Tiết
// // // // // // // // // //                 </button>
// // // // // // // // // //                 <button
// // // // // // // // // //                   onClick={() => handleDuyet(phieu.maPhieuTL)}
// // // // // // // // // //                   className="bg-green-500 text-white px-4 py-2 rounded mr-2"
// // // // // // // // // //                 >
// // // // // // // // // //                   Duyệt
// // // // // // // // // //                 </button>
// // // // // // // // // //                 <button
// // // // // // // // // //                   onClick={() => handleTuChoi(phieu.maPhieuTL)}
// // // // // // // // // //                   className="bg-red-500 text-white px-4 py-2 rounded"
// // // // // // // // // //                 >
// // // // // // // // // //                   Từ Chối
// // // // // // // // // //                 </button>
// // // // // // // // // //               </td>
// // // // // // // // // //             </tr>
// // // // // // // // // //           ))}
// // // // // // // // // //         </tbody>
// // // // // // // // // //       </table>

// // // // // // // // // //       {selectedPhieu && (
// // // // // // // // // //         <ModalPhieuThanhLy
// // // // // // // // // //           phieu={selectedPhieu}
// // // // // // // // // //           onClose={() => setSelectedPhieu(null)}
// // // // // // // // // //           onDuyet={handleDuyet}
// // // // // // // // // //           onTuChoi={handleTuChoi}
// // // // // // // // // //         />
// // // // // // // // // //       )}
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default PhieuThanhLyList;
// // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // import axios from 'axios';

// // // // // // // // // // Modal Component for PhieuThanhLy Details
// // // // // // // // // const ModalPhieuThanhLy = ({ phieu, onClose, onDuyet, onTuChoi }) => {
// // // // // // // // //   return (
// // // // // // // // //     <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50 transition-all ease-in-out duration-300">
// // // // // // // // //       <div className="bg-white p-6 rounded-md w-3/4 shadow-xl transform transition-all ease-in-out duration-300 scale-95 hover:scale-100">
// // // // // // // // //         <h2 className="text-xl font-bold mb-4">Chi Tiết Phiếu Thanh Lý</h2>
// // // // // // // // //         <table className="min-w-full table-auto text-left">
// // // // // // // // //           <tbody>
// // // // // // // // //             {/* Mã phiếu thanh lý */}
// // // // // // // // //             <tr><th className="px-2 py-1">Mã Phiếu</th><td className="px-2 py-1">{phieu.maPhieuTL}</td></tr>
// // // // // // // // //             {/* Lý do thanh lý */}
// // // // // // // // //             <tr><th className="px-2 py-1">Lý Do</th><td className="px-2 py-1">{phieu.lyDo}</td></tr>
// // // // // // // // //             {/* Trạng thái thanh lý */}
// // // // // // // // //             <tr><th className="px-2 py-1">Trạng Thái</th><td className="px-2 py-1">{phieu.trangThai}</td></tr>
// // // // // // // // //             {/* Phương thức thanh lý */}
// // // // // // // // //             <tr><th className="px-2 py-1">Phương Thức Thanh Lý</th><td className="px-2 py-1">{phieu.phuongThucThanhLy}</td></tr>
// // // // // // // // //             {/* Ngày tạo */}
// // // // // // // // //             <tr><th className="px-2 py-1">Ngày Tạo</th><td className="px-2 py-1">{new Date(phieu.ngayTao).toLocaleDateString()}</td></tr>
// // // // // // // // //             {/* Thông tin người dùng */}
// // // // // // // // //             <tr><th className="px-2 py-1">Tên Người Dùng</th><td className="px-2 py-1">{phieu.nguoiDung_TenDangNhap}</td></tr>
// // // // // // // // //             {/* Thông tin lô hóa chất */}
// // // // // // // // //             <tr><th className="px-2 py-1">Mã Lo</th><td className="px-2 py-1">{phieu.maLo}</td></tr>
// // // // // // // // //             <tr><th className="px-2 py-1">Nhà Cung Cấp</th><td className="px-2 py-1">{phieu.nhaCungCap}</td></tr>
// // // // // // // // //             <tr><th className="px-2 py-1">Số Lượng</th><td className="px-2 py-1">{phieu.soLuong}</td></tr>
// // // // // // // // //             <tr><th className="px-2 py-1">Hạn Sử Dụng</th><td className="px-2 py-1">{new Date(phieu.hanSuDung).toLocaleDateString()}</td></tr>
// // // // // // // // //             <tr><th className="px-2 py-1">Trạng Thái Lô</th><td className="px-2 py-1">{phieu.loTrangThai}</td></tr>
// // // // // // // // //             <tr><th className="px-2 py-1">Tên Hóa Chất</th><td className="px-2 py-1">{phieu.tenHoaChat}</td></tr>
// // // // // // // // //             <tr><th className="px-2 py-1">Số Lô Hóa Chất</th><td className="px-2 py-1">{phieu.hoaChatSoLo}</td></tr>
// // // // // // // // //             <tr><th className="px-2 py-1">Số CAS</th><td className="px-2 py-1">{phieu.hoaChatSoCAS}</td></tr>
// // // // // // // // //             {/* Thông tin duyệt phiếu thanh lý */}
// // // // // // // // //             <tr><th className="px-2 py-1">Ngày Duyệt</th><td className="px-2 py-1">{new Date(phieu.duyetPhieuTL_NgayDuyet).toLocaleDateString()}</td></tr>
// // // // // // // // //             <tr><th className="px-2 py-1">Trạng Thái Duyệt</th><td className="px-2 py-1">{phieu.duyetPhieuTL_TrangThai}</td></tr>
// // // // // // // // //           </tbody>
// // // // // // // // //         </table>
        
// // // // // // // // //         <div className="mt-4 flex justify-between">
// // // // // // // // //           {/* Nút Duyệt Thanh Lý */}
// // // // // // // // //           <button
// // // // // // // // //             onClick={() => onDuyet(phieu.maPhieuTL)}
// // // // // // // // //             className="bg-green-500 text-white px-4 py-2 rounded transition-transform transform hover:scale-105"
// // // // // // // // //           >
// // // // // // // // //             Duyệt Thanh Lý
// // // // // // // // //           </button>
// // // // // // // // //           {/* Nút Từ Chối Thanh Lý */}
// // // // // // // // //           <button
// // // // // // // // //             onClick={() => onTuChoi(phieu.maPhieuTL)}
// // // // // // // // //             className="bg-red-500 text-white px-4 py-2 rounded transition-transform transform hover:scale-105"
// // // // // // // // //           >
// // // // // // // // //             Từ Chối Thanh Lý
// // // // // // // // //           </button>
// // // // // // // // //         </div>
        
// // // // // // // // //         <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full transition-transform transform hover:scale-105" onClick={onClose}>Đóng</button>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // // Main PhieuThanhLyList component
// // // // // // // // // const PhieuThanhLyList = () => {
// // // // // // // // //   const [phieuThanhLys, setPhieuThanhLys] = useState([]);
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const [error, setError] = useState(null);
// // // // // // // // //   const [selectedPhieu, setSelectedPhieu] = useState(null);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const fetchData = async () => {
// // // // // // // // //       try {
// // // // // // // // //         const response = await axios.get('https://localhost:7240/api/PhieuThanhLy');
// // // // // // // // //         setPhieuThanhLys(response.data);
// // // // // // // // //         setLoading(false);
// // // // // // // // //       } catch (error) {
// // // // // // // // //         setError('Không thể tải dữ liệu');
// // // // // // // // //         setLoading(false);
// // // // // // // // //       }
// // // // // // // // //     };
// // // // // // // // //     fetchData();
// // // // // // // // //   }, []);

// // // // // // // // //   const handleDuyet = async (maPhieuTL) => {
// // // // // // // // //     try {
// // // // // // // // //       const response = await axios.put(`https://localhost:7240/api/PhieuThanhLy/accept/${maPhieuTL}`);
// // // // // // // // //       setPhieuThanhLys(
// // // // // // // // //         phieuThanhLys.map((phieu) =>
// // // // // // // // //           phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã duyệt thanh lý', loTrangThai: 'Đã thanh lý' } : phieu
// // // // // // // // //         )
// // // // // // // // //       );
// // // // // // // // //       alert('Đã duyệt phiếu thanh lý');
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('Lỗi khi duyệt phiếu thanh lý', error);
// // // // // // // // //       alert('Không thể duyệt phiếu thanh lý');
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleTuChoi = async (maPhieuTL) => {
// // // // // // // // //     try {
// // // // // // // // //       const response = await axios.put(`https://localhost:7240/api/PhieuThanhLy/reject/${maPhieuTL}`);
// // // // // // // // //       setPhieuThanhLys(
// // // // // // // // //         phieuThanhLys.map((phieu) =>
// // // // // // // // //           phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã từ chối thanh lý' } : phieu
// // // // // // // // //         )
// // // // // // // // //       );
// // // // // // // // //       alert('Đã từ chối phiếu thanh lý');
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('Lỗi khi từ chối phiếu thanh lý', error);
// // // // // // // // //       alert('Không thể từ chối phiếu thanh lý');
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   if (loading) return <div className="text-center">Đang tải dữ liệu...</div>;
// // // // // // // // //   if (error) return <div className="text-center text-red-500">{error}</div>;

// // // // // // // // //   return (
// // // // // // // // //     <div className="p-6">
// // // // // // // // //       <h2 className="text-3xl font-bold mb-6 text-center">Danh Sách Phiếu Thanh Lý</h2>
// // // // // // // // //       <table className="min-w-full table-auto mb-6">
// // // // // // // // //         <thead className="bg-gray-100">
// // // // // // // // //           <tr>
// // // // // // // // //             <th className="px-4 py-2 border">Mã Phiếu</th>
// // // // // // // // //             <th className="px-4 py-2 border">Lý Do</th>
// // // // // // // // //             <th className="px-4 py-2 border">Trạng Thái</th>
// // // // // // // // //             <th className="px-4 py-2 border">Phương Thức Thanh Lý</th>
// // // // // // // // //             <th className="px-4 py-2 border">Ngày Tạo</th>
// // // // // // // // //             <th className="px-4 py-2 border">Hành Động</th>
// // // // // // // // //           </tr>
// // // // // // // // //         </thead>
// // // // // // // // //         <tbody>
// // // // // // // // //           {phieuThanhLys.map((phieu) => (
// // // // // // // // //             <tr key={phieu.maPhieuTL} className="hover:bg-gray-50">
// // // // // // // // //               <td className="px-4 py-2 border">{phieu.maPhieuTL}</td>
// // // // // // // // //               <td className="px-4 py-2 border">{phieu.lyDo}</td>
// // // // // // // // //               <td className="px-4 py-2 border">{phieu.trangThai}</td>
// // // // // // // // //               <td className="px-4 py-2 border">{phieu.phuongThucThanhLy}</td>
// // // // // // // // //               <td className="px-4 py-2 border">{new Date(phieu.ngayTao).toLocaleDateString()}</td>
// // // // // // // // //               <td className="px-4 py-2 border">
// // // // // // // // //                 <button
// // // // // // // // //                   onClick={() => setSelectedPhieu(phieu)}
// // // // // // // // //                   className="bg-blue-500 text-white px-4 py-2 rounded mr-2 transition-transform transform hover:scale-105"
// // // // // // // // //                 >
// // // // // // // // //                   Xem Chi Tiết
// // // // // // // // //                 </button>
// // // // // // // // //                 <button
// // // // // // // // //                   onClick={() => handleDuyet(phieu.maPhieuTL)}
// // // // // // // // //                   className="bg-green-500 text-white px-4 py-2 rounded mr-2 transition-transform transform hover:scale-105"
// // // // // // // // //                 >
// // // // // // // // //                   Duyệt
// // // // // // // // //                 </button>
// // // // // // // // //                 <button
// // // // // // // // //                   onClick={() => handleTuChoi(phieu.maPhieuTL)}
// // // // // // // // //                   className="bg-red-500 text-white px-4 py-2 rounded transition-transform transform hover:scale-105"
// // // // // // // // //                 >
// // // // // // // // //                   Từ Chối
// // // // // // // // //                 </button>
// // // // // // // // //               </td>
// // // // // // // // //             </tr>
// // // // // // // // //           ))}
// // // // // // // // //         </tbody>
// // // // // // // // //       </table>

// // // // // // // // //       {selectedPhieu && (
// // // // // // // // //         <ModalPhieuThanhLy
// // // // // // // // //           phieu={selectedPhieu}
// // // // // // // // //           onClose={() => setSelectedPhieu(null)}
// // // // // // // // //           onDuyet={handleDuyet}
// // // // // // // // //           onTuChoi={handleTuChoi}
// // // // // // // // //         />
// // // // // // // // //       )}
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default PhieuThanhLyList;

// // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // import axios from 'axios';
// // // // // // // // import ModalPhieuThanhLy from './ModalPhieuThanhLy';  // Import modal

// // // // // // // // // Main PhieuThanhLyList component
// // // // // // // // const PhieuThanhLyList = () => {
// // // // // // // //   const [phieuThanhLys, setPhieuThanhLys] = useState([]);
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [error, setError] = useState(null);
// // // // // // // //   const [selectedPhieu, setSelectedPhieu] = useState(null);

// // // // // // // //   useEffect(() => {
// // // // // // // //     const fetchData = async () => {
// // // // // // // //       try {
// // // // // // // //         const response = await axios.get('https://localhost:7240/api/PhieuThanhLy');
// // // // // // // //         setPhieuThanhLys(response.data);
// // // // // // // //         setLoading(false);
// // // // // // // //       } catch (error) {
// // // // // // // //         setError('Không thể tải dữ liệu');
// // // // // // // //         setLoading(false);
// // // // // // // //       }
// // // // // // // //     };
// // // // // // // //     fetchData();
// // // // // // // //   }, []);

// // // // // // // //   const handleDuyet = async (maPhieuTL) => {
// // // // // // // //     try {
// // // // // // // //       const response = await axios.put(`https://localhost:7240/api/PhieuThanhLy/accept/${maPhieuTL}`);
// // // // // // // //       setPhieuThanhLys(
// // // // // // // //         phieuThanhLys.map((phieu) =>
// // // // // // // //           phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã duyệt thanh lý', loTrangThai: 'Đã thanh lý' } : phieu
// // // // // // // //         )
// // // // // // // //       );
// // // // // // // //       alert('Đã duyệt phiếu thanh lý');
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('Lỗi khi duyệt phiếu thanh lý', error);
// // // // // // // //       alert('Không thể duyệt phiếu thanh lý');
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleTuChoi = async (maPhieuTL) => {
// // // // // // // //     try {
// // // // // // // //       const response = await axios.put(`https://localhost:7240/api/PhieuThanhLy/reject/${maPhieuTL}`);
// // // // // // // //       setPhieuThanhLys(
// // // // // // // //         phieuThanhLys.map((phieu) =>
// // // // // // // //           phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã từ chối thanh lý' } : phieu
// // // // // // // //         )
// // // // // // // //       );
// // // // // // // //       alert('Đã từ chối phiếu thanh lý');
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('Lỗi khi từ chối phiếu thanh lý', error);
// // // // // // // //       alert('Không thể từ chối phiếu thanh lý');
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   if (loading) return <div className="text-center">Đang tải dữ liệu...</div>;
// // // // // // // //   if (error) return <div className="text-center text-red-500">{error}</div>;

// // // // // // // //   return (
// // // // // // // //     <div className="p-6">
// // // // // // // //       <h2 className="text-3xl font-bold mb-6 text-center">Danh Sách Phiếu Thanh Lý</h2>
// // // // // // // //       <table className="min-w-full table-auto mb-6">
// // // // // // // //         <thead className="bg-gray-100">
// // // // // // // //           <tr>
// // // // // // // //             <th className="px-4 py-2 border">Mã Phiếu</th>
// // // // // // // //             <th className="px-4 py-2 border">Lý Do</th>
// // // // // // // //             <th className="px-4 py-2 border">Trạng Thái</th>
// // // // // // // //             <th className="px-4 py-2 border">Phương Thức Thanh Lý</th>
// // // // // // // //             <th className="px-4 py-2 border">Ngày Tạo</th>
// // // // // // // //             <th className="px-4 py-2 border">Hành Động</th>
// // // // // // // //           </tr>
// // // // // // // //         </thead>
// // // // // // // //         <tbody>
// // // // // // // //           {phieuThanhLys.map((phieu) => (
// // // // // // // //             <tr key={phieu.maPhieuTL} className="hover:bg-gray-50">
// // // // // // // //               <td className="px-4 py-2 border">{phieu.maPhieuTL}</td>
// // // // // // // //               <td className="px-4 py-2 border">{phieu.lyDo}</td>
// // // // // // // //               <td className="px-4 py-2 border">{phieu.trangThai}</td>
// // // // // // // //               <td className="px-4 py-2 border">{phieu.phuongThucThanhLy}</td>
// // // // // // // //               <td className="px-4 py-2 border">{new Date(phieu.ngayTao).toLocaleDateString()}</td>
// // // // // // // //               <td className="px-4 py-2 border">
// // // // // // // //                 <button
// // // // // // // //                   onClick={() => setSelectedPhieu(phieu)}
// // // // // // // //                   className="bg-blue-500 text-white px-4 py-2 rounded mr-2 transition-transform transform hover:scale-105"
// // // // // // // //                 >
// // // // // // // //                   Xem Chi Tiết
// // // // // // // //                 </button>
// // // // // // // //                 <button
// // // // // // // //                   onClick={() => handleDuyet(phieu.maPhieuTL)}
// // // // // // // //                   className="bg-green-500 text-white px-4 py-2 rounded mr-2 transition-transform transform hover:scale-105"
// // // // // // // //                 >
// // // // // // // //                   Duyệt
// // // // // // // //                 </button>
// // // // // // // //                 <button
// // // // // // // //                   onClick={() => handleTuChoi(phieu.maPhieuTL)}
// // // // // // // //                   className="bg-red-500 text-white px-4 py-2 rounded transition-transform transform hover:scale-105"
// // // // // // // //                 >
// // // // // // // //                   Từ Chối
// // // // // // // //                 </button>
// // // // // // // //               </td>
// // // // // // // //             </tr>
// // // // // // // //           ))}
// // // // // // // //         </tbody>
// // // // // // // //       </table>

// // // // // // // //       {selectedPhieu && (
// // // // // // // //         <ModalPhieuThanhLy
// // // // // // // //           phieu={selectedPhieu}
// // // // // // // //           onClose={() => setSelectedPhieu(null)}
// // // // // // // //           onDuyet={handleDuyet}
// // // // // // // //           onTuChoi={handleTuChoi}
// // // // // // // //         />
// // // // // // // //       )}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default PhieuThanhLyList;
// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import axios from 'axios';
// // // // // // // import ModalPhieuThanhLy from './ModalPhieuThanhLy';  // Import modal

// // // // // // // // Main PhieuThanhLyList component
// // // // // // // const PhieuThanhLyList = () => {
// // // // // // //   const [phieuThanhLys, setPhieuThanhLys] = useState([]);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [error, setError] = useState(null);
// // // // // // //   const [selectedPhieu, setSelectedPhieu] = useState(null);
// // // // // // //   const [loadingDetail, setLoadingDetail] = useState(false); // Quản lý trạng thái tải chi tiết

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchData = async () => {
// // // // // // //       try {
// // // // // // //         const response = await axios.get('https://localhost:7240/api/PhieuThanhLy');
// // // // // // //         setPhieuThanhLys(response.data); // Lưu dữ liệu phiếu thanh lý vào state
// // // // // // //         setLoading(false);
// // // // // // //       } catch (error) {
// // // // // // //         setError('Không thể tải dữ liệu');
// // // // // // //         setLoading(false);
// // // // // // //       }
// // // // // // //     };
// // // // // // //     fetchData();
// // // // // // //   }, []);

// // // // // // //   // Lấy chi tiết phiếu thanh lý dựa trên 'MaPhieuTL'
// // // // // // //   const fetchPhieuThanhLyDetails = async (maPhieuTL) => {
// // // // // // //     setLoadingDetail(true);
// // // // // // //     try {
// // // // // // //       const response = await axios.get(`https://localhost:7240/api/PhieuThanhLy/${maPhieuTL}`);
// // // // // // //       setSelectedPhieu(response.data); // Lưu chi tiết phiếu thanh lý vào state
// // // // // // //       setLoadingDetail(false);
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Lỗi khi lấy chi tiết phiếu thanh lý:", error);
// // // // // // //       setLoadingDetail(false);
// // // // // // //       setError("Không thể tải chi tiết phiếu thanh lý");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleDuyet = async (maPhieuTL) => {
// // // // // // //     try {
// // // // // // //       const response = await axios.put(`https://localhost:7240/api/PhieuThanhLy/accept/${maPhieuTL}`);
// // // // // // //       setPhieuThanhLys(
// // // // // // //         phieuThanhLys.map((phieu) =>
// // // // // // //           phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã duyệt thanh lý', loTrangThai: 'Đã thanh lý' } : phieu
// // // // // // //         )
// // // // // // //       );
// // // // // // //       alert('Đã duyệt phiếu thanh lý');
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Lỗi khi duyệt phiếu thanh lý', error);
// // // // // // //       alert('Không thể duyệt phiếu thanh lý');
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleTuChoi = async (maPhieuTL) => {
// // // // // // //     try {
// // // // // // //       const response = await axios.put(`https://localhost:7240/api/PhieuThanhLy/reject/${maPhieuTL}`);
// // // // // // //       setPhieuThanhLys(
// // // // // // //         phieuThanhLys.map((phieu) =>
// // // // // // //           phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã từ chối thanh lý' } : phieu
// // // // // // //         )
// // // // // // //       );
// // // // // // //       alert('Đã từ chối phiếu thanh lý');
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Lỗi khi từ chối phiếu thanh lý', error);
// // // // // // //       alert('Không thể từ chối phiếu thanh lý');
// // // // // // //     }
// // // // // // //   };

// // // // // // //   if (loading) return <div className="text-center">Đang tải dữ liệu...</div>;
// // // // // // //   if (error) return <div className="text-center text-red-500">{error}</div>;

// // // // // // //   return (
// // // // // // //     <div className="p-6">
// // // // // // //       <h2 className="text-3xl font-bold mb-6 text-center">Danh Sách Phiếu Thanh Lý</h2>
// // // // // // //       <table className="min-w-full table-auto mb-6">
// // // // // // //         <thead className="bg-gray-100">
// // // // // // //           <tr>
// // // // // // //             <th className="px-4 py-2 border">Mã Phiếu</th>
// // // // // // //             <th className="px-4 py-2 border">Lý Do</th>
// // // // // // //             <th className="px-4 py-2 border">Trạng Thái</th>
// // // // // // //             <th className="px-4 py-2 border">Phương Thức Thanh Lý</th>
// // // // // // //             <th className="px-4 py-2 border">Ngày Tạo</th>
// // // // // // //             <th className="px-4 py-2 border">Hành Động</th>
// // // // // // //           </tr>
// // // // // // //         </thead>
// // // // // // //         <tbody>
// // // // // // //           {phieuThanhLys.map((phieu) => (
// // // // // // //             <tr key={phieu.maPhieuTL} className="hover:bg-gray-50">
// // // // // // //               <td className="px-4 py-2 border">{phieu.maPhieuTL}</td>
// // // // // // //               <td className="px-4 py-2 border">{phieu.lyDo}</td>
// // // // // // //               <td className="px-4 py-2 border">{phieu.trangThai}</td>
// // // // // // //               <td className="px-4 py-2 border">{phieu.phuongThucThanhLy}</td>
// // // // // // //               <td className="px-4 py-2 border">{new Date(phieu.ngayTao).toLocaleDateString()}</td>
// // // // // // //               <td className="px-4 py-2 border">
// // // // // // //                 <button
// // // // // // //                   onClick={() => fetchPhieuThanhLyDetails(phieu.maPhieuTL)} // Lấy chi tiết khi nhấn vào "Xem Chi Tiết"
// // // // // // //                   className="bg-blue-500 text-white px-4 py-2 rounded mr-2 transition-transform transform hover:scale-105"
// // // // // // //                 >
// // // // // // //                   Xem Chi Tiết
// // // // // // //                 </button>
// // // // // // //                 <button
// // // // // // //                   onClick={() => handleDuyet(phieu.maPhieuTL)}
// // // // // // //                   className="bg-green-500 text-white px-4 py-2 rounded mr-2 transition-transform transform hover:scale-105"
// // // // // // //                 >
// // // // // // //                   Duyệt
// // // // // // //                 </button>
// // // // // // //                 <button
// // // // // // //                   onClick={() => handleTuChoi(phieu.maPhieuTL)}
// // // // // // //                   className="bg-red-500 text-white px-4 py-2 rounded transition-transform transform hover:scale-105"
// // // // // // //                 >
// // // // // // //                   Từ Chối
// // // // // // //                 </button>
// // // // // // //               </td>
// // // // // // //             </tr>
// // // // // // //           ))}
// // // // // // //         </tbody>
// // // // // // //       </table>

// // // // // // //       {selectedPhieu && (
// // // // // // //         <ModalPhieuThanhLy
// // // // // // //           phieu={selectedPhieu}
// // // // // // //           onClose={() => setSelectedPhieu(null)} // Đóng modal khi nhấn "Đóng"
// // // // // // //           loadingDetail={loadingDetail} // Trạng thái tải chi tiết
// // // // // // //           onDuyet={handleDuyet}
// // // // // // //           onTuChoi={handleTuChoi}
// // // // // // //         />
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default PhieuThanhLyList;
// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import axios from 'axios';
// // // // // // import ModalPhieuThanhLy from './ModalPhieuThanhLy';  // Import modal

// // // // // // const PhieuThanhLyList = () => {
// // // // // //   const [phieuThanhLys, setPhieuThanhLys] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [error, setError] = useState(null);
// // // // // //   const [selectedPhieu, setSelectedPhieu] = useState(null);
// // // // // //   const [loadingDetail, setLoadingDetail] = useState(false);

// // // // // //   useEffect(() => {
// // // // // //     const fetchData = async () => {
// // // // // //       try {
// // // // // //         const response = await axios.get('https://localhost:7240/api/PhieuThanhLy');
// // // // // //         setPhieuThanhLys(response.data);
// // // // // //         setLoading(false);
// // // // // //       } catch (error) {
// // // // // //         setError('Không thể tải dữ liệu');
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };
// // // // // //     fetchData();
// // // // // //   }, []);

// // // // // //   // Lấy chi tiết phiếu thanh lý
// // // // // //   const fetchPhieuThanhLyDetails = async (maPhieuTL) => {
// // // // // //     setLoadingDetail(true);
// // // // // //     try {
// // // // // //       const response = await axios.get(`https://localhost:7240/api/PhieuThanhLy/${maPhieuTL}`);
// // // // // //       setSelectedPhieu(response.data);
// // // // // //       setLoadingDetail(false);
// // // // // //     } catch (error) {
// // // // // //       setLoadingDetail(false);
// // // // // //       setError("Không thể tải chi tiết phiếu thanh lý");
// // // // // //     }
// // // // // //   };

// // // // // //   const handleDuyet = async (maPhieuTL) => {
// // // // // //     try {
// // // // // //       await axios.put(`https://localhost:7240/api/PhieuThanhLy/accept/${maPhieuTL}`);
// // // // // //       setPhieuThanhLys(phieuThanhLys.map(phieu => 
// // // // // //         phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã duyệt thanh lý' } : phieu
// // // // // //       ));
// // // // // //       alert('Đã duyệt phiếu thanh lý');
// // // // // //     } catch (error) {
// // // // // //       alert('Không thể duyệt phiếu thanh lý');
// // // // // //     }
// // // // // //   };

// // // // // //   const handleTuChoi = async (maPhieuTL) => {
// // // // // //     try {
// // // // // //       await axios.put(`https://localhost:7240/api/PhieuThanhLy/reject/${maPhieuTL}`);
// // // // // //       setPhieuThanhLys(phieuThanhLys.map(phieu => 
// // // // // //         phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã từ chối thanh lý' } : phieu
// // // // // //       ));
// // // // // //       alert('Đã từ chối phiếu thanh lý');
// // // // // //     } catch (error) {
// // // // // //       alert('Không thể từ chối phiếu thanh lý');
// // // // // //     }
// // // // // //   };

// // // // // //   // Gộp các phiếu thanh lý theo lý do
// // // // // //   const groupedPhieuThanhLys = phieuThanhLys.reduce((groups, phieu) => {
// // // // // //     const key = phieu.trangThai;  // Sử dụng 'lyDo' làm khóa để nhóm phiếu thanh lý
// // // // // //     if (!groups[key]) {
// // // // // //       groups[key] = [];
// // // // // //     }
// // // // // //     groups[key].push(phieu);
// // // // // //     return groups;
// // // // // //   }, {});

// // // // // //   if (loading) return <div className="text-center">Đang tải dữ liệu...</div>;
// // // // // //   if (error) return <div className="text-center text-red-500">{error}</div>;

// // // // // //   return (
// // // // // //     <div className="p-6">
// // // // // //       <h2 className="text-3xl font-bold mb-6 text-center">Danh Sách Phiếu Thanh Lý</h2>
      
// // // // // //       {/* Duyệt qua các nhóm phiếu thanh lý */}
// // // // // //       {Object.keys(groupedPhieuThanhLys).map((lyDo) => (
// // // // // //         <div key={lyDo} className="mb-6">
// // // // // //           <h3 className="text-xl font-semibold">{lyDo}</h3> {/* Hiển thị Lý Do */}
// // // // // //           <table className="min-w-full table-auto mt-4">
// // // // // //             <thead className="bg-gray-100">
// // // // // //               <tr>
// // // // // //                 <th className="px-4 py-2 border">Mã Phiếu</th>
// // // // // //                 <th className="px-4 py-2 border">Trạng Thái</th>
// // // // // //                 <th className="px-4 py-2 border">Phương Thức Thanh Lý</th>
// // // // // //                 <th className="px-4 py-2 border">Ngày Tạo</th>
// // // // // //                 <th className="px-4 py-2 border">Hành Động</th>
// // // // // //               </tr>
// // // // // //             </thead>
// // // // // //             <tbody>
// // // // // //               {groupedPhieuThanhLys[lyDo].map((phieu) => (
// // // // // //                 <tr key={phieu.maPhieuTL} className="hover:bg-gray-50">
// // // // // //                   <td className="px-4 py-2 border">{phieu.maPhieuTL}</td>
// // // // // //                   <td className="px-4 py-2 border">{phieu.trangThai}</td>
// // // // // //                   <td className="px-4 py-2 border">{phieu.phuongThucThanhLy}</td>
// // // // // //                   <td className="px-4 py-2 border">{new Date(phieu.ngayTao).toLocaleDateString()}</td>
// // // // // //                   <td className="px-4 py-2 border">
// // // // // //                     <button
// // // // // //                       onClick={() => fetchPhieuThanhLyDetails(phieu.maPhieuTL)}
// // // // // //                       className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
// // // // // //                     >
// // // // // //                       Xem Chi Tiết
// // // // // //                     </button>
// // // // // //                     <button
// // // // // //                       onClick={() => handleDuyet(phieu.maPhieuTL)}
// // // // // //                       className="bg-green-500 text-white px-4 py-2 rounded mr-2"
// // // // // //                     >
// // // // // //                       Duyệt
// // // // // //                     </button>
// // // // // //                     <button
// // // // // //                       onClick={() => handleTuChoi(phieu.maPhieuTL)}
// // // // // //                       className="bg-red-500 text-white px-4 py-2 rounded"
// // // // // //                     >
// // // // // //                       Từ Chối
// // // // // //                     </button>
// // // // // //                   </td>
// // // // // //                 </tr>
// // // // // //               ))}
// // // // // //             </tbody>
// // // // // //           </table>
// // // // // //         </div>
// // // // // //       ))}

// // // // // //       {/* Hiển thị modal khi có chi tiết phiếu thanh lý */}
// // // // // //       {selectedPhieu && (
// // // // // //         <ModalPhieuThanhLy
// // // // // //           phieu={selectedPhieu}
// // // // // //           onClose={() => setSelectedPhieu(null)}
// // // // // //           loadingDetail={loadingDetail}
// // // // // //           onDuyet={handleDuyet}
// // // // // //           onTuChoi={handleTuChoi}
// // // // // //         />
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default PhieuThanhLyList;
// // // // // import React, { useState, useEffect } from 'react';
// // // // // import axios from 'axios';
// // // // // import ModalPhieuThanhLy from './ModalPhieuThanhLy';  // Import modal

// // // // // const PhieuThanhLyList = () => {
// // // // //   const [phieuThanhLys, setPhieuThanhLys] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);
// // // // //   const [selectedPhieu, setSelectedPhieu] = useState(null);
// // // // //   const [loadingDetail, setLoadingDetail] = useState(false);

// // // // //   useEffect(() => {
// // // // //     const fetchData = async () => {
// // // // //       try {
// // // // //         const response = await axios.get('https://localhost:7240/api/PhieuThanhLy');
// // // // //         setPhieuThanhLys(response.data);  // Lưu dữ liệu phiếu thanh lý vào state
// // // // //         setLoading(false);
// // // // //       } catch (error) {
// // // // //         setError('Không thể tải dữ liệu');
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };
// // // // //     fetchData();
// // // // //   }, []);

// // // // //   // Lấy chi tiết phiếu thanh lý
// // // // //   const fetchPhieuThanhLyDetails = async (maPhieuTL) => {
// // // // //     setLoadingDetail(true);
// // // // //     try {
// // // // //       const response = await axios.get(`https://localhost:7240/api/PhieuThanhLy/${maPhieuTL}`);
// // // // //       setSelectedPhieu(response.data);
// // // // //       setLoadingDetail(false);
// // // // //     } catch (error) {
// // // // //       setLoadingDetail(false);
// // // // //       setError("Không thể tải chi tiết phiếu thanh lý");
// // // // //     }
// // // // //   };

// // // // //   const handleDuyet = async (maPhieuTL) => {
// // // // //     try {
// // // // //       await axios.put(`https://localhost:7240/api/PhieuThanhLy/accept/${maPhieuTL}`);
// // // // //       setPhieuThanhLys(phieuThanhLys.map(phieu => 
// // // // //         phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã duyệt thanh lý' } : phieu
// // // // //       ));
// // // // //       alert('Đã duyệt phiếu thanh lý');
// // // // //     } catch (error) {
// // // // //       alert('Không thể duyệt phiếu thanh lý');
// // // // //     }
// // // // //   };

// // // // //   const handleTuChoi = async (maPhieuTL) => {
// // // // //     try {
// // // // //       await axios.put(`https://localhost:7240/api/PhieuThanhLy/reject/${maPhieuTL}`);
// // // // //       setPhieuThanhLys(phieuThanhLys.map(phieu => 
// // // // //         phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã từ chối thanh lý' } : phieu
// // // // //       ));
// // // // //       alert('Đã từ chối phiếu thanh lý');
// // // // //     } catch (error) {
// // // // //       alert('Không thể từ chối phiếu thanh lý');
// // // // //     }
// // // // //   };

// // // // //   // Cập nhật danh sách phiếu thanh lý để gộp các hóa chất trong cùng một phiếu
// // // // //   const groupedPhieuThanhLys = phieuThanhLys.reduce((groups, phieu) => {
// // // // //     const key = phieu.maPhieuTL;  // Dùng mã phiếu làm khóa
// // // // //     if (!groups[key]) {
// // // // //       groups[key] = { ...phieu, hoaChat: [] };  // Khởi tạo đối tượng cho mã phiếu này
// // // // //     }
// // // // //     groups[key].hoaChat.push(phieu);  // Gộp tất cả hóa chất thuộc cùng mã phiếu
// // // // //     return groups;
// // // // //   }, {});

// // // // //   if (loading) return <div className="text-center">Đang tải dữ liệu...</div>;
// // // // //   if (error) return <div className="text-center text-red-500">{error}</div>;

// // // // //   return (
// // // // //     <div className="p-6">
// // // // //       <h2 className="text-3xl font-bold mb-6 text-center">Danh Sách Phiếu Thanh Lý</h2>

// // // // //       {/* Duyệt qua các phiếu thanh lý đã được nhóm lại */}
// // // // //       {Object.keys(groupedPhieuThanhLys).map((maPhieuTL) => {
// // // // //         const phieu = groupedPhieuThanhLys[maPhieuTL];
// // // // //         return (
// // // // //           <div key={maPhieuTL} className="mb-6">
// // // // //             <h3 className="text-xl font-semibold">Mã Phiếu: {maPhieuTL}</h3> {/* Hiển thị Mã Phiếu */}
// // // // //             <table className="min-w-full table-auto mt-4">
// // // // //               <thead className="bg-gray-100">
// // // // //                 <tr>
// // // // //                   <th className="px-4 py-2 border">Lý Do</th>
// // // // //                   <th className="px-4 py-2 border">Trạng Thái</th>
// // // // //                   <th className="px-4 py-2 border">Phương Thức Thanh Lý</th>
// // // // //                   <th className="px-4 py-2 border">Ngày Tạo</th>
// // // // //                   <th className="px-4 py-2 border">Hành Động</th>
// // // // //                 </tr>
// // // // //               </thead>
// // // // //               <tbody>
// // // // //                 {phieu.hoaChat.map((item) => (
// // // // //                   <tr key={item.maPhieuTL} className="hover:bg-gray-50">
// // // // //                     <td className="px-4 py-2 border">{item.lyDo}</td>
// // // // //                     <td className="px-4 py-2 border">{item.trangThai}</td>
// // // // //                     <td className="px-4 py-2 border">{item.phuongThucThanhLy}</td>
// // // // //                     <td className="px-4 py-2 border">{new Date(item.ngayTao).toLocaleDateString()}</td>
// // // // //                     <td className="px-4 py-2 border">
// // // // //                       <button
// // // // //                         onClick={() => fetchPhieuThanhLyDetails(maPhieuTL)}
// // // // //                         className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
// // // // //                       >
// // // // //                         Xem Chi Tiết
// // // // //                       </button>
// // // // //                       <button
// // // // //                         onClick={() => handleDuyet(maPhieuTL)}
// // // // //                         className="bg-green-500 text-white px-4 py-2 rounded mr-2"
// // // // //                       >
// // // // //                         Duyệt
// // // // //                       </button>
// // // // //                       <button
// // // // //                         onClick={() => handleTuChoi(maPhieuTL)}
// // // // //                         className="bg-red-500 text-white px-4 py-2 rounded"
// // // // //                       >
// // // // //                         Từ Chối
// // // // //                       </button>
// // // // //                     </td>
// // // // //                   </tr>
// // // // //                 ))}
// // // // //               </tbody>
// // // // //             </table>
// // // // //           </div>
// // // // //         );
// // // // //       })}

// // // // //       {/* Hiển thị modal khi có chi tiết phiếu thanh lý */}
// // // // //       {selectedPhieu && (
// // // // //         <ModalPhieuThanhLy
// // // // //           phieu={selectedPhieu}
// // // // //           onClose={() => setSelectedPhieu(null)}
// // // // //           loadingDetail={loadingDetail}
// // // // //           onDuyet={handleDuyet}
// // // // //           onTuChoi={handleTuChoi}
// // // // //         />
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default PhieuThanhLyList;
// // // // import React, { useState, useEffect } from 'react';
// // // // import axios from 'axios';
// // // // import ModalPhieuThanhLy from './ModalPhieuThanhLy';  // Import modal component

// // // // // const PhieuThanhLyList = () => {
// // // // //   const [phieuThanhLys, setPhieuThanhLys] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);
// // // // //   const [selectedPhieu, setSelectedPhieu] = useState(null);
// // // // //   const [loadingDetail, setLoadingDetail] = useState(false);

// // // // //   useEffect(() => {
// // // // //     const fetchData = async () => {
// // // // //       try {
// // // // //         const response = await axios.get('https://localhost:7240/api/PhieuThanhLy');
// // // // //         setPhieuThanhLys(response.data);  // Lưu dữ liệu phiếu thanh lý vào state
// // // // //         setLoading(false);
// // // // //       } catch (error) {
// // // // //         setError('Không thể tải dữ liệu');
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };
// // // // //     fetchData();
// // // // //   }, []);

// // // // //   // Lấy chi tiết phiếu thanh lý khi nhấn vào "Xem Chi Tiết"
// // // // //   const fetchPhieuThanhLyDetails = async (maPhieuTL) => {
// // // // //     setLoadingDetail(true);
// // // // //     try {
// // // // //       const response = await axios.get(`https://localhost:7240/api/PhieuThanhLy/${maPhieuTL}`);
// // // // //       setSelectedPhieu(response.data);
// // // // //       setLoadingDetail(false);
// // // // //     } catch (error) {
// // // // //       setLoadingDetail(false);
// // // // //       setError("Không thể tải chi tiết phiếu thanh lý");
// // // // //     }
// // // // //   };

// // // // //   const handleDuyet = async (maPhieuTL) => {
// // // // //     try {
// // // // //       await axios.put(`https://localhost:7240/api/PhieuThanhLy/accept/${maPhieuTL}`);
// // // // //       setPhieuThanhLys(phieuThanhLys.map(phieu => 
// // // // //         phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã duyệt thanh lý' } : phieu
// // // // //       ));
// // // // //       alert('Đã duyệt phiếu thanh lý');
// // // // //     } catch (error) {
// // // // //       alert('Không thể duyệt phiếu thanh lý');
// // // // //     }
// // // // //   };

// // // // //   const handleTuChoi = async (maPhieuTL) => {
// // // // //     try {
// // // // //       await axios.put(`https://localhost:7240/api/PhieuThanhLy/reject/${maPhieuTL}`);
// // // // //       setPhieuThanhLys(phieuThanhLys.map(phieu => 
// // // // //         phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã từ chối thanh lý' } : phieu
// // // // //       ));
// // // // //       alert('Đã từ chối phiếu thanh lý');
// // // // //     } catch (error) {
// // // // //       alert('Không thể từ chối phiếu thanh lý');
// // // // //     }
// // // // //   };

// // // // //   // Cập nhật danh sách phiếu thanh lý để gộp các hóa chất trong cùng một phiếu
// // // // //   const groupedPhieuThanhLys = phieuThanhLys.reduce((groups, phieu) => {
// // // // //     const key = phieu.maPhieuTL;  // Dùng mã phiếu làm khóa
// // // // //     if (!groups[key]) {
// // // // //       groups[key] = { ...phieu, hoaChat: [] };  // Khởi tạo đối tượng cho mã phiếu này
// // // // //     }
// // // // //     groups[key].hoaChat.push(phieu);  // Gộp tất cả hóa chất thuộc cùng mã phiếu
// // // // //     return groups;
// // // // //   }, {});

// // // // //   if (loading) return <div className="text-center">Đang tải dữ liệu...</div>;
// // // // //   if (error) return <div className="text-center text-red-500">{error}</div>;

// // // // //   return (
// // // // //     <div className="p-6">
// // // // //       <h2 className="text-3xl font-bold mb-6 text-center">Danh Sách Phiếu Thanh Lý</h2>

// // // // //       {/* Duyệt qua các phiếu thanh lý đã được nhóm lại */}
// // // // //       {Object.keys(groupedPhieuThanhLys).map((maPhieuTL) => {
// // // // //         const phieu = groupedPhieuThanhLys[maPhieuTL];
// // // // //         return (
// // // // //           <div key={maPhieuTL} className="mb-6">
// // // // //             <h3 className="text-xl font-semibold">Mã Phiếu: {maPhieuTL}</h3> {/* Hiển thị Mã Phiếu */}
// // // // //             <table className="min-w-full table-auto mt-4">
// // // // //               <thead className="bg-gray-100">
// // // // //                 <tr>
// // // // //                   <th className="px-4 py-2 border">Lý Do</th>
// // // // //                   <th className="px-4 py-2 border">Trạng Thái</th>
// // // // //                   <th className="px-4 py-2 border">Phương Thức Thanh Lý</th>
// // // // //                   <th className="px-4 py-2 border">Ngày Tạo</th>
// // // // //                   <th className="px-4 py-2 border">Hành Động</th>
// // // // //                 </tr>
// // // // //               </thead>
// // // // //               <tbody>
// // // // //                 {phieu.hoaChat.map((item) => (
// // // // //                   <tr key={item.maPhieuTL} className="hover:bg-gray-50">
// // // // //                     <td className="px-4 py-2 border">{item.lyDo}</td>
// // // // //                     <td className="px-4 py-2 border">{item.trangThai}</td>
// // // // //                     <td className="px-4 py-2 border">{item.phuongThucThanhLy}</td>
// // // // //                     <td className="px-4 py-2 border">{new Date(item.ngayTao).toLocaleDateString()}</td>
// // // // //                     <td className="px-4 py-2 border">
// // // // //                       <button
// // // // //                         onClick={() => fetchPhieuThanhLyDetails(maPhieuTL)}
// // // // //                         className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
// // // // //                       >
// // // // //                         Xem Chi Tiết
// // // // //                       </button>
// // // // //                       <button
// // // // //                         onClick={() => handleDuyet(maPhieuTL)}
// // // // //                         className="bg-green-500 text-white px-4 py-2 rounded mr-2"
// // // // //                       >
// // // // //                         Duyệt
// // // // //                       </button>
// // // // //                       <button
// // // // //                         onClick={() => handleTuChoi(maPhieuTL)}
// // // // //                         className="bg-red-500 text-white px-4 py-2 rounded"
// // // // //                       >
// // // // //                         Từ Chối
// // // // //                       </button>
// // // // //                     </td>
// // // // //                   </tr>
// // // // //                 ))}
// // // // //               </tbody>
// // // // //             </table>
// // // // //           </div>
// // // // //         );
// // // // //       })}

// // // // //       {/* Hiển thị modal khi có chi tiết phiếu thanh lý */}
// // // // //       {selectedPhieu && (
// // // // //         <ModalPhieuThanhLy
// // // // //           phieu={selectedPhieu}
// // // // //           onClose={() => setSelectedPhieu(null)}
// // // // //           loadingDetail={loadingDetail}
// // // // //           onDuyet={handleDuyet}
// // // // //           onTuChoi={handleTuChoi}
// // // // //         />
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default PhieuThanhLyList;

// // // // // PhieuThanhLyList component
// // // // const PhieuThanhLyList = () => {
// // // //   const [phieuThanhLys, setPhieuThanhLys] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);
// // // //   const [selectedPhieu, setSelectedPhieu] = useState(null);

// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       try {
// // // //         const response = await axios.get('https://localhost:7240/api/PhieuThanhLy');
// // // //         setPhieuThanhLys(response.data);
// // // //         setLoading(false);
// // // //       } catch (error) {
// // // //         setError('Không thể tải dữ liệu');
// // // //         setLoading(false);
// // // //       }
// // // //     };
// // // //     fetchData();
// // // //   }, []);

// // // //   const handleDuyet = async (maPhieuTL) => {
// // // //     try {
// // // //       await axios.put(`https://localhost:7240/api/PhieuThanhLy/accept/${maPhieuTL}`);
// // // //       setPhieuThanhLys((prevState) =>
// // // //         prevState.map((phieu) =>
// // // //           phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã duyệt thanh lý', loTrangThai: 'Đã thanh lý' } : phieu
// // // //         )
// // // //       );
// // // //       alert('Đã duyệt phiếu thanh lý');
// // // //     } catch (error) {
// // // //       alert('Không thể duyệt phiếu thanh lý');
// // // //     }
// // // //   };

// // // //   const handleTuChoi = async (maPhieuTL) => {
// // // //     try {
// // // //       await axios.put(`https://localhost:7240/api/PhieuThanhLy/reject/${maPhieuTL}`);
// // // //       setPhieuThanhLys((prevState) =>
// // // //         prevState.map((phieu) =>
// // // //           phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã từ chối thanh lý' } : phieu
// // // //         )
// // // //       );
// // // //       alert('Đã từ chối phiếu thanh lý');
// // // //     } catch (error) {
// // // //       alert('Không thể từ chối phiếu thanh lý');
// // // //     }
// // // //   };

// // // //   if (loading) return <div className="text-center">Đang tải dữ liệu...</div>;
// // // //   if (error) return <div className="text-center text-red-500">{error}</div>;

// // // //   return (
// // // //     <div className="p-6">
// // // //       <h2 className="text-3xl font-bold mb-6 text-center">Danh Sách Phiếu Thanh Lý</h2>
// // // //       <table className="min-w-full table-auto mb-6">
// // // //         <thead className="bg-gray-100">
// // // //           <tr>
// // // //             <th className="px-4 py-2 border">Mã Phiếu</th>
// // // //             <th className="px-4 py-2 border">Lý Do</th>
// // // //             <th className="px-4 py-2 border">Trạng Thái</th>
// // // //             <th className="px-4 py-2 border">Phương Thức Thanh Lý</th>
// // // //             <th className="px-4 py-2 border">Ngày Tạo</th>
// // // //             <th className="px-4 py-2 border">Hành Động</th>
// // // //           </tr>
// // // //         </thead>
// // // //         <tbody>
// // // //           {phieuThanhLys.map((phieu) => (
// // // //             <tr key={phieu.maPhieuTL} className="hover:bg-gray-50">
// // // //               <td className="px-4 py-2 border">{phieu.maPhieuTL}</td>
// // // //               <td className="px-4 py-2 border">{phieu.lyDo}</td>
// // // //               <td className="px-4 py-2 border">{phieu.trangThai}</td>
// // // //               <td className="px-4 py-2 border">{phieu.phuongThucThanhLy}</td>
// // // //               <td className="px-4 py-2 border">{new Date(phieu.ngayTao).toLocaleDateString()}</td>
// // // //               <td className="px-4 py-2 border">
// // // //                 <button
// // // //                   onClick={() => setSelectedPhieu(phieu)}
// // // //                   className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
// // // //                 >
// // // //                   Xem Chi Tiết
// // // //                 </button>
// // // //                 <button
// // // //                   onClick={() => handleDuyet(phieu.maPhieuTL)}
// // // //                   className="bg-green-500 text-white px-4 py-2 rounded mr-2"
// // // //                 >
// // // //                   Duyệt
// // // //                 </button>
// // // //                 <button
// // // //                   onClick={() => handleTuChoi(phieu.maPhieuTL)}
// // // //                   className="bg-red-500 text-white px-4 py-2 rounded"
// // // //                 >
// // // //                   Từ Chối
// // // //                 </button>
// // // //               </td>
// // // //             </tr>
// // // //           ))}
// // // //         </tbody>
// // // //       </table>

// // // //       {selectedPhieu && (
// // // //         <ModalPhieuThanhLy
// // // //           phieu={selectedPhieu}
// // // //           onClose={() => setSelectedPhieu(null)}
// // // //           onDuyet={handleDuyet}
// // // //           onTuChoi={handleTuChoi}
// // // //         />
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default PhieuThanhLyList;

// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';


// // // // Modal chi tiết phiếu thanh lý
// // // const ModalPhieuThanhLy = ({ phieu, onClose, onDuyet, onTuChoi }) => {
// // //   if (!phieu) return null; // Nếu không có phiếu thì không render modal

// // //   return (
// // //     <div className="modal-overlay">
// // //       <div className="modal-content">
// // //         <h2 className="text-2xl font-bold mb-4">Chi Tiết Phiếu Thanh Lý</h2>
// // //         <div className="mb-4">
// // //           <p><strong>Mã Phiếu:</strong> {phieu.maPhieuTL}</p>
// // //           <p><strong>Lý Do:</strong> {phieu.lyDo}</p>
// // //           <p><strong>Trạng Thái:</strong> {phieu.trangThai}</p>
// // //           <p><strong>Phương Thức Thanh Lý:</strong> {phieu.phuongThucThanhLy}</p>
// // //           <p><strong>Ngày Tạo:</strong> {new Date(phieu.ngayTao).toLocaleDateString()}</p>
// // //         </div>

// // //         <h3 className="text-xl font-semibold mb-4">Danh Sách Hóa Chất</h3>
// // //         <table className="min-w-full table-auto">
// // //           <thead className="bg-gray-100">
// // //             <tr>
// // //             <th className="px-4 py-2 border">Người Yêu cầu thanh lý </th>
// // //             <th className="px-4 py-2 border">Email</th>
// // //               <th className="px-4 py-2 border">Mã lô hóa chất</th>
// // //               <th className="px-4 py-2 border">Tên nhà Cung Cấp</th>
// // //               <th className="px-4 py-2 border">Lô Trạng thái</th>
// // //               <th className="px-4 py-2 border">Tên hóa chất</th>
// // //               <th className="px-4 py-2 border">Số lô hóa chất</th>
// // //               <th className="px-4 py-2 border">Trạng thái hóa chất</th>
// // //               <th className="px-4 py-2 border">Số CAS hóa chất</th>
// // //               <th className="px-4 py-2 border">Hạn Sử Dụng</th>
// // //             </tr>
            
// // //           </thead>
  
// // //           <tbody>
          
// // //               <tr key={phieu.maHoaChat} className="hover:bg-gray-50">
                
// // //                 <td className="px-4 py-2 border">{phieu.nguoiDung_TenDangNhap}</td>
// // //                 <td className="px-4 py-2 border">{phieu.nguoiDung_Email}</td>
// // //                 <td className="px-4 py-2 border">{phieu.maLo}</td>
// // //                 <td className="px-4 py-2 border">{phieu.nhaCungCap}</td>
// // //                 <td className="px-4 py-2 border">{phieu.loTrangThai}</td>
// // //                 <td className="px-4 py-2 border">{phieu.tenHoaChat}</td>
// // //                 <td className="px-4 py-2 border">{phieu.hoaChatSoLo}</td>
// // //                 <td className="px-4 py-2 border">{phieu.trangThai}</td>
// // //                 <td className="px-4 py-2 border">{phieu.hoaChatSoCAS}</td>
// // //                 <td className="px-4 py-2 border">{new Date(phieu.hanSuDung).toLocaleDateString()}</td>
// // //               </tr>
           
// // //           </tbody>
// // //         </table>

// // //         <div className="mt-4 flex justify-end">
// // //           <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Đóng</button>
// // //           <button
// // //             onClick={() => onDuyet(phieu.maPhieuTL)}
// // //             className="bg-green-500 text-white px-4 py-2 rounded mr-2"
// // //           >
// // //             Duyệt
// // //           </button>
// // //           <button
// // //             onClick={() => onTuChoi(phieu.maPhieuTL)}
// // //             className="bg-red-500 text-white px-4 py-2 rounded"
// // //           >
// // //             Từ Chối
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // PhieuThanhLyList component
// // // const PhieuThanhLyList = () => {
// // //   const [phieuThanhLys, setPhieuThanhLys] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [selectedPhieu, setSelectedPhieu] = useState(null);

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         const response = await axios.get('https://localhost:7240/api/PhieuThanhLy');
// // //         setPhieuThanhLys(response.data);
// // //         setLoading(false);
// // //       } catch (error) {
// // //         setError('Không thể tải dữ liệu');
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchData();
// // //   }, []);

// // //   const handleDuyet = async (maPhieuTL) => {
// // //     try {
// // //       await axios.put(`https://localhost:7240/api/PhieuThanhLy/accept/${maPhieuTL}`);
// // //       setPhieuThanhLys((prevState) =>
// // //         prevState.map((phieu) =>
// // //           phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã duyệt thanh lý', loTrangThai: 'Đã thanh lý' } : phieu
// // //         )
// // //       );
// // //       alert('Đã duyệt phiếu thanh lý');
// // //     } catch (error) {
// // //       alert('Không thể duyệt phiếu thanh lý');
// // //     }
// // //   };

// // //   const handleTuChoi = async (maPhieuTL) => {
// // //     try {
// // //       await axios.put(`https://localhost:7240/api/PhieuThanhLy/reject/${maPhieuTL}`);
// // //       setPhieuThanhLys((prevState) =>
// // //         prevState.map((phieu) =>
// // //           phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã từ chối thanh lý' } : phieu
// // //         )
// // //       );
// // //       alert('Đã từ chối phiếu thanh lý');
// // //     } catch (error) {
// // //       alert('Không thể từ chối phiếu thanh lý');
// // //     }
// // //   };

// // //   if (loading) return <div className="text-center">Đang tải dữ liệu...</div>;
// // //   if (error) return <div className="text-center text-red-500">{error}</div>;

// // //   return (
// // //     <div className="p-6">
// // //       <h2 className="text-3xl font-bold mb-6 text-center">Danh Sách Phiếu Thanh Lý</h2>
// // //       <table className="min-w-full table-auto mb-6">
// // //         <thead className="bg-gray-100">
// // //           <tr>
// // //             <th className="px-4 py-2 border">Mã Phiếu</th>
// // //             <th className="px-4 py-2 border">Lý Do</th>
// // //             <th className="px-4 py-2 border">Trạng Thái</th>
// // //             <th className="px-4 py-2 border">Phương Thức Thanh Lý</th>
// // //             <th className="px-4 py-2 border">Ngày Tạo</th>
// // //             <th className="px-4 py-2 border">Hành Động</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {phieuThanhLys.map((phieu) => (
// // //             <tr key={phieu.maPhieuTL} className="hover:bg-gray-50">
// // //               <td className="px-4 py-2 border">{phieu.maPhieuTL}</td>
// // //               <td className="px-4 py-2 border">{phieu.lyDo}</td>
// // //               <td className="px-4 py-2 border">{phieu.trangThai}</td>
// // //               <td className="px-4 py-2 border">{phieu.phuongThucThanhLy}</td>
// // //               <td className="px-4 py-2 border">{new Date(phieu.ngayTao).toLocaleDateString()}</td>
// // //               <td className="px-4 py-2 border">
// // //                 <button
// // //                   onClick={() => setSelectedPhieu(phieu)}
// // //                   className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
// // //                 >
// // //                   Xem Chi Tiết
// // //                 </button>
// // //                 <button
// // //                   onClick={() => handleDuyet(phieu.maPhieuTL)}
// // //                   className="bg-green-500 text-white px-4 py-2 rounded mr-2"
// // //                 >
// // //                   Duyệt
// // //                 </button>
// // //                 <button
// // //                   onClick={() => handleTuChoi(phieu.maPhieuTL)}
// // //                   className="bg-red-500 text-white px-4 py-2 rounded"
// // //                 >
// // //                   Từ Chối
// // //                 </button>
// // //               </td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>

// // //       {selectedPhieu && (
// // //         <ModalPhieuThanhLy
// // //           phieu={selectedPhieu}
// // //           onClose={() => setSelectedPhieu(null)}
// // //           onDuyet={handleDuyet}
// // //           onTuChoi={handleTuChoi}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default PhieuThanhLyList;
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import ModalPhieuThanhLy from './ModalPhieuThanhLy';  // Import ModalPhieuThanhLy

// // const PhieuThanhLyList = () => {
// //   const [phieuThanhLys, setPhieuThanhLys] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [selectedPhieu, setSelectedPhieu] = useState(null);  // Lưu phiếu thanh lý được chọn

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await axios.get('https://localhost:7240/api/PhieuThanhLy');
// //         setPhieuThanhLys(response.data);
// //         setLoading(false);
// //       } catch (error) {
// //         setError('Không thể tải dữ liệu');
// //         setLoading(false);
// //       }
// //     };
// //     fetchData();
// //   }, []);

// //   const handleDuyet = async (maPhieuTL) => {
// //     try {
// //       await axios.put(`https://localhost:7240/api/PhieuThanhLy/accept/${maPhieuTL}`);
// //       setPhieuThanhLys((prevState) =>
// //         prevState.map((phieu) =>
// //           phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã duyệt thanh lý', loTrangThai: 'Đã thanh lý' } : phieu
// //         )
// //       );
// //       alert('Đã duyệt phiếu thanh lý');
// //     } catch (error) {
// //       alert('Không thể duyệt phiếu thanh lý');
// //     }
// //   };

// //   const handleTuChoi = async (maPhieuTL) => {
// //     try {
// //       await axios.put(`https://localhost:7240/api/PhieuThanhLy/reject/${maPhieuTL}`);
// //       setPhieuThanhLys((prevState) =>
// //         prevState.map((phieu) =>
// //           phieu.maPhieuTL === maPhieuTL ? { ...phieu, trangThai: 'Đã từ chối thanh lý' } : phieu
// //         )
// //       );
// //       alert('Đã từ chối phiếu thanh lý');
// //     } catch (error) {
// //       alert('Không thể từ chối phiếu thanh lý');
// //     }
// //   };

// //   if (loading) return <div className="text-center">Đang tải dữ liệu...</div>;
// //   if (error) return <div className="text-center text-red-500">{error}</div>;

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-3xl font-bold mb-6 text-center">Danh Sách Phiếu Thanh Lý</h2>
// //       <table className="min-w-full table-auto mb-6">
// //         <thead className="bg-gray-100">
// //           <tr>
// //             <th className="px-4 py-2 border">Mã Phiếu</th>
// //             <th className="px-4 py-2 border">Lý Do</th>
// //             <th className="px-4 py-2 border">Trạng Thái</th>
// //             <th className="px-4 py-2 border">Phương Thức Thanh Lý</th>
// //             <th className="px-4 py-2 border">Ngày Tạo</th>
// //             <th className="px-4 py-2 border">Hành Động</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {phieuThanhLys.map((phieu) => (
// //             <tr key={phieu.maPhieuTL} className="hover:bg-gray-50">
// //               <td className="px-4 py-2 border">{phieu.maPhieuTL}</td>
// //               <td className="px-4 py-2 border">{phieu.lyDo}</td>
// //               <td className="px-4 py-2 border">{phieu.trangThai}</td>
// //               <td className="px-4 py-2 border">{phieu.phuongThucThanhLy}</td>
// //               <td className="px-4 py-2 border">{new Date(phieu.ngayTao).toLocaleDateString()}</td>
// //               <td className="px-4 py-2 border">
// //                 <button
// //                   onClick={() => setSelectedPhieu(phieu.maPhieuTL)}  // Cập nhật mã phiếu khi nhấn "Xem Chi Tiết"
// //                   className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
// //                 >
// //                   Xem Chi Tiết
// //                 </button>
// //                 <button
// //                   onClick={() => handleDuyet(phieu.maPhieuTL)}
// //                   className="bg-green-500 text-white px-4 py-2 rounded mr-2"
// //                 >
// //                   Duyệt
// //                 </button>
// //                 <button
// //                   onClick={() => handleTuChoi(phieu.maPhieuTL)}
// //                   className="bg-red-500 text-white px-4 py-2 rounded"
// //                 >
// //                   Từ Chối
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {/* Nếu đã chọn phiếu thanh lý, hiển thị Modal */}
// //       {selectedPhieu && (
// //         <ModalPhieuThanhLy
// //           maPhieuTL={selectedPhieu}  // Truyền mã phiếu vào Modal
// //           onClose={() => setSelectedPhieu(null)}  // Đóng modal khi không cần xem nữa
// //           onDuyet={handleDuyet}
// //           onTuChoi={handleTuChoi}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default PhieuThanhLyList;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ModalPhieuThanhLy from './ModalPhieuThanhLy'; // Import Modal hiển thị chi tiết phiếu thanh lý

// const PhieuThanhLyList = () => {
//   const [phieuThanhLys, setPhieuThanhLys] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedPhieu, setSelectedPhieu] = useState(null); // Lưu phiếu được chọn để hiển thị chi tiết
//   const [processed, setProcessed] = useState(new Set()); // Lưu trữ các mã phiếu đã được xử lý

//   // Hàm lấy dữ liệu phiếu thanh lý
//   const fetchPhieuThanhLys = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('https://localhost:7240/api/PhieuThanhLy');
//       setPhieuThanhLys(response.data);
//       setError(null);
//     } catch (err) {
//       setError('Không thể tải dữ liệu');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPhieuThanhLys();
//   }, []);

//   // Xử lý hành động duyệt phiếu
//   const handleDuyet = async (maPhieuTL) => {
//     const phieu = phieuThanhLys.find((p) => p.maPhieuTL === maPhieuTL);
//     if (phieu.trangThai !== 'Chờ duyệt') {
//       alert('Phiếu thanh lý này đã được xử lý.');
//       return;
//     }

//     const confirmDuyet = window.confirm(
//       'Bạn có chắc chắn muốn duyệt phiếu thanh lý này? Hành động này không thể hoàn tác.'
//     );
//     if (!confirmDuyet) return;

//     try {
//       await axios.put(`https://localhost:7240/api/PhieuThanhLy/accept/${maPhieuTL}`);
//       alert('Đã duyệt phiếu thanh lý');
//       setProcessed((prev) => new Set([...prev, maPhieuTL])); // Đánh dấu phiếu đã được duyệt
//       fetchPhieuThanhLys(); // Gọi lại API để cập nhật danh sách
//     } catch (err) {
//       alert('Không thể duyệt phiếu thanh lý');
//     }
//   };

//   // Xử lý hành động từ chối phiếu
//   const handleTuChoi = async (maPhieuTL) => {
//     const phieu = phieuThanhLys.find((p) => p.maPhieuTL === maPhieuTL);
//     if (phieu.trangThai !== 'Chờ duyệt') {
//       alert('Phiếu thanh lý này đã được xử lý.');
//       return;
//     }

//     const confirmTuChoi = window.confirm(
//       'Bạn có chắc chắn muốn từ chối phiếu thanh lý này? Phiếu sẽ bị xóa khỏi hệ thống.'
//     );
//     if (!confirmTuChoi) return;

//     try {
//       await axios.put(`https://localhost:7240/api/PhieuThanhLy/reject/${maPhieuTL}`);
//       alert('Đã từ chối phiếu thanh lý');
//       setProcessed((prev) => new Set([...prev, maPhieuTL])); // Đánh dấu phiếu đã bị từ chối
//       fetchPhieuThanhLys(); // Gọi lại API để cập nhật danh sách
//     } catch (err) {
//       alert('Không thể từ chối phiếu thanh lý');
//     }
//   };

//   if (loading) return <div className="text-center">Đang tải dữ liệu...</div>;
//   if (error) return <div className="text-center text-red-500">{error}</div>;

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-6 text-center">Danh Sách Phiếu Thanh Lý</h2>
//       <table className="min-w-full table-auto mb-6">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-4 py-2 border">Mã Phiếu</th>
//             <th className="px-4 py-2 border">Lý Do</th>
//             <th className="px-4 py-2 border">Trạng Thái</th>
//             <th className="px-4 py-2 border">Phương Thức Thanh Lý</th>
//             <th className="px-4 py-2 border">Ngày Tạo</th>
//             <th className="px-4 py-2 border">Hành Động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {phieuThanhLys.map((phieu) => (
//             <tr key={phieu.maPhieuTL} className="hover:bg-gray-50">
//               <td className="px-4 py-2 border">{phieu.maPhieuTL}</td>
//               <td className="px-4 py-2 border">{phieu.lyDo}</td>
//               <td className="px-4 py-2 border">{phieu.trangThai}</td>
//               <td className="px-4 py-2 border">{phieu.phuongThucThanhLy}</td>
//               <td className="px-4 py-2 border">
//                 {new Date(phieu.ngayTao).toLocaleDateString()}
//               </td>
//               <td className="px-4 py-2 border">
//                 <button
//                   onClick={() => setSelectedPhieu(phieu.maPhieuTL)} // Cập nhật mã phiếu khi nhấn "Xem Chi Tiết"
//                   className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//                 >
//                   Xem Chi Tiết
//                 </button>
//                 <button
//                   onClick={() => handleDuyet(phieu.maPhieuTL)}
//                   className={`px-4 py-2 rounded mr-2 ${
//                     processed.has(phieu.maPhieuTL) || phieu.trangThai !== 'Chờ duyệt'
//                       ? 'bg-gray-300 text-gray-500 line-through cursor-not-allowed'
//                       : 'bg-green-500 text-white'
//                   }`}
//                   disabled={processed.has(phieu.maPhieuTL) || phieu.trangThai !== 'Chờ duyệt'}
//                 >
//                   Duyệt
//                 </button>
//                 <button
//                   onClick={() => handleTuChoi(phieu.maPhieuTL)}
//                   className={`px-4 py-2 rounded ${
//                     processed.has(phieu.maPhieuTL) || phieu.trangThai !== 'Chờ duyệt'
//                       ? 'bg-gray-300 text-gray-500 line-through cursor-not-allowed'
//                       : 'bg-red-500 text-white'
//                   }`}
//                   disabled={processed.has(phieu.maPhieuTL) || phieu.trangThai !== 'Chờ duyệt'}
//                 >
//                   Từ Chối
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Hiển thị Modal chi tiết nếu cần */}
//       {selectedPhieu && (
//         <ModalPhieuThanhLy
//           maPhieuTL={selectedPhieu} // Truyền mã phiếu vào Modal
//           onClose={() => setSelectedPhieu(null)} // Đóng modal khi không cần xem nữa
//           onDuyet={handleDuyet}
//           onTuChoi={handleTuChoi}
//         />
//       )}
//     </div>
//   );
// };

// export default PhieuThanhLyList;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalPhieuThanhLy from './ModalPhieuThanhLy'; // Import Modal hiển thị chi tiết phiếu thanh lý

const PhieuThanhLyList = () => {
  const [phieuThanhLys, setPhieuThanhLys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhieu, setSelectedPhieu] = useState(null); // Lưu phiếu được chọn để hiển thị chi tiết
  const [processed, setProcessed] = useState(new Set()); // Lưu trữ các mã phiếu đã được xử lý
  const [lyDoTuChoi, setLyDoTuChoi] = useState(""); // Lý do từ chối nhập vào
  const [showLyDoInput, setShowLyDoInput] = useState(false); // Để hiển thị trường nhập lý do từ chối

  // Hàm lấy dữ liệu phiếu thanh lý
  const fetchPhieuThanhLys = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://localhost:7240/api/PhieuThanhLy');
      setPhieuThanhLys(response.data);
      setError(null);
    } catch (err) {
      setError('Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhieuThanhLys();
  }, []);

  // Xử lý hành động duyệt phiếu
  const handleDuyet = async (maPhieuTL) => {
    const phieu = phieuThanhLys.find((p) => p.maPhieuTL === maPhieuTL);
    if (phieu.trangThai !== 'Chờ duyệt') {
      alert('Phiếu thanh lý này đã được xử lý.');
      return;
    }

    const confirmDuyet = window.confirm(
      'Bạn có chắc chắn muốn duyệt phiếu thanh lý này? Hành động này không thể hoàn tác.'
    );
    if (!confirmDuyet) return;

    try {
      await axios.put(`https://localhost:7240/api/PhieuThanhLy/accept/${maPhieuTL}`);
      alert('Đã duyệt phiếu thanh lý');
      setProcessed((prev) => new Set([...prev, maPhieuTL])); // Đánh dấu phiếu đã được duyệt
      fetchPhieuThanhLys(); // Gọi lại API để cập nhật danh sách
    } catch (err) {
      alert('Không thể duyệt phiếu thanh lý');
    }
  };

  // Xử lý hành động từ chối phiếu
 // Xử lý hành động từ chối phiếu
 const handleTuChoi = async (maPhieuTL) => {
  // Lý do từ chối mặc định
  const lyDoTuChoi = "Không được duyệt";

  const confirmTuChoi = window.confirm(
    'Bạn có chắc chắn muốn từ chối phiếu thanh lý này? Phiếu sẽ bị xóa khỏi hệ thống.'
  );
  if (!confirmTuChoi) return;

  try {
    // Gửi yêu cầu PUT với lý do từ chối và ID phiếu thanh lý
    await axios.put(`https://localhost:7240/api/PhieuThanhLy/reject/${maPhieuTL}`, lyDoTuChoi, {
      headers: {
        'Content-Type': 'application/json', // Đảm bảo Content-Type là application/json
      }
    });

    alert('Đã từ chối phiếu thanh lý');
    setProcessed((prev) => new Set([...prev, maPhieuTL])); // Đánh dấu phiếu đã bị từ chối
    fetchPhieuThanhLys(); // Gọi lại API để cập nhật danh sách
  } catch (err) {
    console.error("Error:", err);
    alert('Không thể từ chối phiếu thanh lý');
  }
};


  if (loading) return <div className="text-center">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Danh Sách Phiếu Thanh Lý</h2>
      <table className="min-w-full table-auto mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Mã Phiếu</th>
            <th className="px-4 py-2 border">Lý Do</th>
            <th className="px-4 py-2 border">Trạng Thái</th>
            <th className="px-4 py-2 border">Phương Thức Thanh Lý</th>
            <th className="px-4 py-2 border">Ngày Tạo</th>
            <th className="px-4 py-2 border">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {phieuThanhLys.map((phieu) => (
            <tr key={phieu.maPhieuTL} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{phieu.maPhieuTL}</td>
              <td className="px-4 py-2 border">{phieu.lyDo}</td>
              <td className="px-4 py-2 border">{phieu.trangThai}</td>
              <td className="px-4 py-2 border">{phieu.phuongThucThanhLy}</td>
              <td className="px-4 py-2 border">{new Date(phieu.ngayTao).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => setSelectedPhieu(phieu.maPhieuTL)} // Cập nhật mã phiếu khi nhấn "Xem Chi Tiết"
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Xem Chi Tiết
                </button>
                <button
                  onClick={() => handleDuyet(phieu.maPhieuTL)}
                  className={`px-4 py-2 rounded mr-2 ${
                    processed.has(phieu.maPhieuTL) || phieu.trangThai !== 'Chờ duyệt'
                      ? 'bg-gray-300 text-gray-500 line-through cursor-not-allowed'
                      : 'bg-green-500 text-white'
                  }`}
                  disabled={processed.has(phieu.maPhieuTL) || phieu.trangThai !== 'Chờ duyệt'}
                >
                  Duyệt
                </button>
                {/* <button
                  onClick={() => {
                    setSelectedPhieu(phieu.maPhieuTL); // Lưu mã phiếu thanh lý được chọn
                    setShowLyDoInput(true); // Hiển thị form nhập lý do
                  }}
                  className={`px-4 py-2 rounded ${
                    processed.has(phieu.maPhieuTL) || phieu.trangThai !== 'Chờ duyệt'
                      ? 'bg-gray-300 text-gray-500 line-through cursor-not-allowed'
                      : 'bg-red-500 text-white'
                  }`}
                  disabled={processed.has(phieu.maPhieuTL) || phieu.trangThai !== 'Chờ duyệt'}
                >
                  Từ Chối
                </button> */}
                 <button
                  onClick={() => handleTuChoi(phieu.maPhieuTL)}
                  className={`px-4 py-2 rounded mr-2 ${phieu.trangThai !== 'Chờ duyệt' ? 'bg-gray-300 text-gray-500 line-through cursor-not-allowed' : 'bg-red-500 text-white'}`}
                  disabled={processed.has(phieu.maPhieuTL) || phieu.trangThai !== 'Chờ duyệt'}
                >
                  Từ Chối
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* Hiển thị chi tiết phiếu thanh lý trong modal nếu có */}
      {selectedPhieu && !showLyDoInput && (
        <ModalPhieuThanhLy
          maPhieuTL={selectedPhieu}
          onClose={() => setSelectedPhieu(null)}
        />
      )}
    </div>
  );
};

export default PhieuThanhLyList;
