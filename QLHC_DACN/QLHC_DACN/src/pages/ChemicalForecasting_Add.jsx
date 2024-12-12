// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// const ChemicalForecasting_Add = () => {
//   const { selectedMaMon } = useParams();
//   const [monHocList, setMonHocList] = useState([]);
//   const [lopHocPhanList, setLopHocPhanList] = useState([]);
//   const [baiThiNghiemList, setBaiThiNghiemList] = useState([]);
//   const [selectedMonHoc, setSelectedMonHoc] = useState(null);
//   const [selectedLopHocPhan, setSelectedLopHocPhan] = useState(null);
//   const [selectedBaiThiNghiem, setSelectedBaiThiNghiem] = useState(null);
//   const [soLuong, setsoLuong] = useState(1);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");


//   //const [selectedMaMon, setSelectedMaMon] = useState('');

//   const [chemicalDetails, setChemicalDetails] = useState([
//     {
//       maHoaChat: 0,
//       tenHoaChat: "",
//       soLuong: 1,
//       searchQuery: "",
//       searchResults: [],
//     },
//   ]);

//   // Fetch MonHoc list
//   useEffect(() => {
//     axios
//       .get("https://localhost:7240/api/DuTru/monhoc")
//       .then((response) => setMonHocList(response.data))
//       .catch((error) => console.error("Error fetching MonHoc:", error));
//   }, []);

//   const handleMonHocChange = (selectedMaMon) => {
//     setSelectedMonHoc(selectedMaMon);
//     axios
//       .get(`https://localhost:7240/api/DuTru/lophocphan/${selectedMaMon}`)
//       .then((response) => setLopHocPhanList(response.data))
//       .catch((error) => console.error("Error fetching LopHocPhan:", error));
//   };
//   const fetchLopHocPhans = async (selectedMaMon) => {
//     if (!selectedMaMon) return;
//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.get(
//         `https://localhost:7240/api/DuTru/lophocphan/${selectedMaMon}`
//       );
//       setLopHocPhanList(response.data);
//     } catch (err) {
//       console.error("Lỗi khi lấy danh sách lớp học phần:", err);
//       setError("Không thể tải danh sách lớp học phần.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = async (index, query) => {
//     const updatedDetails = [...chemicalDetails];
//     updatedDetails[index].searchQuery = query;

//     if (query.length >= 2) {
//       try {
//         const response = await axios.get(
//           "https://localhost:7240/api/ChemicalManagement/Search",
//           { params: { searchTerm: query } }
//         );
//         updatedDetails[index].searchResults = response.data;
//         setChemicalDetails(updatedDetails);
//       } catch (error) {
//         console.error("Error fetching chemicals:", error);
//       }
//     } else {
//       updatedDetails[index].searchResults = [];
//       setChemicalDetails(updatedDetails);
//     }
//   };

//   const handleSelectChemical = (index, chemical) => {
//     const updatedDetails = [...chemicalDetails];
//     updatedDetails[index].maHoaChat = chemical.maHoaChat;
//     updatedDetails[index].tenHoaChat = chemical.tenHoaChat;
//     updatedDetails[index].donVi = chemical.donVi;
//     updatedDetails[index].searchResults = [];
//     updatedDetails[index].searchQuery = "";
//     setChemicalDetails(updatedDetails);
//   };

//   const handleAddDetail = () => {
//     setChemicalDetails([
//       ...chemicalDetails,
//       {
//         maHoaChat: 0,
//         tenHoaChat: "",
//         soLuong: 1,
//         searchQuery: "",
//         searchResults: [],
//       },
//     ]);
//   };

//   const handleRemoveDetail = (index) => {
//     const updatedDetails = [...chemicalDetails];
//     updatedDetails.splice(index, 1);
//     setChemicalDetails(updatedDetails);
//   };

//   const handleSubmit = () => {
//     console.log("selectedBaiThiNghiem:", selectedBaiThiNghiem);
//     console.log("soLuong:", soLuong);
//     console.log("chemicalDetails:", chemicalDetails);
//     if (
//       !selectedBaiThiNghiem ||
//       soLuong <= 0 ||
//       chemicalDetails.some((detail) => detail.maHoaChat === 0)
//     ) {
//       alert("Vui lòng chọn Bài thí nghiệm, thêm hoá chất và số lượng.");
//       return;
//     }

//     const newBaiThiNghiem = {
//         tenBaiTN: tenBaiThiNghiem, // Dùng tên bài thí nghiệm nhập từ form
//         maMon,
//       };

//     axios
//       .post("https://localhost:7240/api/DuTru/taoBaiTN", newBaiThiNghiem)
//       .then((response) => {
//         const baiTNId = response.data.maBaiTN;

//         // Create DuTru for each chemical
//         chemicalDetails.forEach((detail) => {
//           const newDuTru = {
//             maHoaChat: detail.maHoaChat,
//             maBaiTN: baiTNId,
//             soLuong: detail.soLuong,
//           };
//           axios
//             .post("https://localhost:7240/api/DuTru/taoDuTru", newDuTru)
//             .catch((error) => console.error("Error creating DuTru:", error));
//         });

//         alert("Tạo Dự trù thành công");
//       })
//       .catch((error) => console.error("Lỗi:", error));
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">
//         Tạo Dự trù hoá chất cho các môn học, các bài thí nghiệm
//       </h1>

      
//       <div className="mb-4">
//         Tạo dự trù cho môn {/* Hiển thị tên Môn từ mã đã truyền vào */}
//       </div>

//       {/* Lớp Học Phần List theo selectedMaMon đã được truyền */}
//       <div className="mb-4">
//       <table className="w-full border-collapse border border-gray-300 bg-white shadow-sm">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="border border-gray-300 p-3 text-left">Mã LHP</th>
//                   <th className="border border-gray-300 p-3 text-left">Giảng viên</th>
//                   <th className="border border-gray-300 p-3 text-left">Sĩ số</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {lopHocPhanList.map((lopHocPhan) => (
//                   <tr key={lopHocPhan.maLHP} className="hover:bg-gray-100">
//                     <td className="border border-gray-300 p-3">{lopHocPhan.maLHP}</td>
//                     <td className="border border-gray-300 p-3">{lopHocPhan.gvDay}</td>
//                     <td className="border border-gray-300 p-3">{lopHocPhan.siSo}</td>
//                   </tr>
//                 ))}
//                 {lopHocPhanList.length === 0 && (
//                   <tr>
//                     <td colSpan="3" className="text-center p-4 border border-gray-300">
//                       Không có lớp học phần nào.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//       </div>

//       {/* Bài Thí Nghiệm List */} {/* Chọn để thêm dự dù choa bài thí nghiệm đó, hoặc thêm mới bài thí nghiệm */} 
//       <div className="mb-4">
//         <label className="block mb-2 font-medium">Chọn Bài Thí Nghiệm</label>
//         <select
//           className="w-full p-2 border border-gray-300 rounded"
//           onChange={(e) => setSelectedBaiThiNghiem(e.target.value)}
//           value={selectedBaiThiNghiem}
//         >
//           <option value="">Chọn</option>
//           {baiThiNghiemList.map((baiTN) => (
//             <option key={baiTN.maBaiTN} value={baiTN.maBaiTN}>
//               {baiTN.tenBaiTN} - Môn học: {baiTN.tenMonHoc}
//             </option>
//           ))}
//         </select>
//       </div>
//       {/* Tên bài thí nghiệm */}
//       <div className="mb-4">
//         <label className="block mb-2 font-medium">Tên Bài Thí Nghiệm</label>
//         <input
//           type="text"
//           className="w-full p-2 border border-gray-300 rounded"
//           value={tenBaiThiNghiem}
//           onChange={(e) => setTenBaiThiNghiem(e.target.value)}
//         />
//       </div>

//       {/* Chi Tiết Hóa Chất */}
//       <div className="mb-4">
//         <button
//           onClick={handleAddDetail}
//           className="w-full bg-green-500 text-white py-2 rounded mb-4"
//         >
//           Thêm Hóa Chất
//         </button>

//         {chemicalDetails.map((detail, index) => (
//           <div key={index} className="mb-4">
//             <div className="relative mb-4">
//               <input
//                 type="text"
//                 value={detail.searchQuery}
//                 onChange={(e) => handleSearch(index, e.target.value)}
//                 placeholder="Tìm kiếm hóa chất..."
//                 className="w-full border-gray-300 p-2 rounded"
//               />
//               {detail.searchResults.length > 0 && (
//                 <ul className="absolute left-0 right-0 bg-white border rounded shadow max-h-40 overflow-y-auto z-10">
//                   {detail.searchResults.map((chemical) => (
//                     <li
//                       key={chemical.maHoaChat}
//                       className="p-2 cursor-pointer hover:bg-gray-100"
//                       onClick={() => handleSelectChemical(index, chemical)}
//                     >
//                       {chemical.tenHoaChat}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//             <div className="flex justify-between items-center">
//               <input
//                 type="text"
//                 value={detail.tenHoaChat}
//                 readOnly
//                 className="w-4/12 p-2 border rounded"
//               />
//               <input
//                 type="number"
//                 value={detail.soLuong}
//                 onChange={(e) => {
//                   setsoLuong(Number(e.target.value));
//                   const updatedDetails = [...chemicalDetails];
//                   updatedDetails[index].soLuong = e.target.value;
//                   setChemicalDetails(updatedDetails);
//                 }}
//                 min={1}
//                 className="w-3/12 p-2 border rounded"
//               />
//               {detail.donVi && (
//                 <span className="ml-2 text-gray-600 text-left">
//                   {detail.donVi}
//                 </span>
//               )}
//               <button
//                 onClick={() => handleRemoveDetail(index)}
//                 className="w-3/12 bg-red-500 text-white py-2 rounded"
//               >
//                 Xóa
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Submit Button */}
//       <button
//         onClick={handleSubmit}
//         className="w-full bg-blue-500 text-white py-2 rounded"
//       >
//         Tạo Dự Trù
//       </button>
//     </div>
//   );
// };

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import ClassList from "../components/ClassList";
// import ChemicalSearch from "../components/ChemicalSearch";

// const ChemicalForecasting_Add = () => {
//   const { selectedMaMon } = useParams();
//   const navigate = useNavigate();

//   const [tenBaiTN, setTenBaiTN] = useState("");
//   const [selectedClasses, setSelectedClasses] = useState([]);
//   const [chiTietDeXuat, setChiTietDeXuat] = useState([]);

//   useEffect(() => {
//     // Fetch classes for the selected MaMon
//     axios
//       .get(`https://localhost:7240/api/DuTru/lophocphan/${selectedMaMon}`)
//       .then((response) => setSelectedClasses(response.data))
//       .catch((error) => console.error("Error fetching classes:", error));
//   }, [selectedMaMon]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       // Create experiment
//       const response = await axios.post("https://localhost:7240/api/DuTru/taoBaiTN", {
//         tenBaiTN,
//         maMon: selectedMaMon,
//       });

//       // Handle adding chemical forecasts
//       chiTietDeXuat.forEach(async (item) => {
//         await axios.post("https://localhost:7240/api/DuTru/taoDuTru", {
//           maHoaChat: item.maHoaChat,
//           maBaiTN: response.data.maBaiTN,
//           soLuong: item.soLuong,
//         });
//       });

//       navigate(`/chemical-forecasting/${selectedMaMon}`);
//     } catch (error) {
//       console.error("Error creating experiment:", error);
//     }
//   };

//   return (
    
//       <div className="p-6 bg-gray-50 min-h-screen">
//         <h1 className="text-2xl font-bold mb-4">Tạo bài thí nghiệm</h1>
//         <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
//           <div>
//             <label htmlFor="tenBaiTN" className="block font-medium text-gray-700">Tên bài thí nghiệm:</label>
//             <input
//               type="text"
//               id="tenBaiTN"
//               value={tenBaiTN}
//               onChange={(e) => setTenBaiTN(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
    
//           <ClassList selectedClasses={selectedClasses} />
    
//           <ChemicalSearch
//             chiTietDeXuat={chiTietDeXuat}
//             setChiTietDeXuat={setChiTietDeXuat}
//           />
    
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//           >
//             Tạo bài thí nghiệm
//           </button>
//         </form>
//       </div>
//     );
    
// };

// export default ChemicalForecasting_Add;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ChemicalForecasting_Add = () => {
  const { selectedMaMon } = useParams();
  const navigate = useNavigate();

  const [tenBaiTN, setTenBaiTN] = useState("");
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [duTru, setduTru] = useState([
    { maHoaChat: 0, soLuong: 1, tenHoaChat: "", donViTinh: "", searchQuery: "", searchResults: [] },
  ]);

  useEffect(() => {
    axios
      .get(`https://localhost:7240/api/DuTru/lophocphan/${selectedMaMon}`)
      .then((response) => setSelectedClasses(response.data))
      .catch((error) => console.error("Error fetching classes:", error));
  }, [selectedMaMon]);

  const handleAddDetail = () => {
    setduTru([
      ...duTru,
      { maHoaChat: 0, soLuong: 1, tenHoaChat: "", donViTinh: "", searchQuery: "", searchResults: [] },
    ]);
  };

  const handleRemoveDetail = (index) => {
    const updatedDetails = [...duTru];
    updatedDetails.splice(index, 1);
    setduTru(updatedDetails);
  };

  const handleChangeDetail = (index, field, value) => {
    const updatedDetails = [...duTru];
    updatedDetails[index][field] = value;
    setduTru(updatedDetails);
  };

  const handleSearch = async (index, query) => {
    const updatedDetails = [...duTru];
    updatedDetails[index].searchQuery = query;

    if (query.length >= 2) {
      try {
        const response = await axios.get("https://localhost:7240/api/ChemicalManagement/Search", {
          params: { searchTerm: query },
        });
        updatedDetails[index].searchResults = response.data;
      } catch (error) {
        console.error("Lỗi khi tìm kiếm hóa chất:", error.response?.data || error.message);
      }
    } else {
      updatedDetails[index].searchResults = [];
    }
    setduTru(updatedDetails);
  };

  const handleSelectChemical = (index, chemical) => {
    const updatedDetails = [...duTru];
    updatedDetails[index].maHoaChat = chemical.maHoaChat;
    updatedDetails[index].tenHoaChat = chemical.tenHoaChat;
    updatedDetails[index].donViTinh = chemical.donVi;
    updatedDetails[index].searchQuery = "";
    updatedDetails[index].searchResults = [];
    setduTru(updatedDetails);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://localhost:7240/api/DuTru/taoBaiTN", {
        tenBaiTN,
        maMon: selectedMaMon,
      });

      for (const item of duTru) {
        await axios.post("https://localhost:7240/api/DuTru/taoDuTru", {
          maHoaChat: item.maHoaChat,
          maBaiTN: response.data.maBaiTN,
          soLuong: item.soLuong,
        });
      }

      navigate(`/chemical-forecasting`);
    } catch (error) {
      console.error("Error creating experiment:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Tạo bài thí nghiệm</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium">Tên bài thí nghiệm:</label>
          <input
            type="text"
            value={tenBaiTN}
            onChange={(e) => setTenBaiTN(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg p-3"
          />
        </div>

        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Tìm Kiếm Hóa Chất</th>
              <th className="border border-gray-300 p-2">Tên Hóa Chất</th>
              <th className="border border-gray-300 p-2">Số Lượng</th>
              <th className="border border-gray-300 p-2">Đơn Vị Tính</th>
              <th className="border border-gray-300 p-2">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {duTru.map((detail, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2 relative">
                  <input
                    type="text"
                    value={detail.searchQuery}
                    onChange={(e) => handleSearch(index, e.target.value)}
                    placeholder="Tìm kiếm hóa chất..."
                    className="w-full border-gray-300 p-2 rounded"
                  />
                  {detail.searchResults.length > 0 && (
                    <ul className="absolute left-0 right-0 bg-white border rounded shadow max-h-40 overflow-y-auto z-10">
                      {detail.searchResults.map((chemical) => (
                        <li
                          key={chemical.maHoaChat}
                          className="p-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSelectChemical(index, chemical)}
                        >
                          {chemical.tenHoaChat}
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    value={detail.tenHoaChat}
                    readOnly
                    className="w-full border-gray-300 p-2 rounded bg-gray-100"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    value={detail.soLuong}
                    onChange={(e) => handleChangeDetail(index, "soLuong", e.target.value)}
                    className="w-full border-gray-300 p-2 rounded"
                    min="0"
                  />
                </td>
                <td className="border border-gray-300 p-2">{detail.donViTinh}</td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    type="button"
                    onClick={() => handleRemoveDetail(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          type="button"
          onClick={handleAddDetail}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg"
        >
          Thêm Chi Tiết
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded-lg"
        >
          Tạo bài thí nghiệm
        </button>
      </form>
    </div>
  );
};

export default ChemicalForecasting_Add;
