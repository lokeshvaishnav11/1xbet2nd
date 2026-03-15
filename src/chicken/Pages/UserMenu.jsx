import React, { useContext, useEffect, useState } from "react";
import RechargeModal from "./MenuPages/RechargeModal";
import WithdrawForm from "./MenuPages/WithdrawForm";
import AmtHistory from "./MenuPages/AmtHistory";
import BetHistory from "./MenuPages/BetHistory";
import axiosInstance from "../utils/axiosInstance";
import { MusicContext } from "../Context/MusicContext";

const UserMenu = ({ menu, onClose2 }) => {

  const { isMusicOn, toggleMusic } = useContext(MusicContext);

  const apiUrl = import.meta.env.VITE_API_URL;
  const [showRules, setShowRules] = useState(false);

  const [showRecharge, setShowRecharge] = useState(false);

  const [initialRechargeAmount, setInitialRechargeAmount] = useState("");
  const [amhistory, setAmhistory] = useState(false);
  const [historyType, setHistoryType] = useState("");
  const [withdraw, setWithdraw] = useState(false);
    const [userInfo, setUserInfo] = useState(""); // ✅ state to store user data
  

  const [bethistory, setBethitory] = useState(false);

  const handleDepositFromWithdraw = (amount) => {
    setWithdraw(false);               // Close Withdraw Modal
    setInitialRechargeAmount(amount); // Set amount to auto-fill
    setShowRecharge(true);           // Open Recharge Modal
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axiosInstance.get(`${apiUrl}/user/user-info`);
        setUserInfo(res.data.data); // ✅ store user data in state
        // setBalance(res?.data?.data?.wallet);
      } catch (err) {
        console.error("❌ Error fetching user info:", err);
      }
    };

    fetchUserInfo();
  }, []);


  return (
    <>
      {menu && (
        <div>
          <div
            className="position-absolute shadow-lg rounded border border-secondary"
            style={{
              top: "4rem",
              right: "1.25rem",
              width: "18rem",
              backgroundColor: "#3A3D51",
              zIndex: 50,
              padding: "1rem",
              color: "white",
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              // onClick={() => setShowmenu(!menu)}
              onClick={onClose2}
              className="btn-close btn btn-sm text-light  text-white position-absolute"
              style={{
                top: "0.75rem",
                right: "0.75rem",
                fontSize: "0.8rem",
                color: "white",
              }}
            ></button>

            <div className="mt-3 small">
              {/* Avatar Row */}
              <div className="d-flex align-items-center justify-content-between mb-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/10438/10438143.png"
                  alt="avatar"
                  className="rounded-circle"
                  width="24"
                  height="24"
                />
                <p className="fw-bold mb-0">{userInfo?.phone}</p>
                <button className="btn btn-sm text-light p-0 small">
                  Change avatar
                </button>
              </div>

              {/* Sound Toggle */}
              {/* <div className="d-flex align-items-center justify-content-between py-2">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-volume-up"></i>
                  <span>Sound</span>
                </div>
                <div className="form-check form-switch m-0">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                  />
                </div>
              </div> */}

              {/* Music Toggle */}
              <div className="d-flex align-items-center justify-content-between py-2">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-music-note-list"></i>
                  <span>Music</span>
                </div>
                <div className="form-check form-switch m-0">
                <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          checked={isMusicOn}
          onChange={toggleMusic}
        />
                </div>
              </div>

              {/* Menu Links */}
              {[
                {
                  label: "Game rules",
                  icon: "bi bi-book",
                  onClick: () => setShowRules(true),
                },
                {
                  label: "My bet history",
                  icon: "bi bi-clock-history",
                  onClick: () => setBethitory(true),
                },
                {
                  label: "Recharge",
                  icon: "bi bi-wallet2",
                  onClick: () => setShowRecharge(true),
                },
                {
                  label: "Withdraw",
                  icon: "bi bi-arrow-down-circle",
                  onClick: () => setWithdraw(true),
                },
                {
                  label: "Deposit History",
                  icon: "bi bi-wallet",
                  onClick: () => {
                    setAmhistory(true);
                    setHistoryType("Deposit");
                  },
                },
                {
                  label: "Withdraw History",
                  icon: "bi bi-clock",
                  onClick: () => {
                    setAmhistory(true);
                    setHistoryType("Withdraw");
                  },
                },
                { label: "Referral", icon: "bi bi-people" },
              ].map((item, idx) => (
                <div key={idx} className="py-2">
                  <button
                    className="btn text-start text-white d-flex w-100 align-items-center gap-2 p-0"
                    onClick={item.onClick || (() => {})}
                  >
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                  </button>
                </div>
              ))}

              {/* Logout */}
              <div className="py-2">
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    window.location.href = "/"; // or wherever your user login page is
                  }}
                  className="btn text-start text-danger d-flex w-100 align-items-center gap-2 p-0"
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {showRules && (
            <div
              className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center"
              style={{ zIndex: 1050 }}
            >
              <div
                className="bg-dark text-white p-4 rounded position-relative shadow-lg"
                style={{ minWidth: "24rem" }}
              >
                <button
                  className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
                  onClick={() => setShowRules(false)}
                ></button>
                <h2 className="fs-5 fw-bold mb-1">Game Rules</h2>
                <p className="text-secondary small mb-4">
                  Bet limits are presented below
                </p>

                {[
                  { label: "Min bet:", value: "₹10" },
                  { label: "Max bet:", value: "₹100000" },
                  { label: "Min win:", value: "₹10" },
                  { label: "Max win:", value: "₹10000" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center bg-secondary bg-opacity-10 px-3 py-2 rounded mb-2"
                  >
                    <span>{item.label}</span>
                    <span className="fw-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <RechargeModal
            show={showRecharge}
            onClose={() => setShowRecharge(false)}
            initialAmount={initialRechargeAmount}
          />
          <WithdrawForm show={withdraw} onClose={() => setWithdraw(false)}  onDepositClick={handleDepositFromWithdraw} />
          <AmtHistory
            show={amhistory}
            onClose={() => setAmhistory(false)}
            type={historyType}
          />
          <BetHistory show={bethistory} onClose={() => setBethitory(false)} />
        </div>
      )}
    </>
  );
};

export default UserMenu;
