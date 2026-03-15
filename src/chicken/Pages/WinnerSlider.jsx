import React, { useEffect, useState } from 'react'
import './WinnerSlider.css';

const WinnerSlider = () => {
    

    const winnersData = [
        { name: "Hiroshi", flag: "🇯🇵", amount: "+₹189.00" },
  { name: "Amit", flag: "🇮🇳", amount: "+₹250.00" },
  { name: "Elena", flag: "🇪🇸", amount: "+₹300.00" },
  { name: "Liam", flag: "🇬🇧", amount: "+₹145.00" },
  { name: "Chen", flag: "🇨🇳", amount: "+₹210.00" },
  { name: "Sophia", flag: "🇺🇸", amount: "+₹275.00" },
  { name: "Ivan", flag: "🇷🇺", amount: "+₹320.00" },
  { name: "Fatima", flag: "🇦🇪", amount: "+₹195.00" },
  { name: "Lucas", flag: "🇧🇷", amount: "+₹230.00" },
  { name: "Mei", flag: "🇹🇼", amount: "+₹160.00" },
      ];
    
      
    
      const [currentWinner, setCurrentWinner] = useState(null);
const [show, setShow] = useState(false);

useEffect(() => {
  const cycle = () => {
    // 1. Show random winner
    const randomIndex = Math.floor(Math.random() * winnersData.length);
    setCurrentWinner(winnersData[randomIndex]);
    setShow(true);

    // 2. After 3 sec, hide
    setTimeout(() => {
      setShow(false);
    }, 3000); // visible for 3 sec
  };

  cycle(); // run immediately
  const interval = setInterval(cycle, 2000); // every 4 sec total

  return () => clearInterval(interval);
}, []);

    

  return (
    <div className="position-absolute top-0 start-0 ms-4" style={{ zIndex: 1040 }}>
  <div
    className="position-fixed start-0 text-white shadow px-3 py-1 pb-0"
    style={{ width: '13.5rem', zIndex: 1040, fontSize: '0.875rem', overflow: 'hidden' }}
  >
    <div
      className="d-flex align-items-center gap-2 mb-1 ps-4 fw-bold"
      style={{ fontSize: '13px', color: '#A7B1E6', whiteSpace: 'nowrap' }}
    >
      <span>Live wins</span>
      <span
        className="position-relative d-flex"
        style={{ width: '6px', height: '6px' }}
      >
        <span
          className="position-absolute top-0 start-0 rounded-circle bg-success opacity-75"
          style={{
            width: '100%',
            height: '100%',
            animation: 'ping 1s infinite',
          }}
        />
        <span
          className="position-relative rounded-circle bg-success"
          style={{ width: '6px', height: '6px', zIndex: 10 }}
        />
      </span>
      <span className="ps-2">Online: 7465</span>
    </div>
    <div className="winner-single">
  {show && currentWinner && (
    <div className="winner-card">
      <div className="avatar">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          height="14"
          width="14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M256 256c52.805 0 96-43.201 96-96s-43.195-96-96-96-96 43.201-96 96 43.195 96 96 96zm0 48c-63.598 0-192 32.402-192 96v48h384v-48c0-63.598-128.402-96-192-96z" />
        </svg>
        <div className="flag">{currentWinner.flag}</div>
      </div>
      <p className="name">{currentWinner.name}</p>
      <p className="amount">{currentWinner.amount}</p>
    </div>
  )}
</div>





 
  </div>


</div>
  )
}

export default WinnerSlider
