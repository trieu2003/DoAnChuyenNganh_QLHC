import { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đổi mật khẩu
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="absolute inset-0 bg-black opacity-40"></div> {/* Hiệu ứng mờ nền */}
      <div className="relative bg-white p-10 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-500 hover:shadow-2xl z-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Đổi Mật Khẩu</h2>

        <div className="mb-6 relative">
          <label htmlFor="currentPassword" className="block text-lg text-gray-700">Mật Khẩu Hiện Tại:</label>
          <div className="absolute left-3 top-10 text-gray-400">
            <AiOutlineLock />
          </div>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-4 pl-10 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        <div className="mb-6 relative">
          <label htmlFor="newPassword" className="block text-lg text-gray-700">Mật Khẩu Mới:</label>
          <div className="absolute left-3 top-10 text-gray-400">
            <AiOutlineLock />
          </div>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-4 pl-10 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        <div className="mb-6 relative">
          <label htmlFor="confirmPassword" className="block text-lg text-gray-700">Xác Nhận Mật Khẩu Mới:</label>
          <div className="absolute left-3 top-10 text-gray-400">
            <AiOutlineLock />
          </div>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-4 pl-10 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-4 rounded-lg text-lg hover:bg-pink-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300"
          onClick={handleSubmit}
        >
          Đổi Mật Khẩu
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
