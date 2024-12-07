import React from 'react';

const NganhDaoTao = () => {
  return (
    <div className="bg-gray-50 py-12 px-6">
      {/* Container */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Ngành Đào Tạo tại Trường Đại Học Công Thương TPHCM</h1>
          <p className="text-lg text-gray-600">
            Trường Đại học Công Thương TPHCM cung cấp đa dạng các chương trình đào tạo đáp ứng nhu cầu của thị trường lao động
            trong các lĩnh vực kỹ thuật, công nghệ, và kinh tế. Dưới đây là các ngành đào tạo nổi bật của trường.
          </p>
        </div>

        {/* Industry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Kỹ thuật Điện - Điện tử */}
          <div className="bg-blue-100 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center">
            <img src="https://via.placeholder.com/150" alt="Kỹ thuật Điện - Điện tử" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">Kỹ thuật Điện - Điện tử</h2>
            <p className="text-gray-600 mb-4">
              Ngành đào tạo chuyên sâu về các hệ thống điện, điện tử, và thiết bị tự động hóa trong công nghiệp.
            </p>
            <a href="#" className="text-blue-500 hover:text-blue-700">Xem chi tiết</a>
          </div>

          {/* Card 2: Công nghệ Thông tin */}
          <div className="bg-blue-100 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center">
            <img src="https://via.placeholder.com/150" alt="Công nghệ Thông tin" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">Công nghệ Thông tin</h2>
            <p className="text-gray-600 mb-4">
              Ngành này đào tạo về phần mềm, hệ thống máy tính, an ninh mạng, và các công nghệ mới trong IT.
            </p>
            <a href="#" className="text-blue-500 hover:text-blue-700">Xem chi tiết</a>
          </div>

          {/* Card 3: Quản trị Kinh doanh */}
          <div className="bg-blue-100 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center">
            <img src="https://via.placeholder.com/150" alt="Quản trị Kinh doanh" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">Quản trị Kinh doanh</h2>
            <p className="text-gray-600 mb-4">
              Đào tạo các kiến thức và kỹ năng về quản lý, chiến lược kinh doanh và quản trị tài chính.
            </p>
            <a href="#" className="text-blue-500 hover:text-blue-700">Xem chi tiết</a>
          </div>

          {/* Card 4: Kế toán - Kiểm toán */}
          <div className="bg-blue-100 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center">
            <img src="https://via.placeholder.com/150" alt="Kế toán - Kiểm toán" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">Kế toán - Kiểm toán</h2>
            <p className="text-gray-600 mb-4">
              Chương trình đào tạo các kỹ năng về kế toán tài chính, phân tích báo cáo tài chính, và kiểm toán độc lập.
            </p>
            <a href="#" className="text-blue-500 hover:text-blue-700">Xem chi tiết</a>
          </div>

          {/* Card 5: Công nghệ Thực phẩm */}
          <div className="bg-blue-100 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center">
            <img src="https://via.placeholder.com/150" alt="Công nghệ Thực phẩm" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">Công nghệ Thực phẩm</h2>
            <p className="text-gray-600 mb-4">
              Ngành đào tạo về công nghệ chế biến thực phẩm, bảo quản thực phẩm, và an toàn vệ sinh thực phẩm.
            </p>
            <a href="#" className="text-blue-500 hover:text-blue-700">Xem chi tiết</a>
          </div>

          {/* Card 6: Thương mại Quốc tế */}
          <div className="bg-blue-100 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center">
            <img src="https://via.placeholder.com/150" alt="Thương mại Quốc tế" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">Thương mại Quốc tế</h2>
            <p className="text-gray-600 mb-4">
              Chuyên ngành về xuất nhập khẩu, quản lý chuỗi cung ứng, và các quy trình giao dịch quốc tế.
            </p>
            <a href="#" className="text-blue-500 hover:text-blue-700">Xem chi tiết</a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-lg text-gray-600">
            Để biết thêm thông tin chi tiết về các ngành đào tạo, vui lòng liên hệ với phòng đào tạo của trường.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NganhDaoTao;
