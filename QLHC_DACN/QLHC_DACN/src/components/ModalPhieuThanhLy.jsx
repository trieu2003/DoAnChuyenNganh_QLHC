import React from 'react';

// Modal Component for PhieuThanhLy Details
const ModalPhieuThanhLy = ({ phieu, onClose, onDuyet, onTuChoi }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50 transition-all ease-in-out duration-300">
      <div className="bg-white p-6 rounded-md w-3/4 shadow-xl transform transition-all ease-in-out duration-300 scale-95 hover:scale-100">
        <h2 className="text-xl font-bold mb-4">Chi Tiết Phiếu Thanh Lý</h2>

        {/* Bảng chi tiết phiếu thanh lý */}
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Mã Phiếu</th>
              <th className="px-4 py-2">Lý Do</th>
              <th className="px-4 py-2">Phương Thức Thanh Lý</th>
              <th className="px-4 py-2">Ngày Tạo</th>
              <th className="px-4 py-2">Tên Người Dùng</th>
              <th className="px-4 py-2">Mã Lo</th>
              <th className="px-4 py-2">Nhà Cung Cấp</th>
              <th className="px-4 py-2">Số Lượng</th>
              <th className="px-4 py-2">Hạn Sử Dụng</th>
              <th className="px-4 py-2">Trạng Thái Lô</th>
              <th className="px-4 py-2">Tên Hóa Chất</th>
              <th className="px-4 py-2">Số Lô Hóa Chất</th>
              <th className="px-4 py-2">Số CAS</th>
              <th className="px-4 py-2">Ngày Duyệt</th>
              <th className="px-4 py-2">Trạng Thái Duyệt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">{phieu.maPhieuTL}</td>
              <td className="px-4 py-2">{phieu.lyDo}</td>
              <td className="px-4 py-2">{phieu.phuongThucThanhLy}</td>
              <td className="px-4 py-2">{new Date(phieu.ngayTao).toLocaleDateString()}</td>
              <td className="px-4 py-2">{phieu.nguoiDung_TenDangNhap}</td>
              <td className="px-4 py-2">{phieu.maLo}</td>
              <td className="px-4 py-2">{phieu.nhaCungCap}</td>
              <td className="px-4 py-2">{phieu.soLuong}</td>
              <td className="px-4 py-2">{new Date(phieu.hanSuDung).toLocaleDateString()}</td>
              <td className="px-4 py-2">{phieu.loTrangThai}</td>
              <td className="px-4 py-2">{phieu.tenHoaChat}</td>
              <td className="px-4 py-2">{phieu.hoaChatSoLo}</td>
              <td className="px-4 py-2">{phieu.hoaChatSoCAS}</td>
              <td className="px-4 py-2">{new Date(phieu.duyetPhieuTL_NgayDuyet).toLocaleDateString()}</td>
              <td className="px-4 py-2">{phieu.duyetPhieuTL_TrangThai}</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-4 flex justify-between">
          {/* Nút Duyệt Thanh Lý */}
          <button
            onClick={() => onDuyet(phieu.maPhieuTL)}
            className="bg-green-500 text-white px-4 py-2 rounded transition-transform transform hover:scale-105"
          >
            Duyệt Thanh Lý
          </button>
          {/* Nút Từ Chối Thanh Lý */}
          <button
            onClick={() => onTuChoi(phieu.maPhieuTL)}
            className="bg-red-500 text-white px-4 py-2 rounded transition-transform transform hover:scale-105"
          >
            Từ Chối Thanh Lý
          </button>
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full transition-transform transform hover:scale-105" onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default ModalPhieuThanhLy;
