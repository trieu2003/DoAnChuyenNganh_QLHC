import React from 'react';
import { useNavigate } from 'react-router-dom';

const GioiThieu = () => {
  const navigate = useNavigate();

  // Hàm xử lý sự kiện khi nhấn nút Login
  const handleLoginRedirect = () => {
    navigate('/login'); // Điều hướng tới trang login
  };

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Banner */}
      <section className="relative bg-blue-600 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Trường Đại học Công Thương TPHCM</h1>
          <p className="text-lg md:text-xl">
            Nơi kết nối tri thức, phát triển tương lai của bạn!
          </p>
        </div>
      </section>

      {/* Phần Giới thiệu */}
      <section className="container mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-blue-600">Giới thiệu về trường</h2>
          <p className="text-gray-700 mt-2">
            Trường Đại học Công Thương TPHCM là nơi cung cấp môi trường học tập chuyên nghiệp, là bệ phóng
            cho sự nghiệp tương lai của các thế hệ sinh viên.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-700 mb-4">
              Trường được thành lập vào năm 1998, với sứ mệnh đào tạo nguồn nhân lực chất lượng cao cho các ngành công nghiệp. Trải qua hơn 20 năm, trường đã khẳng định được vị trí của mình trong hệ thống giáo dục đại học của Việt Nam.
            </p>
          </div>
          <img src="/assets/images/campus.png" alt="Campus" className="w-full h-auto rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Thêm Nút Login */}
      <section className="container mx-auto py-12 px-4 text-center">
        <button
          onClick={handleLoginRedirect}
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Đăng nhập
        </button>
      </section>

      {/* Tầm nhìn và Sứ mệnh */}
      <section className="container mx-auto py-12 px-4 bg-gray-100 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-blue-600">Tầm nhìn và Sứ mệnh</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-2 text-blue-600">Tầm nhìn</h3>
            <p className="text-gray-700">
              Đến năm 2030, Trường Đại học Công Thương TPHCM phấn đấu trở thành một trường đại học hàng đầu
              tại Việt Nam với chất lượng đào tạo quốc tế.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-2 text-blue-600">Sứ mệnh</h3>
            <p className="text-gray-700">
              Sứ mệnh của trường là đào tạo nguồn nhân lực chất lượng cao, có đạo đức, kỹ năng và năng lực
              để phục vụ cho nền công nghiệp Việt Nam.
            </p>
          </div>
        </div>
      </section>

      {/* Cơ sở vật chất */}
      <section className="container mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-blue-600">Cơ sở vật chất</h2>
          <p className="text-gray-700">
            Khuôn viên trường hiện đại, đầy đủ tiện nghi phục vụ cho học tập và nghiên cứu.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <img src="https://source.unsplash.com/300x200/?classroom" alt="Classroom" className="w-full h-48 object-cover rounded-lg shadow-lg" />
          <img src="https://source.unsplash.com/300x200/?laboratory" alt="Laboratory" className="w-full h-48 object-cover rounded-lg shadow-lg" />
          <img src="https://source.unsplash.com/300x200/?library" alt="Library" className="w-full h-48 object-cover rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Đội ngũ giảng viên */}
      <section className="container mx-auto py-12 px-4 bg-gray-100 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-blue-600">Đội ngũ giảng viên</h2>
          <p className="text-gray-700">
            Đội ngũ giảng viên giàu kinh nghiệm, nhiệt huyết và trình độ cao.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-white rounded-lg shadow-lg">
            <img src="https://source.unsplash.com/150x150/?teacher" alt="Teacher" className="rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-semibold">Nguyễn Văn A</h3>
            <p>Giáo sư, Khoa Kinh tế</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-lg">
            <img src="https://source.unsplash.com/150x150/?professor" alt="Professor" className="rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-semibold">Trần Thị B</h3>
            <p>Tiến sĩ, Khoa Công nghệ thông tin</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-lg">
            <img src="https://source.unsplash.com/150x150/?research" alt="Researcher" className="rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-semibold">Lê Văn C</h3>
            <p>Thạc sĩ, Khoa Kỹ thuật</p>
          </div>
        </div>
      </section>

      {/* Hoạt động và sự kiện */}
      <section className="container mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-blue-600">Hoạt động và Sự kiện</h2>
          <p className="text-gray-700">
            Trường tổ chức nhiều hoạt động và sự kiện sôi nổi cho sinh viên.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <img src="https://source.unsplash.com/300x200/?event" alt="Event" className="w-full h-48 object-cover rounded-lg shadow-lg" />
          <img src="https://source.unsplash.com/300x200/?competition" alt="Competition" className="w-full h-48 object-cover rounded-lg shadow-lg" />
          <img src="https://source.unsplash.com/300x200/?workshop" alt="Workshop" className="w-full h-48 object-cover rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Liên hệ */}
      <section className="container mx-auto text-center py-12 px-4">
        <h2 className="text-3xl font-semibold text-blue-600 mb-4">Kết nối với chúng tôi</h2>
        <p className="text-gray-700 mb-8">Trường Đại học Công Thương TPHCM luôn sẵn sàng hỗ trợ bạn!</p>
        <div className="flex justify-center space-x-4">
          <a href="https://facebook.com" className="text-blue-600 hover:text-blue-400">Facebook</a>
          <a href="https://twitter.com" className="text-blue-600 hover:text-blue-400">Twitter</a>
          <a href="https://instagram.com" className="text-blue-600 hover:text-blue-400">Instagram</a>
        </div>
      </section>
    </div>
  );
};

export default GioiThieu;
