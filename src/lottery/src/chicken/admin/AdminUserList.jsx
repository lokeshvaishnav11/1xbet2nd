import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';

const AdminUserList = () => {

    const apiUrl = import.meta.env.VITE_API_URL;


  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]); // for search results

  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [searchPhone, setSearchPhone] = useState('');

  const [showDepositBox, setShowDepositBox] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);
const [depositAmount, setDepositAmount] = useState('');

  useEffect(() => {
    axiosInstance.get(`${apiUrl}/user/admin-dashboard`)
      .then((response) => {
        setData(response.data?.user || []);
        setFiltered(response.data?.user || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // empty dependency means it runs once on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>❌ Error: {error}</p>;
  const formatDate = (dateStr) => new Date(dateStr).toLocaleString();

  const handleSearch = () => {
    if (searchPhone.trim() === '') {
      setFiltered(data); // reset if empty
    } else {
      const result = data.filter(user =>
        user.phone?.toLowerCase().includes(searchPhone.toLowerCase())
      );
      setFiltered(result);
    }
  };



  return (
    <div>
    <div className="container mt-5" style={{ maxWidth: '100%', overflowX: 'hidden' }}>
      <h3 className="mb-4">👤 Admin Panel - User List</h3>

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

<div className='table-responsive'>
      <table className="table table-bordered table-hover table-striped shadow rounded">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Password</th>

            <th>KYC</th>
            <th>Wallet</th>
            <th>1st Deposit</th>
            <th>Next Deposit</th>
            <th>Stage</th>
            <th>Created</th>
            <th>Add Money</th>

          </tr>
        </thead>
        <tbody>
          {filtered?.map((user, idx) => (
            <tr key={user._id || idx}>
              <td>{idx + 1}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user?.plain}</td>
              <td>
                <span className={`badge ${user.ekyc === 'Approved' ? 'bg-success' : 'bg-warning text-dark'}`}>
                  {user.ekyc}
                </span>
              </td>
              <td>₹{user.wallet}</td>
              <td>
                <span className={`badge ${user.firstDeposit ? 'bg-success' : 'bg-secondary'}`}>
                  {user.firstDeposit ? 'Yes' : 'No'}
                </span>
              </td>
              <td>
                <span className={`badge ${user.nextDeposit ? 'bg-success' : 'bg-secondary'}`}>
                  {user.nextDeposit ? 'Yes' : 'No'}
                </span>
              </td>
              <td>{user.stage}</td>
              <td>{formatDate(user.createdAt)}</td>
              <td>
  <button
    className="btn btn-sm btn-outline-success"
    onClick={() => {
      setSelectedUser(user);
      setShowDepositBox(true);
    }}
  >
    Deposit
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>

    {showDepositBox && selectedUser && (
  <div
    className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
    style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999 }}
    onClick={() => setShowDepositBox(false)} // click outside to close
  >
    <div
      className="bg-white p-4 rounded shadow"
      style={{ width: "300px" }}
      onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
    >
      <h5 className="mb-3">Deposit to {selectedUser.phone}</h5>
      <input
        type="number"
        className="form-control mb-3"
        placeholder="Enter amount"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
      />
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-success"
          onClick={async () => {
            try {
              // Dummy API call (replace with your actual API later)
              await axiosInstance.post(`${apiUrl}/user/deposit-to-user`, {
                phone: selectedUser.phone,
                amount: depositAmount,
              });
              alert("Money added successfully!");
              setShowDepositBox(false);
              setDepositAmount('');
            } catch (err) {
              console.error("Deposit failed:", err);
              alert("Failed to deposit money.");
            }
          }}
        >
          Add
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            setShowDepositBox(false);
            setDepositAmount('');
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>


  )
}

export default AdminUserList
