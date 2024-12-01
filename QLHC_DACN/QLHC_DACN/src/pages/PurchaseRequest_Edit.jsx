import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';  // Import useParams hook

const PurchaseRequest_Edit = () => {
  const [chiTietDeXuat, setChiTietDeXuat] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use useParams to get the route params
  const { id: maPhieuDX } = useParams();  // 'id' will match the param name in your route definition

  useEffect(() => {
    if (maPhieuDX) {
      // Fetch ChiTietDeXuat details
      axios.get(`https://localhost:7240/api/DeXuat/details/${maPhieuDX}`)
        .then(response => {
          setChiTietDeXuat(response.data);
        })
        .catch(error => {
          console.error("Error fetching ChiTietDeXuat:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [maPhieuDX]);

  return (
    <div>
      <h2 className="text-2xl font-semibold">Chi Tiết Đề Xuất</h2>

      {loading ? (
        <p>Đang tải chi tiết...</p>
      ) : (
        <div>
          {chiTietDeXuat.length === 0 ? (
            <p>Không có chi tiết đề xuất nào.</p>
          ) : (
            chiTietDeXuat.map((detail, index) => (
              <div key={index} className="p-4 border-2 border-gray-200 rounded-lg space-y-4">
                <div>
                  <label className="block">Mã Hóa Chất</label>
                  <p>{detail.maHoaChat}</p>
                </div>
                <div>
                  <label className="block">Số Lượng</label>
                  <p>{detail.soLuong}</p>
                </div>
                <div>
                  <label className="block">Đơn Giá</label>
                  <p>{detail.donGia}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PurchaseRequest_Edit;
