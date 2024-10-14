import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import ChemicalManagement from './pages/ChemicalManagement';
import PurchaseRequest from './pages/PurchaseRequest';
import InventoryManagement from './pages/InventoryManagement';
import ChemicalForecasting from './pages/ChemicalForecasting';
import ChemicalUsageManagement from './pages/ChemicalUsageManagement';
import ExpiredChemicalManagement from './pages/ExpiredChemicalManagement';
import Reporting from './pages/Reporting';
import Settings from './pages/Settings';
import { Container } from '@mui/material';
import Login from './Login';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      <div>
        <Header onOpenSidebar={handleSidebarOpen} />
        <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />

            <Route path="/chemical-management" element={<ChemicalManagement />} />
            <Route path="/purchase-request" element={<PurchaseRequest />} />
            <Route path="/inventory-management" element={<InventoryManagement />} />
            <Route path="/chemical-forecasting" element={<ChemicalForecasting />} />
            <Route path="/chemical-usage" element={<ChemicalUsageManagement />} />
            <Route path="/expired-chemicals" element={<ExpiredChemicalManagement />} />
            <Route path="/reporting" element={<Reporting />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
