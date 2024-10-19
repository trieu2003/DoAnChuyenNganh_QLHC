import { Link } from "react-router-dom";

const Header = ({ onOpenSidebar }) => {
  return (
    <header className="bg-blue-600 text-white p-4 flex items-center justify-between max-w-full">
      <button onClick={onOpenSidebar} className="text-white text-2xl">
        <span className="material-icons">Menu</span>
      </button>
      <h1 className="text-2xl font-semibold">Quản Lý Hóa Chất</h1>
      <div className="flex space-x-4">
        <Link to="/login" className="text-white hover:text-gray-200 text-lg">
          Đăng Nhập
        </Link>
        <Link to="/logout" className="text-white hover:text-gray-200 text-lg">
          Đăng Xuất
        </Link>
        <Link to="/change-password" className="text-white hover:text-gray-200 text-lg">
          Đổi Mật Khẩu
        </Link>
      </div>
    </header>
  );
};

export default Header;
