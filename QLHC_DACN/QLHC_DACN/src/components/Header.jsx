// // // // // // // // // // import { Link } from "react-router-dom";

// // // // // // // // // // const Header = ({ onOpenSidebar, isLoggedIn, userName, onLogout }) => {
// // // // // // // // // //   return (
// // // // // // // // // //     <header className="bg-blue-600 text-white p-4 flex items-center justify-between max-w-full">
// // // // // // // // // //       <button onClick={onOpenSidebar} className="text-white text-2xl">
// // // // // // // // // //         <span className="material-icons">Menu</span>
// // // // // // // // // //       </button>
// // // // // // // // // //       <h1 className="text-2xl font-semibold">Quản Lý Hóa Chất</h1>
// // // // // // // // // //       <div className="flex space-x-4">
// // // // // // // // // //         {isLoggedIn ? (
// // // // // // // // // //           <>
// // // // // // // // // //             <span className="text-white text-lg">Xin chào, {userName}!</span>
// // // // // // // // // //             <button onClick={onLogout} className="text-white hover:text-gray-200 text-lg">
// // // // // // // // // //               Đăng Xuất
// // // // // // // // // //             </button>
// // // // // // // // // //           </>
// // // // // // // // // //         ) : (
// // // // // // // // // //           <Link to="/login" className="text-white hover:text-gray-200 text-lg">
// // // // // // // // // //             Đăng Nhập
// // // // // // // // // //           </Link>
// // // // // // // // // //         )}
// // // // // // // // // //         <Link to="/change-password" className="text-white hover:text-gray-200 text-lg">
// // // // // // // // // //           Đổi Mật Khẩu
// // // // // // // // // //         </Link>
// // // // // // // // // //       </div>
// // // // // // // // // //     </header>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default Header;
// // // // // // // // // import { Link } from "react-router-dom";

// // // // // // // // // const Header = ({ onOpenSidebar, isLoggedIn, userName, onLogout }) => {
// // // // // // // // //   return (
// // // // // // // // //     <header className="bg-blue-600 text-white p-4 flex items-center justify-between max-w-full">
// // // // // // // // //       <button onClick={onOpenSidebar} className="text-white text-2xl">
// // // // // // // // //         <span className="material-icons">Menu</span>
// // // // // // // // //       </button>
// // // // // // // // //       <h1 className="text-2xl font-semibold">Quản Lý Hóa Chất</h1>
// // // // // // // // //       <div className="flex space-x-4">
// // // // // // // // //         {isLoggedIn ? (
// // // // // // // // //           <>
// // // // // // // // //             <span className="text-white text-lg">Xin chào, {userName}!</span>
// // // // // // // // //             <button onClick={onLogout} className="text-white hover:text-gray-200 text-lg">
// // // // // // // // //               Đăng Xuất
// // // // // // // // //             </button>
// // // // // // // // //           </>
// // // // // // // // //         ) : (
// // // // // // // // //           <Link to="/login" className="text-white hover:text-gray-200 text-lg">
// // // // // // // // //             Đăng Nhập
// // // // // // // // //           </Link>
// // // // // // // // //         )}
// // // // // // // // //         <Link to="/change-password" className="text-white hover:text-gray-200 text-lg">
// // // // // // // // //           Đổi Mật Khẩu
// // // // // // // // //         </Link>
// // // // // // // // //       </div>
// // // // // // // // //     </header>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default Header;
// // // // // // // // import React from 'react';
// // // // // // // // import { Link } from 'react-router-dom';

// // // // // // // // const Header = ({ isLoggedIn, userName, onLogout }) => {
// // // // // // // //   return (
  
// // // // // // // //     <header className="bg-blue-600 text-white p-4">
      
// // // // // // // //       <div className="container mx-auto flex justify-between items-center">
// // // // // // // //         <h1 className="text-2xl font-bold">Trường Đại học Công Thương</h1>
// // // // // // // //         <nav>
// // // // // // // //           <ul className="flex space-x-4">
// // // // // // // //             <li><Link to="/home">Home</Link></li>
// // // // // // // //             <li><Link to="/gioi-thieucontact">Giới thiệu</Link></li>
// // // // // // // //             <li><Link to="/dao-tao">Đào tạo</Link></li>
// // // // // // // //             {/* Nếu đã đăng nhập, hiển thị tên người dùng và nút Logout */}
// // // // // // // //             {isLoggedIn ? (
// // // // // // // //               <>
// // // // // // // //                 <li>Xin chào, {userName}</li>
// // // // // // // //                 <li><button onClick={onLogout}>Đăng xuất</button></li>
// // // // // // // //               </>
// // // // // // // //             ) : (
// // // // // // // //               <li><Link to="/login">Đăng nhập</Link></li>
// // // // // // // //             )}
// // // // // // // //                  <li><Link to="/change-password">Đổi mật khất</Link></li>
// // // // // // // //           </ul>
// // // // // // // //         </nav>
// // // // // // // //       </div>
// // // // // // // //     </header>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default Header;
// // // // // // // import React, { useState } from 'react';
// // // // // // // import { Link } from 'react-router-dom';

// // // // // // // const Header = ({ isLoggedIn, userName, onLogout }) => {
// // // // // // //   const [menuOpen, setMenuOpen] = useState(false);

// // // // // // //   // Hàm toggle mở/đóng menu
// // // // // // //   const toggleMenu = () => {
// // // // // // //     setMenuOpen(!menuOpen);
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <header className="bg-blue-600 text-white p-4">
// // // // // // //       <div className="container mx-auto flex justify-between items-center">
// // // // // // //         {/* Logo */}
// // // // // // //         <h1 className="text-2xl font-bold">Trường Đại học Công Thương</h1>

// // // // // // //         {/* Nút mở menu */}
// // // // // // //         <button 
// // // // // // //           className="text-white lg:hidden" 
// // // // // // //           onClick={toggleMenu}
// // // // // // //         >
// // // // // // //           <span className="material-icons">menu</span>
// // // // // // //         </button>

// // // // // // //         {/* Menu điều hướng */}
// // // // // // //         <nav className={`${menuOpen ? 'block' : 'hidden'} lg:block`}>
// // // // // // //           <ul className="flex space-x-4">
// // // // // // //             <li><Link to="/home">Home</Link></li>
// // // // // // //             <li><Link to="/gioi-thieucontact">Giới thiệu</Link></li>
// // // // // // //             <li><Link to="/dao-tao">Đào tạo</Link></li>

// // // // // // //             {/* Nếu đã đăng nhập, hiển thị tên người dùng và nút Logout */}
// // // // // // //             {isLoggedIn ? (
// // // // // // //               <>
// // // // // // //                 <li>Xin chào, {userName}</li>
// // // // // // //                 <li><button onClick={onLogout}>Đăng xuất</button></li>
// // // // // // //               </>
// // // // // // //             ) : (
// // // // // // //               <li><Link to="/login">Đăng nhập</Link></li>
// // // // // // //             )}

// // // // // // //             {/* Đường dẫn Đổi mật khẩu */}
// // // // // // //             <li><Link to="/change-password">Đổi mật khẩu</Link></li>
// // // // // // //           </ul>
// // // // // // //         </nav>
// // // // // // //       </div>
// // // // // // //     </header>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default Header;
// // // // // // import React, { useState } from 'react';
// // // // // // import { Link } from 'react-router-dom';

// // // // // // const Header = ({ isLoggedIn, userName, onLogout }) => {
// // // // // //   const [menuOpen, setMenuOpen] = useState(false);

// // // // // //   // Hàm toggle mở/đóng menu
// // // // // //   const toggleMenu = () => {
// // // // // //     setMenuOpen(!menuOpen);
// // // // // //   };

// // // // // //   return (
// // // // // //     <header className="bg-blue-600 text-white p-4">
// // // // // //       <div className="container mx-auto flex justify-between items-center">
// // // // // //         {/* Logo */}
// // // // // //         <h1 className="text-2xl font-bold">Trường Đại học Công Thương</h1>

// // // // // //         {/* Nút mở menu */}
// // // // // //         <button 
// // // // // //           className="text-white lg:hidden" 
// // // // // //           onClick={toggleMenu}
// // // // // //         >
// // // // // //           <span className="material-icons">menu</span>
// // // // // //         </button>

// // // // // //         {/* Menu điều hướng */}
// // // // // //         <nav className={`${menuOpen ? 'block' : 'hidden'} lg:block`}>
// // // // // //           <ul className="flex space-x-4">
// // // // // //             <li><Link to="/home">Home</Link></li>
// // // // // //             <li><Link to="/gioi-thieucontact">Giới thiệu</Link></li>
// // // // // //             <li><Link to="/dao-tao">Đào tạo</Link></li>

// // // // // //             {/* Nếu đã đăng nhập, hiển thị tên người dùng và nút Logout */}
// // // // // //             {isLoggedIn ? (
// // // // // //               <>
// // // // // //                 <li>Xin chào, {userName}</li>
// // // // // //                 <li><button onClick={onLogout}>Đăng xuất</button></li>
// // // // // //               </>
// // // // // //             ) : (
// // // // // //               <li><Link to="/login">Đăng nhập</Link></li>
// // // // // //             )}

// // // // // //             {/* Đường dẫn Đổi mật khẩu */}
// // // // // //             <li><Link to="/change-password">Đổi mật khẩu</Link></li>
// // // // // //           </ul>
// // // // // //         </nav>
// // // // // //       </div>
// // // // // //     </header>
// // // // // //   );
// // // // // // };

// // // // // // // export default Header;
// // // // // // import React from 'react';
// // // // // // import { Link } from 'react-router-dom';

// // // // // // const Header = ({ isLoggedIn, userName, onLogout }) => {
// // // // // //   return (
  
// // // // // //     <header className="bg-blue-600 text-white p-4">
      
// // // // // //       <div className="container mx-auto flex justify-between items-center">
// // // // // //         <h1 className="text-2xl font-bold">Trường Đại học Công Thương</h1>
// // // // // //         <nav>
// // // // // //           <ul className="flex space-x-4">
// // // // // //             <li><Link to="/home">Home</Link></li>
// // // // // //             <li><Link to="/gioi-thieucontact">Giới thiệu</Link></li>
// // // // // //             <li><Link to="/dao-tao">Đào tạo</Link></li>
// // // // // //             {/* Nếu đã đăng nhập, hiển thị tên người dùng và nút Logout */}
// // // // // //             {isLoggedIn ? (
// // // // // //               <>
// // // // // //                 <li>Xin chào, {userName}</li>
// // // // // //                 <li><button onClick={onLogout}>Đăng xuất</button></li>
// // // // // //               </>
// // // // // //             ) : (
// // // // // //               <li><Link to="/login">Đăng nhập</Link></li>
// // // // // //             )}
// // // // // //                  <li><Link to="/change-password">Đổi mật khất</Link></li>
// // // // // //           </ul>
// // // // // //         </nav>
// // // // // //       </div>
// // // // // //     </header>
// // // // // //   );
// // // // // // };

// // // // // // export default Header;

// // // // // import { Link } from "react-router-dom";

// // // // // const Header = ({ onOpenSidebar, isLoggedIn, userName, onLogout }) => {
// // // // //   return (
// // // // //     <header className="bg-blue-600 text-white p-4 flex items-center justify-between max-w-full">
// // // // //       <button onClick={onOpenSidebar} className="text-white text-2xl">
// // // // //         <span className="material-icons">Menu</span>
// // // // //       </button>
// // // // //       <h1 className="text-2xl font-semibold">Quản Lý Hóa Chất</h1>
// // // // //       <div className="flex space-x-4">
// // // // //         {isLoggedIn ? (
// // // // //           <>
// // // // //             <span className="text-white text-lg">Xin chào, {userName}!</span>
// // // // //             <button onClick={onLogout} className="text-white hover:text-gray-200 text-lg">
// // // // //               Đăng Xuất
// // // // //             </button>
// // // // //           </>
// // // // //         ) : (
// // // // //           <Link to="/login" className="text-white hover:text-gray-200 text-lg">
// // // // //             Đăng Nhập
// // // // //           </Link>
// // // // //         )}
// // // // //         <Link to="/change-password" className="text-white hover:text-gray-200 text-lg">
// // // // //           Đổi Mật Khẩu
// // // // //         </Link>
// // // // //       </div>
// // // // //     </header>
// // // // //   );
// // // // // };

// // // // // export default Header;
// // // // import { Link } from "react-router-dom";
// // // // import { useState } from "react";

// // // // const Header = ({ onOpenSidebar, isLoggedIn, userName, onLogout }) => {
// // // //   const [menuOpen, setMenuOpen] = useState(false); // Quản lý trạng thái mở/đóng menu

// // // //   // Hàm toggle menu
// // // //   const toggleMenu = () => {
// // // //     setMenuOpen(!menuOpen);
// // // //   };

// // // //   return (
// // // //     <header className="bg-blue-600 text-white p-4 flex items-center justify-between max-w-full">
// // // //       {/* Nút mở sidebar */}
// // // //       <button onClick={onOpenSidebar} className="text-white text-2xl lg:hidden">
// // // //         <span className="material-icons">menu</span>
// // // //       </button>

// // // //       {/* Tiêu đề */}
// // // //       <h1 className="text-2xl font-semibold">Quản Lý Hóa Chất</h1>

// // // //       {/* Nút mở/đóng menu cho màn hình nhỏ */}
// // // //       <button onClick={toggleMenu} className="lg:hidden text-white text-2xl">
// // // //         <span className="material-icons">menu</span>
// // // //       </button>

// // // //       {/* Menu */}
// // // //       <div className={`lg:flex space-x-4 ${menuOpen ? 'block' : 'hidden'} lg:block`}>
// // // //         <ul className="flex space-x-4">
// // // //           <li><Link to="/home" className="text-white hover:text-gray-200 text-lg">Home</Link></li>
// // // //           <li><Link to="/gioi-thieucontact" className="text-white hover:text-gray-200 text-lg">Giới thiệu</Link></li>
// // // //           <li><Link to="/dao-tao" className="text-white hover:text-gray-200 text-lg">Đào tạo</Link></li>

// // // //           {/* Nếu đã đăng nhập, hiển thị tên người dùng và nút Logout */}
// // // //           {isLoggedIn ? (
// // // //             <>
// // // //               <span className="text-white text-lg">Xin chào, {userName}!</span>
// // // //               <li><button onClick={onLogout} className="text-white hover:text-gray-200 text-lg">Đăng xuất</button></li>
// // // //             </>
// // // //           ) : (
// // // //             <li><Link to="/login" className="text-white hover:text-gray-200 text-lg">Đăng nhập</Link></li>
// // // //           )}
// // // //           <li><Link to="/change-password" className="text-white hover:text-gray-200 text-lg">Đổi mật khẩu</Link></li>
// // // //         </ul>
// // // //       </div>
// // // //     </header>
// // // //   );
// // // // };

// // // // export default Header;
// // // import { useState } from 'react';
// // // import { Link } from 'react-router-dom';

// // // const Header = ({ isLoggedIn, userName, onLogout }) => {
// // //   const [menuOpen, setMenuOpen] = useState(false); // Quản lý trạng thái mở/đóng menu

// // //   // Hàm toggle menu
// // //   const toggleMenu = () => {
// // //     setMenuOpen(!menuOpen);
// // //   };

// // //   return (
// // //     <header className="bg-blue-600 text-white p-4 flex items-center justify-between max-w-full">
// // //       {/* Nút mở sidebar */}
// // //       <button onClick={toggleMenu} className="lg:hidden text-white text-2xl">
// // //         <span className="material-icons">menu</span>
// // //       </button>

// // //       {/* Tiêu đề */}
// // //       <h1 className="text-2xl font-semibold">Trường Đại học Công Thương</h1>

// // //       {/* Menu */}
// // //       <div className={`lg:flex space-x-4 ${menuOpen ? 'block' : 'hidden'} lg:block`}>
// // //         <ul className="flex space-x-4">
// // //           <li><Link to="/home" className="text-white hover:text-gray-200 text-lg">Home</Link></li>
// // //           <li><Link to="/gioi-thieucontact" className="text-white hover:text-gray-200 text-lg">Giới thiệu</Link></li>
// // //           <li><Link to="/dao-tao" className="text-white hover:text-gray-200 text-lg">Đào tạo</Link></li>

// // //           {/* Nếu đã đăng nhập, hiển thị tên người dùng và nút Logout */}
// // //           {isLoggedIn ? (
// // //             <>
// // //               <span className="text-white text-lg">Xin chào, {userName}!</span>
// // //               <li><button onClick={onLogout} className="text-white hover:text-gray-200 text-lg">Đăng xuất</button></li>
// // //             </>
// // //           ) : (
// // //             <li><Link to="/login" className="text-white hover:text-gray-200 text-lg">Đăng nhập</Link></li>
// // //           )}
// // //           <li><Link to="/change-password" className="text-white hover:text-gray-200 text-lg">Đổi mật khẩu</Link></li>
// // //         </ul>
// // //       </div>
// // //     </header>
// // //   );
// // // };

// // // export default Header;

// // import { useState } from 'react';
// // import { Link } from 'react-router-dom';

// // const Header = ({ isLoggedIn, userName, onLogout }) => {
// //   const [menuOpen, setMenuOpen] = useState(false); // Quản lý trạng thái menu (hiện/ẩn)

// //   // Toggle trạng thái của menu khi nhấn hamburger
// //   const toggleMenu = () => {
// //     setMenuOpen(!menuOpen);
// //   };

// //   return (
// //     <header className="bg-blue-600 text-white p-4 flex items-center justify-between">
// //       {/* Nút hamburger cho màn hình nhỏ */}
// //       <button onClick={toggleMenu} className="lg:hidden text-white text-2xl">
// //         <span className="material-icons">menu</span>
// //       </button>

// //       {/* Tiêu đề */}
// //       <h1 className="text-2xl font-semibold">Trường Đại học Công Thương</h1>

// //       {/* Menu */}
// //       <div className={`lg:flex space-x-4 ${menuOpen ? 'block' : 'hidden'} lg:block`}>
// //         <ul className="flex space-x-4">
// //           <li><Link to="/home" className="text-white hover:text-gray-200 text-lg">Home</Link></li>
// //           <li><Link to="/gioi-thieucontact" className="text-white hover:text-gray-200 text-lg">Giới thiệu</Link></li>
// //           <li><Link to="/dao-tao" className="text-white hover:text-gray-200 text-lg">Đào tạo</Link></li>

// //           {/* Nếu đã đăng nhập, hiển thị tên người dùng và nút Logout */}
// //           {isLoggedIn ? (
// //             <>
// //               <span className="text-white text-lg">Xin chào, {userName}!</span>
// //               <li><button onClick={onLogout} className="text-white hover:text-gray-200 text-lg">Đăng xuất</button></li>
// //             </>
// //           ) : (
// //             <li><Link to="/login" className="text-white hover:text-gray-200 text-lg">Đăng nhập</Link></li>
// //           )}

// //           {/* Đổi mật khẩu */}
// //           <li><Link to="/change-password" className="text-white hover:text-gray-200 text-lg">Đổi mật khẩu</Link></li>
// //         </ul>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Header;
// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Header = ({ isLoggedIn, userName, onLogout, onOpenSidebar }) => {
//   const [menuOpen, setMenuOpen] = useState(false); // Quản lý trạng thái menu (hiện/ẩn)

//   // Toggle trạng thái của menu khi nhấn hamburger
//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   return (
//     <header className="bg-blue-600 text-white p-4 flex items-center justify-between">
//       {/* Nút hamburger cho màn hình nhỏ */}
//       <button 
//         onClick={toggleMenu} 
//         className="lg:hidden text-white text-2xl"
//       >
//         <span className="material-icons">menu</span>
//       </button>

//       {/* Tiêu đề */}
//       <h1 className="text-2xl font-semibold">Trường Đại học Công Thương</h1>

//       {/* Menu */}
//       <div className={`lg:flex space-x-4 ${menuOpen ? 'block' : 'hidden'} lg:block`}>
//         <ul className="flex space-x-4">
//           <li><Link to="/home" className="text-white hover:text-gray-200 text-lg">Home</Link></li>
//           <li><Link to="/gioi-thieucontact" className="text-white hover:text-gray-200 text-lg">Giới thiệu</Link></li>
//           <li><Link to="/dao-tao" className="text-white hover:text-gray-200 text-lg">Đào tạo</Link></li>

//           {/* Nếu đã đăng nhập, hiển thị tên người dùng và nút Logout */}
//           {isLoggedIn ? (
//             <>
//               <span className="text-white text-lg">Xin chào, {userName}!</span>
//               <li><button onClick={onLogout} className="text-white hover:text-gray-200 text-lg">Đăng xuất</button></li>
//             </>
//           ) : (
//             <li><Link to="/login" className="text-white hover:text-gray-200 text-lg">Đăng nhập</Link></li>
//           )}

//           {/* Đổi mật khẩu */}
//           <li><Link to="/change-password" className="text-white hover:text-gray-200 text-lg">Đổi mật khẩu</Link></li>
//         </ul>
//       </div>

//       {/* Nút mở Sidebar */}
//       <button 
//         onClick={onOpenSidebar} 
//         className="lg:hidden text-white text-xl"
//       >
//         <span className="material-icons">menu</span>
//       </button>
//     </header>
//   );
// };

// export default Header;
import { Link } from "react-router-dom";

const Header = ({ onOpenSidebar, isLoggedIn, userName, onLogout }) => {
  return (
    <header className="bg-blue-600 text-white p-4 flex items-center justify-between max-w-full">
      <button onClick={onOpenSidebar} className="text-white text-2xl">
        <span className="material-icons">Menu</span>
      </button>
      <h1 className="text-2xl font-semibold">Quản Lý Hóa Chất</h1>
      <div className="flex space-x-4">
        {isLoggedIn ? (
          <>
            <span className="text-white text-lg">Xin chào, {userName}!</span>
            <button onClick={onLogout} className="text-white hover:text-gray-200 text-lg">
              Đăng Xuất
            </button>
          </>
        ) : (
          <Link to="/login" className="text-white hover:text-gray-200 text-lg">
            Đăng Nhập
          </Link>
        )}
        <Link to="/change-password" className="text-white hover:text-gray-200 text-lg">
          Đổi Mật Khẩu
        </Link>
        {/* Thêm các trang khác tại đây */}
        <Link to="/home" className="text-white hover:text-gray-200 text-lg">
          Trang Chủ
        </Link>
        <Link to="/gioi-thieucontact" className="text-white hover:text-gray-200 text-lg">
          Giới Thiệu
        </Link>
        <Link to="/nganh-dao-tao" className="text-white hover:text-gray-200 text-lg">
          Ngành Đào Tạo
        </Link>
        <Link to="/dao-tao" className="text-white hover:text-gray-200 text-lg">
          Đào Tạo
        </Link>
        <Link
            to="/user-management"
            className="text-white hover:text-gray-200 text-lg"
          >
            Quản Trị Người Dùng
          </Link>
      </div>
    </header>
  );
};

export default Header;
