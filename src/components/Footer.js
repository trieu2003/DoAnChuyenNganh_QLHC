import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        p: 2,
        position: 'relative',
        bottom: 0,
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Typography variant="body1">© 2024 Trường Đại học Công Thương TPHCM</Typography>
      <Typography variant="body2">Tất cả quyền được bảo lưu.</Typography>
    </Box>
  );
};

export default Footer;
