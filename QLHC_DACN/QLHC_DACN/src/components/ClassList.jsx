import React from "react";

const ClassList = ({ selectedClasses }) => {
  return (
    <div>
  <h2 className="text-xl font-semibold mb-2">Các lớp học phần:</h2>
  <table className="min-w-full bg-white border border-gray-200 rounded shadow-md">
    <thead className="bg-gray-200 text-gray-700">
      <tr>
        <th className="px-4 py-2 text-left">Mã lớp học phần</th>
        <th className="px-4 py-2 text-left">Giảng viên dạy</th>
        <th className="px-4 py-2 text-left">Sĩ số</th>
      </tr>
    </thead>
    <tbody>
      {selectedClasses.map((classItem) => (
        <tr key={classItem.maLHP} className="border-t">
          <td className="px-4 py-2">{classItem.maLHP}</td>
          <td className="px-4 py-2">{classItem.gvDay}</td>
          <td className="px-4 py-2">{classItem.siSo}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default ClassList;
