import React from 'react';

const Home = () => {
  const chemicals = [
    {
      name: 'Aniline',
      description: 'Aniline là một hợp chất hữu cơ, được sử dụng rộng rãi trong ngành hóa học.',
      imageUrl: 'https://via.placeholder.com/150', // Thay bằng hình ảnh thực tế
    },
    {
      name: '2,4-Dinitrophenyl Hydrazine',
      description: 'DNP là một hợp chất hữu cơ dùng trong phản ứng với carbonyl.',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      name: 'Benzene',
      description: 'Benzene là một hợp chất thơm, được sử dụng trong công nghiệp hóa học và dược phẩm.',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      name: 'Acetone',
      description: 'Acetone là một dung môi hữu cơ, dễ bay hơi, được sử dụng trong nhiều ngành công nghiệp.',
      imageUrl: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <div>
      {/* Header Section */}
      <header className="bg-blue-600 text-white text-center p-6">
        <h1 className="text-4xl font-bold">Chào Mừng Đến Với Quản Lý Hóa Chất</h1>
        <p className="text-xl mt-2">Giới thiệu các loại hóa chất chất lượng cao cho các ứng dụng công nghiệp và nghiên cứu khoa học.</p>
      </header>

      {/* Introduction Section */}
      <section className="p-8 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold mb-6">Giới Thiệu Các Loại Hóa Chất</h2>
        <p className="mb-8 text-lg text-gray-600">Chúng tôi cung cấp các hóa chất với chất lượng cao, ứng dụng rộng rãi trong nhiều lĩnh vực khác nhau.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {chemicals.map((chemical, index) => (
            <div key={index} className="bg-white p-4 shadow-md rounded-lg hover:shadow-xl transition duration-300">
              <img src={chemical.imageUrl} alt={chemical.name} className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold mb-2">{chemical.name}</h3>
              <p className="text-gray-700">{chemical.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-gray-200 p-8 text-center">
        <h2 className="text-3xl font-semibold mb-4">Về Chúng Tôi</h2>
        <p className="text-lg text-gray-600 mb-6">Chúng tôi chuyên cung cấp các loại hóa chất công nghiệp, nghiên cứu và sản phẩm hóa học chất lượng cao, đảm bảo đáp ứng nhu cầu của khách hàng trong mọi ngành nghề.</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">Tìm Hiểu Thêm</button>
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-600 text-white text-center p-4 mt-8">
        <p>&copy; 2024 Công Ty Hóa Chất ABC. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
