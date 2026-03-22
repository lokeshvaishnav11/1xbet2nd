import axios from "axios";
import React, { useEffect, useState } from "react";

const CbetHistory = () => {
  // const apiUrl = "http://localhost:3000";
  const apiUrl = "https://1xbet99.vip/";

  

  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false); // 👈 by default false

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await axios.get(`${apiUrl}/chicken-history`);
        setHistory(response.data);
      } catch (error) {
        console.log("Error in fetching history:", error);
      }
    }

    fetchHistory();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-2 rounded-lg shadow transition"
        >
          🐔 View Bet History
        </button>
      </div>

      {showHistory && (
        <div className="overflow-y-auto max-h-[400px] shadow-lg rounded-lg border border-gray-200 mt-4">
          <table className="min-w-full table-auto text-sm text-left text-gray-700">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2 font-semibold">Round ID</th>
                <th className="px-4 py-2 font-semibold">Amount</th>
                <th className="px-4 py-2 font-semibold">Crash</th>
                <th className="px-4 py-2 font-semibold">Win</th>
                <th className="px-4 py-2 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {history.length > 0 ? (
                history.map((item, index) => (
                  <tr key={index} className="border-t bg-gray-50">
                    <td className="px-4 py-2">{item.roundId}</td>
                    <td className="px-4 py-2">₹{item.amount}</td>
                    <td className="px-4 py-2">{item.crash}</td>
                    <td
                      className={`px-4 py-2 font-medium ${
                        item.win !== "0" ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {item.win !== "0" ? `₹${item.win}` : "Lost"}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(item.created_at).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="px-4 py-4 text-center text-gray-500"
                    colSpan="5"
                  >
                    No history found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CbetHistory;
