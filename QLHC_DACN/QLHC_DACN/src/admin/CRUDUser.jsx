// CRUDUser.jsx
import UserList from "../admin/UserList";
import UserForm from "../admin/UserForm";
import { useState } from "react";

const API_URL = "https://localhost:7240/api/Users";

export const getUsers = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createUser = async (user) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const getUserById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

// export const updateUser = async (id, user) => {
//     const response = await fetch(`${API_URL}/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(user),
//     });
//   return response.json();
// };
export const updateUser = async (id, user) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  console.log('Response status:', response.status); // Kiểm tra mã trạng thái
  const data = await response.text(); // Lấy văn bản thô từ phản hồi

  if (data) {
    console.log('Response data:', data); // Kiểm tra dữ liệu trả về
  }

  if (!response.ok) {
    throw new Error('Failed to update user');
  }

  if (response.status === 204) {
    return;
  }

  // Nếu có phản hồi dữ liệu, chuyển phản hồi thành JSON
  return JSON.parse(data);
};


export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (!response.ok) {
      const errorMessage = await response.text(); // Lấy thông báo lỗi từ phản hồi (nếu có)
      throw new Error(
        `Không thể xóa người dùng. Mã lỗi: ${response.status}. ${errorMessage}`
      );
    }
  } catch (error) {
    console.error("Lỗi khi xóa người dùng:", error.message);
    throw error; // Ném lỗi để xử lý trong `handleDelete`
  }
};


export const updateRole = async (id, role) => {
  const response = await fetch(`${API_URL}/${id}/phanquyen`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ vaiTro: role }),
  });
  return response.json();
};
const CRUDUser = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh); // Thay đổi giá trị để kích hoạt render lại
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý người dùng</h1>
      <UserForm onUserAdded={handleRefresh} /> {/* Truyền hàm refresh xuống */}
      <UserList refresh={refresh} /> {/* Truyền refresh xuống */}
    </div>
  );
};

export default CRUDUser;
