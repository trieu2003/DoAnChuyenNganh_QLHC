import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white text-center p-6 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Thông tin liên hệ */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Liên hệ</h3>
          <p>Trường Đại học Công Thương TPHCM</p>
          <p>140 Lê Trọng Tấn, Phường Tây Thạnh, Quận Tân Phú, TPHCM</p>
          <p>Điện thoại: (036) 215 0064</p>
          <p>Email: huynhthanhtrieu@gmail.com.vn</p>
        </div>

        {/* Liên kết nhanh */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Liên kết nhanh</h3>
          <ul className="space-y-2">
            <li><a href="/gioi-thieu" className="hover:underline">Giới thiệu</a></li>
            <li><a href="/nganh-dao-tao" className="hover:underline">Ngành đào tạo</a></li>
            <li><a href="/dao-tao" className="hover:underline">Đào tạo</a></li>
          </ul>
        </div>

        {/* Kết nối với chúng tôi */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Kết nối với chúng tôi</h3>
          <div className="flex justify-center space-x-4">
            <a href="https://facebook.com" className="hover:text-blue-400" aria-label="Facebook">
              <i className="fab fa-facebook-f text-2xl"></i>
            </a>
            <a href="https://twitter.com" className="hover:text-blue-400" aria-label="Twitter">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a href="https://instagram.com" className="hover:text-blue-400" aria-label="Instagram">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a href="https://linkedin.com" className="hover:text-blue-400" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in text-2xl"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-blue-500 pt-4">
        <p className="text-sm">© 2024 Trường Đại học Công Thương TPHCM. Tất cả quyền được bảo lưu.</p>
      </div>
    </footer>
  );
};

export default Footer;
