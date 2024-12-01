import { useEffect, useState } from "react";
import axios from "axios";

const PhieuDeXuatDangChoDuyet = () => {
  const [phieuDeXuat, setPhieuDeXuat] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("getPhieuDeXuatDangChoDuyet"); // Mặc định là "Chờ duyệt"
  const maNguoiDung = parseInt(localStorage.getItem("maNguoiDung"), 10); // Chuyển giá trị thành số nguyên

  // Lấy dữ liệu từ API dựa trên trạng thái đã chọn
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
        setFilteredData(response.data); // Lưu dữ liệu ban đầu vào filteredData
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchPhieuDeXuat();
  }, [filter]);

  // Hàm lọc dữ liệu theo trạng thái
  useEffect(() => {
    // Lọc dữ liệu dựa trên trạng thái (nếu cần)
    if (filter === "getPhieuDeXuatDangChoDuyet") {
      setFilteredData(phieuDeXuat);
    } else if (filter === "getPhieuDeXuatDaDuyet") {
      setFilteredData(phieuDeXuat.filter((phieu) => phieu.trangThai === "Đã duyệt"));
    } else if (filter === "all-detailsUser") {
      setFilteredData(phieuDeXuat);
    }
  }, [filter, phieuDeXuat]);

  // Xử lý duyệt phiếu
  const handleApprove = async (maPhieuDX) => {
    try {
      const response = await axios.put(
        `https://localhost:7240/api/DeXuat/update-and-approve/${maPhieuDX}`,
        {
          maPhieuDX: maPhieuDX,
          maNguoiDung: maNguoiDung,
          ngayDuyet: new Date().toISOString(), // Thời gian hiện tại
          trangThai: "Đã duyệt", // Trạng thái là 'Đã duyệt'
        }
      );

      if (response.status === 200) {
        alert("Phiếu đã được duyệt thành công!");
        const updatedData = phieuDeXuat.filter(
          (phieu) => phieu.maPhieuDX !== maPhieuDX
        );
        setPhieuDeXuat(updatedData);
        setFilteredData(updatedData); // Cập nhật dữ liệu đã lọc
      } else {
        alert("Có lỗi xảy ra khi duyệt phiếu.");
      }
    } catch (error) {
      alert("Có lỗi xảy ra khi duyệt phiếu.");
      console.error("Error:", error);
    }
  };

  // Xử lý từ chối phiếu
  const handleTuChoi = async (maPhieuDX) => {
    try {
        const response = await axios.put(
          `https://localhost:7240/api/DeXuat/update-and-approve/${maPhieuDX}`,
          {
            maPhieuDX: maPhieuDX,
            maNguoiDung: maNguoiDung,
            ngayDuyet: new Date().toISOString(), // Thời gian hiện tại
            trangThai: "Từ chối", // Trạng thái là 'Từ chối'
          }
        );
  
        if (response.status === 200) {
          alert("Phiếu đã được Từ chối thành công!");
          const updatedData = phieuDeXuat.filter(
            (phieu) => phieu.maPhieuDX !== maPhieuDX
          );
          setPhieuDeXuat(updatedData);
          setFilteredData(updatedData); // Cập nhật dữ liệu đã lọc
        } else {
          alert("Có lỗi xảy ra khi Từ chối phiếu.");
        }
      } catch (error) {
        alert("Có lỗi xảy ra khi Từ chối phiếu.");
        console.error("Error:", error);
      }
  };

  // Xử lý thay đổi bộ lọc trạng thái
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Danh sách Phiếu Đề Xuất
      </h1>

      {/* Bộ lọc trạng thái */}
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

      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Mã Phiếu</th>
            <th className="border border-gray-300 p-2">Tên Đăng Nhập</th>
            <th className="border border-gray-300 p-2">Trạng Thái</th>
            <th className="px-4 py-2 text-left">Ngày Tạo</th>
            <th className="border border-gray-300 p-2">Chi Tiết Đề Xuất</th>
            <th className="border border-gray-300 p-2">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((phieu) => (
              <tr key={phieu.maPhieuDX}>
                <td className="border border-gray-300 p-2">{phieu.maPhieuDX}</td>
                <td className="border border-gray-300 p-2">{phieu.userName}</td>
                <td className="border border-gray-300 p-2">{phieu.trangThai}</td>
                <td className="border border-gray-300 p-2">
                  {new Date(phieu.ngayTao).toLocaleString()}
                </td>
                <td className="border border-gray-300 p-2">
                  <ul>
                    {phieu.chiTietDeXuat.map((ct, index) => (
                      <li key={index}>
                        {ct.tenHoaChat} - Số lượng: {ct.soLuong} lọ - Đơn giá:{" "}
                        {ct.donGia}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border border-gray-300 p-2">
                  {phieu.trangThai === "Chờ duyệt" && (
                    <>
                      <button
                        onClick={() => handleApprove(phieu.maPhieuDX)}
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                      >
                        Duyệt
                      </button>
                      <button
                        onClick={() => handleTuChoi(phieu.maPhieuDX)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Từ chối
                      </button>
                    </>
                  )}
                  {phieu.trangThai === "Đã duyệt" && (
                    <>
                      <button
                        onClick={() => handleTuChoi(phieu.maPhieuDX)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Từ chối
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">
                Không có phiếu đề xuất nào để duyệt.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PhieuDeXuatDangChoDuyet;
