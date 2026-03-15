import React, { useEffect, useState } from "react";
import axios from "axios";

const AmtHisotry = ({ show, onClose , type }) => {
  const [depositData, setDepositData] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("Type:", type);
//   useEffect(() => {
//     axios
//       .get("/api/deposits")
//       .then((res) => {
//         setDepositData(res.data || []);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching deposit history:", err);
//         setLoading(false);
//       });
//   }, []);

useEffect(() => {
    if (type === "Deposit") {
      // fetch deposit data
    } else if (type === "Withdraw") {
      // fetch withdrawal data
    }
  }, [type]);

  return (
   <>{ show &&  
   <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark text-white rounded-4 shadow-lg">
          <div className="modal-header border-0 px-4 pt-4">
            <h5 className="modal-title">My Deposit History</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body px-4">
            <div className="row text-secondary fw-bold border-bottom pb-2 mb-2">
              <div className="col">Date</div>
              <div className="col">Amount</div>
              <div className="col">Status</div>
            </div>

            <div className="overflow-auto" style={{ maxHeight: "250px" }}>
              {loading ? (
                <p className="text-center text-light py-3">Loading...</p>
              ) : depositData.length === 0 ? (
                <p className="text-center text-light py-3">No deposit history found.</p>
              ) : (
                depositData?.map((item, index) => (
                  <div key={index} className="row text-light py-2 border-bottom">
                    <div className="col">{item.date}</div>
                    <div className="col">{item.amount}</div>
                    <div className="col">{item.status}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="modal-footer border-0 px-4 pb-4">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>}
   </>
  );
};

export default AmtHisotry;
