import { useEffect, useState } from 'react';
import axios from 'axios';

const ChemicalManagement = () => {
  const [chemicals, setChemicals] = useState([]);
  const [newChemical, setNewChemical] = useState({
    soCAS: '',
    tenHoaChat: '',
    donVi: '',
    moTa: '',
    congThucHoaHoc: '',
    nguyHiem: '',
    soLieuAnToan: '',
    thoiHanSuDung: '',
  });

  useEffect(() => {
    const fetchChemicals = async () => {
      try {
        const response = await axios.get('https://localhost:7240/api/ChemicalManagement/GetHoaChat');
        setChemicals(response.data);
      } catch (error) {
        console.error('Error fetching the chemicals:', error);
      }
    };

    fetchChemicals();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewChemical((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7240/api/ChemicalManagement/AddHoaChat', newChemical);
      setChemicals((prev) => [...prev, response.data]);
      setNewChemical({
        soCAS: '',
        tenHoaChat: '',
        donVi: '',
        moTa: '',
        congThucHoaHoc: '',
        nguyHiem: '',
        soLieuAnToan: '',
        thoiHanSuDung: '',
      });
    } catch (error) {
      console.error('Error adding the chemical:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Danh Mục Hóa Chất</h1>

      {/* Form for Adding New Chemical */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="soCAS"
            value={newChemical.soCAS}
            onChange={handleChange}
            placeholder="SoCAS"
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="tenHoaChat"
            value={newChemical.tenHoaChat}
            onChange={handleChange}
            placeholder="Tên Hóa Chất"
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="donVi"
            value={newChemical.donVi}
            onChange={handleChange}
            placeholder="Đơn Vị"
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="moTa"
            value={newChemical.moTa}
            onChange={handleChange}
            placeholder="Mô Tả"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="congThucHoaHoc"
            value={newChemical.congThucHoaHoc}
            onChange={handleChange}
            placeholder="Công Thức Hóa Học"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="nguyHiem"
            value={newChemical.nguyHiem}
            onChange={handleChange}
            placeholder="Nguy Hiểm"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="soLieuAnToan"
            value={newChemical.soLieuAnToan}
            onChange={handleChange}
            placeholder="Liệu An Toàn"
            className="border p-2 rounded"
          />
          <input
            type="date"
            name="thoiHanSuDung"
            value={newChemical.thoiHanSuDung}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Thêm Hóa Chất
        </button>
      </form>

      {/* Table for Displaying Chemicals */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4 border">SoCAS</th>
            <th className="py-2 px-4 border">Tên Hóa Chất</th>
            <th className="py-2 px-4 border">Đơn Vị</th>
            <th className="py-2 px-4 border">Mô Tả</th>
            <th className="py-2 px-4 border">Công Thức Hóa Học</th>
            <th className="py-2 px-4 border">Nguy Hiểm</th>
            <th className="py-2 px-4 border">Liệu An Toàn</th>
            <th className="py-2 px-4 border">Thời Hạn Sử Dụng</th>
            <th className="py-2 px-4 border">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {chemicals.map((chemical, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{chemical.soCAS}</td>
              <td className="py-2 px-4 border">{chemical.tenHoaChat}</td>
              <td className="py-2 px-4 border">{chemical.donVi}</td>
              <td className="py-2 px-4 border">{chemical.moTa}</td>
              <td className="py-2 px-4 border">{chemical.congThucHoaHoc}</td>
              <td className="py-2 px-4 border">{chemical.nguyHiem}</td>
              <td className="py-2 px-4 border">{chemical.soLieuAnToan}</td>
              <td className="py-2 px-4 border">{new Date(chemical.thoiHanSuDung).toLocaleDateString()}</td>
              <td className="py-2 px-4 border">
                <button 
                  onClick={() => handleEdit(chemical.maHoaChat)} 
                  className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mr-2"
                >
                  Sửa
                </button>
                <button 
                  onClick={() => handleDelete(chemical.maHoaChat)} 
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChemicalManagement;
