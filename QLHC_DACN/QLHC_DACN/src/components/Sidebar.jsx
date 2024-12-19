import { Link } from "react-router-dom";

const Sidebar = ({ open, onClose }) => {
  const vaiTro = localStorage.getItem("vaiTro"); // Lấy vai trò từ localStorage
    return (
    <div
      className={`fixed z-30 inset-0 bg-gray-800 bg-opacity-75 transition-opacity ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="flex flex-col bg-white w-64 h-full shadow-lg p-6 transition-transform transform ${open ? 'translate-x-0' : '-translate-x-full'}">
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 mb-4 text-2xl focus:outline-none"
        >
          {/* Đóng */}
          <i className="fa-solid fa-bars"></i>
        </button>
        <nav className="flex flex-col space-y-4">
          {/* Hiển thị menu theo vai trò */}
          {vaiTro === "Admin" && (
            <>
              <Link
                to="/thong-ke"
                className="text-gray-700 hover:bg-blue-100 p-2 rounded transition-colors duration-200"
              >
                Dashboard
              </Link>

              <Link
                to="/ChemicalManagement"
                className="text-gray-700 hover:bg-blue-100 p-2 rounded transition-colors duration-200"
              >
                Quản Lý Hóa Chất
              </Link>
              <Link
                to="/user-management"
                className="text-gray-700 hover:bg-blue-100 p-2 rounded transition-colors duration-200"
              >
                Quản Lý Tài Khoản
              </Link>
              <Link
                to="/duyet-purchase-request"
                className="text-gray-700 hover:bg-blue-100 p-2 rounded transition-colors duration-200"
              >
                Duyệt Phiếu Đề Xuất
              </Link>
              <Link
                to="/phieu-thanh-ly"
                className="text-gray-700 hover:bg-blue-100 p-2 rounded transition-colors duration-200"
              >
                Duyệt Phiếu Thanh Lý
              </Link>
            </>
          )}
          {vaiTro === "Nhân viên" && (
            <>
              <Link
                to="/"
                className="text-gray-700 hover:bg-blue-100 p-2 rounded transition-colors duration-200"
              >
                Trang Chủ
              </Link>
              <Link
                to="/ChemicalManagement"
                className="text-gray-700 hover:bg-blue-100 p-2 rounded transition-colors duration-200"
              >
                Quản Lý Hóa Chất
              </Link>
              <Link
                to="/tao-phieu-thanh-ly"
                className="text-gray-700 hover:bg-blue-100 p-2 rounded transition-colors duration-200"
              >
                Tạo Phiếu Thanh Lý
              </Link>
              <Link
                to="/inventory-management"
                className="text-gray-700 hover:bg-blue-100 p-2 rounded transition-colors duration-200"
              >
                Quản Lý Nhập Hóa Chất
              </Link>
              <Link
                to="/duyet-chemical-forecasting"
                className="text-gray-700 hover:bg-blue-100 p-2 rounded transition-colors duration-200"
              >
                Xác nhận Dự trù
              </Link>
              <Link
                to="/chemical-usage"
                className="text-gray-700 hover:bg-blue-100 p-2 rounded transition-colors duration-200"
              >
                Quản Lý Sử Dụng Hóa Chất
              </Link>
            </>
          )}
          {vaiTro === "Giảng viên" && (
            <>
              <Link
                to="/"
                className="text-gray-700 hover:bg-blue-100 p-2 rounded transition-colors duration-200"
              >
                Trang Chủ
              </Link>
              <Link
                to="/ChemicalManagement"
                className="text-gray-700 hover:bg-blue-100 p-2 rounded transition-colors duration-200"
              >
                Quản Lý Hóa Chất
              </Link>
              <Link
                to="/purchase-request"
                className="text-gray-700 hover:bg-blue-100 p-2 rounded transition-colors duration-200"
              >
                Đề Xuất Mua Hóa Chất
              </Link>
              <Link
                to="/chemical-forecasting"
                className="text-gray-700 hover:bg-blue-100 p-2 rounded transition-colors duration-200"
              >
                Dự Trù Hóa Chất
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};
export default Sidebar;
