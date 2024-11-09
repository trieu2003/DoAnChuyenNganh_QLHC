import { useState } from 'react';

const InventoryManagement = () => {
  const [lotNumber, setLotNumber] = useState('');
  const [chemicalName, setChemicalName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [supplier, setSupplier] = useState('');
  
  // State to store the list of entered lots
  const [chemicalLots, setChemicalLots] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new entry object and add it to the list
    const newLot = {
      lotNumber,
      chemicalName,
      quantity,
      entryDate,
      expiryDate,
      supplier
    };
    setChemicalLots([...chemicalLots, newLot]);

    // Clear form fields
    setLotNumber('');
    setChemicalName('');
    setQuantity('');
    setEntryDate('');
    setExpiryDate('');
    setSupplier('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md space-y-6 mb-8"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">Quản lý nhập hóa chất</h2>
        
        <div>
          <label className="block text-gray-600">Lot Number:</label>
          <input
            type="text"
            value={lotNumber}
            onChange={(e) => setLotNumber(e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-gray-600">Chemical Name:</label>
          <input
            type="text"
            value={chemicalName}
            onChange={(e) => setChemicalName(e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-gray-600">Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-gray-600">Entry Date:</label>
          <input
            type="date"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-gray-600">Expiry Date:</label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-gray-600">Supplier:</label>
          <input
            type="text"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Submit
        </button>
      </form>

      {/* Display List of Entered Chemical Lots */}
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Entered Chemical Lots</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border px-4 py-2">Lot Number</th>
              <th className="border px-4 py-2">Chemical Name</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Entry Date</th>
              <th className="border px-4 py-2">Expiry Date</th>
              <th className="border px-4 py-2">Supplier</th>
            </tr>
          </thead>
          <tbody>
            {chemicalLots.map((lot, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{lot.lotNumber}</td>
                <td className="border px-4 py-2">{lot.chemicalName}</td>
                <td className="border px-4 py-2">{lot.quantity}</td>
                <td className="border px-4 py-2">{lot.entryDate}</td>
                <td className="border px-4 py-2">{lot.expiryDate}</td>
                <td className="border px-4 py-2">{lot.supplier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryManagement;
