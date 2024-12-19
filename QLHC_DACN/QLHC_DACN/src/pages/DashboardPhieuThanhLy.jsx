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
