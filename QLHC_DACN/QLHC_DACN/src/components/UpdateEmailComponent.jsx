import React, { useState } from 'react';
import axios from 'axios';

const UpdateEmailComponent = ({ userId }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const updateUserEmail = async () => {
    if (!email) {
      setError('Vui lòng nhập email.');
      return;
    }
    
    setError('');
    try {
      const response = await axios.put(`https://localhost:7240/api/login/update-email/${userId}`, {
        Email: email,
      });
      console.log(response.data);
      setSuccess('Cập nhật email thành công');
    } catch (error) {
      console.error('Lỗi khi cập nhật email', error);
      setError('Có lỗi khi cập nhật email');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Cập Nhật Email</h2>

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

      <button
        onClick={updateUserEmail}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Cập nhật email
      </button>
    </div>
  );
};

export default UpdateEmailComponent;
