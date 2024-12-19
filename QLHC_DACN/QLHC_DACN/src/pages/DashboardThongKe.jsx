import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaChartBar, FaFileInvoice, FaBoxes, FaCogs } from 'react-icons/fa';
import ExportExcel from './ExportExcel';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardThongKe = () => {
  const [phieuThanhLys, setPhieuThanhLys] = useState([]);
  const [loHoaChats, setLoHoaChats] = useState([]);
  const [hoaChatStats, setHoaChatStats] = useState([]);
  const [hoaChatSuDung, setHoaChatSuDung] = useState([]);
  const [hoaChatTonKho, setHoaChatTonKho] = useState([]);
  const [hoaChatSapHetHan, setHoaChatSapHetHan] = useState([]);
  const [totalPhieuThanhLy, setTotalPhieuThanhLy] = useState(0);

  const [selectedStat, setSelectedStat] = useState('phieu-thanh-ly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [soNgayCanhBao, setSoNgayCanhBao] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debounceTimer, setDebounceTimer] = useState(null); // Timer để debounce

  useEffect(() => {
    const fetchData = async () => {
      try {
        const phieuThanhLyRes = await axios.get('https://localhost:7240/api/Statistics/phieu-thanh-ly-statistics');
        const loHoaChatRes = await axios.get('https://localhost:7240/api/Statistics/lo-hoa-chat-statistics');
        const hoaChatRes = await axios.get('https://localhost:7240/api/Statistics/hoa-chat-statistics');
        const hoaChatTonKhoRes = await axios.get('https://localhost:7240/api/Statistics/hoa-chat-ton-kho');
        const hoaChatSapHetHanRes = await axios.get(
          `https://localhost:7240/api/Statistics/hoa-chat-sap-het-han?soNgayCanhBao=${soNgayCanhBao}`
        );
        const totalPhieuRes = await axios.get('https://localhost:7240/api/Statistics/total-phieu-thanh-ly');

        setPhieuThanhLys(phieuThanhLyRes.data);
        setLoHoaChats(loHoaChatRes.data);
        setHoaChatStats(hoaChatRes.data);
        setHoaChatTonKho(hoaChatTonKhoRes.data);
        setHoaChatSapHetHan(hoaChatSapHetHanRes.data);
        setTotalPhieuThanhLy(totalPhieuRes.data);

        setLoading(false);
      } catch (error) {
        setError('Không thể tải dữ liệu');
        setLoading(false);
        console.error('Error fetching statistics:', error);
      }
    };

    fetchData();
  }, [soNgayCanhBao]);

  const fetchHoaChatSuDung = async () => {
    if (!startDate || !endDate) {
      setError('Vui lòng chọn ngày bắt đầu và ngày kết thúc');
      return;
    }
    try {
      const hoaChatSuDungRes = await axios.get(
        `https://localhost:7240/api/Statistics/hoa-chat-su-dung?startDate=${startDate}&endDate=${endDate}`
      );
      setHoaChatSuDung(hoaChatSuDungRes.data);
      setError(null);
    } catch (error) {
      setError('Không thể tải dữ liệu hóa chất sử dụng');
      console.error('Error fetching Hoa Chat Su Dung:', error);
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>{error}</div>;

  const renderPhieuThanhLyStats = () => (
    <div className="bg-white p-6 shadow-lg rounded-md mb-6">
      <h3 className="text-lg font-bold mb-4">
        <FaFileInvoice className="mr-2 text-blue-500" /> Thống Kê Phiếu Thanh Lý
      </h3>
      <table className="min-w-full table-auto mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Trạng Thái</th>
            <th className="px-4 py-2">Tổng Số Phiếu</th>
            <th className="px-4 py-2">Tổng Số Lượng</th>
          </tr>
        </thead>
        <tbody>
          {phieuThanhLys.map((stat, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{stat.trangThai}</td>
              <td className="px-4 py-2">{stat.totalCount}</td>
              <td className="px-4 py-2">{stat.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderLoHoaChatStats = () => (
    <div className="bg-white p-6 shadow-lg rounded-md mb-6">
      <h3 className="text-lg font-bold mb-4">
        <FaBoxes className="mr-2 text-purple-500" /> Thống Kê Lô Hóa Chất
      </h3>
      <table className="min-w-full table-auto mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Trạng Thái</th>
            <th className="px-4 py-2">Tổng Số Lô</th>
            <th className="px-4 py-2">Tổng Số Lượng</th>
          </tr>
        </thead>
        <tbody>
          {loHoaChats.map((stat, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{stat.trangThai}</td>
              <td className="px-4 py-2">{stat.totalCount}</td>
              <td className="px-4 py-2">{stat.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderHoaChatStats = () => (
    <div className="bg-white p-6 shadow-lg rounded-md mb-6">
      <h3 className="text-lg font-bold mb-4">
        <FaCogs className="mr-2 text-indigo-500" /> Thống Kê Hóa Chất
      </h3>
      <table className="min-w-full table-auto mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Mã Hóa Chất</th>
            <th className="px-4 py-2">Tên Hóa Chất</th>
            <th className="px-4 py-2">Tổng Số Lượng</th>
          </tr>
        </thead>
        <tbody>
          {hoaChatStats.map((stat, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{stat.maHoaChat}</td>
              <td className="px-4 py-2">{stat.tenHoaChat}</td>
              <td className="px-4 py-2">{stat.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderHoaChatSuDung = () => (
    <div className="bg-white p-6 shadow-lg rounded-md mb-6">
      <h3 className="text-lg font-bold mb-4">
        <FaCogs className="mr-2 text-indigo-500" /> Thống Kê Hóa Chất Sử Dụng
      </h3>
      <div className="mb-4">
        <label>Ngày bắt đầu:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded-md px-2 py-1 mx-2"
        />
        <label>Ngày kết thúc:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded-md px-2 py-1 mx-2"
        />
        <button
          onClick={fetchHoaChatSuDung}
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
        >
          Lọc
        </button>
      </div>
      <table className="min-w-full table-auto mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Môn Học</th>
            <th className="px-4 py-2">Hóa Chất</th>
            <th className="px-4 py-2">Tổng Số Lượng</th>
          </tr>
        </thead>
        <tbody>
          {hoaChatSuDung.map((stat, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{stat.monHoc}</td>
              <td className="px-4 py-2">{stat.hoaChat}</td>
              <td className="px-4 py-2">{stat.tongSoLuongSuDung}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderHoaChatTonKho = () => (
    <div className="bg-white p-6 shadow-lg rounded-md mb-6">
      <h3 className="text-lg font-bold mb-4">
        <FaBoxes className="mr-2 text-purple-500" /> Thống Kê Hóa Chất Tồn Kho
      </h3>
      <table className="min-w-full table-auto mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Hóa Chất</th>
            <th className="px-4 py-2">Mã CAS</th>
            <th className="px-4 py-2">Tổng Số Lượng Tồn</th>
            <th className="px-4 py-2">Số Lô</th>
          </tr>
        </thead>
        <tbody>
          {hoaChatTonKho.map((stat, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{stat.hoaChat}</td>
              <td className="px-4 py-2">{stat.maCAS}</td>
              <td className="px-4 py-2">{stat.tongSoLuongTon}</td>
              <td className="px-4 py-2">{stat.soLoHoaChat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  // Hàm gọi API
  const fetchHoaChatSapHetHan = (days) => {
    axios
      .get(`https://localhost:7240/api/Statistics/hoa-chat-sap-het-han?soNgayCanhBao=${days}`)
      .then((response) => {
        setHoaChatSapHetHan(response.data);
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError('Không thể tải dữ liệu hóa chất sắp hết hạn!');
      });
  };

  // Hàm render Thống Kê Hóa Chất Sắp Hết Hạn
  const renderHoaChatSapHetHan = () => (
    <div className="bg-white p-6 shadow-lg rounded-md mb-6">
      <h3 className="text-lg font-bold mb-4 flex items-center">
        <FaCogs className="mr-2 text-red-500" /> Thống Kê Hóa Chất Sắp Hết Hạn
      </h3>
      <label className="block mb-2">
        Cảnh báo trước (ngày):{' '}
        <input
          type="number"
          value={soNgayCanhBao === 0 ? '' : soNgayCanhBao} // Hiển thị rỗng nếu giá trị là 0
          onChange={(e) => {
            const value = e.target.value;
            const parsedValue = parseInt(value, 10);

            if (value === '' || parsedValue >= 0) {
              // Cho phép nhập giá trị rỗng hoặc số dương
              setSoNgayCanhBao(value === '' ? 0 : parsedValue);
              setError(null);

              // Xóa debounceTimer trước đó nếu có
              if (debounceTimer) {
                clearTimeout(debounceTimer);
              }

              // Đặt debounceTimer mới để gọi API sau 2 giây
              const timer = setTimeout(() => {
                fetchHoaChatSapHetHan(value === '' ? 0 : parsedValue);
              }, 2000);

              setDebounceTimer(timer);
            } else {
              // Nếu nhập số âm, đặt giá trị về 0
              setSoNgayCanhBao(value === '' ? 0 : parsedValue);
              setError(null);
            }
          }}
          placeholder="Nhập số ngày cảnh báo"
          className="border rounded-md px-2 py-1 mx-2"
        />
      </label>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <table className="min-w-full table-auto mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Tên Hóa Chất</th>
            <th className="px-4 py-2">Mã CAS</th>
            <th className="px-4 py-2">Mã Lô</th>
            <th className="px-4 py-2">Hạn Sử Dụng</th>
            <th className="px-4 py-2">Số Ngày Còn Lại</th>
            <th className="px-4 py-2">Số Lượng Tồn</th>
          </tr>
        </thead>
        <tbody>
          {hoaChatSapHetHan.map((stat, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{stat.hoaChat}</td>
              <td className="px-4 py-2">{stat.maCAS}</td>
              <td className="px-4 py-2">{stat.maLo}</td>
              <td className="px-4 py-2">{new Date(stat.hanSuDung).toLocaleDateString()}</td>
              <td className="px-4 py-2">{stat.soNgayConLai}</td>
              <td className="px-4 py-2">{stat.soLuongTon}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  

  const renderTotalPhieuThanhLy = () => (
    <div className="bg-white p-6 shadow-lg rounded-md mb-6">
      <h3 className="text-lg font-bold mb-4">
        <FaChartBar className="mr-2 text-green-500" /> Tổng Số Phiếu Thanh Lý
      </h3>
      <p className="text-2xl font-semibold text-gray-700">{totalPhieuThanhLy}</p>
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Thống Kê Quản Lý Hóa Chất</h2>
      <ExportExcel />
      <div className="mb-6">
        <select
          value={selectedStat}
          onChange={(e) => setSelectedStat(e.target.value)}
          className="border rounded-md px-4 py-2"
        >
          <option value="phieu-thanh-ly">Phiếu Thanh Lý</option>
          <option value="hoa-chat-su-dung">Hóa Chất Sử Dụng</option>
          <option value="hoa-chat-ton-kho">Hóa Chất Tồn Kho</option>
          <option value="hoa-chat-sap-het-han">Hóa Chất Sắp Hết Hạn</option>
          <option value="hoa-chat">Hóa Chất</option>
          <option value="lo-hoa-chat">Lô Hóa Chất</option>
          <option value="total-phieu">Tổng Số Phiếu Thanh Lý</option>
        </select>
      </div>

      {selectedStat === 'phieu-thanh-ly' && renderPhieuThanhLyStats()}
      {selectedStat === 'hoa-chat-su-dung' && renderHoaChatSuDung()}
      {selectedStat === 'hoa-chat-ton-kho' && renderHoaChatTonKho()}
      {selectedStat === 'hoa-chat-sap-het-han' && renderHoaChatSapHetHan()}
      {selectedStat === 'hoa-chat' && renderHoaChatStats()}
      {selectedStat === 'lo-hoa-chat' && renderLoHoaChatStats()}
      {selectedStat === 'total-phieu' && renderTotalPhieuThanhLy()}
    </div>
  );
};

export default DashboardThongKe;
