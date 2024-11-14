
// // // import { useState } from "react";
// // // import { Link, useNavigate } from "react-router-dom";
// // // import { AiOutlineLock } from "react-icons/ai";
// // // import { MdAccountCircle } from "react-icons/md";
// // // import axios from "axios";

// // // const Login = ({ onLogin }) => {
// // //   const [tenDangNhap, setTenDangNhap] = useState("");
// // //   const [matKhau, setMatKhau] = useState("");
// // //   const [error, setError] = useState("");
// // //   const navigate = useNavigate();

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setError(""); // Reset lỗi trước khi gửi
// // //     console.log("Bắt đầu đăng nhập...");

// // //     // Kiểm tra nếu tên đăng nhập hoặc mật khẩu trống
// // //     if (!tenDangNhap || !matKhau) {
// // //       setError("Vui lòng nhập tên đăng nhập và mật khẩu.");
// // //       return;
// // //     }

// // //     try {
// // //       const response = await axios.post("https://localhost:7240/api/Login/login", {
// // //         TenDangNhap: tenDangNhap,
// // //         MatKhau: matKhau,
// // //       });

// // //       console.log("Phản hồi từ server:", response);

// // //       const data = response.data;
// // //       console.log("Đăng nhập thành công:", data);
// // //       alert(`Đăng nhập thành công! ${data.Message}`);

// // //       // Lưu tên đăng nhập và trạng thái đăng nhập vào localStorage
// // //       localStorage.setItem("tenDangNhap", tenDangNhap);
// // //       localStorage.setItem("isLoggedIn", "true");

// // //       // Gọi hàm onLogin từ App
// // //       onLogin(tenDangNhap);
    
// // //       console.log("VaiTro từ server:", data.VaiTro);


// // //       if (data.VaiTro.toLowerCase() === "admin") {
// // //         console.log("Điều hướng tới trang Admin");
// // //         navigate("../admin/UserList"); // Chuyển đến trang Admin
// // //       } else {
// // //         console.log("Điều hướng tới trang Home");
// // //         navigate("../home"); // Chuyển đến trang Home
// // //       }
// // // X
      

// // //     } catch (err) {
// // //       console.error("Có lỗi xảy ra khi kết nối:", err);
// // //       if (err.response) {
// // //         setError(err.response.data.Message || "Tên đăng nhập hoặc mật khẩu không đúng.");
// // //       } else {
// // //         setError("Không thể kết nối tới máy chủ. Vui lòng kiểm tra lại.");
// // //       }
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
// // //       <div className="absolute inset-0 bg-black opacity-40"></div>
// // //       <div className="relative bg-white p-10 rounded-lg shadow-lg max-w-md w-full z-10">
// // //         <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Đăng Nhập</h2>

// // //         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

// // //         <form onSubmit={handleSubmit}>
// // //           <div className="mb-6 relative">
// // //             <label htmlFor="tenDangNhap" className="block text-lg text-gray-700">Tên Đăng Nhập:</label>
// // //             <div className="absolute left-3 top-10 text-gray-400">
// // //               <MdAccountCircle />
// // //             </div>
// // //             <input
// // //               type="text"
// // //               id="tenDangNhap"
// // //               value={tenDangNhap}
// // //               onChange={(e) => setTenDangNhap(e.target.value)}
// // //               className="w-full p-4 pl-10 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //               required
// // //             />
// // //           </div>

// // //           <div className="mb-6 relative">
// // //             <label htmlFor="matKhau" className="block text-lg text-gray-700">Mật Khẩu:</label>
// // //             <div className="absolute left-3 top-10 text-gray-400">
// // //               <AiOutlineLock />
// // //             </div>
// // //             <input
// // //               type="password"
// // //               id="matKhau"
// // //               value={matKhau}
// // //               onChange={(e) => setMatKhau(e.target.value)}
// // //               className="w-full p-4 pl-10 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //               required
// // //             />
// // //           </div>

// // //           <button
// // //             type="submit"
// // //             className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
// // //           >
// // //             Đăng Nhập
// // //           </button>

// // //           <p className="mt-4 text-center text-gray-600">
// // //             Chưa có tài khoản?{" "}
// // //             <Link to="/register" className="text-blue-600 hover:underline">
// // //               Đăng Ký
// // //             </Link>
// // //           </p>

// // //           <p className="mt-2 text-center text-sm text-gray-500">
// // //             <Link to="/forgot-password" className="text-blue-600 hover:underline">
// // //               Quên mật khẩu?
// // //             </Link>
// // //           </p>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Login;
// // import { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { AiOutlineLock } from "react-icons/ai";
// // import { MdAccountCircle } from "react-icons/md";
// // import axios from "axios";

// // const Login = ({ onLogin }) => {
// //   const [tenDangNhap, setTenDangNhap] = useState("");
// //   const [matKhau, setMatKhau] = useState("");
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError(""); // Reset lỗi trước khi gửi
// //     console.log("Bắt đầu đăng nhập...");

// //     // Kiểm tra nếu tên đăng nhập hoặc mật khẩu trống
// //     if (!tenDangNhap || !matKhau) {
// //       setError("Vui lòng nhập tên đăng nhập và mật khẩu.");
// //       return;
// //     }

// //     try {
// //       const response = await axios.post("https://localhost:7240/api/Login/login", {
// //         TenDangNhap: tenDangNhap,
// //         MatKhau: matKhau,
// //       });

// //       console.log("Phản hồi từ server:", response);

// //       const data = response.data;
// //       console.log("Dữ liệu vai trò từ server:", data.VaiTro);

// //       // Kiểm tra nếu VaiTro không tồn tại trong dữ liệu trả về
// //       if (!data.VaiTro) {
// //         setError("Vai trò người dùng không xác định.");
// //         return;
// //       }

// //       console.log("Đăng nhập thành công:", data);
// //       alert(`Đăng nhập thành công! ${data.Message}`);

// //       // Lưu tên đăng nhập và trạng thái đăng nhập vào localStorage
// //       localStorage.setItem("tenDangNhap", tenDangNhap);
// //       localStorage.setItem("isLoggedIn", "true");

// //       // Gọi hàm onLogin từ App
// //       onLogin(tenDangNhap);

// //       // Điều hướng dựa trên vai trò người dùng
// //       const vaiTro = data.VaiTro.toLowerCase(); // Chuyển tất cả về chữ thường để so sánh

// //       if (vaiTro === "admin") {
// //         console.log("Điều hướng tới trang Admin");
// //         navigate("../admin/UserList"); // Chuyển đến trang Admin
// //       } else if (vaiTro === "user") {
// //         console.log("Điều hướng tới trang Home");
// //         navigate("../home"); // Chuyển đến trang Home
// //       } else {
// //         setError("Vai trò không xác định.");
// //       }

// //     } catch (err) {
// //       console.error("Có lỗi xảy ra khi kết nối:", err);
// //       if (err.response) {
// //         setError(err.response.data.Message || "Tên đăng nhập hoặc mật khẩu không đúng.");
// //       } else {
// //         setError("Không thể kết nối tới máy chủ. Vui lòng kiểm tra lại.");
// //       }
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
// //       <div className="absolute inset-0 bg-black opacity-40"></div>
// //       <div className="relative bg-white p-10 rounded-lg shadow-lg max-w-md w-full z-10">
// //         <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Đăng Nhập</h2>

// //         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

// //         <form onSubmit={handleSubmit}>
// //           <div className="mb-6 relative">
// //             <label htmlFor="tenDangNhap" className="block text-lg text-gray-700">Tên Đăng Nhập:</label>
// //             <div className="absolute left-3 top-10 text-gray-400">
// //               <MdAccountCircle />
// //             </div>
// //             <input
// //               type="text"
// //               id="tenDangNhap"
// //               value={tenDangNhap}
// //               onChange={(e) => setTenDangNhap(e.target.value)}
// //               className="w-full p-4 pl-10 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               required
// //             />
// //           </div>

// //           <div className="mb-6 relative">
// //             <label htmlFor="matKhau" className="block text-lg text-gray-700">Mật Khẩu:</label>
// //             <div className="absolute left-3 top-10 text-gray-400">
// //               <AiOutlineLock />
// //             </div>
// //             <input
// //               type="password"
// //               id="matKhau"
// //               value={matKhau}
// //               onChange={(e) => setMatKhau(e.target.value)}
// //               className="w-full p-4 pl-10 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               required
// //             />
// //           </div>

// //           <button
// //             type="submit"
// //             className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
// //           >
// //             Đăng Nhập
// //           </button>

// //           <p className="mt-4 text-center text-gray-600">
// //             Chưa có tài khoản?{" "}
// //             <Link to="/register" className="text-blue-600 hover:underline">
// //               Đăng Ký
// //             </Link>
// //           </p>

// //           <p className="mt-2 text-center text-sm text-gray-500">
// //             <Link to="/forgot-password" className="text-blue-600 hover:underline">
// //               Quên mật khẩu?
// //             </Link>
// //           </p>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AiOutlineLock } from "react-icons/ai";
// import { MdAccountCircle } from "react-icons/md";
// import axios from "axios";

// const Login = ({ onLogin }) => {
//   const [tenDangNhap, setTenDangNhap] = useState("");
//   const [matKhau, setMatKhau] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(""); // Reset lỗi trước khi gửi
//     console.log("Bắt đầu đăng nhập...");

//     if (!tenDangNhap || !matKhau) {
//       setError("Vui lòng nhập tên đăng nhập và mật khẩu.");
//       return;
//     }

//     try {
//       const response = await axios.post("https://localhost:7240/api/Login/login", {
//         TenDangNhap: tenDangNhap,
//         MatKhau: matKhau,
//       });

//       console.log("Phản hồi từ server:", response);

//       const data = response.data;
//       console.log("Dữ liệu vai trò từ server:", data?.VaiTro);

//       // Kiểm tra nếu VaiTro không tồn tại trong dữ liệu trả về
//       if (!data.VaiTro) {
//         setError("Vai trò người dùng không xác định.");
//         return;
//       }

//       alert(`Đăng nhập thành công! ${data.Message}`);

//       // Lưu tên đăng nhập và trạng thái đăng nhập vào localStorage
//       localStorage.setItem("tenDangNhap", tenDangNhap);
//       localStorage.setItem("isLoggedIn", "true");

//       // Gọi hàm onLogin từ App
//       onLogin(tenDangNhap);

//       // Điều hướng dựa trên vai trò người dùng
//       const vaiTro = data.VaiTro.toLowerCase();

//       if (vaiTro === "admin") {
//         navigate("/admin/UserList"); // Chuyển đến trang Admin
//       } else if (vaiTro === "user") {
//         navigate("/home"); // Chuyển đến trang Home
//       } else {
//         setError("Vai trò không xác định.");
//       }

//     } catch (err) {
//       console.error("Có lỗi xảy ra khi kết nối:", err);
//       if (err.response) {
//         setError(err.response.data.Message || "Tên đăng nhập hoặc mật khẩu không đúng.");
//       } else {
//         setError("Không thể kết nối tới máy chủ. Vui lòng kiểm tra lại.");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
//       <div className="absolute inset-0 bg-black opacity-40"></div>
//       <div className="relative bg-white p-10 rounded-lg shadow-lg max-w-md w-full z-10">
//         <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Đăng Nhập</h2>

//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-6 relative">
//             <label htmlFor="tenDangNhap" className="block text-lg text-gray-700">Tên Đăng Nhập:</label>
//             <div className="absolute left-3 top-10 text-gray-400">
//               <MdAccountCircle />
//             </div>
//             <input
//               type="text"
//               id="tenDangNhap"
//               value={tenDangNhap}
//               onChange={(e) => setTenDangNhap(e.target.value)}
//               className="w-full p-4 pl-10 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="mb-6 relative">
//             <label htmlFor="matKhau" className="block text-lg text-gray-700">Mật Khẩu:</label>
//             <div className="absolute left-3 top-10 text-gray-400">
//               <AiOutlineLock />
//             </div>
//             <input
//               type="password"
//               id="matKhau"
//               value={matKhau}
//               onChange={(e) => setMatKhau(e.target.value)}
//               className="w-full p-4 pl-10 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
//           >
//             Đăng Nhập
//           </button>

//           <p className="mt-4 text-center text-gray-600">
//             Chưa có tài khoản?{" "}
//             <Link to="/register" className="text-blue-600 hover:underline">
//               Đăng Ký
//             </Link>
//           </p>

//           <p className="mt-2 text-center text-sm text-gray-500">
//             <Link to="/forgot-password" className="text-blue-600 hover:underline">
//               Quên mật khẩu?
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLock } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [tenDangNhap, setTenDangNhap] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset lỗi trước khi gửi
    console.log("Bắt đầu đăng nhập...");

    // Kiểm tra nếu tên đăng nhập hoặc mật khẩu trống
    if (!tenDangNhap || !matKhau) {
      setError("Vui lòng nhập tên đăng nhập và mật khẩu.");
      return;
    }

    try {
      const response = await axios.post("https://localhost:7240/api/Login/login", {
        TenDangNhap: tenDangNhap,
        MatKhau: matKhau,
      });

      const data = response.data;
      console.log("Dữ liệu vai trò từ server:", data.vaiTro);

      // Kiểm tra nếu vaiTro không tồn tại trong dữ liệu trả về
      if (!data.vaiTro) {
        setError("Vai trò người dùng không xác định.");
        return;
      }

      console.log("Đăng nhập thành công:", data);
      alert(`Đăng nhập thành công! ${data.message}`);

      // Lưu tên đăng nhập và trạng thái đăng nhập vào localStorage
      localStorage.setItem("tenDangNhap", tenDangNhap);
      localStorage.setItem("isLoggedIn", "true");

      // Gọi hàm onLogin từ App
      onLogin(tenDangNhap);

      // Điều hướng dựa trên vai trò người dùng
      const vaiTro = data.vaiTro.toLowerCase(); // Chuyển tất cả về chữ thường để so sánh

      if (vaiTro === "admin") {
        console.log("Điều hướng tới trang Admin");
        navigate("../user-management"); // Chuyển đến trang Admin
      } else if (vaiTro === "user") {
        console.log("Điều hướng tới trang Home");
        navigate("../home"); // Chuyển đến trang Home
      } else {
        setError("Vai trò không xác định.");
      }

    } catch (err) {
      console.error("Có lỗi xảy ra khi kết nối:", err);
      if (err.response) {
        setError(err.response.data.Message || "Tên đăng nhập hoặc mật khẩu không đúng.");
      } else {
        setError("Không thể kết nối tới máy chủ. Vui lòng kiểm tra lại.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative bg-white p-10 rounded-lg shadow-lg max-w-md w-full z-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Đăng Nhập</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-6 relative">
            <label htmlFor="tenDangNhap" className="block text-lg text-gray-700">Tên Đăng Nhập:</label>
            <div className="absolute left-3 top-10 text-gray-400">
              <MdAccountCircle />
            </div>
            <input
              type="text"
              id="tenDangNhap"
              value={tenDangNhap}
              onChange={(e) => setTenDangNhap(e.target.value)}
              className="w-full p-4 pl-10 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6 relative">
            <label htmlFor="matKhau" className="block text-lg text-gray-700">Mật Khẩu:</label>
            <div className="absolute left-3 top-10 text-gray-400">
              <AiOutlineLock />
            </div>
            <input
              type="password"
              id="matKhau"
              value={matKhau}
              onChange={(e) => setMatKhau(e.target.value)}
              className="w-full p-4 pl-10 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
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
        </form>
      </div>
    </div>
  );
};

export default Login;
