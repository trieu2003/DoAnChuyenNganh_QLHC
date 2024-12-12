// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const ChemicalForecastingDetail = () => {
//   const { selectedMaMon } = useParams();
//   const [duTruData, setDuTruData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`https://localhost:7240/api/DuTru/thongke/${selectedMaMon}`)
//       .then((response) => {
//         setDuTruData(response.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError('Lỗi khi tải dữ liệu');
//         setLoading(false);
//       });
//   }, [selectedMaMon]);

//   return (
//     <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold text-center mb-6">
//         Chi Tiết Dự Trù Hóa Chất
//       </h1>

//       {loading ? (
//         <p>Đang tải dữ liệu...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <h2 className="text-lg font-bold mb-4">Thông Tin Bài Thí Nghiệm</h2>
//           <table className="w-full border-collapse border border-gray-300 bg-white shadow-sm">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border border-gray-300 p-3 text-left">Mã Bài Thí Nghiệm</th>
//                 <th className="border border-gray-300 p-3 text-left">Tên Bài Thí Nghiệm</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="border border-gray-300 p-3">{maBaiTN}</td>
//                 <td className="border border-gray-300 p-3">{tenBaiTN}</td>
//               </tr>
//             </tbody>
//           </table>

//           <h3 className="text-lg font-bold mt-6 mb-4">Danh Sách Hóa Chất Dự Trù</h3>
//           <table className="w-full border-collapse border border-gray-300 bg-white shadow-sm">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border border-gray-300 p-3 text-left">Tên Hóa Chất</th>
//                 <th className="border border-gray-300 p-3 text-left">Số Lượng</th>
//               </tr>
//             </thead>
//             <tbody>
//               {duTruData.map((duTru, index) => (
//                 <tr key={index}>
//                   <td className="border border-gray-300 p-3">
//                     {duTru.hoaChat?.tenHoaChat || 'Không xác định'}
//                   </td>
//                   <td className="border border-gray-300 p-3">{duTru.soLuong}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChemicalForecastingDetail;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ChemicalForecastingDetail = () => {
  const { selectedMaMon } = useParams();
  const [baiThiNghiemData, setBaiThiNghiemData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://localhost:7240/api/DuTru/detail/${selectedMaMon}`)
      .then((response) => {
        setBaiThiNghiemData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Lỗi khi tải dữ liệu');
        setLoading(false);
      });
  }, [selectedMaMon]);

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">
        Chi Tiết Dự Trù Hóa Chất
      </h1>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        baiThiNghiemData.length > 0 ? (
          baiThiNghiemData.map((baiThiNghiem, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-lg font-bold mb-4">
                Bài Thí Nghiệm: {baiThiNghiem.tenBaiTN}
              </h2>
              <h3 className="text-md font-bold mb-2">Hóa Chất Dự Trù:</h3>
              {baiThiNghiem.duTru.length > 0 ? (
                <table className="w-full border-collapse border border-gray-300 bg-white shadow-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 p-3 text-left">Tên Hóa Chất</th>
                      <th className="border border-gray-300 p-3 text-left">Số Lượng</th>
                      <th className="border border-gray-300 p-3 text-left">Đơn Vị</th>
                    </tr>
                  </thead>
                  <tbody>
                    {baiThiNghiem.duTru.map((duTru, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 p-3">
                          {duTru.hoaChat?.tenHoaChat || 'Không xác định'}
                        </td>
                        <td className="border border-gray-300 p-3">{duTru.soLuong}</td>
                        <td className="border border-gray-300 p-3">{duTru.hoaChat?.donVi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500">Không có hóa chất dự trù.</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">Không có bài thí nghiệm nào.</p>
        )
      )}
    </div>
  );
};

export default ChemicalForecastingDetail;
