import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const Header = ({ onOpenSidebar }) => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#1976d2' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={onOpenSidebar}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Quản Lý Hóa Chất
        </Typography>
        <ListItem button component={Link} to="./././Login">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Đăng nhập" />
          </ListItem>
        <Button color="inherit">Đăng Xuất</Button>
        <Button color="inherit">Đổi Mật Khẩu</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
