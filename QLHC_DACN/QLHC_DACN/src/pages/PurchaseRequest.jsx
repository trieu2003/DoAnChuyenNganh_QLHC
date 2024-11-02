import { useState, useEffect } from 'react';
import axios from 'axios';

const PurchaseRequest = () => {
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [chemicals, setChemicals] = useState([]);
  const [selectedChemical, setSelectedChemical] = useState('');
  const [chemicalQuantity, setChemicalQuantity] = useState('');
  const [requestDetails, setRequestDetails] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedRequestDetails, setSelectedRequestDetails] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7240/api/ChemicalManagement/GetHoaChat')
      .then(response => setChemicals(response.data))
      .catch(error => console.error('Error fetching chemicals:', error));

    fetchRequests();
  }, []);

  const fetchRequests = () => {
    axios.get('https://localhost:7240/api/PurchaseRequest/GetPhieuDeXuat')
      .then(response => {
        const pending = response.data.filter(request => request.trangThai === 'Chờ duyệt');
        const approved = response.data.filter(request => request.trangThai === 'Đã duyệt');
        setPendingRequests(pending);
        setApprovedRequests(approved);
      })
      .catch(error => console.error('Error fetching requests:', error));
  };

  const addChemicalToRequest = () => {
    if (selectedChemical && chemicalQuantity) {
      const chemical = chemicals.find(c => c.maHoaChat === parseInt(selectedChemical));
      setRequestDetails([
        ...requestDetails,
        {
          maHoaChat: chemical.maHoaChat,
          tenHoaChat: chemical.tenHoaChat,
          soLuong: chemicalQuantity
        }
      ]);
      setSelectedChemical('');
      setChemicalQuantity('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const phieuResponse = await axios.post('https://localhost:7240/api/PurchaseRequest/CreatePhieuDeXuat', {
        soLuongDeXuat: quantity,
        lyDo: reason,
        trangThai: 'Chờ duyệt'
      });

      await Promise.all(requestDetails.map(detail =>
        axios.post('https://localhost:7240/api/PurchaseRequest/AddChiTietDeXuat', {
          maPhieuDX: phieuResponse.data.maPhieuDX,
          maHoaChat: detail.maHoaChat,
          soLuong: detail.soLuong
        })
      ));

      alert('Purchase request created successfully!');
      setQuantity('');
      setReason('');
      setRequestDetails([]);
      fetchRequests();
    } catch (error) {
      console.error('Error creating purchase request:', error);
    }
  };

  // Fetch details of a selected request
  const handleRequestClick = async (request) => {
    setSelectedRequest(request);
    try {
      const response = await axios.get(`https://localhost:7240/api/PurchaseRequest/GetChiTietDeXuat?maPhieuDX=${request.maPhieuDX}`);
      setSelectedRequestDetails(response.data);
    } catch (error) {
      console.error('Error fetching request details:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Create New Purchase Request</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700">Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Reason:</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="border rounded-md p-2 w-full"
          />
        </div>

        <h3 className="text-lg font-semibold mb-2">Add Chemicals</h3>
        <div className="mb-4">
          <label className="block text-gray-700">Chemical:</label>
          <select
            value={selectedChemical}
            onChange={(e) => setSelectedChemical(e.target.value)}
            className="border rounded-md p-2 w-full"
          >
            <option value="">Select Chemical</option>
            {chemicals.map((chemical) => (
              <option key={chemical.maHoaChat} value={chemical.maHoaChat}>
                {chemical.tenHoaChat}
              </option>
            ))}
          </select>
          <label className="block text-gray-700 mt-2">Quantity:</label>
          <input
            type="number"
            value={chemicalQuantity}
            onChange={(e) => setChemicalQuantity(e.target.value)}
            className="border rounded-md p-2 w-full"
          />
          <button type="button" onClick={addChemicalToRequest} className="bg-blue-500 text-white rounded-md py-2 px-4 mt-2">
            Add Chemical
          </button>
        </div>

        <h3 className="text-lg font-semibold mb-2">Request Details</h3>
        <table className="min-w-full bg-white border border-gray-200 mb-4">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 border">Chemical Name</th>
              <th className="py-2 px-4 border">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {requestDetails.map((detail, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{detail.tenHoaChat}</td>
                <td className="py-2 px-4 border">{detail.soLuong}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button type="submit" className="bg-green-500 text-white rounded-md py-2 px-4">
          Submit Request
        </button>
      </form>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Pending Requests</h2>
        <table className="min-w-full bg-white border border-gray-200 mb-4">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 border">Request ID</th>
              <th className="py-2 px-4 border">Quantity</th>
              <th className="py-2 px-4 border">Reason</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map(request => (
              <tr key={request.maPhieuDX} onClick={() => handleRequestClick(request)} className="hover:bg-gray-100 cursor-pointer">
                <td className="py-2 px-4 border">{request.maPhieuDX}</td>
                <td className="py-2 px-4 border">{request.soLuongDeXuat}</td>
                <td className="py-2 px-4 border">{request.lyDo}</td>
                <td className="py-2 px-4 border">{request.trangThai}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="text-2xl font-semibold mb-4">Approved Requests</h2>
        <table className="min-w-full bg-white border border-gray-200 mb-4">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 border">Request ID</th>
              <th className="py-2 px-4 border">Quantity</th>
              <th className="py-2 px-4 border">Reason</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {approvedRequests.map(request => (
              <tr key={request.maPhieuDX} onClick={() => handleRequestClick(request)} className="hover:bg-gray-100 cursor-pointer">
                <td className="py-2 px-4 border">{request.maPhieuDX}</td>
                <td className="py-2 px-4 border">{request.soLuongDeXuat}</td>
                <td className="py-2 px-4 border">{request.lyDo}</td>
                <td className="py-2 px-4 border">{request.trangThai}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Display Selected Request Details */}
      {selectedRequest && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Request Details for ID: {selectedRequest.maPhieuDX}</h3>
          <table className="min-w-full bg-white border border-gray-200 mb-4">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-4 border">Chemical Name</th>
                <th className="py-2 px-4 border">Requested Quantity</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {selectedRequestDetails.map((detail, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{detail.tenHoaChat}</td>
                  <td className="py-2 px-4 border">{detail.soLuong}</td>
                  <td className="py-2 px-4 border">{detail.trangThai}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PurchaseRequest;
