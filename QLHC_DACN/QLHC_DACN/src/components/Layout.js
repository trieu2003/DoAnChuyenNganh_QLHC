import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useState } from 'react';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header onOpenSidebar={toggleSidebar} />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar open={isSidebarOpen} onClose={toggleSidebar} />
        <main className="flex-grow p-6 md:p-10 lg:p-12 max-w-full">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
