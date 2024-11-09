import React from 'react';

const NganhDaoTao = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Ngành đào tạo</h1>
      <p className="mb-4">
        Trường Đại học Công Thương TPHCM cung cấp đa dạng các chương trình đào tạo đáp ứng nhu cầu của thị trường
        lao động trong các lĩnh vực kỹ thuật, công nghệ, và kinh tế.
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Kỹ thuật Điện - Điện tử</li>
        <li>Công nghệ Thông tin</li>
        <li>Quản trị Kinh doanh</li>
        <li>Kế toán - Kiểm toán</li>
        <li>Công nghệ Thực phẩm</li>
        <li>Thương mại Quốc tế</li>
      </ul>
      <p>
        Để biết thêm thông tin chi tiết về các ngành, vui lòng liên hệ với phòng đào tạo của trường.
      </p>
    </div>
  );
};

export default NganhDaoTao;
