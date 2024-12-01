// // // // // import React, { useState, useEffect } from 'react';
// // // // // import axios from 'axios';

// // // // // const PhieuThanhLyForm = ({ initialData, onClose, onRefresh }) => {
// // // // //   const [lyDo, setLyDo] = useState(initialData?.lyDo || "");
// // // // //   const [trangThai, setTrangThai] = useState(initialData?.trangThai || "");
// // // // //   const [phuongThucThanhLy, setPhuongThucThanhLy] = useState(initialData?.phuongThucThanhLy || "");
// // // // //   const [maNguoiDung, setMaNguoiDung] = useState(initialData?.maNguoiDung || "");

// // // // //   useEffect(() => {
// // // // //     if (initialData) {
// // // // //       setLyDo(initialData.lyDo);
// // // // //       setTrangThai(initialData.trangThai);
// // // // //       setPhuongThucThanhLy(initialData.phuongThucThanhLy);
// // // // //       setMaNguoiDung(initialData.maNguoiDung);
// // // // //     }
// // // // //   }, [initialData]);

// // // // //   const handleSubmit = async (e) => {
// // // // //     e.preventDefault();
// // // // //     const data = { lyDo: lyDo, trangThai: trangThai, phuongThucThanhLy: phuongThucThanhLy, maNguoiDung: maNguoiDung };

// // // // //     try {
// // // // //       if (initialData) {
// // // // //         await axios.put(`https://localhost:7240/api/PhieuThanhLy/${initialData.maPhieuTL}`, data);
// // // // //         alert('Cập nhật phiếu thanh lý thành công');
// // // // //       } else {
// // // // //         await axios.post('https://localhost:7240/api/PhieuThanhLy', data);
// // // // //         alert('Tạo phiếu thanh lý thành công');
// // // // //       }
// // // // //       onRefresh(); // Làm mới danh sách sau khi thêm/sửa
// // // // //       onClose();
// // // // //     } catch (error) {
// // // // //       console.error("Có lỗi khi cập nhật/ tạo phiếu thanh lý:", error);
// // // // //       alert("Lỗi khi thực hiện thao tác.");
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="modal">
// // // // //       <div className="modal-content p-8 bg-white rounded-lg shadow-lg">
// // // // //         <h2 className="text-2xl font-bold mb-6">{initialData ? "Cập Nhật Phiếu Thanh Lý" : "Tạo Phiếu Thanh Lý"}</h2>
// // // // //         <form onSubmit={handleSubmit}>
// // // // //           <div className="mb-4">
// // // // //             <label htmlFor="lyDo" className="block text-sm font-medium text-gray-700">Lý Do</label>
// // // // //             <input
// // // // //               type="text"
// // // // //               id="lyDo"
// // // // //               value={lyDo}
// // // // //               onChange={(e) => setLyDo(e.target.value)}
// // // // //               className="mt-1 block w-full px-4 py-2 border rounded-md"
// // // // //               required
// // // // //             />
// // // // //           </div>
// // // // //           <div className="mb-4">
// // // // //             <label htmlFor="trangThai" className="block text-sm font-medium text-gray-700">Trạng Thái</label>
// // // // //             <input
// // // // //               type="text"
// // // // //               id="trangThai"
// // // // //               value={trangThai}
// // // // //               onChange={(e) => setTrangThai(e.target.value)}
// // // // //               className="mt-1 block w-full px-4 py-2 border rounded-md"
// // // // //               required
// // // // //             />
// // // // //           </div>
// // // // //           <div className="mb-4">
// // // // //             <label htmlFor="phuongThucThanhLy" className="block text-sm font-medium text-gray-700">Phương Thức Thanh Lý</label>
// // // // //             <input
// // // // //               type="text"
// // // // //               id="phuongThucThanhLy"
// // // // //               value={phuongThucThanhLy}
// // // // //               onChange={(e) => setPhuongThucThanhLy(e.target.value)}
// // // // //               className="mt-1 block w-full px-4 py-2 border rounded-md"
// // // // //               required
// // // // //             />
// // // // //           </div>
// // // // //           <div className="mb-6">
// // // // //             <label htmlFor="maNguoiDung" className="block text-sm font-medium text-gray-700">Mã Người Dùng</label>
// // // // //             <input
// // // // //               type="number"
// // // // //               id="maNguoiDung"
// // // // //               value={maNguoiDung}
// // // // //               onChange={(e) => setMaNguoiDung(e.target.value)}
// // // // //               className="mt-1 block w-full px-4 py-2 border rounded-md"
// // // // //               required
// // // // //             />
// // // // //           </div>
// // // // //           <div className="flex justify-end space-x-4">
// // // // //             <button
// // // // //               type="button"
// // // // //               onClick={onClose}
// // // // //               className="bg-gray-500 text-white px-6 py-2 rounded-md"
// // // // //             >
// // // // //               Hủy
// // // // //             </button>
// // // // //             <button
// // // // //               type="submit"
// // // // //               className="bg-blue-500 text-white px-6 py-2 rounded-md"
// // // // //             >
// // // // //               Lưu
// // // // //             </button>
// // // // //           </div>
// // // // //         </form>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default PhieuThanhLyForm;
// // // // import React, { useState, useEffect } from 'react';
// // // // import axios from 'axios';

// // // // const PhieuThanhLyForm = ({ initialData, onClose, onRefresh }) => {
// // // //   const [lyDo, setLyDo] = useState(initialData?.lyDo || "");
// // // //   const [trangThai, setTrangThai] = useState(initialData?.trangThai || "");
// // // //   const [phuongThucThanhLy, setPhuongThucThanhLy] = useState(initialData?.phuongThucThanhLy || "");
// // // //   const [maNguoiDung, setMaNguoiDung] = useState(initialData?.maNguoiDung || "");
// // // //   const [userMaNguoiDung, setUserMaNguoiDung] = useState(localStorage.getItem("maNguoiDung")); // Lấy mã người dùng từ localStorage

// // // //   useEffect(() => {
// // // //     if (initialData) {
// // // //       setLyDo(initialData.lyDo);
// // // //       setTrangThai(initialData.trangThai);
// // // //       setPhuongThucThanhLy(initialData.phuongThucThanhLy);
// // // //       setMaNguoiDung(initialData.maNguoiDung);
// // // //     }
// // // //   }, [initialData]);

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();

// // // //     // Kiểm tra xem mã người dùng có trùng với người đăng nhập không
// // // //     if (maNguoiDung !== data.maNguoiDung) {
// // // //       alert("Bạn không có quyền sửa phiếu thanh lý này.");
// // // //       return;
// // // //     }

// // // //     const data = { lyDo: lyDo, trangThai: trangThai, phuongThucThanhLy: phuongThucThanhLy, maNguoiDung: maNguoiDung };

// // // //     try {
// // // //       if (initialData) {
// // // //         await axios.put(`https://localhost:7240/api/PhieuThanhLy/${initialData.maPhieuTL}`, data);
// // // //         alert('Cập nhật phiếu thanh lý thành công');
// // // //       } else {
// // // //         await axios.post('https://localhost:7240/api/PhieuThanhLy', data);
// // // //         alert('Tạo phiếu thanh lý thành công');
// // // //       }
// // // //       onRefresh(); // Làm mới danh sách sau khi thêm/sửa
// // // //       onClose();
// // // //     } catch (error) {
// // // //       console.error("Có lỗi khi cập nhật/ tạo phiếu thanh lý:", error);
// // // //       alert("Lỗi khi thực hiện thao tác.");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="modal">
// // // //       <div className="modal-content p-8 bg-white rounded-lg shadow-lg">
// // // //         <h2 className="text-2xl font-bold mb-6">{initialData ? "Cập Nhật Phiếu Thanh Lý" : "Tạo Phiếu Thanh Lý"}</h2>
// // // //         <form onSubmit={handleSubmit}>
// // // //           <div className="mb-4">
// // // //             <label htmlFor="lyDo" className="block text-sm font-medium text-gray-700">Lý Do</label>
// // // //             <input
// // // //               type="text"
// // // //               id="lyDo"
// // // //               value={lyDo}
// // // //               onChange={(e) => setLyDo(e.target.value)}
// // // //               className="mt-1 block w-full px-4 py-2 border rounded-md"
// // // //               required
// // // //             />
// // // //           </div>
// // // //           <div className="mb-4">
// // // //             <label htmlFor="trangThai" className="block text-sm font-medium text-gray-700">Trạng Thái</label>
// // // //             <input
// // // //               type="text"
// // // //               id="trangThai"
// // // //               value={trangThai}
// // // //               onChange={(e) => setTrangThai(e.target.value)}
// // // //               className="mt-1 block w-full px-4 py-2 border rounded-md"
// // // //               required
// // // //             />
// // // //           </div>
// // // //           <div className="mb-4">
// // // //             <label htmlFor="phuongThucThanhLy" className="block text-sm font-medium text-gray-700">Phương Thức Thanh Lý</label>
// // // //             <input
// // // //               type="text"
// // // //               id="phuongThucThanhLy"
// // // //               value={phuongThucThanhLy}
// // // //               onChange={(e) => setPhuongThucThanhLy(e.target.value)}
// // // //               className="mt-1 block w-full px-4 py-2 border rounded-md"
// // // //               required
// // // //             />
// // // //           </div>
// // // //           <div className="mb-6">
// // // //             <label htmlFor="maNguoiDung" className="block text-sm font-medium text-gray-700">Mã Người Dùng</label>
// // // //             <input
// // // //               type="number"
// // // //               id="maNguoiDung"
// // // //               value={maNguoiDung}
// // // //               onChange={(e) => setMaNguoiDung(e.target.value)}
// // // //               className="mt-1 block w-full px-4 py-2 border rounded-md"
// // // //               required
// // // //             />
// // // //           </div>
// // // //           <div className="flex justify-end space-x-4">
// // // //             <button
// // // //               type="button"
// // // //               onClick={onClose}
// // // //               className="bg-gray-500 text-white px-6 py-2 rounded-md"
// // // //             >
// // // //               Hủy
// // // //             </button>
// // // //             <button
// // // //               type="submit"
// // // //               className="bg-blue-500 text-white px-6 py-2 rounded-md"
// // // //             >
// // // //               Lưu
// // // //             </button>
// // // //           </div>
// // // //         </form>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default PhieuThanhLyForm;
// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';

// // // const PhieuThanhLyForm = ({ initialData, onClose, onRefresh }) => {
// // //   const [lyDo, setLyDo] = useState(initialData?.lyDo || "");
// // //   const [trangThai, setTrangThai] = useState(initialData?.trangThai || "");
// // //   const [phuongThucThanhLy, setPhuongThucThanhLy] = useState(initialData?.phuongThucThanhLy || "");
// // //   const [maNguoiDung, setMaNguoiDung] = useState(initialData?.maNguoiDung || "");
// // //   const [userMaNguoiDung, setUserMaNguoiDung] = useState(parseInt(localStorage.getItem("maNguoiDung"))); // Lấy mã người dùng từ localStorage
// // // console.log("userMaNguoiDung", userMaNguoiDung);
// // //   // Thiết lập các giá trị khi initialData thay đổi
// // //   useEffect(() => {
// // //     if (initialData) {
// // //       setLyDo(initialData.lyDo);
// // //       setTrangThai(initialData.trangThai);
// // //       setPhuongThucThanhLy(initialData.phuongThucThanhLy);
// // //       setMaNguoiDung(initialData.maNguoiDung);
// // //     }
// // //   }, [initialData]);

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     // Kiểm tra xem mã người dùng có trùng với người đăng nhập không
// // //     if (parseInt(maNguoiDung) !== userMaNguoiDung) {
// // //       console.log("Ma nguoi dung khong trung voi nguoi dang nhap", maNguoiDung, userMaNguoiDung);
// // //       alert("Bạn không có quyền sửa phiếu thanh lý này.");
// // //       return;
// // //     }

// // //     const data = { lyDo: lyDo, trangThai: trangThai, phuongThucThanhLy: phuongThucThanhLy, maNguoiDung: maNguoiDung };

// // //     try {
// // //       if (initialData) {
// // //         await axios.put(`https://localhost:7240/api/PhieuThanhLy/${initialData.maPhieuTL}`, data);
// // //         alert('Cập nhật phiếu thanh lý thành công');
// // //       } else {
// // //         await axios.post('https://localhost:7240/api/PhieuThanhLy', data);
// // //         alert('Tạo phiếu thanh lý thành công');
// // //       }
// // //       onRefresh(); // Làm mới danh sách sau khi thêm/sửa
// // //       onClose();
// // //     } catch (error) {
// // //       console.error("Có lỗi khi cập nhật/ tạo phiếu thanh lý:", error);
// // //       alert("Lỗi khi thực hiện thao tác.");
// // //     }
// // //   };

// // //   return (
// // //     <div className="modal">
// // //       <div className="modal-content p-8 bg-white rounded-lg shadow-lg">
// // //         <h2 className="text-2xl font-bold mb-6">{initialData ? "Cập Nhật Phiếu Thanh Lý" : "Tạo Phiếu Thanh Lý"}</h2>
// // //         <form onSubmit={handleSubmit}>
// // //           <div className="mb-4">
// // //             <label htmlFor="lyDo" className="block text-sm font-medium text-gray-700">Lý Do</label>
// // //             <input
// // //               type="text"
// // //               id="lyDo"
// // //               value={lyDo}
// // //               onChange={(e) => setLyDo(e.target.value)}
// // //               className="mt-1 block w-full px-4 py-2 border rounded-md"
// // //               required
// // //             />
// // //           </div>
// // //           <div className="mb-4">
// // //             <label htmlFor="trangThai" className="block text-sm font-medium text-gray-700">Trạng Thái</label>
// // //             <input
// // //               type="text"
// // //               id="trangThai"
// // //               value={trangThai}
// // //               onChange={(e) => setTrangThai(e.target.value)}
// // //               className="mt-1 block w-full px-4 py-2 border rounded-md"
// // //               required
// // //             />
// // //           </div>
// // //           <div className="mb-4">
// // //             <label htmlFor="phuongThucThanhLy" className="block text-sm font-medium text-gray-700">Phương Thức Thanh Lý</label>
// // //             <input
// // //               type="text"
// // //               id="phuongThucThanhLy"
// // //               value={phuongThucThanhLy}
// // //               onChange={(e) => setPhuongThucThanhLy(e.target.value)}
// // //               className="mt-1 block w-full px-4 py-2 border rounded-md"
// // //               required
// // //             />
// // //           </div>
// // //           <div className="mb-6">
// // //             <label htmlFor="maNguoiDung" className="block text-sm font-medium text-gray-700">Mã Người Dùng</label>
// // //             <input
// // //               type="number"
// // //               id="maNguoiDung"
// // //               value={maNguoiDung}
// // //               onChange={(e) => setMaNguoiDung(e.target.value)}
// // //               className="mt-1 block w-full px-4 py-2 border rounded-md"
// // //               required
// // //             />
// // //           </div>
// // //           <div className="flex justify-end space-x-4">
// // //             <button
// // //               type="button"
// // //               onClick={onClose}
// // //               className="bg-gray-500 text-white px-6 py-2 rounded-md"
// // //             >
// // //               Hủy
// // //             </button>
// // //             <button
// // //               type="submit"
// // //               className="bg-blue-500 text-white px-6 py-2 rounded-md"
// // //             >
// // //               Lưu
// // //             </button>
// // //           </div>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default PhieuThanhLyForm;
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // // Component tạo phiếu thanh lý và thêm hóa chất vào phiếu
// // const CreateThanhLy = () => {
// //   const [hoaChats, setHoaChats] = useState([]);
// //   const [phieuThanhLy, setPhieuThanhLy] = useState({
// //     lyDo: '',
// //     phuongThucThanhLy: '',
// //     maNguoiDung: '',
// //   });
// //   const [selectedHoaChat, setSelectedHoaChat] = useState(null);
// //   const [soLuong, setSoLuong] = useState(1);
// //   const [loading, setLoading] = useState(false);
// //   const [message, setMessage] = useState('');
// //   const [error, setError] = useState('');

// //   // Lấy danh sách hóa chất từ API
// //   useEffect(() => {
// //     const fetchHoaChats = async () => {
// //       try {
// //         setLoading(true);
// //         const response = await axios.get('https://localhost:7240/api/Statistics/hoa-chat');
// //         setHoaChats(response.data);
// //         setLoading(false);
// //       } catch (error) {
// //         setError('Không thể tải danh sách hóa chất');
// //         setLoading(false);
// //       }
// //     };
// //     fetchHoaChats();
// //   }, []);

// //   // Xử lý khi người dùng chọn hóa chất từ combobox
// //   const handleHoaChatChange = async (e) => {
// //     const selectedCAS = e.target.value;
// //     if (selectedCAS) {
// //       try {
// //         const response = await axios.get(`https://localhost:7240/api/Statistics/hoa-chat/${selectedCAS}`);
// //         setSelectedHoaChat(response.data);
// //       } catch (error) {
// //         setError('Không thể tìm thấy hóa chất');
// //       }
// //     }
// //   };

// //   // Xử lý tạo phiếu thanh lý
// //   const handleCreatePhieuThanhLy = async () => {
// //     try {
// //       const response = await axios.post('https://localhost:7240/api/PhieuThanhLy', phieuThanhLy);
// //       setMessage(`Tạo phiếu thanh lý thành công với mã phiếu: ${response.data.MaPhieuTL}`);
// //     } catch (error) {
// //       setError('Không thể tạo phiếu thanh lý');
// //     }
// //   };

// //   // Xử lý thêm hóa chất vào phiếu thanh lý
// //   const handleAddHoaChatToPhieuThanhLy = async () => {
// //     if (!selectedHoaChat) {
// //       setError('Vui lòng chọn hóa chất');
// //       return;
// //     }
// //     try {
// //       const hoaChatDto = {
// //         MaHoaChat: selectedHoaChat.MaHoaChat,
// //         SoLo: selectedHoaChat.SoLo,
// //         SoLuong: soLuong,
// //       };
// //       const response = await axios.post(`https://localhost:7240/api/PhieuThanhLy/${phieuThanhLy.MaPhieuTL}/add-hoachat`, hoaChatDto);
// //       setMessage(response.data);
// //     } catch (error) {
// //       setError('Không thể thêm hóa chất vào phiếu thanh lý');
// //     }
// //   };

// //   // Kiểm tra trạng thái tải dữ liệu
// //   if (loading) return <div>Đang tải dữ liệu...</div>;

// //   return (
// //     <div className="container p-6">
// //       <h2 className="text-2xl font-bold mb-4">Quản lý Phiếu Thanh Lý</h2>

// //       {/* Form tạo phiếu thanh lý */}
// //       <div className="mb-4">
// //         <h3 className="text-xl font-semibold mb-2">Tạo Phiếu Thanh Lý</h3>
// //         <input
// //           type="text"
// //           placeholder="Lý do thanh lý"
// //           value={phieuThanhLy.lyDo}
// //           onChange={(e) => setPhieuThanhLy({ ...phieuThanhLy, lyDo: e.target.value })}
// //           className="p-2 border rounded w-full mb-2"
// //         />
// //         <input
// //           type="text"
// //           placeholder="Phương thức thanh lý"
// //           value={phieuThanhLy.phuongThucThanhLy}
// //           onChange={(e) => setPhieuThanhLy({ ...phieuThanhLy, phuongThucThanhLy: e.target.value })}
// //           className="p-2 border rounded w-full mb-2"
// //         />
// //         <input
// //           type="number"
// //           placeholder="Mã người dùng"
// //           value={phieuThanhLy.maNguoiDung}
// //           onChange={(e) => setPhieuThanhLy({ ...phieuThanhLy, maNguoiDung: e.target.value })}
// //           className="p-2 border rounded w-full mb-4"
// //         />
// //         <button onClick={handleCreatePhieuThanhLy} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
// //           Tạo Phiếu Thanh Lý
// //         </button>
// //       </div>

// //       {/* Thông báo kết quả */}
// //       {message && <div className="text-green-500">{message}</div>}
// //       {error && <div className="text-red-500">{error}</div>}

// //       {/* Chọn hóa chất từ combobox */}
// //       <div className="mb-4">
// //         <h3 className="text-xl font-semibold mb-2">Chọn Hóa Chất</h3>
// //         <select onChange={handleHoaChatChange} className="p-2 border rounded w-full mb-2">
// //           <option value="">Chọn mã CAS hóa chất</option>
// //           {hoaChats.map((hoaChat) => (
// //             <option key={hoaChat.MaHoaChat} value={hoaChat.SoCAS}>
// //               {hoaChat.TenHoaChat} - {hoaChat.SoCAS}
// //             </option>
// //           ))}
// //         </select>

// //         {/* Hiển thị thông tin chi tiết hóa chất đã chọn */}
// //         {selectedHoaChat && (
// //           <div className="mb-4">
// //             <p><strong>Tên hóa chất:</strong> {selectedHoaChat.TenHoaChat}</p>
// //             <p><strong>Số CAS:</strong> {selectedHoaChat.SoCAS}</p>
// //             <p><strong>Đơn vị:</strong> {selectedHoaChat.DonVi}</p>
// //           </div>
// //         )}

// //         {/* Số lượng hóa chất */}
// //         <input
// //           type="number"
// //           value={soLuong}
// //           onChange={(e) => setSoLuong(e.target.value)}
// //           className="p-2 border rounded w-full mb-4"
// //           placeholder="Số lượng"
// //         />

// //         <button
// //           onClick={handleAddHoaChatToPhieuThanhLy}
// //           className="bg-green-500 text-white px-4 py-2 rounded mb-4"
// //         >
// //           Thêm Hóa Chất vào Phiếu Thanh Lý
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CreateThanhLy;
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const CreatePhieuThanhLy = () => {
//   // States to hold form values
//   const [lyDo, setLyDo] = useState("");
//   const [phuongThucThanhLy, setPhuongThucThanhLy] = useState("");
//   const [maNguoiDung, setMaNguoiDung] = useState("");
//   const [hoaChats, setHoaChats] = useState([]);
//   const [selectedHoaChat, setSelectedHoaChat] = useState(null);
//   const [soLuong, setSoLuong] = useState(1);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Fetching the list of HoaChat (chemical items)
//     const fetchHoaChats = async () => {
//       try {
//         const response = await axios.get("https://localhost:7240/api/Statistics/hoa-chat");
//         setHoaChats(response.data);
//       } catch (error) {
//         console.error("Error fetching HoaChat:", error);
//       }
//     };

//     fetchHoaChats();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Step 1: Create Phieu Thanh Ly (Liquidation Request)
//     try {
//       const phieuThanhLyResponse = await axios.post("https://localhost:7240/api/PhieuThanhLy", {
//         LyDo: lyDo,
//         PhuongThucThanhLy: phuongThucThanhLy,
//         MaNguoiDung: maNguoiDung,
//       });

//       const phieuThanhLyId = phieuThanhLyResponse.data.MaPhieuTL;

//       // Step 2: Add HoaChat (Chemical) to the created Phieu Thanh Ly
//       if (selectedHoaChat) {
//         const hoaChatResponse = await axios.post(
//           `https://localhost:7240/api/PhieuThanhLy/${phieuThanhLyId}/add-hoachat`,
//           {
//             MaHoaChat: selectedHoaChat.MaHoaChat,
//             SoLo: selectedHoaChat.SoLo,
//             SoLuong: soLuong,
//           }
//         );
//         setMessage(`Phiếu thanh lý và hóa chất đã được thêm thành công!`);
//       }
//     } catch (error) {
//       console.error("Error creating Phieu Thanh Ly:", error);
//       setMessage("Lỗi trong quá trình tạo phiếu thanh lý.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-md">
//       <h2 className="text-2xl font-semibold mb-4">Tạo Phiếu Thanh Lý Hóa Chất</h2>

//       {message && <p className="text-red-500 mb-4">{message}</p>}

//       <form onSubmit={handleSubmit}>
//         {/* Lý do thanh lý */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Lý Do Thanh Lý</label>
//           <input
//             type="text"
//             className="mt-1 block w-full px-3 py-2 border rounded-md"
//             value={lyDo}
//             onChange={(e) => setLyDo(e.target.value)}
//             required
//           />
//         </div>

//         {/* Phương thức thanh lý */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Phương Thức Thanh Lý</label>
//           <input
//             type="text"
//             className="mt-1 block w-full px-3 py-2 border rounded-md"
//             value={phuongThucThanhLy}
//             onChange={(e) => setPhuongThucThanhLy(e.target.value)}
//             required
//           />
//         </div>

//         {/* Mã người dùng */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Mã Người Dùng</label>
//           <input
//             type="number"
//             className="mt-1 block w-full px-3 py-2 border rounded-md"
//             value={maNguoiDung}
//             onChange={(e) => setMaNguoiDung(e.target.value)}
//             required
//           />
//         </div>

//         {/* Chọn hóa chất */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Chọn Hóa Chất</label>
//           <select
//             className="mt-1 block w-full px-3 py-2 border rounded-md"
//             value={selectedHoaChat ? selectedHoaChat.MaHoaChat : ""}
//             onChange={(e) => {
//               const selected = hoaChats.find((h) => h.MaHoaChat === parseInt(e.target.value));
//               setSelectedHoaChat(selected);
//             }}
//             required
//           >
//             <option value="" disabled>
//               Chọn hóa chất
//             </option>
//             {hoaChats.map((hoaChat) => (
//               <option key={hoaChat.MaHoaChat} value={hoaChat.MaHoaChat}>
//                 {hoaChat.TenHoaChat} (CAS: {hoaChat.SoCAS})
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Số lượng */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Số Lượng</label>
//           <input
//             type="number"
//             className="mt-1 block w-full px-3 py-2 border rounded-md"
//             value={soLuong}
//             onChange={(e) => setSoLuong(e.target.value)}
//             min={1}
//             required
//           />
//         </div>

//         {/* Submit Button */}
//         <div className="mb-4">
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//             disabled={loading}
//           >
//             {loading ? "Đang tạo..." : "Tạo Phiếu Thanh Lý"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreatePhieuThanhLy;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreatePhieuThanhLy = () => {
  const [lyDo, setLyDo] = useState("");
  const [phuongThucThanhLy, setPhuongThucThanhLy] = useState("");
  const [maNguoiDung, setMaNguoiDung] = useState("");
  const [hoaChats, setHoaChats] = useState([]);
  const [selectedHoaChat, setSelectedHoaChat] = useState(null);
  const [loHoaChats, setLoHoaChats] = useState([]);
  const [selectedLoHoaChat, setSelectedLoHoaChat] = useState(null);
  const [soLuong, setSoLuong] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetching the list of HoaChat (chemical items)
    const fetchHoaChats = async () => {
      try {
        const response = await axios.get("https://localhost:7240/api/Statistics/hoa-chat");
        setHoaChats(response.data);
      } catch (error) {
        console.error("Error fetching HoaChat:", error);
      }
    };

    fetchHoaChats();
  }, []);

  // Fetch LoHoaChats based on selected HoaChat
  useEffect(() => {
    if (selectedHoaChat) {
      const fetchLoHoaChats = async () => {
        try {
          const response = await axios.get(`https://localhost:7240/api/Statistics/lo-hoa-chat/${selectedHoaChat.MaHoaChat}`);
          setLoHoaChats(response.data);
        } catch (error) {
          console.error("Error fetching LoHoaChats:", error);
        }
      };

      fetchLoHoaChats();
    }
  }, [selectedHoaChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Create Phieu Thanh Ly (Liquidation Request)
      const phieuThanhLyResponse = await axios.post("https://localhost:7240/api/PhieuThanhLy", {
        LyDo: lyDo,
        PhuongThucThanhLy: phuongThucThanhLy,
        MaNguoiDung: maNguoiDung,
      });

      const phieuThanhLyId = phieuThanhLyResponse.data.MaPhieuTL;

      // Step 2: Add HoaChat (Chemical) and LoHoaChat (Chemical Lot) to the created Phieu Thanh Ly
      if (selectedHoaChat && selectedLoHoaChat) {
        const hoaChatResponse = await axios.post(
          `https://localhost:7240/api/PhieuThanhLy/${phieuThanhLyId}/add-hoachat`,
          {
            MaHoaChat: selectedHoaChat.MaHoaChat,
            SoLo: selectedLoHoaChat.SoLo,
            SoLuong: soLuong,
          }
        );
        setMessage(`Phiếu thanh lý và hóa chất đã được thêm thành công!`);
      }
    } catch (error) {
      console.error("Error creating Phieu Thanh Ly:", error);
      setMessage("Lỗi trong quá trình tạo phiếu thanh lý.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Tạo Phiếu Thanh Lý Hóa Chất</h2>

      {message && <p className="text-red-500 mb-4">{message}</p>}

      <form onSubmit={handleSubmit}>
        {/* Lý do thanh lý */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Lý Do Thanh Lý</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            value={lyDo}
            onChange={(e) => setLyDo(e.target.value)}
            required
          />
        </div>

        {/* Phương thức thanh lý */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phương Thức Thanh Lý</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            value={phuongThucThanhLy}
            onChange={(e) => setPhuongThucThanhLy(e.target.value)}
            required
          />
        </div>

        {/* Mã người dùng */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Mã Người Dùng</label>
          <input
            type="number"
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            value={maNguoiDung}
            onChange={(e) => setMaNguoiDung(e.target.value)}
            required
          />
        </div>

        {/* Chọn hóa chất */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Chọn Hóa Chất</label>
          <select
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            value={selectedHoaChat ? selectedHoaChat.MaHoaChat : ""}
            onChange={(e) => {
              const selected = hoaChats.find((h) => h.MaHoaChat === parseInt(e.target.value));
              setSelectedHoaChat(selected);
            }}
            required
          >
            <option value="" disabled>
              Chọn hóa chất
            </option>
            {hoaChats.map((hoaChat) => (
              <option key={hoaChat.MaHoaChat} value={hoaChat.MaHoaChat}>
                {hoaChat.TenHoaChat} (CAS: {hoaChat.SoCAS})
              </option>
            ))}
          </select>
        </div>

        {/* Chọn lô hóa chất */}
        {selectedHoaChat && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Chọn Lô Hóa Chất</label>
            <select
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              value={selectedLoHoaChat ? selectedLoHoaChat.SoLo : ""}
              onChange={(e) => {
                const selected = loHoaChats.find((lh) => lh.SoLo === e.target.value);
                setSelectedLoHoaChat(selected);
              }}
              required
            >
              <option value="" disabled>
                Chọn lô hóa chất
              </option>
              {loHoaChats.map((loHoaChat) => (
                <option key={loHoaChat.SoLo} value={loHoaChat.SoLo}>
                  Lô: {loHoaChat.SoLo}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Số lượng */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Số Lượng</label>
          <input
            type="number"
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            value={soLuong}
            onChange={(e) => setSoLuong(e.target.value)}
            min={1}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Đang tạo..." : "Tạo Phiếu Thanh Lý"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePhieuThanhLy;
