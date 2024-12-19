// UserList.jsx
import { useEffect, useState } from 'react';
import { getUsers,deleteUser,updateUser,resetPassword } from './CRUDUser'; // Đảm bảo đường dẫn đúng
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [editUserId, setEditUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({
    tenDangNhap: '',
    email: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditUserId(user.maNguoiDung);
    setEditedUser({
      tenDangNhap: user.tenDangNhap,
      email: user.email,
    });
  };
  const handleUpdate = async (id) => {
      await updateUser(id, { 
        tenDangNhap: editedUser.tenDangNhap, 
        email: editedUser.email 
      });
      setEditUserId(null);  // Đóng form chỉnh sửa
      const updatedUsers = users.map(user =>
        user.maNguoiDung === id ? { ...user, ...editedUser } : user
      );
      setUsers(updatedUsers); 
  };
  const handleResetPassword = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn reset mật khẩu của người dùng này?")) {
      try {
        await resetPassword(id); // Gọi API reset mật khẩu
        alert("Reset mật khẩu thành công!");
      } catch (error) {
        alert("Đã xảy ra lỗi khi reset mật khẩu: " + error.message);
      }
    }
  };
  // // Hàm xử lý xóa người dùng
  // const handleDelete = async (userId) => {
  //   if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
  //     try {
  //       await deleteUser(userId); // Gọi API xóa người dùng
  //       navigate(0) // Cập nhật danh sách sau khi xóa
  //     } catch (error) {
  //       if (error.response && error.response.status === 500) {
  //         // Nếu lỗi là do liên kết dữ liệu
  //         alert("Không thể xóa người dùng vì có dữ liệu liên kết!");
  //       } else {
  //         // Lỗi khác
  //         alert("Đã xảy ra lỗi khi xóa người dùng!");
  //       }
  //     }
  //   }
  // };
  const handleDelete = async (userId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      try {
        await deleteUser(userId);
        setUsers(users.filter((user) => user.maNguoiDung !== userId));
        alert("Xóa người dùng thành công!");
      } catch (error) {
        if (error.message.includes("500")) {
          alert("Không thể xóa người dùng vì có dữ liệu liên kết!");
        } else {
          alert("Đã xảy ra lỗi: " + error.message);
        }
      }
    }
  };
  

  return (
    <div>
    <table className="table-auto w-full text-left">
      <thead>
        <tr className='border px-4 py-2'>
          <th className="border px-4 py-2">Mã Người Dùng</th>
          <th className="border px-4 py-2">Tên Đăng Nhập</th>
          <th className="border px-4 py-2">Tên Người Dùng</th>
          <th className="border px-4 py-2">Email</th>
          <th className="border px-4 py-2">Vai Trò</th>
          <th className="border px-4 py-2">Hành Động</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.maNguoiDung}>
            {editUserId === user.maNguoiDung ? (
              <>
                <td className="border px-4 py-2">{user.maNguoiDung}</td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={editedUser.tenDangNhap}
                    onChange={(e) => setEditedUser({ ...editedUser, tenDangNhap: e.target.value })}
                    className="border rounded px-2 py-1"
                  />
                </td>
                <td className="border px-4 py-2">
                {user.tenNguoiDung}
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    className="border rounded px-2 py-1"
                  />
                </td>
                {/* <td className="border px-4 py-2">
                  <select
                    value={editedUser.vaiTro}
                    onChange={(e) => setEditedUser({ ...editedUser, vaiTro: e.target.value })}
                    className="border rounded px-2 py-1"
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td> */}
                
                 <td className="border px-4 py-2">
                 {user.vaiTro}
                </td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleUpdate(user.maNguoiDung)} className="bg-blue-500 text-white px-4 py-2 rounded">Lưu</button>
                </td>
              </>
            ) : (
              <>
                <td className="border px-4 py-2">{user.maNguoiDung}</td>
                <td className="border px-4 py-2">{user.tenDangNhap}</td>
                <td className="border px-4 py-2">{user.tenNguoiDung}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.vaiTro}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleEdit(user)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Sửa</button>
                  <button onClick={() => handleDelete(user.maNguoiDung)} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Xóa</button>
                  <button onClick={() => handleResetPassword(user.maNguoiDung)} className="bg-blue-500 text-white px-4 py-2 rounded">Reset mật khẩu</button>
                  
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default UserList;
