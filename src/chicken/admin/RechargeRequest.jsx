import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';

const RechargeRequest = () => {

    const apiUrl = import.meta.env.VITE_API_URL;

    const [rechargeList, setRechargeList] = useState([]);

    useEffect(() => {
        const fetchRechargeRequests = async () => {
          try {
            const res = await axiosInstance.get(`${apiUrl}/user/all-recharge-request`);
            console.log(res,"res request recharge")
            setRechargeList(res.data.data);
          } catch (err) {
            console.error("Error fetching recharge list:", err);
          }
        };
      
        fetchRechargeRequests();
      }, []);

      const handleApprove = (userId , amount , id ) => {
        console.log(`Approve clicked for ID: ${userId}`);
        axiosInstance.post(`${apiUrl}/user/approve-recharge` , {userId , amount , id}).then((res)=>{
            console.log(res,"ress")
        })
        // axiosInstance.post(...) for approve
      };
    
      const handleReject = (userId) => {
        console.log(`Reject clicked for ID: ${userId}`);
        // axiosInstance.post(...) for reject
      };
      
  return (
    <div>
   <div className="container mt-4" style={{ maxWidth: '100%', overflowX: 'hidden' }}>
      <h4 className="mb-4">Recharge Requests</h4>
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
            {rechargeList.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-muted">No recharge requests found.</td>
              </tr>
            ) : (
              rechargeList?.filter((r) => r.status === "Pending")?.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.phone}</td>
                  <td>₹{item.amount}</td>
                  <td>{item.utr}</td>
                  <td>{item.firstDeposit ? '✅' : '❌'}</td>
                  <td>{item.nextDeposit ? '✅' : '❌'}</td>
                  <td>{new Date(item.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>

                  
                  <td>
                    { item?.status === "Approved" ? <button
                      className="btn btn-success btn-sm me-2"
                     disabled
                    >
                      Approved
                    </button> : <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleApprove(item.userId , item.amount, item?._id)}
                    >
                      Approve
                    </button>}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleReject(item.userId)}
                    >
                      Reject
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

export default RechargeRequest
