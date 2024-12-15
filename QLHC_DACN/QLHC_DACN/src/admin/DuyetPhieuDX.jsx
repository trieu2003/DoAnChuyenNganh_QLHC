// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const PhieuDeXuatDangChoDuyet = () => {
//   const [phieuDeXuat, setPhieuDeXuat] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const navigate = useNavigate();
//   const [filter, setFilter] = useState("getPhieuDeXuatDangChoDuyet"); // Mặc định là "Chờ duyệt"
//   const maNguoiDung = parseInt(localStorage.getItem("maNguoiDung"), 10); // Chuyển giá trị thành số nguyên

//   // Lấy dữ liệu từ API dựa trên trạng thái đã chọn
//   useEffect(() => {
//     const fetchPhieuDeXuat = async () => {
//       try {
//         let url = "";
//         if (filter === "getPhieuDeXuatDangChoDuyet") {
//           url = "https://localhost:7240/api/DeXuat/getPhieuDeXuatDangChoDuyet";
//         } else if (filter === "getPhieuDeXuatDaDuyet") {
//           url = "https://localhost:7240/api/DeXuat/getPhieuDeXuatDaDuyet";
//         } else if (filter === "all-detailsUser") {
//           url = "https://localhost:7240/api/DeXuat/all-detailsUser";
//         }

//         const response = await axios.get(url);
//         setPhieuDeXuat(response.data);
//         setFilteredData(response.data); // Lưu dữ liệu ban đầu vào filteredData
//       } catch (error) {
//         console.error("Lỗi khi lấy dữ liệu:", error);
//       }
//     };
//     fetchPhieuDeXuat();
//   }, [filter]);

// // Hàm lọc dữ liệu theo trạng thái
// useEffect(() => {
//   // Lọc dữ liệu dựa trên trạng thái (nếu cần)
//   if (filter === "getPhieuDeXuatDangChoDuyet") {
//     setFilteredData(phieuDeXuat);
//   } else if (filter === "getPhieuDeXuatDaDuyet") {
//     setFilteredData(
//       phieuDeXuat.filter((phieu) => phieu.trangThai === "Đã duyệt")
//     );
//   } else if (filter === "all-detailsUser") {
//     setFilteredData(phieuDeXuat);
//   }
// }, [filter, phieuDeXuat]);

//   // Xử lý duyệt phiếu
//   const handleApprove = async (maPhieuDX) => {
//     try {
//       const response = await axios.put(
//         `https://localhost:7240/api/DeXuat/update-and-approve/${maPhieuDX}`,
//         {
//           maPhieuDX: maPhieuDX,
//           maNguoiDung: maNguoiDung,
//           ngayDuyet: new Date().toISOString(), // Thời gian hiện tại
//           trangThai: "Đã duyệt", // Trạng thái là 'Đã duyệt'
//         }
//       );

//       if (response.status === 200) {
//         alert("Phiếu đã được duyệt thành công!");
//         const updatedData = phieuDeXuat.filter(
//           (phieu) => phieu.maPhieuDX !== maPhieuDX
//         );
//         setPhieuDeXuat(updatedData);
//         setFilteredData(updatedData); // Cập nhật dữ liệu đã lọc
//       } else {
//         alert("Có lỗi xảy ra khi duyệt phiếu.");
//       }
//     } catch (error) {
//       alert("Có lỗi xảy ra khi duyệt phiếu.");
//       console.error("Error:", error);
//     }
//   };
//   const handleViewDetails = (maPhieuDX) => {
//     navigate(`/purchase-request/details/${maPhieuDX}`);
//   };

//   // Xử lý từ chối phiếu
//   const handleTuChoi = async (maPhieuDX, lyDoTuChoi) => {
//     try {
//       const response = await axios.put(
//         `https://localhost:7240/api/DeXuat/update-status/${maPhieuDX}`,
//         {
//           maPhieuDX: maPhieuDX,
//           maNguoiDung: maNguoiDung,
//           trangThai: "Từ chối",
//           lyDoTuChoi: lyDoTuChoi,
//         }
//       );

//       if (response.status === 200) {
//         alert("Phiếu đã được từ chối thành công!");
//         // Xóa phiếu khỏi danh sách hiển thị
//         setFilteredData((prev) => prev.filter((phieu) => phieu.maPhieuDX !== maPhieuDX));
//       } else {
//         alert("Có lỗi xảy ra khi từ chối phiếu.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Có lỗi xảy ra khi từ chối phiếu.");
//     }
//   };

// // Xử lý thay đổi bộ lọc trạng thái
// const handleFilterChange = (event) => {
//   setFilter(event.target.value);
// };

// return (
//   <div className="container mx-auto p-4">
//     <h1 className="text-2xl font-bold mb-4">Danh sách Phiếu Đề Xuất</h1>

//     {/* Bộ lọc trạng thái */}
//     <div className="mb-4">
//       <label htmlFor="filter" className="mr-2">
//         Lọc theo trạng thái:
//       </label>
//       <select
//         id="filter"
//         value={filter}
//         onChange={handleFilterChange}
//         className="p-2 border border-gray-300 rounded"
//       >
//         <option value="getPhieuDeXuatDangChoDuyet">Chờ duyệt</option>
//         <option value="getPhieuDeXuatDaDuyet">Đã duyệt</option>
//         <option value="all-detailsUser">Tất cả</option>
//       </select>
//     </div>

//       <table className="min-w-full table-auto border-collapse border border-gray-300">
//         <thead>
//           <tr>
//             <th className="border border-gray-300 p-2">Mã Phiếu</th>
//             <th className="border border-gray-300 p-2">Tên Đăng Nhập</th>
//             <th className="border border-gray-300 p-2">Trạng Thái</th>
//             <th className="px-4 py-2 text-left">Ngày Tạo</th>
//             <th className="border border-gray-300 p-2">Xem Chi Tiết Đề Xuất</th>
//             <th className="border border-gray-300 p-2">Hành Động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.length > 0 ? (
//             filteredData.map((phieu) => (
//               <tr key={phieu.maPhieuDX}>
//                 <td className="border border-gray-300 p-2">
//                   {phieu.maPhieuDX}
//                 </td>
//                 <td className="border border-gray-300 p-2">{phieu.userName}</td>
//                 <td className="border border-gray-300 p-2">
//                   {phieu.trangThai}
//                 </td>
//                 <td className="border border-gray-300 p-2">
//                   {new Date(phieu.ngayTao).toLocaleString()}
//                 </td>
//                 {/* <td className="border border-gray-300 p-2">
//                   <ul>
//                     {phieu.chiTietDeXuat.map((ct, index) => (
//                       <li key={index}>
//                         {ct.tenHoaChat} - Số lượng: {ct.soLuong} lọ - Đơn giá:{" "}
//                         {ct.donGia}
//                       </li>
//                     ))}
//                   </ul>
//                 </td> */}
//                 <td className="border border-gray-300 p-2 text-center">
//                   <button
//                     className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//                     onClick={() => handleViewDetails(phieu.maPhieuDX)}
//                   >
//                     Xem chi tiết
//                   </button>
//                 </td>

//                 <td className="border border-gray-300 p-2">
//                   {phieu.trangThai === "Chờ duyệt" && (
//                     <>
//                       <button
//                         onClick={() => handleApprove(phieu.maPhieuDX)}
//                         className="bg-green-500 text-white px-4 py-2 rounded mr-2"
//                       >
//                         Duyệt
//                       </button>
//                       <button
//                         onClick={() => handleTuChoi(phieu.maPhieuDX)}
//                         className="bg-red-500 text-white px-4 py-2 rounded"
//                       >
//                         Từ chối
//                       </button>
//                     </>
//                   )}
//                   {phieu.trangThai === "Đã duyệt" && (
//                     <>
//                       <button
//                         onClick={() => handleTuChoi(phieu.maPhieuDX)}
//                         className="bg-red-500 text-white px-4 py-2 rounded"
//                       >
//                         Từ chối
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" className="text-center p-4">
//                 Không có phiếu đề xuất nào để duyệt.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PhieuDeXuatDangChoDuyet = () => {
  const [phieuDeXuat, setPhieuDeXuat] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("getPhieuDeXuatDangChoDuyet"); // Default filter state
  const [editingRejectId, setEditingRejectId] = useState(null); // Track rejection id
  const [rejectReason, setRejectReason] = useState(""); // Rejection reason
  const maNguoiDung = parseInt(localStorage.getItem("maNguoiDung"), 10);
  const navigate = useNavigate();
  // Fetch data based on the filter
  useEffect(() => {
    const fetchPhieuDeXuat = async () => {
      try {
        let url = "";
        if (filter === "getPhieuDeXuatDangChoDuyet") {
          url = "https://localhost:7240/api/DeXuat/getPhieuDeXuatDangChoDuyet";
        } else if (filter === "getPhieuDeXuatDaDuyet") {
          url = "https://localhost:7240/api/DeXuat/getPhieuDeXuatDaDuyet";
        } else if (filter === "all-detailsUser") {
          url = "https://localhost:7240/api/DeXuat/all-detailsUser";
        }

        const response = await axios.get(url);
        setPhieuDeXuat(response.data);
        setFilteredData(response.data); // Save the initial data for filtering
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPhieuDeXuat();
  }, [filter]);

  // Handle status change filter
  useEffect(() => {
    if (filter === "getPhieuDeXuatDangChoDuyet") {
      setFilteredData(phieuDeXuat);
    } else if (filter === "getPhieuDeXuatDaDuyet") {
      setFilteredData(
        phieuDeXuat.filter((phieu) => phieu.trangThai === "Đã duyệt")
      );
    } else if (filter === "all-detailsUser") {
      setFilteredData(phieuDeXuat);
    }
  }, [filter, phieuDeXuat]);

  // Handle the filter change event
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const handleViewHistory = (maPhieuDX) => {
    // Điều hướng đến trang lịch sử phiếu đề xuất
    // window.location.href = `/admin/history-purchase-request/${maPhieuDX}`;
    navigate(`/duyet-purchase-request/history-purchase-request/${maPhieuDX}`);

  };

  // Approve action
  const handleApprove = async (maPhieuDX) => {
    try {
      await axios.put(
        `https://localhost:7240/api/DeXuat/update-and-approve/${maPhieuDX}`,
        {
          maPhieuDX: maPhieuDX,
          maNguoiDung: maNguoiDung,
          ngayDuyet: new Date().toISOString(), // Thời gian hiện tại
          trangThai: "Đã duyệt",
        }
      );
      alert("Duyệt thành công!");

      // Update the filtered data without the approved item
      setFilteredData((prev) =>
        prev.filter((phieu) => phieu.maPhieuDX !== maPhieuDX)
      );
    } catch (error) {
      console.error("Error approving:", error);
      alert("Có lỗi khi duyệt phiếu.");
    }
  };

  // Reject action
  const handleReject = async (maPhieuDX) => {
    if (!rejectReason.trim()) {
      alert("Vui lòng nhập lý do từ chối.");
      return;
    }

    try {
      await axios.put(
        `https://localhost:7240/api/DeXuat/update-status/${maPhieuDX}`,
        {
          maPhieuDX: maPhieuDX,
          maNguoiDung: maNguoiDung, // Current user ID
          ngayDuyet: new Date().toISOString(),
          trangThai: "Từ chối",
          lyDoTuChoi: rejectReason, // Rejection reason
        }
      );

      alert("Từ chối thành công!");
      setFilteredData((prev) =>
        prev.filter((phieu) => phieu.maPhieuDX !== maPhieuDX)
      ); // Remove rejected item
      setEditingRejectId(null); // Close rejection input
      setRejectReason(""); // Clear rejection reason
    } catch (error) {
      console.error("Error rejecting:", error);
      alert("Có lỗi khi từ chối phiếu.");
    }
  };

  // View details action
  const handleViewDetails = (maPhieuDX) => {
    // Navigate to the details page (using react-router, or window.location.href)
    window.location.href = `/purchase-request/details/${maPhieuDX}`;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Phiếu Đề Xuất</h1>

      {/* Filter by status */}
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2">
          Lọc theo trạng thái:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="getPhieuDeXuatDangChoDuyet">Chờ duyệt</option>
          <option value="getPhieuDeXuatDaDuyet">Đã duyệt</option>
          <option value="all-detailsUser">Tất cả</option>
        </select>
      </div>

      {/* Data Table */}
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Mã Phiếu</th>
            <th className="border border-gray-300 p-2">Người Đề Xuất</th>
            <th className="border border-gray-300 p-2">Trạng Thái</th>
            <th className="border border-gray-300 p-2">Ngày Tạo</th>
            <th className="border border-gray-300 p-2">Xem Chi Tiết</th>
            <th className="border border-gray-300 p-2">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((phieu) => (
            <tr key={phieu.maPhieuDX}>
              <td className="border border-gray-300 p-2">{phieu.maPhieuDX}</td>
              <td className="border border-gray-300 p-2">{phieu.userName}</td>
              <td className="border border-gray-300 p-2">{phieu.trangThai}</td>
              <td className="border border-gray-300 p-2">
                {new Date(phieu.ngayTao).toLocaleString()}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  onClick={() => handleViewDetails(phieu.maPhieuDX)}
                >
                  Xem chi tiết
                </button>
              </td>
              <td className="border border-gray-300 p-2">
                {editingRejectId === phieu.maPhieuDX ? (
                  <div>
                    <textarea
                      className="border border-gray-300 p-2 w-full mb-2"
                      placeholder="Nhập lý do từ chối"
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                    />
                    <button
                      onClick={() => handleReject(phieu.maPhieuDX)}
                      className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Xác nhận từ chối
                    </button>
                    <button
                      onClick={() => setEditingRejectId(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                      Hủy
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* Nút "Xem lịch sử" */}
                    <button
                      onClick={() => handleViewHistory(phieu.maPhieuDX)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Xem lịch sử
                    </button>
                    {/* Hiển thị nút "Duyệt" và "Từ chối" nếu trạng thái là "Chờ duyệt" */}
                    {phieu.trangThai === "Chờ duyệt" && (
                      <>
                        <button
                          onClick={() => handleApprove(phieu.maPhieuDX)}
                          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                        >
                          Duyệt
                        </button>
                        <button
                          onClick={() => {
                            setEditingRejectId(phieu.maPhieuDX);
                            setRejectReason("");
                          }}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Từ chối
                        </button>
                      </>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PhieuDeXuatDangChoDuyet;
