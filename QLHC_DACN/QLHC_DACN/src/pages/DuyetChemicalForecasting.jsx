import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DuyetChemicalForecasting = () => {
  const [monHocs, setMonHocs] = useState([]); // List of subjects
  const [selectedMaMon, setSelectedMaMon] = useState(""); // Selected subject
  const [baiThiNghiems, setBaiThiNghiems] = useState([]); // List of experiments
  const [editingRejectId, setEditingRejectId] = useState(null); // Track rejection id
  const [rejectReason, setRejectReason] = useState("");
  const maNguoiDung = parseInt(localStorage.getItem("maNguoiDung"), 10);
  const navigate = useNavigate();
  // Fetch subjects (môn học) from the API
  useEffect(() => {
    const fetchMonHocs = async () => {
      try {
        const response = await axios.get("https://localhost:7240/api/DuTru/monhoc");
        setMonHocs(response.data); // Set the list of subjects
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchMonHocs();
  }, []);
  
  useEffect(() => {
    // Lấy giá trị từ localStorage nếu có
    const savedMaMon = localStorage.getItem("selectedMaMon");
    if (savedMaMon) {
      setSelectedMaMon(savedMaMon);
      fetchExperiments(savedMaMon); // Fetch experiments nếu đã lưu trạng thái
    }
  }, []);
  
  // Handle subject change
  const handleMonHocChange = async (e) => {
    const selectedMaMon = e.target.value;
    setSelectedMaMon(selectedMaMon);
    localStorage.setItem("selectedMaMon", selectedMaMon); // Lưu vào localStorage
    if (selectedMaMon) {
        await fetchExperiments(selectedMaMon); // Fetch experiments theo môn học được chọn
      } else {
        setBaiThiNghiems([]); // Xóa danh sách bài thí nghiệm nếu không chọn môn học
      }
    };
    
    const fetchExperiments = async (maMon) => {
      try {
        const response = await axios.get(`https://localhost:7240/api/DuTru/duyetbaitn/${maMon}`);
        setBaiThiNghiems(response.data);
      } catch (error) {
        console.error("Error fetching experiments:", error);
      }
    };
//     if (selectedMaMon) {
//       // Fetch the experiments related to the selected subject
//       try {
//         const response = await axios.get(`https://localhost:7240/api/DuTru/detail/${selectedMaMon}`);
//         setBaiThiNghiems(response.data); // Set the list of experiments for the selected subject
//       } catch (error) {
//         console.error("Error fetching experiments:", error);
//       }
//     } else {
//       setBaiThiNghiems([]); // Clear experiments if no subject is selected
//     }
//   };
  const handleViewHistory = (maBaiTN) => {
    // Điều hướng đến trang lịch sử phiếu đề xuất
    // window.location.href = `/admin/history-purchase-request/${maBaiTN}`;
    navigate(`/duyet-chemical-forecasting/history/${maBaiTN}`);

  };

  // Approve action
  const handleApprove = async (maBaiTN) => {
    try {
      await axios.put(
        `https://localhost:7240/api/DuTru/update-status/${maBaiTN}`,
        {
          maBaiTN: maBaiTN,
          maNguoiDung: maNguoiDung,
          ngayDuyet: new Date().toISOString(), // Thời gian hiện tại
          trangThai: "Đã duyệt",
        }
      );
      alert("Duyệt thành công!");

      // Update the filtered data without the approved item
    //   setFilteredData((prev) =>
    //     prev.filter((phieu) => phieu.maBaiTN !== maBaiTN)
    //   );
    } catch (error) {
      console.error("Error approving:", error);
      alert("Có lỗi khi duyệt phiếu.");
    }
  };

  // Reject action
  const handleReject = async (maBaiTN) => {
    if (!rejectReason.trim()) {
      alert("Vui lòng nhập lý do từ chối.");
      return;
    }

    try {
      await axios.put(
        `https://localhost:7240/api/DuTru/update-status/${maBaiTN}`,
        {
          maBaiTN: maBaiTN,
          maNguoiDung: maNguoiDung, // Current user ID
          ngayDuyet: new Date().toISOString(),
          trangThai: "Từ chối",
          lyDoTuChoi: rejectReason, // Rejection reason
        }
      );

      alert("Từ chối thành công!");
      // setFilteredData((prev) =>
      //   prev.filter((phieu) => phieu.maBaiTN !== maBaiTN)
      // ); // Remove rejected item
      setEditingRejectId(null); // Close rejection input
      setRejectReason(""); // Clear rejection reason
    } catch (error) {
      console.error("Error rejecting:", error);
      alert("Có lỗi khi từ chối phiếu.");
    }
  };

  // View details action
  const handleViewDetails = (maBaiTN) => {
    // Navigate to the details page (using react-router, or window.location.href)
    window.location.href = `/duyet-chemical-forecasting/details/${maBaiTN}`;
  };
  return (
    <div className="container mx-auto p-4">
      {/* Dropdown to select subject */}
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-col w-full md:w-1/3">
          <label htmlFor="monHoc" className="block font-semibold mb-2">
            Chọn môn học
          </label>
          <select
            id="monHoc"
            value={selectedMaMon}
            onChange={handleMonHocChange}
            className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">-- Chọn môn học --</option>
            {monHocs.map((monHoc) => (
              <option key={monHoc.maMon} value={monHoc.maMon}>
                {monHoc.tenMon}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display list of experiments if subject is selected */}
      {selectedMaMon && baiThiNghiems.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Danh sách bài thí nghiệm</h2>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
              <th className="border border-gray-300 p-2">Mã BTN</th>
                <th className="border border-gray-300 p-2">Tên Bài Thí Nghiệm</th>
                <th className="border border-gray-300 p-2">Trạng Thái</th>
                
                <th className="border border-gray-300 p-2">Xem Chi Tiết</th>
                <th className="border border-gray-300 p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {baiThiNghiems.map((bai) => (
                <tr key={bai.maBaiTN}>
                  <td className="border border-gray-300 p-2"> {bai.maBaiTN}</td>
                  <td className="border border-gray-300 p-2">{bai.tenBaiTN}</td>
                  <td className="border border-gray-300 p-2">{bai.trangThai}</td>
                  {/* <td className="border border-gray-300 p-2">{bai.monHoc.tenMon}</td> */}
                  <td className="border border-gray-300 p-2 text-center">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    onClick={() => handleViewDetails(bai.maBaiTN)}>
                      Xem chi tiết
                    </button>
                  </td>
                  <td className="border border-gray-300 p-2">
                {editingRejectId === bai.maBaiTN ? (
                  <div>
                    <textarea
                      className="border border-gray-300 p-2 w-full mb-2"
                      placeholder="Nhập lý do từ chối"
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                    />
                    <button
                      onClick={() => handleReject(bai.maBaiTN)}
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
                      onClick={() => handleViewHistory(bai.maBaiTN)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Xem lịch sử
                    </button>
                    {/* Hiển thị nút "Duyệt" và "Từ chối" nếu trạng thái là "Chờ duyệt" */}
                    {bai.trangThai === "Chờ duyệt" && (
                      <>
                        <button
                          onClick={() => handleApprove(bai.maBaiTN)}
                          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                        >
                          Duyệt
                        </button>
                        <button
                          onClick={() => {
                            setEditingRejectId(bai.maBaiTN);
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
      )}
    </div>
  );
};

export default DuyetChemicalForecasting;
