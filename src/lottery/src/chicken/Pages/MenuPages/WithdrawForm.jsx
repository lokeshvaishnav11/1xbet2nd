import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const WithdrawForm = ({ show, onClose, onDepositClick }) => {
  const [userInfo, setUserInfo] = useState(); // ✅ state to store user data

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axiosInstance.get(`${apiUrl}/user/user-info`);
        console.log(res, "ressss");
        setUserInfo(res.data.data); // ✅ store user data in state
        // setBalance(res?.data?.data?.wallet)
      } catch (err) {
        console.error("❌ Error fetching user info:", err);
      }
    };

    fetchUserInfo();
  }, []);

  const [formData, setFormData] = useState({
    amount: "",
    account_number: "",
    account_holder_name: "",
    bank_name: "",
    ifsc_code: "",
    upi_id: "",
    mobile_number: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`${apiUrl}/user/withdraw-request`, formData);
      alert("Withdraw request submitted successfully!");
      // setFormData({ // reset form
      //   amount: '',
      //   account_number: '',
      //   account_holder_name: '',
      //   bank_name: '',
      //   ifsc_code: '',
      //   upi_id: '',
      //   mobile_number: '',
      // });
    } catch (err) {
      console.error(err);
      alert("Failed to submit withdraw request");
    }
  };

  return (
    <>
      {show && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 1050 }}
        >
          <div
            className="position-relative bg-dark text-white rounded-4 shadow-lg w-100"
            style={{ maxWidth: "24rem", maxHeight: "90vh", overflowY: "auto" }}
          >
            <button
              onClick={onClose}
              className="btn-close position-absolute text-white"
              style={{ top: "1rem", right: "1rem" }}
            ></button>

            <h2 className="fs-5 fw-bold text-center mt-5 mb-3">Withdraw</h2>

            {userInfo?.stage == "Beginner" || userInfo?.stage == "sr" || userInfo?.stage == "etrue" 
             ? (
              <form onSubmit={handleSubmit} className="px-4 pb-4">
                <div className="mb-3">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="form-control bg-secondary text-white border-secondary"
                    placeholder="Enter amount"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Account Number</label>
                  <input
                    type="text"
                    name="account_number"
                    value={formData.account_number}
                    onChange={handleChange}
                    className="form-control bg-secondary text-white border-secondary"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Account Holder Name</label>
                  <input
                    type="text"
                    value={formData.account_holder_name}
                    onChange={handleChange}
                    name="account_holder_name"
                    className="form-control bg-secondary text-white border-secondary"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Bank Name</label>
                  <input
                    type="text"
                    name="bank_name"
                    value={formData.bank_name}
                    onChange={handleChange}
                    className="form-control bg-secondary text-white border-secondary"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">IFSC Code</label>
                  <input
                    type="text"
                    name="ifsc_code"
                    value={formData.ifsc_code}
                    onChange={handleChange}
                    className="form-control bg-secondary text-white border-secondary"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">UPI ID</label>
                  <input
                    type="text"
                    value={formData.text}
                    onChange={handleChange}
                    name="upi_id"
                    className="form-control bg-secondary text-white border-secondary"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="text"
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleChange}
                    className="form-control bg-secondary text-white border-secondary"
                  />
                </div>

                <button
                  type="submit"
                  className="btn w-100 fw-bold text-white"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #22c55e, #059669)",
                  }}
                >
                  Submit
                </button>
              </form>
            ) : (
              <>
                <div className="mb-3 mx-2">
                  <input
                    type="number"
                    name="amount"
                    className="form-control bg-secondary text-white border-secondary"
                    placeholder="Withdraw form is locked"
                    disabled
                  />
                </div>

                {userInfo?.stage == "fr" && (
                  <div className="alert alert-warning mx-3">
                    <strong>Note:</strong> For your first withdrawal, you have
                    to deposit ₹1499 minimum amount.
                    {/* <button>Deposit(1499)</button> */}
                    <button
                      className="btn btn-sm btn-success mt-2"
                      onClick={() => {
                        onClose(); // Close this modal
                        onDepositClick("1499");
                      }}
                    >
                      Deposit ₹1499
                    </button>
                  </div>
                )}

                {userInfo?.stage == "ekyc" && (
                  <div className="alert alert-info mx-3 mt-3">
                    <strong>KYC Incomplete:</strong> You must complete your eKYC
                    with a deposit of ₹699 to enable withdrawals.
                    <button
                      className="btn btn-sm btn-success mt-2"
                      onClick={() => {
                        onClose(); // Close this modal
                        onDepositClick("699");
                      }}
                    >
                      Deposit ₹699
                    </button>
                  </div>
                )}

                {/* {!userInfo?.firstDeposit && (
                  <div className="alert alert-info mx-3 mt-3">
                    <strong>Deposit Incomplete:</strong> You must complete your
                    first deposit to enable withdrawals.
                    <button
                      className="btn btn-sm btn-success mt-2"
                      onClick={() => {
                        onClose(); // Close this modal
                        onDepositClick("699");
                      }}
                    >
                     
                    </button>
                  </div>
                )} */}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default WithdrawForm;
