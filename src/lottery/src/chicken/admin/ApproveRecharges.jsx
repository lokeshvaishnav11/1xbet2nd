import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';

const ApproveRecharges = () => {

    const apiUrl = import.meta.env.VITE_API_URL;


    const [data, setData] = useState([]);
    const [filtered, setFiltered] = useState([]); // for search results
  
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [searchPhone, setSearchPhone] = useState('');
  
    useEffect(() => {
      axiosInstance.get(`${apiUrl}/user/admin-dashboard`)
        .then((response) => {
          setData(response.data?.deposite || []);
          setFiltered(response.data?.deposite || []);
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
        user.phone?.toLowerCase().includes(searchPhone.toLowerCase())
      );
      setFiltered(result);
    }
  };


  return (
    <div>
    <div className="container mt-4" style={{ maxWidth: '100%', overflowX: 'hidden' }}>
       <h4 className="mb-4">Approved Recharges </h4>

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
               <th>Phone</th>
               <th>Amount</th>
               <th>UTR</th>
               <th>First Deposit</th>
               <th>Next Deposit</th>
               <th>Date</th>
               <th>Actions</th>
             </tr>
           </thead>
           <tbody>
             {filtered.length === 0 ? (
               <tr>
                 <td colSpan="8" className="text-muted">No recharge requests found.</td>
               </tr>
             ) : (
               filtered?.map((item, index) => (
                 <tr key={item._id}>
                   <td>{index + 1}</td>
                   <td>{item.phone}</td>
                   <td>₹{item.amount}</td>
                   <td>{item.utr}</td>
                   <td>{item.firstDeposit ? '✅' : '❌'}</td>
                   <td>{item.nextDeposit ? '✅' : '❌'}</td>
                   <td>{new Date(item.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
 
                   
                   <td>
                     <button
                       className="btn btn-success btn-sm me-2"
                    disabled
                     >
                       {item.status}
                     </button> 
                   
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

export default ApproveRecharges
