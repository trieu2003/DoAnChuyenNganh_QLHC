import { Link } from "react-router-dom";

const Sidebar = ({ open, onClose }) => {
  return (
    <div className={`fixed z-30 inset-0 bg-gray-800 bg-opacity-75 transition-opacity ${open ? 'block' : 'hidden'}`}>
      <div className="flex flex-col bg-white w-64 h-full shadow-lg p-6 transition-transform transform ${open ? 'translate-x-0' : '-translate-x-full'}">
        <button 
          onClick={onClose} 
          className="text-gray-600 hover:text-gray-800 mb-4 text-2xl focus:outline-none"
        >
          Đóng
        </button>
        <nav className="flex flex-col space-y-4">
          <Link 
            to="/" 
            className="text-gray-700 hover:bg-blue-100 p-2 rounded transition-colors duration-200"
          >
            Trang Chủ
          </Link>
          <Link 
            to="/chemical-management" 
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
            to="/inventory-management" 
            className="text-gray-700 hover:bg-blue-100 p-2 rounded transition-colors duration-200"
          >
            Quản Lý Nhập Hóa Chất
          </Link>
          <Link 
            to="/chemical-forecasting" 
            className="text-gray-700 hover:bg-blue-100 p-2 rounded transition-colors duration-200"
          >
            Dự Trù Hóa Chất
          </Link>
          <Link 
            to="/chemical-usage" 
            className="text-gray-700 hover:bg-blue-100 p-2 rounded transition-colors duration-200"
          >
            Quản Lý Sử Dụng Hóa Chất
          </Link>
          <Link 
            to="/expired-chemicals" 
            className="text-gray-700 hover:bg-blue-100 p-2 rounded transition-colors duration-200"
          >
            Thanh Lý Hóa Chất Hết Hạn
          </Link>
          <Link 
            to="/reporting" 
            className="text-gray-700 hover:bg-blue-100 p-2 rounded transition-colors duration-200"
          >
            Thống Kê & Báo Cáo
          </Link>
          <Link 
            to="/settings" 
            className="text-gray-700 hover:bg-blue-100 p-2 rounded transition-colors duration-200"
          >
            Cài Đặt
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
