// export default App;
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./NguoiDung/Login";
import SignUp from "./NguoiDung/SignUp";
import ChangePassword from "./NguoiDung/ChangePassword";
// import Admin from './admin/Admin';
import GioiThieu from "./components/gioithieutrangchu";
import GioiThieuContact from "./components/gioi-thieucontact";
import DaoTao from "./components/dao-tao";
import NganhDaoTao from "./components/nganh-dao-tao";
import CRUDUser from "./pages/CRUDUser";
// import CRUDRole from 'admin/CRUDUser';
import ChemicalManagement from "./pages/ChemicalManagement";
import InventoryManagement from "./pages/InventoryManagement";
import ChemicalUsageManagement from "./pages/ChemicalUsageManagement";

import DashboardPhieuThanhLy from "./pages/DashboardPhieuThanhLy";
import DashboardThongKe from "./pages/DashboardThongKe";
import Admin from "./admin/Admin";
import ChemicalForecasting from "./pages/ChemicalForecasting";
import ChemicalForecastingAdd from "./pages/ChemicalForecasting_Add";
import ChemicalForecastingDetail from "./pages/ChemicalForecasting_Detail";
import DuyetChemicalForecasting from "./pages/DuyetChemicalForecasting";
import DuTruDetails from "./components/DuTruDetails";
import PurchaseRequest from "./pages/PurchaseRequest";
import PurchaseRequestDetails from "./components/DeXuatDetails";
import PurchaseRequestAdd from "./pages/PurchaseRequest_Add";
import PurchaseRequestEdit from "./pages/PurchaseRequest_Edit";
import DuyetPurchaseRequest from "./admin/DuyetPhieuDX";
import LichSuDX from "./admin/history";
import LichSuDuTru from "./pages/HistoryDuyetDuTru";
import CreatePhieuThanhLyForm from "./components/CreatePhieuThanhLyForm";
import PrivateRoute from "./components/PrivateRoute";
import ExportExcel from "./pages/ExportExcel";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("tenDangNhap") || ""
  );
  const [sidebarOpen, setSidebarOpen] = useState(false); // Trạng thái Sidebar
  const [maNguoiDung, setMaNguoiDung] = useState(
    localStorage.getItem("maNguoiDung") || ""
  ); // Thêm state để lưu mã người dùng

  const handleLogin = (userName) => {
    setUserName(userName);
    setMaNguoiDung(maNguoiDung); // Lưu mã người dùng
    setIsLoggedIn(true);
    localStorage.setItem("tenDangNhap", userName);
    localStorage.setItem("isLoggedIn", "true");
  };

  const onLogout = () => {
    setUserName("");
    setMaNguoiDung(""); // Xóa mã người dùng khi đăng xuất
    setIsLoggedIn(false);
    localStorage.removeItem("tenDangNhap");
    localStorage.removeItem("maNguoiDung"); // Xóa mã người dùng khỏi localStorage
    localStorage.removeItem("isLoggedIn");
  };
  const handleLogout = () => {
    // Hiển thị hộp thoại xác nhận đăng xuất
    const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (confirmLogout) {
      onLogout(); // Nếu người dùng chọn "Ok", gọi hàm onLogout để thực hiện đăng xuất
    }
  };
  useEffect(() => {
    const loggedInUser = localStorage.getItem("tenDangNhap");
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    const loggedInMaNguoiDung = localStorage.getItem("maNguoiDung"); // Lấy mã người dùng từ localStorage
    if (loggedInUser && loggedInStatus) {
      setUserName(loggedInUser);
      setMaNguoiDung(loggedInMaNguoiDung); // Cập nhật mã người dùng
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
        userId={maNguoiDung}
        onOpenSidebar={handleOpenSidebar} // Gọi hàm mở sidebar
      />
      <Sidebar open={sidebarOpen} onClose={handleCloseSidebar} />{" "}
      {/* Hiển thị Sidebar khi mở */}
      <main>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<SignUp />} />
          <Route
            path="/*"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Routes>
                  <Route path="/" element={<GioiThieu />} />
                  <Route path="/home" element={<Home />} />
                  {/* <Route path="/admin" element={isLoggedIn ? <Admin /> : <Navigate to="/login" />} /> */}
                  <Route
                    path="/gioi-thieucontact"
                    element={<GioiThieuContact />}
                  />
                  <Route path="/nganh-dao-tao" element={<NganhDaoTao />} />
                  <Route path="/dao-tao" element={<DaoTao />} />
                  <Route
                    path="/change-password"
                    element={
                      isLoggedIn ? <ChangePassword /> : <Navigate to="/login" />
                    }
                  />
                  <Route path="/user-management" element={<CRUDUser />} />
                  {/* <Route path="/role-management" element={<CRUDRole />} /> */}
                  <Route
                    path="/ChemicalManagement"
                    element={<ChemicalManagement />}
                  />
                  <Route
                    path="/inventory-management"
                    element={<InventoryManagement />}
                  />
                  <Route
                    path="/chemical-usage"
                    element={<ChemicalUsageManagement />}
                  />
                  {/* Đề xuất mua hoá chất */}
                  <Route
                    path="/purchase-request"
                    element={<PurchaseRequest />}
                  />
                  <Route
                    path="/purchase-request/details/:maPhieuDX"
                    element={<PurchaseRequestDetails />}
                  />
                  <Route
                    path="/purchase-request/add"
                    element={<PurchaseRequestAdd />}
                  />
                  <Route
                    path="/purchase-request/edit/:maPhieuDX"
                    element={<PurchaseRequestEdit></PurchaseRequestEdit>}
                  />
                  <Route
                    path="/duyet-purchase-request"
                    element={<DuyetPurchaseRequest></DuyetPurchaseRequest>}
                  />
                  <Route
                    path="/duyet-purchase-request/history-purchase-request/:maPhieuDX"
                    element={<LichSuDX></LichSuDX>}
                  />

                  <Route
                    path="/phieu-thanh-ly"
                    element={<DashboardPhieuThanhLy />}
                  />
                  <Route
                    path="/tao-phieu-thanh-ly"
                    element={<CreatePhieuThanhLyForm />}
                  />
                  <Route path="/thong-ke" element={<DashboardThongKe />} />

                  <Route path="/export-excel" element={<ExportExcel />} />

                  {/* Dự Trù Hóa Chất */}
                  <Route
                    path="/chemical-forecasting"
                    element={<ChemicalForecasting />}
                  />
                  <Route
                    path="/chemical-forecasting/add/:selectedMaMon"
                    element={<ChemicalForecastingAdd />}
                  />
                  <Route
                    path="/chemical-forecasting/details/:selectedMaMon"
                    element={<ChemicalForecastingDetail />}
                  />
                  <Route
                    path="/duyet-chemical-forecasting"
                    element={<DuyetChemicalForecasting />}
                  />
                  <Route
                    path="/duyet-chemical-forecasting/details/:maBaiTN"
                    element={<DuTruDetails />}
                  />
                  <Route
                    path="/duyet-chemical-forecasting/history/:maBaiTN"
                    element={<LichSuDuTru />}
                  />
                  <Route path="/admin" element={<Admin />} />
                </Routes>
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
