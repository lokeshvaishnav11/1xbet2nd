// import React from 'react';

// const NoticeBar = () => {
//   return (
//     <div className="w-100 px-3 py-3 d-flex justify-content-center">
//       <div className="px-3 py-1 bg-primary d-flex justify-content-between align-items-center shadow rounded-pill w-100 gap-2" style={{ backgroundColor: '#374992' }}>
        
//         {/* Left Icon */}
//         <div className="flex-shrink-0">
//           <img
//             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEtklEQVR4nO2dX4gbRRzH9xQUFBQRlMv0tFpBVBCuO5Oz9rR34oOIXK7aWhEffbS0PuXwxX+vgr6o1e5W8c1T8E0p5cxMgu0VhXtIxPT60Jtck1I5LvPLVbCKjmzuT/+YpNnsbibZ/D4wj/nD97OzMzu7v1nLQhAEQRAEQZC2SGbgiemK1vVW1rXpiv5u6rx+uL1PI4GhHI5vCbjSVlPn9Ujwb0daYotaigm4Pvx6S5X1bOtPI4F4/PiF25mAs80ETJc1BPsFpCWMwxEv/KYCKlq3/gakY2hWvbIZPgroMrao7mQc/kABBhjNqIcYV5Wrw8ce0CXGMtXtjEPp+vBRQBdgubXHGAfZKHwUEDF2pjrBBFSbhY8CokLrIcrhEOPqcqvwUUAE2CdW72QcvrlR8CggAqhQBxrNdFBAxNhzagcV8IOf4LEHhICdW72PCviECfVnJ+HjGBBsXn+knUEWBYTE/ll9M82oZ6mAWSrU30GDxx7QZuh2trabCvUB5epiWKGjgBawE3B3kqv9TMBnVKgLUYSOAjZIzq/cYWdq4/WLJqG+olz9yrj6J+rQ4ylA65vGc+quXT+t3UNz6sFktvboWE7ZTNSe9o5oOwtvMqE+Yhy+ZVzN+52vx1eA1kPDR6VNHPlewpUZ4soiceQl4pa0n8Z6IMz+EqD1UMKVLxNXnvEbNgoIyMiXckfClafDCB57gE+GXTlOHHkxzPAJnoLagzjLkwm39FfY4RMUcGPu/XzpAeLI36MIn6CAtgbcUM/5KMAHiWPyQJThE+wBLdB6KKyp5kAJmClcstL5eStdOGgdXLzV6pQRR9KowyfxFHClpfML1lsLpCMBxJXvowAIJmBTQic9YX15AXsACypgvb3hX4AjF1EAhCQgf8q3AOLKNRQA4QhI59c6EVBDARCWAP+FG92YgpK4z4KCnIISrvwRBYC5QZg48l0UAOFMQ98u3OJbwPCxpZ0oAMxdiG0sRRRxDAB/ArwZT7pwsn7a6eTIvxriLu1DAeBPQATL0adwFgQGb8h8cW473pABcwI8trmlPQmndBmvA8CMAI/ho0u78aY8mBOwdX/YlSfxShjMPphFnOWXiFP6DZcitNlnQxPOuVHiyncSTmluXYj/FVQWt7Ug4zReC2nais9M64XnX9U/v/Cazr34uh7jtUe8h3OTvPaUna3uowIOM64+xIdzIxJwZjJ1TWvnJ/DxdMMCGoEFGoYF/K8uTMCTg1mi1AMCBrtIr8cEDF6ZagABxYkp1a1CbSbg43gWagfpARNTX3d7qwIm1PcoYLIe/srinr3bLHObdZQHsgcUJ1LgHfmmwo/fdjU+BVi9RCw2bOpnARswDruoUCsowCBewXh/btoXgx6wyejc6v39t21ljAT058atMRPQf1sXx1DA1ubdXP2LAgxCOXyKAgxi/1K+rdULHFJl3ZW1rIE8BW1COUy1ENDVtayBFNDsJT6pil7Zu6yNLqcMjIDkta+xAu/I743wB0RAb4MCDOMVKGAPMMhM/jQKMIm3Swj2AIN4G1N4xWk4CBvEqwxsR0K6UDL5N+ONVyHoVQp6VeKNBmYv/JnCc6b/JoIgCIIgCIIgCIIgVhf5Dypa/TDHsuYaAAAAAElFTkSuQmCC"
//             alt="icon"
//             className="img-fluid"
//             style={{ height: '20px', width: '20px' }}
//           />
//         </div>

//         {/* Scrolling/Sliding Text */}
//         <div className="d-flex align-items-center overflow-hidden" style={{ height: '40px', flex: 1 }}>
//           <div
//             className="text-white fw-bold text-nowrap w-100 small"
//             style={{
//               animation: 'scrollUp 6s linear infinite',
//               whiteSpace: 'nowrap',
//               overflow: 'hidden',
//               textOverflow: 'ellipsis'
//             }}
//           >
//             If your deposit is not received, Please send it directly to Chicken Road Game Self-service Ce
//           </div>
//         </div>

//         {/* Detail Button */}
//         <div
//           className="flex-shrink-0 text-white text-center rounded-pill px-2 py-1 d-flex align-items-center gap-1"
//           style={{ backgroundColor: 'red', fontSize: '12px' }}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="14"
//             height="14"
//             fill="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path d="M12 23C7.85786 23 4.5 19.6421 4.5 15.5C4.5 13.3462 5.40786 11.4045 6.86179 10.0366C8.20403 8.77375 11.5 6.49951 11 1.5C17 5.5 20 9.5 14 15.5C15 15.5 16.5 15.5 19 13.0296C19.2697 13.8032 19.5 14.6345 19.5 15.5C19.5 19.6421 16.1421 23 12 23Z" />
//           </svg>
//           Detail
//         </div>
//       </div>

//       {/* Keyframe animation for scrolling effect */}
//       <style>
//         {`
//           @keyframes scrollUp {
//             0% { transform: translateY(100%); }
//             100% { transform: translateY(-100%); }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default NoticeBar;


import React from 'react';

const NoticeBar = ({ data }) => {
  return (
    <div className="w-100 px-3 py-3 d-flex justify-content-center">
      <div className="px-3 py-1 bg-primary d-flex justify-content-between align-items-center shadow rounded-pill w-100 gap-2" style={{ backgroundColor: '#374992' }}>
        
        {/* Left Icon */}
        
        {/* Scrolling/Sliding Text */}
        <div className="d-flex align-items-center overflow-hidden" style={{ height: '40px', flex: 1 }}>
          <div
            className="text-white fw-bold text-nowrap w-100 small"
            style={{
              animation: 'scrollUp 6s linear infinite',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            Join our Telegram Channel
          </div>
        </div>

        {/* Detail Button → now clickable */}
        <a
          href={data}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 text-white text-center rounded-pill px-2 py-1 d-flex align-items-center gap-1"
          style={{ backgroundColor: 'red', fontSize: '12px', textDecoration: 'none' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 23C7.85786 23 4.5 19.6421 4.5 15.5C4.5 13.3462 5.40786 11.4045 6.86179 10.0366C8.20403 8.77375 11.5 6.49951 11 1.5C17 5.5 20 9.5 14 15.5C15 15.5 16.5 15.5 19 13.0296C19.2697 13.8032 19.5 14.6345 19.5 15.5C19.5 19.6421 16.1421 23 12 23Z" />
          </svg>
          Join Now
        </a>
      </div>

      {/* Keyframe animation for scrolling effect */}
      <style>
        {`
          @keyframes scrollUp {
            0% { transform: translateY(100%); }
            100% { transform: translateY(-100%); }
          }
        `}
      </style>
    </div>
  );
};

export default NoticeBar;
