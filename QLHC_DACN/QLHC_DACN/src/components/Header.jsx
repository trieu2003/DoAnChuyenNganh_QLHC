import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import EmailUpdateModal from "./EmailUpdateModal"; // Import modal component

const Header = ({ onOpenSidebar, isLoggedIn, userName, onLogout, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const navigate = useNavigate(); // Khởi tạo hook useNavigate
  const openEmailModal = () => {
    setIsModalOpen(true); // Open modal
  };

  const closeEmailModal = () => {
    setIsModalOpen(false); // Close modal
  };
  // Hàm đăng xuất
  const handleLogout = () => {
    // Thực hiện đăng xuất (ví dụ: xóa thông tin lưu trong localStorage)
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("maNguoiDung");
    localStorage.removeItem("tenDangNhap");

    // Gọi hàm onLogout (nếu cần)
    onLogout();

    // Điều hướng về trang đăng nhập
    navigate("/login"); // Điều hướng đến trang login
  };
  return (
    <header className="bg-blue-600 text-white p-4 flex items-center justify-between max-w-full">
      <button onClick={onOpenSidebar} className="text-white text-2xl">
        {/* <span className="material-icons">Menu</span> */}
        <i className="fa-solid fa-bars"></i>
      </button>
      <h1 className="text-2xl font-semibold">Quản Lý Hóa Chất</h1>
      <div className="flex space-x-4">
        {isLoggedIn ? (
          <>
            <span
              onClick={openEmailModal}
              className="text-white text-lg cursor-pointer"
            >
              Xin chào, {userName}!
            </span>
            <button
              // onClick={onLogout}
              onClick={handleLogout}
              className="text-white hover:text-gray-200 text-lg"
            >
              Đăng Xuất
            </button>
          </>
        ) : (
          <Link to="/login" className="text-white hover:text-gray-200 text-lg">
            Đăng Nhập
          </Link>
        )}
        <Link
          to="/change-password"
          className="text-white hover:text-gray-200 text-lg"
        >
          Đổi Mật Khẩu
        </Link>
        {/* Thêm các trang khác tại đây */}
        <Link to="/home" className="text-white hover:text-gray-200 text-lg">
          Trang Chủ
        </Link>
        <Link
          to="/gioi-thieucontact"
          className="text-white hover:text-gray-200 text-lg"
        >
          Giới Thiệu
        </Link>
        <Link
          to="/nganh-dao-tao"
          className="text-white hover:text-gray-200 text-lg"
        >
          Ngành Đào Tạo
        </Link>
        <Link to="/dao-tao" className="text-white hover:text-gray-200 text-lg">
          Đào Tạo
        </Link>
      </div>

      {/* Open modal if isModalOpen is true */}
      {isModalOpen && (
        <EmailUpdateModal userId={userId} onClose={closeEmailModal} />
      )}
    </header>
  );
};

export default Header;
