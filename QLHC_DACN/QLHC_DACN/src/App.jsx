// // // // // // // import { useState } from 'react';
// // // // // // // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // // // // // // import Header from './components/Header';
// // // // // // // import Footer from './components/Footer';
// // // // // // // import Sidebar from './components/Sidebar';
// // // // // // // import Home from './pages/Home'; // Giả sử bạn có trang Home
// // // // // // // import Login from './NguoiDung/Login'; // Giả sử bạn có trang Login
// // // // // // // import SignUp from './NguoiDung/SignUp'; // Thêm dòng này
// // // // // // // import ChangePassword from "./NguoiDung/ChangePassword"; // Thêm route này

// // // // // // // const App = () => {
// // // // // // //   const [sidebarOpen, setSidebarOpen] = useState(false);
// // // // // // //   const [userName, setUserName] = useState(""); // State lưu tên người dùng
// // // // // // //   const [isLoggedIn, setIsLoggedIn] = useState(false); // State kiểm tra đăng nhập

// // // // // // //   const handleOpenSidebar = () => {
// // // // // // //     setSidebarOpen(true);
// // // // // // //   };

// // // // // // //   const handleCloseSidebar = () => {
// // // // // // //     setSidebarOpen(false);
// // // // // // //   };

// // // // // // //   const handleLogin = (name) => {
// // // // // // //     setUserName(name); // Lưu tên người dùng
// // // // // // //     setIsLoggedIn(true); // Đánh dấu là đã đăng nhập
// // // // // // //   };

// // // // // // //   const handleLogout = () => {
// // // // // // //     setUserName(""); // Đặt lại tên người dùng
// // // // // // //     setIsLoggedIn(false); // Đánh dấu là chưa đăng nhập
// // // // // // //   };
  

// // // // // // //   return (
// // // // // // //     <Router>
// // // // // // //       <Header 
// // // // // // //         onOpenSidebar={handleOpenSidebar} 
// // // // // // //         isLoggedIn={isLoggedIn} 
// // // // // // //         userName={userName} 
// // // // // // //         onLogout={handleLogout} 
// // // // // // //       />
// // // // // // //       <Sidebar open={sidebarOpen} onClose={handleCloseSidebar} />
// // // // // // //       <main>
// // // // // // //         <Routes>
// // // // // // //           <Route path="/" element={<Home />} />
// // // // // // //           <Route path="/login" element={<Login onLogin={handleLogin} />} />
// // // // // // //           <Route path="/register" element={<SignUp />} />
// // // // // // //           <Route path="/change-password" element={<ChangePassword />} />
// // // // // // //         </Routes>
// // // // // // //       </main>
// // // // // // //       <Footer />
// // // // // // //     </Router>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default App;
// // // // // // import { useState } from 'react';
// // // // // // import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// // // // // // import Header from './components/Header';
// // // // // // import Footer from './components/Footer';
// // // // // // import Sidebar from './components/Sidebar';
// // // // // // import Home from './pages/Home';
// // // // // // import Login from './NguoiDung/Login';
// // // // // // import SignUp from './NguoiDung/SignUp';
// // // // // // import ChangePassword from "./NguoiDung/ChangePassword";
// // // // // // import Admin from "./pagesadmin/Admin" ;

// // // // // // const App = () => {
// // // // // //   const [sidebarOpen, setSidebarOpen] = useState(false);
// // // // // //   const [userName, setUserName] = useState("");
// // // // // //   const [isLoggedIn, setIsLoggedIn] = useState(false);

// // // // // //   const handleOpenSidebar = () => {
// // // // // //     setSidebarOpen(true);
// // // // // //   };

// // // // // //   const handleCloseSidebar = () => {
// // // // // //     setSidebarOpen(false);
// // // // // //   };

// // // // // //   const handleLogin = (userName) => {
// // // // // //     setUserName(userName);
// // // // // //     setIsLoggedIn(true);
// // // // // //   };

// // // // // //   const handleLogout = () => {
// // // // // //     setUserName("");
// // // // // //     setIsLoggedIn(false);
// // // // // //   };


  
// // // // // //   return (
// // // // // //     <Router>
// // // // // //       <Header 
// // // // // //         onOpenSidebar={handleOpenSidebar} 
// // // // // //         isLoggedIn={isLoggedIn} 
// // // // // //         userName={userName} 
// // // // // //         onLogout={handleLogout} 
// // // // // //       />
// // // // // //       <Sidebar open={sidebarOpen} onClose={handleCloseSidebar} />
// // // // // //       <main>
// // // // // //         <Routes>
// // // // // //           <Route path="/Home" element={<Home />} />
// // // // // //           <Route path="/login" element={<Login onLogin={handleLogin} />} />
// // // // // //           <Route path="/register" element={<SignUp />} />
// // // // // //           <Route path="/admin" element={<Admin />} />
          
// // // // // //           <Route 
// // // // // //             path="/change-password" 
// // // // // //             element={
// // // // // //               isLoggedIn ? <ChangePassword /> : <Navigate to="/login" />
// // // // // //             } 
// // // // // //           />
// // // // // //         </Routes>
// // // // // //       </main>
// // // // // //       <Footer />
// // // // // //     </Router>
// // // // // //   );
// // // // // // };


// // // // // import { useState, useEffect } from 'react';
// // // // // import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// // // // // import Header from './components/Header';
// // // // // import Footer from './components/Footer';
// // // // // import Sidebar from './components/Sidebar';
// // // // // import Home from './pages/Home';
// // // // // import Login from './NguoiDung/Login';
// // // // // import SignUp from './NguoiDung/SignUp';
// // // // // import ChangePassword from './NguoiDung/ChangePassword';
// // // // // import Admin from './pagesadmin/Admin';
// // // // // import GioiThieucontact from './components/gioi-thieucontact'; 
// // // // // import DaoTao from './components/dao-tao';
// // // // // import NganhDaoTao from './components/nganh-dao-tao'; 
// // // // // import GioiThieu from './components/gioithieutrangchu';



// // // // // const App = () => {
// // // // //   const [sidebarOpen, setSidebarOpen] = useState(false);
// // // // //   const [userName, setUserName] = useState(localStorage.getItem('tenDangNhap') || ''); // Lấy tên người dùng từ localStorage
// // // // //   const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true'); // Kiểm tra trạng thái đăng nhập từ localStorage

// // // // //   const handleOpenSidebar = () => {
// // // // //     setSidebarOpen(true);
// // // // //   };

// // // // //   const handleCloseSidebar = () => {
// // // // //     setSidebarOpen(false);
// // // // //   };

// // // // //   const handleLogin = (userName) => {
// // // // //     setUserName(userName);
// // // // //     setIsLoggedIn(true);
// // // // //     localStorage.setItem('tenDangNhap', userName); // Lưu tên người dùng vào localStorage
// // // // //     localStorage.setItem('isLoggedIn', 'true'); // Lưu trạng thái đăng nhập vào localStorage
// // // // //   };

// // // // //   const handleLogout = () => {
// // // // //     setUserName('');
// // // // //     setIsLoggedIn(false);
// // // // //     localStorage.removeItem('tenDangNhap'); // Xóa tên người dùng khỏi localStorage
// // // // //     localStorage.removeItem('isLoggedIn'); // Xóa trạng thái đăng nhập khỏi localStorage
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     // Khi trang được tải lại, kiểm tra lại trạng thái đăng nhập
// // // // //     const loggedInUser = localStorage.getItem('tenDangNhap');
// // // // //     const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
// // // // //     if (loggedInUser && loggedInStatus) {
// // // // //       setUserName(loggedInUser);
// // // // //       setIsLoggedIn(true);
// // // // //     }
// // // // //   }, []);

// // // // //   return (
  
// // // // //     <Router>
// // // // //       <Header
// // // // //         onOpenSidebar={handleOpenSidebar}
// // // // //         isLoggedIn={isLoggedIn}
// // // // //         userName={userName}
// // // // //         onLogout={handleLogout}
// // // // //       />
// // // // //       <Sidebar open={sidebarOpen} onClose={handleCloseSidebar} />
    
// // // // //       <main>
      
// // // // //         <Routes>
// // // // //                   {/* Trang mặc định chuyển hướng tới Home */}
// // // // //                   <Route path="/" element={<GioiThieu} />
// // // // //           <Route path="/home" element={<Home />} />
// // // // //           <Route path="/login" element={<Login onLogin={handleLogin} />} />
// // // // //           <Route path="/register" element={<SignUp />} />
// // // // //           <Route path="/admin" element={isLoggedIn ? <Admin /> : <Navigate to="/login" />} />
// // // // //           <Route path="/gioi-thieucontact" element={<GioiThieucontact />} />
// // // // //           <Route path="/nganh-dao-tao" element={<NganhDaoTao />} />
// // // // //           <Route path="/dao-tao" element={<DaoTao />} />
// // // // //           <Route
// // // // //             path="/change-password"
// // // // //             element={isLoggedIn ? <ChangePassword /> : <Navigate to="/login" />}
// // // // //           />
// // // // //           {/* Nếu người dùng không đăng nhập, sẽ chuyển hướng về trang login */}
// // // // //         </Routes>
// // // // //       </main>
// // // // //       <Footer />
// // // // //     </Router>
// // // // //   );
// // // // // };

// // // // // export default App;
// // // // import { useState, useEffect } from 'react';
// // // // import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
// // // // import Header from './components/Header';
// // // // import Footer from './components/Footer';
// // // // import Sidebar from './components/Sidebar';
// // // // import Home from './pages/Home';
// // // // import Login from './NguoiDung/Login';
// // // // import SignUp from './NguoiDung/SignUp';
// // // // import ChangePassword from './NguoiDung/ChangePassword';
// // // // import Admin from './pagesadmin/Admin';
// // // // import GioiThieu from './components/gioithieutrangchu'; 
// // // // import GioiThieuContact from './components/gioi-thieucontact';
// // // // import DaoTao from './components/dao-tao';
// // // // import NganhDaoTao from './components/nganh-dao-tao';

// // // // const AppContent = () => {
// // // //   const location = useLocation();
// // // //   const isGioiThieuPage = location.pathname === '/';

// // // //   return (
// // // //     <>
// // // //       {/* Hiển thị Header và Sidebar nếu không phải trang giới thiệu */}
// // // //       {!isGioiThieuPage && (
// // // //         <>
// // // //           <Header />
// // // //           <Sidebar />
// // // //         </>
// // // //       )}

// // // //       <main className="flex-grow">
// // // //         <Routes>
// // // //           {/* Trang mặc định là Giới thiệu */}
// // // //           <Route path="/" element={<GioiThieu />} />
// // // //           <Route path="/home" element={<Home />} />
// // // //           <Route path="/login" element={<Login />} />
// // // //           <Route path="/register" element={<SignUp />} />
// // // //           <Route path="/admin" element={<Admin />} />
// // // //           <Route path="/gioi-thieucontact" element={<GioiThieuContact />} />
// // // //           <Route path="/nganh-dao-tao" element={<NganhDaoTao />} />
// // // //           <Route path="/dao-tao" element={<DaoTao />} />
// // // //           <Route path="/change-password" element={<ChangePassword />} />
// // // //         </Routes>
// // // //       </main>

// // // //       {/* Hiển thị Footer nếu không phải trang giới thiệu */}
// // // //       {!isGioiThieuPage && <Footer />}
// // // //     </>
// // // //   );
// // // // };

// // // // const App = () => {
// // // //   return (
// // // //     <Router>
// // // //       <AppContent />
// // // //     </Router>
// // // //   );
// // // // };

// // // // export default App;
// // // import { useState, useEffect } from 'react';
// // // import { BrowserRouter as Router } from 'react-router-dom';


// // // import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
// // // import Header from './components/Header';
// // // import Footer from './components/Footer';
// // // import Sidebar from './components/Sidebar';
// // // import Home from './pages/Home';
// // // import Login from './NguoiDung/Login';
// // // import SignUp from './NguoiDung/SignUp';
// // // import ChangePassword from './NguoiDung/ChangePassword';
// // // import Admin from './pagesadmin/Admin';
// // // import GioiThieu from './components/gioithieutrangchu'; 
// // // import GioiThieuContact from './components/gioi-thieucontact';
// // // import DaoTao from './components/dao-tao';
// // // import NganhDaoTao from './components/nganh-dao-tao';

// // // const AppContent = ({ isLoggedIn, userName, onLogin, onLogout }) => {
// // //   const location = useLocation();
// // //   const isGioiThieuPage = location.pathname === '/';

// // //   return (
// // //     <>
// // //       {/* Hiển thị Header và Sidebar nếu không phải trang giới thiệu */}
// // //       {!isGioiThieuPage && (
// // //         <>
// // //           <Header onLogout={onLogout} isLoggedIn={isLoggedIn} userName={userName} />
// // //           <Sidebar />
// // //         </>
// // //       )}

// // //       <main className="flex-grow">
// // //         <Routes>
// // //           {/* Trang mặc định là Giới thiệu */}
// // //           <Route path="/" element={<GioiThieu />} />
// // //           <Route path="/home" element={<Home />} />
// // //           <Route path="/login" element={<Login onLogin={onLogin} />} />
// // //           <Route path="/register" element={<SignUp />} />
// // //           <Route path="/admin" element={isLoggedIn ? <Admin /> : <Navigate to="/login" />} />
// // //           <Route path="/gioi-thieucontact" element={<GioiThieuContact />} />
// // //           <Route path="/nganh-dao-tao" element={<NganhDaoTao />} />
// // //           <Route path="/dao-tao" element={<DaoTao />} />
// // //           <Route path="/change-password" element={isLoggedIn ? <ChangePassword /> : <Navigate to="/login" />} />
// // //         </Routes>
// // //       </main>

// // //       {/* Hiển thị Footer nếu không phải trang giới thiệu */}
// // //       {!isGioiThieuPage && <Footer />}
// // //     </>
// // //   );
// // // };

// // // const App = () => {
// // //     const [sidebarOpen, setSidebarOpen] = useState(false);
// // //   const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
// // //   const [userName, setUserName] = useState(localStorage.getItem('tenDangNhap') || ''); // Lấy tên người dùng từ localStorage

// // //     const handleOpenSidebar = () => {
// // //     setSidebarOpen(true);
// // //   };

// // //   const handleCloseSidebar = () => {
// // //     setSidebarOpen(false);
// // //   };
// // //   const handleLogin = (userName) => {
// // //     setUserName(userName);
// // //     setIsLoggedIn(true);
// // //     localStorage.setItem('tenDangNhap', userName); // Lưu tên người dùng vào localStorage
// // //     localStorage.setItem('isLoggedIn', 'true'); // Lưu trạng thái đăng nhập vào localStorage
// // //   };

// // //   const handleLogout = () => {
// // //     setUserName('');
// // //     setIsLoggedIn(false);
// // //     localStorage.removeItem('tenDangNhap'); // Xóa tên người dùng khỏi localStorage
// // //     localStorage.removeItem('isLoggedIn'); // Xóa trạng thái đăng nhập khỏi localStorage
// // //   };

// // //   useEffect(() => {
// // //     // Kiểm tra lại trạng thái đăng nhập khi tải lại trang
// // //     const loggedInUser = localStorage.getItem('tenDangNhap');
// // //     const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
// // //     if (loggedInUser && loggedInStatus) {
// // //       setUserName(loggedInUser);
// // //       setIsLoggedIn(true);
// // //     }
// // //   }, []);

// // //   return (
// // //     <Router>
// // //       <AppContent
        
// // //         isLoggedIn={isLoggedIn}
// // //         userName={userName}
// // //         onLogin={handleLogin}
// // //         onLogout={handleLogout}
// // //       />
// // //     </Router>
// // //   );
// // // };

// // // export default App;
// // import { useState, useEffect } from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import Header from './components/Header';
// // import Footer from './components/Footer';
// // import Sidebar from './components/Sidebar';
// // import Home from './pages/Home';
// // import Login from './NguoiDung/Login';
// // import SignUp from './NguoiDung/SignUp';
// // import ChangePassword from './NguoiDung/ChangePassword';
// // import Admin from './pagesadmin/Admin';
// // import GioiThieu from './components/gioithieutrangchu'; 
// // import GioiThieuContact from './components/gioi-thieucontact';
// // import DaoTao from './components/dao-tao';
// // import NganhDaoTao from './components/nganh-dao-tao';

// // const App = () => {
// //   const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
// //   const [userName, setUserName] = useState(localStorage.getItem('tenDangNhap') || ''); 

// //   const handleLogin = (userName) => {
// //     setUserName(userName);
// //     setIsLoggedIn(true);
// //     localStorage.setItem('tenDangNhap', userName); 
// //     localStorage.setItem('isLoggedIn', 'true'); 
// //   };

// //   const handleLogout = () => {
// //     setUserName('');
// //     setIsLoggedIn(false);
// //     localStorage.removeItem('tenDangNhap'); 
// //     localStorage.removeItem('isLoggedIn'); 
// //   };

// //   useEffect(() => {
// //     const loggedInUser = localStorage.getItem('tenDangNhap');
// //     const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
// //     if (loggedInUser && loggedInStatus) {
// //       setUserName(loggedInUser);
// //       setIsLoggedIn(true);
// //     }
// //   }, []);

// //   return (
// //     <Router>
// //       <Header onLogout={handleLogout} isLoggedIn={isLoggedIn} userName={userName} />
// //       <main>
// //         <Routes>
// //           <Route path="/" element={<GioiThieu />} />
// //           <Route path="/home" element={<Home />} />
// //           <Route path="/login" element={<Login onLogin={handleLogin} />} />
// //           <Route path="/register" element={<SignUp />} />
// //           <Route path="/admin" element={isLoggedIn ? <Admin /> : <Navigate to="/login" />} />
// //           <Route path="/gioi-thieucontact" element={<GioiThieuContact />} />
// //           <Route path="/nganh-dao-tao" element={<NganhDaoTao />} />
// //           <Route path="/dao-tao" element={<DaoTao />} />
// //           <Route path="/change-password" element={isLoggedIn ? <ChangePassword /> : <Navigate to="/login" />} />
// //         </Routes>
// //       </main>
// //       <Footer />
// //     </Router>
// //   );
// // };

// // export default App;
// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Sidebar from './components/Sidebar'; // Import Sidebar đúng cách
// import Home from './pages/Home';
// import Login from './NguoiDung/Login';
// import SignUp from './NguoiDung/SignUp';
// import ChangePassword from './NguoiDung/ChangePassword';
// import Admin from './pagesadmin/Admin';
// import GioiThieu from './components/gioithieutrangchu';
// import GioiThieuContact from './components/gioi-thieucontact';
// import DaoTao from './components/dao-tao';
// import NganhDaoTao from './components/nganh-dao-tao';

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
//   const [userName, setUserName] = useState(localStorage.getItem('tenDangNhap') || '');
//   const [sidebarOpen, setSidebarOpen] = useState(false); // Quản lý Sidebar

//   const handleLogin = (userName) => {
//     setUserName(userName);
//     setIsLoggedIn(true);
//     localStorage.setItem('tenDangNhap', userName);
//     localStorage.setItem('isLoggedIn', 'true');
//   };

//   const handleLogout = () => {
//     setUserName('');
//     setIsLoggedIn(false);
//     localStorage.removeItem('tenDangNhap');
//     localStorage.removeItem('isLoggedIn');
//   };

//   useEffect(() => {
//     const loggedInUser = localStorage.getItem('tenDangNhap');
//     const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
//     if (loggedInUser && loggedInStatus) {
//       setUserName(loggedInUser);
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const handleOpenSidebar = () => {
//     setSidebarOpen(true);
//   };

//   const handleCloseSidebar = () => {
//     setSidebarOpen(false);
//   };

//   return (
//     <Router>
//       <Header
//         onLogout={handleLogout}
//         isLoggedIn={isLoggedIn}
//         userName={userName}
//         onOpenSidebar={handleOpenSidebar} // Gọi handle mở sidebar
//       />
//       <Sidebar open={sidebarOpen} onClose={handleCloseSidebar} /> {/* Hiển thị Sidebar khi mở */}
//       <main>
//         <Routes>
//           <Route path="/" element={<GioiThieu />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/login" element={<Login onLogin={handleLogin} />} />
//           <Route path="/register" element={<SignUp />} />
//           <Route path="/admin" element={isLoggedIn ? <Admin /> : <Navigate to="/login" />} />
//           <Route path="/gioi-thieucontact" element={<GioiThieuContact />} />
//           <Route path="/nganh-dao-tao" element={<NganhDaoTao />} />
//           <Route path="/dao-tao" element={<DaoTao />} />
//           <Route path="/change-password" element={isLoggedIn ? <ChangePassword /> : <Navigate to="/login" />} />
//         </Routes>
//       </main>
//       <Footer />
//     </Router>
//   );
// };

// export default App;
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './NguoiDung/Login';
import SignUp from './NguoiDung/SignUp';
import ChangePassword from './NguoiDung/ChangePassword';
// import Admin from './admin/Admin';
import GioiThieu from './components/gioithieutrangchu';
import GioiThieuContact from './components/gioi-thieucontact';
import DaoTao from './components/dao-tao';
import NganhDaoTao from './components/nganh-dao-tao';
import CRUDUser from './pages/CRUDUser';
import ChemicalManagement from './pages/ChemicalManagement';
import InventoryManagement from './pages/InventoryManagement';
import DeXuatForm from './pages/DeXuatSuDungHC';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [userName, setUserName] = useState(localStorage.getItem('tenDangNhap') || '');
  const [sidebarOpen, setSidebarOpen] = useState(false); // Trạng thái Sidebar

  const handleLogin = (userName) => {
    setUserName(userName);
    setIsLoggedIn(true);
    localStorage.setItem('tenDangNhap', userName);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setUserName('');
    setIsLoggedIn(false);
    localStorage.removeItem('tenDangNhap');
    localStorage.removeItem('isLoggedIn');
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem('tenDangNhap');
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedInUser && loggedInStatus) {
      setUserName(loggedInUser);
      setIsLoggedIn(true);
    }
  }, []);

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      <Header
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onOpenSidebar={handleOpenSidebar} // Gọi hàm mở sidebar
      />
      
      <Sidebar open={sidebarOpen} onClose={handleCloseSidebar} /> {/* Hiển thị Sidebar khi mở */}
      
      <main>
        <Routes>
          <Route path="/" element={<GioiThieu />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<SignUp />} />
          {/* <Route path="/admin" element={isLoggedIn ? <Admin /> : <Navigate to="/login" />} /> */}
          <Route path="/gioi-thieucontact" element={<GioiThieuContact />} />
          <Route path="/nganh-dao-tao" element={<NganhDaoTao />} />
          <Route path="/dao-tao" element={<DaoTao />} />
          <Route path="/change-password" element={isLoggedIn ? <ChangePassword /> : <Navigate to="/login" />} />
          <Route path="/user-management" element={<CRUDUser />} />
          <Route path="/chemical-management" element={<ChemicalManagement />} />
          <Route path="/inventory-management" element={<InventoryManagement />} />
          <Route path="/create-dexuat-page" element={<DeXuatForm />} />
          
        </Routes>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
