
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Lấy tên đăng nhập từ localStorage (hoặc từ state nếu bạn quản lý tên đăng nhập tại đó)
  const tenDangNhap = localStorage.getItem("tenDangNhap");
  console.log("Tên đăng nhập hiện tại:", tenDangNhap); // Log tên đăng nhập để kiểm tra

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Kiểm tra sự khớp của mật khẩu mới và xác nhận
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    // Kiểm tra độ dài của mật khẩu mới (ví dụ: ít nhất 8 ký tự)
    if (newPassword.length < 5) {
      setError("Mật khẩu mới phải có ít nhất 8 ký tự.");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7240/api/Login/change-password",
        {
          TenDangNhap: tenDangNhap,
          CurrentPassword: oldPassword,
          NewPassword: newPassword,
          ConfirmNewPassword: confirmPassword,
        },
        { withCredentials: true }
      );

      const data = response.data;
      setSuccessMessage(data.Message || "Đổi mật khẩu thành công!");

      // Logout: xóa thông tin người dùng trong localStorage
      localStorage.removeItem("tenDangNhap");
      localStorage.removeItem("isLoggedIn");

      // Quay lại trang đăng nhập sau khi thành công
      setTimeout(() => {
        navigate("../Home");
      }, 2000);

    } catch (err) {
      console.error("Lỗi khi gửi yêu cầu đổi mật khẩu:", err);
      if (err.response && err.response.data) {
        setError(err.response.data.Message || "Đã xảy ra lỗi. Vui lòng thử lại.");
      } else {
        setError("Không thể kết nối tới máy chủ. Vui lòng kiểm tra lại.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative bg-white p-10 rounded-lg shadow-lg max-w-md w-full z-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Đổi Mật Khẩu</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

        <form onSubmit={handleChangePassword}>
          <div className="mb-6">
            <label htmlFor="oldPassword" className="block text-lg text-gray-700">Mật Khẩu Cũ:</label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="newPassword" className="block text-lg text-gray-700">Mật Khẩu Mới:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-lg text-gray-700">Xác Nhận Mật Khẩu:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Đổi Mật Khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
