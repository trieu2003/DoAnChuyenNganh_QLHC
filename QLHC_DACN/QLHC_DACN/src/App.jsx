import  { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Home from './pages/Home'; // Giả sử bạn có trang Home
import Login from './pages/Login'; // Giả sử bạn có trang Login
import SignUp from './pages/SignUp'; // Thêm dòng này
import ChangePassword from "./pages/ChangePassword"; // Thêm route này

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      <Header onOpenSidebar={handleOpenSidebar} />
      <Sidebar open={sidebarOpen} onClose={handleCloseSidebar} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* Thêm các route khác tại đây */}
          <Route path="/register" element={<SignUp />} /> {/* Thêm route này */}
          <Route path="/change-password" element={<ChangePassword />} /> {/* Route mới */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
