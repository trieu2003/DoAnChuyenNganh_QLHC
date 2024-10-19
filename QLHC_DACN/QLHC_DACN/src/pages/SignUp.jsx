import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng ký
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <div className="absolute inset-0 bg-black opacity-40"></div> {/* Hiệu ứng mờ nền */}
      <div className="relative bg-white p-10 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-500 hover:shadow-2xl z-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Đăng Ký</h2>

        <div className="mb-6 relative">
          <label htmlFor="username" className="block text-lg text-gray-700">Tên Người Dùng:</label>
          <div className="absolute left-3 top-10 text-gray-400">
            <AiOutlineUser />
          </div>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-4 pl-10 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-6 relative">
          <label htmlFor="email" className="block text-lg text-gray-700">Email:</label>
          <div className="absolute left-3 top-10 text-gray-400">
            <AiOutlineMail />
          </div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 pl-10 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-6 relative">
          <label htmlFor="password" className="block text-lg text-gray-700">Mật Khẩu:</label>
          <div className="absolute left-3 top-10 text-gray-400">
            <AiOutlineLock />
          </div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 pl-10 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-6 relative">
          <label htmlFor="confirmPassword" className="block text-lg text-gray-700">Xác Nhận Mật Khẩu:</label>
          <div className="absolute left-3 top-10 text-gray-400">
            <AiOutlineLock />
          </div>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-4 pl-10 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-4 rounded-lg text-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-green-300"
          onClick={handleSubmit}
        >
          Đăng Ký
        </button>

        <p className="mt-4 text-center text-gray-600">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Đăng Nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
