import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineLock } from "react-icons/ai";
import { MdEmail } from "react-icons/md";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng nhập
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="absolute inset-0 bg-black opacity-40"></div> {/* Hiệu ứng mờ cho nền */}
      <div className="relative bg-white p-10 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-500 hover:shadow-2xl z-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Đăng Nhập</h2>

        <div className="mb-6 relative">
          <label htmlFor="email" className="block text-lg text-gray-700">Email:</label>
          <div className="absolute left-3 top-10 text-gray-400">
            <MdEmail />
          </div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 pl-10 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full p-4 pl-10 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={handleSubmit}
        >
          Đăng Nhập
        </button>

        <p className="mt-4 text-center text-gray-600">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Đăng Ký
          </Link>
        </p>

        <p className="mt-2 text-center text-sm text-gray-500">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Quên mật khẩu?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
