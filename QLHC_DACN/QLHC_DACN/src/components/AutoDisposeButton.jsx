import React, { useState } from "react";
import axios from "axios";

const AutoDisposeButton = () => {
  const [messages, setMessages] = useState([]); // Store messages from API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAutoDispose = async () => {
    const requestBody =  localStorage.getItem("maNguoiDung") ; // Wrap the user ID in an object
    setLoading(true);
    setMessages([]);
    setError(null);

    try {
      // Call the API with JSON payload
      const response = await axios.post(
        "https://localhost:7240/api/PhieuThanhLy/auto-dispose",
        requestBody, // Send request body as JSON
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Update messages based on API response
      if (response?.data?.messages) {
        setMessages(response.data.messages); // Show messages
      } else {
        setMessages(["Thủ tục đã thực hiện thành công nhưng không có thông báo."]);
      }
    } catch (err) {
      console.error("Error during API call:", err);
      setError(
        err.response?.data?.message || "Đã xảy ra lỗi khi thực hiện thủ tục."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleAutoDispose}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Đang xử lý..." : "Thực hiện Thanh Lý Tự Động"}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded">
          <p>{error}</p>
        </div>
      )}

      {messages.length > 0 && (
        <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded">
          <h4 className="text-lg font-semibold mb-2">Thông báo:</h4>
          <ul className="list-disc list-inside">
            {messages.map((msg, index) => (
              <li key={index} className="text-gray-700">
                {msg}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AutoDisposeButton;
