// // // // // import React, { useState } from 'react';
// // // // // import PhieuThanhLyList from '../components/PhieuThanhLyList';
// // // // // import PhieuThanhLyForm from '../components/PhieuThanhLyForm';

// // // // // const DashboardPhieuThanhLy = () => {
// // // // //   const [isFormOpen, setIsFormOpen] = useState(false);
// // // // //   const [editingData, setEditingData] = useState(null);

// // // // //   const handleEdit = (phieu) => {
// // // // //     setEditingData(phieu);
// // // // //     setIsFormOpen(true); // Mở form chỉnh sửa
// // // // //   };

// // // // //   const handleRefresh = () => {
// // // // //     window.location.reload(); // Làm mới danh sách phiếu thanh lý sau khi chỉnh sửa
// // // // //   };

// // // // //   const handleDelete = async (id) => {
// // // // //     try {
// // // // //       await axios.delete(`https://localhost:7240/api/PhieuThanhLy/${id}`);
// // // // //       alert('Đã xóa phiếu thanh lý');
// // // // //       handleRefresh(); // Làm mới danh sách phiếu thanh lý
// // // // //     } catch (error) {
// // // // //       alert('Có lỗi khi xóa phiếu thanh lý');
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="container mx-auto p-4">
// // // // //       <h1 className="text-3xl font-bold mb-4">Quản Lý Phiếu Thanh Lý</h1>
// // // // //       {!isFormOpen ? (
// // // // //         <PhieuThanhLyList onEdit={handleEdit} onDelete={handleDelete} />
// // // // //       ) : (
// // // // //         <PhieuThanhLyForm
// // // // //           initialData={editingData}
// // // // //           onClose={() => setIsFormOpen(false)}
// // // // //           onRefresh={handleRefresh}
// // // // //         />
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default DashboardPhieuThanhLy;
// // // // import React, { useState } from 'react';
// // // // import axios from 'axios'; // Đừng quên import axios
// // // // import PhieuThanhLyList from '../components/PhieuThanhLyList';
// // // // import CreatePhieuThanhLyForm from '../components/CreatePhieuThanhLyForm'; // Import form tạo phiếu thanh lý

// // // // const DashboardPhieuThanhLy = () => {
// // // //   const [isFormOpen, setIsFormOpen] = useState(false);
// // // //   const [editingData, setEditingData] = useState(null);

// // // //   const handleEdit = (phieu) => {
// // // //     setEditingData(phieu);
// // // //     setIsFormOpen(true); // Mở form chỉnh sửa
// // // //   };

// // // //   const handleRefresh = () => {
// // // //     window.location.reload(); // Làm mới danh sách phiếu thanh lý sau khi chỉnh sửa
// // // //   };

// // // //   const handleDelete = async (id) => {
// // // //     try {
// // // //       await axios.delete(`https://localhost:7240/api/PhieuThanhLy/${id}`);
// // // //       alert('Đã xóa phiếu thanh lý');
// // // //       handleRefresh(); // Làm mới danh sách phiếu thanh lý
// // // //     } catch (error) {
// // // //       alert('Có lỗi khi xóa phiếu thanh lý');
// // // //     }
// // // //   };

// // // //   const handleCreate = () => {
// // // //     setEditingData(null); // Đảm bảo không có dữ liệu khi tạo mới
// // // //     setIsFormOpen(true); // Mở form tạo phiếu thanh lý
// // // //   };

// // // //   return (
// // // //     <div className="container mx-auto p-4">
// // // //       <h1 className="text-3xl font-bold mb-4">Quản Lý Phiếu Thanh Lý</h1>

// // // //       {/* Nút Tạo Phiếu Thanh Lý */}
// // // //       {!isFormOpen && (
// // // //         <button
// // // //           onClick={handleCreate}
// // // //           className="bg-blue-600 text-white px-6 py-2 rounded-md mb-4 hover:bg-blue-700 transition"
// // // //         >
// // // //           Tạo Phiếu Thanh Lý
// // // //         </button>
// // // //       )}

// // // //       {/* Hiển thị danh sách phiếu thanh lý hoặc form tạo/ chỉnh sửa */}
// // // //       {!isFormOpen ? (
// // // //         <PhieuThanhLyList onEdit={handleEdit} onDelete={handleDelete} />
// // // //       ) : (
// // // //         <CreatePhieuThanhLyForm
// // // //           onClose={() => setIsFormOpen(false)} // Đóng form khi người dùng hủy
// // // //           onRefresh={handleRefresh}
// // // //         />
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default DashboardPhieuThanhLy;
// // // import React, { useState } from 'react';
// // // import PhieuThanhLyList from '../components/PhieuThanhLyList';
// // // import CreatePhieuThanhLyForm from '../components/CreatePhieuThanhLyForm'; // Import form tạo phiếu thanh lý

// // // const DashboardPhieuThanhLy = () => {
// // //   const [isFormOpen, setIsFormOpen] = useState(false);
// // //   const [editingData, setEditingData] = useState(null);

// // //   const handleEdit = (phieu) => {
// // //     setEditingData(phieu);
// // //     setIsFormOpen(true); // Mở form chỉnh sửa
// // //   };

// // //   const handleRefresh = () => {
// // //     window.location.reload(); // Làm mới danh sách phiếu thanh lý sau khi chỉnh sửa
// // //   };

// // //   const handleDelete = async (id) => {
// // //     try {
// // //       await axios.delete(`https://localhost:7240/api/PhieuThanhLy/${id}`);
// // //       alert('Đã xóa phiếu thanh lý');
// // //       handleRefresh(); // Làm mới danh sách phiếu thanh lý
// // //     } catch (error) {
// // //       alert('Có lỗi khi xóa phiếu thanh lý');
// // //     }
// // //   };

// // //   const handleCreate = () => {
// // //     setEditingData(null); // Đảm bảo không có dữ liệu khi tạo mới
// // //     setIsFormOpen(true); // Mở form tạo phiếu thanh lý
// // //   };

// // //   return (
// // //     <div className="container mx-auto p-4">
// // //       <h1 className="text-3xl font-bold mb-4">Quản Lý Phiếu Thanh Lý</h1>

// // //       {/* Nút Tạo Phiếu Thanh Lý */}
// // //       {!isFormOpen && (
// // //         <button
// // //           onClick={handleCreate}
// // //           className="bg-blue-600 text-white px-6 py-2 rounded-md mb-4 hover:bg-blue-700 transition"
// // //         >
// // //           Tạo Phiếu Thanh Lý
// // //         </button>
// // //       )}

// // //       {/* Hiển thị danh sách phiếu thanh lý hoặc form tạo/ chỉnh sửa */}
// // //       {!isFormOpen ? (
// // //         <PhieuThanhLyList onEdit={handleEdit} onDelete={handleDelete} />
// // //       ) : (
// // //         <CreatePhieuThanhLyForm
// // //           onClose={() => setIsFormOpen(false)} // Đóng form khi người dùng hủy
// // //           onRefresh={handleRefresh}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default DashboardPhieuThanhLy;
// // import React, { useState } from 'react';
// // import PhieuThanhLyList from '../components/PhieuThanhLyList';
// // import CreatePhieuThanhLyForm from '../components/CreatePhieuThanhLyForm'; // Import form tạo phiếu thanh lý

// // const DashboardPhieuThanhLy = () => {
// //   const [isFormOpen, setIsFormOpen] = useState(false);
// //   const [editingData, setEditingData] = useState(null);

// //   const handleEdit = (phieu) => {
// //     setEditingData(phieu);
// //     setIsFormOpen(true); // Mở form chỉnh sửa
// //   };

// //   const handleRefresh = () => {
// //     window.location.reload(); // Làm mới danh sách phiếu thanh lý sau khi chỉnh sửa
// //   };

// //   const handleDelete = async (id) => {
// //     try {
// //       await axios.delete(`https://localhost:7240/api/PhieuThanhLy/${id}`);
// //       alert('Đã xóa phiếu thanh lý');
// //       handleRefresh(); // Làm mới danh sách phiếu thanh lý
// //     } catch (error) {
// //       alert('Có lỗi khi xóa phiếu thanh lý');
// //     }
// //   };

// //   const handleCreate = () => {
// //     setEditingData(null); // Đảm bảo không có dữ liệu khi tạo mới
// //     setIsFormOpen(true); // Mở form tạo phiếu thanh lý
// //   };

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h1 className="text-3xl font-bold mb-4">Quản Lý Phiếu Thanh Lý</h1>

// //       {/* Nút Tạo Phiếu Thanh Lý */}
// //       {!isFormOpen && (
// //         <button
// //           onClick={handleCreate}
// //           className="bg-blue-600 text-white px-6 py-2 rounded-md mb-4 hover:bg-blue-700 transition"
// //         >
// //           Tạo Phiếu Thanh Lý
// //         </button>
// //       )}

// //       {/* Hiển thị danh sách phiếu thanh lý hoặc form tạo/ chỉnh sửa */}
// //       {!isFormOpen ? (
// //         <PhieuThanhLyList onEdit={handleEdit} onDelete={handleDelete} />
// //       ) : (
// //         <CreatePhieuThanhLyForm
// //           initialData={editingData} // Truyền dữ liệu chỉnh sửa (hoặc rỗng nếu tạo mới)
// //           onClose={() => setIsFormOpen(false)} // Đóng form khi người dùng hủy
// //           onRefresh={handleRefresh} // Refresh danh sách phiếu thanh lý sau khi tạo thành công
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default DashboardPhieuThanhLy;
// import React, { useState } from 'react';
// import PhieuThanhLyList from '../components/PhieuThanhLyList';
// import CreatePhieuThanhLyForm from '../components/CreatePhieuThanhLyForm';
// import axios from 'axios';

// const DashboardPhieuThanhLy = () => {
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [editingData, setEditingData] = useState(null);

//   const handleEdit = (phieu) => {
//     setEditingData(phieu);
//     setIsFormOpen(true); // Mở form chỉnh sửa
//   };

//   const handleRefresh = () => {
//     window.location.reload(); // Làm mới danh sách phiếu thanh lý sau khi chỉnh sửa
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`https://localhost:7240/api/PhieuThanhLy/${id}`);
//       alert('Đã xóa phiếu thanh lý');
//       handleRefresh(); // Làm mới danh sách phiếu thanh lý
//     } catch (error) {
//       alert('Có lỗi khi xóa phiếu thanh lý');
//     }
//   };

//   const handleCreate = () => {
//     setEditingData(null); // Đảm bảo không có dữ liệu khi tạo mới
//     setIsFormOpen(true); // Mở form tạo phiếu thanh lý
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">Quản Lý Phiếu Thanh Lý</h1>

//       {/* Nút Tạo Phiếu Thanh Lý */}
//       {!isFormOpen && (
//         <button
//           onClick={handleCreate}
//           className="bg-blue-600 text-white px-6 py-2 rounded-md mb-4 hover:bg-blue-700 transition"
//         >
//           Tạo Phiếu Thanh Lý
//         </button>
//       )}

//       {/* Hiển thị danh sách phiếu thanh lý hoặc form tạo/ chỉnh sửa */}
//       {!isFormOpen ? (
//         <PhieuThanhLyList onEdit={handleEdit} onDelete={handleDelete} />
//       ) : (
//         <CreatePhieuThanhLyForm
//           initialData={editingData} // Truyền dữ liệu chỉnh sửa (hoặc rỗng nếu tạo mới)
//           onClose={() => setIsFormOpen(false)} // Đóng form khi người dùng hủy
//           onRefresh={handleRefresh} // Refresh danh sách phiếu thanh lý sau khi tạo thành công
//         />
//       )}
//     </div>
//   );
// };

// export default DashboardPhieuThanhLy;
import React, { useState } from 'react';
import PhieuThanhLyList from '../components/PhieuThanhLyList';
import CreatePhieuThanhLyForm from '../components/CreatePhieuThanhLyForm';
import axios from 'axios';
import DuyetPhieuThanhLyList from '../components/DuyetPhieuThanhLyList';

const DashboardPhieuThanhLy = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleRefresh = () => {
    window.location.reload(); // Làm mới danh sách phiếu thanh lý sau khi tạo
  };

  // const handleCreate = () => {
  //   setIsFormOpen(true); // Mở form tạo phiếu thanh lý
  // };

  const handleCloseForm = () => {
    setIsFormOpen(false); // Đóng form
  };

  return (
    <div className="container mx-auto p-4">
       <DuyetPhieuThanhLyList /> 
      {/* <h1 className="text-3xl font-bold mb-4">Quản Lý Phiếu Thanh Lý</h1> */}

      {/* Nút Tạo Phiếu Thanh Lý */}
      {/* {!isFormOpen && (
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-6 py-2 rounded-md mb-4 hover:bg-blue-700 transition"
        >
          Tạo Phiếu Thanh Lý
        </button>
      )} */}

      {/* Hiển thị danh sách phiếu thanh lý hoặc form tạo/ chỉnh sửa */}
      {isFormOpen ? (
        <CreatePhieuThanhLyForm
          onClose={handleCloseForm}  // Đóng form khi người dùng hủy
          onRefresh={handleRefresh}  // Refresh danh sách phiếu thanh lý sau khi tạo thành công
        />
      ) : (
        <PhieuThanhLyList />
      )}
    </div>
  );
};

export default DashboardPhieuThanhLy;
