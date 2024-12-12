// // export default EditDeXuatDetails;
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const EditChiTietDeXuat = () => {
//   const { maPhieuDX } = useParams(); // Lấy mã phiếu từ URL
//   const navigate = useNavigate(); // Điều hướng quay lại
//   const [chiTietData, setChiTietData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Lấy danh sách chi tiết đề xuất
//     axios
//       .get(`https://localhost:7240/api/DeXuat/details/${maPhieuDX}`)
//       .then((response) => {
//         setChiTietData(response.data.chiTietDeXuat);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching details:", error);
//         setIsLoading(false);
//       });
//   }, [maPhieuDX]);

//   const handleUpdate = async (maHoaChat, updatedDetail) => {
//     try {
//       await axios.put(
//         `https://localhost:7240/api/DeXuat/update-details/${maPhieuDX}/${maHoaChat}`,
//         updatedDetail
//       );
//       alert("Cập nhật thành công!");
//       navigate(0); // Quay lại trang trước -1  Reload trang hiện tại 0
//     } catch (error) {
//       console.error("Lỗi khi cập nhật chi tiết:", error);
//       alert("Cập nhật thất bại. Vui lòng thử lại.");
//     }
//   };

//   if (isLoading) {
//     return <div className="text-center text-lg">Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-semibold mb-4">
//         Chỉnh sửa Chi tiết Phiếu Đề Xuất: {maPhieuDX}
//       </h1>

//       <button
//         className="mb-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
//         onClick={() => navigate(-1)} // Quay lại trang trước
//       >
//         Quay lại
//       </button>

//       {chiTietData.length > 0 ? (
//         <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 text-left">STT</th>
//               <th className="px-4 py-2 text-left">Tên Hóa Chất</th>
//               <th className="px-4 py-2 text-left">Số Lượng</th>
//               <th className="px-4 py-2 text-left">Đơn Giá</th>
//               <th className="px-4 py-2 text-left">Hành Động</th>
//             </tr>
//           </thead>
//           <tbody>
//             {chiTietData.map((detail, index) => (
//               <tr key={index} className="border-b hover:bg-gray-50">
//                 <td className="px-4 py-2">{index + 1}</td>
//                 <td className="px-4 py-2">{detail.tenHoaChat}</td>
//                 <td className="px-4 py-2">
//                   <input
//                     type="number"
//                     value={detail.soLuong}
//                     onChange={(e) => {
//                       const newChiTietData = [...chiTietData];
//                       newChiTietData[index].soLuong = e.target.value;
//                       setChiTietData(newChiTietData);
//                     }}
//                     className="border border-gray-300 rounded w-20 p-2"
//                   />
//                 </td>
//                 <td className="px-4 py-2">
//                   <input
//                     type="number"
//                     value={detail.donGia}
//                     onChange={(e) => {
//                       const newChiTietData = [...chiTietData];
//                       newChiTietData[index].donGia = e.target.value;
//                       setChiTietData(newChiTietData);
//                     }}
//                     className="border border-gray-300 rounded w-20 p-2"
//                   />
//                 </td>
//                 <td className="px-4 py-2">
//                   <button
//                     onClick={() => handleUpdate(detail.maHoaChat, {
//                       soLuong: detail.soLuong,
//                       donGia: detail.donGia,
//                     })}
//                     className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
//                   >
//                     Lưu
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="text-center">Không có chi tiết đề xuất để chỉnh sửa</p>
//       )}
//     </div>
//   );
// };

// export default EditChiTietDeXuat;
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditChiTietDeXuat = () => {
  const { maPhieuDX } = useParams(); // Lấy mã phiếu từ URL
  const navigate = useNavigate(); // Điều hướng quay lại
  const [chiTietData, setChiTietData] = useState([]);
  const [trangThai, setTrangThai] = useState(""); // Trạng thái phiếu
  const [lyDoTuChoi, setLyDoTuChoi] = useState(""); // Lý do từ chối
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lấy danh sách chi tiết đề xuất
    axios
      .get(`https://localhost:7240/api/DeXuat/details/${maPhieuDX}`)
      .then((response) => {
        const data = response.data;
        setChiTietData(data.chiTietDeXuat);
        setTrangThai(data.trangThai); // Lưu trạng thái
        setLyDoTuChoi(data.lyDoTuChoi); // Lưu lý do từ chối nếu có
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching details:", error);
        setIsLoading(false);
      });
  }, [maPhieuDX]);

  const handleUpdate = async (maHoaChat, updatedDetail) => {
    try {
      await axios.put(
        `https://localhost:7240/api/DeXuat/update-details/${maPhieuDX}/${maHoaChat}`,
        updatedDetail
      );
      alert("Cập nhật thành công!");
      navigate(0); // Reload trang hiện tại
    } catch (error) {
      console.error("Lỗi khi cập nhật chi tiết:", error);
      alert("Cập nhật thất bại. Vui lòng thử lại.");
    }
  };

  if (isLoading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">
        Chỉnh sửa Chi tiết Phiếu Đề Xuất: {maPhieuDX}
      </h1>

      <button
        className="mb-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
        onClick={() => navigate(-1)} // Quay lại trang trước
      >
        Quay lại
      </button>

      {/* Hiển thị lý do từ chối nếu trạng thái là 'Từ chối' */}
      {trangThai === "Từ chối" && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded">
          <strong>Lý do từ chối:</strong> {lyDoTuChoi || "Không có lý do cụ thể"}
        </div>
      )}

      {chiTietData.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">STT</th>
              <th className="px-4 py-2 text-left">Tên Hóa Chất</th>
              <th className="px-4 py-2 text-left">Số Lượng</th>
              <th className="px-4 py-2 text-left">Đơn Giá</th>
              <th className="px-4 py-2 text-left">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {chiTietData.map((detail, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{detail.tenHoaChat}</td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={detail.soLuong}
                    onChange={(e) => {
                      const newChiTietData = [...chiTietData];
                      newChiTietData[index].soLuong = e.target.value;
                      setChiTietData(newChiTietData);
                    }}
                    className="border border-gray-300 rounded w-20 p-2"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={detail.donGia}
                    onChange={(e) => {
                      const newChiTietData = [...chiTietData];
                      newChiTietData[index].donGia = e.target.value;
                      setChiTietData(newChiTietData);
                    }}
                    className="border border-gray-300 rounded w-20 p-2"
                  />
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() =>
                      handleUpdate(detail.maHoaChat, {
                        soLuong: detail.soLuong,
                        donGia: detail.donGia,
                      })
                    }
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                  >
                    Lưu
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">Không có chi tiết đề xuất để chỉnh sửa</p>
      )}
    </div>
  );
};

export default EditChiTietDeXuat;
