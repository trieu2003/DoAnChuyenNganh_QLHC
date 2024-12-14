// // // // import React, { useState, useEffect } from 'react';
// // // // import axios from 'axios';

// // // // const DashboardThongKe = () => {
// // // //   const [phieuThanhLys, setPhieuThanhLys] = useState([]);
// // // //   const [loHoaChats, setLoHoaChats] = useState([]);
// // // //   const [totalPhieuThanhLy, setTotalPhieuThanhLy] = useState(0);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);

// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       try {
// // // //         // Gọi các API thống kê
// // // //         const phieuThanhLyRes = await axios.get('https://localhost:7240/api/Statistics/phieu-thanh-ly-statistics');
// // // //         const loHoaChatRes = await axios.get('https://localhost:7240/api/Statistics/lo-hoa-chat-statistics');
// // // //         const totalPhieuRes = await axios.get('https://localhost:7240/api/Statistics/total-phieu-thanh-ly');

// // // //         setPhieuThanhLys(phieuThanhLyRes.data);
// // // //         setLoHoaChats(loHoaChatRes.data);
// // // //         setTotalPhieuThanhLy(totalPhieuRes.data);
// // // //         setLoading(false);
// // // //       } catch (error) {
// // // //         setError('Không thể tải dữ liệu');
// // // //         setLoading(false);
// // // //         console.error('Error fetching statistics:', error);
// // // //       }
// // // //     };

// // // //     fetchData();
// // // //   }, []);

// // // //   // Hàm hiển thị thống kê phiếu thanh lý
// // // //   const renderPhieuThanhLyStats = () => (
// // // //     <div className="bg-white p-4 shadow-md rounded-md mb-6">
// // // //       <h3 className="text-lg font-bold mb-2">Thống Kê Phiếu Thanh Lý</h3>
// // // //       <table className="min-w-full table-auto">
// // // //         <thead>
// // // //           <tr>
// // // //             <th className="px-4 py-2 border">Trạng Thái</th>
// // // //             <th className="px-4 py-2 border">Tổng Số Phiếu</th>
// // // //             <th className="px-4 py-2 border">Tổng Số Lượng</th>
// // // //           </tr>
// // // //         </thead>
// // // //         <tbody>
// // // //           {phieuThanhLys.map((stat, index) => (
// // // //             <tr key={index}>
// // // //               <td className="px-4 py-2 border">{stat.trangThai}</td>
// // // //               <td className="px-4 py-2 border">{stat.totalCount}</td>
// // // //               <td className="px-4 py-2 border">{stat.totalQuantity}</td>
// // // //             </tr>
// // // //           ))}
// // // //         </tbody>
// // // //       </table>
// // // //     </div>
// // // //   );

// // // //   // Hàm hiển thị thống kê lô hóa chất
// // // //   const renderLoHoaChatStats = () => (
// // // //     <div className="bg-white p-4 shadow-md rounded-md mb-6">
// // // //       <h3 className="text-lg font-bold mb-2">Thống Kê Lô Hóa Chất</h3>
// // // //       <table className="min-w-full table-auto">
// // // //         <thead>
// // // //           <tr>
// // // //             <th className="px-4 py-2 border">Trạng Thái</th>
// // // //             <th className="px-4 py-2 border">Tổng Số Lô</th>
// // // //             <th className="px-4 py-2 border">Tổng Số Lượng</th>
// // // //           </tr>
// // // //         </thead>
// // // //         <tbody>
// // // //           {loHoaChats.map((stat, index) => (
// // // //             <tr key={index}>
// // // //               <td className="px-4 py-2 border">{stat.trangThai}</td>
// // // //               <td className="px-4 py-2 border">{stat.totalCount}</td>
// // // //               <td className="px-4 py-2 border">{stat.totalQuantity}</td>
// // // //             </tr>
// // // //           ))}
// // // //         </tbody>
// // // //       </table>
// // // //     </div>
// // // //   );

// // // //   // Hàm hiển thị tổng số phiếu thanh lý
// // // //   const renderTotalPhieuThanhLy = () => (
// // // //     <div className="bg-white p-4 shadow-md rounded-md mb-6">
// // // //       <h3 className="text-lg font-bold mb-2">Tổng Số Phiếu Thanh Lý</h3>
// // // //       <p className="text-xl">{totalPhieuThanhLy}</p>
// // // //     </div>
// // // //   );

// // // //   // Hiển thị trạng thái loading hoặc lỗi
// // // //   if (loading) return <div className="text-center">Đang tải dữ liệu...</div>;
// // // //   if (error) return <div className="text-center text-red-500">{error}</div>;

// // // //   return (
// // // //     <div className="p-6">
// // // //       <h2 className="text-2xl font-bold mb-4">Thống Kê Quản Lý Hóa Chất</h2>
// // // //       {renderTotalPhieuThanhLy()}
// // // //       {renderPhieuThanhLyStats()}
// // // //       {renderLoHoaChatStats()}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default DashboardThongKe;
// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { Bar } from 'react-chartjs-2';
// // // import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// // // ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// // // const DashboardThongKe = () => {
// // //   const [phieuThanhLys, setPhieuThanhLys] = useState([]);
// // //   const [loHoaChats, setLoHoaChats] = useState([]);
// // //   const [totalPhieuThanhLy, setTotalPhieuThanhLy] = useState(0);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         // Gọi các API thống kê
// // //         const phieuThanhLyRes = await axios.get('https://localhost:7240/api/Statistics/phieu-thanh-ly-statistics');
// // //         const loHoaChatRes = await axios.get('https://localhost:7240/api/Statistics/lo-hoa-chat-statistics');
// // //         const totalPhieuRes = await axios.get('https://localhost:7240/api/Statistics/total-phieu-thanh-ly');

// // //         setPhieuThanhLys(phieuThanhLyRes.data);
// // //         setLoHoaChats(loHoaChatRes.data);
// // //         setTotalPhieuThanhLy(totalPhieuRes.data);
// // //         setLoading(false);
// // //       } catch (error) {
// // //         setError('Không thể tải dữ liệu');
// // //         setLoading(false);
// // //         console.error('Error fetching statistics:', error);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, []);

// // //   // Hàm hiển thị thống kê phiếu thanh lý
// // //   const renderPhieuThanhLyStats = () => (
// // //     <div className="bg-white p-4 shadow-md rounded-md mb-6">
// // //       <h3 className="text-lg font-bold mb-2">Thống Kê Phiếu Thanh Lý</h3>
// // //       {/* Bảng */}
// // //       <table className="min-w-full table-auto mb-4">
// // //         <thead>
// // //           <tr>
// // //             <th className="px-4 py-2 border">Trạng Thái</th>
// // //             <th className="px-4 py-2 border">Tổng Số Phiếu</th>
// // //             <th className="px-4 py-2 border">Tổng Số Lượng</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {phieuThanhLys.map((stat, index) => (
// // //             <tr key={index}>
// // //               <td className="px-4 py-2 border">{stat.trangThai}</td>
// // //               <td className="px-4 py-2 border">{stat.totalCount}</td>
// // //               <td className="px-4 py-2 border">{stat.totalQuantity}</td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>

// // //       {/* Biểu đồ */}
// // //       <Bar
// // //         data={{
// // //           labels: phieuThanhLys.map(stat => stat.trangThai),
// // //           datasets: [
// // //             {
// // //               label: 'Số Phiếu Thanh Lý',
// // //               data: phieuThanhLys.map(stat => stat.totalCount),
// // //               backgroundColor: 'rgba(75, 192, 192, 0.6)',
// // //               borderColor: 'rgba(75, 192, 192, 1)',
// // //               borderWidth: 1,
// // //             },
// // //           ],
// // //         }}
// // //         options={{
// // //           responsive: true,
// // //           scales: {
// // //             y: {
// // //               beginAtZero: true,
// // //             },
// // //           },
// // //         }}
// // //       />
// // //     </div>
// // //   );

// // //   // Hàm hiển thị thống kê lô hóa chất
// // //   const renderLoHoaChatStats = () => (
// // //     <div className="bg-white p-4 shadow-md rounded-md mb-6">
// // //       <h3 className="text-lg font-bold mb-2">Thống Kê Lô Hóa Chất</h3>
// // //       {/* Bảng */}
// // //       <table className="min-w-full table-auto mb-4">
// // //         <thead>
// // //           <tr>
// // //             <th className="px-4 py-2 border">Trạng Thái</th>
// // //             <th className="px-4 py-2 border">Tổng Số Lô</th>
// // //             <th className="px-4 py-2 border">Tổng Số Lượng</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {loHoaChats.map((stat, index) => (
// // //             <tr key={index}>
// // //               <td className="px-4 py-2 border">{stat.trangThai}</td>
// // //               <td className="px-4 py-2 border">{stat.totalCount}</td>
// // //               <td className="px-4 py-2 border">{stat.totalQuantity}</td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>

// // //       {/* Biểu đồ */}
// // //       <Bar
// // //         data={{
// // //           labels: loHoaChats.map(stat => stat.trangThai),
// // //           datasets: [
// // //             {
// // //               label: 'Số Lô Hóa Chất',
// // //               data: loHoaChats.map(stat => stat.totalCount),
// // //               backgroundColor: 'rgba(153, 102, 255, 0.6)',
// // //               borderColor: 'rgba(153, 102, 255, 1)',
// // //               borderWidth: 1,
// // //             },
// // //           ],
// // //         }}
// // //         options={{
// // //           responsive: true,
// // //           scales: {
// // //             y: {
// // //               beginAtZero: true,
// // //             },
// // //           },
// // //         }}
// // //       />
// // //     </div>
// // //   );

// // //   // Hàm hiển thị tổng số phiếu thanh lý
// // //   const renderTotalPhieuThanhLy = () => (
// // //     <div className="bg-white p-4 shadow-md rounded-md mb-6">
// // //       <h3 className="text-lg font-bold mb-2">Tổng Số Phiếu Thanh Lý</h3>
// // //       <p className="text-xl">{totalPhieuThanhLy}</p>
// // //     </div>
// // //   );

// // //   // Hiển thị trạng thái loading hoặc lỗi
// // //   if (loading) return <div className="text-center">Đang tải dữ liệu...</div>;
// // //   if (error) return <div className="text-center text-red-500">{error}</div>;

// // //   return (
// // //     <div className="p-6">
// // //       <h2 className="text-2xl font-bold mb-4">Thống Kê Quản Lý Hóa Chất</h2>
// // //       {renderTotalPhieuThanhLy()}
// // //       {renderPhieuThanhLyStats()}
// // //       {renderLoHoaChatStats()}
// // //     </div>
// // //   );
// // // };

// // // export default DashboardThongKe;
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { Bar } from 'react-chartjs-2';
// // import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// // ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// // const DashboardThongKe = () => {
// //   const [phieuThanhLys, setPhieuThanhLys] = useState([]);
// //   const [loHoaChats, setLoHoaChats] = useState([]);
// //   const [totalPhieuThanhLy, setTotalPhieuThanhLy] = useState(0);
// //   const [selectedStat, setSelectedStat] = useState('phieu-thanh-ly'); // Đặt mặc định là 'phieu-thanh-ly'
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         // Gọi các API thống kê
// //         const phieuThanhLyRes = await axios.get('https://localhost:7240/api/Statistics/phieu-thanh-ly-statistics');
// //         const loHoaChatRes = await axios.get('https://localhost:7240/api/Statistics/lo-hoa-chat-statistics');
// //         const totalPhieuRes = await axios.get('https://localhost:7240/api/Statistics/total-phieu-thanh-ly');

// //         setPhieuThanhLys(phieuThanhLyRes.data);
// //         setLoHoaChats(loHoaChatRes.data);
// //         setTotalPhieuThanhLy(totalPhieuRes.data);
// //         setLoading(false);
// //       } catch (error) {
// //         setError('Không thể tải dữ liệu');
// //         setLoading(false);
// //         console.error('Error fetching statistics:', error);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   // Hàm hiển thị thống kê phiếu thanh lý
// //   const renderPhieuThanhLyStats = () => (
// //     <div className="bg-white p-4 shadow-md rounded-md mb-6">
// //       <h3 className="text-lg font-bold mb-2">Thống Kê Phiếu Thanh Lý</h3>
// //       {/* Bảng */}
// //       <table className="min-w-full table-auto mb-4">
// //         <thead>
// //           <tr>
// //             <th className="px-4 py-2 border">Trạng Thái</th>
// //             <th className="px-4 py-2 border">Tổng Số Phiếu</th>
// //             <th className="px-4 py-2 border">Tổng Số Lượng</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {phieuThanhLys.map((stat, index) => (
// //             <tr key={index}>
// //               <td className="px-4 py-2 border">{stat.trangThai}</td>
// //               <td className="px-4 py-2 border">{stat.totalCount}</td>
// //               <td className="px-4 py-2 border">{stat.totalQuantity}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {/* Biểu đồ */}
// //       <Bar
// //         data={{
// //           labels: phieuThanhLys.map(stat => stat.trangThai),
// //           datasets: [
// //             {
// //               label: 'Số Phiếu Thanh Lý',
// //               data: phieuThanhLys.map(stat => stat.totalCount),
// //               backgroundColor: 'rgba(75, 192, 192, 0.6)',
// //               borderColor: 'rgba(75, 192, 192, 1)',
// //               borderWidth: 1,
// //             },
// //           ],
// //         }}
// //         options={{
// //           responsive: true,
// //           scales: {
// //             y: {
// //               beginAtZero: true,
// //             },
// //           },
// //         }}
// //       />
// //     </div>
// //   );

// //   // Hàm hiển thị thống kê lô hóa chất
// //   const renderLoHoaChatStats = () => (
// //     <div className="bg-white p-4 shadow-md rounded-md mb-6">
// //       <h3 className="text-lg font-bold mb-2">Thống Kê Lô Hóa Chất</h3>
// //       {/* Bảng */}
// //       <table className="min-w-full table-auto mb-4">
// //         <thead>
// //           <tr>
// //             <th className="px-4 py-2 border">Trạng Thái</th>
// //             <th className="px-4 py-2 border">Tổng Số Lô</th>
// //             <th className="px-4 py-2 border">Tổng Số Lượng</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {loHoaChats.map((stat, index) => (
// //             <tr key={index}>
// //               <td className="px-4 py-2 border">{stat.trangThai}</td>
// //               <td className="px-4 py-2 border">{stat.totalCount}</td>
// //               <td className="px-4 py-2 border">{stat.totalQuantity}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {/* Biểu đồ */}
// //       <Bar
// //         data={{
// //           labels: loHoaChats.map(stat => stat.trangThai),
// //           datasets: [
// //             {
// //               label: 'Số Lô Hóa Chất',
// //               data: loHoaChats.map(stat => stat.totalCount),
// //               backgroundColor: 'rgba(153, 102, 255, 0.6)',
// //               borderColor: 'rgba(153, 102, 255, 1)',
// //               borderWidth: 1,
// //             },
// //           ],
// //         }}
// //         options={{
// //           responsive: true,
// //           scales: {
// //             y: {
// //               beginAtZero: true,
// //             },
// //           },
// //         }}
// //       />
// //     </div>
// //   );

// //   // Hàm hiển thị tổng số phiếu thanh lý
// //   const renderTotalPhieuThanhLy = () => (
// //     <div className="bg-white p-4 shadow-md rounded-md mb-6">
// //       <h3 className="text-lg font-bold mb-2">Tổng Số Phiếu Thanh Lý</h3>
// //       <p className="text-xl">{totalPhieuThanhLy}</p>
// //     </div>
// //   );

// //   // Hàm xử lý thay đổi lựa chọn thống kê
// //   const handleChange = (e) => {
// //     setSelectedStat(e.target.value);
// //   };

// //   // Hiển thị trạng thái loading hoặc lỗi
// //   if (loading) return <div className="text-center">Đang tải dữ liệu...</div>;
// //   if (error) return <div className="text-center text-red-500">{error}</div>;

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-2xl font-bold mb-4">Thống Kê Quản Lý Hóa Chất</h2>

// //       {/* Dropdown (ComboBox) cho lựa chọn thống kê */}
// //       <div className="mb-6">
// //         <label htmlFor="statistics" className="block text-sm font-medium text-gray-700">Chọn thống kê</label>
// //         <select
// //           id="statistics"
// //           value={selectedStat}
// //           onChange={handleChange}
// //           className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
// //         >
// //           <option value="phieu-thanh-ly">Phiếu Thanh Lý</option>
// //           <option value="lo-hoa-chat">Lô Hóa Chất</option>
// //           <option value="total-phieu">Tổng Số Phiếu Thanh Lý</option>
// //         </select>
// //       </div>

// //       {/* Hiển thị theo mục thống kê đã chọn */}
// //       {selectedStat === 'phieu-thanh-ly' && renderPhieuThanhLyStats()}
// //       {selectedStat === 'lo-hoa-chat' && renderLoHoaChatStats()}
// //       {selectedStat === 'total-phieu' && renderTotalPhieuThanhLy()}
// //     </div>
// //   );
// // };

// // export default DashboardThongKe;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { FaChartBar, FaFileInvoice, FaBoxes } from 'react-icons/fa'; // Import React icons

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const DashboardThongKe = () => {
//   const [phieuThanhLys, setPhieuThanhLys] = useState([]);
//   const [loHoaChats, setLoHoaChats] = useState([]);
//   const [totalPhieuThanhLy, setTotalPhieuThanhLy] = useState(0);
//   const [selectedStat, setSelectedStat] = useState('phieu-thanh-ly'); // Default selection
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const phieuThanhLyRes = await axios.get('https://localhost:7240/api/Statistics/phieu-thanh-ly-statistics');
//         const loHoaChatRes = await axios.get('https://localhost:7240/api/Statistics/lo-hoa-chat-statistics');
//         const totalPhieuRes = await axios.get('https://localhost:7240/api/Statistics/total-phieu-thanh-ly');

//         setPhieuThanhLys(phieuThanhLyRes.data);
//         setLoHoaChats(loHoaChatRes.data);
//         setTotalPhieuThanhLy(totalPhieuRes.data);
//         setLoading(false);
//       } catch (error) {
//         setError('Không thể tải dữ liệu');
//         setLoading(false);
//         console.error('Error fetching statistics:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Hàm hiển thị thống kê phiếu thanh lý
//   const renderPhieuThanhLyStats = () => (
//     <div className="bg-white p-6 shadow-lg rounded-md mb-6 hover:scale-105 transition-all duration-300 ease-in-out">
//       <h3 className="text-lg font-bold mb-4 flex items-center">
//         <FaFileInvoice className="mr-2 text-blue-500" /> Thống Kê Phiếu Thanh Lý
//       </h3>
//       <table className="min-w-full table-auto mb-4">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="px-4 py-2 border">Trạng Thái</th>
//             <th className="px-4 py-2 border">Tổng Số Phiếu</th>
//             <th className="px-4 py-2 border">Tổng Số Lượng</th>
//           </tr>
//         </thead>
//         <tbody>
//           {phieuThanhLys.map((stat, index) => (
//             <tr key={index} className="hover:bg-gray-100">
//               <td className="px-4 py-2 border">{stat.trangThai}</td>
//               <td className="px-4 py-2 border">{stat.totalCount}</td>
//               <td className="px-4 py-2 border">{stat.totalQuantity}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Biểu đồ */}
//       <Bar
//         data={{
//           labels: phieuThanhLys.map(stat => stat.trangThai),
//           datasets: [
//             {
//               label: 'Số Phiếu Thanh Lý',
//               data: phieuThanhLys.map(stat => stat.totalCount),
//               backgroundColor: 'rgba(75, 192, 192, 0.6)',
//               borderColor: 'rgba(75, 192, 192, 1)',
//               borderWidth: 1,
//             },
//           ],
//         }}
//         options={{
//           responsive: true,
//           scales: {
//             y: {
//               beginAtZero: true,
//             },
//           },
//         }}
//       />
//     </div>
//   );

//   // Hàm hiển thị thống kê lô hóa chất
//   const renderLoHoaChatStats = () => (
//     <div className="bg-white p-6 shadow-lg rounded-md mb-6 hover:scale-105 transition-all duration-300 ease-in-out">
//       <h3 className="text-lg font-bold mb-4 flex items-center">
//         <FaBoxes className="mr-2 text-purple-500" /> Thống Kê Lô Hóa Chất
//       </h3>
//       <table className="min-w-full table-auto mb-4">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="px-4 py-2 border">Trạng Thái</th>
//             <th className="px-4 py-2 border">Tổng Số Lô</th>
//             <th className="px-4 py-2 border">Tổng Số Lượng</th>
//           </tr>
//         </thead>
//         <tbody>
//           {loHoaChats.map((stat, index) => (
//             <tr key={index} className="hover:bg-gray-100">
//               <td className="px-4 py-2 border">{stat.trangThai}</td>
//               <td className="px-4 py-2 border">{stat.totalCount}</td>
//               <td className="px-4 py-2 border">{stat.totalQuantity}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Biểu đồ */}
//       <Bar
//         data={{
//           labels: loHoaChats.map(stat => stat.trangThai),
//           datasets: [
//             {
//               label: 'Số Lô Hóa Chất',
//               data: loHoaChats.map(stat => stat.totalCount),
//               backgroundColor: 'rgba(153, 102, 255, 0.6)',
//               borderColor: 'rgba(153, 102, 255, 1)',
//               borderWidth: 1,
//             },
//           ],
//         }}
//         options={{
//           responsive: true,
//           scales: {
//             y: {
//               beginAtZero: true,
//             },
//           },
//         }}
//       />
//     </div>
//   );

//   // Hàm hiển thị tổng số phiếu thanh lý
//   const renderTotalPhieuThanhLy = () => (
//     <div className="bg-white p-6 shadow-lg rounded-md mb-6 hover:scale-105 transition-all duration-300 ease-in-out">
//       <h3 className="text-lg font-bold mb-4 flex items-center">
//         <FaChartBar className="mr-2 text-green-500" /> Tổng Số Phiếu Thanh Lý
//       </h3>
//       <p className="text-2xl font-semibold text-gray-700">{totalPhieuThanhLy}</p>
//     </div>
//   );

//   // Hàm xử lý thay đổi lựa chọn thống kê
//   const handleChange = (e) => {
//     setSelectedStat(e.target.value);
//   };

//   // Hiển thị trạng thái loading hoặc lỗi
//   if (loading) return <div className="text-center">Đang tải dữ liệu...</div>;
//   if (error) return <div className="text-center text-red-500">{error}</div>;

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-6 text-center">Thống Kê Quản Lý Hóa Chất</h2>

//       {/* Dropdown cho lựa chọn thống kê */}
//       <div className="mb-6">
//         <label htmlFor="statistics" className="block text-sm font-medium text-gray-700">Chọn thống kê</label>
//         <select
//           id="statistics"
//           value={selectedStat}
//           onChange={handleChange}
//           className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="phieu-thanh-ly">Phiếu Thanh Lý</option>
//           <option value="lo-hoa-chat">Lô Hóa Chất</option>
//           <option value="total-phieu">Tổng Số Phiếu Thanh Lý</option>
//         </select>
//       </div>

//       {/* Hiển thị bảng thống kê tương ứng */}
//       {selectedStat === 'phieu-thanh-ly' && renderPhieuThanhLyStats()}
//       {selectedStat === 'lo-hoa-chat' && renderLoHoaChatStats()}
//       {selectedStat === 'total-phieu' && renderTotalPhieuThanhLy()}
//     </div>
//   );
// };

// export default DashboardThongKe;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaChartBar, FaFileInvoice, FaBoxes, FaCogs } from 'react-icons/fa'; // Import React icons
import ExportExcel from './ExportExcel';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardThongKe = () => {
  const [phieuThanhLys, setPhieuThanhLys] = useState([]);
  const [loHoaChats, setLoHoaChats] = useState([]);
  const [totalPhieuThanhLy, setTotalPhieuThanhLy] = useState(0);
  const [hoaChatStats, setHoaChatStats] = useState([]);
  const [selectedStat, setSelectedStat] = useState('phieu-thanh-ly'); // Default selection
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const phieuThanhLyRes = await axios.get('https://localhost:7240/api/Statistics/phieu-thanh-ly-statistics');
        const loHoaChatRes = await axios.get('https://localhost:7240/api/Statistics/lo-hoa-chat-statistics');
         const hoaChatRes = await axios.get('https://localhost:7240/api/Statistics/hoa-chat-statistics');
        const totalPhieuRes = await axios.get('https://localhost:7240/api/Statistics/total-phieu-thanh-ly');

        setPhieuThanhLys(phieuThanhLyRes.data);
        setLoHoaChats(loHoaChatRes.data);
       setHoaChatStats(hoaChatRes.data);
        setTotalPhieuThanhLy(totalPhieuRes.data);
        setLoading(false);
      } catch (error) {
        setError('Không thể tải dữ liệu');
        setLoading(false);
        console.error('Error fetching statistics:', error);
      }
    };

    fetchData();
  }, []);

  // Hàm hiển thị thống kê hóa chất
  const renderHoaChatStats = () => (
    <div className="bg-white p-6 shadow-lg rounded-md mb-6 hover:scale-105 transition-all duration-300 ease-in-out">
      <h3 className="text-lg font-bold mb-4 flex items-center">
        <FaCogs className="mr-2 text-indigo-500" /> Thống Kê Hóa Chất 
      </h3>
     
      <table className="min-w-full table-auto mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Mã Hóa Chất</th>
            <th className="px-4 py-2 border">Tên Hóa Chất</th>
            <th className="px-4 py-2 border">Tổng Số Lượng</th>
          </tr>
        </thead>
        <tbody>
          {hoaChatStats.map((stat, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-4 py-2 border">{stat.maHoaChat}</td>
              <td className="px-4 py-2 border">{stat.tenHoaChat}</td>
              <td className="px-4 py-2 border">{stat.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Biểu đồ */}
      <Bar
        data={{
          labels: hoaChatStats.map(stat => stat.tenHoaChat),
          datasets: [
            {
              label: 'Số Lượng Hóa Chất',
              data: hoaChatStats.map(stat => stat.totalQuantity),
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
          ],
        }}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );

  // Hàm hiển thị thống kê phiếu thanh lý
  const renderPhieuThanhLyStats = () => (
    <div className="bg-white p-6 shadow-lg rounded-md mb-6 hover:scale-105 transition-all duration-300 ease-in-out">
      <h3 className="text-lg font-bold mb-4 flex items-center">
        <FaFileInvoice className="mr-2 text-blue-500" /> Thống Kê Phiếu Thanh Lý
      </h3>
      <table className="min-w-full table-auto mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Trạng Thái</th>
            <th className="px-4 py-2 border">Tổng Số Phiếu</th>
            <th className="px-4 py-2 border">Tổng Số Lượng</th>
          </tr>
        </thead>
        <tbody>
          {phieuThanhLys.map((stat, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-4 py-2 border">{stat.trangThai}</td>
              <td className="px-4 py-2 border">{stat.totalCount}</td>
              <td className="px-4 py-2 border">{stat.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Biểu đồ */}
      <Bar
        data={{
          labels: phieuThanhLys.map(stat => stat.trangThai),
          datasets: [
            {
              label: 'Số Phiếu Thanh Lý',
              data: phieuThanhLys.map(stat => stat.totalCount),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        }}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );

  // Hàm hiển thị thống kê lô hóa chất
  const renderLoHoaChatStats = () => (
    <div className="bg-white p-6 shadow-lg rounded-md mb-6 hover:scale-105 transition-all duration-300 ease-in-out">
      <h3 className="text-lg font-bold mb-4 flex items-center">
        <FaBoxes className="mr-2 text-purple-500" /> Thống Kê Lô Hóa Chất
      </h3>
      <table className="min-w-full table-auto mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Trạng Thái</th>
            <th className="px-4 py-2 border">Tổng Số Lô</th>
            <th className="px-4 py-2 border">Tổng Số Lượng</th>
          </tr>
        </thead>
        <tbody>
          {loHoaChats.map((stat, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-4 py-2 border">{stat.trangThai}</td>
              <td className="px-4 py-2 border">{stat.totalCount}</td>
              <td className="px-4 py-2 border">{stat.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Biểu đồ */}
      <Bar
        data={{
          labels: loHoaChats.map(stat => stat.trangThai),
          datasets: [
            {
              label: 'Số Lô Hóa Chất',
              data: loHoaChats.map(stat => stat.totalCount),
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
          ],
        }}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );

  // Hàm hiển thị tổng số phiếu thanh lý
  const renderTotalPhieuThanhLy = () => (
    <div className="bg-white p-6 shadow-lg rounded-md mb-6 hover:scale-105 transition-all duration-300 ease-in-out">
      <h3 className="text-lg font-bold mb-4 flex items-center">
        <FaChartBar className="mr-2 text-green-500" /> Tổng Số Phiếu Thanh Lý
      </h3>
      <p className="text-2xl font-semibold text-gray-700">{totalPhieuThanhLy}</p>
    </div>
  );

  // Hàm xử lý thay đổi lựa chọn thống kê
  const handleChange = (e) => {
    setSelectedStat(e.target.value);
  };

  // Hiển thị trạng thái loading hoặc lỗi
  if (loading) return <div className="text-center">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Thống Kê Quản Lý Hóa Chất</h2>
      <ExportExcel />
      {/* Dropdown cho lựa chọn thống kê */}
      <div className="mb-6">
        <label htmlFor="statistics" className="block text-sm font-medium text-gray-700">Chọn thống kê</label>
        <select
          id="statistics"
          value={selectedStat}
          onChange={handleChange}
          className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="phieu-thanh-ly">Phiếu Thanh Lý</option>
          <option value="lo-hoa-chat">Lô Hóa Chất</option>
          <option value="hoa-chat">Hóa Chất</option>
          <option value="total-phieu">Tổng Số Phiếu Thanh Lý</option>
        </select>
      </div>

      {/* Hiển thị bảng thống kê tương ứng */}
      {selectedStat === 'phieu-thanh-ly' && renderPhieuThanhLyStats()}
      {selectedStat === 'lo-hoa-chat' && renderLoHoaChatStats()}
      {selectedStat === 'hoa-chat' && renderHoaChatStats()}
      {selectedStat === 'total-phieu' && renderTotalPhieuThanhLy()}
    </div>
  );
};

export default DashboardThongKe;
