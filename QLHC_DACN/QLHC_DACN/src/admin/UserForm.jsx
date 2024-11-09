// UserForm.jsx
import { useState } from "react";
import { createUser } from "../pages/CRUDUser"; // Đảm bảo đường dẫn đúng

const UserForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Thêm mật khẩu
  const [role, setRole] = useState("User");
  const [errorMessage, setErrorMessage] = useState(""); // Thêm biến để lưu thông báo lỗi

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Kiểm tra định dạng email hợp lệ
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ràng buộc tên đăng nhập
    if (username.length > 20) {
      setErrorMessage("Tên đăng nhập không được dài quá 20 ký tự.");
      return;
    }

    if (/\s/.test(username)) {
      setErrorMessage("Tên đăng nhập không được chứa dấu cách.");
      return;
    }

    // Kiểm tra định dạng email
    if (!validateEmail(email)) {
      setErrorMessage("Email không hợp lệ.");
      return;
    }

    setErrorMessage(""); // Xóa thông báo lỗi nếu không có vấn đề

    const newUser = {
      tenDangNhap: username,
      matKhauHash: password,
      email: email,
      vaiTro: role,
    };

    try {
      await createUser(newUser);
      
    } catch (error) {
      setErrorMessage("Đã xảy ra lỗi khi thêm người dùng.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Tên đăng nhập</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Tên đăng nhập"
          className="border rounded w-full py-2 px-3 text-gray-700"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Mật khẩu</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu"
          className="border rounded w-full py-2 px-3 text-gray-700"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border rounded w-full py-2 px-3 text-gray-700"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Vai trò</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700"
        >
          <option value="User">User</option>
          <option value="Nhân viên">Nhân viên</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      {errorMessage && (
        <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
      )}

      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Thêm người dùng
      </button>
    </form>
  );
};

export default UserForm;
