import React, { useState } from "react";
import axios from "axios";

const ChemicalSearch = ({ chiTietDeXuat, setChiTietDeXuat }) => {
  const handleSearch = async (index, query) => {
    const updatedDetails = [...chiTietDeXuat];
    updatedDetails[index].searchQuery = query;

    if (query.length >= 2) {
      try {
        const response = await axios.get("https://localhost:7240/api/ChemicalManagement/Search", {
          params: { searchTerm: query },
        });
        updatedDetails[index].searchResults = response.data;
        setChiTietDeXuat(updatedDetails);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm hóa chất:", error.response?.data || error.message);
      }
    } else {
      updatedDetails[index].searchResults = [];
      setChiTietDeXuat(updatedDetails);
    }
  };

  const handleAddChemical = (index, maHoaChat, tenHoaChat) => {
    const updatedDetails = [...chiTietDeXuat];
    updatedDetails[index].maHoaChat = maHoaChat;
    updatedDetails[index].tenHoaChat = tenHoaChat;
    setChiTietDeXuat(updatedDetails);
  };

  return (
    <div className="space-y-4">
  <h3 className="text-lg font-semibold">Chọn hóa chất</h3>
  {chiTietDeXuat.map((item, index) => (
    <div key={index} className="bg-gray-100 p-4 rounded shadow-md">
      <input
        type="text"
        placeholder="Tìm kiếm hóa chất"
        value={item.searchQuery || ""}
        onChange={(e) => handleSearch(index, e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      <ul className="mt-2">
        {item.searchResults?.map((result) => (
          <li
            key={result.maHoaChat}
            onClick={() => handleAddChemical(index, result.maHoaChat, result.tenHoaChat)}
            className="cursor-pointer py-1 px-2 bg-white hover:bg-gray-200 rounded"
          >
            {result.tenHoaChat}
          </li>
        ))}
      </ul>
    </div>
  ))}
</div>

  );
};

export default ChemicalSearch;
