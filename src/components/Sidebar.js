import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const drawerWidth = 240;

const Sidebar = ({ open, onClose }) => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <Box sx={{ textAlign: 'center', padding: 2 }} role="presentation">
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
        <Divider />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Trang Chủ" />
          </ListItem>
          <ListItem button component={Link} to="/chemical-management">
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Quản Lý Hóa Chất" />
          </ListItem>
          <ListItem button component={Link} to="/purchase-request">
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Đề Xuất Mua Hóa Chất" />
          </ListItem>
          <ListItem button component={Link} to="/inventory-management">
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Quản Lý Nhập Hóa Chất" />
          </ListItem>
          <ListItem button component={Link} to="/chemical-forecasting">
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Dự Trù Hóa Chất" />
          </ListItem>
          <ListItem button component={Link} to="/chemical-usage">
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Quản Lý Sử Dụng Hóa Chất" />
          </ListItem>
          <ListItem button component={Link} to="/expired-chemicals">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Thanh Lý Hóa Chất Hết Hạn" />
          </ListItem>
          <ListItem button component={Link} to="/reporting">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Thống Kê & Báo Cáo" />
          </ListItem>
          <ListItem button component={Link} to="/settings">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Cài Đặt" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
