import React, { useState } from 'react';
import axios from 'axios';

const EmailUpdateModal = ({ userId, onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const updateEmail = async () => {
    if (!email) {
      setError('Vui lòng nhập email.');
      return;
    }
    
    setError('');
    try {
      const response = await axios.put(`https://localhost:7240/api/Login/update-email/${userId}`, {
        Email: email,
      });
      setSuccess('Cập nhật email thành công');
      setEmail(''); // Clear email field after success
    } catch (error) {
      console.error('Lỗi khi cập nhật email', error);
      setError('Có lỗi khi cập nhật email');
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Cập Nhật Email</h2>
        {/* Hiển thị thông báo thành công hoặc lỗi */}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email mới:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Nhập email mới"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            Đóng
          </button>
          <button
            onClick={updateEmail}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailUpdateModal;
