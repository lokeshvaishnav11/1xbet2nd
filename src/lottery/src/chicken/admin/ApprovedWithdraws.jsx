import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';

const ApprovedWithdraws = () => {

    const apiUrl = import.meta.env.VITE_API_URL;


    const [data, setData] = useState([]);
    const [filtered, setFiltered] = useState([]); // for search results
  
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [searchPhone, setSearchPhone] = useState('');
  
    useEffect(() => {
      axiosInstance.get(`${apiUrl}/user/admin-dashboard`)
        .then((response) => {
          setData(response.data?.withdraw || []);
          setFiltered(response.data?.withdraw || []);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, []); 



  if (loading) return <p>Loading...</p>;
  if (error) return <p>❌ Error: {error}</p>;
  const formatDate = (dateStr) => new Date(dateStr).toLocaleString();

  const handleSearch = () => {
    if (searchPhone.trim() === '') {
      setFiltered(data); // reset if empty
    } else {
      const result = data.filter(user =>
        user.mobile_number?.toLowerCase().includes(searchPhone.toLowerCase())
      );
      setFiltered(result);
    }
  };

  return (
    <div>
      <div className="container mt-4" style={{ maxWidth: '100%', overflowX: 'hidden' }}>
      <h4 className="mb-4">Withdraw Requests</h4>

        {/* 🔍 Search Bar */}
        <div className="mb-4 d-flex align-items-center gap-2">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Enter phone number..."
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        {searchPhone && (
          <button className="btn btn-outline-secondary" onClick={() => { setSearchPhone(''); setFiltered(data); }}>
            Reset
          </button>
        )}
      </div>
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
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-muted">No withdraw requests found.</td>
              </tr>
            ) : (
              filtered?.map((item, index) => (
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
    </div>
  )
}

export default ApprovedWithdraws
