import React from 'react';

const GioiThieucontact = () => {
  return (
    <div className="bg-gray-50 py-12 px-6">
      {/* Container */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">Giới Thiệu về Trường Đại học Công Thương TPHCM</h1>
          <p className="text-xl text-gray-700">
            Trường Đại học Công Thương TPHCM (HUIT) là một trong những trường đại học hàng đầu Việt Nam với sứ mệnh
            đào tạo, nghiên cứu và cung cấp nguồn nhân lực chất lượng cao trong các lĩnh vực công nghiệp và thương mại.
          </p>
        </div>

        {/* Mission Section */}
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-blue-500">Sứ Mệnh</h2>
          <p className="text-lg text-gray-600">
            Sứ mệnh của trường là tạo ra một môi trường học tập và nghiên cứu chất lượng cao, nhằm đào tạo nguồn nhân lực
            đáp ứng nhu cầu của xã hội, đồng thời đóng góp vào sự phát triển của nền kinh tế và xã hội.
          </p>
        </div>

        {/* Vision Section */}
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-blue-500">Tầm Nhìn</h2>
          <p className="text-lg text-gray-600">
            Trường hướng tới trở thành một trong những trường đại học hàng đầu trong khu vực Đông Nam Á, với các chương
            trình đào tạo tiên tiến, đáp ứng tiêu chuẩn quốc tế.
          </p>
        </div>

        {/* Contact Section */}
        <div className="space-y-4 mt-8">
          <h2 className="text-3xl font-semibold text-blue-500">Liên Hệ</h2>
          <p className="text-lg text-gray-600">
            Nếu bạn muốn tìm hiểu thêm về các chương trình đào tạo hoặc có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua:
          </p>
          <ul className="list-none space-y-2">
            <li className="text-lg text-gray-600"><strong>Email:</strong> info@huit.edu.vn</li>
            <li className="text-lg text-gray-600"><strong>Địa chỉ:</strong> 280 An Dương Vương, Quận 5, TPHCM</li>
            <li className="text-lg text-gray-600"><strong>Hotline:</strong> 1800-1234</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GioiThieucontact;
