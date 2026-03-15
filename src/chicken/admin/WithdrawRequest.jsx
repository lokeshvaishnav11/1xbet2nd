import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const WithdrawRequest = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [withdrawList, setWithdrawList] = useState([]);

  useEffect(() => {
    const fetchWithdrawRequests = async () => {
      try {
        const res = await axiosInstance.get(`${apiUrl}/user/all-withdraw-request`);
        console.log(res, 'withdraw requests');
        setWithdrawList(res.data);
      } catch (err) {
        console.error("Error fetching withdraw requests:", err);
      }
    };

    fetchWithdrawRequests();
  }, []);

  const handleApprove = (mobile_number, amount, id) => {
    console.log(`Approve clicked for ID: ${id}`);
    axiosInstance.post(`${apiUrl}/user/approve-withdraw`, { mobile_number, amount, id })
      .then(res => console.log(res, 'approved'))
      .catch(err => console.error('Approve error', err));
  };

  const handleReject = (id) => {
    console.log(`Reject clicked for ID: ${id}`);
    axiosInstance.post(`${apiUrl}/user/reject-withdraw`, { id })
      .then(res => console.log(res, 'rejected'))
      .catch(err => console.error('Reject error', err));
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '100%', overflowX: 'hidden' }}>
      <h4 className="mb-4">Withdraw Requests</h4>
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Account No</th>
              <th>Holder Name</th>
              <th>Bank</th>
              <th>IFSC</th>
              <th>UPI ID</th>
              <th>Mobile</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {withdrawList.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-muted">No withdraw requests found.</td>
              </tr>
            ) : (
              withdrawList?.filter((r) => r.status === "Pending")?.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>₹{item.amount}</td>
                  <td>{item.account_number}</td>
                  <td>{item.account_holder_name}</td>
                  <td>{item.bank_name}</td>
                  <td>{item.ifsc_code}</td>
                  <td>{item.upi_id}</td>
                  <td>{item.mobile_number}</td>
                  <td>{new Date(item.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
                  <td>
                    <span className={`badge ${item.status === "Approved" ? "bg-success" : item.status === "Rejected" ? "bg-danger" : "bg-warning"}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    {item.status === "Pending" ? (
                      <>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleApprove(item.mobile_number, item.amount, item._id)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleReject(item._id)}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <button className="btn btn-secondary btn-sm" disabled>
                        {item.status}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithdrawRequest;
