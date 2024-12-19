import React from "react";

const HistoryTable = ({ data, fields, title }) => {
  if (!data || data.length === 0) {
    return <p>Không có dữ liệu lịch sử.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {fields.map((field) => (
              <th key={field.name} className="border px-4 py-2">
                {field.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {fields.map((field) => (
                <td key={field.name} className="border px-4 py-2">
                  {field.render ? field.render(item) : item[field.name]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
